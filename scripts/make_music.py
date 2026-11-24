"""Original, royalty-free upbeat background track (120 BPM, C major, I-V-vi-IV).

Arrangement is aligned to the edit: a light groove under the talking part, then the
full arrangement "drops" exactly when the end cards start (SOURCE_DURATION = 55.63s).
Output: public/music/bgm.wav
"""
import os, wave
import numpy as np
from scipy.signal import butter, lfilter

SR = 44100
BPM = 120
BEAT = 60 / BPM
BAR = 4 * BEAT
DROP_AT = 55.63          # video time where end cards start
TOTAL = 80.2 + 0.5       # video length + tail
DROP_BAR = 28
OFFSET = DROP_BAR * BAR - DROP_AT  # song time = video time + OFFSET
N = int(TOTAL * SR)
rng = np.random.default_rng(3)
OUT = os.path.join(os.path.dirname(__file__), "..", "public", "music")
os.makedirs(OUT, exist_ok=True)

L = np.zeros(N); R = np.zeros(N)

def hz(m): return 440 * 2 ** ((m - 69) / 12)

def place(sig, t_song, gain=1.0, pan=0.0):
    i = int((t_song - OFFSET) * SR)
    if i >= N: return
    if i < 0:
        sig = sig[-i:]; i = 0
    sig = sig[: N - i]
    L[i:i + len(sig)] += sig * gain * (1 - max(0, pan))
    R[i:i + len(sig)] += sig * gain * (1 + min(0, pan))

def tt(d): return np.arange(int(d * SR)) / SR

def filt(x, f, kind="low"):
    b, a = butter(2, f / (SR / 2), kind); return lfilter(b, a, x)

def pluck(m, d=0.45, bright=1.0):
    t = tt(d); f = hz(m)
    s = sum((0.6 ** k) * np.sin(2 * np.pi * f * (k + 1) * t) * np.exp(-t * (6 + 5 * k * bright)) for k in range(6))
    return s * np.minimum(1, t * 400)

def marimba(m, d=0.5):
    t = tt(d); f = hz(m)
    s = np.sin(2 * np.pi * f * t) * np.exp(-t * 7) + 0.35 * np.sin(2 * np.pi * f * 4 * t) * np.exp(-t * 22) + 0.15 * np.sin(2 * np.pi * f * 10 * t) * np.exp(-t * 40)
    return s * np.minimum(1, t * 600)

def bass(m, d=0.24):
    t = tt(d); f = hz(m)
    s = np.sin(2 * np.pi * f * t) + 0.3 * np.sin(2 * np.pi * 2 * f * t) + 0.1 * np.sign(np.sin(2 * np.pi * f * t))
    return filt(s, 900) * np.exp(-t * 4) * np.minimum(1, t * 300) * np.minimum(1, (d - t) * 200)

def pad(ms, d):
    t = tt(d)
    s = sum(np.sign(np.sin(2 * np.pi * hz(m) * (1 + det) * t)) * 0.0 + ((hz(m) * (1 + det) * t) % 1 * 2 - 1)
            for m in ms for det in (-0.004, 0.004))
    s = filt(s, 1800)
    env = np.minimum(1, t / 0.15) * np.minimum(1, (d - t) / 0.2)
    return s * env

def kick():
    t = tt(0.35); f = 45 + 110 * np.exp(-t * 30)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 9)

def clap():
    t = tt(0.22); n = filt(rng.standard_normal(len(t)), 1200, "high")
    env = np.exp(-t * 25) + 0.6 * np.exp(-np.abs(t - 0.012) * 400) + 0.5 * np.exp(-np.abs(t - 0.024) * 400)
    return filt(n, 7000) * env

def hat(open_=False):
    t = tt(0.25 if open_ else 0.06); n = filt(rng.standard_normal(len(t)), 7000, "high")
    return n * np.exp(-t * (14 if open_ else 70))

def shaker():
    t = tt(0.09); n = filt(rng.standard_normal(len(t)), 5000, "high")
    return n * np.sin(np.pi * t / t[-1]) ** 2

CHORDS = [  # root (bass midi), chord tones for pluck (midi)
    (36, [60, 64, 67, 72]),  # C
    (43, [59, 62, 67, 71]),  # G
    (45, [60, 64, 69, 72]),  # Am
    (41, [60, 65, 69, 72]),  # F
]
MELODY = [  # (8th index, midi, length in 8ths) per bar of each chord
    [(0, 76, 1), (1, 79, 1), (2, 81, 1), (3, 79, 1), (4, 76, 2), (6, 74, 1), (7, 72, 1)],
    [(0, 74, 2), (2, 74, 1), (3, 76, 1), (4, 79, 2), (6, 76, 1), (7, 74, 1)],
    [(0, 72, 1), (1, 76, 1), (2, 81, 1), (3, 79, 1), (4, 76, 2), (6, 72, 1), (7, 74, 1)],
    [(0, 72, 2), (2, 69, 1), (3, 72, 1), (4, 74, 1), (5, 76, 3)],
]
PLUCK_PATTERN = [0, 2, 3, 5, 7]  # 8th-note positions
E8 = BEAT / 2

last_bar = int((TOTAL + OFFSET) / BAR) + 1
for bar in range(last_bar):
    t0 = bar * BAR
    root, tones = CHORDS[bar % 4]
    full = bar >= DROP_BAR
    build = DROP_BAR - 2 <= bar < DROP_BAR
    final_bar = bar == last_bar - 1

    # plucked chords (always)
    for j, pos in enumerate(PLUCK_PATTERN):
        place(pluck(tones[(j + bar) % 4]), t0 + pos * E8, 0.16, pan=-0.3)
        place(pluck(tones[(j + 2) % 4] + 12, 0.3, 1.4), t0 + pos * E8 + 0.01, 0.06, pan=0.3)

    if not full:
        # light groove under speech
        for b in range(4):
            place(bass(root, 0.45), t0 + b * BEAT, 0.28)
            if b in (0, 2): place(kick(), t0 + b * BEAT, 0.35)
        for k in range(8):
            place(shaker(), t0 + k * E8, 0.05 if k % 2 == 0 else 0.08, pan=0.4)
        if build:  # snare roll into the drop
            n = 8 if bar == DROP_BAR - 2 else 16
            for k in range(n):
                place(clap(), t0 + k * BAR / n, 0.08 + 0.25 * ((bar - DROP_BAR + 2) * n + k) / (2 * n))
        continue

    # FULL arrangement (end cards)
    place(pad(tones[:3], BAR), t0, 0.05)
    for b in range(4):
        place(kick(), t0 + b * BEAT, 0.8)
        if b in (1, 3): place(clap(), t0 + b * BEAT, 0.35)
        place(hat(True), t0 + b * BEAT + E8, 0.12, pan=0.25)
    for k in range(8):
        place(hat(), t0 + k * E8, 0.07, pan=-0.25)
        place(bass(root + (12 if k % 2 else 0)), t0 + k * E8, 0.38)
    for pos, m, ln in MELODY[bar % 4]:
        place(marimba(m, max(0.4, ln * E8 + 0.2)), t0 + pos * E8, 0.32, pan=0.1)
        place(marimba(m + 12, 0.3), t0 + pos * E8, 0.07, pan=-0.2)
    if final_bar:
        place(pad([60, 64, 67, 72], 3.0), t0 + BAR, 0.08)

# simple sidechain pump in the full section
song_t = np.arange(N) / SR + OFFSET
beat_phase = (song_t % BEAT)
pump = np.where(song_t >= DROP_BAR * BAR, 1 - 0.25 * np.exp(-beat_phase * 10), 1.0)
L *= pump; R *= pump

st = np.stack([L, R], 1)
st = np.tanh(st / np.max(np.abs(st)) * 1.3) / np.tanh(1.3) * 0.89  # gentle saturation, -1 dB
with wave.open(os.path.join(OUT, "bgm.wav"), "w") as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((st * 32767).astype(np.int16).tobytes())
print("ok", round(N / SR, 2), "s; offset", round(OFFSET, 3))
