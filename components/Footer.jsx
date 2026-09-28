'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Footer() {
  const [clocks, setClocks] = useState({
    tokyo: '--:--',
    nyc: '--:--',
    london: '--:--',
  });

  useEffect(() => {
    const updateTime = () => {
      const format = (tz) =>
        new Intl.DateTimeFormat('en-US', {
          timeZone: tz,
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }).format(new Date());

      setClocks({
        tokyo: format('Asia/Tokyo'),
        nyc: format('America/New_York'),
        london: format('Europe/London'),
      });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = (e) => {
    e.preventDefault();
    if (window.lenis) {
      window.lenis.scrollTo(0, { duration: 1.5 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <span className="footer-logo">✦ KAGE</span>
            <p className="footer-tagline">Architects of light, shadow, and kinetic cinema.</p>
          </div>

          <div className="footer-links-grid">
            <div className="footer-col">
              <span className="col-title">NAVIGATION</span>
              <Link href="#hero">00 // Hero Throw</Link>
              <Link href="#about">01 // Manifest</Link>
              <Link href="#services">02 // Capabilities</Link>
              <Link href="#portfolio">03 // Archive</Link>
              <Link href="#contact">05 // Inquire</Link>
            </div>

            <div className="footer-col">
              <span className="col-title">STUDIOS</span>
              <span>Tokyo, 106-6108</span>
              <span>New York, NY 10012</span>
              <span>Paris, 75001</span>
            </div>

            <div className="footer-col">
              <span className="col-title">NETWORK</span>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram ↗</a>
              <a href="https://vimeo.com" target="_blank" rel="noopener noreferrer">Vimeo ↗</a>
              <a href="https://behance.net" target="_blank" rel="noopener noreferrer">Behance ↗</a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer">X / Twitter ↗</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="copyright">
            &copy; {new Date().getFullYear()} KAGE STUDIOS LLC. ALL RIGHTS RESERVED. CRAFTED WITH NOIR PASSION.
          </div>

          <div className="clocks-strip">
            <span className="clock-item">TYO: <span>{clocks.tokyo}</span></span>
            <span className="clock-sep">/</span>
            <span className="clock-item">NYC: <span>{clocks.nyc}</span></span>
            <span className="clock-sep">/</span>
            <span className="clock-item">LDN: <span>{clocks.london}</span></span>
          </div>

          <a href="#hero" onClick={scrollToTop} className="back-to-top" aria-label="Back to top">
            <span>TOP</span> ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
