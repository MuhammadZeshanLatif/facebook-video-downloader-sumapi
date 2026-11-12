import React from 'react';
import SEO from '../components/SEO';
import { buildTermsJsonLd } from '../data/pageSchemas';

function TermsConditions() {
  const effectiveDate = 'April 27, 2026';

  return (
    <>
      <SEO
        title="Terms of Service - FB Video Downloaders"
        description="Read the terms of service for FB Video Downloaders. Understand the rules for using our free tool to download public Facebook videos and Reels responsibly."
        keywords="facebook video downloader terms of service, fb video downloaders terms, terms and conditions, usage policy, facebook downloader legal"
        ogUrl="https://fbvideodownloaders.com/terms-conditions"
        jsonLd={buildTermsJsonLd()}
      />
      <div className="th-section" style={{ paddingTop: '120px' }}>
      <div className="th-container">
        <div className="th-section-header">
          <h1 className="th-section-title">Terms and Conditions</h1>
          <p className="th-section-desc">
            Effective Date: {effectiveDate}
          </p>
        </div>

        <div className="row g-4 mt-4">
          <div className="col-lg-10 mx-auto">
            <div className="fb-tool-card">
              <h2>1. Acceptance of Terms</h2>
              <p>
                By accessing or using FB Video Downloaders, you agree to these Terms and all applicable laws. If you do not
                agree, do not use this website.
              </p>

              <h3 className="mt-4">2. Service Description</h3>
              <p>
                FB Video Downloaders is an informational, browser-based tool for publicly accessible social video links. We are
                not affiliated with Facebook or Meta.
              </p>

              <h3 className="mt-4">3. Acceptable Use</h3>
              <p>You agree to use this website lawfully and responsibly. You must not:</p>
              <ul>
                <li>Use this site to violate copyright, privacy, or other rights</li>
                <li>Attempt to access private, restricted, or unauthorized content</li>
                <li>Bypass security, scrape aggressively, or disrupt the service</li>
                <li>Upload malware, abusive content, or malicious code</li>
                <li>Use automated abuse methods that harm site performance</li>
              </ul>

              <h4 className="mt-3">3.1 Third-Party Platform Rules</h4>
              <p>
                You are responsible for complying with the terms and policies of any third-party platform related to
                links you submit.
              </p>

              <h3 className="mt-4">4. Intellectual Property</h3>
              <p>
                All trademarks, logos, and third-party content remain the property of their respective owners. You are
                responsible for ensuring you have rights or permission before reusing any content.
              </p>

              <h3 className="mt-4">5. Service Availability</h3>
              <p>
                We may modify, suspend, or discontinue any part of the site at any time. We do not guarantee
                uninterrupted availability.
              </p>

              <h3 className="mt-4">6. Disclaimer of Warranties</h3>
              <p>
                The website is provided on an "as is" and "as available" basis without warranties of any kind, express
                or implied.
              </p>

              <h3 className="mt-4">7. Limitation of Liability</h3>
              <p>
                To the maximum extent permitted by law, FB Video Downloaders is not liable for indirect, incidental, special, or
                consequential damages related to use of this site.
              </p>

              <h3 className="mt-4">8. Content and Copyright Complaints</h3>
              <p>
                If you believe content linked or referenced through this site infringes your rights, contact us with
                sufficient details. We review valid complaints and take reasonable action.
              </p>

              <h3 className="mt-4">9. Prohibited Content</h3>
              <p>You may not use this website for content that:</p>
              <ul>
                <li>Is unlawful, harmful, or violates regulations</li>
                <li>Infringes copyrights, trademarks, or privacy rights</li>
                <li>Includes malware, hate content, or explicit illegal material</li>
              </ul>

              <h3 className="mt-4">10. Termination</h3>
              <p>
                We may restrict or terminate access if we detect abuse, legal violations, or breaches of these Terms.
              </p>

              <h3 className="mt-4">11. Changes to Terms</h3>
              <p>
                We may update these Terms from time to time. Continued use after updates means you accept the revised
                Terms.
              </p>

              <h3 className="mt-4">12. Governing Law</h3>
              <p>
                These Terms are governed by applicable laws of the jurisdiction in which the site operator is based.
              </p>

              <h3 className="mt-4">13. Contact Information</h3>
              <p>
                For legal or policy questions, contact us through the <a href="/contact">contact page</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default TermsConditions;

