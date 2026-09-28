'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 120;
const FRAME_PREFIX = '/assets/frames/frame_';
const FRAME_EXT = '.jpg';

function getFrameSrc(index) {
  const padded = String(index).padStart(4, '0');
  return `${FRAME_PREFIX}${padded}${FRAME_EXT}`;
}

export default function HeroCanvas() {
  const heroRef = useRef(null);
  const canvasRef = useRef(null);
  const particleCanvasRef = useRef(null);
  const contentRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const gaugeBarRef = useRef(null);
  const veilRef = useRef(null);

  const [isLoading, setIsLoading] = useState(true);

  // Synthesize hat throw whoosh
  const playWhoosh = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const actx = new AudioCtx();

      const bufferSize = actx.sampleRate * 0.8;
      const buffer = actx.createBuffer(1, bufferSize, actx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = actx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = actx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.Q.value = 3.5;
      filter.frequency.setValueAtTime(150, actx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(1200, actx.currentTime + 0.35);
      filter.frequency.exponentialRampToValueAtTime(80, actx.currentTime + 0.75);

      const gain = actx.createGain();
      gain.gain.setValueAtTime(0.01, actx.currentTime);
      gain.gain.linearRampToValueAtTime(0.3, actx.currentTime + 0.35);
      gain.gain.linearRampToValueAtTime(0.01, actx.currentTime + 0.75);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(actx.destination);

      whiteNoise.start();
      whiteNoise.stop(actx.currentTime + 0.8);
    } catch {
      // Fallback
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const images = [];
    let currentFrame = 1;
    const frameObj = { frame: 1 };
    let hasPlayedWhoosh = false;

    // Render helper
    const drawImageScaled = (img) => {
      const cWidth = canvas.width;
      const cHeight = canvas.height;

      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, cWidth, cHeight);

      const imgRatio = img.naturalWidth / img.naturalHeight;
      const canvasRatio = cWidth / cHeight;

      let drawWidth, drawHeight, offsetX, offsetY;

      if (canvasRatio > imgRatio) {
        drawWidth = cWidth;
        drawHeight = cWidth / imgRatio;
        offsetX = 0;
        offsetY = (cHeight - drawHeight) / 2;
      } else {
        drawHeight = cHeight;
        drawWidth = cHeight * imgRatio;
        offsetX = (cWidth - drawWidth) / 2;
        offsetY = 0;
      }

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    const render = (idx) => {
      currentFrame = Math.max(1, Math.min(TOTAL_FRAMES, idx));
      const img = images[currentFrame];

      if (img && img.complete && img.naturalWidth > 0) {
        drawImageScaled(img);
        return;
      }

      // Nearest fallback
      for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
        const prev = images[currentFrame - offset];
        if (prev && prev.complete && prev.naturalWidth > 0) {
          drawImageScaled(prev);
          return;
        }
        const next = images[currentFrame + offset];
        if (next && next.complete && next.naturalWidth > 0) {
          drawImageScaled(next);
          return;
        }
      }
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      render(currentFrame);
    };

    window.addEventListener('resize', resize, { passive: true });

    // 1. Immediately load frame 1
    const firstImg = new Image();
    firstImg.src = getFrameSrc(1);
    images[1] = firstImg;

    firstImg.onload = () => {
      resize();
      render(1);
      setIsLoading(false);

      // Preload remaining frames
      const queue = [];
      for (let i = 2; i <= TOTAL_FRAMES; i++) {
        if (i % 3 === 0) queue.unshift(i);
        else queue.push(i);
      }

      let active = 0;
      const MAX_ACTIVE = 8;
      const loadNext = () => {
        while (active < MAX_ACTIVE && queue.length > 0) {
          const idx = queue.shift();
          active++;
          const img = new Image();
          img.src = getFrameSrc(idx);
          images[idx] = img;
          img.onload = () => {
            active--;
            if (idx === currentFrame) render(idx);
            loadNext();
          };
          img.onerror = () => {
            active--;
            loadNext();
          };
        }
      };
      loadNext();
    };

    // 2. GSAP ScrollTrigger Sequence
    const ctxTimeline = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.4,
          onUpdate: (self) => {
            if (gaugeBarRef.current) {
              gaugeBarRef.current.style.height = `${Math.round(self.progress * 100)}%`;
            }

            if (window.isSoundActive) {
              if (self.progress > 0.55 && self.progress < 0.85 && !hasPlayedWhoosh) {
                hasPlayedWhoosh = true;
                playWhoosh();
              } else if (self.progress < 0.4) {
                hasPlayedWhoosh = false;
              }
            }
          },
        },
      });

      // Frame progression
      tl.to(frameObj, {
        frame: TOTAL_FRAMES,
        ease: 'none',
        duration: 1,
        onUpdate: () => {
          render(Math.round(frameObj.frame));
        },
      }, 0);

      // Typography dissolve
      tl.to(contentRef.current, {
        opacity: 0,
        y: -70,
        scale: 0.96,
        ease: 'power2.in',
        duration: 0.22,
      }, 0);

      // Scroll indicator fade
      tl.to(scrollIndicatorRef.current, {
        opacity: 0,
        y: 20,
        ease: 'power1.in',
        duration: 0.1,
      }, 0);

      // Deep blur out into darkness veil
      tl.fromTo(veilRef.current,
        { opacity: 0 },
        { opacity: 1, ease: 'power2.in', duration: 0.18 },
        0.82
      );

      // Unveil onto section 1
      ScrollTrigger.create({
        trigger: '#about',
        start: 'top 80%',
        end: 'top 40%',
        scrub: true,
        onUpdate: (self) => {
          if (veilRef.current) {
            veilRef.current.style.opacity = String(1 - self.progress);
          }
        },
      });
    }, heroRef);

    // 3. Floating Dust Particles
    const pCanvas = particleCanvasRef.current;
    let animId;
    if (pCanvas) {
      const pCtx = pCanvas.getContext('2d');
      let pWidth = (pCanvas.width = window.innerWidth);
      let pHeight = (pCanvas.height = window.innerHeight);

      const count = window.innerWidth < 768 ? 35 : 75;
      const particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * pWidth,
          y: Math.random() * pHeight,
          radius: Math.random() * 1.8 + 0.5,
          speedX: (Math.random() - 0.5) * 0.4,
          speedY: -Math.random() * 0.5 - 0.2,
          alpha: Math.random() * 0.5 + 0.2,
          pulsing: Math.random() * 0.02 + 0.01,
        });
      }

      let mX = pWidth / 2;
      let mY = pHeight / 2;
      const onMouseMove = (e) => {
        mX = e.clientX;
        mY = e.clientY;
      };
      window.addEventListener('mousemove', onMouseMove, { passive: true });

      const animateP = () => {
        pCtx.clearRect(0, 0, pWidth, pHeight);
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.x += p.speedX;
          p.y += p.speedY;
          p.alpha += Math.sin(Date.now() * p.pulsing) * 0.005;

          const dx = mX - p.x;
          const dy = mY - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            p.x -= (dx / dist) * 0.6;
            p.y -= (dy / dist) * 0.6;
          }

          if (p.y < 0) {
            p.y = pHeight;
            p.x = Math.random() * pWidth;
          }
          if (p.x < 0) p.x = pWidth;
          if (p.x > pWidth) p.x = 0;

          pCtx.beginPath();
          pCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          pCtx.fillStyle = `rgba(229, 169, 83, ${Math.max(0.1, Math.min(0.7, p.alpha))})`;
          pCtx.shadowBlur = 8;
          pCtx.shadowColor = 'rgba(212, 175, 55, 0.6)';
          pCtx.fill();
        }
        animId = requestAnimationFrame(animateP);
      };
      animateP();
    }

    return () => {
      window.removeEventListener('resize', resize);
      ctxTimeline.revert();
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  const handleScrollExplore = () => {
    if (window.lenis) {
      window.lenis.scrollTo(window.innerHeight * 1.5, { duration: 1.8 });
    } else {
      window.scrollTo({ top: window.innerHeight * 1.5, behavior: 'smooth' });
    }
  };

  return (
    <>
      <section className="hero-section" id="hero" ref={heroRef} aria-label="Cinematic Hat Throw Experience">
        <div className="hero-sticky-container">
          <canvas ref={canvasRef} className="hero-canvas" width="1920" height="1080" />
          <canvas ref={particleCanvasRef} className="particle-canvas" />

          <div className="hero-vignette" aria-hidden="true" />
          <div className="hero-light-streak" aria-hidden="true" />

          {/* Overlay Typography */}
          <div className="hero-content" ref={contentRef}>
            <div className="hero-eyebrow">
              <span className="eyebrow-line" />
              <span className="eyebrow-text">AN IMMERSIVE NOIR ENCOUNTER</span>
              <span className="eyebrow-line" />
            </div>

            <h1 className="hero-title">
              <span className="title-line title-line-1">SHADOW &amp;</span>
              <span className="title-line title-line-2">ILLUSION</span>
            </h1>

            <p className="hero-subtitle">
              Beyond the rim light lies the unseen. Scroll to pierce the darkness and unleash the motion.
            </p>

            <div className="hero-meta">
              <span className="meta-tag">60 FPS SCROLL-SCRUB</span>
              <span className="meta-dot" />
              <span className="meta-tag">SPATIAL CINEMATOGRAPHY</span>
            </div>
          </div>

          {/* Scroll Cue */}
          <div
            className="scroll-indicator"
            ref={scrollIndicatorRef}
            onClick={handleScrollExplore}
            role="button"
            tabIndex={0}
          >
            <div className="mouse-icon">
              <span className="mouse-wheel" />
            </div>
            <span className="scroll-label">SCROLL TO UNVEIL</span>
            <div className="scroll-chevrons">
              <span />
              <span />
            </div>
          </div>

          {/* Loader */}
          {isLoading && (
            <div className="hero-loader">
              <div className="loader-spinner" />
              <span className="loader-text">CALIBRATING SHADOWS...</span>
            </div>
          )}

          {/* Gauge */}
          <div className="scroll-progress-gauge" aria-hidden="true">
            <div className="gauge-bar" ref={gaugeBarRef} />
          </div>
        </div>
      </section>

      {/* Dark Curtain Veil */}
      <div className="section-veil" ref={veilRef} aria-hidden="true" />
    </>
  );
}
