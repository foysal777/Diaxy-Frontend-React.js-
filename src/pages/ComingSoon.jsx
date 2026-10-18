import { Link } from 'react-router-dom'
import './About.css'

/**
 * Placeholder — replace with real page content.
 * Used for routes that are not yet implemented.
 */
function ComingSoon({ title = 'Coming Soon' }) {
  return (
    <div id="coming-soon-page">
      <section className="page-header" aria-label="Coming soon">
        <div className="container page-header__content">
          <p className="page-eyebrow">DIGAXY</p>
          <h1 className="page-header__title">{title}</h1>
          <p className="page-header__desc">
            This page is under construction. Check back soon!
          </p>
          <Link to="/" className="btn btn-primary" id="back-home-btn" style={{ marginTop: '1rem' }}>
            ← Back to Home
          </Link>
        </div>
      </section>
    </div>
  )
}

export default ComingSoon
