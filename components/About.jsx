'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const stats = sectionRef.current?.querySelectorAll('.stat-number');
    if (!stats) return;

    stats.forEach((stat) => {
      const targetVal = parseInt(stat.getAttribute('data-target') || '0', 10);
      ScrollTrigger.create({
        trigger: stat,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          let current = 0;
          const duration = 1800;
          const stepTime = 30;
          const steps = duration / stepTime;
          const increment = targetVal / steps;

          const timer = setInterval(() => {
            current += increment;
            if (current >= targetVal) {
              current = targetVal;
              clearInterval(timer);
              stat.textContent = targetVal + (targetVal === 140 ? '+' : targetVal === 100 ? '%' : '');
            } else {
              stat.textContent = Math.round(current) + (targetVal === 140 ? '+' : targetVal === 100 ? '%' : '');
            }
          }, stepTime);
        },
      });
    });
  }, []);

  return (
    <section className="section about-section" id="about" ref={sectionRef}>
      <div className="container">
        <div className="section-badge">
          <span className="badge-dot" />
          <span className="badge-text">01 // THE MANIFESTO</span>
        </div>

        <div className="about-grid">
          <div className="about-lead">
            <h2 className="section-title">
              WE FORGE STORIES IN <span className="text-gold">CHIAROSCURO</span> &amp; MOTION.
            </h2>
            <p className="lead-text">
              Light cannot exist without darkness. At KAGE, we orchestrate high-contrast visual narratives where silhouette, kinetic momentum, and sensory depth converge into indelible digital art.
            </p>
            <p className="sub-text">
              From high-fashion film direction to reactive 3D WebGL architecture, every frame is crafted like a 35mm film reel—deliberate, tactile, and unforgettable.
            </p>

            <div className="stats-row">
              <div className="stat-card">
                <span className="stat-number" data-target="140">140+</span>
                <span className="stat-label">Global Screenings</span>
              </div>
              <div className="stat-card">
                <span className="stat-number" data-target="28">28</span>
                <span className="stat-label">Creative Accolades</span>
              </div>
              <div className="stat-card">
                <span className="stat-number" data-target="100">100%</span>
                <span className="stat-label">Bespoke Precision</span>
              </div>
            </div>
          </div>

          <div className="about-visual">
            <div className="quote-box">
              <div className="quote-mark">“</div>
              <blockquote className="quote-text">
                The gesture of tossing the hat is not merely motion—it is the deliberate destruction of the boundary between observer and creator.
              </blockquote>
              <div className="quote-author">
                <span className="author-name">JULIAN VANCE</span>
                <span className="author-title">Executive Creative Director</span>
              </div>
            </div>

            <div className="card-glow-wrapper">
              <div className="spec-card">
                <div className="spec-header">
                  <span className="spec-pill">DIRECTOR’S NOTE</span>
                  <span className="spec-code">REF // NOIR-2026</span>
                </div>
                <ul className="spec-list">
                  <li><span className="dot gold" /> <strong>Camera:</strong> Anamorphic Primes 35mm T1.3</li>
                  <li><span className="dot gold" /> <strong>Lighting:</strong> 12kW Tungsten Rim Silhouette</li>
                  <li><span className="dot gold" /> <strong>Motion:</strong> 24fps Scrub-Synchronized Shutter</li>
                  <li><span className="dot gold" /> <strong>Depth:</strong> Optical Hyper-Focal Falloff</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
