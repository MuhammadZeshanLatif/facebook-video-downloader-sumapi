import React, { useState } from 'react';
import SEO from '../components/SEO';
import { buildUserGuideJsonLd } from '../data/pageSchemas';

function UserGuide() {
  const steps = [
    {
      icon: 'fas fa-up-right-from-square',
      num: '01',
      title: 'Open the Facebook Video',
      desc: 'Go to the Facebook video, Reel, or post you want to download. Open it in your browser and make sure it is public.',
    },
    {
      icon: 'fas fa-copy',
      num: '02',
      title: 'Copy the Video Link',
      desc: 'Copy the full link from the address bar or use the share option. A correct link helps the downloader process the video properly.',
    },
    {
      icon: 'fas fa-paste',
      num: '03',
      title: 'Paste in the Downloader',
      desc: 'Paste the link into the downloader field. The tool will load the video and show available download options.',
    },
    {
      icon: 'fas fa-download',
      num: '04',
      title: 'Choose Quality & Save',
      desc: 'Select HD for better quality or SD for a smaller file size. Then save the video to your device.',
    },
  ];

  const faqs = [
    {
      q: 'How do I download a Facebook video online?',
      a: 'Open the video, copy the link, paste it into the downloader, and choose the quality to save it.',
    },
    {
      q: 'Can I download Facebook videos without an app?',
      a: 'Yes, this FB video downloader user guide uses browser-based methods that do not require installation.',
    },
    {
      q: 'Can I save Facebook Reels on my phone?',
      a: 'Yes, if the Reel is public, you can copy the link and download it using this method.',
    },
    {
      q: 'Why is my Facebook video not downloading?',
      a: 'This usually happens if the video is private, the link is incomplete, or it was opened inside the app.',
    },
    {
      q: 'What is the difference between HD and SD download?',
      a: 'HD gives better quality, while SD saves faster and uses less storage.',
    },
    {
      q: 'Does this work on iPhone and Android?',
      a: 'Yes, this FB video downloader user guide works on both devices using a browser.',
    },
    {
      q: 'Is it safe to use a Facebook video downloader?',
      a: 'Yes, as long as you use a trusted tool that does not ask for login details.',
    },
    {
      q: 'What links are supported in this guide?',
      a: 'This guide covers publicly accessible Facebook video and Reel links only.',
    },
  ];

  const [form, setForm] = useState({ name: '', email: '', topic: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSent(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      <SEO
        title="How to Download Facebook Videos - Step-by-Step User Guide | FBSave HD"
        description="Step-by-step guide to download Facebook videos and Reels in HD for free. Works on Android, iPhone, PC, and Mac without any app or Facebook login required."
        keywords="how to download facebook videos, fb video downloader guide, download facebook reels step by step, save facebook video without app, facebook video downloader tutorial, download fb video mobile"
        ogUrl="https://fbvideodownloaders.com/user-guide"
        jsonLd={buildUserGuideJsonLd()}
      />

      {/* Hero */}
      <div className="th-section" style={{ paddingTop: '120px', paddingBottom: '2rem' }}>
        <div className="th-container">
          <div className="th-section-header">
            <h1 className="th-section-title">How to Use a <span className="th-gradient-text">FB Video Downloader</span></h1>
            <p className="th-section-desc">
              This FB video downloader user guide explains the fastest way to download Facebook videos using a browser. It works on both mobile and desktop without an app.
              Users can save public Facebook videos, Reels, and clips in just a few simple steps.
            </p>
          </div>

          <div className="fb-youtube-embed">
            <h2 className="th-section-title" style={{ fontSize: 'clamp(1.25rem, 3vw, 1.65rem)', marginBottom: '1rem', textAlign: 'center' }}>
              Video tutorial: <span className="th-gradient-text">download step by step</span>
            </h2>
            <div className="fb-youtube-embed-inner">
              <iframe
                src="https://www.youtube.com/embed/MrANb2fytwU"
                title="How to download Facebook videos — FBSave HD guide"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
            <p className="fb-youtube-embed-caption">
              Prefer watching? Follow the same steps in the video, then use the written steps below on any device.
            </p>
          </div>

          {/* Steps */}
          <div className="th-steps-grid">
            {steps.map((step, index) => (
              <div key={index} className="th-step-card">
                <div className="th-step-num">{step.num}</div>
                <div className="th-step-icon-wrap">
                  <i className={step.icon}></i>
                </div>
                <h4 className="th-step-title">{step.title}</h4>
                <p className="th-step-desc">{step.desc}</p>
                {index < steps.length - 1 && (
                  <div className="th-step-arrow">
                    <i className="fas fa-chevron-right"></i>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Tips & Search Intent Cards */}
          <div className="fb-guide-content mt-5">
            <div className="row g-4">
              <div className="col-lg-6">
                <div className="fb-content-card">
                  <h3>Facebook Downloader Tips for Better Results</h3>
                  <p>
                    This FB video downloader user guide also includes tips to help users avoid common issues.
                  </p>
                  <ul className="fb-bullet-list">
                    <li>Always copy the full public Facebook link</li>
                    <li>Avoid incomplete or shortened URLs</li>
                    <li>Open videos in a browser instead of the app</li>
                    <li>Use updated browsers like Chrome, Safari, Edge, or Firefox</li>
                    <li>Choose HD only if available</li>
                    <li>Use SD for faster downloads</li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="fb-content-card">
                  <h3>Facebook-Related Search Intent Covered Here</h3>
                  <p>
                    This FB video downloader user guide supports common user searches and helps users complete the task easily.
                  </p>
                  <ul className="fb-bullet-list">
                    <li>Facebook video downloader online</li>
                    <li>Download Facebook video on Android</li>
                    <li>Download Facebook video on iPhone</li>
                    <li>Save Facebook Reel HD</li>
                    <li>Facebook clips downloader</li>
                    <li>Copy Facebook video link</li>
                    <li>Download Facebook video without app</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Supported Content Types */}
          <div className="row g-4 mt-2">
            <div className="col-lg-12">
              <div className="fb-content-card">
                <h3>Supported Content Types</h3>
                <p>With this FB video downloader user guide, users can download:</p>
                <ul className="fb-check-list">
                  <li><i className="fas fa-check-circle"></i>Facebook timeline videos</li>
                  <li><i className="fas fa-check-circle"></i>Facebook page videos and clips</li>
                  <li><i className="fas fa-check-circle"></i>Facebook Reels</li>
                  <li><i className="fas fa-check-circle"></i>Mobile browser downloads (Android and iPhone)</li>
                  <li><i className="fas fa-check-circle"></i>Desktop browser downloads</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <section className="th-section th-section-alt">
        <div className="th-container">
          <div className="th-section-header">
            <h2 className="th-section-title">FB Video Downloader <span className="th-gradient-text">FAQs</span></h2>
            <p className="th-section-desc">
              This FB video downloader user guide answers the most common questions users have.
            </p>
          </div>

          <div className="accordion fb-accordion" id="ugFaqAccordion">
            {faqs.map((faq, index) => (
              <div className="accordion-item" key={index}>
                <h2 className="accordion-header" id={`ug-heading-${index}`}>
                  <button
                    className={`accordion-button ${index !== 0 ? 'collapsed' : ''}`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#ug-collapse-${index}`}
                    aria-expanded={index === 0 ? 'true' : 'false'}
                    aria-controls={`ug-collapse-${index}`}
                  >
                    {faq.q}
                  </button>
                </h2>
                <div
                  id={`ug-collapse-${index}`}
                  className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}
                  aria-labelledby={`ug-heading-${index}`}
                  data-bs-parent="#ugFaqAccordion"
                >
                  <div className="accordion-body">{faq.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="th-section">
        <div className="th-container">
          <div className="th-section-header">
            <h2 className="th-section-title">Contact the <span className="th-gradient-text">FBSave HD</span> Team</h2>
            <p className="th-section-desc">
              Use this section for user questions about Facebook video link format, mobile use, HD availability, page usability, and feature suggestions.
            </p>
          </div>

          <div className="th-contact-grid">
            <div className="th-contact-info">
              <div className="th-contact-info-card">
                <div className="th-contact-icon th-icon-blue"><i className="fas fa-link"></i></div>
                <div>
                  <h5 className="th-contact-info-title">Facebook Link Help</h5>
                  <p className="th-contact-info-line">Need help copying the correct Facebook video or Reel URL to use with Facebook Video Downloader?</p>
                </div>
              </div>
              <div className="th-contact-info-card">
                <div className="th-contact-icon th-icon-green"><i className="fas fa-mobile-screen-button"></i></div>
                <div>
                  <h5 className="th-contact-info-title">Mobile Experience</h5>
                  <p className="th-contact-info-line">Questions about downloading Facebook videos on Android phones, iPhones, or tablets using Facebook Video Downloader.</p>
                </div>
              </div>
              <div className="th-contact-info-card">
                <div className="th-contact-icon th-icon-purple"><i className="fas fa-sliders"></i></div>
                <div>
                  <h5 className="th-contact-info-title">Quality Guidance</h5>
                  <p className="th-contact-info-line">Understand when HD or SD download options are available depending on the original Facebook video quality.</p>
                </div>
              </div>
              <div className="th-contact-info-card">
                <div className="th-contact-icon th-icon-orange"><i className="fas fa-user-shield"></i></div>
                <div>
                  <h5 className="th-contact-info-title">Safe Usage Info</h5>
                  <p className="th-contact-info-line">Guidance around copyright, permissions, privacy, and responsible use of publicly accessible Facebook content.</p>
                </div>
              </div>
            </div>

            <div className="th-contact-form-wrap">
              <div className="th-contact-form">
                <h3>Send a Support Message</h3>
                <p className="th-contact-form-sub">Have a question? Fill in the form and we will get back to you.</p>
                {sent && (
                  <div className="th-success-msg">
                    <i className="fas fa-check-circle me-2"></i>Your message has been sent successfully.
                  </div>
                )}
                <form onSubmit={handleSubmit}>
                  <div className="th-form-row">
                    <div className="th-form-group">
                      <label htmlFor="ug-name">Name *</label>
                      <input id="ug-name" name="name" value={form.name} onChange={handleChange} placeholder="Your name" required />
                    </div>
                    <div className="th-form-group">
                      <label htmlFor="ug-email">Email *</label>
                      <input id="ug-email" type="email" name="email" value={form.email} onChange={handleChange} placeholder="name@example.com" required />
                    </div>
                  </div>
                  <div className="th-form-group">
                    <label htmlFor="ug-topic">Topic</label>
                    <input id="ug-topic" name="topic" value={form.topic} onChange={handleChange} placeholder="Facebook link issue, mobile help, Reel support..." />
                  </div>
                  <div className="th-form-group">
                    <label htmlFor="ug-message">Message *</label>
                    <textarea id="ug-message" name="message" rows="6" value={form.message} onChange={handleChange} placeholder="Write your question here..." required></textarea>
                  </div>
                  <button type="submit" className="th-btn th-btn-primary w-100">
                    <i className="fas fa-paper-plane me-2"></i>Submit Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default UserGuide;
