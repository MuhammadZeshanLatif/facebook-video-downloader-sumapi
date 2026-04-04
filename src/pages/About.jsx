import React from 'react';
import SEO from '../components/SEO';

function About() {
  return (
    <>
      <SEO
        title="About FBSave HD - Free Facebook Video Downloader | Our Mission"
        description="FBSave HD is a free online Facebook video downloader. Learn how our tool helps you download any public Facebook video or Reel in HD quality without login or app installation."
        keywords="about facebook video downloader, fbsave hd, free facebook downloader, about us, facebook video tool, fb video saver"
        ogUrl="https://facebookvideodownloader.com/about"
      />
      <div className="th-section" style={{ paddingTop: '120px' }}>
      <div className="th-container">
        <div className="th-section-header">
          <div className="th-badge mb-3">
            <i className="fas fa-info-circle me-2"></i>About Us
          </div>
          <h1 className="th-section-title">About Facebook Video Downloader</h1>
          <p className="th-section-desc">
            Your trusted platform for downloading Facebook videos, Reels, and public content in high quality.
          </p>
        </div>

        <div className="row g-4 mt-4">
          <div className="col-lg-8 mx-auto">
            <div className="fb-tool-card">
              <h2>What is Facebook Video Downloader?</h2>
              <p>
                Facebook Video Downloader is a free, fast, and reliable online tool that allows you to download videos 
                from Facebook. Whether you want to save a Facebook Reel, a video post, or any public Facebook video, 
                our tool makes it easy to download them in various quality options including HD (720p, 1080p) and SD formats.
              </p>

              <h3 className="mt-4">About Facebook</h3>
              <p>
                Facebook, founded by Mark Zuckerberg in 2004, is one of the world's largest social media platforms 
                with over 3 billion monthly active users. The platform allows users to share photos, videos, stories, 
                and connect with friends and family worldwide. Facebook has evolved to include various features:
              </p>
              <ul>
                <li><strong>Facebook Reels:</strong> Short-form video content similar to TikTok, allowing users to create and share 15-90 second videos</li>
                <li><strong>Video Posts:</strong> Users can upload and share videos directly on their timeline or in groups</li>
                <li><strong>Live Videos:</strong> Real-time streaming feature for broadcasting live content</li>
                <li><strong>Watch:</strong> Facebook's video-on-demand platform featuring original content and user-generated videos</li>
              </ul>

              <h3 className="mt-4">Our Mission</h3>
              <p>
                Our mission is to provide users with a simple, fast, and secure way to download their favorite Facebook 
                videos. We understand that sometimes you want to save videos for offline viewing, sharing, or personal 
                use. Our tool respects Facebook's terms of service and only allows downloading of publicly available content.
              </p>

              <h3 className="mt-4">Key Features</h3>
              <ul>
                <li>✅ Download Facebook videos in HD quality (720p, 1080p)</li>
                <li>✅ Support for Facebook Reels</li>
                <li>✅ Multiple quality options (HD, SD)</li>
                <li>✅ Fast and secure downloads</li>
                <li>✅ No registration required</li>
                <li>✅ Free to use</li>
                <li>✅ Works on all devices (Desktop, Tablet, Mobile)</li>
                <li>✅ Direct download without opening new tabs</li>
              </ul>

              <h3 className="mt-4">How It Works</h3>
              <ol>
                <li>Copy the URL of the Facebook video you want to download</li>
                <li>Paste the URL into our downloader tool</li>
                <li>Click "Download Video" or "Analyze Link"</li>
                <li>Select your preferred video quality (HD or SD)</li>
                <li>Download the video directly to your device</li>
              </ol>

              <h3 className="mt-4">Privacy & Security</h3>
              <p>
                We take your privacy seriously. Our tool processes video URLs server-side and does not store any 
                personal information or downloaded videos. All downloads are processed securely, and we do not 
                track or monitor your usage beyond basic analytics for service improvement.
              </p>

              <h3 className="mt-4">Legal Notice</h3>
              <p>
                This tool is designed for downloading publicly available Facebook content only. Users are responsible 
                for ensuring they have the right to download and use the content. We do not condone downloading copyrighted 
                material without permission. Please respect content creators' rights and Facebook's Terms of Service.
              </p>

              <h3 className="mt-4">Contact Us</h3>
              <p>
                If you have any questions, suggestions, or concerns, please feel free to <a href="/contact">contact us</a>. 
                We're always looking to improve our service and appreciate your feedback.
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

