import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './RetailPartners.css'

const partners = [
  {
    id: 'walmart',
    name: 'Walmart',
    logo: (
      <svg viewBox="0 0 140 40" width="125" height="34" aria-label="Walmart" className="partner-svg">
        <text x="5" y="27" fontFamily="Inter, Arial, sans-serif" fontWeight="800" fontSize="23" fill="#0071ce" letterSpacing="-0.5">
          Walmart
        </text>
        {/* Walmart Spark */}
        <g transform="translate(108, 18)">
          <path d="M0 -3 L0 -12" stroke="#ffc220" strokeWidth="3" strokeLinecap="round" />
          <path d="M0 3 L0 12" stroke="#ffc220" strokeWidth="3" strokeLinecap="round" />
          <path d="M2.6 -1.5 L10.4 -6" stroke="#ffc220" strokeWidth="3" strokeLinecap="round" />
          <path d="M-2.6 1.5 L-10.4 6" stroke="#ffc220" strokeWidth="3" strokeLinecap="round" />
          <path d="M2.6 1.5 L10.4 6" stroke="#ffc220" strokeWidth="3" strokeLinecap="round" />
          <path d="M-2.6 -1.5 L-10.4 -6" stroke="#ffc220" strokeWidth="3" strokeLinecap="round" />
        </g>
      </svg>
    ),
  },
  {
    id: 'costco',
    name: 'Costco Wholesale',
    logo: (
      <svg viewBox="0 0 140 40" width="125" height="34" aria-label="Costco Wholesale" className="partner-svg">
        <text x="6" y="23" fontFamily="Arial Black, Impact, sans-serif" fontWeight="900" fontStyle="italic" fontSize="22" fill="#e31837" letterSpacing="-0.5">
          COSTCO
        </text>
        <line x1="6" y1="27" x2="134" y2="27" stroke="#005daa" strokeWidth="2" />
        <text x="6" y="36" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="8" fill="#005daa" letterSpacing="4.5">
          WHOLESALE
        </text>
      </svg>
    ),
  },
  {
    id: 'ikea',
    name: 'IKEA',
    logo: (
      <svg viewBox="0 0 120 40" width="115" height="34" aria-label="IKEA" className="partner-svg">
        <rect x="5" y="5" width="110" height="30" rx="3" fill="#0058a3" />
        <ellipse cx="60" cy="20" rx="48" ry="12" fill="#ffda1a" />
        <text x="60" y="27" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="21" fill="#0058a3" textAnchor="middle" letterSpacing="1">
          IKEA
        </text>
      </svg>
    ),
  },
  {
    id: 'homedepot',
    name: 'The Home Depot',
    logo: (
      <svg viewBox="0 0 130 40" width="115" height="34" aria-label="The Home Depot" className="partner-svg">
        <rect x="48" y="2" width="36" height="36" rx="3" fill="#f96302" />
        <text x="66" y="14" fontFamily="Impact, Arial Black, sans-serif" fontSize="8" fill="#ffffff" textAnchor="middle" letterSpacing="0.5">
          THE
        </text>
        <text x="66" y="23" fontFamily="Impact, Arial Black, sans-serif" fontSize="9" fill="#ffffff" textAnchor="middle" letterSpacing="0.5">
          HOME
        </text>
        <text x="66" y="32" fontFamily="Impact, Arial Black, sans-serif" fontSize="8" fill="#ffffff" textAnchor="middle" letterSpacing="0.5">
          DEPOT
        </text>
      </svg>
    ),
  },
  {
    id: 'bestbuy',
    name: 'Best Buy',
    logo: (
      <svg viewBox="0 0 130 40" width="120" height="34" aria-label="Best Buy" className="partner-svg">
        <text x="15" y="19" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="13" fill="#000000" letterSpacing="-0.5">
          BEST
        </text>
        <text x="15" y="33" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="13" fill="#000000" letterSpacing="-0.5">
          BUY
        </text>
        {/* Yellow Tag */}
        <polygon points="62,17 76,17 84,25 76,33 62,33" fill="#ffe000" stroke="#000" strokeWidth="0.5" />
        <circle cx="66" cy="25" r="2" fill="#000000" />
        {/* Target Bullseye Icon next to it */}
        <g transform="translate(100, 22)">
          <circle cx="0" cy="0" r="12" fill="none" stroke="#cc0000" strokeWidth="3" />
          <circle cx="0" cy="0" r="5" fill="#cc0000" />
        </g>
      </svg>
    ),
  },
  {
    id: 'target',
    name: 'Target',
    logo: (
      <svg viewBox="0 0 120 40" width="115" height="34" aria-label="Target" className="partner-svg">
        <circle cx="28" cy="20" r="14" fill="none" stroke="#cc0000" strokeWidth="4" />
        <circle cx="28" cy="20" r="6" fill="#cc0000" />
        <text x="52" y="27" fontFamily="Arial Black, sans-serif" fontWeight="800" fontSize="17" fill="#cc0000" letterSpacing="1">
          TARGET
        </text>
      </svg>
    ),
  },
  {
    id: 'lowes',
    name: "Lowe's",
    logo: (
      <svg viewBox="0 0 120 40" width="115" height="34" aria-label="Lowe's" className="partner-svg">
        <path d="M12 8 L108 8 L100 32 L20 32 Z" fill="#004990" />
        <text x="60" y="25" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="16" fill="#ffffff" textAnchor="middle" fontStyle="italic">
          LOWE'S
        </text>
      </svg>
    ),
  },
  {
    id: 'wayfair',
    name: 'Wayfair',
    logo: (
      <svg viewBox="0 0 120 40" width="115" height="34" aria-label="Wayfair" className="partner-svg">
        <g transform="translate(20, 20)">
          <path d="M-8 -8 L8 -8 L0 8 Z" fill="#7b2d82" opacity="0.85" />
          <path d="M-8 8 L8 8 L0 -8 Z" fill="#7b2d82" opacity="0.65" />
        </g>
        <text x="36" y="26" fontFamily="Inter, Arial, sans-serif" fontWeight="800" fontSize="17" fill="#7b2d82" letterSpacing="-0.5">
          wayfair
        </text>
      </svg>
    ),
  },
]

function RetailPartners() {
  const scrollRef = useRef(null)
  const [isPaused, setIsPaused] = useState(false)

  // Double the list for infinite continuous scroll
  const displayPartners = [...partners, ...partners]

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -240 : 240
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  // Smooth auto-scroll effect
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    let animationId
    let step = 0.8 // speed in pixels per frame

    const autoScroll = () => {
      if (!isPaused && el) {
        el.scrollLeft += step
        // When halfway through (the first set of items), wrap back seamlessly
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft = 0
        }
      }
      animationId = requestAnimationFrame(autoScroll)
    }

    animationId = requestAnimationFrame(autoScroll)
    return () => cancelAnimationFrame(animationId)
  }, [isPaused])

  return (
    <section className="retail-partners" aria-label="Top Retail Partners">
      <div className="container">
        <div className="retail-partners__header">
          <h2 className="retail-partners__title">Top Retail Partners</h2>
          <div className="retail-partners__controls" aria-label="Carousel navigation">
            <button
              type="button"
              className="carousel-btn carousel-btn--prev"
              onClick={() => handleScroll('left')}
              aria-label="Previous partner"
            >
              ‹
            </button>
            <button
              type="button"
              className="carousel-btn carousel-btn--next"
              onClick={() => handleScroll('right')}
              aria-label="Next partner"
            >
              ›
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div
          className="retail-partners__carousel-wrap"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          <div className="retail-partners__track" ref={scrollRef}>
            {displayPartners.map((item, index) => (
              <Link
                key={`${item.id}-${index}`}
                to="/retailers"
                className="retail-partner-card"
                aria-label={`Partner: ${item.name}`}
              >
                <div className="retail-partner-logo">
                  {item.logo}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default RetailPartners
