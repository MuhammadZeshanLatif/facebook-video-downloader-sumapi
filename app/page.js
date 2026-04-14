'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollTopVisible, setScrollTopVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 100;
      setScrolled(isScrolled);
      setScrollTopVisible(isScrolled);
      
      // Update active section
      const sections = document.querySelectorAll('section[id]');
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          current = section.getAttribute('id');
        }
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      
      // Close mobile menu if open
      const navbarCollapse = document.querySelector('.navbar-collapse');
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        navbarCollapse.classList.remove('show');
      }
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const phone = form.phone.value;
    const email = form.email.value;
    const subject = form.subject.value;
    const message = form.message.value;

    const mailtoLink = `mailto:away2freedom302@gmail.com?subject=${encodeURIComponent(subject || 'Contact Form Submission')} &body=${encodeURIComponent(`Name: ${name}\nPhone: ${phone}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

    window.location.href = mailtoLink;
    alert('Thank you for your message! Your email client will open to send the message to Simone Harris. For immediate assistance, please call (702) 447-8550.');
    form.reset();
  };

  return (
    <>
      {/* Navigation */}
      <nav className={`navbar navbar-expand-lg fixed-top ${scrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <a className="navbar-brand" href="#home" onClick={(e) => scrollToSection(e, 'home')}>
            Simone <span>Harris</span>
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className={`nav-link ${activeSection === 'home' ? 'active' : ''}`} href="#home" onClick={(e) => scrollToSection(e, 'home')}>Home</a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${activeSection === 'about' ? 'active' : ''}`} href="#about" onClick={(e) => scrollToSection(e, 'about')}>About</a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${activeSection === 'services' ? 'active' : ''}`} href="#services" onClick={(e) => scrollToSection(e, 'services')}>Services</a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${activeSection === 'process' ? 'active' : ''}`} href="#process" onClick={(e) => scrollToSection(e, 'process')}>Process</a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${activeSection === 'testimonials' ? 'active' : ''}`} href="#testimonials" onClick={(e) => scrollToSection(e, 'testimonials')}>Testimonials</a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${activeSection === 'faq' ? 'active' : ''}`} href="#faq" onClick={(e) => scrollToSection(e, 'faq')}>FAQ</a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`} href="#contact" onClick={(e) => scrollToSection(e, 'contact')}>Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 hero-content">
              <h1 className="hero-subtitle">24/7 BAIL BOND SERVICES</h1>
              <h1 className="hero-title">
                Fast, Reliable & <span className="gold-text">Compassionate</span> Bail Bonds in Newark, Delaware
              </h1>
              <p className="hero-tagline">
                &quot;Not Just Another Bail Bonds Agent – A Mother Who Cares&quot;
              </p>
              <div className="hero-cta">
                <a href="tel:7024478550" className="btn btn-gold me-3 mb-3">
                  <i className="fas fa-phone-alt me-2"></i>Call Now (702) 447-8550
                </a>
                <a href="https://wa.me/17024478550" className="btn btn-outline-gold mb-3" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-whatsapp me-2"></i>WhatsApp Us
                </a>
              </div>
              <div className="mt-4">
                <span className="location-badge">
                  <i className="fas fa-map-marker-alt"></i>Serving Newark, Delaware
                </span>
                <span className="location-badge">
                  <i className="fas fa-clock"></i>24/7 Available
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section section-padding">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <div className="about-image">
                <img 
                  src="/imgs/simoneimg.webp" 
                  alt="Simone Harris Bail Bond Agent Newark Delaware - Professional Service" 
                  loading="lazy"
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="about-content ps-lg-5">
                <h2 className="section-title">About <span className="gold-text">Simone Harris</span></h2>
                <p className="section-subtitle">Your Trusted Bail Bond Agent in Newark, Delaware</p>
                <h3>Not Just Another Bail Bonds Agent – A Mother Who Cares</h3>
                <p>
                  With years of experience serving the Newark, Delaware community, Simone Harris has built a reputation as a compassionate and reliable bail bond agent who truly understands the stress and urgency that comes with needing bail services.
                </p>
                <p>
                  As a mother herself, Simone brings a unique perspective to her work. She knows that behind every case is a family waiting for their loved one to come home. That&apos;s why she treats every client with dignity, respect, and the urgency they deserve.
                </p>
                <p>
                  Whether you&apos;re facing a misdemeanor or felony charge in Newark, Delaware, Simone Harris is available 24/7 to help you navigate the bail process quickly and confidentially.
                </p>
                <ul className="about-features">
                  <li><i className="fas fa-check-circle"></i> Licensed &amp; Experienced Bail Bond Agent</li>
                  <li><i className="fas fa-check-circle"></i> Serving Newark, Delaware &amp; Surrounding Areas</li>
                  <li><i className="fas fa-check-circle"></i> Compassionate, Mother-Like Care</li>
                  <li><i className="fas fa-check-circle"></i> Fast &amp; Confidential Service</li>
                  <li><i className="fas fa-check-circle"></i> Flexible Payment Options</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose-section section-padding">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">Why Choose <span className="gold-text">Us</span></h2>
            <p className="section-subtitle">The Simone Harris Difference in Newark, Delaware</p>
          </div>
          <div className="row g-4">
            <div className="col-md-6 col-lg-3">
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-clock"></i>
                </div>
                <h4>24/7 Availability</h4>
                <p>Arrests don&apos;t wait for business hours. Neither do we. Available around the clock in Newark, Delaware.</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-bolt"></i>
                </div>
                <h4>Fast Release</h4>
                <p>We expedite the bail process to get your loved one home as quickly as possible, often within hours.</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-hand-holding-usd"></i>
                </div>
                <h4>Affordable Rates</h4>
                <p>Competitive pricing with flexible payment plans. No hidden fees, ever.</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-heart"></i>
                </div>
                <h4>Compassionate Care</h4>
                <p>A mother who cares. We treat every client like family during difficult times.</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-certificate"></i>
                </div>
                <h4>Licensed &amp; Trusted</h4>
                <p>Fully licensed bail bond agent serving Newark, Delaware with integrity.</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-file-contract"></i>
                </div>
                <h4>Simple Process</h4>
                <p>We make the bail bond process easy to understand and straightforward.</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-map-marked-alt"></i>
                </div>
                <h4>Local Expertise</h4>
                <p>Deep knowledge of Newark, Delaware courts and detention centers.</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-user-shield"></i>
                </div>
                <h4>Confidential</h4>
                <p>Your privacy is paramount. We handle all cases with complete discretion and confidentiality.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services-section section-padding">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">Our <span className="gold-text">Services</span></h2>
            <p className="section-subtitle">Complete Bail Bond Services in Newark, Delaware</p>
          </div>
          <div className="row g-4">
            <div className="col-md-6 col-lg-3">
              <div className="service-card">
                <div className="service-icon">
                  <i className="fas fa-shield-alt"></i>
                </div>
                <h4>Secured Bail Bonds</h4>
                <p>Collateral-based bail bonds with flexible terms for larger bond amounts in Delaware.</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="service-card">
                <div className="service-icon">
                  <i className="fas fa-gavel"></i>
                </div>
                <h4>Felony Bonds</h4>
                <p>Expert handling of felony bail bonds with fast processing and confidential service.</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="service-card">
                <div className="service-icon">
                  <i className="fas fa-balance-scale"></i>
                </div>
                <h4>Misdemeanor Bonds</h4>
                <p>Quick release for misdemeanor charges with affordable rates in Newark, DE.</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="service-card">
                <div className="service-icon">
                  <i className="fas fa-file-signature"></i>
                </div>
                <h4>Surety Bail Bonds</h4>
                <p>Traditional surety bonds with trusted insurance backing for peace of mind.</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="service-card">
                <div className="service-icon">
                  <i className="fas fa-rocket"></i>
                </div>
                <h4>Fast Release</h4>
                <p>Expedited bail processing to minimize time in detention. Often released within hours.</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="service-card">
                <div className="service-icon">
                  <i className="fas fa-user-secret"></i>
                </div>
                <h4>Confidential Process</h4>
                <p>Complete privacy and discretion throughout your entire bail bond experience.</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="service-card">
                <div className="service-icon">
                  <i className="fas fa-tags"></i>
                </div>
                <h4>No Hidden Fees</h4>
                <p>Transparent pricing with no surprises. What we quote is what you pay.</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="service-card">
                <div className="service-icon">
                  <i className="fas fa-moon"></i>
                </div>
                <h4>24/7 Service</h4>
                <p>Available day and night, weekends and holidays. Call anytime at (702) 447-8550.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="process" className="how-it-works-section section-padding">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">How The Bail <span className="gold-text">Process Works</span></h2>
            <p className="section-subtitle">Simple Steps to Freedom in Newark, Delaware</p>
          </div>
          <div className="row">
            <div className="col-md-6 col-lg-3">
              <div className="step-card">
                <div className="step-connector"></div>
                <div className="step-number">1</div>
                <h4>Contact Us</h4>
                <p>Call (702) 447-8550 or WhatsApp us 24/7. We&apos;ll gather basic information about the arrest and location.</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="step-card">
                <div className="step-connector"></div>
                <div className="step-number">2</div>
                <h4>Get Quote</h4>
                <p>We&apos;ll provide a transparent quote with no hidden fees. Discuss payment options that work for you.</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="step-card">
                <div className="step-connector"></div>
                <div className="step-number">3</div>
                <h4>Complete Paperwork</h4>
                <p>Quick and simple documentation process. We handle all the paperwork efficiently and confidentially.</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="step-card">
                <div className="step-number">4</div>
                <h4>Fast Release</h4>
                <p>We post bail immediately. Your loved one is typically released within 1-2 hours in Newark, Delaware.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Local SEO Section */}
      <section className="local-seo-section section-padding">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="local-seo-content text-center">
                <h2>Trusted Bail Bond Services in Newark, Delaware</h2>
                <p>
                  Simone Harris is your local bail bond expert serving Newark, Delaware and the surrounding areas. With deep knowledge of the Delaware court system, local detention centers, and the unique needs of the Newark community, we provide bail bond services that are fast, reliable, and compassionate.
                </p>
                <p>
                  Whether you need bail bonds in Newark, DE, or surrounding Delaware communities, our 24/7 service ensures you&apos;re never alone during difficult times. We understand the local legal landscape and work efficiently with Newark courts and detention facilities to secure the fastest possible release.
                </p>
                <div className="mt-4">
                  <span className="location-badge">
                    <i className="fas fa-map-marker-alt"></i>Newark, Delaware
                  </span>
                  <span className="location-badge">
                    <i className="fas fa-building"></i>Newark Court
                  </span>
                  <span className="location-badge">
                    <i className="fas fa-landmark"></i>Delaware Detention
                  </span>
                  <span className="location-badge">
                    <i className="fas fa-city"></i>New Castle County
                  </span>
                </div>
                <div className="mt-5">
                  <a href="tel:7024478550" className="btn btn-gold btn-lg">
                    <i className="fas fa-phone-alt me-2"></i>Call (702) 447-8550
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="testimonials-section section-padding">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">Client <span className="gold-text">Testimonials</span></h2>
            <p className="section-subtitle">What Families in Newark, Delaware Say About Us</p>
          </div>
          <div className="row">
            <div className="col-md-6 col-lg-4">
              <div className="testimonial-card">
                <div className="testimonial-stars">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
                <p className="testimonial-text">
                  &quot;Simone was a lifesaver! When my son was arrested in Newark, I was panicked. She answered my call at 2 AM and had him home within 2 hours. Her compassion and professionalism are unmatched.&quot;
                </p>
                <div className="testimonial-author">
                  <img src="/images/simone1.jpg" alt="Satisfied Client from Newark Delaware" loading="lazy" />
                  <div className="author-info">
                    <h5>Maria Rodriguez</h5>
                    <p>Newark, Delaware</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="testimonial-card">
                <div className="testimonial-stars">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
                <p className="testimonial-text">
                  &quot;I&apos;ve never needed a bail bondsman before and was so stressed. Simone made the process so easy to understand. She truly cares like a mother would. Highly recommend her services in Delaware!&quot;
                </p>
                <div className="testimonial-author">
                  <img src="/images/simone2.jpg" alt="Happy Client Newark DE" loading="lazy" />
                  <div className="author-info">
                    <h5>James Thompson</h5>
                    <p>Newark, DE</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="testimonial-card">
                <div className="testimonial-stars">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
                <p className="testimonial-text">
                  &quot;Fast, professional, and affordable. Simone got my brother out of detention quickly and worked with us on a payment plan. She&apos;s the best bail bond agent in Newark, Delaware!&quot;
                </p>
                <div className="testimonial-author">
                  <img src="/images/simone1.jpg" alt="Grateful Family Member Delaware" loading="lazy" />
                  <div className="author-info">
                    <h5>Patricia Williams</h5>
                    <p>Newark, Delaware</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Banner */}
      <section className="emergency-banner">
        <div className="container">
          <h2><i className="fas fa-exclamation-triangle me-3"></i>NEED BAIL BONDS NOW?</h2>
          <p>We&apos;re Available 24/7 in Newark, Delaware - Call Anytime!</p>
          <a href="tel:7024478550" className="emergency-phone">
            <i className="fas fa-phone-alt me-2"></i>(702) 447-8550
          </a>
          <div className="mt-3">
            <a href="https://wa.me/17024478550" className="btn btn-light btn-lg" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-whatsapp me-2"></i>WhatsApp Us Now
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="faq-section section-padding">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">Frequently Asked <span className="gold-text">Questions</span></h2>
            <p className="section-subtitle">Common Questions About Bail Bonds in Newark, Delaware</p>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="accordion" id="faqAccordion">
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
                      How quickly can you post bail in Newark, Delaware?
                    </button>
                  </h2>
                  <div id="faq1" className="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      We can typically post bail within 1-2 hours in Newark, Delaware. Our 24/7 service ensures fast release from detention centers. The exact time depends on the facility&apos;s processing speed, but we work diligently to expedite the process and get your loved one home as quickly as possible.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
                      What payment methods do you accept?
                    </button>
                  </h2>
                  <div id="faq2" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      We accept cash, credit cards, debit cards, and offer flexible payment plans to make bail bonds affordable for everyone in Newark, Delaware. We understand that financial situations vary, which is why we work with you to create a payment plan that fits your budget.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq3">
                      Do you handle felony and misdemeanor bonds?
                    </button>
                  </h2>
                  <div id="faq3" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      Yes, Simone Harris handles all types of bail bonds including felony bonds, misdemeanor bonds, secured bail, and surety bail throughout Delaware. No matter the charge, we&apos;re here to help you navigate the bail process with compassion and professionalism.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq4">
                      Is the bail bond process confidential?
                    </button>
                  </h2>
                  <div id="faq4" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      Absolutely. We maintain complete confidentiality throughout the entire bail bond process. Your privacy is our priority. All conversations and transactions are handled discreetly, and we never share your information with third parties.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq5">
                      What information do I need to provide?
                    </button>
                  </h2>
                  <div id="faq5" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      To start the bail bond process, we&apos;ll need the defendant&apos;s full name, date of birth, the detention facility location, booking number (if available), and the bail amount. Don&apos;t worry if you don&apos;t have all this information - we can help you obtain it.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq6">
                      Are you available on weekends and holidays?
                    </button>
                  </h2>
                  <div id="faq6" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      Yes! We&apos;re available 24/7, 365 days a year, including weekends and holidays. Arrests don&apos;t wait for business hours, and neither do we. Call us anytime at (702) 447-8550 for immediate assistance in Newark, Delaware.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section section-padding">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">Get In <span className="gold-text">Touch</span></h2>
            <p className="section-subtitle">Contact Simone Harris for Bail Bonds in Newark, Delaware</p>
          </div>
          <div className="row">
            <div className="col-lg-5 mb-4 mb-lg-0">
              <div className="contact-info-card">
                <i className="fas fa-phone-alt"></i>
                <h5>Phone</h5>
                <p><a href="tel:7024478550">(702) 447-8550</a></p>
                <p className="small text-muted">Available 24/7</p>
              </div>
              <div className="contact-info-card">
                <i className="fab fa-whatsapp"></i>
                <h5>WhatsApp</h5>
                <p><a href="https://wa.me/17024478550" target="_blank" rel="noopener noreferrer">+1 (702) 447-8550</a></p>
                <p className="small text-muted">Quick Response</p>
              </div>
              <div className="contact-info-card">
                <i className="fas fa-envelope"></i>
                <h5>Email</h5>
                <p><a href="mailto:away2freedom302@gmail.com">away2freedom302@gmail.com</a></p>
                <p className="small text-muted">Response within 24 hours</p>
              </div>
              <div className="contact-info-card">
                <i className="fas fa-map-marker-alt"></i>
                <h5>Address</h5>
                <p>288 E Main St, Newark, Delaware 19711</p>
                <p className="small text-muted">Serving Newark &amp; Surrounding Areas</p>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="contact-form">
                <h3 className="mb-4 gold-text">Send Us a Message</h3>
                <form id="contactForm" onSubmit={handleFormSubmit}>
                  <div className="row">
                    <div className="col-md-6">
                      <label htmlFor="name">Full Name *</label>
                      <input type="text" className="form-control" id="name" name="name" required placeholder="Your full name" />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="phone">Phone Number *</label>
                      <input type="tel" className="form-control" id="phone" name="phone" required placeholder="(702) 447-8550" />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label htmlFor="email">Email Address</label>
                      <input type="email" className="form-control" id="email" name="email" placeholder="your@email.com" />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="subject">Subject</label>
                      <input type="text" className="form-control" id="subject" name="subject" placeholder="How can we help?" />
                    </div>
                  </div>
                  <label htmlFor="message">Message *</label>
                  <textarea className="form-control" id="message" name="message" rows="5" required placeholder="Tell us about your situation..."></textarea>
                  <button type="submit" className="btn btn-gold w-100">
                    <i className="fas fa-paper-plane me-2"></i>Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3098.7654321!2d-75.7519!3d39.6837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c6f4c0a0b0c0d0%3A0x1234567890abcdef!2s288%20E%20Main%20St%2C%20Newark%2C%20DE%2019711!5e0!3m2!1sen!2sus!4v1234567890"
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Simone Harris Bail Bonds Location Newark Delaware"
          ></iframe>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 mb-4 mb-lg-0">
              <div className="footer-brand">
                Simone <span>Harris</span>
              </div>
              <p className="footer-description">
                Not Just Another Bail Bonds Agent – A Mother Who Cares. Providing compassionate, professional bail bond services in Newark, Delaware 24/7.
              </p>
              <div className="footer-social">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>
            <div className="col-lg-2 col-md-6 mb-4 mb-lg-0">
              <div className="footer-links">
                <h5>Quick Links</h5>
                <ul>
                  <li><a href="#home" onClick={(e) => scrollToSection(e, 'home')}>Home</a></li>
                  <li><a href="#about" onClick={(e) => scrollToSection(e, 'about')}>About</a></li>
                  <li><a href="#services" onClick={(e) => scrollToSection(e, 'services')}>Services</a></li>
                  <li><a href="#process" onClick={(e) => scrollToSection(e, 'process')}>Process</a></li>
                </ul>
              </div>
            </div>
            <div className="col-lg-2 col-md-6 mb-4 mb-lg-0">
              <div className="footer-links">
                <h5>Services</h5>
                <ul>
                  <li><a href="#services" onClick={(e) => scrollToSection(e, 'services')}>Felony Bonds</a></li>
                  <li><a href="#services" onClick={(e) => scrollToSection(e, 'services')}>Misdemeanor Bonds</a></li>
                  <li><a href="#services" onClick={(e) => scrollToSection(e, 'services')}>Secured Bail</a></li>
                  <li><a href="#services" onClick={(e) => scrollToSection(e, 'services')}>Surety Bonds</a></li>
                </ul>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="footer-links">
                <h5>Contact Info</h5>
                <ul>
                  <li><i className="fas fa-map-marker-alt gold-text me-2"></i>288 E Main St, Newark, DE 19711</li>
                  <li><i className="fas fa-phone gold-text me-2"></i><a href="tel:7024478550">(702) 447-8550</a></li>
                  <li><i className="fab fa-whatsapp gold-text me-2"></i><a href="https://wa.me/17024478550" target="_blank" rel="noopener noreferrer">WhatsApp Available</a></li>
                  <li><i className="fas fa-envelope gold-text me-2"></i><a href="mailto:away2freedom302@gmail.com">Email Us</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Simone Harris Bail Bonds. All Rights Reserved. | Serving Newark, Delaware &amp; Surrounding Areas</p>
            <p className="small mt-2">
              <a href="#" className="text-muted">Privacy Policy</a> | <a href="#" className="text-muted">Terms of Service</a>
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Buttons */}
      <div className="floating-buttons">
        <a href="https://wa.me/17024478550" className="float-btn float-btn-whatsapp" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
          <i className="fab fa-whatsapp"></i>
        </a>
        <a href="tel:7024478550" className="float-btn float-btn-call" aria-label="Call Now">
          <i className="fas fa-phone-alt"></i>
        </a>
      </div>

      {/* Vertical Social Media */}
      <div className="vertical-social">
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <i className="fab fa-linkedin-in"></i>
        </a>
      </div>

      {/* Scroll to Top Button */}
      <button 
        className={`scroll-top ${scrollTopVisible ? 'visible' : ''}`} 
        id="scrollTop" 
        aria-label="Scroll to top"
        onClick={scrollToTop}
      >
        <i className="fas fa-chevron-up"></i>
      </button>

      {/* Bootstrap 5 JS */}
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    </>
  );
}
