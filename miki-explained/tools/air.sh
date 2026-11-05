#!/bin/zsh
# The MacBook Air is the always-on back office (Tailscale, `ssh air`; see ~/.ssh/config): it runs the local Telegram Bot API
# server and the bot (tgstore.py serve) and owns the storage index and the posted log. The Pro makes the videos and talks
# to Telegram only through the Air.
#   miki-explained/tools/air.sh sync                 # tools + every episode.md up; storage index + calendar back down
#   miki-explained/tools/air.sh push-episode EX13    # copy media/ audio/ export/ up, push to Telegram from the Air, refresh the / menu
#   miki-explained/tools/air.sh tg <tgstore args…>   # run any tgstore.py command on the Air (ls, posted, mark-posted…)
#   miki-explained/tools/air.sh log                  # the bot's log
#   miki-explained/tools/air.sh dash [--plan]        # deploy tools, refresh episodes into the dashboard (--plan: slot new ones), restart
#   miki-explained/tools/air.sh thumbs [--force]     # poster frames for the dashboard (ffmpeg here, files to the Air)
set -e
ME=${0:A:h:h}                                       # miki-explained/ on the Pro
OPS=miki-ops/miki-explained                         # its copy on the Air
PY=/Users/mac/.local/share/uv/python/cpython-3.12-macos-aarch64-none/bin/python3.12
up() { rsync -a --prune-empty-dirs --include='tools/***' --include='03_ideas/' --include='03_ideas/experiments.md' --include='04_episodes/' --include='04_episodes/*/' \
         --include='04_episodes/*/episode.md' --include='04_episodes/*/README.md' --include='05_calendar/' --include='05_calendar/*' --exclude='*' --exclude='__pycache__' "$ME/" air:$OPS/; }
down() { rsync -a air:$OPS/storage/ "$ME/storage/"; rsync -a air:$OPS/05_calendar/ "$ME/05_calendar/"; }
case $1 in
  sync) up; down; echo synced ;;
  push-episode)
    ep=$(ls -d "$ME"/04_episodes/$2* | head -1); n=${ep:t}; up
    for d in media audio export; do [ -d "$ep/$d" ] && rsync -a "$ep/$d" air:$OPS/04_episodes/$n/; done
    ssh air "cd $OPS && $PY tools/tgstore.py push-episode $2 && $PY tools/tgstore.py commands"; down ;;
  tg) shift; ssh air "cd $OPS && $PY tools/tgstore.py $*"; down ;;
  log) ssh air 'tail -40 ~/Library/Logs/tgstore.log' ;;
  thumbs)                                            # a poster frame per episode (ffmpeg on the Pro) → the Air's thumbs/
    T=$(mktemp -d); have=$(ssh air 'ls ~/miki-ops/thumbs 2>/dev/null')
    for id in $(curl -s http://100.107.126.69:8787/api/state | python3 -c "import json,sys;[print(e['id']) for e in json.load(sys.stdin)['episodes'] if e['status'] not in ('draft','retired')]"); do
      [[ "$have" == *"$id.png"* && "$2" != "--force" ]] && continue
      curl -s -o $T/$id.mp4 http://100.107.126.69:8787/media/video/$id || continue
      for s in 2 5 9 14; do ffmpeg -v error -y -ss $s -i $T/$id.mp4 -frames:v 1 -vf scale=540:-2 $T/$id.$s.png; done
      mv "$(ls -S $T/$id.*.png | head -1)" $T/$id.png && rm -f $T/$id.*.png && echo "thumb $id"     # the most detailed frame
    done
    ssh air 'mkdir -p ~/miki-ops/thumbs'; ls $T/*.png >/dev/null 2>&1 && rsync -a $T/*.png air:miki-ops/thumbs/; rm -rf $T ;;
  dash) up; ssh air "cd $OPS && $PY tools/dash/seed.py $2 >/dev/null && launchctl kickstart -k gui/\$(id -u)/com.miki.dash && launchctl kickstart -k gui/\$(id -u)/com.miki.tgstore && echo dashboard refreshed" ;;
  *) sed -n 2,10p "$0" ;;
esac
