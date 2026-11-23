"""Synthesize royalty-free SFX into public/sfx (44.1kHz stereo WAV)."""
import numpy as np, wave, os
SR = 44100
OUT = os.path.join(os.path.dirname(__file__), "..", "public", "sfx")
os.makedirs(OUT, exist_ok=True)
rng = np.random.default_rng(7)

def save(name, x, width=0.0):
    x = x / (np.max(np.abs(x)) + 1e-9) * 0.9
    # tiny stereo widening via delay
    d = int(SR * 0.008 * width)
    l = x; r = np.concatenate([np.zeros(d), x])[: len(x)] if d else x
    st = np.stack([l, r], 1)
    with wave.open(os.path.join(OUT, name + ".wav"), "w") as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes((st * 32767).astype(np.int16).tobytes())

def t(d): return np.arange(int(SR * d)) / SR

def lp(x, a):  # one-pole lowpass, a may be array
    y = np.zeros_like(x); s = 0.0
    a = np.broadcast_to(a, x.shape)
    for i in range(len(x)):
        s += a[i] * (x[i] - s); y[i] = s
    return y

# whoosh: noise through sweeping lowpass, bell envelope
tt = t(0.45); n = rng.standard_normal(len(tt))
sweep = 0.02 + 0.35 * np.sin(np.pi * tt / tt[-1]) ** 2
env = np.sin(np.pi * tt / tt[-1]) ** 1.5
w1 = lp(n, sweep) * env
save("whoosh", w1 - lp(w1, 0.01), 1)

# pop: fast pitch-dropping sine
tt = t(0.12); f = 900 * np.exp(-tt * 30) + 250
save("pop", np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt * 40))

# ding (success): bell partials
tt = t(1.2)
b = sum(a * np.sin(2 * np.pi * fr * tt) * np.exp(-tt * dk) for fr, a, dk in
        [(1318, 1, 4), (2637, .45, 6), (3951, .2, 9), (1975, .3, 5)])
save("ding", b, 1)

# error buzz: two short square-ish blips
tt = t(0.14); bz = np.sign(np.sin(2 * np.pi * 160 * tt)) * np.exp(-tt * 12)
bz = lp(bz, 0.25)
save("error", np.concatenate([bz, np.zeros(int(SR * .05)), bz]))

# cash / coin: bright metallic partials
tt = t(0.8)
c = sum(np.sin(2 * np.pi * fr * tt) * np.exp(-tt * dk) for fr, dk in
        [(2093, 6), (2793, 7), (4186, 9), (5274, 12)])
c2 = np.concatenate([np.zeros(int(SR * .07)), c])[: len(c)]
save("cash", c + 0.8 * c2, 1)

# riser: upward noise+tone sweep
tt = t(1.0); f = 200 + 1400 * (tt / tt[-1]) ** 2
r = 0.4 * np.sin(2 * np.pi * np.cumsum(f) / SR) + lp(rng.standard_normal(len(tt)), 0.05 + 0.4 * tt)
save("riser", r * (tt / tt[-1]) ** 2, 1)

# click / tick (for list items)
tt = t(0.05); save("tick", np.sin(2 * np.pi * 1800 * tt) * np.exp(-tt * 120))

# sparkle: ascending glissando of short bells
out = np.zeros(int(SR * 0.9))
for i, fr in enumerate([1568, 1976, 2349, 2637, 3136, 3951]):
    tt = t(0.4); s = np.sin(2 * np.pi * fr * tt) * np.exp(-tt * 14)
    o = int(SR * 0.06 * i); out[o:o + len(s)] += s * (0.6 + 0.08 * i)
save("sparkle", out, 1)

# soft impact / boom for outro
tt = t(0.9); f = 110 * np.exp(-tt * 4) + 40
save("boom", np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt * 5) + 0.3 * lp(rng.standard_normal(len(tt)), 0.05) * np.exp(-tt * 15))
print(sorted(os.listdir(OUT)))
