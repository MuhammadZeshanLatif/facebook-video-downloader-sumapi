import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { buildAboutJsonLd } from '../data/pageSchemas';

function About() {
  return (
    <>
      <SEO
        title="About FB Video Downloaders | Free Facebook Video Download Tool"
        description="Learn about FB Video Downloaders, a free online tool that helps users save publicly available Facebook videos easily and safely."
        keywords="about facebook video downloader, fb video downloaders, free facebook downloader, about us, facebook video tool, fb video saver"
        ogUrl="https://fbvideodownloaders.com/about"
        jsonLd={buildAboutJsonLd()}
      />
      <div className="th-section" style={{ paddingTop: '120px' }}>
      <div className="th-container">
        <div className="th-section-header">
          <h1 className="th-section-title">About FB Video Downloaders</h1>
          <p className="th-section-desc">
            FB Video Downloaders is a free online tool that helps you save publicly available Facebook videos and Reels directly in your browser — no app needed, no login required.
          </p>
        </div>

        <div className="row g-4 mt-2">
          <div className="col-lg-8 mx-auto">

            {/* Key features at a glance */}
            <div className="row g-3 mb-4">
              {[
                { icon: 'fa-lock-open', title: 'No Login Required', desc: 'You do not need a Facebook account or any login to use this tool.' },
                { icon: 'fa-mobile-screen-button', title: 'No App to Install', desc: 'Everything runs in your browser on any device — nothing to download.' },
                { icon: 'fa-user-shield', title: 'We Do Not Store Videos', desc: 'Videos go directly to your device. We never save copies on our servers.' },
                { icon: 'fa-globe', title: 'Works Everywhere', desc: 'Android, iPhone, tablet, and desktop — any modern browser works.' },
              ].map((item) => (
                <div key={item.title} className="col-sm-6">
                  <div className="text-center p-3" style={{ background: 'var(--th-bg-alt)', borderRadius: '12px', height: '100%' }}>
                    <i className={`fas ${item.icon} mb-2`} style={{ fontSize: '1.5rem', color: 'var(--th-primary)' }}></i>
                    <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.4rem' }}>{item.title}</h3>
                    <p className="small text-muted mb-0">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="fb-tool-card">
              <h2>What Is FB Video Downloaders?</h2>
              <p>
                FB Video Downloaders is a free, browser-based tool for saving publicly available Facebook videos and Reels.
                Paste a public Facebook video link, choose your preferred quality (HD or SD), and download the video directly to your device.
                No account, no subscription, and no software installation is needed.
              </p>

              <h2 className="mt-4">Who Can Use It?</h2>
              <p>
                Anyone can use FB Video Downloaders. It is designed for everyday users who want to save a Facebook video for
                personal offline viewing — whether on mobile, tablet, or desktop. The tool works in any modern browser including
                Chrome, Safari, Firefox, and Edge.
              </p>

              <h2 className="mt-4">Why This Website Exists</h2>
              <p>
                Saving a public Facebook video is not straightforward without third-party tools. FB Video Downloaders was created
                to give users a simple, safe, and free option to do this — without ads, paywalls, or confusing steps.
              </p>

              <h2 className="mt-4">Privacy and Safety</h2>
              <ul>
                <li>We do not require a Facebook login or password</li>
                <li>We do not store or keep copies of videos you download</li>
                <li>Video files go directly from Facebook's servers to your device</li>
                <li>We do not collect personal data beyond standard server logs</li>
                <li>We do not use your data for advertising</li>
              </ul>

              <h2 className="mt-4">Responsible Use</h2>
              <p>
                This tool is intended for personal and educational use only. Users should only download videos they have
                permission to save and must respect copyright, platform terms, and applicable laws.
                FB Video Downloaders does not support unauthorized redistribution of content.
              </p>

              <h2 className="mt-4">Editorial Standards</h2>
              <ul>
                <li>All guides and articles are written by our editorial team and tested on real devices</li>
                <li>We update content when Facebook or browser behavior changes</li>
                <li>We avoid misleading claims and unsupported guarantees</li>
                <li>Articles include a published date so you know how current the information is</li>
              </ul>

              <h2 className="mt-4">Independence and Trademark Notice</h2>
              <p>
                FB Video Downloaders is not affiliated with, endorsed by, or sponsored by Facebook or Meta Platforms, Inc.
                Facebook is a trademark of Meta Platforms, Inc. Any third-party brand names referenced on this site are used
                for descriptive purposes only.
              </p>

              <h2 className="mt-4">Contact Us</h2>
              <p>
                If you have questions, feedback, or concerns, please use our <Link to="/contact">contact page</Link>.
                You can also visit the <Link to="/user-guide">user guide</Link> for step-by-step instructions, or browse the <Link to="/blog">blog</Link> for tips and troubleshooting articles.
              </p>
            </div>

            {/* Disclaimer */}
            <div className="mt-4 p-3" style={{ background: 'var(--th-bg-alt)', borderRadius: '10px', fontSize: '0.85rem', color: 'var(--th-muted)' }}>
              <strong>Disclaimer:</strong> This website is not affiliated with Facebook or Meta Platforms.
              Facebook is a trademark of Meta Platforms, Inc. This tool is for saving publicly accessible Facebook videos
              for personal use only. Users are responsible for complying with applicable laws and platform terms.
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default About;

