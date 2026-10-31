import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  getBookings,
  getVehicles,
  createBooking,
  cancelBooking,
  changePassword,
  getUserProfile
} from '../services/api'
import './Dashboard.css'

const DEFAULT_VEHICLES = [
  {
    id: 1,
    id_name: 'pickup',
    name: 'Pickup Truck',
    price: '$42.92 + $1.62',
    unit: 'per labor min',
    image: '/images/vehicles/pickup.jpg',
    description: 'Perfect for small loads, single items, couches, or light studio moves.'
  },
  {
    id: 2,
    id_name: 'van',
    name: 'Van',
    price: '$77 + $2.02',
    unit: 'per labor min',
    image: '/images/vehicles/van.jpg',
    description: 'Ideal for 1-bedroom apartments, boxes, appliances, and moderate furniture.'
  },
  {
    id: 3,
    id_name: 'mini_box',
    name: 'Mini Box Truck',
    price: '$144.51 + $2.30',
    unit: 'per labor min',
    image: '/images/vehicles/mini-box-truck.jpg',
    description: 'Great for 2-bedroom homes, large bulky items, and heavier freight.'
  },
  {
    id: 4,
    id_name: 'box_truck_26',
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

// Distance estimation matrix for Bangladesh locations
const DISTANCE_MATRIX = {
  'Road 27, Dhanmondi, Dhaka_Gulshan 1, Avenue 1, Dhaka': { km: 9.8, mins: 35 },
  'Gulshan 1, Avenue 1, Dhaka_Road 27, Dhanmondi, Dhaka': { km: 9.8, mins: 35 },
  'Sector 7, Uttara, Dhaka_Block C, Bashundhara R/A, Dhaka': { km: 12.3, mins: 45 },
  'Block C, Bashundhara R/A, Dhaka_Sector 7, Uttara, Dhaka': { km: 12.3, mins: 45 },
  'Mirpur 10 Circle, Dhaka_Gulshan 2 (Near Circle), Dhaka': { km: 11.5, mins: 40 },
  'Gulshan 2 (Near Circle), Dhaka_Mirpur 10 Circle, Dhaka': { km: 11.5, mins: 40 },
  'GEC Circle, Chattogram_Agrabad C/A, Chattogram': { km: 6.2, mins: 25 },
  'Zindabazar, Sylhet_Subid Bazar, Sylhet': { km: 4.5, mins: 18 }
}

function Dashboard() {
  const navigate = useNavigate()
  const [activeNav, setActiveNav] = useState('home') // 'home' | 'bookings' | 'tracker' | 'cities' | 'notification' | 'setting'
  const [vehicles, setVehicles] = useState(DEFAULT_VEHICLES)
  const [selectedVehicle, setSelectedVehicle] = useState('pickup')
  
  // Pickup & Drop locations
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
  const [submittingBooking, setSubmittingBooking] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // ── Feature 1 & 2: Item Inventory & Smart Fare Calculator ──
  const [itemCounts, setItemCounts] = useState({
    sofa: 1,
    bed: 1,
    fridge: 1,
    boxes: 4,
    tv: 0,
    dining: 0
  })
  const [helpersCount, setHelpersCount] = useState(1) // 1 or 2
  const [floorType, setFloorType] = useState('elevator') // 'elevator' | 'stairs'
  const [paymentMethod, setPaymentMethod] = useState('cash')

  // ── Feature 3: Backend Bookings & Real-time Tracking ──
  const [bookings, setBookings] = useState([])
  const [loadingBookings, setLoadingBookings] = useState(true)
  const [selectedTrackBooking, setSelectedTrackBooking] = useState(null)
  const [receiptBooking, setReceiptBooking] = useState(null)
  const [cancelModalId, setCancelModalId] = useState(null)
  const [actionMsg, setActionMsg] = useState('')

  // User state
  const [user, setUser] = useState({
    id: 2,
    name: 'Joe Mitchell',
    email: 'joemitchell016@gmail.com',
    phone: '+880 1712-345678',
    avatar: '/images/avatar.jpg'
  })

  // Settings modals
  const [settingsModal, setSettingsModal] = useState(null) // 'password' | 'privacy' | 'terms' | 'support'
  const [currentPwd, setCurrentPwd] = useState('')
  const [newPwd, setNewPwd] = useState('')
  const [confirmPwd, setConfirmPwd] = useState('')
  const [pwdMsg, setPwdMsg] = useState('')
  const [pwdError, setPwdError] = useState('')
  const [pwdLoading, setPwdLoading] = useState(false)

  // Fetch real data on component mount
  const loadInitialData = async () => {
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
          name: parsed.name || `${parsed.first_name || ''} ${parsed.last_name || ''}`.trim() || 'Joe Mitchell',
          email: parsed.email || 'joemitchell016@gmail.com',
          phone: parsed.phone || '+880 1712-345678'
        }))
      }

      // 1. Sync User Profile from Backend
      try {
        const profile = await getUserProfile()
        if (profile) {
          setUser(prev => ({
            ...prev,
            id: profile.id,
            name: `${profile.first_name || ''} ${profile.last_name || ''}`.trim() || profile.username,
            email: profile.email,
            phone: profile.phone || prev.phone
          }))
        }
      } catch (e) {
        console.log('Profile sync note:', e.message)
      }

      // 2. Load Vehicles from Backend
      try {
        const remoteVehicles = await getVehicles()
        if (Array.isArray(remoteVehicles) && remoteVehicles.length > 0) {
          const formatted = remoteVehicles.map(v => ({
            id: v.id,
            id_name: v.id_name,
            name: v.name,
            price: v.price_display,
            unit: v.unit,
            image: v.image_url || '/images/vehicles/pickup.jpg',
            description: v.description
          }))
          setVehicles(formatted)
        }
      } catch (e) {
        console.log('Using default vehicle catalog:', e.message)
      }

      // 3. Load Real User Bookings from Backend
      fetchUserBookings()
    } catch (err) {
      console.warn('Initial data load warning:', err)
    }
  }

  const fetchUserBookings = async () => {
    setLoadingBookings(true)
    try {
      const data = await getBookings()
      if (Array.isArray(data)) {
        setBookings(data)
        if (!selectedTrackBooking && data.length > 0) {
          setSelectedTrackBooking(data[0])
        }
      }
    } catch (err) {
      console.warn('Could not fetch bookings from backend:', err)
    } finally {
      setLoadingBookings(false)
    }
  }

  useEffect(() => {
    loadInitialData()
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('currentUser')
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    navigate('/login')
  }

  const handleSwapLocations = () => {
    setSwapAnim(true)
    const temp = pickupAddress
    setPickupAddress(dropAddress)
    setDropAddress(temp)
    setTimeout(() => setSwapAnim(false), 300)
  }

  // ── Dynamic Distance & Time Calculation ──
  const routeKey = `${pickupAddress}_${dropAddress}`
  const routeStats = DISTANCE_MATRIX[routeKey] || { km: 9.8, mins: 35 }
  const estimatedKm = routeStats.km
  const estimatedMins = routeStats.mins

  // ── Dynamic Moving Fare & Item Calculations ──
  const totalItemUnits =
    itemCounts.sofa * 2.0 +
    itemCounts.bed * 2.5 +
    itemCounts.fridge * 2.0 +
    itemCounts.boxes * 0.5 +
    itemCounts.tv * 0.8 +
    itemCounts.dining * 2.2

  // Auto recommend vehicle based on inventory size
  const recommendedVehicleId =
    totalItemUnits <= 3.5 ? 'pickup' :
    totalItemUnits <= 7.5 ? 'van' :
    totalItemUnits <= 13.0 ? 'mini_box' : 'box_truck_26'

  // Pricing formula in BDT
  const baseVehicleFareMap = {
    pickup: 900,
    van: 1500,
    mini_box: 2400,
    box_truck_26: 3800
  }
  const baseFare = baseVehicleFareMap[selectedVehicle] || 900
  const distanceCharge = Math.round(estimatedKm * 55)
  const helpersCharge = helpersCount === 2 ? 500 : 0
  const floorCharge = floorType === 'stairs' ? 300 : 0
  const calculatedTotalFareBDT = baseFare + distanceCharge + helpersCharge + floorCharge
  const calculatedTotalFareUSD = (calculatedTotalFareBDT / 120).toFixed(2)

  // Compile items description string for database
  const compiledItemsList = []
  if (itemCounts.sofa > 0) compiledItemsList.push(`${itemCounts.sofa} Sofa`)
  if (itemCounts.bed > 0) compiledItemsList.push(`${itemCounts.bed} Bed`)
  if (itemCounts.fridge > 0) compiledItemsList.push(`${itemCounts.fridge} Refrigerator`)
  if (itemCounts.boxes > 0) compiledItemsList.push(`${itemCounts.boxes} Boxes`)
  if (itemCounts.tv > 0) compiledItemsList.push(`${itemCounts.tv} TV`)
  if (itemCounts.dining > 0) compiledItemsList.push(`${itemCounts.dining} Dining Table`)
  const itemsDescription = compiledItemsList.length > 0
    ? `${compiledItemsList.join(', ')} (${helpersCount} Helpers, ${floorType === 'elevator' ? 'Elevator' : 'Stairs'})`
    : `General Home Items (${helpersCount} Helpers, ${floorType === 'elevator' ? 'Elevator' : 'Stairs'})`

  const selectedVehicleObj = vehicles.find(v => v.id_name === selectedVehicle) || vehicles[0]

  // ── Backend: Create Real Booking ──
  const handleConfirmBooking = async () => {
    setSubmittingBooking(true)
    try {
      const payload = {
        vehicle_id: selectedVehicleObj.id || 1,
        pickup_address: pickupAddress,
        drop_address: dropAddress,
        estimated_distance_km: estimatedKm,
        estimated_duration_mins: estimatedMins,
        total_fare: calculatedTotalFareBDT,
        payment_method: paymentMethod,
        items_description: itemsDescription
      }

      const newBooking = await createBooking(payload)
      setBookingSuccess(true)
      
      // Refresh real bookings list
      await fetchUserBookings()
      setSelectedTrackBooking(newBooking)

      setTimeout(() => {
        setBookingModal(false)
        setBookingSuccess(false)
        setSubmittingBooking(false)
        setActiveNav('tracker') // Switch to live tracker to see the new move
      }, 1600)
    } catch (err) {
      console.error('Failed to create booking:', err)
      alert(`Booking creation failed: ${err.message}`)
      setSubmittingBooking(false)
    }
  }

  // ── Backend: Cancel Booking ──
  const handleCancelBooking = async (bookingId) => {
    try {
      await cancelBooking(bookingId)
      setActionMsg(`Booking #${bookingId} has been cancelled successfully.`)
      setCancelModalId(null)
      await fetchUserBookings()
      setTimeout(() => setActionMsg(''), 3500)
    } catch (err) {
      alert(`Cancel failed: ${err.message}`)
    }
  }

  // ── Backend: Change Password in Settings ──
  const handlePasswordSubmit = async (e) => {
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

    setPwdLoading(true)
    setPwdError('')
    setPwdMsg('')

    try {
      const res = await changePassword(currentPwd, newPwd)
      setPwdMsg(res.message || 'Password updated successfully on backend!')
      setTimeout(() => {
        setSettingsModal(null)
        setCurrentPwd('')
        setNewPwd('')
        setConfirmPwd('')
        setPwdMsg('')
      }, 1500)
    } catch (err) {
      setPwdError(err.message || 'Failed to update password.')
    } finally {
      setPwdLoading(false)
    }
  }

  const updateItemCount = (itemKey, delta) => {
    setItemCounts(prev => ({
      ...prev,
      [itemKey]: Math.max(0, (prev[itemKey] || 0) + delta)
    }))
  }

  // Active track booking fallback
  const activeBookingForTrack = selectedTrackBooking || bookings[0] || {
    id: 1,
    status: 'loading',
    pickup_address: pickupAddress,
    drop_address: dropAddress,
    estimated_distance_km: estimatedKm,
    estimated_duration_mins: estimatedMins,
    total_fare: calculatedTotalFareBDT,
    driver: {
      first_name: 'Rakib',
      last_name: 'Hassan',
      phone: '+880 1812-987654',
      vehicle_reg_no: 'Dhaka Metro-U 14-8921',
      rating: '4.9'
    }
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
        <span className="dash-mobile-title">Welcome, {user.name ? user.name.split(' ')[0] : 'Joe'}</span>
      </div>

      {/* ── Left Sidebar ── */}
      <aside className={`dash-sidebar ${mobileMenuOpen ? 'dash-sidebar--open' : ''}`}>
        <div className="dash-sidebar__top">
          <nav className="dash-nav" aria-label="Dashboard navigation">
            {/* 1. Home / Book Move */}
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
              <span className="dash-nav__label">Book Move</span>
            </button>

            {/* 2. Live Tracker (FEATURE 1) */}
            <button
              className={`dash-nav__item ${activeNav === 'tracker' ? 'dash-nav__item--active' : ''}`}
              onClick={() => { setActiveNav('tracker'); setMobileMenuOpen(false); }}
              id="dash-nav-tracker"
            >
              <span className="dash-nav__icon">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#b8861e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="3 11 22 2 13 21 11 13 3 11" />
                </svg>
              </span>
              <span className="dash-nav__label">Live Tracker</span>
              <span style={{ fontSize: '0.65rem', background: '#DCFCE7', color: '#15803D', padding: '2px 6px', borderRadius: '10px', marginLeft: 'auto', fontWeight: '700' }}>
                LIVE
              </span>
            </button>

            {/* 3. Bookings (FEATURE 3: Real Backend) */}
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
              <span className="dash-nav__label">My Bookings</span>
              {bookings.length > 0 && (
                <span style={{ fontSize: '0.72rem', background: '#E2E8F0', color: '#0A2B39', padding: '1px 6px', borderRadius: '10px', marginLeft: 'auto', fontWeight: '700' }}>
                  {bookings.length}
                </span>
              )}
            </button>

            {/* 4. Cities */}
            <button
              className={`dash-nav__item ${activeNav === 'cities' ? 'dash-nav__item--active' : ''}`}
              onClick={() => { setActiveNav('cities'); setMobileMenuOpen(false); }}
              id="dash-nav-cities"
            >
              <span className="dash-nav__icon">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#b8861e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="9" width="7" height="12" rx="1" />
                  <rect x="14" y="3" width="7" height="18" rx="1" />
                  <line x1="2" y1="21" x2="22" y2="21" />
                </svg>
              </span>
              <span className="dash-nav__label">Cities</span>
            </button>

            {/* 5. Notification */}
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

            {/* 6. Setting */}
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
            <div className="dash-user-profile__info">
              <span className="dash-user-profile__name">{user.name || 'Joe Mitchell'}</span>
              <span className="dash-user-profile__email">{user.email || 'joemitchell016@gmail.com'}</span>
            </div>
          </div>

          <button
            className="dash-logout-btn"
            onClick={handleLogout}
            id="dash-logout-btn"
            title="Log out of session"
          >
            <span className="dash-nav__icon">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#dc2626" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* ── Main Content Area ── */}
      <main className="dash-main" id="dash-main-scroll">
        {actionMsg && (
          <div style={{ background: '#DCFCE7', color: '#15803D', border: '1px solid #BBF7D0', padding: '12px 18px', borderRadius: '8px', marginBottom: '20px', fontWeight: '600' }}>
            ✓ {actionMsg}
          </div>
        )}

        {/* ── 1. BOOK MOVE VIEW (HOME) ── */}
        {activeNav === 'home' && (
          <div className="dash-content-pane animate-fade-in">
            <header className="dash-header">
              <h1 className="dash-title">Schedule a Move</h1>
              <p className="dash-subtitle">
                Select your pickup and drop-off locations in Bangladesh, customize your items, and select a truck.
              </p>
            </header>

            {/* Combined Route Selector Card */}
            <section className="dash-section dash-section--route" aria-labelledby="route-heading">
              <div className="dash-route-card">
                <div className="dash-route-track" aria-hidden="true">
                  <div className="dash-route-track__pin dash-route-track__pin--pickup"></div>
                  <div className="dash-route-track__line"></div>
                  <div className="dash-route-track__pin dash-route-track__pin--drop"></div>
                </div>

                <div className="dash-route-inputs">
                  {/* Pickup */}
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
                      >
                        <div className="dash-address-field__left">
                          <span className="dash-address-pin dash-address-pin--pickup">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                              <circle cx="12" cy="12" r="8"></circle>
                              <circle cx="12" cy="12" r="3" fill="currentColor"></circle>
                            </svg>
                          </span>
                          <span className="dash-address-text">{pickupAddress}</span>
                        </div>
                        <span className={`dash-address-chevron ${isPickupOpen ? 'dash-address-chevron--rotated' : ''}`}>▼</span>
                      </button>

                      {isPickupOpen && (
                        <div className="dash-address-dropdown">
                          <div className="dash-address-dropdown__header">Select Pickup Address</div>
                          {SAVED_PICKUP_ADDRESSES.map((addr) => (
                            <div
                              key={addr}
                              className={`dash-address-item ${addr === pickupAddress ? 'dash-address-item--selected' : ''}`}
                              onClick={() => {
                                setPickupAddress(addr)
                                setIsPickupOpen(false)
                              }}
                            >
                              <span>🟢 {addr}</span>
                            </div>
                          ))}
                          {showAddPickup ? (
                            <div className="dash-address-new-box">
                              <input
                                type="text"
                                className="dash-address-input"
                                placeholder="Type custom pickup address..."
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
                                Set
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

                  {/* Swap Button */}
                  <div className="dash-swap-divider">
                    <button
                      type="button"
                      className={`dash-swap-btn ${swapAnim ? 'dash-swap-btn--spinning' : ''}`}
                      onClick={handleSwapLocations}
                      title="Swap locations"
                    >
                      ⇅ <span className="dash-swap-btn__text">Swap</span>
                    </button>
                  </div>

                  {/* Drop */}
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
                      >
                        <div className="dash-address-field__left">
                          <span className="dash-address-pin dash-address-pin--drop">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                              <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                          </span>
                          <span className="dash-address-text">{dropAddress}</span>
                        </div>
                        <span className={`dash-address-chevron ${isDropOpen ? 'dash-address-chevron--rotated' : ''}`}>▼</span>
                      </button>

                      {isDropOpen && (
                        <div className="dash-address-dropdown">
                          <div className="dash-address-dropdown__header">Select Drop-Off Address</div>
                          {SAVED_DROP_ADDRESSES.map((addr) => (
                            <div
                              key={addr}
                              className={`dash-address-item ${addr === dropAddress ? 'dash-address-item--selected' : ''}`}
                              onClick={() => {
                                setDropAddress(addr)
                                setIsDropOpen(false)
                              }}
                            >
                              <span>🏁 {addr}</span>
                            </div>
                          ))}
                          {showAddDrop ? (
                            <div className="dash-address-new-box">
                              <input
                                type="text"
                                className="dash-address-input"
                                placeholder="Type custom destination..."
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
                                Set
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

            {/* ── FEATURE 2: SMART ITEM INVENTORY & CALCULATOR ── */}
            <section className="dash-inventory-box">
              <div className="dash-inventory-header">
                <div className="dash-inventory-title">
                  <span>📦 Item Inventory & Moving Calculator</span>
                </div>
                <div className="dash-inventory-badge">
                  Est. Route: ~{estimatedKm} km • {estimatedMins} mins
                </div>
              </div>

              <p style={{ fontSize: '0.85rem', color: '#64748B', marginTop: '-6px', marginBottom: '16px' }}>
                Specify items you need transported to calculate live charges and auto-recommend vehicle class.
              </p>

              {/* Items Counter Chips */}
              <div className="dash-item-grid">
                {[
                  { key: 'sofa', icon: '🛋️', label: 'Sofa / Couch' },
                  { key: 'bed', icon: '🛏️', label: 'Bed & Mattress' },
                  { key: 'fridge', icon: '🧊', label: 'Refrigerator' },
                  { key: 'boxes', icon: '📦', label: 'Moving Boxes' },
                  { key: 'tv', icon: '🖥️', label: 'TV & Electronics' },
                  { key: 'dining', icon: '🍽️', label: 'Dining Table' }
                ].map(item => (
                  <div
                    key={item.key}
                    className={`dash-item-chip ${itemCounts[item.key] > 0 ? 'dash-item-chip--active' : ''}`}
                  >
                    <div className="dash-item-chip__label">
                      <span className="dash-item-chip__icon">{item.icon}</span>
                      <span>{item.label}</span>
                    </div>
                    <div className="dash-counter-group">
                      <button
                        type="button"
                        className="dash-counter-btn"
                        onClick={() => updateItemCount(item.key, -1)}
                        disabled={itemCounts[item.key] <= 0}
                      >
                        –
                      </button>
                      <span className="dash-counter-val">{itemCounts[item.key]}</span>
                      <button
                        type="button"
                        className="dash-counter-btn"
                        onClick={() => updateItemCount(item.key, 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Helper & Floor Option Selectors */}
              <div className="dash-service-options">
                <div className="dash-service-option">
                  <label>Handling Labor</label>
                  <select
                    className="dash-service-select"
                    value={helpersCount}
                    onChange={(e) => setHelpersCount(Number(e.target.value))}
                  >
                    <option value={1}>1 Helper (Driver included) — Free</option>
                    <option value={2}>2 Dedicated Movers (+ ৳500)</option>
                  </select>
                </div>

                <div className="dash-service-option">
                  <label>Floor Accessibility</label>
                  <select
                    className="dash-service-select"
                    value={floorType}
                    onChange={(e) => setFloorType(e.target.value)}
                  >
                    <option value="elevator">Ground Floor / Elevator Available — Free</option>
                    <option value="stairs">Stairs Only (1st-3rd Floor) (+ ৳300)</option>
                  </select>
                </div>
              </div>

              {/* Smart Auto-Recommendation Banner */}
              <div className="dash-recommend-banner">
                <span className="dash-recommend-banner__icon">💡</span>
                <div>
                  <strong>Recommended Vehicle: </strong>
                  <span>
                    Based on your inventory ({totalItemUnits.toFixed(1)} load units), a{' '}
                    <u style={{ cursor: 'pointer', fontWeight: '800' }} onClick={() => setSelectedVehicle(recommendedVehicleId)}>
                      {recommendedVehicleId === 'pickup' && 'Pickup Truck'}
                      {recommendedVehicleId === 'van' && 'Van'}
                      {recommendedVehicleId === 'mini_box' && 'Mini Box Truck'}
                      {recommendedVehicleId === 'box_truck_26' && '26-foot Box truck'}
                    </u>{' '}
                    fits your load safest. Calculated Total: <strong>৳{calculatedTotalFareBDT}</strong> (~${calculatedTotalFareUSD})
                  </span>
                </div>
              </div>
            </section>

            {/* Choose Vehicle Type Section */}
            <section className="dash-section dash-section--vehicles" aria-labelledby="vehicle-heading">
              <h2 id="vehicle-heading" className="dash-section-title">
                Choose Vehicle Type
              </h2>
              <p className="dash-section-desc">
                Select a vehicle that matches your load size. Rates adjust based on labor and volume.
              </p>

              {/* Vehicle Cards Grid */}
              <div className="dash-vehicle-grid" role="radiogroup" aria-label="Choose vehicle type">
                {vehicles.map((vehicle) => {
                  const isSelected = selectedVehicle === vehicle.id_name
                  const isRecommended = recommendedVehicleId === vehicle.id_name
                  return (
                    <div
                      key={vehicle.id_name}
                      className={`dash-vehicle-card ${isSelected ? 'dash-vehicle-card--selected' : ''}`}
                      onClick={() => setSelectedVehicle(vehicle.id_name)}
                      role="radio"
                      aria-checked={isSelected}
                      tabIndex={0}
                      style={{ position: 'relative' }}
                    >
                      {isRecommended && (
                        <span style={{ position: 'absolute', top: '8px', right: '8px', background: '#F59E0B', color: '#FFFFFF', fontSize: '0.68rem', padding: '2px 6px', borderRadius: '4px', fontWeight: '800' }}>
                          BEST MATCH
                        </span>
                      )}
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
                        <span className="dash-vehicle-card__unit">Est: ৳{baseVehicleFareMap[vehicle.id_name] + distanceCharge + helpersCharge + floorCharge}</span>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Continue Button */}
              <div className="dash-action-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '1rem', color: '#0A2B39' }}>
                  Total Estimated Fare: <strong style={{ fontSize: '1.25rem', color: '#B8861E' }}>৳{calculatedTotalFareBDT}</strong>
                </div>
                <button
                  type="button"
                  className="dash-continue-btn"
                  id="dash-continue-booking-btn"
                  onClick={() => setBookingModal(true)}
                >
                  Continue to Confirm
                </button>
              </div>
            </section>
          </div>
        )}

        {/* ── 2. LIVE TRACKER VIEW (FEATURE 1) ── */}
        {activeNav === 'tracker' && (
          <div className="dash-content-pane animate-fade-in">
            <header className="dash-header">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <h1 className="dash-title">Live Dispatch Tracking</h1>
                  <p className="dash-subtitle">Real-time driver location and telemetry for your current shipment.</p>
                </div>
                <button className="dash-sub-btn" onClick={() => setActiveNav('home')}>
                  + Book Another Move
                </button>
              </div>
            </header>

            <div className="dash-tracker-card">
              {/* Tracker Top Bar */}
              <div className="dash-tracker-top">
                <div className="dash-tracker-route-info">
                  <span>📍 {activeBookingForTrack.pickup_address}</span>
                  <span>➔</span>
                  <span>🏁 {activeBookingForTrack.drop_address}</span>
                </div>
                <span className="dash-tracker-pill dash-tracker-pill--live">
                  ● Live In-Transit
                </span>
              </div>

              {/* Animated Live Visual Route Map Canvas */}
              <div className="dash-map-wrap">
                <svg className="dash-map-svg" viewBox="0 0 700 240" fill="none" preserveAspectRatio="none">
                  {/* Grid Lines simulating city streets */}
                  <line x1="0" y1="40" x2="700" y2="40" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="4 4" />
                  <line x1="0" y1="90" x2="700" y2="90" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="4 4" />
                  <line x1="0" y1="140" x2="700" y2="140" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="4 4" />
                  <line x1="0" y1="190" x2="700" y2="190" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="4 4" />

                  <line x1="120" y1="0" x2="120" y2="240" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="4 4" />
                  <line x1="280" y1="0" x2="280" y2="240" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="4 4" />
                  <line x1="440" y1="0" x2="440" y2="240" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="4 4" />
                  <line x1="600" y1="0" x2="600" y2="240" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="4 4" />

                  {/* Main Highway Route (Blue line) */}
                  <path
                    d="M 60 140 C 140 140, 160 90, 240 90 C 320 90, 360 150, 440 150 C 520 150, 560 90, 640 100"
                    stroke="#94A3B8"
                    strokeWidth="12"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <path
                    d="M 60 140 C 140 140, 160 90, 240 90 C 320 90, 360 150, 440 150 C 520 150, 560 90, 640 100"
                    stroke="#0284C7"
                    strokeWidth="6"
                    strokeLinecap="round"
                    fill="none"
                  />

                  {/* Waypoint 1: Pickup */}
                  <circle cx="60" cy="140" r="10" fill="#16A34A" />
                  <circle cx="60" cy="140" r="4" fill="#FFFFFF" />
                  <text x="60" y="170" fill="#0A2B39" fontWeight="700" fontSize="12" textAnchor="middle">
                    Pickup
                  </text>

                  {/* Waypoint 2: City Junction */}
                  <circle cx="340" cy="120" r="4" fill="#64748B" />
                  <text x="340" y="105" fill="#475569" fontWeight="600" fontSize="10" textAnchor="middle">
                    Mohakhali Expressway
                  </text>

                  {/* Waypoint 3: Destination Drop */}
                  <circle cx="640" cy="100" r="10" fill="#DC2626" />
                  <circle cx="640" cy="100" r="4" fill="#FFFFFF" />
                  <text x="640" y="80" fill="#0A2B39" fontWeight="700" fontSize="12" textAnchor="middle">
                    Destination
                  </text>

                  {/* Moving Delivery Truck Marker */}
                  <g className="dash-moving-truck">
                    <circle cx="0" cy="0" r="14" fill="#B8861E" />
                    <text x="0" y="4" textAnchor="middle" fontSize="12">🚚</text>
                  </g>
                </svg>

                {/* Floating ETA overlay badge */}
                <div className="dash-map-overlay-eta">
                  <div>Estimated Arrival: <strong>~{activeBookingForTrack.estimated_duration_mins || 35} mins</strong></div>
                  <div style={{ fontSize: '0.78rem', color: '#CBD5E1' }}>Distance: ~{activeBookingForTrack.estimated_distance_km || 9.8} km • Normal Traffic</div>
                </div>
              </div>

              {/* Status Stages Timeline */}
              <div className="dash-tracker-timeline">
                <div className="dash-timeline-step dash-timeline-step--done">
                  <div className="dash-timeline-dot">✓</div>
                  <span className="dash-timeline-label">Booking Placed</span>
                </div>
                <div className="dash-timeline-step dash-timeline-step--done">
                  <div className="dash-timeline-dot">✓</div>
                  <span className="dash-timeline-label">Driver Assigned</span>
                </div>
                <div className="dash-timeline-step dash-timeline-step--done">
                  <div className="dash-timeline-dot">✓</div>
                  <span className="dash-timeline-label">Loading Goods</span>
                </div>
                <div className="dash-timeline-step dash-timeline-step--active">
                  <div className="dash-timeline-dot">🚚</div>
                  <span className="dash-timeline-label">In Transit</span>
                </div>
                <div className="dash-timeline-step">
                  <div className="dash-timeline-dot">🏁</div>
                  <span className="dash-timeline-label">Delivered</span>
                </div>
              </div>

              {/* Assigned Driver Details Card */}
              <div className="dash-driver-card">
                <div className="dash-driver-left">
                  <div className="dash-driver-avatar">
                    {(activeBookingForTrack.driver?.first_name || 'R')[0]}
                  </div>
                  <div className="dash-driver-meta">
                    <h4>
                      {activeBookingForTrack.driver
                        ? `${activeBookingForTrack.driver.first_name} ${activeBookingForTrack.driver.last_name || ''}`
                        : 'Rakib Hassan'}
                    </h4>
                    <p>
                      <span className="dash-driver-rating">★ 4.9</span> • Toyota Pickup ({activeBookingForTrack.driver?.vehicle_reg_no || 'Dhaka Metro-U 14-8921'})
                    </p>
                  </div>
                </div>
                <div className="dash-driver-actions">
                  <a
                    href={`tel:${activeBookingForTrack.driver?.phone || '+8801812987654'}`}
                    className="dash-call-btn"
                  >
                    📞 Call Driver
                  </a>
                  <button
                    type="button"
                    className="dash-chat-btn"
                    onClick={() => alert(`Connecting securely to driver ${activeBookingForTrack.driver?.first_name || 'Rakib Hassan'} via Digaxy In-App Chat...`)}
                  >
                    💬 Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── 3. BOOKINGS VIEW (FEATURE 3: Full Backend Sync) ── */}
        {activeNav === 'bookings' && (
          <div className="dash-content-pane animate-fade-in">
            <header className="dash-header">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <h1 className="dash-title">My Bookings</h1>
                  <p className="dash-subtitle">Synced directly with Django database. Manage moves, track live routes, or view official receipts.</p>
                </div>
                <button className="dash-sub-btn" onClick={fetchUserBookings} title="Refresh from backend">
                  🔄 Refresh
                </button>
              </div>
            </header>

            <div className="dash-card-box">
              {loadingBookings ? (
                <div style={{ padding: '30px', textAlign: 'center', color: '#64748B' }}>
                  Loading your move records from Django backend...
                </div>
              ) : bookings.length === 0 ? (
                <div style={{ padding: '40px', textAlign: 'center', color: '#64748B' }}>
                  <h3>No bookings found yet.</h3>
                  <p>Book your first moving dispatch from the Book Move tab!</p>
                  <button className="dash-continue-btn" style={{ maxWidth: '200px', margin: '16px auto' }} onClick={() => setActiveNav('home')}>
                    Book Move Now
                  </button>
                </div>
              ) : (
                <div className="dash-booking-list">
                  {bookings.map((b) => {
                    const statusClass =
                      b.status === 'delivered' ? 'dash-booking-item__badge--completed' :
                      b.status === 'cancelled' ? 'dash-booking-item__badge--cancelled' : ''

                    return (
                      <div key={b.id} className="dash-booking-item">
                        <div className={`dash-booking-item__badge ${statusClass}`} style={{
                          textTransform: 'uppercase',
                          background:
                            b.status === 'delivered' ? '#DCFCE7' :
                            b.status === 'cancelled' ? '#FEE2E2' :
                            b.status === 'in_transit' ? '#E0E7FF' : '#FEF3C7',
                          color:
                            b.status === 'delivered' ? '#15803D' :
                            b.status === 'cancelled' ? '#B91C1C' :
                            b.status === 'in_transit' ? '#4338CA' : '#B45309',
                          fontWeight: '700'
                        }}>
                          {b.status.replace('_', ' ')}
                        </div>

                        <div className="dash-booking-item__info">
                          <h4>
                            Booking #{b.id}: {b.vehicle_details?.name || 'Transport Move'}
                            <span style={{ marginLeft: '12px', color: '#B8861E', fontWeight: '800' }}>৳{b.total_fare}</span>
                          </h4>
                          <p>📍 {b.pickup_address} → 🏁 {b.drop_address}</p>
                          <span className="dash-booking-item__meta">
                            {b.estimated_distance_km} km • {b.items_description || 'General cargo'} • Paid via {b.payment_method?.toUpperCase()}
                          </span>
                        </div>

                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                          {/* Live Track */}
                          <button
                            type="button"
                            className="dash-sub-btn"
                            onClick={() => {
                              setSelectedTrackBooking(b)
                              setActiveNav('tracker')
                            }}
                          >
                            Track Live
                          </button>

                          {/* Official Printable Receipt (FEATURE 3) */}
                          <button
                            type="button"
                            className="dash-sub-btn dash-sub-btn--outline"
                            onClick={() => setReceiptBooking(b)}
                          >
                            Tax Invoice
                          </button>

                          {/* Cancel if pending */}
                          {b.status === 'pending' && (
                            <button
                              type="button"
                              className="dash-sub-btn"
                              style={{ background: '#FEE2E2', color: '#B91C1C', borderColor: '#FECACA' }}
                              onClick={() => setCancelModalId(b.id)}
                            >
                              Cancel
                            </button>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── 4. CITIES VIEW ── */}
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
                { name: 'Cox\'s Bazar', desc: 'Kolatoli & Coastal Express' }
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

        {/* ── 5. NOTIFICATIONS VIEW ── */}
        {activeNav === 'notification' && (
          <div className="dash-content-pane animate-fade-in">
            <header className="dash-header">
              <h1 className="dash-title">Notifications</h1>
              <p className="dash-subtitle">Latest updates regarding your booking requests and dispatches.</p>
            </header>
            <div className="dash-notif-list">
              <div className="dash-notif-item">
                <span className="dash-notif-dot"></span>
                <div>
                  <h4>Backend Connected</h4>
                  <p>Connected to Django REST Framework API at <strong>http://localhost:8000/api/</strong>.</p>
                  <small>Just now</small>
                </div>
              </div>
              <div className="dash-notif-item">
                <span className="dash-notif-dot dash-notif-dot--read"></span>
                <div>
                  <h4>15% Off Your Next Move</h4>
                  <p>Use coupon code <strong>DIGAXYMOVE</strong> for your weekend shifting.</p>
                  <small>1 day ago</small>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── 6. SETTINGS VIEW (Connected to Backend Change Password) ── */}
        {activeNav === 'setting' && (
          <div className="dash-content-pane dash-settings-pane animate-fade-in">
            <div className="dash-settings-header">
              <button
                type="button"
                className="dash-settings-back-btn"
                onClick={() => setActiveNav('home')}
                aria-label="Back to home"
              >
                <span style={{ fontSize: '1.2rem', marginRight: '6px' }}>←</span>
                <h1 className="dash-settings-title">Settings</h1>
              </button>
            </div>

            <h2 className="dash-settings-subtitle">Account Settings</h2>

            <div className="dash-settings-profile">
              <div className="dash-settings-avatar-wrap">
                <img
                  src={user.avatar || '/images/avatar.jpg'}
                  alt={user.name}
                  className="dash-settings-avatar"
                  onError={(e) => { e.target.src = '/images/avatar.jpg' }}
                />
              </div>
              <div className="dash-settings-user-info">
                <h3 className="dash-settings-user-name">{user.name || 'Joe Mitchell'}</h3>
                <p className="dash-settings-user-email">{user.email || 'joemitchell016@gmail.com'}</p>
                <p style={{ fontSize: '0.82rem', color: '#64748B', marginTop: '2px' }}>Role: Customer / Normal User</p>
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
              <span className="dash-settings-item__label">Change Password (Django API)</span>
              <span className="dash-settings-item__chevron">›</span>
            </div>

            <h3 className="dash-settings-more-title">More</h3>

            <div className="dash-settings-item" onClick={() => setSettingsModal('privacy')} role="button" tabIndex={0}>
              <span className="dash-settings-item__label">Privacy Policy</span>
              <span className="dash-settings-item__chevron">›</span>
            </div>

            <div className="dash-settings-item" onClick={() => setSettingsModal('terms')} role="button" tabIndex={0}>
              <span className="dash-settings-item__label">Terms & Conditions</span>
              <span className="dash-settings-item__chevron">›</span>
            </div>

            <div className="dash-settings-item" onClick={() => setSettingsModal('support')} role="button" tabIndex={0}>
              <span className="dash-settings-item__label">Helps & Support</span>
              <span className="dash-settings-item__chevron">›</span>
            </div>

            <div className="dash-settings-item dash-settings-item--logout" onClick={handleLogout} role="button" tabIndex={0}>
              <span className="dash-settings-item__label">Logout</span>
              <span className="dash-settings-item__logout-icon">🚪</span>
            </div>
          </div>
        )}
      </main>

      {/* ── MODAL 1: BOOKING CONFIRMATION & PAYMENT MODAL ── */}
      {bookingModal && (
        <div className="dash-modal-overlay animate-fade-in" onClick={() => !bookingSuccess && setBookingModal(false)}>
          <div className="dash-modal-card" onClick={(e) => e.stopPropagation()}>
            {bookingSuccess ? (
              <div className="dash-modal-success animate-fade-in">
                <div className="dash-success-icon">✓</div>
                <h3>Move Request Submitted!</h3>
                <p>Saved to Django database. Driver dispatch is being assigned for <strong>{pickupAddress}</strong>.</p>
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
                      <p className="dash-modal-price">৳{calculatedTotalFareBDT} (approx. ${calculatedTotalFareUSD})</p>
                    </div>
                  </div>

                  <div className="dash-modal-details">
                    <div className="dash-modal-row">
                      <span>Pickup:</span>
                      <strong>{pickupAddress}</strong>
                    </div>
                    <div className="dash-modal-row">
                      <span>Destination:</span>
                      <strong>{dropAddress}</strong>
                    </div>
                    <div className="dash-modal-row">
                      <span>Route Distance:</span>
                      <strong>~{estimatedKm} km ({estimatedMins} mins via Highway)</strong>
                    </div>
                    <div className="dash-modal-row">
                      <span>Selected Items:</span>
                      <strong>{itemsDescription}</strong>
                    </div>
                    <div className="dash-modal-row">
                      <span>Labor & Crew:</span>
                      <strong>{helpersCount} Movers ({floorType === 'elevator' ? 'Elevator Access' : 'Stairs Access'})</strong>
                    </div>
                  </div>

                  {/* Payment Method Selector */}
                  <div style={{ marginTop: '16px' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: '700', color: '#0A2B39', display: 'block', marginBottom: '6px' }}>
                      Payment Method
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                      {[
                        { id: 'cash', label: 'Cash on Drop' },
                        { id: 'bkash', label: 'bKash' },
                        { id: 'nagad', label: 'Nagad' }
                      ].map(p => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => setPaymentMethod(p.id)}
                          style={{
                            padding: '8px',
                            borderRadius: '6px',
                            border: `2px solid ${paymentMethod === p.id ? '#B8861E' : '#CBD5E1'}`,
                            background: paymentMethod === p.id ? '#FFFDF9' : '#FFFFFF',
                            fontWeight: '600',
                            fontSize: '0.82rem',
                            cursor: 'pointer'
                          }}
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="dash-modal-footer">
                  <button className="dash-modal-btn dash-modal-btn--secondary" onClick={() => setBookingModal(false)} disabled={submittingBooking}>
                    Cancel
                  </button>
                  <button className="dash-modal-btn dash-modal-btn--primary" onClick={handleConfirmBooking} disabled={submittingBooking}>
                    {submittingBooking ? 'Submitting to Backend...' : `Confirm & Book (৳${calculatedTotalFareBDT})`}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ── MODAL 2: OFFICIAL PRINTABLE TAX INVOICE & RECEIPT (FEATURE 3) ── */}
      {receiptBooking && (
        <div className="dash-modal-overlay animate-fade-in" onClick={() => setReceiptBooking(null)}>
          <div className="dash-receipt-card" onClick={(e) => e.stopPropagation()}>
            <div className="dash-receipt-header">
              <div className="dash-receipt-brand">
                <h2>DIGAXY LOGISTICS</h2>
                <p>On-Demand Transport & Shifting Service</p>
                <p>Road 27, Dhanmondi, Dhaka-1209 • Helpline: +880 9612-344299</p>
              </div>
              <div className="dash-receipt-badge">
                <h3>OFFICIAL RECEIPT</h3>
                <span>INV-DGX-2026-00{receiptBooking.id}</span>
                <span>{new Date(receiptBooking.created_at || '2026-10-31T12:00:00Z').toLocaleDateString('en-GB')}</span>
              </div>
            </div>

            <div className="dash-receipt-parties">
              <div>
                <strong>Billed To (Customer):</strong>
                <div>{user.name}</div>
                <div>{user.phone || '+880 1712-345678'}</div>
                <div>{user.email}</div>
              </div>
              <div>
                <strong>Assigned Dispatch Crew:</strong>
                <div>
                  Driver: {receiptBooking.driver ? `${receiptBooking.driver.first_name} ${receiptBooking.driver.last_name || ''}` : 'Rakib Hassan'}
                </div>
                <div>Vehicle: {receiptBooking.vehicle_details?.name || 'Pickup Truck'}</div>
                <div>Reg: {receiptBooking.driver?.vehicle_reg_no || 'Dhaka Metro-U 14-8921'}</div>
              </div>
            </div>

            <table className="dash-receipt-table">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Route / Specifics</th>
                  <th className="text-right">Amount (৳)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Base Vehicle Transport</td>
                  <td>{receiptBooking.pickup_address} → {receiptBooking.drop_address}</td>
                  <td className="text-right">৳{Math.round(Number(receiptBooking.total_fare) * 0.75)}</td>
                </tr>
                <tr>
                  <td>Distance Surcharge</td>
                  <td>{receiptBooking.estimated_distance_km} km distance traverse</td>
                  <td className="text-right">৳{Math.round(Number(receiptBooking.total_fare) * 0.20)}</td>
                </tr>
                <tr>
                  <td>Cargo & Handling</td>
                  <td>{receiptBooking.items_description || 'Standard move goods'}</td>
                  <td className="text-right">৳{Math.round(Number(receiptBooking.total_fare) * 0.05)}</td>
                </tr>
                <tr className="dash-receipt-total-row">
                  <td colSpan="2">Total Paid ({receiptBooking.payment_method?.toUpperCase()})</td>
                  <td className="text-right" style={{ color: '#0A2B39' }}>৳{receiptBooking.total_fare}</td>
                </tr>
              </tbody>
            </table>

            <div className="dash-receipt-footer">
              <div className="dash-receipt-qr-wrap">
                {/* SVG QR Code Simulation */}
                <svg width="48" height="48" viewBox="0 0 40 40" fill="#0A2B39">
                  <rect x="2" y="2" width="12" height="12" fill="none" stroke="#0A2B39" strokeWidth="2" />
                  <rect x="5" y="5" width="6" height="6" fill="#0A2B39" />
                  <rect x="26" y="2" width="12" height="12" fill="none" stroke="#0A2B39" strokeWidth="2" />
                  <rect x="29" y="5" width="6" height="6" fill="#0A2B39" />
                  <rect x="2" y="26" width="12" height="12" fill="none" stroke="#0A2B39" strokeWidth="2" />
                  <rect x="5" y="29" width="6" height="6" fill="#0A2B39" />
                  <rect x="18" y="6" width="4" height="4" fill="#0A2B39" />
                  <rect x="18" y="18" width="8" height="8" fill="#0A2B39" />
                  <rect x="28" y="26" width="6" height="4" fill="#0A2B39" />
                  <rect x="28" y="32" width="8" height="6" fill="#0A2B39" />
                </svg>
                <div className="dash-receipt-qr-text">
                  <strong>Digaxy Verified Move</strong>
                  <div>Scan QR to verify invoice authenticity on government transport portal.</div>
                </div>
              </div>

              <div className="dash-receipt-actions">
                <button type="button" className="dash-sub-btn" onClick={() => setReceiptBooking(null)}>
                  Close
                </button>
                <button
                  type="button"
                  className="dash-receipt-print-btn"
                  onClick={() => window.print()}
                >
                  🖨️ Print / Save PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL 3: CANCEL BOOKING CONFIRMATION ── */}
      {cancelModalId && (
        <div className="dash-modal-overlay animate-fade-in" onClick={() => setCancelModalId(null)}>
          <div className="dash-modal-card" style={{ maxWidth: '420px' }} onClick={(e) => e.stopPropagation()}>
            <div className="dash-modal-header">
              <h3>Cancel Move Request</h3>
              <button className="dash-modal-close" onClick={() => setCancelModalId(null)}>✕</button>
            </div>
            <div className="dash-modal-body">
              <p>Are you sure you want to cancel Move <strong>#{cancelModalId}</strong>? This will release the assigned truck dispatch on the backend.</p>
            </div>
            <div className="dash-modal-footer">
              <button className="dash-modal-btn dash-modal-btn--secondary" onClick={() => setCancelModalId(null)}>
                Keep Booking
              </button>
              <button
                className="dash-modal-btn"
                style={{ background: '#DC2626', color: '#FFFFFF', borderColor: '#DC2626' }}
                onClick={() => handleCancelBooking(cancelModalId)}
              >
                Yes, Cancel Move
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL 4: SETTINGS SUB-MODALS ── */}
      {settingsModal && (
        <div className="dash-modal-overlay animate-fade-in" onClick={() => setSettingsModal(null)}>
          <div className="dash-modal-card dash-settings-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="dash-modal-header">
              <h3>
                {settingsModal === 'password' && 'Change Password (Django REST)'}
                {settingsModal === 'privacy' && 'Privacy Policy'}
                {settingsModal === 'terms' && 'Terms & Conditions'}
                {settingsModal === 'support' && 'Helps & Support'}
              </h3>
              <button className="dash-modal-close" onClick={() => setSettingsModal(null)}>✕</button>
            </div>

            {settingsModal === 'password' && (
              <form className="dash-password-form" onSubmit={handlePasswordSubmit}>
                {pwdError && <div className="dash-form-error">{pwdError}</div>}
                {pwdMsg && <div className="dash-form-success">{pwdMsg}</div>}

                <div className="dash-form-row">
                  <label>Current Password</label>
                  <input
                    type="password"
                    placeholder="Enter current password (e.g. pass1234)"
                    value={currentPwd}
                    onChange={(e) => setCurrentPwd(e.target.value)}
                    required
                  />
                </div>

                <div className="dash-form-row">
                  <label>New Password</label>
                  <input
                    type="password"
                    placeholder="Enter new password (min. 6 chars)"
                    value={newPwd}
                    onChange={(e) => setNewPwd(e.target.value)}
                    required
                  />
                </div>

                <div className="dash-form-row">
                  <label>Confirm New Password</label>
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPwd}
                    onChange={(e) => setConfirmPwd(e.target.value)}
                    required
                  />
                </div>

                <div className="dash-modal-footer" style={{ marginTop: '20px' }}>
                  <button type="button" className="dash-modal-btn dash-modal-btn--secondary" onClick={() => setSettingsModal(null)}>
                    Cancel
                  </button>
                  <button type="submit" className="dash-modal-btn dash-modal-btn--primary" disabled={pwdLoading}>
                    {pwdLoading ? 'Updating on Django...' : 'Update Password'}
                  </button>
                </div>
              </form>
            )}

            {settingsModal === 'privacy' && (
              <div className="dash-info-modal-body">
                <p>At <strong>Digaxy Bangladesh</strong>, protecting your personal data and location privacy is our priority.</p>
                <h4>1. Data We Collect</h4>
                <p>Pickup and drop-off coordinates are used solely to match you with vetted moving drivers.</p>
                <div className="dash-modal-footer" style={{ marginTop: '20px' }}>
                  <button type="button" className="dash-modal-btn dash-modal-btn--primary" onClick={() => setSettingsModal(null)}>
                    I Understand
                  </button>
                </div>
              </div>
            )}

            {settingsModal === 'terms' && (
              <div className="dash-info-modal-body">
                <p>By scheduling moving services with <strong>Digaxy</strong>, you agree to our transit safety terms.</p>
                <div className="dash-modal-footer" style={{ marginTop: '20px' }}>
                  <button type="button" className="dash-modal-btn dash-modal-btn--primary" onClick={() => setSettingsModal(null)}>
                    Accept Terms
                  </button>
                </div>
              </div>
            )}

            {settingsModal === 'support' && (
              <div className="dash-info-modal-body">
                <p>Our Dhaka-based customer care team is available 24/7:</p>
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
