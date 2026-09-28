'use client';

export default function Testimonials() {
  const testimonials = [
    {
      stars: '★★★★★',
      quote:
        '“The scroll-driven hat throw sequence stunned our global marketing team. It effortlessly bridges the chasm between cinema and modern interactive engineering.”',
      initials: 'MR',
      name: 'Marcus Ronin',
      role: 'Executive Producer, Silverline Pictures',
      featured: false,
    },
    {
      stars: '★★★★★',
      quote:
        '“In an ocean of cookie-cutter digital agency sites, KAGE’s work commands immediate awe. The dark moody rim lighting and buttery GSAP physics set a new benchmark.”',
      initials: 'EL',
      name: 'Elena Laurent',
      role: 'Global Head of Digital, Maison Noire',
      featured: true,
    },
    {
      stars: '★★★★★',
      quote:
        '“From concept sketches to custom WebGL frame scrubbing, their attention to optical depth and sound design makes every second on screen feel precious.”',
      initials: 'DK',
      name: 'David Kim',
      role: 'Design Director, Apex Spatial Studios',
      featured: false,
    },
  ];

  return (
    <section className="section testimonials-section" id="testimonials">
      <div className="container">
        <div className="section-badge">
          <span className="badge-dot" />
          <span className="badge-text">04 // CRITICAL ACCLAIM</span>
        </div>

        <div className="section-header-row">
          <h2 className="section-title">WORDS FROM <span className="text-gold">THE DIRECTORS</span></h2>
          <p className="section-desc">What our creative partners and executive collaborators say about working with KAGE.</p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className={`testimonial-card ${t.featured ? 'featured' : ''}`}
            >
              <div className="rating-stars">{t.stars}</div>
              <p className="testimonial-quote">{t.quote}</p>
              <div className="testimonial-profile">
                <div className="avatar-ring">
                  <span className="avatar-initials">{t.initials}</span>
                </div>
                <div>
                  <h4 className="profile-name">{t.name}</h4>
                  <p className="profile-role">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
