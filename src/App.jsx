'use client';
import React, { useState, useEffect, useRef } from 'react';

// ─── Navbar ──────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    setActiveLink(id);
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const offset = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  };

  const links = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'about', label: 'About Us' },
    { id: 'doctors', label: 'Doctors' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <nav className={`th-navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="th-container">
        <div className="th-nav-inner">
          {/* Logo */}
          <div className="th-logo" onClick={() => scrollTo('home')}>
            <div className="th-logo-icon">
              <i className="fas fa-heartbeat"></i>
            </div>
            <span className="th-logo-text">Turbo<span>Health</span></span>
          </div>

          {/* Desktop Links */}
          <ul className="th-nav-links">
            {links.map(l => (
              <li key={l.id}>
                <button
                  className={`th-nav-link${activeLink === l.id ? ' active' : ''}`}
                  onClick={() => scrollTo(l.id)}
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="th-nav-cta">
            <button className="th-btn th-btn-outline-sm" onClick={() => scrollTo('contact')}>
              <i className="fas fa-phone-alt me-1"></i> Call Us
            </button>
            <button className="th-btn th-btn-primary-sm" onClick={() => scrollTo('contact')}>
              Book Appointment
            </button>
          </div>

          {/* Hamburger */}
          <button
            className={`th-hamburger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span></span><span></span><span></span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`th-mobile-menu${menuOpen ? ' open' : ''}`}>
          {links.map(l => (
            <button
              key={l.id}
              className={`th-mobile-link${activeLink === l.id ? ' active' : ''}`}
              onClick={() => scrollTo(l.id)}
            >
              {l.label}
            </button>
          ))}
          <button className="th-btn th-btn-primary-sm w-100 mt-3" onClick={() => scrollTo('contact')}>
            Book Appointment
          </button>
        </div>
      </div>
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
  };

  return (
    <section id="home" className="th-hero">
      {/* Background shapes */}
      <div className="th-hero-blob th-hero-blob-1"></div>
      <div className="th-hero-blob th-hero-blob-2"></div>
      <div className="th-hero-blob th-hero-blob-3"></div>

      <div className="th-container">
        <div className="th-hero-grid">
          {/* Left Content */}
          <div className="th-hero-content">
            <div className="th-badge th-badge-pill mb-3">
              <i className="fas fa-shield-alt me-2"></i>Trusted Healthcare Since 2010
            </div>
            <h1 className="th-hero-title">
              Your Health is Our <span className="th-gradient-text">Top Priority</span>
            </h1>
            <p className="th-hero-desc">
              Turbo Health connects you with certified medical professionals, advanced diagnostics, and personalised care plans — all from the comfort of your home or at our clinic.
            </p>

            {/* Stats row */}
            <div className="th-hero-stats">
              <div className="th-hero-stat">
                <span className="th-stat-num">15K+</span>
                <span className="th-stat-label">Happy Patients</span>
              </div>
              <div className="th-hero-stat-divider"></div>
              <div className="th-hero-stat">
                <span className="th-stat-num">120+</span>
                <span className="th-stat-label">Specialist Doctors</span>
              </div>
              <div className="th-hero-stat-divider"></div>
              <div className="th-hero-stat">
                <span className="th-stat-num">98%</span>
                <span className="th-stat-label">Satisfaction Rate</span>
              </div>
            </div>

            <div className="th-hero-btns">
              <button className="th-btn th-btn-primary" onClick={() => scrollTo('contact')}>
                <i className="fas fa-calendar-check me-2"></i>Book Appointment
              </button>
              <button className="th-btn th-btn-outline" onClick={() => scrollTo('services')}>
                <i className="fas fa-play-circle me-2"></i>Our Services
              </button>
            </div>

            {/* Trust badges */}
            <div className="th-trust-badges">
              <div className="th-trust-badge">
                <i className="fas fa-certificate"></i>
                <span>ISO Certified</span>
              </div>
              <div className="th-trust-badge">
                <i className="fas fa-lock"></i>
                <span>HIPAA Compliant</span>
              </div>
              <div className="th-trust-badge">
                <i className="fas fa-clock"></i>
                <span>24/7 Support</span>
              </div>
            </div>
          </div>

          {/* Right Image Card */}
          <div className="th-hero-visual">
            <div className="th-hero-img-wrap">
              <div className="th-hero-img-bg"></div>
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80"
                alt="Doctor at Turbo Health"
                className="th-hero-img"
              />
              {/* Floating cards */}
              <div className="th-float-card th-float-card-1">
                <div className="th-float-icon green">
                  <i className="fas fa-heartbeat"></i>
                </div>
                <div>
                  <div className="th-float-title">Live Monitoring</div>
                  <div className="th-float-sub">Real-time health data</div>
                </div>
              </div>
              <div className="th-float-card th-float-card-2">
                <div className="th-float-icon blue">
                  <i className="fas fa-user-md"></i>
                </div>
                <div>
                  <div className="th-float-title">Expert Doctors</div>
                  <div className="th-float-sub">120+ Specialists</div>
                </div>
              </div>
              <div className="th-float-card th-float-card-3">
                <div className="th-float-icon purple">
                  <i className="fas fa-star"></i>
                </div>
                <div>
                  <div className="th-float-title">4.9 / 5 Rating</div>
                  <div className="th-float-sub">15,000+ reviews</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Marquee / Trusted By ────────────────────────────────────────────────────
function TrustedBy() {
  const partners = [
    'Apollo Hospitals', 'MediCare Plus', 'HealthFirst', 'CareMax', 'MedPoint',
    'VitalCare', 'LifeLine', 'ProHealth', 'DocConnect', 'WellNess360',
  ];
  return (
    <div className="th-trusted">
      <div className="th-container">
        <p className="th-trusted-label">Trusted by leading healthcare organisations</p>
      </div>
      <div className="th-marquee-wrap">
        <div className="th-marquee">
          {[...partners, ...partners].map((p, i) => (
            <div key={i} className="th-marquee-item">
              <i className="fas fa-plus-circle th-marquee-icon"></i>
              <span>{p}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Services ────────────────────────────────────────────────────────────────
function Services() {
  const services = [
    {
      icon: 'fas fa-stethoscope',
      color: 'blue',
      title: 'General Consultation',
      desc: 'Comprehensive health check-ups and consultations with our expert general practitioners available 7 days a week.',
      tags: ['In-Clinic', 'Online'],
    },
    {
      icon: 'fas fa-heart',
      color: 'red',
      title: 'Cardiology',
      desc: 'Advanced heart care with ECG, echocardiography, and stress testing performed by senior cardiologists.',
      tags: ['Specialist', 'Diagnostic'],
    },
    {
      icon: 'fas fa-brain',
      color: 'purple',
      title: 'Neurology',
      desc: 'Expert neurological care for conditions like migraines, epilepsy, and stroke recovery with state-of-the-art equipment.',
      tags: ['Specialist', 'Surgery'],
    },
    {
      icon: 'fas fa-bone',
      color: 'orange',
      title: 'Orthopaedics',
      desc: 'Comprehensive bone, joint and muscle care including physiotherapy, fracture management and joint replacement.',
      tags: ['Surgery', 'Physiotherapy'],
    },
    {
      icon: 'fas fa-baby',
      color: 'pink',
      title: 'Paediatrics',
      desc: 'Gentle, specialised care for infants, children and adolescents with our child-friendly paediatric specialists.',
      tags: ['Kids Care', 'Vaccination'],
    },
    {
      icon: 'fas fa-microscope',
      color: 'green',
      title: 'Diagnostics & Lab',
      desc: 'Full-spectrum diagnostic services including blood tests, MRI, CT scans, X-rays with same-day results.',
      tags: ['Lab Tests', 'Imaging'],
    },
    {
      icon: 'fas fa-tooth',
      color: 'teal',
      title: 'Dental Care',
      desc: 'Complete dental solutions from routine cleaning and fillings to cosmetic dentistry and implants.',
      tags: ['Cosmetic', 'Routine'],
    },
    {
      icon: 'fas fa-eye',
      color: 'indigo',
      title: 'Ophthalmology',
      desc: 'Comprehensive eye care services including LASIK, cataract surgery, and regular vision screenings.',
      tags: ['Surgery', 'Screening'],
    },
  ];

  return (
    <section id="services" className="th-section">
      <div className="th-container">
        <div className="th-section-header">
          <div className="th-badge mb-3"><i className="fas fa-cog me-2"></i>What We Offer</div>
          <h2 className="th-section-title">Our <span className="th-gradient-text">Medical Services</span></h2>
          <p className="th-section-desc">
            From preventive care to complex surgery, Turbo Health offers a full spectrum of medical specialties under one roof.
          </p>
        </div>

        <div className="row g-4">
          {services.map((s, i) => (
            <div key={i} className="col-12 col-sm-6 col-lg-3">
              <div className="th-service-card">
                <div className={`th-service-icon th-icon-${s.color}`}>
                  <i className={s.icon}></i>
                </div>
                <h4 className="th-service-title">{s.title}</h4>
                <p className="th-service-desc">{s.desc}</p>
                <div className="th-service-tags">
                  {s.tags.map((t, j) => (
                    <span key={j} className="th-tag">{t}</span>
                  ))}
                </div>
                <button className="th-service-link">
                  Learn More <i className="fas fa-arrow-right ms-1"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── About / Why Choose Us ───────────────────────────────────────────────────
function About() {
  const features = [
    { icon: 'fas fa-user-md', color: 'blue', title: '120+ Specialist Doctors', desc: 'Board-certified specialists across 30+ medical disciplines.' },
    { icon: 'fas fa-flask', color: 'green', title: 'Advanced Technology', desc: 'Latest medical equipment for accurate diagnostics and treatment.' },
    { icon: 'fas fa-clock', color: 'purple', title: '24/7 Emergency Care', desc: 'Round-the-clock emergency services with rapid response teams.' },
    { icon: 'fas fa-shield-alt', color: 'orange', title: 'Patient Privacy', desc: 'Strict HIPAA-compliant data protection and confidentiality.' },
  ];

  return (
    <section id="about" className="th-section th-section-alt">
      <div className="th-container">
        <div className="th-about-grid">
          {/* Left Visual */}
          <div className="th-about-visual">
            <div className="th-about-img-main">
              <img
                src="https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=600&q=80"
                alt="Turbo Health facility"
              />
            </div>
            <div className="th-about-img-sub">
              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=300&q=80"
                alt="Medical team"
              />
            </div>
            <div className="th-about-exp-badge">
              <span className="th-exp-num">13+</span>
              <span className="th-exp-text">Years of Excellence</span>
            </div>
          </div>

          {/* Right Content */}
          <div className="th-about-content">
            <div className="th-badge mb-3"><i className="fas fa-hospital me-2"></i>About Turbo Health</div>
            <h2 className="th-section-title text-start">
              Delivering <span className="th-gradient-text">Compassionate</span> Healthcare
            </h2>
            <p className="th-about-text">
              Founded in 2010, Turbo Health has grown into one of the region's most respected healthcare providers. Our mission is simple: deliver world-class medical care with genuine compassion, making quality healthcare accessible and affordable for every patient.
            </p>
            <p className="th-about-text">
              We combine cutting-edge technology with a deeply human approach — because we believe that exceptional medical care is not just about treating illness, it's about supporting overall well-being.
            </p>

            <div className="row g-3 mt-2">
              {features.map((f, i) => (
                <div key={i} className="col-12 col-sm-6">
                  <div className="th-feature-item">
                    <div className={`th-feature-icon th-icon-${f.color}`}>
                      <i className={f.icon}></i>
                    </div>
                    <div>
                      <h5 className="th-feature-title">{f.title}</h5>
                      <p className="th-feature-desc">{f.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className="th-btn th-btn-primary mt-4">
              <i className="fas fa-info-circle me-2"></i>Learn More About Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Stats Banner ─────────────────────────────────────────────────────────────
function StatsBanner() {
  const stats = [
    { icon: 'fas fa-users', num: '15,000+', label: 'Patients Treated' },
    { icon: 'fas fa-user-md', num: '120+', label: 'Specialist Doctors' },
    { icon: 'fas fa-hospital', num: '8', label: 'Clinic Branches' },
    { icon: 'fas fa-award', num: '25+', label: 'Awards Won' },
  ];

  return (
    <div className="th-stats-banner">
      <div className="th-container">
        <div className="th-stats-grid">
          {stats.map((s, i) => (
            <div key={i} className="th-stat-item">
              <div className="th-stat-icon">
                <i className={s.icon}></i>
              </div>
              <div className="th-stat-info">
                <div className="th-stat-number">{s.num}</div>
                <div className="th-stat-label">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── How It Works ─────────────────────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    { icon: 'fas fa-search', num: '01', title: 'Find a Doctor', desc: 'Browse our directory of 120+ specialist doctors by specialty, location, or availability.' },
    { icon: 'fas fa-calendar-alt', num: '02', title: 'Book Appointment', desc: 'Choose a convenient time slot online or call us. Instant confirmation via SMS and email.' },
    { icon: 'fas fa-video', num: '03', title: 'Consult & Diagnose', desc: 'Meet your doctor in-clinic or via secure video call. Get expert diagnosis and treatment plan.' },
    { icon: 'fas fa-pills', num: '04', title: 'Treatment & Care', desc: 'Receive prescriptions, follow-up care, and ongoing health monitoring from our care team.' },
  ];

  return (
    <section className="th-section">
      <div className="th-container">
        <div className="th-section-header">
          <div className="th-badge mb-3"><i className="fas fa-route me-2"></i>Simple Process</div>
          <h2 className="th-section-title">How It <span className="th-gradient-text">Works</span></h2>
          <p className="th-section-desc">Getting the care you need is quick and easy with Turbo Health's streamlined process.</p>
        </div>

        <div className="th-steps-grid">
          {steps.map((s, i) => (
            <div key={i} className="th-step-card">
              <div className="th-step-num">{s.num}</div>
              <div className="th-step-icon-wrap">
                <i className={s.icon}></i>
              </div>
              <h4 className="th-step-title">{s.title}</h4>
              <p className="th-step-desc">{s.desc}</p>
              {i < steps.length - 1 && <div className="th-step-arrow"><i className="fas fa-chevron-right"></i></div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Doctors ──────────────────────────────────────────────────────────────────
function Doctors() {
  const doctors = [
    {
      img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80',
      name: 'Dr. Sarah Mitchell',
      specialty: 'Cardiologist',
      exp: '15 yrs exp.',
      rating: 4.9,
      reviews: 312,
      tags: ['Heart Care', 'ECG'],
    },
    {
      img: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&q=80',
      name: 'Dr. James Okafor',
      specialty: 'Neurologist',
      exp: '12 yrs exp.',
      rating: 4.8,
      reviews: 278,
      tags: ['Brain', 'Spine'],
    },
    {
      img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80',
      name: 'Dr. Priya Sharma',
      specialty: 'Paediatrician',
      exp: '10 yrs exp.',
      rating: 4.9,
      reviews: 445,
      tags: ['Kids', 'Vaccines'],
    },
    {
      img: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&q=80',
      name: 'Dr. Marcus Reid',
      specialty: 'Orthopaedic Surgeon',
      exp: '18 yrs exp.',
      rating: 4.7,
      reviews: 189,
      tags: ['Joints', 'Surgery'],
    },
  ];

  return (
    <section id="doctors" className="th-section th-section-alt">
      <div className="th-container">
        <div className="th-section-header">
          <div className="th-badge mb-3"><i className="fas fa-user-md me-2"></i>Our Team</div>
          <h2 className="th-section-title">Meet Our <span className="th-gradient-text">Specialist Doctors</span></h2>
          <p className="th-section-desc">Our team of board-certified specialists brings decades of combined experience and a genuine passion for patient care.</p>
        </div>

        <div className="row g-4">
          {doctors.map((d, i) => (
            <div key={i} className="col-12 col-sm-6 col-lg-3">
              <div className="th-doctor-card">
                <div className="th-doctor-img-wrap">
                  <img src={d.img} alt={d.name} className="th-doctor-img" />
                  <div className="th-doctor-overlay">
                    <button className="th-btn th-btn-primary-sm">Book Now</button>
                  </div>
                </div>
                <div className="th-doctor-info">
                  <h4 className="th-doctor-name">{d.name}</h4>
                  <p className="th-doctor-specialty">{d.specialty}</p>
                  <div className="th-doctor-meta">
                    <span className="th-doctor-exp"><i className="fas fa-briefcase-medical me-1"></i>{d.exp}</span>
                    <span className="th-doctor-rating">
                      <i className="fas fa-star me-1"></i>{d.rating}
                      <span className="th-rating-count">({d.reviews})</span>
                    </span>
                  </div>
                  <div className="th-doctor-tags">
                    {d.tags.map((t, j) => (
                      <span key={j} className="th-tag">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-5">
          <button className="th-btn th-btn-outline">
            <i className="fas fa-users me-2"></i>View All Doctors
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── Appointment CTA Band ─────────────────────────────────────────────────────
function AppointmentBand() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
  };

  return (
    <div className="th-appt-band">
      <div className="th-appt-blob-1"></div>
      <div className="th-appt-blob-2"></div>
      <div className="th-container">
        <div className="th-appt-grid">
          <div className="th-appt-content">
            <h2 className="th-appt-title">Ready to Take Control of Your Health?</h2>
            <p className="th-appt-desc">Schedule an appointment today. Our team is available 7 days a week to help you get the care you deserve.</p>
            <div className="th-appt-contact">
              <a href="tel:+18001234567" className="th-appt-phone">
                <i className="fas fa-phone-alt"></i>
                <div>
                  <span>Call Us Now</span>
                  <strong>+1 800 123 4567</strong>
                </div>
              </a>
              <a href="mailto:hello@turbohealth.com" className="th-appt-email">
                <i className="fas fa-envelope"></i>
                <div>
                  <span>Email Us</span>
                  <strong>hello@turbohealth.com</strong>
                </div>
              </a>
            </div>
          </div>
          <div className="th-appt-form-wrap">
            <div className="th-appt-form">
              <h4>Book an Appointment</h4>
              <div className="th-form-group">
                <label>Your Name</label>
                <input type="text" placeholder="John Smith" />
              </div>
              <div className="th-form-group">
                <label>Phone Number</label>
                <input type="tel" placeholder="+1 (000) 000-0000" />
              </div>
              <div className="th-form-row">
                <div className="th-form-group">
                  <label>Department</label>
                  <select>
                    <option>Select department</option>
                    <option>Cardiology</option>
                    <option>Neurology</option>
                    <option>Orthopaedics</option>
                    <option>Paediatrics</option>
                  </select>
                </div>
                <div className="th-form-group">
                  <label>Date</label>
                  <input type="date" />
                </div>
              </div>
              <button className="th-btn th-btn-primary w-100">
                <i className="fas fa-calendar-check me-2"></i>Confirm Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
function Testimonials() {
  const reviews = [
    {
      name: 'Amanda Foster',
      role: 'Patient — Cardiology',
      img: 'https://randomuser.me/api/portraits/women/44.jpg',
      rating: 5,
      text: 'Turbo Health completely changed how I approach my cardiac health. Dr. Mitchell was thorough, compassionate, and explained everything clearly. The online booking was seamless!',
    },
    {
      name: 'Robert Chen',
      role: 'Patient — Orthopaedics',
      img: 'https://randomuser.me/api/portraits/men/32.jpg',
      rating: 5,
      text: 'After my knee replacement with Dr. Reid, I was back on my feet within weeks. The physiotherapy team was incredible. World-class care from start to finish.',
    },
    {
      name: 'Priya Kapoor',
      role: 'Patient — Paediatrics',
      img: 'https://randomuser.me/api/portraits/women/67.jpg',
      rating: 5,
      text: 'As a mum, I am so grateful for the paediatric team at Turbo Health. Dr. Sharma is patient, kind, and my children actually look forward to their check-ups!',
    },
    {
      name: 'Michael Torres',
      role: 'Patient — Neurology',
      img: 'https://randomuser.me/api/portraits/men/54.jpg',
      rating: 5,
      text: 'After years of unexplained migraines, Dr. Okafor finally diagnosed my condition and provided an effective treatment plan. I feel like a new person. Highly recommend!',
    },
    {
      name: 'Sarah Williams',
      role: 'Patient — Diagnostics',
      img: 'https://randomuser.me/api/portraits/women/12.jpg',
      rating: 5,
      text: 'Same-day lab results and a doctor who actually calls you back! The level of care and communication at Turbo Health is unlike anything I have experienced before.',
    },
    {
      name: 'David Osei',
      role: 'Patient — General',
      img: 'https://randomuser.me/api/portraits/men/22.jpg',
      rating: 5,
      text: 'Convenient online appointments, friendly staff, and genuinely expert doctors. Turbo Health is my family\'s go-to for all our healthcare needs.',
    },
  ];

  return (
    <section id="testimonials" className="th-section">
      <div className="th-container">
        <div className="th-section-header">
          <div className="th-badge mb-3"><i className="fas fa-quote-left me-2"></i>Patient Stories</div>
          <h2 className="th-section-title">What Our <span className="th-gradient-text">Patients Say</span></h2>
          <p className="th-section-desc">Real stories from real patients. See why thousands trust Turbo Health with their most precious asset — their health.</p>
        </div>

        <div className="row g-4">
          {reviews.map((r, i) => (
            <div key={i} className="col-12 col-md-6 col-lg-4">
              <div className="th-review-card">
                <div className="th-review-stars">
                  {[...Array(r.rating)].map((_, j) => (
                    <i key={j} className="fas fa-star"></i>
                  ))}
                </div>
                <p className="th-review-text">"{r.text}"</p>
                <div className="th-review-author">
                  <img src={r.img} alt={r.name} />
                  <div>
                    <h5>{r.name}</h5>
                    <p>{r.role}</p>
                  </div>
                  <div className="th-review-quote">
                    <i className="fas fa-quote-right"></i>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Health Tips / Blog Preview ───────────────────────────────────────────────
function BlogPreview() {
  const posts = [
    {
      img: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=600&q=80',
      category: 'Nutrition',
      date: 'Jun 12, 2024',
      title: '10 Foods That Naturally Boost Your Immune System',
      desc: 'Discover the science-backed superfoods that can strengthen your immune response and keep illness at bay all year round.',
      readTime: '5 min read',
    },
    {
      img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80',
      category: 'Fitness',
      date: 'Jun 8, 2024',
      title: 'The Best Low-Impact Exercises for Heart Health',
      desc: 'Our cardiology team shares the most effective low-impact workouts to strengthen your heart without stressing your joints.',
      readTime: '7 min read',
    },
    {
      img: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600&q=80',
      category: 'Mental Health',
      date: 'Jun 3, 2024',
      title: 'Managing Stress: A Doctor\'s Practical Guide',
      desc: 'Evidence-based strategies from our mental health specialists to help you manage daily stress and prevent burnout.',
      readTime: '6 min read',
    },
  ];

  return (
    <section className="th-section th-section-alt">
      <div className="th-container">
        <div className="th-section-header">
          <div className="th-badge mb-3"><i className="fas fa-newspaper me-2"></i>Health Tips</div>
          <h2 className="th-section-title">Latest Health <span className="th-gradient-text">Articles</span></h2>
          <p className="th-section-desc">Expert insights, health tips, and medical news from our team of specialists.</p>
        </div>

        <div className="row g-4">
          {posts.map((p, i) => (
            <div key={i} className="col-12 col-md-4">
              <div className="th-blog-card">
                <div className="th-blog-img-wrap">
                  <img src={p.img} alt={p.title} />
                  <span className="th-blog-category">{p.category}</span>
                </div>
                <div className="th-blog-body">
                  <div className="th-blog-meta">
                    <span><i className="fas fa-calendar me-1"></i>{p.date}</span>
                    <span><i className="fas fa-clock me-1"></i>{p.readTime}</span>
                  </div>
                  <h4 className="th-blog-title">{p.title}</h4>
                  <p className="th-blog-desc">{p.desc}</p>
                  <button className="th-blog-link">
                    Read Article <i className="fas fa-arrow-right ms-1"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  const infos = [
    { icon: 'fas fa-map-marker-alt', color: 'blue', title: 'Our Location', lines: ['123 Health Boulevard', 'New York, NY 10001'] },
    { icon: 'fas fa-phone-alt', color: 'green', title: 'Phone Number', lines: ['+1 800 123 4567', '+1 800 987 6543'] },
    { icon: 'fas fa-envelope', color: 'purple', title: 'Email Address', lines: ['hello@turbohealth.com', 'support@turbohealth.com'] },
    { icon: 'fas fa-clock', color: 'orange', title: 'Working Hours', lines: ['Mon – Fri: 8:00am – 9:00pm', 'Sat – Sun: 9:00am – 6:00pm'] },
  ];

  return (
    <section id="contact" className="th-section">
      <div className="th-container">
        <div className="th-section-header">
          <div className="th-badge mb-3"><i className="fas fa-envelope me-2"></i>Get in Touch</div>
          <h2 className="th-section-title">Contact <span className="th-gradient-text">Turbo Health</span></h2>
          <p className="th-section-desc">Have questions? Our care team is available 7 days a week to assist you.</p>
        </div>

        <div className="th-contact-grid">
          {/* Info Panel */}
          <div className="th-contact-info">
            {infos.map((inf, i) => (
              <div key={i} className="th-contact-info-card">
                <div className={`th-contact-icon th-icon-${inf.color}`}>
                  <i className={inf.icon}></i>
                </div>
                <div>
                  <h5 className="th-contact-info-title">{inf.title}</h5>
                  {inf.lines.map((l, j) => <p key={j} className="th-contact-info-line">{l}</p>)}
                </div>
              </div>
            ))}

            {/* Map placeholder */}
            <div className="th-map-embed">
              <iframe
                title="Turbo Health Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215256!2d-74.0059731!3d40.7127753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQyJzQ2LjAiTiA3NMKwMDAnMjEuNSJX!5e0!3m2!1sen!2sus!4v1"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>

          {/* Form Panel */}
          <div className="th-contact-form-wrap">
            <div className="th-contact-form">
              <h3>Send Us a Message</h3>
              <p className="th-contact-form-sub">Fill out the form below and we'll get back to you within 24 hours.</p>
              {sent && (
                <div className="th-success-msg">
                  <i className="fas fa-check-circle me-2"></i> Message sent! We'll be in touch soon.
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="th-form-row">
                  <div className="th-form-group">
                    <label>Full Name *</label>
                    <input name="name" value={form.name} onChange={handleChange} placeholder="John Smith" required />
                  </div>
                  <div className="th-form-group">
                    <label>Email Address *</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="john@example.com" required />
                  </div>
                </div>
                <div className="th-form-row">
                  <div className="th-form-group">
                    <label>Phone Number</label>
                    <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+1 (000) 000-0000" />
                  </div>
                  <div className="th-form-group">
                    <label>Subject</label>
                    <input name="subject" value={form.subject} onChange={handleChange} placeholder="How can we help?" />
                  </div>
                </div>
                <div className="th-form-group">
                  <label>Message *</label>
                  <textarea name="message" rows="5" value={form.message} onChange={handleChange} placeholder="Tell us more about your inquiry..." required></textarea>
                </div>
                <button type="submit" className="th-btn th-btn-primary w-100">
                  <i className="fas fa-paper-plane me-2"></i>Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
  };

  return (
    <footer className="th-footer">
      <div className="th-footer-top">
        <div className="th-container">
          <div className="th-footer-grid">
            {/* Brand */}
            <div className="th-footer-brand-col">
              <div className="th-logo mb-3">
                <div className="th-logo-icon"><i className="fas fa-heartbeat"></i></div>
                <span className="th-logo-text">Turbo<span>Health</span></span>
              </div>
              <p className="th-footer-desc">
                Delivering compassionate, world-class healthcare since 2010. Your health is our mission.
              </p>
              <div className="th-footer-socials">
                {[
                  { icon: 'fab fa-facebook-f', href: '#', label: 'Facebook' },
                  { icon: 'fab fa-twitter', href: '#', label: 'Twitter' },
                  { icon: 'fab fa-instagram', href: '#', label: 'Instagram' },
                  { icon: 'fab fa-linkedin-in', href: '#', label: 'LinkedIn' },
                  { icon: 'fab fa-youtube', href: '#', label: 'YouTube' },
                ].map((s, i) => (
                  <a key={i} href={s.href} aria-label={s.label} className="th-social-link">
                    <i className={s.icon}></i>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="th-footer-links-col">
              <h5>Quick Links</h5>
              <ul>
                {['Home', 'Services', 'About Us', 'Doctors', 'Contact'].map((l, i) => (
                  <li key={i}>
                    <button onClick={() => scrollTo(l.toLowerCase().replace(' us', '').replace(' ', '-'))}>
                      <i className="fas fa-chevron-right me-2"></i>{l}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="th-footer-links-col">
              <h5>Our Services</h5>
              <ul>
                {['General Consultation', 'Cardiology', 'Neurology', 'Orthopaedics', 'Paediatrics', 'Diagnostics'].map((s, i) => (
                  <li key={i}>
                    <button onClick={() => scrollTo('services')}>
                      <i className="fas fa-chevron-right me-2"></i>{s}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact & Newsletter */}
            <div className="th-footer-contact-col">
              <h5>Stay Healthy</h5>
              <p className="th-footer-newsletter-text">Subscribe for health tips and news from our experts.</p>
              <div className="th-newsletter">
                <input type="email" placeholder="Your email address" />
                <button className="th-btn th-btn-primary-sm">Subscribe</button>
              </div>
              <div className="th-footer-contact-items">
                <div className="th-footer-contact-item">
                  <i className="fas fa-phone-alt"></i>
                  <a href="tel:+18001234567">+1 800 123 4567</a>
                </div>
                <div className="th-footer-contact-item">
                  <i className="fas fa-envelope"></i>
                  <a href="mailto:hello@turbohealth.com">hello@turbohealth.com</a>
                </div>
                <div className="th-footer-contact-item">
                  <i className="fas fa-clock"></i>
                  <span>24/7 Emergency Line</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="th-footer-bottom">
        <div className="th-container">
          <div className="th-footer-bottom-inner">
            <p>© {new Date().getFullYear()} Turbo Health. All rights reserved.</p>
            <div className="th-footer-bottom-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Scroll To Top Button ─────────────────────────────────────────────────────
function ScrollTopBtn() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return visible ? (
    <button
      className="th-scroll-top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
    >
      <i className="fas fa-chevron-up"></i>
    </button>
  ) : null;
}

// ─── App Root ─────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustedBy />
        <Services />
        <About />
        <StatsBanner />
        <HowItWorks />
        <Doctors />
        <AppointmentBand />
        <Testimonials />
        <BlogPreview />
        <Contact />
      </main>
      <Footer />
      <ScrollTopBtn />
    </>
  );
}
