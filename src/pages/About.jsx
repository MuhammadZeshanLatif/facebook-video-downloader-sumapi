import React from 'react';
import SEO from '../components/SEO';
import { buildAboutJsonLd } from '../data/pageSchemas';

function About() {
  return (
    <>
      <SEO
        title="About FB Video Downloaders - Free Facebook Video Downloader"
        description="Learn about FB Video Downloaders, our editorial goals, and how we provide educational guides for downloading publicly available Facebook videos responsibly."
        keywords="about facebook video downloader, fb video downloaders, free facebook downloader, about us, facebook video tool, fb video saver"
        ogUrl="https://fbvideodownloaders.com/about"
        jsonLd={buildAboutJsonLd()}
      />
      <div className="th-section" style={{ paddingTop: '120px' }}>
      <div className="th-container">
        <div className="th-section-header">
          <h1 className="th-section-title">About FB Video Downloaders</h1>
          <p className="th-section-desc">
            We publish practical guides and tool information for saving publicly accessible Facebook videos and Reels.
          </p>
        </div>

        <div className="row g-4 mt-4">
          <div className="col-lg-8 mx-auto">
            <div className="fb-tool-card">
              <h2>Who We Are</h2>
              <p>
                FB Video Downloaders is an independent website that provides educational content and a browser-based interface for
                publicly available Facebook video links. Our focus is clarity, safety, and compliance.
              </p>

              <h3 className="mt-4">What We Publish</h3>
              <p>
                We publish:
              </p>
              <ul>
                <li>Step-by-step user guides</li>
                <li>Troubleshooting articles for common video-link issues</li>
                <li>Educational posts about privacy, copyright, and safe usage</li>
                <li>Best practices for content quality and responsible reuse</li>
              </ul>

              <h3 className="mt-4">Our Mission</h3>
              <p>
                Our mission is to make social video guidance easier to understand for everyday users. We aim to provide
                useful, original, and regularly maintained content.
              </p>

              <h3 className="mt-4">Editorial Standards</h3>
              <ul>
                <li>We prioritize practical and easy-to-follow information</li>
                <li>We update outdated details when platform behavior changes</li>
                <li>We avoid misleading claims and unsupported guarantees</li>
                <li>We encourage lawful and rights-respecting use</li>
              </ul>

              <h3 className="mt-4">Independence and Trademark Notice</h3>
              <p>
                FB Video Downloaders is not affiliated with, endorsed by, or sponsored by Facebook or Meta. Any third-party brand
                names are used only for descriptive and informational purposes.
              </p>

              <h3 className="mt-4">Compliance Commitment</h3>
              <p>
                We support legal, ethical, and policy-compliant use. Users are responsible for ensuring they have
                permission to download or reuse content and for following applicable laws and platform terms.
              </p>

              <h3 className="mt-4">Contact Us</h3>
              <p>
                If you have questions, corrections, or policy concerns, please use our <a href="/contact">contact page</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default About;

