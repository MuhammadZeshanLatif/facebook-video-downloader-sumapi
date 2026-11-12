import React from 'react';
import SEO from '../components/SEO';
import { buildDisclaimerJsonLd } from '../data/pageSchemas';

function Disclaimer() {
  const effectiveDate = 'April 27, 2026';

  return (
    <>
      <SEO
        title="Disclaimer - FB Video Downloaders"
        description="Read the FB Video Downloaders disclaimer, including third-party trademark notice, content responsibility, and limitation of liability."
        keywords="fb video downloaders disclaimer, legal disclaimer, trademark notice, limitation of liability"
        ogUrl="https://fbvideodownloaders.com/disclaimer"
        jsonLd={buildDisclaimerJsonLd()}
      />
      <div className="th-section" style={{ paddingTop: '120px' }}>
        <div className="th-container">
          <div className="th-section-header">
            <h1 className="th-section-title">Disclaimer</h1>
            <p className="th-section-desc">Effective Date: {effectiveDate}</p>
          </div>

          <div className="row g-4 mt-4">
            <div className="col-lg-10 mx-auto">
              <div className="fb-tool-card">
                <h2>1. General Information</h2>
                <p>
                  The content on FB Video Downloaders is provided for general informational purposes only. While we try to keep
                  information accurate and up to date, we make no warranties about completeness, reliability, or
                  accuracy.
                </p>

                <h3 className="mt-4">2. No Affiliation</h3>
                <p>
                  FB Video Downloaders is an independent website and is not affiliated with, endorsed by, or sponsored by
                  Facebook or Meta. All third-party names, logos, and trademarks are property of their respective
                  owners.
                </p>

                <h3 className="mt-4">3. User Responsibility</h3>
                <p>
                  You are solely responsible for how you use this website. You must ensure that your actions comply
                  with applicable laws, platform rules, and copyright requirements.
                </p>

                <h3 className="mt-4">4. Copyright and Fair Use</h3>
                <p>
                  We do not grant rights to third-party content. Users should only download or reuse content when they
                  have permission or legal authorization to do so.
                </p>

                <h3 className="mt-4">5. External Links</h3>
                <p>
                  This site may contain links to external websites. We do not control and are not responsible for the
                  content, policies, or practices of any third-party websites.
                </p>

                <h3 className="mt-4">6. Limitation of Liability</h3>
                <p>
                  To the fullest extent permitted by law, FB Video Downloaders will not be liable for any losses or damages
                  arising from use of this website, including direct or indirect damages.
                </p>

                <h3 className="mt-4">7. Updates</h3>
                <p>
                  We may update this Disclaimer at any time. Changes become effective when posted on this page with an
                  updated effective date.
                </p>

                <h3 className="mt-4">8. Contact</h3>
                <p>
                  For legal concerns or clarification about this Disclaimer, please use our <a href="/contact">contact
                  page</a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Disclaimer;
