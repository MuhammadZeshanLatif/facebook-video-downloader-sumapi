import React from 'react';
import SEO from '../components/SEO';

function TermsConditions() {
  return (
    <>
      <SEO
        title="Terms of Service - FBSave HD Facebook Video Downloader"
        description="Read the terms of service for FBSave HD. Understand the rules and guidelines for using our free tool to download public Facebook videos and Reels responsibly."
        keywords="facebook video downloader terms of service, fbsave hd terms, terms and conditions, usage policy, facebook downloader legal"
        ogUrl="https://facebookvideodownloader.com/terms-conditions"
      />
      <div className="th-section" style={{ paddingTop: '120px' }}>
      <div className="th-container">
        <div className="th-section-header">
          <div className="th-badge mb-3">
            <i className="fas fa-file-contract me-2"></i>Terms & Conditions
          </div>
          <h1 className="th-section-title">Terms and Conditions</h1>
          <p className="th-section-desc">
            Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <div className="row g-4 mt-4">
          <div className="col-lg-10 mx-auto">
            <div className="fb-tool-card">
              <h2>1. Acceptance of Terms</h2>
              <p>
                By accessing and using Facebook Video Downloader, you accept and agree to be bound by the terms and 
                provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>

              <h3 className="mt-4">2. Description of Service</h3>
              <p>
                Facebook Video Downloader is a free online tool that allows users to download publicly available videos 
                from Facebook. The service processes video URLs and provides download links in various quality formats.
              </p>

              <h3 className="mt-4">3. User Responsibilities</h3>
              <h4>3.1 Legal Use</h4>
              <p>You agree to use our service only for lawful purposes and in accordance with these Terms. You agree not to:</p>
              <ul>
                <li>Download copyrighted content without proper authorization</li>
                <li>Use the service to violate any laws or regulations</li>
                <li>Infringe upon the intellectual property rights of others</li>
                <li>Download private or restricted Facebook content</li>
                <li>Use the service for commercial purposes without permission</li>
                <li>Attempt to reverse engineer or hack our service</li>
              </ul>

              <h4 className="mt-3">3.2 Facebook Terms of Service</h4>
              <p>
                By using our service, you acknowledge that you are also bound by Facebook's Terms of Service. We are 
                not affiliated with, endorsed by, or sponsored by Facebook, Inc. Our service is an independent tool 
                that processes publicly available Facebook content.
              </p>

              <h3 className="mt-4">4. Intellectual Property</h3>
              <p>
                The content downloaded through our service remains the property of its original creators and Facebook. 
                We do not claim ownership of any videos downloaded through our service. Users are responsible for 
                obtaining proper permissions before downloading and using any content.
              </p>

              <h3 className="mt-4">5. Service Availability</h3>
              <p>
                We strive to provide a reliable service, but we do not guarantee that the service will be available at 
                all times. The service may be temporarily unavailable due to maintenance, updates, or unforeseen 
                circumstances. We are not liable for any loss or inconvenience caused by service unavailability.
              </p>

              <h3 className="mt-4">6. Disclaimer of Warranties</h3>
              <p>
                THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR 
                IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR 
                PURPOSE, OR NON-INFRINGEMENT.
              </p>

              <h3 className="mt-4">7. Limitation of Liability</h3>
              <p>
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, 
                CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR 
                INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES RESULTING FROM YOUR USE OF 
                THE SERVICE.
              </p>

              <h3 className="mt-4">8. Prohibited Content</h3>
              <p>You may not use our service to download content that:</p>
              <ul>
                <li>Is illegal, harmful, or violates any laws</li>
                <li>Infringes on copyright or intellectual property rights</li>
                <li>Contains hate speech, harassment, or discriminatory content</li>
                <li>Is pornographic, obscene, or sexually explicit</li>
                <li>Violates privacy rights of others</li>
                <li>Is private or restricted content</li>
              </ul>

              <h3 className="mt-4">9. Account Termination</h3>
              <p>
                We reserve the right to terminate or suspend access to our service immediately, without prior notice or 
                liability, for any reason, including if you breach the Terms. Upon termination, your right to use the 
                service will immediately cease.
              </p>

              <h3 className="mt-4">10. Changes to Terms</h3>
              <p>
                We reserve the right to modify or replace these Terms at any time. If a revision is material, we will 
                try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a 
                material change will be determined at our sole discretion.
              </p>

              <h3 className="mt-4">11. Governing Law</h3>
              <p>
                These Terms shall be interpreted and governed by the laws of the jurisdiction in which we operate, 
                without regard to its conflict of law provisions.
              </p>

              <h3 className="mt-4">12. Contact Information</h3>
              <p>
                If you have any questions about these Terms and Conditions, please contact us through our 
                <a href="/contact"> contact page</a>.
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

