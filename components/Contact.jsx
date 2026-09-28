'use client';

import { useState } from 'react';

export default function Contact() {
  const [scope, setScope] = useState('Cinema / Film');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    budget: '50k-100k',
    brief: '',
  });
  const [status, setStatus] = useState(null); // { type: 'success' | 'error', message: '' }
  const [isSubmitting, setIsSubmitting] = useState(false);

  const scopes = [
    'Cinema / Film',
    '3D Spatial',
    'Interactive Web',
    'Full Suite',
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.brief.trim()) {
      setStatus({
        type: 'error',
        message: 'Please fill out all required fields with an asterisk (*).',
      });
      return;
    }

    setIsSubmitting(true);
    setStatus(null);

    setTimeout(() => {
      setIsSubmitting(false);
      setStatus({
        type: 'success',
        message: '✦ Commission request transmitted. Our executive producer will respond within 24 hours.',
      });
      setFormData({
        name: '',
        email: '',
        budget: '50k-100k',
        brief: '',
      });
    }, 1400);
  };

  return (
    <section className="section contact-section" id="contact">
      <div className="container">
        <div className="contact-wrapper">
          <div className="contact-info">
            <div className="section-badge">
              <span className="badge-dot" />
              <span className="badge-text">05 // INITIATE DIALOGUE</span>
            </div>

            <h2 className="contact-headline">
              HAVE A VISION <br />IN THE <span className="text-gold">DARK?</span>
            </h2>

            <p className="contact-sub">
              We accept a limited number of high-profile commissions each fiscal quarter to preserve meticulous craftsmanship.
            </p>

            <div className="contact-details">
              <div className="detail-item">
                <span className="detail-label">DIRECT ENQUIRIES</span>
                <a href="mailto:studio@kage-atelier.com" className="detail-val">
                  studio@kage-atelier.com
                </a>
              </div>
              <div className="detail-item">
                <span className="detail-label">STUDIO HEADQUARTERS</span>
                <span className="detail-val">
                  Roppongi Hills, Minato City, Tokyo // SoHo, New York
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">CURRENT AVAILABILITY</span>
                <span className="detail-val text-gold">
                  ● Commissioning for Q3 / Q4 2026
                </span>
              </div>
            </div>
          </div>

          <div className="contact-form-box">
            <form onSubmit={handleSubmit} className="inquiry-form" noValidate>
              <div className="form-group">
                <label htmlFor="clientName">Your Name / Organization *</label>
                <input
                  type="text"
                  id="clientName"
                  required
                  placeholder="e.g. Sterling Cooper / Jonathan Vance"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="clientEmail">Email Address *</label>
                <input
                  type="email"
                  id="clientEmail"
                  required
                  placeholder="name@domain.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Project Scope</label>
                <div className="scope-selector">
                  {scopes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      className={`scope-pill ${scope === s ? 'active' : ''}`}
                      onClick={() => setScope(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="budgetRange">Estimated Investment</label>
                <select
                  id="budgetRange"
                  className="budget-select"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                >
                  <option value="30k-50k">$30,000 – $50,000 USD</option>
                  <option value="50k-100k">$50,000 – $100,000 USD</option>
                  <option value="100k+">$100,000+ USD (Custom Bespoke)</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="projectBrief">Project Synopsis *</label>
                <textarea
                  id="projectBrief"
                  rows={4}
                  required
                  placeholder="Describe the creative ambition, deliverables, and timeline..."
                  value={formData.brief}
                  onChange={(e) => setFormData({ ...formData, brief: e.target.value })}
                />
              </div>

              <button type="submit" className="submit-btn" disabled={isSubmitting}>
                <span className="btn-text">
                  {isSubmitting ? 'ENCRYPTING & TRANSMITTING...' : 'TRANSMIT COMMISSION'}
                </span>
                <span className="btn-arrow">↗</span>
              </button>

              {status && (
                <div className={`form-status ${status.type}`} role="alert">
                  {status.message}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
