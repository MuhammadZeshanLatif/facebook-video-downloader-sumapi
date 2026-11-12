import React from 'react';
import SEO from '../components/SEO';
import { buildPrivacyJsonLd } from '../data/pageSchemas';

function PrivacyPolicy() {
  const effectiveDate = 'April 27, 2026';

  return (
    <>
      <SEO
        title="Privacy Policy - FB Video Downloaders"
        description="Read FB Video Downloaders' privacy policy. We do not store your videos or require your Facebook login. Your privacy is our priority."
        keywords="facebook video downloader privacy policy, fb video downloaders privacy, data protection, no login required, facebook downloader safe"
        ogUrl="https://fbvideodownloaders.com/privacy-policy"
        jsonLd={buildPrivacyJsonLd()}
      />
      <div className="th-section" style={{ paddingTop: '120px' }}>
      <div className="th-container">
        <div className="th-section-header">
          <h1 className="th-section-title">Privacy Policy</h1>
          <p className="th-section-desc">
            Effective Date: {effectiveDate}
          </p>
        </div>

        <div className="row g-4 mt-4">
          <div className="col-lg-10 mx-auto">
            <div className="fb-tool-card">
              <h2>1. Overview</h2>
              <p>
                This Privacy Policy explains how FB Video Downloaders collects, uses, and protects information when you visit
                fbvideodownloaders.com. By using this website, you agree to this policy.
              </p>

              <h3 className="mt-4">2. Information We Collect</h3>
              <h4>2.1 Information You Submit</h4>
              <ul>
                <li>Video links you paste into the tool for processing</li>
                <li>Name, email, and message details if you contact us</li>
                <li>Support requests or feedback you voluntarily provide</li>
              </ul>

              <h4 className="mt-3">2.2 Information Collected Automatically</h4>
              <ul>
                <li>IP address, browser type, operating system, and device type</li>
                <li>Visited pages, session duration, and basic usage events</li>
                <li>Referrer/entry pages and approximate region-level location</li>
                <li>Cookie and similar identifiers</li>
              </ul>

              <h3 className="mt-4">3. How We Use Information</h3>
              <ul>
                <li>Provide and maintain website functionality</li>
                <li>Process the links you submit and return available download options</li>
                <li>Improve performance, user experience, and content quality</li>
                <li>Respond to support requests and site feedback</li>
                <li>Prevent abuse, fraud, spam, and security issues</li>
                <li>Comply with legal obligations</li>
              </ul>

              <h3 className="mt-4">4. Cookies and Advertising</h3>
              <p>
                We use cookies for essential functionality, analytics, and ad delivery. Third-party vendors, including
                Google, may use cookies to serve ads based on your prior visits to this and other websites. You can
                manage cookie preferences through your browser settings and Google ad settings.
              </p>

              <h3 className="mt-4">5. Third-Party Services</h3>
              <p>
                We may use trusted third-party services such as analytics, hosting, and advertising providers. These
                providers may process data under their own privacy policies and legal requirements.
              </p>

              <h3 className="mt-4">6. Data Retention</h3>
              <p>
                We keep personal data only as long as needed for operational, legal, or support purposes. Link
                processing is designed to be temporary and we do not claim ownership of user-requested media.
              </p>

              <h3 className="mt-4">7. Data Security</h3>
              <p>
                We apply reasonable technical and organizational safeguards to protect information. No online service
                can guarantee absolute security, but we continuously work to reduce risk.
              </p>

              <h3 className="mt-4">8. Your Privacy Rights</h3>
              <p>Depending on your location, you may have rights to:</p>
              <ul>
                <li>Access, update, or request deletion of your personal data</li>
                <li>Request restrictions on certain processing</li>
                <li>Object to certain processing activities</li>
                <li>Withdraw consent where processing is consent-based</li>
              </ul>

              <h3 className="mt-4">9. Children's Privacy</h3>
              <p>
                This website is not intended for children under 13. We do not knowingly collect personal data from
                children. If you believe a child has submitted data, contact us and we will review and remove it when
                appropriate.
              </p>

              <h3 className="mt-4">10. Changes to This Privacy Policy</h3>
              <p>
                We may update this Privacy Policy from time to time. Any updates will be posted on this page with a
                revised effective date.
              </p>

              <h3 className="mt-4">11. Contact Us</h3>
              <p>
                For privacy questions or requests, visit our <a href="/contact">contact page</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default PrivacyPolicy;

