"""Meikigo sonic logo candidates (synthesized, no samples). python3 make.py -> sig_A/B/C.wav
User picked C (2026-11-13), start too loud ("its peaking") -> softer whoosh + rounded attack here, then:
  ffmpeg -i sig_C_boom.wav -af "acompressor=threshold=-22dB:ratio=4:attack=3:release=250:makeup=6dB,alimiter=limit=0.6:attack=1:release=60:level=disabled,loudnorm=I=-16:TP=-2:LRA=7" -ar 48000 sig_C_boom_v2.wav
sig_C_boom_v2.wav = the candidate (-16 LUFS, -3.9 dBFS peak). sig_C_boom_v1.wav = the first version."""
import numpy as np, wave
SR = 48000
rng = np.random.default_rng(7)

def t(d): return np.arange(int(SR * d)) / SR
def lp(x, fc):  # one-pole low-pass
    a = np.exp(-2 * np.pi * fc / SR); y = np.empty_like(x); s = 0.0
    for i, v in enumerate(x): s = (1 - a) * v + a * s; y[i] = s
    return y
def place(buf, x, at):
    i = int(at * SR); n = min(x.shape[-1], buf.shape[-1] - i); buf[:, i:i + n] += x[..., :n]
def stereo(x, w=0.0):  # w: small decorrelation via delay
    d = int(w * SR); r = np.concatenate([np.zeros(d), x])[:len(x)] if d else x
    return np.stack([x, r])
def reverb(buf, tail=2.2, mix=0.28, bright=3500):
    out = []
    for ch in range(2):
        n = int(tail * SR); ir = rng.standard_normal(n) * np.exp(-6.9 * t(tail) / tail)
        ir = lp(ir, bright); ir /= np.abs(ir).sum() ** 0.5 * 40
        wet = np.fft.irfft(np.fft.rfft(buf[ch], len(buf[ch]) + n) * np.fft.rfft(ir, len(buf[ch]) + n))[:len(buf[ch])]
        out.append(buf[ch] * (1 - mix) + wet * mix * 6)
    return np.array(out)

def thump(f0=62, drop=2.2, dur=1.6, body=(1, 2.01, 2.98), bright=0.25, dec=2.6, att=0.0):
    tt = t(dur); f = f0 * (1 + (drop - 1) * np.exp(-tt * 28)); ph = 2 * np.pi * np.cumsum(f) / SR
    x = np.sin(ph) * np.exp(-tt * dec)
    for k, m in enumerate(body[1:], 1): x += 0.35 / k * np.sin(m * ph) * np.exp(-tt * (4 + 3 * k))
    click = lp(rng.standard_normal(len(tt)), 2500) * np.exp(-tt * 90) * bright * 4
    y = np.tanh(1.6 * (x + click)) * 0.9
    if att: y *= np.minimum(tt / att, 1) ** 2
    return y

def swell(freqs, dur=1.8, att=0.5, det=0.004):
    tt = t(dur); env = np.minimum(tt / att, 1) * np.exp(-np.maximum(tt - att, 0) * 1.6)
    L = sum(np.sin(2 * np.pi * f * (1 - det) * tt) + 0.3 * np.sin(4 * np.pi * f * tt) for f in freqs)
    R = sum(np.sin(2 * np.pi * f * (1 + det) * tt + 0.7) + 0.3 * np.sin(4 * np.pi * f * tt + 1) for f in freqs)
    return np.stack([lp(L, 1800), lp(R, 1800)]) * env / len(freqs) * 0.55

def mallet(f, dur=1.4):
    tt = t(dur)
    x = sum(a * np.sin(2 * np.pi * f * m * tt) * np.exp(-tt * d) for a, m, d in ((1, 1, 3), (0.5, 3.99, 9), (0.25, 9.8, 20)))
    return x * 0.6 * np.exp(-tt * (0 if f > 400 else 4))

def write(name, buf, peak=0.89):
    buf = buf / np.abs(buf).max() * peak
    fade = int(0.08 * SR); buf[:, -fade:] *= np.linspace(1, 0, fade)
    with wave.open(name, 'wb') as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes((buf.T * 32767).astype('<i2').tobytes())

D = 2.8
# A "dum… DUM": soft thump, big thump + wide minor-ninth-free swell (D minor add9 low voicing)
a = np.zeros((2, int(D * SR)))
place(a, stereo(thump(58, bright=0.15, dec=11) * 0.45, 0.0), 0.05)
place(a, stereo(thump(55, drop=2.6, bright=0.35), 0.0), 0.42)
place(a, swell([73.4, 110, 146.8, 164.8, 220], att=0.12), 0.42)
write('sig_A_dum-dum.wav', reverb(a))
# B "tum-TUM up": two mallet notes rising a fifth (D -> A) over thumps; brighter, friendlier
b = np.zeros((2, int(D * SR)))
place(b, stereo(thump(70, bright=0.2, dec=11) * 0.4), 0.05); place(b, stereo(mallet(293.7) * 0.5, 0.004), 0.05)
place(b, stereo(thump(62, drop=2.3, bright=0.3)), 0.38); place(b, stereo(mallet(440) * 0.6, 0.006), 0.38)
place(b, swell([146.8, 220, 293.7, 370], att=0.08) * 0.7, 0.38)
write('sig_B_tum-TUM.wav', reverb(b, tail=1.8, mix=0.25, bright=5000))
# C "one boom": single deep hit with a short rising whoosh into it, long tail (Netflix-like minimal)
c = np.zeros((2, int(D * SR)))
w = lp(rng.standard_normal(int(0.45 * SR)), 1200) * np.linspace(0, 1, int(0.45 * SR)) ** 3 * 0.15
place(c, stereo(w, 0.003), 0.0)
place(c, stereo(thump(48, drop=2.0, bright=0.05, att=0.04) * 0.6), 0.45)
place(c, swell([73.4, 110, 138.6, 220], att=0.12, dur=2.2) * 1.1, 0.45)
write('sig_C_boom.wav', reverb(c, tail=2.6, mix=0.32), peak=0.7)
