import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar     from './components/Navbar'
import Footer     from './components/Footer'
import Home       from './pages/Home'
import About      from './pages/About'
import Contact    from './pages/Contact'
import ComingSoon from './pages/ComingSoon'

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/"          element={<Home />}    />
            <Route path="/about"     element={<About />}   />
            <Route path="/contact"   element={<Contact />} />
            <Route path="/cities"    element={<ComingSoon title="Cities" />}          />
            <Route path="/retailers" element={<ComingSoon title="Retailers" />}       />
            <Route path="/partner"   element={<ComingSoon title="Become a Partner" />}/>
            <Route path="/estimate"  element={<ComingSoon title="Get Estimate" />}    />
            <Route path="/book"      element={<ComingSoon title="Book a Move" />}     />
            <Route path="/signup"    element={<ComingSoon title="Sign Up" />}         />
            {/* 404 */}
            <Route path="*"          element={<ComingSoon title="Page Not Found" />}  />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
