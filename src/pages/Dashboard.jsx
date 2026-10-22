import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Dashboard.css'

const VEHICLES = [
  {
    id: 'pickup',
    name: 'Pickup Truck',
    price: '$42.92 + $1.62',
    unit: 'per labor min',
    image: '/images/vehicles/pickup.jpg',
    description: 'Perfect for small loads, single items, couches, or light studio moves.'
  },
  {
    id: 'van',
    name: 'Van',
    price: '$77 + $2.02',
    unit: 'per labor min',
    image: '/images/vehicles/van.jpg',
    description: 'Ideal for 1-bedroom apartments, boxes, appliances, and moderate furniture.'
  },
  {
    id: 'mini_box',
    name: 'Mini Box Truck',
    price: '$144.51 + $2.30',
    unit: 'per labor min',
    image: '/images/vehicles/mini-box-truck.jpg',
    description: 'Great for 2-bedroom homes, large bulky items, and heavier freight.'
  },
  {
    id: 'box_truck_26',
    name: '26-foot Box truck',
    price: '$230 + $4.99',
    unit: 'per labor min',
    image: '/images/vehicles/box-truck-26ft.jpg',
    description: 'Commercial scale for full 3-4 bedroom homes and extensive office relocations.'
  }
]

const SAVED_PICKUP_ADDRESSES = [
  'Road 27, Dhanmondi, Dhaka',
  'Gulshan 2 (Near Circle), Dhaka',
  'Road 11, Banani, Dhaka',
  'Sector 7, Uttara, Dhaka',
  'Block C, Bashundhara R/A, Dhaka',
  'Mirpur 10 Circle, Dhaka',
  'GEC Circle, Chattogram',
  'Agrabad C/A, Chattogram',
  'Zindabazar, Sylhet'
]

const SAVED_DROP_ADDRESSES = [
  'Gulshan 1, Avenue 1, Dhaka',
  'Block D, Banani, Dhaka',
  'Sector 11, Uttara, Dhaka',
  'Block I, Bashundhara R/A, Dhaka',
  'Motijheel C/A, Dhaka',
  'Mohakhali DOHS, Dhaka',
  'Nasirabad, Chattogram',
  'Subid Bazar, Sylhet'
]

function Dashboard() {
  const navigate = useNavigate()
  const [activeNav, setActiveNav] = useState('home')
  const [selectedVehicle, setSelectedVehicle] = useState('pickup')
  
  // Pickup & Drop locations (Bangladesh)
  const [pickupAddress, setPickupAddress] = useState('Road 27, Dhanmondi, Dhaka')
  const [isPickupOpen, setIsPickupOpen] = useState(false)
  const [customPickup, setCustomPickup] = useState('')
  const [showAddPickup, setShowAddPickup] = useState(false)

  const [dropAddress, setDropAddress] = useState('Gulshan 1, Avenue 1, Dhaka')
  const [isDropOpen, setIsDropOpen] = useState(false)
  const [customDrop, setCustomDrop] = useState('')
  const [showAddDrop, setShowAddDrop] = useState(false)

  const [swapAnim, setSwapAnim] = useState(false)
  const [bookingModal, setBookingModal] = useState(false)
  const [bookingSuccess, setBookingSuccess] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // User state matching the Settings design
  const [user, setUser] = useState({
    name: 'Joe Mitchell',
    email: 'joemitchell016@gmail.com',
    avatar: '/images/avatar.jpg'
  })

  // Settings modals
  const [settingsModal, setSettingsModal] = useState(null) // 'password' | 'privacy' | 'terms' | 'support'
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
        if (parsed.role === 'driver') {
          navigate('/driver-dashboard')
          return
        }
        setUser(prev => ({
          ...prev,
          name: parsed.name || 'Joe Mitchell',
          email: parsed.email || 'joemitchell016@gmail.com'
        }))
      } else {
        localStorage.setItem('currentUser', JSON.stringify({ name: 'Joe Mitchell', email: 'joemitchell016@gmail.com', role: 'user' }))
      }
    } catch {
      // fallback
    }
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('currentUser')
    navigate('/login')
  }

  const handleSwapLocations = () => {
    setSwapAnim(true)
    const temp = pickupAddress
    setPickupAddress(dropAddress)
    setDropAddress(temp)
    setTimeout(() => setSwapAnim(false), 300)
  }

  const selectedVehicleObj = VEHICLES.find(v => v.id === selectedVehicle) || VEHICLES[0]

  const handleConfirmBooking = () => {
    setBookingSuccess(true)
    setTimeout(() => {
      setBookingModal(false)
      setBookingSuccess(false)
    }, 2200)
  }

  return (
    <div className="dash-layout" id="dashboard-page">
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
        <span className="dash-mobile-title">Welcome, {user.name ? user.name.split(' ')[0] : 'Naim'}</span>
      </div>

      {/* ── Left Sidebar ── */}
      <aside className={`dash-sidebar ${mobileMenuOpen ? 'dash-sidebar--open' : ''}`}>
        <div className="dash-sidebar__top">
          <nav className="dash-nav" aria-label="Dashboard navigation">
            {/* Home */}
            <button
              className={`dash-nav__item ${activeNav === 'home' ? 'dash-nav__item--active' : ''}`}
              onClick={() => { setActiveNav('home'); setMobileMenuOpen(false); }}
              id="dash-nav-home"
            >
              <span className="dash-nav__icon">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#b8861e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" />
                  <polyline points="9 21 9 12 15 12 15 21" />
                </svg>
              </span>
              <span className="dash-nav__label">Home</span>
            </button>

            {/* Bookings */}
            <button
              className={`dash-nav__item ${activeNav === 'bookings' ? 'dash-nav__item--active' : ''}`}
              onClick={() => { setActiveNav('bookings'); setMobileMenuOpen(false); }}
              id="dash-nav-bookings"
            >
              <span className="dash-nav__icon">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#b8861e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                  <path d="M9 16l2 2 4-4" />
                </svg>
              </span>
              <span className="dash-nav__label">Bookings</span>
            </button>

            {/* Cities */}
            <button
              className={`dash-nav__item ${activeNav === 'cities' ? 'dash-nav__item--active' : ''}`}
              onClick={() => { setActiveNav('cities'); setMobileMenuOpen(false); }}
              id="dash-nav-cities"
            >
              <span className="dash-nav__icon">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#b8861e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="9" width="7" height="12" rx="1" />
                  <rect x="14" y="3" width="7" height="18" rx="1" />
                  <line x1="6" y1="12" x2="6.01" y2="12" />
                  <line x1="6" y1="15" x2="6.01" y2="15" />
                  <line x1="17" y1="6" x2="17.01" y2="6" />
                  <line x1="17" y1="9" x2="17.01" y2="9" />
                  <line x1="17" y1="12" x2="17.01" y2="12" />
                  <line x1="17" y1="15" x2="17.01" y2="15" />
                  <line x1="2" y1="21" x2="22" y2="21" />
                </svg>
              </span>
              <span className="dash-nav__label">Cities</span>
            </button>

            {/* Notification */}
            <button
              className={`dash-nav__item ${activeNav === 'notification' ? 'dash-nav__item--active' : ''}`}
              onClick={() => { setActiveNav('notification'); setMobileMenuOpen(false); }}
              id="dash-nav-notification"
            >
              <span className="dash-nav__icon">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#b8861e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
              </span>
              <span className="dash-nav__label">Notification</span>
            </button>

            {/* Setting */}
            <button
              className={`dash-nav__item ${activeNav === 'setting' ? 'dash-nav__item--active' : ''}`}
              onClick={() => { setActiveNav('setting'); setMobileMenuOpen(false); }}
              id="dash-nav-setting"
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
          <div className="dash-user-profile" id="dash-user-profile">
            <span className="dash-nav__icon">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#b8861e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </span>
            <span className="dash-user-name">{user.name || 'Naim Doe'}</span>
          </div>

          <button className="dash-logout-btn" onClick={handleLogout} id="dash-logout-btn" aria-label="Log out">
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
        {activeNav === 'home' && (
          <div className="dash-content-pane animate-fade-in">
            {/* Header / Welcome */}
            <header className="dash-header">
              <h1 className="dash-title">
                Welcome Back, {user.name ? user.name.split(' ')[0] : 'Naim'}!
              </h1>
              <p className="dash-subtitle">Ready to book your next move?</p>
            </header>

            {/* Book A Move Section: Pickup & Drop Location */}
            <section className="dash-section" aria-labelledby="book-move-heading">
              <div className="dash-section-header-row">
                <h2 id="book-move-heading" className="dash-section-title">
                  Book A Move
                </h2>
                <div className="dash-route-badge">
                  <span className="dash-route-badge__dot"></span>
                  <span>Est. 9.8 km • ~35 mins</span>
                </div>
              </div>

              {/* Combined Route Selector Card */}
              <div className="dash-route-card">
                {/* Visual Connector Track */}
                <div className="dash-route-track" aria-hidden="true">
                  <div className="dash-route-track__pin dash-route-track__pin--pickup"></div>
                  <div className="dash-route-track__line"></div>
                  <div className="dash-route-track__pin dash-route-track__pin--drop"></div>
                </div>

                {/* Input Fields Column */}
                <div className="dash-route-inputs">
                  {/* 1. PICKUP LOCATION */}
                  <div className="dash-location-group">
                    <label className="dash-location-group__label">
                      <span>Pickup Location</span>
                      <span className="dash-location-group__tag">From</span>
                    </label>

                    <div className="dash-address-wrapper">
                      <button
                        type="button"
                        className={`dash-address-field ${isPickupOpen ? 'dash-address-field--open' : ''}`}
                        onClick={() => {
                          setIsPickupOpen(!isPickupOpen)
                          setIsDropOpen(false)
                        }}
                        id="dash-pickup-dropdown-toggle"
                        aria-expanded={isPickupOpen}
                        aria-haspopup="listbox"
                      >
                        <div className="dash-address-field__left">
                          <span className="dash-address-pin dash-address-pin--pickup">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="12" cy="12" r="8"></circle>
                              <circle cx="12" cy="12" r="3" fill="currentColor"></circle>
                            </svg>
                          </span>
                          <span className="dash-address-text">{pickupAddress}</span>
                        </div>

                        <span className={`dash-address-chevron ${isPickupOpen ? 'dash-address-chevron--rotated' : ''}`}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#253846" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="6 9 12 15 18 9"></polyline>
                          </svg>
                        </span>
                      </button>

                      {/* Pickup Dropdown Menu */}
                      {isPickupOpen && (
                        <div className="dash-address-dropdown" role="listbox">
                          <div className="dash-address-dropdown__header">Select Pickup Address</div>
                          {SAVED_PICKUP_ADDRESSES.map((addr) => (
                            <div
                              key={addr}
                              className={`dash-address-item ${addr === pickupAddress ? 'dash-address-item--selected' : ''}`}
                              onClick={() => {
                                setPickupAddress(addr)
                                setIsPickupOpen(false)
                              }}
                              role="option"
                              aria-selected={addr === pickupAddress}
                            >
                              <span className="dash-address-item__icon">🟢</span>
                              <span className="dash-address-item__text">{addr}</span>
                              {addr === pickupAddress && <span className="dash-address-item__badge">Selected</span>}
                            </div>
                          ))}

                          {showAddPickup ? (
                            <div className="dash-address-new-box">
                              <input
                                type="text"
                                className="dash-address-input"
                                placeholder="Type pickup address..."
                                value={customPickup}
                                onChange={(e) => setCustomPickup(e.target.value)}
                                autoFocus
                              />
                              <button
                                type="button"
                                className="dash-address-save-btn"
                                onClick={() => {
                                  if (customPickup.trim()) {
                                    setPickupAddress(customPickup.trim())
                                    setCustomPickup('')
                                    setShowAddPickup(false)
                                    setIsPickupOpen(false)
                                  }
                                }}
                              >
                                Set Pickup
                              </button>
                            </div>
                          ) : (
                            <button
                              type="button"
                              className="dash-address-add-btn"
                              onClick={() => setShowAddPickup(true)}
                            >
                              + Enter Custom Pickup Location
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Swap Button In-Between */}
                  <div className="dash-swap-divider">
                    <button
                      type="button"
                      className={`dash-swap-btn ${swapAnim ? 'dash-swap-btn--spinning' : ''}`}
                      onClick={handleSwapLocations}
                      title="Swap pickup and drop-off locations"
                      aria-label="Swap pickup and drop-off locations"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="7 10 12 5 17 10"></polyline>
                        <polyline points="17 14 12 19 7 14"></polyline>
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                      </svg>
                      <span className="dash-swap-btn__text">Swap</span>
                    </button>
                  </div>

                  {/* 2. DROP LOCATION */}
                  <div className="dash-location-group">
                    <label className="dash-location-group__label">
                      <span>Drop Location</span>
                      <span className="dash-location-group__tag dash-location-group__tag--drop">Destination</span>
                    </label>

                    <div className="dash-address-wrapper">
                      <button
                        type="button"
                        className={`dash-address-field ${isDropOpen ? 'dash-address-field--open' : ''}`}
                        onClick={() => {
                          setIsDropOpen(!isDropOpen)
                          setIsPickupOpen(false)
                        }}
                        id="dash-drop-dropdown-toggle"
                        aria-expanded={isDropOpen}
                        aria-haspopup="listbox"
                      >
                        <div className="dash-address-field__left">
                          <span className="dash-address-pin dash-address-pin--drop">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                              <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                          </span>
                          <span className="dash-address-text">{dropAddress}</span>
                        </div>

                        <span className={`dash-address-chevron ${isDropOpen ? 'dash-address-chevron--rotated' : ''}`}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#253846" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="6 9 12 15 18 9"></polyline>
                          </svg>
                        </span>
                      </button>

                      {/* Drop Dropdown Menu */}
                      {isDropOpen && (
                        <div className="dash-address-dropdown" role="listbox">
                          <div className="dash-address-dropdown__header">Select Drop-Off Address</div>
                          {SAVED_DROP_ADDRESSES.map((addr) => (
                            <div
                              key={addr}
                              className={`dash-address-item ${addr === dropAddress ? 'dash-address-item--selected' : ''}`}
                              onClick={() => {
                                setDropAddress(addr)
                                setIsDropOpen(false)
                              }}
                              role="option"
                              aria-selected={addr === dropAddress}
                            >
                              <span className="dash-address-item__icon">🏁</span>
                              <span className="dash-address-item__text">{addr}</span>
                              {addr === dropAddress && <span className="dash-address-item__badge">Selected</span>}
                            </div>
                          ))}

                          {showAddDrop ? (
                            <div className="dash-address-new-box">
                              <input
                                type="text"
                                className="dash-address-input"
                                placeholder="Type drop-off address..."
                                value={customDrop}
                                onChange={(e) => setCustomDrop(e.target.value)}
                                autoFocus
                              />
                              <button
                                type="button"
                                className="dash-address-save-btn"
                                onClick={() => {
                                  if (customDrop.trim()) {
                                    setDropAddress(customDrop.trim())
                                    setCustomDrop('')
                                    setShowAddDrop(false)
                                    setIsDropOpen(false)
                                  }
                                }}
                              >
                                Set Drop-Off
                              </button>
                            </div>
                          ) : (
                            <button
                              type="button"
                              className="dash-address-add-btn"
                              onClick={() => setShowAddDrop(true)}
                            >
                              + Enter Custom Drop Location
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Choose Vehicle Type Section */}
            <section className="dash-section dash-section--vehicles" aria-labelledby="vehicle-heading">
              <h2 id="vehicle-heading" className="dash-section-title">
                Choose Vehicle Type
              </h2>
              <p className="dash-section-desc">
                Select a vehicle tha matches your load size.
              </p>

              {/* Vehicle Cards Grid */}
              <div className="dash-vehicle-grid" role="radiogroup" aria-label="Choose vehicle type">
                {VEHICLES.map((vehicle) => {
                  const isSelected = selectedVehicle === vehicle.id
                  return (
                    <div
                      key={vehicle.id}
                      className={`dash-vehicle-card ${isSelected ? 'dash-vehicle-card--selected' : ''}`}
                      onClick={() => setSelectedVehicle(vehicle.id)}
                      role="radio"
                      aria-checked={isSelected}
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          setSelectedVehicle(vehicle.id)
                        }
                      }}
                      id={`vehicle-card-${vehicle.id}`}
                    >
                      <div className="dash-vehicle-card__img-wrap">
                        <img
                          src={vehicle.image}
                          alt={vehicle.name}
                          className="dash-vehicle-card__img"
                          loading="lazy"
                        />
                      </div>
                      <div className="dash-vehicle-card__info">
                        <h3 className="dash-vehicle-card__name">{vehicle.name}</h3>
                        <p className="dash-vehicle-card__price">{vehicle.price}</p>
                        <span className="dash-vehicle-card__unit">{vehicle.unit}</span>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Continue Button */}
              <div className="dash-action-row">
                <button
                  type="button"
                  className="dash-continue-btn"
                  id="dash-continue-booking-btn"
                  onClick={() => setBookingModal(true)}
                >
                  Continue
                </button>
              </div>
            </section>
          </div>
        )}

        {/* Bookings View */}
        {activeNav === 'bookings' && (
          <div className="dash-content-pane animate-fade-in">
            <header className="dash-header">
              <h1 className="dash-title">My Bookings</h1>
              <p className="dash-subtitle">Track your recent move requests and scheduled dispatches.</p>
            </header>
            <div className="dash-card-box">
              <div className="dash-booking-list">
                <div className="dash-booking-item">
                  <div className="dash-booking-item__badge">Active</div>
                  <div className="dash-booking-item__info">
                    <h4>Pickup Truck Move</h4>
                    <p>📍 {pickupAddress} → 🏁 {dropAddress}</p>
                    <span className="dash-booking-item__meta">Today at 2:30 PM • Driver Assigned</span>
                  </div>
                  <button className="dash-sub-btn" onClick={() => setActiveNav('home')}>New Booking</button>
                </div>
                <div className="dash-booking-item">
                  <div className="dash-booking-item__badge dash-booking-item__badge--completed">Completed</div>
                  <div className="dash-booking-item__info">
                    <h4>Van Move</h4>
                    <p>📍 Sector 7, Uttara, Dhaka → 🏁 Block C, Bashundhara R/A</p>
                    <span className="dash-booking-item__meta">Completed on Oct 14 • Verified Move</span>
                  </div>
                  <button className="dash-sub-btn dash-sub-btn--outline">Receipt</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Cities View */}
        {activeNav === 'cities' && (
          <div className="dash-content-pane animate-fade-in">
            <header className="dash-header">
              <h1 className="dash-title">Service Areas & Cities</h1>
              <p className="dash-subtitle">Digaxy moving partners are ready across these major divisions and cities in Bangladesh.</p>
            </header>
            <div className="dash-cities-grid">
              {[
                { name: 'Dhaka', desc: 'Available 24/7 across all 50+ zones' },
                { name: 'Chattogram', desc: 'Agrabad, GEC, Nasirabad & Port' },
                { name: 'Sylhet', desc: 'Zindabazar, Amberkhana & Sadar' },
                { name: 'Rajshahi', desc: 'Shaheb Bazar & Metropolitan' },
                { name: 'Khulna', desc: 'Shibbari, Daulatpur & Industrial' },
                { name: 'Barishal', desc: 'Sadar & Southern Regional Hub' },
                { name: 'Rangpur', desc: 'Dhap & Northern Highway Hub' },
                { name: 'Cox\'s Bazar', desc: 'Kolatoli & Coastal Express' },
                { name: 'Cumilla', desc: 'Kandirpar & Highway Corridor' },
                { name: 'Gazipur', desc: 'Chowrasta, Joydebpur & Industrial' },
                { name: 'Narayanganj', desc: 'Chashara, Port & Commercial Hub' },
                { name: 'Mymensingh', desc: 'Ganginarpar & Central Division' }
              ].map((c) => (
                <div key={c.name} className="dash-city-card">
                  <span className="dash-city-pin">📍</span>
                  <h4>{c.name}</h4>
                  <p>{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Notifications View */}
        {activeNav === 'notification' && (
          <div className="dash-content-pane animate-fade-in">
            <header className="dash-header">
              <h1 className="dash-title">Notifications</h1>
              <p className="dash-subtitle">Latest updates regarding your booking requests and promotions.</p>
            </header>
            <div className="dash-notif-list">
              <div className="dash-notif-item">
                <span className="dash-notif-dot"></span>
                <div>
                  <h4>Booking Confirmed</h4>
                  <p>Your move from <strong>{pickupAddress}</strong> to <strong>{dropAddress}</strong> has been registered.</p>
                  <small>Just now</small>
                </div>
              </div>
              <div className="dash-notif-item">
                <span className="dash-notif-dot dash-notif-dot--read"></span>
                <div>
                  <h4>15% Off Your Next Move</h4>
                  <p>Use code DIGAXY15 at checkout for any weekend booking.</p>
                  <small>2 days ago</small>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Settings View */}
        {activeNav === 'setting' && (
          <div className="dash-content-pane dash-settings-pane animate-fade-in">
            {/* Top Back Header: ← Settings */}
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

            {/* Account Settings Subtitle */}
            <h2 className="dash-settings-subtitle">Account Settings</h2>

            {/* Profile Row with Avatar */}
            <div className="dash-settings-profile">
              <div className="dash-settings-avatar-wrap">
                <img
                  src={user.avatar || '/images/avatar.jpg'}
                  alt={user.name}
                  className="dash-settings-avatar"
                  onError={(e) => {
                    e.target.src = '/images/avatar.jpg'
                  }}
                />
              </div>
              <div className="dash-settings-user-info">
                <h3 className="dash-settings-user-name">{user.name || 'Joe Mitchell'}</h3>
                <p className="dash-settings-user-email">{user.email || 'joemitchell016@gmail.com'}</p>
              </div>
            </div>

            {/* Change Password Item */}
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

            {/* More Section */}
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

      {/* ── Booking Confirmation Modal ── */}
      {bookingModal && (
        <div className="dash-modal-overlay animate-fade-in" onClick={() => !bookingSuccess && setBookingModal(false)}>
          <div className="dash-modal-card" onClick={(e) => e.stopPropagation()}>
            {bookingSuccess ? (
              <div className="dash-modal-success animate-fade-in">
                <div className="dash-success-icon">✓</div>
                <h3>Move Request Submitted!</h3>
                <p>We are matching you with an available driver from <strong>{pickupAddress}</strong> to <strong>{dropAddress}</strong>.</p>
              </div>
            ) : (
              <>
                <div className="dash-modal-header">
                  <h3>Confirm Move Details</h3>
                  <button className="dash-modal-close" onClick={() => setBookingModal(false)}>✕</button>
                </div>

                <div className="dash-modal-body">
                  <div className="dash-modal-vehicle">
                    <img src={selectedVehicleObj.image} alt={selectedVehicleObj.name} />
                    <div>
                      <h4>{selectedVehicleObj.name}</h4>
                      <p className="dash-modal-price">{selectedVehicleObj.price} {selectedVehicleObj.unit}</p>
                    </div>
                  </div>

                  <div className="dash-modal-details">
                    <div className="dash-modal-row">
                      <span>Pickup Location:</span>
                      <strong>{pickupAddress}</strong>
                    </div>
                    <div className="dash-modal-row">
                      <span>Drop Location:</span>
                      <strong>{dropAddress}</strong>
                    </div>
                    <div className="dash-modal-row">
                      <span>Route Distance:</span>
                      <strong style={{ color: '#0c2d3b' }}>~9.8 km (approx. 35 mins via Express)</strong>
                    </div>
                    <div className="dash-modal-row">
                      <span>Vehicle Class:</span>
                      <strong>{selectedVehicleObj.name}</strong>
                    </div>
                    <div className="dash-modal-row">
                      <span>Included Labor:</span>
                      <strong>Driver + Heavy Lifting Assistance</strong>
                    </div>
                  </div>

                  <p className="dash-modal-note">
                    {selectedVehicleObj.description}
                  </p>
                </div>

                <div className="dash-modal-footer">
                  <button className="dash-modal-btn dash-modal-btn--secondary" onClick={() => setBookingModal(false)}>
                    Cancel
                  </button>
                  <button className="dash-modal-btn dash-modal-btn--primary" onClick={handleConfirmBooking}>
                    Book {selectedVehicleObj.name}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ── Settings Sub-Modals ── */}
      {settingsModal && (
        <div className="dash-modal-overlay animate-fade-in" onClick={() => setSettingsModal(null)}>
          <div className="dash-modal-card dash-settings-modal-card" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="dash-modal-header">
              <h3>
                {settingsModal === 'password' && 'Change Password'}
                {settingsModal === 'privacy' && 'Privacy Policy'}
                {settingsModal === 'terms' && 'Terms & Conditions'}
                {settingsModal === 'support' && 'Helps & Support'}
              </h3>
              <button className="dash-modal-close" onClick={() => setSettingsModal(null)}>✕</button>
            </div>

            {/* Change Password Modal */}
            {settingsModal === 'password' && (
              <form
                className="dash-password-form"
                onSubmit={(e) => {
                  e.preventDefault()
                  if (!currentPwd || !newPwd || !confirmPwd) {
                    setPwdError('Please fill in all password fields.')
                    return
                  }
                  if (newPwd !== confirmPwd) {
                    setPwdError('New passwords do not match.')
                    return
                  }
                  if (newPwd.length < 6) {
                    setPwdError('Password must be at least 6 characters.')
                    return
                  }
                  setPwdError('')
                  setPwdMsg('Password changed successfully!')
                  setTimeout(() => {
                    setSettingsModal(null)
                    setCurrentPwd('')
                    setNewPwd('')
                    setConfirmPwd('')
                    setPwdMsg('')
                  }, 1400)
                }}
              >
                {pwdError && <div className="dash-form-error">{pwdError}</div>}
                {pwdMsg && <div className="dash-form-success">{pwdMsg}</div>}

                <div className="dash-form-row">
                  <label>Current Password</label>
                  <input
                    type="password"
                    placeholder="Enter current password"
                    value={currentPwd}
                    onChange={(e) => setCurrentPwd(e.target.value)}
                  />
                </div>

                <div className="dash-form-row">
                  <label>New Password</label>
                  <input
                    type="password"
                    placeholder="Enter new password (min. 6 chars)"
                    value={newPwd}
                    onChange={(e) => setNewPwd(e.target.value)}
                  />
                </div>

                <div className="dash-form-row">
                  <label>Confirm New Password</label>
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPwd}
                    onChange={(e) => setConfirmPwd(e.target.value)}
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

            {/* Privacy Policy */}
            {settingsModal === 'privacy' && (
              <div className="dash-info-modal-body">
                <p>At <strong>Digaxy Bangladesh</strong>, protecting your personal data and location privacy is our paramount priority.</p>
                <h4>1. Data We Collect</h4>
                <p>We collect pickup and drop-off coordinates, contact phone numbers, and move scheduling parameters strictly to match you with vetted moving drivers.</p>
                <h4>2. Location Security</h4>
                <p>Real-time vehicle and shipment telemetry are encrypted in transit and never sold to third-party marketing entities.</p>
                <h4>3. Account Rights</h4>
                <p>You can request full export or permanent deletion of your moving history at any time through our support team.</p>
                <div className="dash-modal-footer" style={{ marginTop: '20px' }}>
                  <button type="button" className="dash-modal-btn dash-modal-btn--primary" onClick={() => setSettingsModal(null)}>
                    I Understand
                  </button>
                </div>
              </div>
            )}

            {/* Terms & Conditions */}
            {settingsModal === 'terms' && (
              <div className="dash-info-modal-body">
                <p>By scheduling moving services with <strong>Digaxy</strong>, you agree to the following terms:</p>
                <h4>1. Booking & Dispatches</h4>
                <p>Arrival times are subject to prevailing city traffic conditions. Drivers will communicate directly via phone upon arrival.</p>
                <h4>2. Cargo Safety & Handling</h4>
                <p>All items handled by certified Digaxy crew members are protected under our Basic Move Protection policy against transit loss or damage.</p>
                <h4>3. Free Cancellation</h4>
                <p>Cancellations made at least 1 hour prior to pickup time incur zero cancellation penalties.</p>
                <div className="dash-modal-footer" style={{ marginTop: '20px' }}>
                  <button type="button" className="dash-modal-btn dash-modal-btn--primary" onClick={() => setSettingsModal(null)}>
                    Accept Terms
                  </button>
                </div>
              </div>
            )}

            {/* Helps & Support */}
            {settingsModal === 'support' && (
              <div className="dash-info-modal-body">
                <p>Our Dhaka-based customer care team is available 24/7 to assist with your moving inquiries and on-trip requests.</p>
                <div className="dash-support-channels">
                  <div className="dash-support-card">
                    <span className="dash-support-icon">📞</span>
                    <div>
                      <strong>24/7 Helpline</strong>
                      <p>+880 9612-DIGAXY (344299)</p>
                    </div>
                  </div>
                  <div className="dash-support-card">
                    <span className="dash-support-icon">💬</span>
                    <div>
                      <strong>WhatsApp Support</strong>
                      <p>+880 1712-345678</p>
                    </div>
                  </div>
                  <div className="dash-support-card">
                    <span className="dash-support-icon">✉️</span>
                    <div>
                      <strong>Email Support</strong>
                      <p>support@digaxy.com.bd</p>
                    </div>
                  </div>
                  <div className="dash-support-card">
                    <span className="dash-support-icon">📍</span>
                    <div>
                      <strong>Dhaka HQ Office</strong>
                      <p>Road 27, Dhanmondi, Dhaka - 1209</p>
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
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
