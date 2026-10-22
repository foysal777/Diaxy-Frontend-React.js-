// API service connecting React Frontend to Django REST Backend
const API_BASE_URL = 'http://localhost:8000/api'

export function getAuthHeaders() {
  const token = localStorage.getItem('access_token')
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  }
}

// ── Auth APIs ──
export async function loginUser(email, password) {
  const response = await fetch(`${API_BASE_URL}/auth/login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.detail || 'Failed to login')
  }
  const data = await response.json()
  localStorage.setItem('access_token', data.access)
  localStorage.setItem('refresh_token', data.refresh)
  localStorage.setItem('currentUser', JSON.stringify(data.user))
  return data
}

export async function registerUser(userData) {
  const response = await fetch(`${API_BASE_URL}/auth/register/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  })
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(Object.values(errorData).flat().join(' ') || 'Registration failed')
  }
  return response.json()
}

export async function getUserProfile() {
  const response = await fetch(`${API_BASE_URL}/auth/profile/`, {
    headers: getAuthHeaders()
  })
  if (!response.ok) throw new Error('Failed to fetch profile')
  return response.json()
}

export async function changePassword(oldPassword, newPassword) {
  const response = await fetch(`${API_BASE_URL}/auth/change-password/`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ old_password: oldPassword, new_password: newPassword })
  })
  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(err.error || 'Failed to update password')
  }
  return response.json()
}

export async function toggleDriverStatus(isOnline) {
  const response = await fetch(`${API_BASE_URL}/auth/driver-status/`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
    body: JSON.stringify({ is_online: isOnline })
  })
  if (!response.ok) throw new Error('Failed to toggle driver status')
  return response.json()
}

// ── Vehicles & Bookings APIs ──
export async function getVehicles() {
  const response = await fetch(`${API_BASE_URL}/vehicles/`)
  if (!response.ok) throw new Error('Failed to fetch vehicle list')
  return response.json()
}

export async function getBookings() {
  const response = await fetch(`${API_BASE_URL}/bookings/`, {
    headers: getAuthHeaders()
  })
  if (!response.ok) throw new Error('Failed to fetch bookings')
  return response.json()
}

export async function createBooking(bookingData) {
  const response = await fetch(`${API_BASE_URL}/bookings/`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(bookingData)
  })
  if (!response.ok) throw new Error('Failed to create move booking')
  return response.json()
}

export async function getAvailableDispatches() {
  const response = await fetch(`${API_BASE_URL}/bookings/available/`, {
    headers: getAuthHeaders()
  })
  if (!response.ok) throw new Error('Failed to fetch dispatches')
  return response.json()
}

export async function acceptDispatch(bookingId) {
  const response = await fetch(`${API_BASE_URL}/bookings/${bookingId}/accept/`, {
    method: 'POST',
    headers: getAuthHeaders()
  })
  if (!response.ok) throw new Error('Failed to accept dispatch')
  return response.json()
}

export async function updateTripStatus(bookingId, status) {
  const response = await fetch(`${API_BASE_URL}/bookings/${bookingId}/status/`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
    body: JSON.stringify({ status })
  })
  if (!response.ok) throw new Error('Failed to update trip status')
  return response.json()
}

// ── Earnings APIs ──
export async function getEarningsSummary() {
  const response = await fetch(`${API_BASE_URL}/earnings/summary/`, {
    headers: getAuthHeaders()
  })
  if (!response.ok) throw new Error('Failed to fetch earnings summary')
  return response.json()
}

export async function getEarningsHistory() {
  const response = await fetch(`${API_BASE_URL}/earnings/history/`, {
    headers: getAuthHeaders()
  })
  if (!response.ok) throw new Error('Failed to fetch earnings history')
  return response.json()
}

export async function requestPayout(amount, method, accountNumber) {
  const response = await fetch(`${API_BASE_URL}/earnings/payouts/`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ amount, method, account_number: accountNumber })
  })
  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(err.amount?.[0] || 'Payout request failed')
  }
  return response.json()
}
