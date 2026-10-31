#!/usr/bin/env python3
"""Talk to the local self-hosted Postiz (http://localhost:4007) with the API key in ~/.config/postiz/key.

  python3 miki-explained/tools/postiz.py channels                  # connected channels (TikTok once connected)
  python3 miki-explained/tools/postiz.py upload <video.mp4>        # media upload → prints id and path
  python3 miki-explained/tools/postiz.py draft <channelId> <media.json> <caption.txt> <ISO date>   # TikTok draft
  python3 miki-explained/tools/postiz.py posts <fromISO> <toISO>   # list posts

Install: ~/Private/postiz (official gitroomhq/postiz-docker-compose + a local override with JWT_SECRET, API_LIMIT 90).
The key never goes into the repo. Uploads stay on this Mac (Docker volume postiz-uploads).
"""
import json, mimetypes, os, sys, urllib.request, uuid

BASE = os.environ.get("POSTIZ_URL", "http://localhost:4007/api/public/v1")
KEY = open(os.path.expanduser("~/.config/postiz/key")).read().strip()


def call(method, path, body=None, headers=None):
    h = {"Authorization": KEY}; h.update(headers or {})
    data = body
    if isinstance(body, (dict, list)):
        data = json.dumps(body).encode(); h["Content-Type"] = "application/json"
    req = urllib.request.Request(BASE + path, data=data, method=method, headers=h)
    try:
        with urllib.request.urlopen(req, timeout=600) as r:
            raw = r.read().decode()
    except urllib.error.HTTPError as e:
        sys.exit(f"HTTP {e.code} {path}: {e.read().decode()[:500]}")
    return json.loads(raw) if raw.strip().startswith(("{", "[")) else raw


def upload(path):
    b = uuid.uuid4().hex; name = os.path.basename(path); ctype = mimetypes.guess_type(path)[0] or "application/octet-stream"
    with open(path, "rb") as f:
        payload = (f"--{b}\r\nContent-Disposition: form-data; name=\"file\"; filename=\"{name}\"\r\n"
                   f"Content-Type: {ctype}\r\n\r\n").encode() + f.read() + f"\r\n--{b}--\r\n".encode()
    return call("POST", "/upload", payload, {"Content-Type": f"multipart/form-data; boundary={b}"})


if __name__ == "__main__":
    cmd, args = sys.argv[1], sys.argv[2:]
    if cmd == "channels":
        out = call("GET", "/integrations")
    elif cmd == "upload":
        out = upload(args[0])
    elif cmd == "posts":
        out = call("GET", f"/posts?startDate={args[0]}&endDate={args[1]}")
    elif cmd == "draft":
        media = json.load(open(args[1])); caption = open(args[2]).read()
        out = call("POST", "/posts", {"type": "draft", "shortLink": False, "date": args[3], "tags": [],
                                      "posts": [{"integration": {"id": args[0]},
                                                 "value": [{"content": caption, "image": [media]}],
                                                 "settings": {"__type": "tiktok"}}]})
    else:
        sys.exit(__doc__)
    print(json.dumps(out, indent=1) if not isinstance(out, str) else out)
