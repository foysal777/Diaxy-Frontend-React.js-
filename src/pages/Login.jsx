import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Login.css'

export function DigaxyCrest() {
  return (
    <div className="auth-crest">
      <svg width="46" height="46" viewBox="0 0 60 60" fill="none" aria-hidden="true">
        {/* Shield Border */}
        <path d="M30 5 C19 5 12 13 12 25 C12 39 25 50 30 54 C35 50 48 39 48 25 C48 13 41 5 30 5 Z" fill="none" stroke="#a46e05" strokeWidth="1.6" />
        <path d="M30 9 C22 9 16 15 16 25 C16 36 26 46 30 49 C34 46 44 36 44 25 C44 15 38 9 30 9 Z" fill="rgba(164, 110, 5, 0.05)" stroke="#a46e05" strokeWidth="0.8" strokeDasharray="2 2" />
        {/* Side flourishes */}
        <path d="M7 23 C5 17 11 11 17 13 C13 17 11 23 11 27" stroke="#b8861e" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M53 23 C55 17 49 11 43 13 C47 17 49 23 49 27" stroke="#b8861e" strokeWidth="1.2" strokeLinecap="round" />
        {/* Crown */}
        <path d="M23 14 L25 9 L30 12.5 L35 9 L37 14 Z" fill="#b8861e" />
        {/* Letter D */}
        <text x="30" y="34" fontFamily="Georgia, serif" fontStyle="italic" fontWeight="700" fontSize="19" fill="#a46e05" textAnchor="middle">
          D
        </text>
      </svg>
      <div className="auth-crest__info">
        <span className="auth-crest__title">DIGAXY</span>
        <span className="auth-crest__sub">YOUR MOVE , OUR PRIORITY</span>
      </div>
    </div>
  )
}

function Login() {
  const navigate = useNavigate()
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [loading, setLoading] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')
  const [forgotModal, setForgotModal] = useState(false)
  const [forgotEmail, setForgotEmail] = useState('')
  const [forgotDone, setForgotDone] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSuccessMsg('Logged in successfully! Redirecting to home...')
      setTimeout(() => {
        navigate('/')
      }, 1200)
    }, 600)
  }

  const handleForgotPassword = (e) => {
    e.preventDefault()
    setForgotDone(true)
    setTimeout(() => {
      setForgotModal(false)
      setForgotDone(false)
    }, 2000)
  }

  return (
    <div className="auth-page" id="login-page">
      {/* ── Left Side: Back button & Illustration ── */}
      <div className="auth-page__left">
        <div className="auth-page__topbar">
          <Link to="/" className="auth-back-btn" id="login-back-btn">
            Back to website <span className="auth-back-arrow">→</span>
          </Link>
        </div>

        <div className="auth-illustration-wrap">
          <svg
            className="auth-illustration-svg"
            viewBox="0 0 560 480"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Login user workspace illustration"
          >
            {/* Background window frame & vine motifs */}
            <rect x="70" y="140" width="360" height="230" rx="8" fill="#f8f9fa" stroke="#22333b" strokeWidth="2.5" />
            <rect x="95" y="160" width="310" height="190" fill="#f1f3f5" />
            
            {/* Background leafy pattern */}
            <g opacity="0.4">
              <path d="M100 180 C115 160 145 170 140 190 C125 210 95 200 100 180 Z" fill="#a4b0be" />
              <path d="M120 220 C135 200 165 210 160 230 C145 250 115 240 120 220 Z" fill="#a4b0be" />
              <path d="M340 180 C325 160 295 170 300 190 C315 210 345 200 340 180 Z" fill="#a4b0be" />
              <path d="M370 230 C355 210 325 220 330 240 C345 260 375 250 370 230 Z" fill="#a4b0be" />
            </g>

            {/* Floating Login Dialogue Box */}
            <g filter="drop-shadow(0 8px 16px rgba(0,0,0,0.08))">
              <path d="M160 195 L340 195 C346 195 350 199 350 205 L350 325 C350 331 346 335 340 335 L285 335 L260 355 L265 335 L160 335 C154 335 150 331 150 325 L150 205 C150 199 154 195 160 195 Z" fill="#ffffff" stroke="#1c2d3a" strokeWidth="2.5" />
              {/* User Avatar Circle */}
              <circle cx="250" cy="225" r="22" fill="#ffffff" stroke="#1c2d3a" strokeWidth="2.5" />
              <circle cx="250" cy="218" r="8" fill="#1c2d3a" />
              <path d="M236 238 C236 230 242 227 250 227 C258 227 264 230 264 238 Z" fill="#1c2d3a" />
              
              <text x="250" y="260" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="13" fill="#1c2d3a" letterSpacing="1">
                LOGIN
              </text>
              {/* Username Input box */}
              <rect x="180" y="270" width="140" height="18" rx="2" fill="#ffffff" stroke="#1c2d3a" strokeWidth="1.5" />
              <text x="250" y="283" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="8" fill="#718096" letterSpacing="0.8">
                USERNAME
              </text>
              {/* Password Input box */}
              <rect x="180" y="296" width="140" height="18" rx="2" fill="#ffffff" stroke="#1c2d3a" strokeWidth="1.5" />
              <text x="250" y="309" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="8" fill="#718096" letterSpacing="0.8">
                PASSWORD
              </text>
            </g>

            {/* Desk Surface */}
            <line x1="40" y1="440" x2="480" y2="440" stroke="#d5c8b2" strokeWidth="3" />
            <rect x="230" y="395" width="160" height="45" fill="#fdfcf9" stroke="#1c2d3a" strokeWidth="2" rx="2" />
            {/* Monitor on Desk */}
            <rect x="245" y="385" width="60" height="8" rx="2" fill="#ffffff" stroke="#1c2d3a" strokeWidth="1.5" />
            <line x1="315" y1="345" x2="305" y2="395" stroke="#1c2d3a" strokeWidth="3" />
            <rect x="300" y="395" width="30" height="5" rx="2" fill="#1c2d3a" />

            {/* Potted Plant */}
            <rect x="360" y="405" width="14" height="25" rx="2" fill="#d99b26" stroke="#1c2d3a" strokeWidth="1.5" />
            <path d="M367 405 L367 380 M367 395 C360 390 355 385 358 375 M367 385 C375 380 380 375 377 368" stroke="#1c2d3a" strokeWidth="1.8" strokeLinecap="round" />
            <circle cx="358" cy="375" r="3" fill="#a46e05" />
            <circle cx="377" cy="368" r="3" fill="#a46e05" />
            <circle cx="367" cy="380" r="3" fill="#a46e05" />

            {/* Chair & Woman working */}
            <path d="M135 390 L135 440" stroke="#1c2d3a" strokeWidth="8" strokeLinecap="round" strokeDasharray="30 5" fill="none" opacity="0.4" />
            <rect x="135" y="380" width="18" height="60" rx="9" fill="#c48811" stroke="#1c2d3a" strokeWidth="1.5" />
            
            {/* Person Torso & Arms */}
            <g id="person-worker">
              <circle cx="170" cy="310" r="16" fill="#1c2d3a" /> {/* Hair Bun */}
              <circle cx="160" cy="320" r="10" fill="#ffffff" stroke="#1c2d3a" strokeWidth="1.5" /> {/* Scrunchie */}
              <path d="M175 320 C182 318 190 324 188 335 C186 345 178 350 170 348" fill="#fcd5ce" stroke="#1c2d3a" strokeWidth="1.5" /> {/* Face Profile */}
              {/* Eye & Brow */}
              <ellipse cx="185" cy="332" rx="1.5" ry="2" fill="#1c2d3a" />
              {/* Hair strands */}
              <path d="M170 315 C180 315 186 322 188 328" stroke="#1c2d3a" strokeWidth="2.5" fill="none" />
              {/* Collar & Mustard Top */}
              <path d="M168 345 C174 345 178 350 178 356 L155 356 C155 350 160 345 168 345 Z" fill="#1c2d3a" />
              <path d="M152 355 C165 355 178 355 186 362 L210 405 C215 412 210 422 200 420 L168 440 L140 440 L152 355 Z" fill="#b97e0e" stroke="#1c2d3a" strokeWidth="2" />
              {/* Sleeve and Arms typing on keyboard */}
              <path d="M178 368 L240 405 C248 409 255 415 260 415" stroke="#b97e0e" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M178 368 L240 405 C248 409 255 415 260 415" stroke="#1c2d3a" strokeWidth="2" fill="none" />
              {/* Hand */}
              <path d="M255 413 C262 410 268 414 266 422 C262 425 255 422 250 420 Z" fill="#fcd5ce" stroke="#1c2d3a" strokeWidth="1.5" />
            </g>
          </svg>
        </div>
      </div>

      {/* ── Right Side: Auth Form ── */}
      <div className="auth-page__right">
        <div className="auth-form-card">
          <DigaxyCrest />

          <div className="auth-header">
            <h1 className="auth-title">Welcome to Back!</h1>
            <p className="auth-subtitle">
              Please log into your account and take out start the adventure.
            </p>
          </div>

          {successMsg && (
            <div className="auth-alert auth-alert--success" role="status">
              ✓ {successMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            {/* Phone */}
            <div className="auth-input-group">
              <span className="auth-input-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#60727d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone"
                className="auth-input"
                autoComplete="tel"
              />
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
                autoComplete="current-password"
              />
              <button
                type="button"
                className="auth-toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  /* Eye closed / eyelashes icon matching design */
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

            {/* Remember Me & Forgot Password */}
            <div className="auth-options-row">
              <label className="auth-checkbox-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="auth-checkbox"
                />
                <span className="auth-checkbox-custom">
                  {rememberMe && <span>✓</span>}
                </span>
                <span>Remember me</span>
              </label>

              <button
                type="button"
                className="auth-forgot-link"
                onClick={() => setForgotModal(true)}
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="auth-submit-btn"
              disabled={loading}
              id="login-submit-btn"
            >
              {loading ? 'Logging in...' : 'Log In'}
            </button>

            {/* Or Divider */}
            <div className="auth-divider">
              <span className="auth-divider-line" />
              <span className="auth-divider-text">Or</span>
              <span className="auth-divider-line" />
            </div>

            {/* Social Logins */}
            <div className="auth-social-row">
              <button
                type="button"
                className="auth-social-btn"
                onClick={() => {
                  setSuccessMsg('Connecting with Google...')
                  setTimeout(() => navigate('/'), 1000)
                }}
                aria-label="Sign in with Google"
              >
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Google</span>
              </button>

              <button
                type="button"
                className="auth-social-btn"
                onClick={() => {
                  setSuccessMsg('Connecting with Apple...')
                  setTimeout(() => navigate('/'), 1000)
                }}
                aria-label="Sign in with Apple"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#000000">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.88c.62-.77 1.05-1.83.93-2.88-.91.04-2 .61-2.65 1.38-.57.66-1.07 1.74-.93 2.76 1.02.08 2.03-.5 2.65-1.26z" />
                </svg>
                <span>Apple</span>
              </button>
            </div>

            {/* Switch to Signup */}
            <p className="auth-switch-text">
              Don't have an account?{' '}
              <Link to="/signup" className="auth-switch-link" id="goto-signup-link">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {forgotModal && (
        <div className="auth-modal-overlay" onClick={() => setForgotModal(false)}>
          <div className="auth-modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="auth-modal-close"
              onClick={() => setForgotModal(false)}
              aria-label="Close modal"
            >
              ×
            </button>
            <h3 className="auth-modal-title">Reset Password</h3>
            <p className="auth-modal-desc">
              Enter your registered email address and we'll send you instructions to reset your password.
            </p>
            {forgotDone ? (
              <div className="auth-alert auth-alert--success">
                ✓ Password reset link sent to your email!
              </div>
            ) : (
              <form onSubmit={handleForgotPassword} className="auth-modal-form">
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  className="auth-input"
                />
                <button type="submit" className="auth-submit-btn" style={{ marginTop: '1rem' }}>
                  Send Reset Link
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Login
