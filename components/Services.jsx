'use client';

export default function Services() {
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  const services = [
    {
      num: '01',
      title: 'Cinematic Direction',
      body: 'Narrative noir, brand films, and visual teasers calibrated with anamorphic lenses, dramatic rim illumination, and spine-tingling pacing.',
      tags: ['Commercials', 'Brand Films', 'Color Grading'],
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" />
          <polygon points="10 8 16 12 10 16 10 8" />
        </svg>
      ),
    },
    {
      num: '02',
      title: '3D Spatial Motion',
      body: 'CGI monoliths, photorealistic obsidian and liquid gold physics, cloth simulation, and hyper-detailed product visualizations.',
      tags: ['Octane / Houdini', 'Spatial CGI', 'Cloth Dynamics'],
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      ),
    },
    {
      num: '03',
      title: 'Interactive WebGL',
      body: 'Scroll-scrubbed canvas sequences, GSAP timeline choreography, custom shaders, and buttery 120Hz smooth-scroll web architectures.',
      tags: ['ScrollTrigger', 'Canvas Engine', 'Reactive Audio'],
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      ),
    },
    {
      num: '04',
      title: 'Sonic Architecture',
      body: 'Sub-bass atmospheric frequencies, binaural Foley sound effects, and adaptive web audio that elevates visual storytelling into pure immersion.',
      tags: ['Sonic Branding', 'Foley & FX', 'Web Audio API'],
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
          <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
          <line x1="12" y1="19" x2="12" y2="22" />
        </svg>
      ),
    },
  ];

  return (
    <section className="section services-section" id="services">
      <div className="container">
        <div className="section-badge">
          <span className="badge-dot" />
          <span className="badge-text">02 // CAPABILITIES</span>
        </div>

        <div className="section-header-row">
          <h2 className="section-title">ENGINEERED FOR <span className="text-gold">IMPACT</span></h2>
          <p className="section-desc">
            A boutique suite of visual and interactive services designed for global brands, luxury fashion houses, and visionary creators.
          </p>
        </div>

        <div className="services-grid">
          {services.map((item) => (
            <div
              key={item.num}
              className="service-card"
              onMouseMove={handleMouseMove}
            >
              <div className="card-spotlight" />
              <div className="service-icon">{item.icon}</div>
              <span className="service-num">{item.num}</span>
              <h3 className="service-title">{item.title}</h3>
              <p className="service-body">{item.body}</p>
              <ul className="service-tags">
                {item.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
