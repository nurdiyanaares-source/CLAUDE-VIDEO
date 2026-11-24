"""Synthesise an upbeat royalty-free promo track + SFX (no external samples)."""
import numpy as np, soundfile as sf, sys, os
SR = 44100
OUT = sys.argv[1] if len(sys.argv) > 1 else "public"
rng = np.random.default_rng(7)

def env_adsr(n, a=0.005, d=0.12, s=0.35, r=0.08):
    t = np.arange(n) / SR
    e = np.ones(n) * s
    ai = int(a * SR); di = int(d * SR); ri = int(r * SR)
    e[:ai] = np.linspace(0, 1, ai)
    e[ai:ai + di] = np.linspace(1, s, len(e[ai:ai + di]))
    e[-ri:] *= np.linspace(1, 0, ri)
    return e

def midi(m): return 440 * 2 ** ((m - 69) / 12)

def pluck(f, dur, bright=1.0):
    n = int(dur * SR); t = np.arange(n) / SR
    w = (np.sin(2*np.pi*f*t) + 0.5*bright*np.sin(2*np.pi*2*f*t) + 0.25*bright*np.sin(2*np.pi*3*f*t)
         + 0.12*np.sin(2*np.pi*4.01*f*t))
    return w * np.exp(-t * 7) * env_adsr(n, 0.002, 0.05, 1.0, 0.02)

def marimba(f, dur):
    n = int(dur * SR); t = np.arange(n) / SR
    w = np.sin(2*np.pi*f*t) + 0.35*np.sin(2*np.pi*4*f*t)*np.exp(-t*30)
    return w * np.exp(-t * 9)

def pad(freqs, dur):
    n = int(dur * SR); t = np.arange(n) / SR
    w = np.zeros(n)
    for f in freqs:
        for det in (-0.12, 0.12):
            ph = 2*np.pi*(f*(1+det/100))*t
            w += 0.5*(2*((ph/(2*np.pi)) % 1) - 1)  # saw
    # simple lowpass via moving average
    k = 24; w = np.convolve(w, np.ones(k)/k, mode='same')
    return w / len(freqs) * env_adsr(n, 0.25, 0.3, 0.8, 0.4)

def kick(dur=0.35):
    n = int(dur*SR); t = np.arange(n)/SR
    f = 50 + 110*np.exp(-t*30)
    return np.sin(2*np.pi*np.cumsum(f)/SR) * np.exp(-t*9)

def clap(dur=0.18):
    n = int(dur*SR); t = np.arange(n)/SR
    nz = rng.standard_normal(n)
    nz = nz - np.convolve(nz, np.ones(6)/6, mode='same')
    e = np.exp(-t*28) + 0.6*np.exp(-np.maximum(t-0.012,0)*40)*(t>0.012)
    return nz * e * 0.5

def hat(dur=0.05, open_=False):
    n = int((0.18 if open_ else dur)*SR); t = np.arange(n)/SR
    nz = rng.standard_normal(n); nz = nz - np.convolve(nz, np.ones(3)/3, mode='same')
    return nz * np.exp(-t*(18 if open_ else 70)) * 0.35

def add(buf, x, at, gain=1.0, pan=0.0):
    i = int(at*SR)
    if i >= buf.shape[0]: return
    x = x[:buf.shape[0]-i]
    l = np.cos((pan+1)*np.pi/4); r = np.sin((pan+1)*np.pi/4)
    buf[i:i+len(x), 0] += x*gain*l*1.414/2*2**0.5
    buf[i:i+len(x), 1] += x*gain*r*1.414/2*2**0.5

def music(total=86.0, bpm=118, boost_at=63.7):
    beat = 60/bpm; bar = 4*beat
    buf = np.zeros((int(total*SR)+SR, 2))
    # C G Am F  (I V vi IV) in C major, then F G C C for variety
    prog = [(48,[60,64,67]), (43,[59,62,67]), (45,[60,64,69]), (41,[60,65,69]),
            (48,[60,64,67]), (43,[59,62,67]), (41,[60,65,69]), (43,[59,62,65,67])]
    melodyA = [72,74,76,79, 76,74,72,74, 71,74,79,74, 76,74,72,71,
               72,76,79,81, 79,76,74,76, 77,76,74,72, 74,76,74,71]
    nbars = int(total/bar)+1
    for b in range(nbars):
        t0 = b*bar
        root, chord = prog[b % len(prog)]
        big = t0 >= boost_at - 0.01
        intro = b < 2
        # pad
        add(buf, pad([midi(m) for m in chord], bar), t0, 0.10 if not big else 0.14)
        # bass: root on 1, octave bounce
        for k, (off, oct_) in enumerate([(0,0),(1.5,0),(2,12),(3,0),(3.5,7)]):
            if intro and k: continue
            add(buf, pluck(midi(root+oct_-12+12), beat*0.9, 0.4), t0+off*beat, 0.32)
        # ukulele-ish strum on off-beats
        for s in range(8):
            if s % 2 == 1 or big:
                for j, m in enumerate(chord):
                    add(buf, pluck(midi(m), 0.35, 1.0), t0+s*beat/2 + j*0.008, 0.09, pan=-0.35)
        # marimba arpeggio 16ths
        if not intro:
            arp = chord + [chord[1]+12]
            for s in range(16):
                m = arp[(s*3) % len(arp)] + 12
                add(buf, marimba(midi(m), 0.3), t0+s*beat/4, 0.07 if not big else 0.09, pan=0.4)
        # drums
        if not intro:
            for q in range(4):
                add(buf, kick(), t0+q*beat, 0.55)
                if q in (1,3): add(buf, clap(), t0+q*beat, 0.45)
            for e in range(8):
                add(buf, hat(open_=(e%2==1)), t0+e*beat/2, 0.22 if e%2 else 0.15, pan=0.2)
        # lead melody only in the loud ending
        if big:
            for s in range(8):
                m = melodyA[((b*8)+s) % len(melodyA)]
                add(buf, pluck(midi(m), beat*0.6, 0.8), t0+s*beat/2, 0.16, pan=0.1)
                add(buf, marimba(midi(m+12), 0.25), t0+s*beat/2, 0.05)
    # cymbal swell into boost
    sw = int(1.2*SR); nz = rng.standard_normal(sw)
    nz = nz - np.convolve(nz, np.ones(4)/4, mode='same')
    add(buf, nz*np.linspace(0,1,sw)**2*0.25, boost_at-1.2)
    buf = buf[:int(total*SR)]
    fade = int(2.0*SR); buf[-fade:] *= np.linspace(1,0,fade)[:,None]
    buf /= np.max(np.abs(buf)) + 1e-9
    return buf * 0.89

def sfx():
    out = {}
    t = lambda d: np.arange(int(d*SR))/SR
    # pop
    tt = t(0.12); f = 1000*np.exp(-tt*9) + 380
    out['pop'] = np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-tt*35)
    # whoosh
    tt = t(0.45); nz = rng.standard_normal(len(tt))
    lp = np.convolve(nz, np.ones(18)/18, mode='same')
    out['whoosh'] = lp*np.sin(np.pi*tt/0.45)**2*3
    # ding
    tt = t(1.0); out['ding'] = (np.sin(2*np.pi*1318*tt)+0.6*np.sin(2*np.pi*1976*tt))*np.exp(-tt*4)*0.6
    # tick/click
    tt = t(0.03); out['click'] = np.sin(2*np.pi*2400*tt)*np.exp(-tt*120)
    # cash register cha-ching
    tt = t(0.9)
    bell = sum(np.sin(2*np.pi*f*tt)*np.exp(-tt*k) for f, k in [(2093,5),(2637,6),(3136,7)])
    nz = rng.standard_normal(len(tt))*np.exp(-tt*40)*0.4
    ch = np.zeros_like(tt); ch[int(0.1*SR):] = bell[:len(tt)-int(0.1*SR)]
    out['cash'] = (nz + ch*0.5)
    # boom / impact
    tt = t(0.8); f = 40 + 90*np.exp(-tt*12)
    out['boom'] = np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-tt*5) + rng.standard_normal(len(tt))*np.exp(-tt*30)*0.2
    # sparkle (rising arpeggio)
    sp = np.zeros(int(0.6*SR))
    for i, m in enumerate([84, 88, 91, 96]):
        x = marimba(midi(m), 0.4); i0 = int(i*0.06*SR); sp[i0:i0+len(x)] += x[:len(sp)-i0]
    out['sparkle'] = sp*0.6
    # swipe (short airy riser)
    tt = t(0.3); nz = rng.standard_normal(len(tt))
    hp = nz - np.convolve(nz, np.ones(5)/5, mode='same')
    out['swipe'] = hp*(tt/0.3)**1.5*np.exp(-np.maximum(tt-0.25,0)*60)*1.5
    for k, v in out.items():
        v = v/ (np.max(np.abs(v))+1e-9) * 0.9
        sf.write(os.path.join(OUT, f'sfx_{k}.wav'), np.stack([v, v], 1), SR)

if __name__ == '__main__':
    total = float(sys.argv[2]) if len(sys.argv) > 2 else 86.0
    boost = float(sys.argv[3]) if len(sys.argv) > 3 else 63.7
    sf.write(os.path.join(OUT, 'music.wav'), music(total, boost_at=boost), SR)
    sfx()
