"""Synthesize simple royalty-free sound effects into public/sfx/*.wav"""
import numpy as np, wave, os
SR = 44100
out = os.path.join(os.path.dirname(__file__), "..", "public", "sfx")
os.makedirs(out, exist_ok=True)
rng = np.random.default_rng(7)

def save(name, x):
    x = x / (np.max(np.abs(x)) + 1e-9) * 0.9
    st = np.stack([x, x], 1)
    with wave.open(os.path.join(out, name), "wb") as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes((st * 32767).astype(np.int16).tobytes())

def t(d): return np.arange(int(SR * d)) / SR

def lowpass_sweep(noise, f0, f1):
    # one-pole lowpass with time-varying cutoff
    n = len(noise); fc = np.geomspace(f0, f1, n); y = np.zeros(n); a = 0.0
    for i in range(n):
        k = 1 - np.exp(-2 * np.pi * fc[i] / SR); a += k * (noise[i] - a); y[i] = a
    return y

# whoosh: filtered noise swelling up then down
d = 0.55; tt = t(d); n = rng.standard_normal(len(tt))
env = np.sin(np.pi * (tt / d) ** 0.7) ** 2
save("whoosh.wav", lowpass_sweep(n, 300, 5000) * env)

# swoosh (longer transition)
d = 0.9; tt = t(d); n = rng.standard_normal(len(tt))
env = np.sin(np.pi * tt / d) ** 3
save("swoosh.wav", lowpass_sweep(n, 200, 7000) * env)

# pop: quick pitch drop sine
d = 0.14; tt = t(d)
f = 900 * np.exp(-tt * 25) + 250
save("pop.wav", np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt * 30))

# ding: bell with harmonics
d = 1.2; tt = t(d)
x = sum(a * np.sin(2 * np.pi * f * tt) * np.exp(-tt * k) for f, a, k in
        [(1318, 1, 4), (2637, .4, 6), (3951, .2, 9), (1975, .3, 5)])
save("ding.wav", x * (1 - np.exp(-tt * 400)))

# sparkle: rising arpeggio of short bells
d = 0.9; tt = t(d); x = np.zeros(len(tt))
for i, f in enumerate([1046, 1318, 1568, 2093, 2637]):
    s = int(i * 0.07 * SR); seg = tt[: len(tt) - s]
    x[s:] += np.sin(2 * np.pi * f * seg) * np.exp(-seg * 7) * 0.6
save("sparkle.wav", x)

# click: tiny tick for word/card stagger
d = 0.05; tt = t(d)
save("click.wav", np.sin(2 * np.pi * 2200 * tt) * np.exp(-tt * 120))

# impact: low boom for logo reveal
d = 1.0; tt = t(d)
f = 120 * np.exp(-tt * 6) + 45
boom = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt * 4)
save("impact.wav", boom + 0.15 * rng.standard_normal(len(tt)) * np.exp(-tt * 30))
print(sorted(os.listdir(out)))
