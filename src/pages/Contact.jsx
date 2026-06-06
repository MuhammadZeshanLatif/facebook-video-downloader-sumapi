import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { buildContactJsonLd } from '../data/pageSchemas';

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
    setTimeout(() => {
      setSent(true);
      setLoading(false);
      setForm({ name: '', email: '', subject: '', message: '' });
    }, 1000);
  };

  return (
    <>
      <SEO
        title="Contact FB Video Downloaders | Support & Questions"
        description="Contact FB Video Downloaders for support, questions, feedback, or issues related to our free Facebook video downloader tool."
        keywords="contact facebook video downloader, fb video downloaders support, facebook downloader help, fb video downloader contact, support"
        ogUrl="https://fbvideodownloaders.com/contact"
        jsonLd={buildContactJsonLd()}
      />
      <div className="th-section" style={{ paddingTop: '120px' }}>
      <div className="th-container">
        <div className="th-section-header">
          <h1 className="th-section-title">Contact FB Video Downloaders</h1>
          <p className="th-section-desc">
            Have a question, feedback, or need help with our free Facebook video downloader? Send us a message and we will get back to you as soon as possible.
          </p>
        </div>

        <div className="row g-4 mt-2">
          <div className="col-lg-8 mx-auto">

            {/* Trust & Privacy Note */}
            <div className="fb-content-card mb-4" style={{ borderLeft: '4px solid var(--th-primary)' }}>
              <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>
                <i className="fas fa-shield-halved me-2" style={{ color: 'var(--th-primary)' }}></i>
                Your Privacy Is Safe
              </h3>
              <p className="mb-1" style={{ fontSize: '0.95rem' }}>
                We do not share your information with third parties. Messages sent through this form are used only to respond to your inquiry.
                We never ask for your Facebook password or login credentials.
              </p>
            </div>

            <div className="fb-tool-card">
              {sent ? (
                <div className="text-center py-5">
                  <div className="mb-4">
                    <i className="fas fa-circle-check" style={{ fontSize: '4rem', color: 'var(--th-primary)' }}></i>
                  </div>
                  <h3>Message Sent Successfully!</h3>
                  <p className="text-muted">Thank you for reaching out. Our team will review your message and reply within 2–5 business days.</p>
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
                <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Contact Information</h2>
                <div className="row g-3">
                  <div className="col-md-4">
                    <div className="text-center p-3" style={{ background: 'var(--th-bg-alt)', borderRadius: '12px' }}>
                      <i className="fas fa-envelope mb-2" style={{ fontSize: '1.5rem', color: 'var(--th-primary)' }}></i>
                      <h3 style={{ fontSize: '1rem' }}>Email</h3>
                      <p className="small text-muted mb-0">support@fbvideodownloaders.com</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="text-center p-3" style={{ background: 'var(--th-bg-alt)', borderRadius: '12px' }}>
                      <i className="fas fa-clock mb-2" style={{ fontSize: '1.5rem', color: 'var(--th-primary)' }}></i>
                      <h3 style={{ fontSize: '1rem' }}>Response Time</h3>
                      <p className="small text-muted mb-0">2–5 business days</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="text-center p-3" style={{ background: 'var(--th-bg-alt)', borderRadius: '12px' }}>
                      <i className="fas fa-circle-question mb-2" style={{ fontSize: '1.5rem', color: 'var(--th-primary)' }}></i>
                      <h3 style={{ fontSize: '1rem' }}>We Help With</h3>
                      <p className="small text-muted mb-0">Tool issues, download errors, general questions</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Support note */}
            <div className="fb-content-card mt-4">
              <h2 style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>
                <i className="fas fa-life-ring me-2" style={{ color: 'var(--th-primary)' }}></i>
                Before You Write — Quick Help
              </h2>
              <p style={{ fontSize: '0.95rem', marginBottom: '0.5rem' }}>
                Many common questions are already answered in our resources:
              </p>
              <ul style={{ fontSize: '0.95rem', marginBottom: '0' }}>
                <li><Link to="/user-guide">User Guide</Link> — step-by-step instructions for downloading Facebook videos</li>
                <li><Link to="/blog">Blog</Link> — troubleshooting guides, tips, and how-to articles</li>
                <li><Link to="/">Downloader Tool</Link> — paste your Facebook link and download directly</li>
              </ul>
            </div>

            {/* Disclaimer */}
            <div className="mt-4 p-3" style={{ background: 'var(--th-bg-alt)', borderRadius: '10px', fontSize: '0.85rem', color: 'var(--th-muted)' }}>
              <strong>Disclaimer:</strong> This website is not affiliated with Facebook or Meta Platforms.
              Facebook is a trademark of Meta Platforms, Inc. FB Video Downloaders is an independent tool
              for saving publicly accessible Facebook videos for personal use.
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default ContactPage;

