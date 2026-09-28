'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className={`site-header ${isScrolled ? 'scrolled' : ''}`} id="siteHeader">
      <div className="header-inner">
        <Link href="#hero" className="brand-logo" aria-label="Kage Studios Home">
          <span className="logo-symbol">✦</span>
          <span className="logo-text">KAGE</span>
          <span className="logo-sub">STUDIO</span>
        </Link>

        <nav className="nav-desktop" aria-label="Main Navigation">
          <Link href="#about" className="nav-link"><span className="nav-idx">01</span> Manifest</Link>
          <Link href="#services" className="nav-link"><span className="nav-idx">02</span> Craft</Link>
          <Link href="#portfolio" className="nav-link"><span className="nav-idx">03</span> Archive</Link>
          <Link href="#testimonials" className="nav-link"><span className="nav-idx">04</span> Acclaim</Link>
          <Link href="#contact" className="nav-link nav-cta">Commission <span className="arrow">↗</span></Link>
        </nav>

        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          <span className="burger-line" style={{ transform: mobileMenuOpen ? 'rotate(45deg) translate(5px, 6px)' : 'none' }} />
          <span className="burger-line" style={{ transform: mobileMenuOpen ? 'rotate(-45deg) translate(5px, -6px)' : 'none' }} />
        </button>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-nav ${mobileMenuOpen ? 'open' : ''}`}>
        <Link href="#about" className="mobile-nav-link" onClick={closeMenu}><span>01</span> Manifest</Link>
        <Link href="#services" className="mobile-nav-link" onClick={closeMenu}><span>02</span> Craft</Link>
        <Link href="#portfolio" className="mobile-nav-link" onClick={closeMenu}><span>03</span> Archive</Link>
        <Link href="#testimonials" className="mobile-nav-link" onClick={closeMenu}><span>04</span> Acclaim</Link>
        <Link href="#contact" className="mobile-nav-link cta" onClick={closeMenu}>Commission A Project ↗</Link>
      </div>
    </header>
  );
}
