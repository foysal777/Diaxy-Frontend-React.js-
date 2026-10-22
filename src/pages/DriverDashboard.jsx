import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Dashboard.css'
import './DriverDashboard.css'

export function DriverSidebarLogo() {
  return (
    <div className="driver-crest-wrap">
      <svg width="40" height="40" viewBox="0 0 60 60" fill="none" aria-hidden="true">
        <path d="M30 5 C19 5 12 13 12 25 C12 39 25 50 30 54 C35 50 48 39 48 25 C48 13 41 5 30 5 Z" fill="none" stroke="#a46e05" strokeWidth="1.6" />
        <path d="M30 9 C22 9 16 15 16 25 C16 36 26 46 30 49 C34 46 44 36 44 25 C44 15 38 9 30 9 Z" fill="rgba(164, 110, 5, 0.05)" stroke="#a46e05" strokeWidth="0.8" strokeDasharray="2 2" />
        <path d="M7 23 C5 17 11 11 17 13 C13 17 11 23 11 27" stroke="#b8861e" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M53 23 C55 17 49 11 43 13 C47 17 49 23 49 27" stroke="#b8861e" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M23 14 L25 9 L30 12.5 L35 9 L37 14 Z" fill="#b8861e" />
        <text x="30" y="34" fontFamily="Georgia, serif" fontStyle="italic" fontWeight="700" fontSize="19" fill="#a46e05" textAnchor="middle">
          D
        </text>
      </svg>
      <div className="driver-crest-text">
        <span className="driver-crest-title">DIGAXY</span>
        <span className="driver-crest-sub">YOUR MOVE , OUR PRIORITY</span>
      </div>
    </div>
  )
}

function DriverDashboard() {
  const navigate = useNavigate()
  const [activeNav, setActiveNav] = useState('home')
  const [isOnline, setIsOnline] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [tripStatus, setTripStatus] = useState('available') // 'available' | 'accepted' | 'loading' | 'delivering' | 'completed'

  // Driver state
  const [driver, setDriver] = useState({
    name: 'Rakib Hassan',
    email: 'rakib.driver@digaxy.com',
    vehicle: 'Toyota Pickup Truck',
    regNo: 'Dhaka Metro-U 14-8921',
    rating: '4.9',
    completedTrips: 184,
    todayEarnings: 3450,
    totalBalance: 28400
  })

  // Settings modals
  const [settingsModal, setSettingsModal] = useState(null)
  const [currentPwd, setCurrentPwd] = useState('')
  const [newPwd, setNewPwd] = useState('')
  const [confirmPwd, setConfirmPwd] = useState('')
  const [pwdMsg, setPwdMsg] = useState('')
  const [pwdError, setPwdError] = useState('')

  useEffect(() => {
    try {
      const stored = localStorage.getItem('currentUser')
      if (stored) {
        const parsed = JSON.parse(stored)
        if (parsed.role === 'driver' || parsed.vehicle) {
          setDriver(prev => ({ ...prev, ...parsed }))
        }
      }
    } catch {
      // fallback
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('currentUser')
    navigate('/login')
  }

  return (
    <div className="dash-layout" id="driver-dashboard-page">
      {/* Mobile Top Bar */}
      <div className="dash-mobile-bar">
        <button
          className="dash-mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        <span className="dash-mobile-title">Driver: {driver.name}</span>
      </div>

      {/* ── Left Sidebar (Matching Driver Design) ── */}
      <aside className={`dash-sidebar ${mobileMenuOpen ? 'dash-sidebar--open' : ''}`}>
        <div className="dash-sidebar__top">
          {/* Logo Crest on top */}
          <DriverSidebarLogo />

          <nav className="dash-nav" aria-label="Driver dashboard navigation">
            {/* 1. Home */}
            <button
              className={`dash-nav__item ${activeNav === 'home' ? 'dash-nav__item--active' : ''}`}
              onClick={() => { setActiveNav('home'); setMobileMenuOpen(false); }}
              id="driver-nav-home"
            >
              <span className="dash-nav__icon">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#b8861e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" />
                  <polyline points="9 21 9 12 15 12 15 21" />
                </svg>
              </span>
              <span className="dash-nav__label">Home</span>
            </button>

            {/* 2. Earnings */}
            <button
              className={`dash-nav__item ${activeNav === 'earnings' ? 'dash-nav__item--active' : ''}`}
              onClick={() => { setActiveNav('earnings'); setMobileMenuOpen(false); }}
              id="driver-nav-earnings"
            >
              <span className="dash-nav__icon">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#b8861e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="6" width="20" height="13" rx="2.5" />
                  <circle cx="16" cy="12.5" r="2" />
                  <path d="M2 10.5h20" />
                </svg>
              </span>
              <span className="dash-nav__label">Earnings</span>
            </button>

            {/* 3. Progress */}
            <button
              className={`dash-nav__item ${activeNav === 'progress' ? 'dash-nav__item--active' : ''}`}
              onClick={() => { setActiveNav('progress'); setMobileMenuOpen(false); }}
              id="driver-nav-progress"
            >
              <span className="dash-nav__icon">
                <svg viewBox="0 0 24 24" width="22" height="18" fill="none" stroke="#b8861e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="10" rx="5" />
                  <circle cx="8" cy="12" r="2" fill="#b8861e" />
                </svg>
              </span>
              <span className="dash-nav__label">Progress</span>
            </button>

            {/* 4. Notification */}
            <button
              className={`dash-nav__item ${activeNav === 'notification' ? 'dash-nav__item--active' : ''}`}
              onClick={() => { setActiveNav('notification'); setMobileMenuOpen(false); }}
              id="driver-nav-notification"
            >
              <span className="dash-nav__icon">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#b8861e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
              </span>
              <span className="dash-nav__label">Notification</span>
            </button>

            {/* 5. Setting */}
            <button
              className={`dash-nav__item ${activeNav === 'setting' ? 'dash-nav__item--active' : ''}`}
              onClick={() => { setActiveNav('setting'); setMobileMenuOpen(false); }}
              id="driver-nav-setting"
            >
              <span className="dash-nav__icon">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#b8861e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
              </span>
              <span className="dash-nav__label">Setting</span>
            </button>
          </nav>
        </div>

        {/* Bottom Profile & Logout */}
        <div className="dash-sidebar__bottom">
          <div className="dash-user-profile" id="driver-user-profile">
            <span className="dash-nav__icon">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#b8861e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </span>
            <span className="dash-user-name">{driver.name || 'Rakib Hassan'}</span>
          </div>

          <button className="dash-logout-btn" onClick={handleLogout} id="driver-logout-btn" aria-label="Log out">
            <span className="dash-nav__icon">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#b8861e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </span>
            <span className="dash-logout-label">Log out</span>
          </button>
        </div>
      </aside>

      {/* ── Main Content Area ── */}
      <main className="dash-main">
        {/* 1. HOME TAB */}
        {activeNav === 'home' && (
          <div className="dash-content-pane driver-content-pane animate-fade-in">
            {/* Header with Online/Offline toggle */}
            <div className="driver-top-header">
              <div>
                <h1 className="dash-title">Welcome, {driver.name.split(' ')[0]}!</h1>
                <p className="dash-subtitle">Vehicle: {driver.vehicle} • {driver.regNo}</p>
              </div>

              <div className="driver-status-card">
                <div className={`driver-status-pill ${isOnline ? 'driver-status-pill--online' : 'driver-status-pill--offline'}`}>
                  <span className="driver-status-dot"></span>
                  <span>{isOnline ? 'Online (Accepting Trips)' : 'Offline (On Break)'}</span>
                </div>
                <button
                  type="button"
                  className="driver-status-toggle-btn"
                  onClick={() => setIsOnline(!isOnline)}
                >
                  {isOnline ? 'Go Offline' : 'Go Online'}
                </button>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="driver-stats-grid">
              <div className="driver-stat-card">
                <span className="driver-stat-icon">💰</span>
                <div>
                  <span className="driver-stat-val">৳{driver.todayEarnings.toLocaleString()}</span>
                  <span className="driver-stat-label">Today's Earnings</span>
                </div>
              </div>

              <div className="driver-stat-card">
                <span className="driver-stat-icon">🚚</span>
                <div>
                  <span className="driver-stat-val">4 Moves</span>
                  <span className="driver-stat-label">Completed Today</span>
                </div>
              </div>

              <div className="driver-stat-card">
                <span className="driver-stat-icon">⭐</span>
                <div>
                  <span className="driver-stat-val">{driver.rating} / 5.0</span>
                  <span className="driver-stat-label">Customer Rating</span>
                </div>
              </div>

              <div className="driver-stat-card">
                <span className="driver-stat-icon">⏱️</span>
                <div>
                  <span className="driver-stat-val">5.4 Hours</span>
                  <span className="driver-stat-label">On Duty Today</span>
                </div>
              </div>
            </div>

            {/* Dispatch / Move Request Section */}
            <section className="dash-section" style={{ marginTop: '28px' }}>
              <div className="dash-section-header-row">
                <h2 className="dash-section-title">Live Dispatch Requests</h2>
                <span className="driver-badge-live">LIVE IN DHAKA</span>
              </div>

              {tripStatus === 'available' && (
                <div className="driver-request-card animate-fade-in">
                  <div className="driver-request-header">
                    <div>
                      <span className="driver-request-tag">New Move Offer</span>
                      <h3 className="driver-request-price">৳1,450</h3>
                    </div>
                    <div className="driver-request-est">
                      <span>Est. 9.8 km • ~35 mins</span>
                      <small>Vehicle: Pickup Truck Required</small>
                    </div>
                  </div>

                  {/* Route Visual */}
                  <div className="driver-request-route">
                    <div className="driver-route-row">
                      <span className="driver-pin-dot driver-pin-dot--green"></span>
                      <div>
                        <strong>Pickup:</strong> Road 27, Dhanmondi, Dhaka
                      </div>
                    </div>
                    <div className="driver-route-line"></div>
                    <div className="driver-route-row">
                      <span className="driver-pin-dot driver-pin-dot--red"></span>
                      <div>
                        <strong>Drop-off:</strong> Gulshan 1, Avenue 1, Dhaka
                      </div>
                    </div>
                  </div>

                  {/* Customer Info */}
                  <div className="driver-request-details">
                    <div>
                      <span>Customer:</span>
                      <strong>Joe Mitchell</strong>
                    </div>
                    <div>
                      <span>Payment:</span>
                      <strong style={{ color: '#107C41' }}>Cash on Delivery</strong>
                    </div>
                    <div>
                      <span>Items:</span>
                      <strong>1 Bed, 4 Boxes, 1 Refrigerator</strong>
                    </div>
                  </div>

                  {/* Accept / Decline actions */}
                  <div className="driver-request-actions">
                    <button
                      type="button"
                      className="driver-btn driver-btn--decline"
                      onClick={() => alert('Offer declined. Searching next dispatch...')}
                    >
                      Decline
                    </button>
                    <button
                      type="button"
                      className="driver-btn driver-btn--accept"
                      onClick={() => setTripStatus('accepted')}
                    >
                      Accept Move (৳1,450)
                    </button>
                  </div>
                </div>
              )}

              {/* Active Trip Workflow */}
              {tripStatus !== 'available' && (
                <div className="driver-active-trip-card animate-fade-in">
                  <div className="driver-active-header">
                    <div>
                      <span className="driver-badge-active">Move in Progress</span>
                      <h3>Pickup: Road 27, Dhanmondi, Dhaka</h3>
                      <p>Destination: Gulshan 1, Avenue 1, Dhaka • Fare: ৳1,450</p>
                    </div>
                    <a href="tel:+8801712345678" className="driver-call-btn">
                      📞 Call Joe Mitchell
                    </a>
                  </div>

                  <div className="driver-steps-track">
                    <div className={`driver-step ${['accepted', 'loading', 'delivering', 'completed'].includes(tripStatus) ? 'driver-step--active' : ''}`}>
                      <span>1</span>
                      <label>En Route to Pickup</label>
                    </div>
                    <div className={`driver-step ${['loading', 'delivering', 'completed'].includes(tripStatus) ? 'driver-step--active' : ''}`}>
                      <span>2</span>
                      <label>Loading Furniture</label>
                    </div>
                    <div className={`driver-step ${['delivering', 'completed'].includes(tripStatus) ? 'driver-step--active' : ''}`}>
                      <span>3</span>
                      <label>Heading to Gulshan</label>
                    </div>
                    <div className={`driver-step ${tripStatus === 'completed' ? 'driver-step--active' : ''}`}>
                      <span>4</span>
                      <label>Delivered & Paid</label>
                    </div>
                  </div>

                  <div className="driver-step-action-row">
                    {tripStatus === 'accepted' && (
                      <button
                        type="button"
                        className="driver-btn driver-btn--accept"
                        onClick={() => setTripStatus('loading')}
                      >
                        Arrived at Dhanmondi Pickup
                      </button>
                    )}
                    {tripStatus === 'loading' && (
                      <button
                        type="button"
                        className="driver-btn driver-btn--accept"
                        onClick={() => setTripStatus('delivering')}
                      >
                        Goods Loaded • Start Transit
                      </button>
                    )}
                    {tripStatus === 'delivering' && (
                      <button
                        type="button"
                        className="driver-btn driver-btn--accept"
                        onClick={() => {
                          setTripStatus('completed')
                          setDriver(prev => ({
                            ...prev,
                            todayEarnings: prev.todayEarnings + 1450,
                            totalBalance: prev.totalBalance + 1450
                          }))
                        }}
                      >
                        Delivered & Collect ৳1,450 Cash
                      </button>
                    )}
                    {tripStatus === 'completed' && (
                      <div className="driver-trip-done-box">
                        <div className="driver-done-icon">✓</div>
                        <h4>Move Completed Successfully!</h4>
                        <p>৳1,450 added to your account earnings.</p>
                        <button
                          type="button"
                          className="driver-btn driver-btn--accept"
                          style={{ marginTop: '12px' }}
                          onClick={() => setTripStatus('available')}
                        >
                          Ready for Next Trip
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </section>
          </div>
        )}

        {/* 2. EARNINGS TAB */}
        {activeNav === 'earnings' && (
          <div className="dash-content-pane driver-content-pane animate-fade-in">
            <header className="dash-header">
              <h1 className="dash-title">My Earnings</h1>
              <p className="dash-subtitle">Track your weekly dispatches, payout settlements, and trip history.</p>
            </header>

            <div className="driver-wallet-card">
              <div className="driver-wallet-balance">
                <span>Withdrawable Balance</span>
                <h2>৳{driver.totalBalance.toLocaleString()}</h2>
                <small>Bank / bKash / Nagad instant payout available</small>
              </div>
              <button
                type="button"
                className="dash-continue-btn"
                style={{ maxWidth: '200px' }}
                onClick={() => alert('Withdrawal request of ৳' + driver.totalBalance + ' initiated to bKash.')}
              >
                Withdraw Balance
              </button>
            </div>

            <h3 className="dash-section-title" style={{ marginTop: '30px', marginBottom: '14px' }}>
              Recent Completed Trips
            </h3>

            <div className="dash-card-box">
              <div className="dash-booking-list">
                <div className="dash-booking-item">
                  <div className="dash-booking-item__badge">Completed</div>
                  <div className="dash-booking-item__info">
                    <h4>Road 27, Dhanmondi → Gulshan 1, Dhaka</h4>
                    <p>Customer: Joe Mitchell • Distance: 9.8 km</p>
                    <span className="dash-booking-item__meta">Today at 11:20 AM • Cash collected</span>
                  </div>
                  <strong style={{ color: '#107C41', fontSize: '1.1rem' }}>+৳1,450</strong>
                </div>

                <div className="dash-booking-item">
                  <div className="dash-booking-item__badge">Completed</div>
                  <div className="dash-booking-item__info">
                    <h4>Sector 7, Uttara → Block C, Bashundhara R/A</h4>
                    <p>Customer: Karim Ahmed • Distance: 12.3 km</p>
                    <span className="dash-booking-item__meta">Yesterday at 3:45 PM • bKash</span>
                  </div>
                  <strong style={{ color: '#107C41', fontSize: '1.1rem' }}>+৳2,000</strong>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. PROGRESS TAB */}
        {activeNav === 'progress' && (
          <div className="dash-content-pane driver-content-pane animate-fade-in">
            <header className="dash-header">
              <h1 className="dash-title">Driver Progress & Tier</h1>
              <p className="dash-subtitle">Your monthly performance metrics and partner rewards level.</p>
            </header>

            <div className="driver-progress-tier-card">
              <div className="driver-tier-badge">
                <span>⭐⭐⭐</span>
                <h3>Gold Mover Partner</h3>
                <p>Eligible for zero-commission weekend moves</p>
              </div>

              <div className="driver-meters-grid">
                <div className="driver-meter">
                  <label>Acceptance Rate</label>
                  <div className="driver-bar-wrap">
                    <div className="driver-bar-fill" style={{ width: '96%' }}></div>
                  </div>
                  <strong>96% (High)</strong>
                </div>

                <div className="driver-meter">
                  <label>On-Time Arrival</label>
                  <div className="driver-bar-wrap">
                    <div className="driver-bar-fill" style={{ width: '98%' }}></div>
                  </div>
                  <strong>98%</strong>
                </div>

                <div className="driver-meter">
                  <label>Customer Rating</label>
                  <div className="driver-bar-wrap">
                    <div className="driver-bar-fill" style={{ width: '97%' }}></div>
                  </div>
                  <strong>4.9 / 5.0 (Excellent)</strong>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 4. NOTIFICATION TAB */}
        {activeNav === 'notification' && (
          <div className="dash-content-pane driver-content-pane animate-fade-in">
            <header className="dash-header">
              <h1 className="dash-title">Driver Notifications</h1>
              <p className="dash-subtitle">Alerts on high demand zones, promotions, and dispatches.</p>
            </header>

            <div className="dash-notif-list">
              <div className="dash-notif-item">
                <span className="dash-notif-dot"></span>
                <div>
                  <h4>High Move Demand in Dhanmondi & Gulshan</h4>
                  <p>Surge bonus of +৳250 extra on moves originating from Dhanmondi today.</p>
                  <small>10 mins ago</small>
                </div>
              </div>

              <div className="dash-notif-item">
                <span className="dash-notif-dot dash-notif-dot--read"></span>
                <div>
                  <h4>Payment Settled: ৳2,000</h4>
                  <p>Uttara to Bashundhara trip fare has been credited to your wallet.</p>
                  <small>Yesterday</small>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 5. SETTING TAB (Matching the Settings Design) */}
        {activeNav === 'setting' && (
          <div className="dash-content-pane dash-settings-pane animate-fade-in">
            <div className="dash-settings-header">
              <button
                type="button"
                className="dash-settings-back-btn"
                onClick={() => setActiveNav('home')}
                aria-label="Back to home"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1C2D3A" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                <h1 className="dash-settings-title">Settings</h1>
              </button>
            </div>

            <h2 className="dash-settings-subtitle">Account Settings</h2>

            <div className="dash-settings-profile">
              <div className="dash-settings-avatar-wrap">
                <img
                  src="/images/avatar.jpg"
                  alt={driver.name}
                  className="dash-settings-avatar"
                />
              </div>
              <div className="dash-settings-user-info">
                <h3 className="dash-settings-user-name">{driver.name}</h3>
                <p className="dash-settings-user-email">{driver.email}</p>
                <small style={{ color: '#107C41', fontWeight: 600 }}>Verified Partner Driver</small>
              </div>
            </div>

            {/* Change Password */}
            <div
              className="dash-settings-item"
              onClick={() => {
                setPwdMsg('')
                setPwdError('')
                setSettingsModal('password')
              }}
              role="button"
              tabIndex={0}
            >
              <span className="dash-settings-item__label">Change Password</span>
              <span className="dash-settings-item__chevron">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#253846" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </span>
            </div>

            <h3 className="dash-settings-more-title">More</h3>

            {/* Privacy Policy */}
            <div
              className="dash-settings-item"
              onClick={() => setSettingsModal('privacy')}
              role="button"
              tabIndex={0}
            >
              <span className="dash-settings-item__label">Privacy Policy</span>
              <span className="dash-settings-item__chevron">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#253846" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </span>
            </div>

            {/* Terms & Condition */}
            <div
              className="dash-settings-item"
              onClick={() => setSettingsModal('terms')}
              role="button"
              tabIndex={0}
            >
              <span className="dash-settings-item__label">Terms & Condition</span>
              <span className="dash-settings-item__chevron">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#253846" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </span>
            </div>

            {/* Helps & Support */}
            <div
              className="dash-settings-item"
              onClick={() => setSettingsModal('support')}
              role="button"
              tabIndex={0}
            >
              <span className="dash-settings-item__label">Helps & Support</span>
              <span className="dash-settings-item__chevron">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#253846" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </span>
            </div>

            {/* Logout */}
            <div
              className="dash-settings-item dash-settings-item--logout"
              onClick={handleLogout}
              role="button"
              tabIndex={0}
            >
              <span className="dash-settings-item__label">Logout</span>
              <span className="dash-settings-item__logout-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FF3B30" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
              </span>
            </div>
          </div>
        )}
      </main>

      {/* Settings Sub-Modals */}
      {settingsModal && (
        <div className="dash-modal-overlay animate-fade-in" onClick={() => setSettingsModal(null)}>
          <div className="dash-modal-card dash-settings-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="dash-modal-header">
              <h3>
                {settingsModal === 'password' && 'Change Password'}
                {settingsModal === 'privacy' && 'Driver Privacy Policy'}
                {settingsModal === 'terms' && 'Driver Terms & Agreement'}
                {settingsModal === 'support' && 'Driver Helpline & Support'}
              </h3>
              <button className="dash-modal-close" onClick={() => setSettingsModal(null)}>✕</button>
            </div>

            {settingsModal === 'password' && (
              <form
                className="dash-password-form"
                onSubmit={(e) => {
                  e.preventDefault()
                  if (!currentPwd || !newPwd || !confirmPwd) {
                    setPwdError('Please fill all password fields.')
                    return
                  }
                  if (newPwd !== confirmPwd) {
                    setPwdError('New passwords do not match.')
                    return
                  }
                  setPwdError('')
                  setPwdMsg('Password updated successfully!')
                  setTimeout(() => setSettingsModal(null), 1200)
                }}
              >
                {pwdError && <div className="dash-form-error">{pwdError}</div>}
                {pwdMsg && <div className="dash-form-success">{pwdMsg}</div>}

                <div className="dash-form-row">
                  <label>Current Password</label>
                  <input
                    type="password"
                    value={currentPwd}
                    onChange={(e) => setCurrentPwd(e.target.value)}
                    placeholder="Enter current password"
                  />
                </div>

                <div className="dash-form-row">
                  <label>New Password</label>
                  <input
                    type="password"
                    value={newPwd}
                    onChange={(e) => setNewPwd(e.target.value)}
                    placeholder="New password (min 6 chars)"
                  />
                </div>

                <div className="dash-form-row">
                  <label>Confirm New Password</label>
                  <input
                    type="password"
                    value={confirmPwd}
                    onChange={(e) => setConfirmPwd(e.target.value)}
                    placeholder="Confirm new password"
                  />
                </div>

                <div className="dash-modal-footer" style={{ marginTop: '20px' }}>
                  <button type="button" className="dash-modal-btn dash-modal-btn--secondary" onClick={() => setSettingsModal(null)}>
                    Cancel
                  </button>
                  <button type="submit" className="dash-modal-btn dash-modal-btn--primary">
                    Update Password
                  </button>
                </div>
              </form>
            )}

            {settingsModal === 'support' && (
              <div className="dash-info-modal-body">
                <p>Dedicated 24/7 Driver Support Desk for on-road assistance, route breakdown, and payout help:</p>
                <div className="dash-support-channels">
                  <div className="dash-support-card">
                    <span className="dash-support-icon">📞</span>
                    <div>
                      <strong>Driver Hotline (Dhaka)</strong>
                      <p>+880 9612-344299 (Ext 2)</p>
                    </div>
                  </div>
                  <div className="dash-support-card">
                    <span className="dash-support-icon">💬</span>
                    <div>
                      <strong>Driver WhatsApp Dispatch</strong>
                      <p>+880 1712-998877</p>
                    </div>
                  </div>
                  <div className="dash-support-card">
                    <span className="dash-support-icon">📍</span>
                    <div>
                      <strong>Driver Onboarding Center</strong>
                      <p>Road 27, Dhanmondi, Dhaka</p>
                    </div>
                  </div>
                </div>
                <div className="dash-modal-footer" style={{ marginTop: '20px' }}>
                  <button type="button" className="dash-modal-btn dash-modal-btn--primary" onClick={() => setSettingsModal(null)}>
                    Close
                  </button>
                </div>
              </div>
            )}

            {(settingsModal === 'privacy' || settingsModal === 'terms') && (
              <div className="dash-info-modal-body">
                <p>Certified Digaxy partner drivers adhere to safety, cargo protection, and fair pricing standards across Bangladesh.</p>
                <h4>Driver Guarantee</h4>
                <p>100% payout protection on all completed dispatches with zero hidden service charges on cash-collected trips.</p>
                <div className="dash-modal-footer" style={{ marginTop: '20px' }}>
                  <button type="button" className="dash-modal-btn dash-modal-btn--primary" onClick={() => setSettingsModal(null)}>
                    Understood
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default DriverDashboard
