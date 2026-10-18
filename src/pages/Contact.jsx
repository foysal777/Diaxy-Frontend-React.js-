import { useState } from 'react'
import './Contact.css'

function Contact() {
  const [form,   setForm]   = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', form)
    setStatus('success')
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <div className="contact-page" id="contact-page">
      {/* Header */}
      <section className="page-header" aria-label="Contact header">
        <div className="container page-header__content">
          <p className="page-eyebrow">CONTACT US</p>
          <h1 className="page-header__title">Get in Touch</h1>
          <p className="page-header__desc">
            Have a question or want to book a move? We're here to help.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="section" aria-label="Contact form">
        <div className="container contact-grid">

          {/* Info */}
          <aside className="contact-info">
            <h2 className="contact-info__title">Let's Connect</h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', lineHeight: 1.8 }}>
              Fill out the form and we'll get back to you within 24 hours.
            </p>
            <div className="contact-channels">
              {[
                { id: 'ch-email',    icon: '✉️', label: 'Email',        val: 'hello@digaxy.com'  },
                { id: 'ch-location', icon: '📍', label: 'Location',     val: 'Dhaka, Bangladesh' },
                { id: 'ch-hours',    icon: '🕐', label: 'Office Hours', val: 'Mon–Fri, 9am–6pm'  },
              ].map(({ id, icon, label, val }) => (
                <div key={id} id={id} className="contact-channel">
                  <span className="contact-channel__icon">{icon}</span>
                  <div>
                    <strong>{label}</strong>
                    <p>{val}</p>
                  </div>
                </div>
              ))}
            </div>
          </aside>

          {/* Form Card */}
          <div className="contact-form-card">
            {status === 'success' ? (
              <div className="contact-success" id="contact-success-msg">
                <span className="contact-success__icon">🎉</span>
                <h3>Message Sent!</h3>
                <p>Thanks for reaching out. We'll be in touch soon.</p>
                <button className="btn btn-outline" onClick={() => setStatus(null)} id="send-another-btn">
                  Send Another
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} noValidate id="contact-form">
                <div className="form-group">
                  <label htmlFor="input-name" className="form-label">Your Name</label>
                  <input id="input-name" name="name" type="text" className="form-input" placeholder="John Doe" value={form.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="input-email" className="form-label">Email Address</label>
                  <input id="input-email" name="email" type="email" className="form-input" placeholder="john@example.com" value={form.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="input-message" className="form-label">Message</label>
                  <textarea id="input-message" name="message" className="form-input form-textarea" placeholder="Tell us about your move…" rows={5} value={form.message} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary" id="submit-contact-btn" style={{ width: '100%', justifyContent: 'center' }}>
                  Send Message →
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
