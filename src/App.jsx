import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar     from './components/Navbar'
import Footer     from './components/Footer'
import Home       from './pages/Home'
import About      from './pages/About'
import Contact    from './pages/Contact'
import Login      from './pages/Login'
import SignUp     from './pages/SignUp'
import ComingSoon from './pages/ComingSoon'

function AppContent() {
  const location = useLocation()
  const isAuthPage = ['/login', '/signin', '/signup'].includes(location.pathname)

  return (
    <div className="app-wrapper">
      {!isAuthPage && <Navbar />}
      <main className="main-content">
        <Routes>
          <Route path="/"          element={<Home />}    />
          <Route path="/about"     element={<About />}   />
          <Route path="/contact"   element={<Contact />} />
          <Route path="/login"     element={<Login />}   />
          <Route path="/signin"    element={<Login />}   />
          <Route path="/signup"    element={<SignUp />}  />
          <Route path="/cities"    element={<ComingSoon title="Cities" />}          />
          <Route path="/retailers" element={<ComingSoon title="Retailers" />}       />
          <Route path="/partner"   element={<ComingSoon title="Become a Partner" />}/>
          <Route path="/estimate"  element={<ComingSoon title="Get Estimate" />}    />
          <Route path="/book"      element={<ComingSoon title="Book a Move" />}     />
          {/* 404 */}
          <Route path="*"          element={<ComingSoon title="Page Not Found" />}  />
        </Routes>
      </main>
      {!isAuthPage && <Footer />}
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
