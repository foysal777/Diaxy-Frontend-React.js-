import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import './Navbar.css'

const navLinks = [
  { to: '/',                  label: 'Home',                  icon: '' },
  { to: '/cities',            label: 'Cities',                icon: '' },
  { to: '/retailers',         label: 'Retailers',             icon: '' },
  { to: '/partner',           label: 'Become a Partner',      icon: '' },
  { to: '/estimate',          label: 'Get Estimate',          icon: '' },
]

function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} id="navbar">
      <div className="navbar__inner container">

        {/* Logo */}
        <Link to="/" className="navbar__logo" id="navbar-logo">
          <div className="navbar__logo-emblem">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <circle cx="16" cy="16" r="15" stroke="#8B6914" strokeWidth="1.5"/>
              <path d="M16 6 L18 12 L24 12 L19.5 16 L21 22 L16 18.5 L11 22 L12.5 16 L8 12 L14 12 Z" fill="#8B6914" opacity="0.9"/>
            </svg>
          </div>
          <div className="navbar__logo-text-wrap">
            <span className="navbar__logo-name">DIGAXY</span>
            <span className="navbar__logo-sub">YOUR MOVE · OUR PRIORITY</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="navbar__links" aria-label="Main navigation">
          {navLinks.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `navbar__link ${isActive ? 'navbar__link--active' : ''}`
              }
            >
              <span className="navbar__link-icon" aria-hidden="true">{icon}</span>
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Login */}
        <button className="btn-login" id="navbar-login-btn" aria-label="Log in">
          Log In
        </button>

        {/* Hamburger */}
        <button
          id="mobile-menu-toggle"
          className={`navbar__hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`navbar__mobile ${menuOpen ? 'navbar__mobile--open' : ''}`} id="mobile-menu">
        {navLinks.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `navbar__mobile-link ${isActive ? 'navbar__mobile-link--active' : ''}`
            }
            onClick={() => setMenuOpen(false)}
          >
            <span aria-hidden="true">{icon}</span> {label}
          </NavLink>
        ))}
        <button className="btn-login" style={{ width: '100%', justifyContent: 'center', display: 'flex' }}>
          Log In
        </button>
      </div>
    </header>
  )
}

export default Navbar
