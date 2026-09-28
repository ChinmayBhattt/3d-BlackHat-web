'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const projects = [
  {
    id: 'nocturne',
    category: 'cinema',
    year: '2026',
    tag: 'FEATURE FILM CAMPAIGN',
    name: 'Nocturne: After Midnight',
    summary: 'Anamorphic neo-noir visual identity and moody street cinematography in rainy Ginza.',
    image: '/assets/portfolio_1.jpg',
    desc: 'An anamorphic neo-noir visual identity and moody street cinematography in rainy Ginza. Features custom high-contrast rim lighting, 35mm grain emulation, and optical distortion profiles.',
    specs: [
      { label: 'Client', val: 'Silverline Pictures' },
      { label: 'Deliverables', val: 'Teaser Reel, Titles, Web' },
      { label: 'Year', val: '2026' },
    ],
  },
  {
    id: 'monolith',
    category: 'spatial',
    year: '2026',
    tag: '3D SPATIAL EXPLORATION',
    name: 'Monolith: Liquid Gold',
    summary: 'Procedural crystal physics and golden energetic ribbons in deep obsidian space.',
    image: '/assets/portfolio_2.jpg',
    desc: 'Procedural obsidian crystal physics and golden energetic ribbons winding through deep dark void. Rendered with Octane GPU spatial lighting and customized cloth-particle dynamics.',
    specs: [
      { label: 'Client', val: 'Apex Luxury Group' },
      { label: 'Format', val: '4K CGI Motion & Stills' },
      { label: 'Year', val: '2026' },
    ],
  },
  {
    id: 'vesper',
    category: 'fashion',
    year: '2025',
    tag: 'EDITORIAL RUNWAY',
    name: 'Vesper: The Golden Silhouette',
    summary: 'Minimalist haute couture silhouette exploration with razor-sharp tungsten rim lighting.',
    image: '/assets/portfolio_3.jpg',
    desc: 'Minimalist haute couture silhouette exploration with razor-sharp tungsten rim lighting against velvet darkness. A homage to classical Chiaroscuro and tailored high fashion.',
    specs: [
      { label: 'Client', val: 'Maison Noire Paris' },
      { label: 'Medium', val: 'Haute Couture Campaign' },
      { label: 'Year', val: '2025' },
    ],
  },
  {
    id: 'veil',
    category: 'cinema',
    year: '2026',
    tag: 'KINETIC WEB EXPERIENCE',
    name: 'The Veil: Hat of Shadows',
    summary: "The world's first 120-frame scroll-scrubbed hat throw interactive optical illusion.",
    image: '/assets/portfolio_4.png',
    desc: 'The original 120-frame scroll-scrubbed hat throw interactive optical illusion. Built with GSAP ScrollTrigger, canvas memory preloading, and deep optical blur depth-of-field effect.',
    specs: [
      { label: 'Technology', val: 'HTML5 Canvas + GSAP' },
      { label: 'Frame Rate', val: 'Scrubbed 60fps' },
      { label: 'Year', val: '2026' },
    ],
  },
];

export default function Portfolio() {
  const [filter, setFilter] = useState('all');
  const [activeModalProject, setActiveModalProject] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActiveModalProject(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredProjects =
    filter === 'all' ? projects : projects.filter((p) => p.category === filter);

  return (
    <>
      <section className="section portfolio-section" id="portfolio">
        <div className="container">
          <div className="section-badge">
            <span className="badge-dot" />
            <span className="badge-text">03 // SELECTED ARCHIVE</span>
          </div>

          <div className="portfolio-header">
            <div>
              <h2 className="section-title">THE OBSIDIAN <span className="text-gold">VAULT</span></h2>
              <p className="section-desc">Selected commissions from cinema, high-luxury fashion, and interactive CGI.</p>
            </div>

            <div className="filter-bar" role="tablist">
              <button
                className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
              >
                ALL WORKS
              </button>
              <button
                className={`filter-btn ${filter === 'cinema' ? 'active' : ''}`}
                onClick={() => setFilter('cinema')}
              >
                CINEMA NOIR
              </button>
              <button
                className={`filter-btn ${filter === 'spatial' ? 'active' : ''}`}
                onClick={() => setFilter('spatial')}
              >
                SPATIAL 3D
              </button>
              <button
                className={`filter-btn ${filter === 'fashion' ? 'active' : ''}`}
                onClick={() => setFilter('fashion')}
              >
                HIGH FASHION
              </button>
            </div>
          </div>

          <div className="portfolio-grid">
            {filteredProjects.map((project) => (
              <article
                key={project.id}
                className="portfolio-card"
                onClick={() => setActiveModalProject(project)}
              >
                <div className="card-image-box">
                  <img
                    src={project.image}
                    alt={project.name}
                    loading="lazy"
                    className="card-img"
                  />
                  <div className="card-overlay">
                    <span className="expand-btn">EXPLORE CASE STUDY ↗</span>
                  </div>
                  <span className="card-year">{project.year}</span>
                </div>
                <div className="card-meta">
                  <span className="project-tag">{project.tag}</span>
                  <h3 className="project-name">{project.name}</h3>
                  <p className="project-summary">{project.summary}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Modal */}
      {activeModalProject && (
        <div className="project-modal active" role="dialog" aria-modal="true">
          <div className="modal-backdrop" onClick={() => setActiveModalProject(null)} />
          <div className="modal-card">
            <button
              className="modal-close"
              onClick={() => setActiveModalProject(null)}
              aria-label="Close modal"
            >
              ✕
            </button>
            <div className="modal-image-wrap">
              <img src={activeModalProject.image} alt={activeModalProject.name} />
            </div>
            <div className="modal-info">
              <span className="modal-tag">{activeModalProject.tag}</span>
              <h3 className="modal-title">{activeModalProject.name}</h3>
              <p className="modal-desc">{activeModalProject.desc}</p>
              <div className="modal-specs">
                {activeModalProject.specs.map((s) => (
                  <div key={s.label} className="spec-item">
                    <span className="spec-item-label">{s.label}</span>
                    <span className="spec-item-val">{s.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
