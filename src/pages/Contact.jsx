import React, { useState } from 'react';
import SEO from '../components/SEO';

function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate form submission
    setTimeout(() => {
      setSent(true);
      setLoading(false);
      setForm({ name: '', email: '', subject: '', message: '' });
    }, 1000);
  };

  return (
    <>
      <SEO
        title="Contact Us - Facebook Video Downloader | Get in Touch"
        description="Contact Facebook Video Downloader for support, questions, or feedback. We're here to help you with downloading Facebook videos."
        keywords="contact facebook video downloader, support, help, contact us"
        ogUrl="https://facebookvideodownloader.com/contact"
      />
      <div className="th-section" style={{ paddingTop: '120px' }}>
      <div className="th-container">
        <div className="th-section-header">
          <div className="th-badge mb-3">
            <i className="fas fa-envelope me-2"></i>Get In Touch
          </div>
          <h1 className="th-section-title">Contact Us</h1>
          <p className="th-section-desc">
            Have questions or feedback? We'd love to hear from you. Reach out to us using the form below.
          </p>
        </div>

        <div className="row g-4 mt-4">
          <div className="col-lg-8 mx-auto">
            <div className="fb-tool-card">
              {sent ? (
                <div className="text-center py-5">
                  <div className="mb-4">
                    <i className="fas fa-circle-check" style={{ fontSize: '4rem', color: 'var(--th-primary)' }}></i>
                  </div>
                  <h3>Message Sent Successfully!</h3>
                  <p className="text-muted">We'll get back to you as soon as possible.</p>
                  <button className="th-btn th-btn-primary mt-3" onClick={() => setSent(false)}>
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="name" className="form-label">Your Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="email" className="form-label">Email Address *</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="subject" className="form-label">Subject *</label>
                    <input
                      type="text"
                      className="form-control"
                      id="subject"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      required
                      placeholder="What is this regarding?"
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="message" className="form-label">Message *</label>
                    <textarea
                      className="form-control"
                      id="message"
                      name="message"
                      rows="6"
                      value={form.message}
                      onChange={handleChange}
                      required
                      placeholder="Tell us how we can help you..."
                    ></textarea>
                  </div>

                  <button type="submit" className="th-btn th-btn-primary w-100" disabled={loading}>
                    {loading ? (
                      <>
                        <i className="fas fa-spinner fa-spin me-2"></i>Sending...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-paper-plane me-2"></i>Send Message
                      </>
                    )}
                  </button>
                </form>
              )}

              <div className="mt-5 pt-4 border-top">
                <h4 className="mb-4">Other Ways to Reach Us</h4>
                <div className="row g-3">
                  <div className="col-md-4">
                    <div className="text-center p-3" style={{ background: 'var(--th-bg-alt)', borderRadius: '12px' }}>
                      <i className="fas fa-envelope mb-2" style={{ fontSize: '1.5rem', color: 'var(--th-primary)' }}></i>
                      <h6>Email</h6>
                      <p className="small text-muted mb-0">support@facebookvideodownloader.com</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="text-center p-3" style={{ background: 'var(--th-bg-alt)', borderRadius: '12px' }}>
                      <i className="fas fa-clock mb-2" style={{ fontSize: '1.5rem', color: 'var(--th-primary)' }}></i>
                      <h6>Response Time</h6>
                      <p className="small text-muted mb-0">Within 24-48 hours</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="text-center p-3" style={{ background: 'var(--th-bg-alt)', borderRadius: '12px' }}>
                      <i className="fas fa-globe mb-2" style={{ fontSize: '1.5rem', color: 'var(--th-primary)' }}></i>
                      <h6>Available</h6>
                      <p className="small text-muted mb-0">24/7 Support</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default ContactPage;

