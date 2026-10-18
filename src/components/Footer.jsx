import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer" id="footer">
      <div className="container footer__inner">

        {/* Brand */}
        <div className="footer__brand">
          <Link to="/" className="footer__logo">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <circle cx="16" cy="16" r="15" stroke="#8B6914" strokeWidth="1.5"/>
              <path d="M16 6 L18 12 L24 12 L19.5 16 L21 22 L16 18.5 L11 22 L12.5 16 L8 12 L14 12 Z" fill="#8B6914" opacity="0.9"/>
            </svg>
            <span className="footer__logo-name">DIGAXY</span>
          </Link>
          <p className="footer__tagline">
            Your move, our priority. Fast, reliable, and affordable moving services.
          </p>
        </div>

        {/* Links */}
        <div className="footer__cols">
          <div className="footer__col">
            <h4 className="footer__col-title">Company</h4>
            <Link to="/about"   className="footer__link">About Us</Link>
            <Link to="/careers" className="footer__link">Careers</Link>
            <Link to="/press"   className="footer__link">Press</Link>
          </div>
          <div className="footer__col">
            <h4 className="footer__col-title">Services</h4>
            <Link to="/"         className="footer__link">Book a Move</Link>
            <Link to="/estimate" className="footer__link">Get Estimate</Link>
            <Link to="/partner"  className="footer__link">Partner with Us</Link>
          </div>
          <div className="footer__col">
            <h4 className="footer__col-title">Support</h4>
            <Link to="/contact" className="footer__link">Contact</Link>
            <Link to="/faq"     className="footer__link">FAQ</Link>
            <Link to="/cities"  className="footer__link">Cities</Link>
          </div>
        </div>
      </div>

      <div className="footer__bottom container">
        <p>© {year} Digaxy. All rights reserved.</p>
        <p>Made with ❤️ for hassle-free moving</p>
      </div>
    </footer>
  )
}

export default Footer
