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
          STATS BAND
      ════════════════════════════ */}
      <section className="stats-band" aria-label="Our stats">
        <div className="container stats-band__grid">
          {[
            { id: 'stat-customers', value: '10k+',  label: 'Happy Customers' },
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
