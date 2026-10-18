import './About.css'

const team = [
  { id: 'team-1', name: 'Alice Chen',   role: 'Lead Developer',  emoji: '👩‍💻' },
  { id: 'team-2', name: 'Bob Rahman',   role: 'UI/UX Designer',  emoji: '🎨'  },
  { id: 'team-3', name: 'Carol Smith',  role: 'Product Manager', emoji: '📋'  },
]

function About() {
  return (
    <div className="about-page" id="about-page">
      {/* Header */}
      <section className="page-header" aria-label="About us header">
        <div className="container page-header__content">
          <p className="page-eyebrow">ABOUT US</p>
          <h1 className="page-header__title">Who We Are</h1>
          <p className="page-header__desc">
            We're a passionate team building the future of moving services.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="section" aria-label="Our mission">
        <div className="container about-mission">
          <div className="about-mission__text">
            <p className="page-eyebrow">OUR MISSION</p>
            <h2 className="about-mission__title">Moving Made Stress-Free</h2>
            <p className="about-mission__body">
              We believe great software starts with a solid foundation. Digaxy gives you
              everything you need to move fast without sacrificing quality — trained
              professionals, live tracking, and guaranteed on-time delivery.
            </p>
            <p className="about-mission__body">
              Whether you're relocating a studio or a full office, Digaxy scales with you.
            </p>
          </div>
          <div className="about-mission__visual" aria-hidden="true">
            <div className="about-blob">🚚</div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section" style={{ background: 'var(--color-white)' }} aria-label="Our team">
        <div className="container" style={{ textAlign: 'center' }}>
          <p className="page-eyebrow">THE TEAM</p>
          <h2 className="about-mission__title">Meet the People Behind Digaxy</h2>
          <div className="team-grid">
            {team.map(({ id, name, role, emoji }) => (
              <div key={id} id={id} className="team-card">
                <div className="team-avatar">{emoji}</div>
                <h3 className="team-name">{name}</h3>
                <p className="team-role">{role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
