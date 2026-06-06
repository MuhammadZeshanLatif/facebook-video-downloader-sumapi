import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { buildUserGuideJsonLd } from '../data/pageSchemas';

function UserGuide() {
  const steps = [
    {
      icon: 'fas fa-copy',
      num: '01',
      title: 'Copy the Facebook Video Link',
      desc: 'Open the public Facebook video or Reel in your browser. Copy the URL from the address bar, or tap Share → Copy Link inside the Facebook app.',
    },
    {
      icon: 'fas fa-paste',
      num: '02',
      title: 'Paste the Link into the Downloader',
      desc: 'Go to the FB Video Downloaders homepage and paste the link into the input box. Make sure the full URL is pasted correctly.',
    },
    {
      icon: 'fas fa-magnifying-glass',
      num: '03',
      title: 'Click the Download Button',
      desc: 'Click "Analyze Link" or "Download Video". The tool will process the link and fetch the available video options from Facebook.',
    },
    {
      icon: 'fas fa-sliders',
      num: '04',
      title: 'Choose Video Quality',
      desc: 'Select HD for higher quality or SD for a smaller file size. HD is recommended for larger screens, SD is ideal for saving storage.',
    },
    {
      icon: 'fas fa-download',
      num: '05',
      title: 'Save the Video to Your Device',
      desc: 'Click the download button for your chosen quality. The video will be saved directly to your device\'s downloads folder.',
    },
  ];

  const faqs = [
    {
      q: 'How do I download a Facebook video online?',
      a: 'Copy the public Facebook video link, paste it into the downloader box on our homepage, click the download button, choose your quality, and save the video.',
    },
    {
      q: 'Can I download Facebook videos without an app?',
      a: 'Yes. FB Video Downloaders is a browser-based tool — nothing to install. Just visit the site, paste your link, and download.',
    },
    {
      q: 'Can I save Facebook Reels on my phone?',
      a: 'Yes. Open the Reel link in your mobile browser, copy the URL, paste it into the downloader, and download it directly to your phone.',
    },
    {
      q: 'Why is my Facebook video not downloading?',
      a: 'This usually happens when the video is set to private or friends-only, the link is incomplete, or the video was opened inside the Facebook app instead of a browser. Try copying the URL from a browser instead.',
    },
    {
      q: 'What is the difference between HD and SD download?',
      a: 'HD gives better video quality and is ideal for viewing on larger screens. SD produces a smaller file size that downloads faster and uses less storage.',
    },
    {
      q: 'Does this work on iPhone and Android?',
      a: 'Yes. FB Video Downloaders works on both Android and iPhone using any modern mobile browser including Chrome, Safari, Firefox, and Edge.',
    },
    {
      q: 'Is it safe to use a Facebook video downloader?',
      a: 'Yes, as long as you use a trusted tool. FB Video Downloaders does not ask for your Facebook login, password, or personal information.',
    },
    {
      q: 'What links are supported?',
      a: 'This tool works with publicly accessible Facebook video and Reel links. Private or restricted videos cannot be downloaded.',
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
        title="How to Use Facebook Video Downloader | Step-by-Step Guide"
        description="Learn how to use FB Video Downloaders to save Facebook videos online with a simple step-by-step guide for mobile and desktop users."
        keywords="how to download facebook videos, fb video downloader guide, download facebook reels step by step, save facebook video without app, facebook video downloader tutorial, download fb video mobile"
        ogUrl="https://fbvideodownloaders.com/user-guide"
        jsonLd={buildUserGuideJsonLd()}
      />

      {/* Hero */}
      <div className="th-section" style={{ paddingTop: '120px', paddingBottom: '2rem' }}>
        <div className="th-container">
          <div className="th-section-header">
            <h1 className="th-section-title">How to Use <span className="th-gradient-text">FB Video Downloaders</span></h1>
            <p className="th-section-desc">
              This step-by-step guide explains how to download public Facebook videos and Reels using a browser.
              No app installation and no Facebook login required. Works on Android, iPhone, and desktop.
            </p>
          </div>

          <div className="fb-youtube-embed">
            <h2 className="th-section-title" style={{ fontSize: 'clamp(1.25rem, 3vw, 1.65rem)', marginBottom: '1rem', textAlign: 'center' }}>
              Video Tutorial: <span className="th-gradient-text">Step-by-Step Walkthrough</span>
            </h2>
            <div className="fb-youtube-embed-inner">
              <iframe
                src="https://www.youtube.com/embed/MrANb2fytwU"
                title="How to download Facebook videos — FB Video Downloaders guide"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
            <p className="fb-youtube-embed-caption">
              Prefer watching? Follow the same steps in the video, then use the written guide below for reference on any device.
            </p>
          </div>

          {/* Steps */}
          <div className="th-section-header mt-4">
            <h2 className="th-section-title" style={{ fontSize: 'clamp(1.3rem, 3vw, 1.8rem)' }}>
              5-Step Download Guide
            </h2>
          </div>
          <div className="th-steps-grid">
            {steps.map((step, index) => (
              <div key={index} className="th-step-card">
                <div className="th-step-num">{step.num}</div>
                <div className="th-step-icon-wrap">
                  <i className={step.icon}></i>
                </div>
                <h3 className="th-step-title">{step.title}</h3>
                <p className="th-step-desc">{step.desc}</p>
                {index < steps.length - 1 && (
                  <div className="th-step-arrow">
                    <i className="fas fa-chevron-right"></i>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Platform-specific guides */}
          <div className="fb-guide-content mt-5">
            <div className="th-section-header">
              <h2 className="th-section-title" style={{ fontSize: 'clamp(1.3rem, 3vw, 1.8rem)' }}>
                Download by Device Type
              </h2>
            </div>
            <div className="row g-4">
              <div className="col-lg-4">
                <div className="fb-content-card">
                  <h3><i className="fab fa-android me-2" style={{ color: '#3ddc84' }}></i>How to Use on Android</h3>
                  <ol style={{ paddingLeft: '1.2rem', marginBottom: 0 }}>
                    <li>Open Facebook in your Android browser (Chrome recommended)</li>
                    <li>Find the public video or Reel you want to save</li>
                    <li>Copy the URL from the browser address bar</li>
                    <li>Open <Link to="/">FB Video Downloaders</Link> in a new tab</li>
                    <li>Paste the link and tap Download</li>
                    <li>The video saves to your Downloads folder</li>
                  </ol>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="fb-content-card">
                  <h3><i className="fab fa-apple me-2" style={{ color: '#555' }}></i>How to Use on iPhone</h3>
                  <ol style={{ paddingLeft: '1.2rem', marginBottom: 0 }}>
                    <li>Open Facebook in Safari or Chrome on your iPhone</li>
                    <li>Navigate to the public video or Reel</li>
                    <li>Tap the Share icon, then Copy Link</li>
                    <li>Open <Link to="/">FB Video Downloaders</Link> in your browser</li>
                    <li>Paste the link and tap Download</li>
                    <li>Use the share icon to save to Files or Camera Roll</li>
                  </ol>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="fb-content-card">
                  <h3><i className="fas fa-laptop me-2" style={{ color: 'var(--th-primary)' }}></i>How to Use on Desktop</h3>
                  <ol style={{ paddingLeft: '1.2rem', marginBottom: 0 }}>
                    <li>Open Facebook in your desktop browser</li>
                    <li>Click on the public video to open its dedicated page</li>
                    <li>Copy the full URL from the address bar</li>
                    <li>Visit <Link to="/">fbvideodownloaders.com</Link></li>
                    <li>Paste the link and click Analyze Link</li>
                    <li>Choose HD or SD and click Download</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          {/* Tips & Common Issues */}
          <div className="fb-guide-content mt-4">
            <div className="row g-4">
              <div className="col-lg-6">
                <div className="fb-content-card">
                  <h3><i className="fas fa-lightbulb me-2" style={{ color: 'var(--th-primary)' }}></i>Tips for Better Results</h3>
                  <ul className="fb-bullet-list">
                    <li>Always copy the full public Facebook link — not a shortened or app-generated URL</li>
                    <li>Open videos in a browser (not the Facebook app) to get the correct URL format</li>
                    <li>Use an updated browser like Chrome, Safari, Edge, or Firefox</li>
                    <li>Choose HD only when available — not all videos offer HD quality</li>
                    <li>Use SD for faster downloads when storage is limited</li>
                    <li>If the link fails, try refreshing the Facebook page and copying the URL again</li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="fb-content-card">
                  <h3><i className="fas fa-wrench me-2" style={{ color: 'var(--th-primary)' }}></i>Common Issues and Fixes</h3>
                  <ul className="fb-bullet-list">
                    <li><strong>Video not found:</strong> The video may be private or restricted — only public videos can be downloaded</li>
                    <li><strong>Invalid URL error:</strong> Make sure you paste the complete URL, including https://</li>
                    <li><strong>Download not starting:</strong> Try a different browser or disable browser ad blockers</li>
                    <li><strong>Low quality only:</strong> Some Facebook videos are only uploaded in SD — HD is not always available</li>
                    <li><strong>Reel not downloading:</strong> Open the Reel in a browser instead of the Facebook app and copy that URL</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Safety & Supported Types */}
          <div className="row g-4 mt-2">
            <div className="col-lg-6">
              <div className="fb-content-card">
                <h3><i className="fas fa-shield-halved me-2" style={{ color: 'var(--th-primary)' }}></i>Safety Notes</h3>
                <ul className="fb-check-list">
                  <li><i className="fas fa-check-circle"></i>We never ask for your Facebook login or password</li>
                  <li><i className="fas fa-check-circle"></i>We do not store videos on our servers</li>
                  <li><i className="fas fa-check-circle"></i>Only download videos you have permission to save</li>
                  <li><i className="fas fa-check-circle"></i>Use this tool for personal and educational purposes only</li>
                  <li><i className="fas fa-check-circle"></i>Respect copyright and Facebook's Terms of Service</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="fb-content-card">
                <h3><i className="fas fa-check-circle me-2" style={{ color: 'var(--th-primary)' }}></i>Supported Content Types</h3>
                <ul className="fb-check-list">
                  <li><i className="fas fa-check-circle"></i>Facebook timeline videos (public posts)</li>
                  <li><i className="fas fa-check-circle"></i>Facebook page videos and clips</li>
                  <li><i className="fas fa-check-circle"></i>Facebook Reels</li>
                  <li><i className="fas fa-check-circle"></i>Videos shared in public Facebook groups</li>
                  <li><i className="fas fa-check-circle"></i>Downloads on Android, iPhone, tablet, and desktop</li>
                </ul>
              </div>
            </div>
          </div>

          {/* CTA to tool */}
          <div className="mt-5 text-center">
            <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Ready to download? Use the tool directly from our homepage:</p>
            <Link to="/" className="th-btn th-btn-primary">
              <i className="fas fa-download me-2"></i>Open Facebook Video Downloader
            </Link>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <section className="th-section th-section-alt">
        <div className="th-container">
          <div className="th-section-header">
            <h2 className="th-section-title">Frequently Asked <span className="th-gradient-text">Questions</span></h2>
            <p className="th-section-desc">
              Common questions about downloading Facebook videos answered simply and clearly.
            </p>
          </div>

          <div className="accordion fb-accordion" id="ugFaqAccordion">
            {faqs.map((faq, index) => (
              <div className="accordion-item" key={index}>
                <h3 className="accordion-header" id={`ug-heading-${index}`}>
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
                </h3>
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

          <div className="mt-4 text-center">
            <p>Still have questions? Read more in our <Link to="/blog">blog</Link> or <Link to="/contact">contact us</Link>.</p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="th-section">
        <div className="th-container">
          <div className="th-section-header">
            <h2 className="th-section-title">Need More Help?</h2>
            <p className="th-section-desc">
              Contact us with questions about Facebook video links, mobile use, download quality, or any other issues.
            </p>
          </div>

          <div className="th-contact-grid">
            <div className="th-contact-info">
              <div className="th-contact-info-card">
                <div className="th-contact-icon th-icon-blue"><i className="fas fa-link"></i></div>
                <div>
                  <h3 className="th-contact-info-title">Facebook Link Help</h3>
                  <p className="th-contact-info-line">Need help copying the correct Facebook video or Reel URL to use with the downloader?</p>
                </div>
              </div>
              <div className="th-contact-info-card">
                <div className="th-contact-icon th-icon-green"><i className="fas fa-mobile-screen-button"></i></div>
                <div>
                  <h3 className="th-contact-info-title">Mobile Experience</h3>
                  <p className="th-contact-info-line">Questions about downloading Facebook videos on Android phones, iPhones, or tablets.</p>
                </div>
              </div>
              <div className="th-contact-info-card">
                <div className="th-contact-icon th-icon-purple"><i className="fas fa-sliders"></i></div>
                <div>
                  <h3 className="th-contact-info-title">Quality Guidance</h3>
                  <p className="th-contact-info-line">Understand when HD or SD download options are available depending on the original video quality.</p>
                </div>
              </div>
              <div className="th-contact-info-card">
                <div className="th-contact-icon th-icon-orange"><i className="fas fa-user-shield"></i></div>
                <div>
                  <h3 className="th-contact-info-title">Safe Usage Info</h3>
                  <p className="th-contact-info-line">Guidance around copyright, permissions, privacy, and responsible use of publicly accessible Facebook content.</p>
                </div>
              </div>
            </div>

            <div className="th-contact-form-wrap">
              <div className="th-contact-form">
                <h3>Send a Support Message</h3>
                <p className="th-contact-form-sub">Have a question? Fill in the form and we will get back to you within 2–5 business days.</p>
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

          {/* Disclaimer */}
          <div className="mt-5 p-3" style={{ background: 'var(--th-bg-alt)', borderRadius: '10px', fontSize: '0.85rem', color: 'var(--th-muted)', textAlign: 'center' }}>
            This website is not affiliated with Facebook or Meta Platforms, Inc. Facebook is a trademark of Meta Platforms, Inc.
            Use this tool responsibly and only download videos you have permission to save.
          </div>
        </div>
      </section>
    </>
  );
}

export default UserGuide;
