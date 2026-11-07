#!/bin/zsh
# EX00V12 variants: V0 = EX00V11 (current EX21), V1/V2/V3 = brighter toward the reference. Stills only (half size).
cd ${0:A:h}; mkdir -p out
typeset -A V
V[V0]='{}'
V[V1]='{"clay":[0.55,0.57,0.61],"floor":"#5E626A","btop":"#6A707A","bbot":"#2A2D33","key":9000,"fill":2200,"amb":1.2}'
V[V2]='{"clay":[0.66,0.68,0.71],"floor":"#80848C","btop":"#8C9098","bbot":"#3A3D44","key":8000,"fill":2800,"amb":1.6}'
V[V3]='{"clay":[0.72,0.73,0.76],"floor":"#9A9EA6","btop":"#A4A8B0","bbot":"#4A4E56","key":7000,"fill":3200,"amb":2.0}'
for v in V0 V1 V2 V3; do for shot in A B; do
  TUNE=${V[$v]} blender -b --python test.py -- out/$v $shot still 75 half > /dev/null 2>&1
done; done
ls out/*/
