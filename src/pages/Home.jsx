import { Link } from 'react-router-dom'
import './Home.css'

/* ── Trust avatars (initials) ── */
const avatars = ['F', 'J', 'A']

/* ── Feature tags ── */
const features = [
  { id: 'feat-sameday',    icon: '🛡️', label: 'Same-day service'      },
  { id: 'feat-tracking',   icon: '📍', label: 'Live Tracking'          },
  { id: 'feat-trusted',    icon: '✅', label: 'Trusted Professionals'  },
  { id: 'feat-affordable', icon: '💲', label: 'Affordable pricing'     },
]

/* ── Mover for every need items ── */
const moverNeeds = [
  {
    id: 'need-home',
    label: 'Home move',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" />
        <path d="M9 21V12h6v9" />
      </svg>
    ),
  },
  {
    id: 'need-apartment',
    label: 'Apartment move',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="4" y="2" width="16" height="20" rx="2" />
        <path d="M9 22v-4h6v4" />
        <path d="M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01" />
      </svg>
    ),
  },
  {
    id: 'need-college',
    label: 'College move',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
  },
  {
    id: 'need-office',
    label: 'Office move',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    id: 'need-furniture',
    label: 'Furniture Delivery',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3" />
        <path d="M3 11a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6z" />
        <path d="M6 19v2M18 19v2" />
      </svg>
    ),
  },
  {
    id: 'need-storage',
    label: 'Storage move',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="8" width="18" height="12" rx="2" />
        <path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        <circle cx="12" cy="14" r="1.5" />
      </svg>
    ),
  },
  {
    id: 'need-marketplace',
    label: 'FB Marketplace delivery',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
        <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
        <path d="M2 7h20" />
      </svg>
    ),
  },
  {
    id: 'need-junk',
    label: 'Junk removal',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        <line x1="10" y1="11" x2="10" y2="17" />
        <line x1="14" y1="11" x2="14" y2="17" />
      </svg>
    ),
  },
  {
    id: 'need-donation',
    label: 'Donation pick up',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    ),
  },
  {
    id: 'need-craigslist',
    label: 'Craigslist delivery',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="2" x2="12" y2="22" />
        <line x1="12" y1="12" x2="4.93" y2="19.07" />
        <line x1="12" y1="12" x2="19.07" y2="19.07" />
      </svg>
    ),
  },
  {
    id: 'need-app',
    label: 'Application delivery',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <path d="M12 18h.01" />
        <path d="M9 7h.01M15 7h.01M9 11h.01M15 11h.01" />
      </svg>
    ),
  },
  {
    id: 'need-labor',
    label: 'Labor only',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M2 20a10 10 0 0 1 20 0" />
        <circle cx="12" cy="11" r="4" />
        <path d="M6 9a6 6 0 0 1 12 0H6z" />
        <path d="M12 3v3" />
      </svg>
    ),
  },
]

function Home() {
  return (
    <div className="home" id="home-page">

      {/* ════════════════════════════
          HERO
      ════════════════════════════ */}
      <section className="hero" aria-label="Hero section">
        {/* Decorative diamond shapes */}
        <div className="hero__diamond hero__diamond--1" aria-hidden="true" />
        <div className="hero__diamond hero__diamond--2" aria-hidden="true" />

        <div className="container hero__grid">

          {/* ── Left: Copy ── */}
          <div className="hero__left">
            <h1 className="hero__title fade-in-left">
              Fast, Easy &amp; Reliable<br />
              Moving{' '}
              <span className="hero__title-accent">With Digaxy</span>
            </h1>

            <p className="hero__subtitle fade-in-left" style={{ animationDelay: '0.15s' }}>
              Book movers instantly — reliable, safe, and always on time.
            </p>

            {/* CTA Buttons */}
            <div className="hero__actions fade-in-left" style={{ animationDelay: '0.25s' }}>
              <Link to="/book" className="btn btn-primary" id="hero-book-btn">
                🚚 &nbsp;Book a Move
              </Link>
              <Link to="/signup" className="btn btn-outline" id="hero-signup-btn">
                ⬇️ &nbsp;Sign up for free
              </Link>
            </div>

            {/* Social Proof */}
            <div className="hero__proof fade-in-left" style={{ animationDelay: '0.35s' }} id="hero-social-proof">
              <div className="hero__avatars" aria-label="Happy customers">
                {avatars.map((letter, i) => (
                  <div
                    key={i}
                    className="hero__avatar"
                    style={{ zIndex: avatars.length - i }}
                    aria-hidden="true"
                  >
                    {letter}
                  </div>
                ))}
              </div>
              <div className="hero__proof-text">
                <div className="hero__stars" aria-label="5 star rating">
                  {'★★★★★'}
                </div>
                <span className="hero__proof-count">10k+ happy customers</span>
              </div>
            </div>
          </div>

          {/* ── Right: Illustration ── */}
          <div className="hero__right fade-in-right" style={{ animationDelay: '0.1s' }}>
            <div className="hero__illustration-bg" aria-hidden="true" />
            <img
              src="/hero-van.png"
              alt="Moving van with delivery professional"
              className="hero__illustration animate-float"
              id="hero-illustration"
            />
          </div>
        </div>

        {/* ════ Search Bar ════ */}
        <div className="container">
          <div className="hero__search fade-in-up" style={{ animationDelay: '0.5s' }} id="hero-search">
            <div className="hero__search-field" id="search-pickup">
              <span className="hero__search-icon" aria-hidden="true">📍</span>
              <input
                type="text"
                placeholder="Pickup Location"
                className="hero__search-input"
                id="input-pickup"
                aria-label="Pickup location"
              />
            </div>
            <div className="hero__search-divider" aria-hidden="true" />
            <div className="hero__search-field" id="search-dropoff">
              <span className="hero__search-icon" aria-hidden="true">📍</span>
              <input
                type="text"
                placeholder="Drop-off Location"
                className="hero__search-input"
                id="input-dropoff"
                aria-label="Drop-off location"
              />
            </div>
            <button className="hero__search-btn" id="search-price-btn" aria-label="Get price estimate">
              <span aria-hidden="true">🏷️</span>
              &nbsp;Price
            </button>
          </div>
        </div>

        {/* ════ Feature Tags ════ */}
        <div className="container">
          <div className="hero__features fade-in-up" style={{ animationDelay: '0.6s' }} id="hero-features">
            {features.map(({ id, icon, label }) => (
              <div key={id} id={id} className="hero__feature-tag">
                <span className="hero__feature-icon" aria-hidden="true">{icon}</span>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════
          WHY CHOOSE US
      ════════════════════════════ */}
      <section className="section services-section" aria-label="Our services">
        <div className="container text-center">
          <p className="services-eyebrow">WHY CHOOSE US</p>
          <h2 className="services-title">Moving Made Simple</h2>
          <p className="services-subtitle">
            From studio apartments to full offices, Digaxy handles every move with care.
          </p>

          <div className="services-grid">
            {[
              { id: 'svc-1', icon: '📦', title: 'Packing & Unpacking', desc: 'Professional packing of all your belongings, big or small, with full insurance coverage.' },
              { id: 'svc-2', icon: '🏠', title: 'Home Moves',          desc: 'Smooth residential moves handled by trained professionals, on your schedule.' },
              { id: 'svc-3', icon: '🏢', title: 'Office Relocation',   desc: 'Minimal downtime, maximum efficiency. We move your office with zero disruption.' },
              { id: 'svc-4', icon: '📍', title: 'Live GPS Tracking',   desc: 'Track your belongings in real-time on any device. Stay in the loop, always.' },
              { id: 'svc-5', icon: '🛡️', title: 'Insured & Safe',      desc: 'Every move is fully insured. Your items are protected from pickup to drop-off.' },
              { id: 'svc-6', icon: '⚡', title: 'Same-Day Booking',    desc: 'Need to move today? Book in minutes and we\'ll be there within hours.' },
            ].map(({ id, icon, title, desc }) => (
              <article key={id} id={id} className="service-card">
                <div className="service-card__icon">{icon}</div>
                <h3 className="service-card__title">{title}</h3>
                <p className="service-card__desc">{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════
          A MOVER FOR EVERY NEED
      ════════════════════════════ */}
      <section className="section mover-needs-section" aria-label="A mover for every need">
        <div className="container text-center">
          <h2 className="mover-needs-title">
            A mover for every need - Digaxy makes<br />
            it simple
          </h2>

          <div className="mover-needs-grid" id="mover-needs-grid">
            {moverNeeds.map(({ id, label, icon }) => (
              <Link
                key={id}
                to="/book"
                id={id}
                className="mover-need-card"
                aria-label={`Book ${label}`}
              >
                <div className="mover-need-card__icon">
                  {icon}
                </div>
                <span className="mover-need-card__label">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════
          STATS BAND
      ════════════════════════════ */}
      <section className="stats-band" aria-label="Our stats">
        <div className="container stats-band__grid">
          {[
            { id: 'stat-customers', value: 'A',  label: 'Happy Customers' },
            { id: 'stat-cities',    value: '50+',   label: 'Cities Covered'  },
            { id: 'stat-movers',    value: '500+',  label: 'Pro Movers'      },
            { id: 'stat-rating',    value: '4.9★',  label: 'Average Rating'  },
          ].map(({ id, value, label }) => (
            <div key={id} id={id} className="stat-item">
              <span className="stat-value">{value}</span>
              <span className="stat-label">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════
          CTA BANNER
      ════════════════════════════ */}
      <section className="cta-banner section" aria-label="Call to action">
        <div className="container">
          <div className="cta-banner__card">
            <div className="cta-banner__text">
              <h2 className="cta-banner__title">Ready to Move?</h2>
              <p className="cta-banner__desc">
                Get a free instant estimate and book your move in under 2 minutes.
              </p>
            </div>
            <div className="cta-banner__actions">
              <Link to="/book" className="btn btn-primary" id="cta-book-btn">
                🚚 &nbsp;Book a Move Now
              </Link>
              <Link to="/estimate" className="btn btn-outline" id="cta-estimate-btn">
                Get Free Estimate
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Home
