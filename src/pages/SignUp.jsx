import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { DigaxyCrest } from './Login'
import './Login.css'

function SignUp() {
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match. Please try again.')
      return
    }
    if (!agreeTerms) {
      setErrorMsg('Please agree to the Terms & conditions to proceed.')
      return
    }

    setErrorMsg('')
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSuccessMsg('Account created successfully! Redirecting to login...')
      setTimeout(() => {
        navigate('/login')
      }, 1200)
    }, 700)
  }

  return (
    <div className="auth-page" id="signup-page">
      {/* ── Left Side: Back button & Window Character Illustration ── */}
      <div className="auth-page__left">
        <div className="auth-page__topbar">
          <Link to="/" className="auth-back-btn" id="signup-back-btn">
            Back to website <span className="auth-back-arrow">→</span>
          </Link>
        </div>

        <div className="auth-illustration-wrap">
          <svg
            className="auth-illustration-svg"
            viewBox="0 0 540 500"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Welcome character waving from window"
          >
            {/* Soft decorative brick background */}
            <g opacity="0.3" stroke="#cbd5e1" strokeWidth="1.2">
              <line x1="60" y1="200" x2="100" y2="200" />
              <line x1="430" y1="210" x2="470" y2="210" />
              <line x1="70" y1="360" x2="110" y2="360" />
              <line x1="420" y1="380" x2="460" y2="380" />
            </g>

            {/* Vine Arch on top */}
            <path d="M75 220 C60 170 120 150 260 150 C400 150 460 170 450 220" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="6 6" fill="none" />
            <circle cx="100" cy="180" r="4" fill="#a4b0be" opacity="0.6" />
            <circle cx="150" cy="155" r="4" fill="#a4b0be" opacity="0.6" />
            <circle cx="270" cy="148" r="5" fill="#a4b0be" opacity="0.6" />
            <circle cx="380" cy="158" r="4" fill="#a4b0be" opacity="0.6" />
            <circle cx="430" cy="185" r="4" fill="#a4b0be" opacity="0.6" />

            {/* Window Left Shutter */}
            <rect x="95" y="205" width="60" height="150" fill="#fdfbf7" stroke="#1c2d3a" strokeWidth="2.2" />
            <line x1="100" y1="220" x2="150" y2="220" stroke="#c48811" strokeWidth="4" />
            <line x1="100" y1="235" x2="150" y2="235" stroke="#c48811" strokeWidth="4" />
            <line x1="100" y1="250" x2="150" y2="250" stroke="#c48811" strokeWidth="4" />
            <line x1="100" y1="265" x2="150" y2="265" stroke="#c48811" strokeWidth="4" />
            <line x1="100" y1="280" x2="150" y2="280" stroke="#c48811" strokeWidth="4" />
            <line x1="100" y1="295" x2="150" y2="295" stroke="#c48811" strokeWidth="4" />
            <line x1="100" y1="310" x2="150" y2="310" stroke="#c48811" strokeWidth="4" />
            <line x1="100" y1="325" x2="150" y2="325" stroke="#c48811" strokeWidth="4" />
            <line x1="100" y1="340" x2="150" y2="340" stroke="#c48811" strokeWidth="4" />

            {/* Window Right Shutter */}
            <rect x="360" y="205" width="60" height="150" fill="#fdfbf7" stroke="#1c2d3a" strokeWidth="2.2" />
            <line x1="365" y1="220" x2="415" y2="220" stroke="#c48811" strokeWidth="4" />
            <line x1="365" y1="235" x2="415" y2="235" stroke="#c48811" strokeWidth="4" />
            <line x1="365" y1="250" x2="415" y2="250" stroke="#c48811" strokeWidth="4" />
            <line x1="365" y1="265" x2="415" y2="265" stroke="#c48811" strokeWidth="4" />
            <line x1="365" y1="280" x2="415" y2="280" stroke="#c48811" strokeWidth="4" />
            <line x1="365" y1="295" x2="415" y2="295" stroke="#c48811" strokeWidth="4" />
            <line x1="365" y1="310" x2="415" y2="310" stroke="#c48811" strokeWidth="4" />
            <line x1="365" y1="325" x2="415" y2="325" stroke="#c48811" strokeWidth="4" />
            <line x1="365" y1="340" x2="415" y2="340" stroke="#c48811" strokeWidth="4" />

            {/* Central Window Frame (Deep Navy) */}
            <rect x="155" y="180" width="205" height="20" fill="#133543" rx="2" />
            <rect x="165" y="200" width="185" height="170" fill="#ffffff" stroke="#133543" strokeWidth="4" />
            {/* Window panes */}
            <line x1="225" y1="200" x2="225" y2="370" stroke="#133543" strokeWidth="3" />
            <line x1="290" y1="200" x2="290" y2="370" stroke="#133543" strokeWidth="3" />
            <line x1="165" y1="250" x2="350" y2="250" stroke="#133543" strokeWidth="3" />
            <line x1="165" y1="300" x2="350" y2="300" stroke="#133543" strokeWidth="3" />

            {/* Speech bubble: "Welcome Back" */}
            <g filter="drop-shadow(0 4px 10px rgba(0,0,0,0.06))">
              <ellipse cx="320" cy="245" rx="35" ry="22" fill="#ffffff" stroke="#1c2d3a" strokeWidth="1.8" />
              <path d="M305 264 L295 278 L318 266 Z" fill="#ffffff" stroke="#1c2d3a" strokeWidth="1.8" strokeLinejoin="round" />
              <text x="320" y="243" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="10" fill="#1c2d3a">
                Welcome
              </text>
              <text x="320" y="255" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="10" fill="#1c2d3a">
                Back
              </text>
            </g>

            {/* Person leaning in window */}
            <g id="window-person">
              {/* Hair Back */}
              <path d="M185 300 C175 270 200 240 230 240 C265 240 285 265 275 305 C265 330 235 340 215 335 Z" fill="#1c2d3a" />
              
              {/* Face & Ear */}
              <circle cx="215" cy="275" r="24" fill="#fcd5ce" />
              <circle cx="195" cy="275" r="5" fill="#fcd5ce" />
              {/* Eyes, Nose, Mouth */}
              <ellipse cx="210" cy="272" rx="2" ry="2.5" fill="#1c2d3a" />
              <ellipse cx="225" cy="272" rx="2" ry="2.5" fill="#1c2d3a" />
              <path d="M216 278 L218 283" stroke="#1c2d3a" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M212 288 C216 292 222 292 226 288" stroke="#1c2d3a" strokeWidth="1.8" strokeLinecap="round" fill="none" />
              {/* Hair Front / Bangs */}
              <path d="M195 265 C205 250 240 250 250 268 C240 260 220 258 200 268 Z" fill="#1c2d3a" />
              <path d="M190 270 C185 285 190 310 195 320" stroke="#1c2d3a" strokeWidth="6" strokeLinecap="round" />

              {/* Mustard Polka-Dot Dress / Top */}
              <path d="M190 310 C210 300 245 300 265 310 L275 375 L180 375 Z" fill="#b97e0e" stroke="#1c2d3a" strokeWidth="2" />
              {/* Dotted texture */}
              <circle cx="210" cy="325" r="1.5" fill="#ffffff" />
              <circle cx="230" cy="320" r="1.5" fill="#ffffff" />
              <circle cx="250" cy="330" r="1.5" fill="#ffffff" />
              <circle cx="205" cy="345" r="1.5" fill="#ffffff" />
              <circle cx="225" cy="340" r="1.5" fill="#ffffff" />
              <circle cx="245" cy="350" r="1.5" fill="#ffffff" />

              {/* Raised Waving Hand */}
              <g id="waving-hand">
                {/* Arm from shoulder to raised hand */}
                <path d="M265 320 Q290 310 305 285" stroke="#b97e0e" strokeWidth="20" strokeLinecap="round" />
                <path d="M265 320 Q290 310 305 285" stroke="#1c2d3a" strokeWidth="2" fill="none" />
                {/* Open Hand with 4 fingers up + thumb */}
                <path d="M305 285 L303 260 C303 255 308 255 308 260 L310 280" fill="#fcd5ce" stroke="#1c2d3a" strokeWidth="1.8" />
                <path d="M310 280 L312 255 C312 250 317 250 317 255 L317 280" fill="#fcd5ce" stroke="#1c2d3a" strokeWidth="1.8" />
                <path d="M317 280 L321 257 C321 252 326 252 326 257 L324 282" fill="#fcd5ce" stroke="#1c2d3a" strokeWidth="1.8" />
                <path d="M324 282 L329 262 C329 257 334 257 334 262 L332 290" fill="#fcd5ce" stroke="#1c2d3a" strokeWidth="1.8" />
                <path d="M305 285 C298 280 293 285 298 292 L308 300" fill="#fcd5ce" stroke="#1c2d3a" strokeWidth="1.8" />
              </g>

              {/* Hand resting on window sill */}
              <g id="resting-hand">
                <path d="M210 370 C210 395 240 395 245 370" fill="#fcd5ce" stroke="#1c2d3a" strokeWidth="2" />
                <line x1="220" y1="375" x2="220" y2="390" stroke="#1c2d3a" strokeWidth="1.5" />
                <line x1="228" y1="375" x2="228" y2="392" stroke="#1c2d3a" strokeWidth="1.5" />
                <line x1="236" y1="375" x2="236" y2="390" stroke="#1c2d3a" strokeWidth="1.5" />
              </g>
            </g>

            {/* Window Planter Box with Flowers */}
            <g id="planter-box">
              {/* Planter Pot in Mustard/Tan */}
              <polygon points="140,390 380,390 365,425 155,425" fill="#a46e05" stroke="#1c2d3a" strokeWidth="2" />
              {/* White foaming flower clusters */}
              <path d="M135 390 C140 370 160 370 170 385 C180 365 200 365 210 380 C220 360 245 360 255 380 C270 360 295 360 305 380 C320 365 340 365 350 385 C360 370 380 370 385 390 Z" fill="#ffffff" stroke="#1c2d3a" strokeWidth="2" />
              {/* Flower Centers */}
              <circle cx="152" cy="380" r="5" fill="#a46e05" />
              <circle cx="190" cy="378" r="5" fill="#a46e05" />
              <circle cx="230" cy="375" r="5" fill="#a46e05" />
              <circle cx="280" cy="378" r="5" fill="#a46e05" />
              <circle cx="330" cy="378" r="5" fill="#a46e05" />
              <circle cx="365" cy="382" r="5" fill="#a46e05" />
            </g>
          </svg>
        </div>
      </div>

      {/* ── Right Side: Sign Up Form ── */}
      <div className="auth-page__right">
        <div className="auth-form-card">
          <DigaxyCrest />

          <div className="auth-header">
            <h1 className="auth-title">Sign Up</h1>
            <p className="auth-subtitle">
              Create your account to begin your journey with us
            </p>
          </div>

          {errorMsg && (
            <div className="auth-alert" style={{ background: '#fdf2f2', color: '#c53030', border: '1px solid #f8b4b4' }}>
              ⚠️ {errorMsg}
            </div>
          )}

          {successMsg && (
            <div className="auth-alert auth-alert--success">
              ✓ {successMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            {/* First & Last name row */}
            <div className="auth-name-row">
              <div className="auth-input-group">
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First name"
                  className="auth-input"
                  autoComplete="given-name"
                />
              </div>

              <div className="auth-input-group">
                <input
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last name"
                  className="auth-input"
                  autoComplete="family-name"
                />
              </div>
            </div>

            {/* Email */}
            <div className="auth-input-group">
              <span className="auth-input-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#60727d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="auth-input"
                autoComplete="email"
              />
            </div>

            {/* Password */}
            <div className="auth-input-group">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                className="auth-input auth-input--has-toggle"
                autoComplete="new-password"
              />
              <button
                type="button"
                className="auth-toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1c2d3a" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1c2d3a" strokeWidth="2" strokeLinecap="round">
                    <path d="M2 10s3.5 4 10 4 10-4 10-4" />
                    <line x1="12" y1="14" x2="12" y2="18" />
                    <line x1="6" y1="13" x2="4" y2="16" />
                    <line x1="18" y1="13" x2="20" y2="16" />
                    <line x1="9" y1="14" x2="8" y2="17.5" />
                    <line x1="15" y1="14" x2="16" y2="17.5" />
                  </svg>
                )}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="auth-input-group">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                className="auth-input auth-input--has-toggle"
                autoComplete="new-password"
              />
              <button
                type="button"
                className="auth-toggle-password"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
              >
                {showConfirmPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1c2d3a" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1c2d3a" strokeWidth="2" strokeLinecap="round">
                    <path d="M2 10s3.5 4 10 4 10-4 10-4" />
                    <line x1="12" y1="14" x2="12" y2="18" />
                    <line x1="6" y1="13" x2="4" y2="16" />
                    <line x1="18" y1="13" x2="20" y2="16" />
                    <line x1="9" y1="14" x2="8" y2="17.5" />
                    <line x1="15" y1="14" x2="16" y2="17.5" />
                  </svg>
                )}
              </button>
            </div>

            {/* Terms & Conditions */}
            <div className="auth-options-row">
              <label className="auth-checkbox-label">
                <input
                  type="checkbox"
                  required
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="auth-checkbox"
                />
                <span className="auth-checkbox-custom">
                  {agreeTerms && <span>✓</span>}
                </span>
                <span>I agree to the Terms &amp; conditions</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="auth-submit-btn"
              disabled={loading}
              id="signup-submit-btn"
            >
              {loading ? 'Creating account...' : 'Sign Up'}
            </button>

            {/* Switch to Sign In */}
            <p className="auth-switch-text" style={{ marginTop: '1.25rem' }}>
              Already have an account?{' '}
              <Link to="/login" className="auth-switch-link" id="goto-login-link">
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUp
