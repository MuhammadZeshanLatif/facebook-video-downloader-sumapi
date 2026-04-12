import React from 'react';
import SEO from '../components/SEO';
import { buildPrivacyJsonLd } from '../data/pageSchemas';

function PrivacyPolicy() {
  return (
    <>
      <SEO
        title="Privacy Policy - FBSave HD Facebook Video Downloader"
        description="Read FBSave HD's privacy policy to understand how we handle your data. We do not store your videos or require your Facebook login. Your privacy is our priority."
        keywords="facebook video downloader privacy policy, fbsave hd privacy, data protection, no login required, facebook downloader safe"
        ogUrl="https://fbvideodownloaders.com/privacy-policy"
        jsonLd={buildPrivacyJsonLd()}
      />
      <div className="th-section" style={{ paddingTop: '120px' }}>
      <div className="th-container">
        <div className="th-section-header">
          <h1 className="th-section-title">Privacy Policy</h1>
          <p className="th-section-desc">
            Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <div className="row g-4 mt-4">
          <div className="col-lg-10 mx-auto">
            <div className="fb-tool-card">
              <h2>1. Introduction</h2>
              <p>
                Welcome to Facebook Video Downloader. We respect your privacy and are committed to protecting your 
                personal data. This privacy policy explains how we collect, use, and safeguard your information when 
                you use our service.
              </p>

              <h3 className="mt-4">2. Information We Collect</h3>
              <h4>2.1 Information You Provide</h4>
              <p>We may collect the following information when you use our service:</p>
              <ul>
                <li>Facebook video URLs that you paste into our downloader</li>
                <li>Contact information if you reach out to us via our contact form</li>
                <li>Any feedback or messages you send to us</li>
              </ul>

              <h4 className="mt-3">2.2 Automatically Collected Information</h4>
              <p>We automatically collect certain information when you visit our website:</p>
              <ul>
                <li>IP address and location data</li>
                <li>Browser type and version</li>
                <li>Device information (mobile, tablet, desktop)</li>
                <li>Pages visited and time spent on pages</li>
                <li>Referring website addresses</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>

              <h3 className="mt-4">3. How We Use Your Information</h3>
              <p>We use the collected information for the following purposes:</p>
              <ul>
                <li>To provide and maintain our video downloading service</li>
                <li>To process your video download requests</li>
                <li>To improve our service and user experience</li>
                <li>To analyze usage patterns and website performance</li>
                <li>To respond to your inquiries and provide customer support</li>
                <li>To detect and prevent fraud or abuse</li>
                <li>To comply with legal obligations</li>
              </ul>

              <h3 className="mt-4">4. Data Storage and Security</h3>
              <p>
                We implement appropriate technical and organizational security measures to protect your personal data. 
                However, no method of transmission over the Internet is 100% secure. We do not store downloaded videos 
                on our servers. Video URLs are processed in real-time and are not permanently stored.
              </p>

              <h3 className="mt-4">5. Cookies and Tracking Technologies</h3>
              <p>
                We use cookies and similar tracking technologies to track activity on our website and hold certain 
                information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being 
                sent. However, if you do not accept cookies, you may not be able to use some portions of our service.
              </p>

              <h3 className="mt-4">6. Third-Party Services</h3>
              <p>
                Our service may contain links to third-party websites or services. We are not responsible for the 
                privacy practices of these third parties. We encourage you to read their privacy policies.
              </p>

              <h3 className="mt-4">7. Data Retention</h3>
              <p>
                We retain your personal data only for as long as necessary to fulfill the purposes outlined in this 
                privacy policy, unless a longer retention period is required by law. Video URLs are processed 
                immediately and not stored permanently.
              </p>

              <h3 className="mt-4">8. Your Rights</h3>
              <p>Depending on your location, you may have the following rights regarding your personal data:</p>
              <ul>
                <li>Right to access your personal data</li>
                <li>Right to rectify inaccurate data</li>
                <li>Right to erasure ("right to be forgotten")</li>
                <li>Right to restrict processing</li>
                <li>Right to data portability</li>
                <li>Right to object to processing</li>
                <li>Right to withdraw consent</li>
              </ul>

              <h3 className="mt-4">9. Children's Privacy</h3>
              <p>
                Our service is not intended for children under the age of 13. We do not knowingly collect personal 
                information from children under 13. If you are a parent or guardian and believe your child has provided 
                us with personal information, please contact us.
              </p>

              <h3 className="mt-4">10. Changes to This Privacy Policy</h3>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the 
                new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this 
                Privacy Policy periodically for any changes.
              </p>

              <h3 className="mt-4">11. Contact Us</h3>
              <p>
                If you have any questions about this Privacy Policy, please contact us through our 
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

export default PrivacyPolicy;

