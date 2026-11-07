#!/bin/zsh
# EEVEE (top) vs raea (bottom) for frames 40, 672, 1090 -> cmp.png; prints mean luma per frame (whole, centre)
o=$1; [ -z "$o" ] && o=cmp.png
ffmpeg -v error -y -i ref/eevee_0040.png -i ref/eevee_0672.png -i ref/eevee_1090.png -i raea_40.png -i raea_672.png -i raea_1090.png \
  -filter_complex "[0]scale=360:640[a];[1]scale=360:640[b];[2]scale=360:640[c];[3]scale=360:640[d];[4]scale=360:640[e];[5]scale=360:640[f];[a][b][c]hstack=3[t];[d][e][f]hstack=3[u];[t][u]vstack" $o
python3 - <<'PY'
import subprocess
def luma(p, crop=None):
    vf = (f"crop={crop}," if crop else "") + "scale=64:114,format=gray"
    b = subprocess.run(["ffmpeg","-v","error","-i",p,"-vf",vf,"-f","rawvideo","-"],capture_output=True).stdout
    return round(sum(b)/len(b),1)
for f,r in ((40,"0040"),(672,"0672"),(1090,"1090")):
    print(f, "eevee", luma(f"ref/eevee_{r}.png"), luma(f"ref/eevee_{r}.png","540:960:270:480"), "| raea", luma(f"raea_{f}.png"), luma(f"raea_{f}.png","540:960:270:480"))
PY
