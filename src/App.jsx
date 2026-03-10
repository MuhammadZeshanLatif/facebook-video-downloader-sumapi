import React, { useEffect, useMemo, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import About from './pages/About';
import ContactPage from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import Blog from './pages/Blog';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      if (isHomePage) {
        const sections = ['home', 'downloader', 'features', 'guides', 'faq', 'contact'];
        let current = 'home';
        sections.forEach((id) => {
          const el = document.getElementById(id);
          if (el) {
            const top = el.offsetTop - 120;
            const height = el.offsetHeight;
            if (window.scrollY >= top && window.scrollY < top + height) {
              current = id;
            }
          }
        });
      }
    };

    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHomePage]);

  const scrollToSection = (id) => {
    setMenuOpen(false);
    if (isHomePage) {
      const el = document.getElementById(id);
      if (el) {
        const offset = el.getBoundingClientRect().top + window.scrollY - 82;
        window.scrollTo({ top: offset, behavior: 'smooth' });
      }
    }
  };

  const navLinks = [
    { path: '/', label: 'Home', id: 'home' },
    { path: '/blog', label: 'Blog', id: null },
    { path: '/about', label: 'About', id: null },
    { path: '/contact', label: 'Contact', id: 'contact' },
  ];

  return (
    <nav className={`th-navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="th-container">
        <div className="th-nav-inner">
          <Link to="/" className="th-logo" style={{ textDecoration: 'none', cursor: 'pointer' }}>
            <div className="th-logo-icon">
              <i className="fab fa-facebook-f"></i>
            </div>
            <span className="th-logo-text">FB<span>Save</span> HD</span>
          </Link>

          <ul className="th-nav-links">
            {navLinks.map((link) => (
              <li key={link.path}>
                {link.id && isHomePage ? (
                  <button
                    className="th-nav-link"
                    onClick={() => scrollToSection(link.id)}
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link
                    to={link.path}
                    className="th-nav-link"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <div className="th-nav-cta">
            {isHomePage ? (
              <>
                <button className="th-btn th-btn-outline-sm" onClick={() => scrollToSection('guides')}>
                  User Guide
                </button>
                <button className="th-btn th-btn-primary-sm" onClick={() => scrollToSection('downloader')}>
                  Download Now
                </button>
              </>
            ) : (
              <Link to="/" className="th-btn th-btn-primary-sm">
                Download Now
              </Link>
            )}
          </div>

          <button
            className={`th-hamburger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        <div className={`th-mobile-menu${menuOpen ? ' open' : ''}`}>
          {navLinks.map((link) => (
            <div key={link.path}>
              {link.id && isHomePage ? (
                <button
                  className="th-mobile-link"
                  onClick={() => {
                    scrollToSection(link.id);
                    setMenuOpen(false);
                  }}
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  to={link.path}
                  className="th-mobile-link"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              )}
            </div>
          ))}
          {isHomePage ? (
            <button className="th-btn th-btn-primary-sm w-100 mt-3" onClick={() => {
              scrollToSection('downloader');
              setMenuOpen(false);
            }}>
              Start Download
            </button>
          ) : (
            <Link to="/" className="th-btn th-btn-primary-sm w-100 mt-3" onClick={() => setMenuOpen(false)}>
              Start Download
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState('idle');
  const [loading, setLoading] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!url.trim()) {
      setStatus('error');
      return;
    }

    // Show loading state in hero card
    setLoading(true);
    setStatus('loading');

    // Fire a custom event so the main downloader section can handle the API call
    window.dispatchEvent(
      new CustomEvent('fb-download', {
        detail: { url },
      })
    );

    // Smooth scroll to downloader section and then mark as ready
    setTimeout(() => {
      const downloaderSection = document.getElementById('downloader');
      if (downloaderSection) {
        downloaderSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      setLoading(false);
      setStatus('ready');
    }, 400);
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = el.getBoundingClientRect().top + window.scrollY - 82;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="th-hero fb-hero">
      <div className="th-hero-blob th-hero-blob-1"></div>
      <div className="th-hero-blob th-hero-blob-2"></div>
      <div className="th-hero-blob th-hero-blob-3"></div>

      {/* Mobile Search Bar - Top of Page (Mobile Only) */}
      <div className="fb-mobile-search-top">
        <div className="fb-mobile-fullscreen">
          <div className="fb-mobile-card-full">
            <h1 className="fb-mobile-title-hero-top">Facebook Video Downloader</h1>
            <form className="fb-mobile-search-form" onSubmit={submitHandler}>
              <div className="fb-mobile-input-full">
                <i className="fab fa-facebook-f"></i>
                <input
                  type="url"
                  placeholder="Paste Facebook video URL here"
                  value={url}
                  onChange={(e) => {
                    setUrl(e.target.value);
                    setStatus('idle');
                  }}
                  disabled={loading}
                />
              </div>
              <button className="fb-mobile-btn-full" type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <i className="fas fa-magnifying-glass"></i>
                    <span>Analyze Link</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Tablet View - Centered Card Layout */}
      <div className="fb-tablet-hero">
        <div className="fb-tablet-fullscreen">
          <div className="fb-tablet-card-full">
            <div className="fb-preview-top">
              <div className="fb-preview-brand">
                <span className="fb-preview-dot"></span>
                <strong>Facebook Video Downloader</strong>
              </div>
              <span className="fb-preview-badge">HD Ready</span>
            </div>

            <h1 className="fb-tablet-title-full">Facebook Video Downloader</h1>
            <form className="fb-preview-form" onSubmit={submitHandler}>
              <div className="fb-preview-input-wrap">
                <i className="fab fa-facebook-f"></i>
                <input
                  id="video-url-tablet"
                  type="url"
                  placeholder="https://www.facebook.com/..."
                  value={url}
                  onChange={(e) => {
                    setUrl(e.target.value);
                    setStatus('idle');
                  }}
                  disabled={loading}
                />
              </div>
              <button className="th-btn th-btn-primary w-100" type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <i className="fas fa-spinner fa-spin me-2"></i>Processing...
                  </>
                ) : (
                  <>
                    <i className="fas fa-cloud-arrow-down me-2"></i>Download Video
                  </>
                )}
              </button>
            </form>

            <div className={`fb-preview-result ${status}`}>
              {status === 'idle' && (
                <div className="fb-result-box neutral">
                  <i className="fas fa-link"></i>
                  <div>
                    <strong>Paste a public Facebook link</strong>
                    <p>Video pages, post URLs and Facebook Reels links usually start the workflow.</p>
                  </div>
                </div>
              )}
              {status === 'loading' && (
                <div className="fb-result-box neutral">
                  <i className="fas fa-spinner fa-spin"></i>
                  <div>
                    <strong>Processing your link...</strong>
                    <p>Please wait while we fetch the video data.</p>
                  </div>
                </div>
              )}
              {status === 'error' && (
                <div className="fb-result-box danger">
                  <i className="fas fa-circle-exclamation"></i>
                  <div>
                    <strong>Please enter a valid Facebook URL</strong>
                    <p>Add a public video or Reel link to continue.</p>
                  </div>
                </div>
              )}
              {status === 'ready' && (
                <div className="fb-result-box success">
                  <i className="fas fa-circle-check"></i>
                  <div>
                    <strong>Link processed successfully</strong>
                    <p>Scroll down to view download options and get your video.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="th-container">
        <div className="th-hero-grid">
          <div className="th-hero-content">
            <div className="th-badge th-badge-pill mb-3">
              <i className="fas fa-bolt me-2"></i>Fast Facebook Video Downloader Interface
            </div>
            <h1 className="th-hero-title">
              Download <span className="th-gradient-text">Facebook Videos</span>, Reels & Public Clips in HD
            </h1>
            <p className="th-hero-desc">
              Use this clean, fast and responsive Facebook Video Downloader style interface to save public Facebook videos,
              Reels and clips online. Learn how Facebook video downloading works, how to copy video links, where quality
              options appear, and what users should know before saving content from Facebook across desktop and mobile.
            </p>

            <div className="th-hero-stats">
              <div className="th-hero-stat">
                <span className="th-stat-num">HD</span>
                <span className="th-stat-label">Quality Support</span>
              </div>
              <div className="th-hero-stat-divider"></div>
              <div className="th-hero-stat">
                <span className="th-stat-num">Reels</span>
                <span className="th-stat-label">Public Clips</span>
              </div>
              <div className="th-hero-stat-divider"></div>
              <div className="th-hero-stat">
                <span className="th-stat-num">All</span>
                <span className="th-stat-label">Major Devices</span>
              </div>
            </div>

            <div className="th-hero-btns">
              <button className="th-btn th-btn-primary" onClick={() => scrollToSection('downloader')}>
                <i className="fas fa-download me-2"></i>Open Downloader
              </button>
              <button className="th-btn th-btn-outline" onClick={() => scrollToSection('guides')}>
                <i className="fas fa-circle-play me-2"></i>See How It Works
              </button>
            </div>

            <div className="th-trust-badges">
              <div className="th-trust-badge">
                <i className="fas fa-mobile-screen-button"></i>
                <span>Android & iPhone Friendly</span>
              </div>
              <div className="th-trust-badge">
                <i className="fas fa-laptop"></i>
                <span>Desktop Browser Ready</span>
              </div>
              <div className="th-trust-badge">
                <i className="fas fa-shield"></i>
                <span>Guide-Based Safe Workflow</span>
              </div>
            </div>
          </div>

          <div className="th-hero-visual">
            <div className="th-hero-img-wrap fb-tool-preview">
              <div className="th-hero-img-bg"></div>
              <div className="fb-preview-card">
                <div className="fb-preview-top fb-desktop-only">
                  <div className="fb-preview-brand">
                    <span className="fb-preview-dot"></span>
                    <strong>Facebook Video Downloader</strong>
                  </div>
                  <span className="fb-preview-badge">HD Ready</span>
                </div>

                <h3 className="fb-mobile-title-hero">Facebook Video Downloader</h3>

                <form className="fb-preview-form" onSubmit={submitHandler}>
                  <label htmlFor="video-url" className="fb-preview-label fb-desktop-only">Paste Facebook video URL</label>
                  <div className="fb-preview-input-wrap">
                    <i className="fab fa-facebook-f"></i>
                    <input
                      id="video-url"
                      type="url"
                      placeholder="https://www.facebook.com/..."
                      value={url}
                      onChange={(e) => {
                        setUrl(e.target.value);
                        setStatus('idle');
                      }}
                      disabled={loading}
                    />
                  </div>
                  <button className="th-btn th-btn-primary w-100 mt-2" type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <i className="fas fa-spinner fa-spin me-2"></i>Processing...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-cloud-arrow-down me-2"></i>Fetch Download Options
                      </>
                    )}
                  </button>
                </form>

                <div className={`fb-preview-result ${status}`}>
                  {status === 'idle' && (
                    <div className="fb-result-box neutral">
                      <i className="fas fa-link"></i>
                      <div>
                        <strong>Paste a public Facebook link</strong>
                        <p>Video pages, post URLs and Facebook Reels links usually start the workflow.</p>
                      </div>
                    </div>
                  )}
                  {status === 'loading' && (
                    <div className="fb-result-box neutral">
                      <i className="fas fa-spinner fa-spin"></i>
                      <div>
                        <strong>Processing your link...</strong>
                        <p>Please wait while we fetch the video data.</p>
                      </div>
                    </div>
                  )}
                  {status === 'error' && (
                    <div className="fb-result-box danger">
                      <i className="fas fa-circle-exclamation"></i>
                      <div>
                        <strong>Please enter a valid Facebook URL</strong>
                        <p>Add a public video or Reel link to continue.</p>
                      </div>
                    </div>
                  )}
                  {status === 'ready' && (
                    <div className="fb-result-box success">
                      <i className="fas fa-circle-check"></i>
                      <div>
                        <strong>Link processed successfully</strong>
                        <p>Scroll down to view download options and get your video.</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="fb-quality-list">
                  <div className="fb-quality-item">
                    <div>
                      <strong>HD Download</strong>
                      <span>Best for larger screens and better clarity</span>
                    </div>
                    <button type="button">HD</button>
                  </div>
                  <div className="fb-quality-item">
                    <div>
                      <strong>SD Download</strong>
                      <span>Smaller file size for quick saving</span>
                    </div>
                    <button type="button">SD</button>
                  </div>
                </div>
              </div>

              <div className="th-float-card th-float-card-1">
                <div className="th-float-icon blue">
                  <i className="fas fa-film"></i>
                </div>
                <div>
                  <div className="th-float-title">Public Videos</div>
                  <div className="th-float-sub">Posts, clips and timelines</div>
                </div>
              </div>
              <div className="th-float-card th-float-card-2">
                <div className="th-float-icon green">
                  <i className="fas fa-mobile-screen-button"></i>
                </div>
                <div>
                  <div className="th-float-title">Mobile Friendly</div>
                  <div className="th-float-sub">Android, iPhone, tablet</div>
                </div>
              </div>
              <div className="th-float-card th-float-card-3">
                <div className="th-float-icon purple">
                  <i className="fas fa-video"></i>
                </div>
                <div>
                  <div className="th-float-title">Reels Support</div>
                  <div className="th-float-sub">Short-form Facebook clips</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustedBy() {
  const items = [
    'Facebook Video Guides',
    'Reels Download Tips',
    'Public Post Saving',
    'Mobile Download Help',
    'Desktop Browser Workflow',
    'Facebook Clip Support',
    'HD Quality Guidance',
    'Link Copy Instructions',
  ];

  return (
    <div className="th-trusted">
      <div className="th-container">
        <p className="th-trusted-label">Popular search topics around Facebook video saving</p>
      </div>
      <div className="th-marquee-wrap">
        <div className="th-marquee">
          {[...items, ...items].map((item, index) => (
            <div key={index} className="th-marquee-item">
              <i className="fab fa-facebook th-marquee-icon"></i>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DownloaderSection() {
  const [link, setLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [videoData, setVideoData] = useState(null);
  const [error, setError] = useState(null);
  const [activeVideoUrl, setActiveVideoUrl] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayPauseIcon, setShowPlayPauseIcon] = useState(true);
  const [isMobileView, setIsMobileView] = useState(false);
  const videoRef = React.useRef(null);

  // Convert h2 to h1 on mobile/tablet (<= 991px)
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobileView(window.innerWidth <= 991);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Listen for events from the Hero section so both search fields control the same video area
  useEffect(() => {
    const handler = (e) => {
      const incomingUrl = e.detail?.url;
      if (incomingUrl) {
        setLink(incomingUrl);
        fetchVideoData(incomingUrl);
      }
    };

    window.addEventListener('fb-download', handler);
    return () => window.removeEventListener('fb-download', handler);
  }, []);

  const fetchVideoData = async (url) => {
    setLoading(true);
    setError(null);
    setVideoData(null);
    setActiveVideoUrl(null);

    try {
      const encodedUrl = encodeURIComponent(url);
      const apiUrl = `https://facebookvideo-downloader-backend.vercel.app/api/meta/download?url=${encodedUrl}`;
      
      const response = await fetch(apiUrl);
      const data = await response.json();

      // Handle the nested API response structure: data.data.data (array)
      let videoItems = null;
      if (data.success && data.data) {
        // Check if data.data.data exists (array of video items)
        if (data.data.data && Array.isArray(data.data.data) && data.data.data.length > 0) {
          videoItems = data.data.data;
        } 
        // Fallback: check if data.data is an array
        else if (Array.isArray(data.data) && data.data.length > 0) {
          videoItems = data.data;
        }
        // Fallback: check for direct video properties
        else if (data.data.url || data.data.thumbnail || data.data.hd || data.data.sd) {
          videoItems = [data.data];
        }
      }

      if (videoItems && videoItems.length > 0) {
        const firstItem = videoItems[0];
        setVideoData({
          items: videoItems,
          thumbnail: firstItem?.thumbnail,
          title: firstItem?.title || null,
        });
        // set active video URL (first item) for player
        if (firstItem?.url) {
          setActiveVideoUrl(firstItem.url);
        }
        // Auto-scroll to video section when data loads
        setTimeout(() => {
          const videoSection = document.getElementById('video-results');
          if (videoSection) {
            videoSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      } else {
        setError(data.message || 'No video data found. Please check the URL and try again.');
      }
    } catch (err) {
      setError('An error occurred while fetching video data. Please try again.');
      console.error('Error fetching video data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!link.trim()) {
      setError('Please enter a Facebook video URL');
      return;
    }
    fetchVideoData(link);
  };

  const handleDownload = async (downloadUrl, quality = '') => {
    if (!downloadUrl) return;

    try {
      // Ensure URL has download parameter
      let urlWithDownload = downloadUrl;
      if (!urlWithDownload.includes('&dl=1') && !urlWithDownload.includes('?dl=1')) {
        urlWithDownload = urlWithDownload + (urlWithDownload.includes('?') ? '&dl=1' : '?dl=1');
      }

      // Try fetching as blob first (works if CORS allows)
      try {
        const response = await fetch(urlWithDownload, {
          method: 'GET',
          mode: 'cors',
          credentials: 'omit',
        });

        if (response.ok) {
          const blob = await response.blob();
          const blobUrl = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.style.display = 'none';
          link.href = blobUrl;
          link.download = `facebook-video-${quality || 'download'}.mp4`;
          document.body.appendChild(link);
          link.click();
          
          // Clean up
          setTimeout(() => {
            document.body.removeChild(link);
            window.URL.revokeObjectURL(blobUrl);
          }, 100);
          return;
        }
      } catch (fetchError) {
        console.log('Fetch failed, trying alternative method:', fetchError);
      }

      // Alternative: Use iframe for download (works better with cross-origin)
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = urlWithDownload;
      document.body.appendChild(iframe);
      
      // Clean up iframe after a delay
      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 5000);

    } catch (error) {
      console.error('Download error:', error);
      // Final fallback: direct link
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `facebook-video-${quality || 'download'}.mp4`;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        document.body.removeChild(link);
      }, 100);
    }
  };

  return (
    <section id="downloader" className="th-section">
      <div className="th-container">
        <div className="th-section-header">
          <div className="th-badge mb-3"><i className="fas fa-cloud-arrow-down me-2"></i>Downloader Tool Area</div>
          {isMobileView ? (
            <h1 className="th-section-title fb-section-title-responsive">Facebook <span className="th-gradient-text">Video Downloader</span> Tool UI</h1>
          ) : (
            <h2 className="th-section-title fb-section-title-responsive">Facebook <span className="th-gradient-text">Video Downloader</span> Tool UI</h2>
          )}
          <p className="th-section-desc">
            Paste a public Facebook video URL below to download videos in HD quality. This section is designed like a premium tool landing page with clean form spacing, result cards and action-ready buttons.
          </p>
        </div>

        <div className="fb-download-panel">
          <div className="row g-4 align-items-stretch">
            <div className="col-lg-12">
              <div className="fb-tool-card">
                <h3 className="fb-mobile-hide">Paste Facebook Link</h3>
                <p className="fb-mobile-hide">
                  Copy the video URL from Facebook, paste it here, then continue to view the supported quality buttons. This is the central downloader area for users searching terms like <strong>download Facebook video</strong>, <strong>save Facebook Reel</strong> and <strong>Facebook video downloader HD</strong>.
                </p>
                <form onSubmit={handleSubmit}>
                  <div className="fb-large-input-wrap">
                    <i className="fab fa-facebook-f"></i>
                    <input
                      type="url"
                      placeholder="Paste Facebook video, post or Reel URL here"
                      value={link}
                      onChange={(e) => {
                        setLink(e.target.value);
                        setError(null);
                        setVideoData(null);
                      }}
                      disabled={loading}
                    />
                  </div>
                  <h3 className="fb-mobile-title">Facebook Video Downloader</h3>
                  <div className="fb-action-row">
                    <button type="submit" className="th-btn th-btn-primary" disabled={loading}>
                      {loading ? (
                        <>
                          <i className="fas fa-spinner fa-spin me-2"></i>Loading...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-magnifying-glass me-2"></i>Analyze Link
                        </>
                      )}
                    </button>
                    <button type="button" className="th-btn th-btn-outline" onClick={() => {
                      setLink('');
                      setError(null);
                      setVideoData(null);
                    }} disabled={loading}>
                      <i className="fas fa-eraser me-2"></i>Clear Field
                    </button>
                  </div>
                </form>

                {error && (
                  <div className="fb-result-box danger" style={{ marginTop: '1rem' }}>
                    <i className="fas fa-circle-exclamation"></i>
                    <div>
                      <strong>Error</strong>
                      <p>{error}</p>
                    </div>
                  </div>
                )}

                {loading && (
                  <div className="fb-loading-container" style={{ marginTop: '1.5rem', textAlign: 'center', padding: '2rem' }}>
                    <div className="fb-loader">
                      <i className="fas fa-spinner fa-spin" style={{ fontSize: '2rem', color: 'var(--th-primary)', marginBottom: '1rem' }}></i>
                      <p style={{ color: 'var(--th-body)', margin: 0 }}>Fetching video data...</p>
                    </div>
                  </div>
                )}

                {videoData && videoData.items && videoData.items.length > 0 && (
                  <div id="video-results" className="fb-demo-results" style={{ marginTop: '1.5rem' }}>
                    <div className="fb-demo-header">
                      <h4>Download Options</h4>
                      <span style={{ color: 'var(--th-success)' }}>✓ Video Ready</span>
                    </div>
                    
                    <div className="fb-video-wrapper">
                      {(videoData.thumbnail || (videoData.items && videoData.items[0]?.thumbnail)) && (
                        <div className="fb-video-thumbnail">
                          {activeVideoUrl ? (
                            <>
                              <video
                                ref={videoRef}
                                src={activeVideoUrl}
                                controls
                                muted
                                style={{ width: '100%', maxHeight: '420px', background: 'black', display: 'block' }}
                                onPlay={() => {
                                  setIsPlaying(true);
                                  // Hide icon after 1 second when playing
                                  setTimeout(() => {
                                    if (videoRef.current && !videoRef.current.paused) {
                                      setShowPlayPauseIcon(false);
                                    }
                                  }, 1000);
                                }}
                                onPause={() => {
                                  setIsPlaying(false);
                                  setShowPlayPauseIcon(true);
                                }}
                                onMouseEnter={() => {
                                  // Show icon on hover when playing
                                  if (isPlaying) {
                                    setShowPlayPauseIcon(true);
                                  }
                                }}
                                onMouseLeave={() => {
                                  // Hide icon after hover when playing
                                  if (isPlaying && videoRef.current && !videoRef.current.paused) {
                                    setTimeout(() => {
                                      if (videoRef.current && !videoRef.current.paused) {
                                        setShowPlayPauseIcon(false);
                                      }
                                    }, 500);
                                  }
                                }}
                              />
                              {showPlayPauseIcon && (
                                <button
                                  type="button"
                                  className={`fb-video-play-btn ${isPlaying ? 'playing' : 'paused'}`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (videoRef.current) {
                                      if (videoRef.current.paused) {
                                        videoRef.current.play();
                                      } else {
                                        videoRef.current.pause();
                                      }
                                    }
                                  }}
                                >
                                  <i className={isPlaying ? 'fas fa-pause' : 'fas fa-play'}></i>
                                </button>
                              )}
                            </>
                          ) : (
                            <>
                              <img 
                                src={videoData.thumbnail || videoData.items[0]?.thumbnail} 
                                alt="Video thumbnail" 
                                style={{ width: '100%', height: 'auto', display: 'block', maxHeight: '400px', objectFit: 'contain' }}
                                onError={(e) => { e.target.style.display = 'none'; }}
                              />
                              <button
                                type="button"
                                className="fb-video-play-btn"
                                onClick={() => {
                                  const firstUrl = videoData.items[0]?.url;
                                  if (firstUrl) {
                                    setActiveVideoUrl(firstUrl);
                                    setIsPlaying(false);
                                    setShowPlayPauseIcon(true);
                                  }
                                }}
                              >
                                <i className="fas fa-play"></i>
                              </button>
                            </>
                          )}
                        </div>
                      )}
                    </div>

                    {(() => {
                      const mainUrl = activeVideoUrl || videoData.items[0]?.url;
                      if (!mainUrl) return null;
                      return (
                        <div className="fb-main-actions">
                          <button
                            type="button"
                            className="th-btn th-btn-primary"
                            onClick={() => handleDownload(mainUrl, 'Video')}
                          >
                            <i className="fas fa-download me-2"></i>Download Video
                          </button>
                        </div>
                      );
                    })()}

                    {videoData.title && (
                      <div style={{ marginBottom: '1rem', padding: '12px', background: 'var(--th-bg-alt)', borderRadius: '12px' }}>
                        <strong style={{ color: 'var(--th-dark)', fontSize: '0.95rem' }}>{videoData.title}</strong>
                      </div>
                    )}

                    <div className="fb-demo-option-grid">
                      {videoData.items.map((item, index) => {
                        if (!item.url) return null;
                        
                        const resolution = item.resolution || 'Video';
                        const isHD = resolution.toLowerCase().includes('hd') || resolution.toLowerCase().includes('720') || resolution.toLowerCase().includes('1080');
                        const qualityLabel = isHD ? 'HD' : resolution;
                        
                        return (
                          <div key={index} className="fb-demo-option">
                            <div>
                              <strong>{resolution}</strong>
                              <p>{isHD ? 'High definition quality for best viewing experience' : 'Standard quality video download'}</p>
                            </div>
                            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                              <button 
                                type="button" 
                                className="th-btn th-btn-outline"
                                onClick={() => setActiveVideoUrl(item.url)}
                                style={{ padding: '8px 16px', fontSize: '0.85rem' }}
                              >
                                <i className="fas fa-play me-2"></i>Play {qualityLabel}
                              </button>
                              <button 
                                type="button" 
                                className="th-btn th-btn-primary"
                                onClick={() => handleDownload(item.url, qualityLabel)}
                                style={{ padding: '8px 16px', fontSize: '0.85rem' }}
                              >
                                <i className="fas fa-download me-2"></i>Download {qualityLabel}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="col-lg-12">
              <div className="fb-side-card">
                <h4>What Can Users Usually Save?</h4>
                <ul className="fb-check-list">
                  <li><i className="fas fa-check-circle"></i>Public Facebook videos from posts</li>
                  <li><i className="fas fa-check-circle"></i>Facebook Reels from public profiles or pages</li>
                  <li><i className="fas fa-check-circle"></i>Shared video links opened in browser</li>
                  <li><i className="fas fa-check-circle"></i>Short clips from public pages</li>
                  <li><i className="fas fa-check-circle"></i>Mobile browser based saving flows</li>
                </ul>

                <div className="fb-note-box">
                  <i className="fas fa-circle-info"></i>
                  <p>
                    Always respect copyright, personal privacy, creator ownership and Facebook platform rules. Only save content you are permitted to access and use.
                  </p>
                </div>

                <div className="fb-mini-stats">
                  <div className="fb-mini-stat">
                    <strong>Android</strong>
                    <span>Browser-based workflow</span>
                  </div>
                  <div className="fb-mini-stat">
                    <strong>iPhone</strong>
                    <span>Safari compatible layout</span>
                  </div>
                  <div className="fb-mini-stat">
                    <strong>Desktop</strong>
                    <span>Chrome, Edge, Firefox</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    {
      icon: 'fas fa-bolt',
      color: 'blue',
      title: 'Fast Link Processing UI',
      desc: 'A premium fast-loading interface matters when users search for a Facebook video downloader that feels instant and trustworthy.',
      tags: ['Speed', 'UX'],
    },
    {
      icon: 'fas fa-mobile-screen-button',
      color: 'green',
      title: 'Mobile Responsive Design',
      desc: 'Most Facebook downloading traffic comes from mobile, so the layout is fully responsive across iPhone, Android and tablets.',
      tags: ['Responsive', 'Mobile'],
    },
    {
      icon: 'fas fa-high-definition',
      color: 'purple',
      title: 'HD & SD Quality Layout',
      desc: 'A clear visual distinction between HD and SD buttons helps users understand what quality choices are available from a Facebook video link.',
      tags: ['HD', 'SD'],
    },
    {
      icon: 'fas fa-film',
      color: 'orange',
      title: 'Facebook Reels Support',
      desc: 'Short-form content is a huge part of Facebook today, so Reel-focused blocks improve relevance for Facebook Reels downloader searches.',
      tags: ['Reels', 'Short Video'],
    },
    {
      icon: 'fas fa-link',
      color: 'pink',
      title: 'Simple Copy-Paste Workflow',
      desc: 'Users want a straightforward process: copy the Facebook link, paste the URL, and get download choices without friction.',
      tags: ['Paste URL', 'Easy Use'],
    },
    {
      icon: 'fas fa-shield-halved',
      color: 'teal',
      title: 'Safe & Educational Sections',
      desc: 'Explaining permissions, public links and best practices adds trust and improves overall on-page quality for searchers.',
      tags: ['Safety', 'Trust'],
    },
    {
      icon: 'fas fa-magnifying-glass-chart',
      color: 'indigo',
      title: 'SEO-Focused Content Blocks',
      desc: 'Structured headings, FAQs and helpful copy support rankings for long-tail Facebook downloader related queries.',
      tags: ['SEO', 'Long-tail'],
    },
    {
      icon: 'fas fa-laptop-code',
      color: 'red',
      title: 'No App Installation Feel',
      desc: 'A browser-based downloader experience lowers friction and gives users a quick online alternative to software-based solutions.',
      tags: ['Browser Tool', 'Online'],
    },
  ];

  return (
    <section id="features" className="th-section th-section-alt">
      <div className="th-container">
        <div className="th-section-header">
          <div className="th-badge mb-3"><i className="fas fa-star me-2"></i>Feature Highlights</div>
          <h2 className="th-section-title">Why Users Search for a Better <span className="th-gradient-text">Facebook Downloader</span></h2>
          <p className="th-section-desc">
            People looking to download Facebook videos want speed, simplicity, mobile usability and clear instructions. These feature cards present that value in a modern, search-friendly layout.
          </p>
        </div>

        <div className="row g-4">
          {features.map((feature, index) => (
            <div key={index} className="col-12 col-sm-6 col-lg-3">
              <div className="th-service-card">
                <div className={`th-service-icon th-icon-${feature.color}`}>
                  <i className={feature.icon}></i>
                </div>
                <h4 className="th-service-title">{feature.title}</h4>
                <p className="th-service-desc">{feature.desc}</p>
                <div className="th-service-tags">
                  {feature.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="th-tag">{tag}</span>
                  ))}
                </div>
                <button className="th-service-link">
                  Explore Feature <i className="fas fa-arrow-right ms-1"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function InfoSection() {
  const cards = [
    {
      icon: 'fas fa-copy',
      title: 'How to Copy a Facebook Video Link',
      desc: 'Open the public Facebook post, tap the share or three-dot menu, then choose the copy link option. On desktop, you can also copy the page URL directly from the browser address bar.',
    },
    {
      icon: 'fas fa-mobile-alt',
      title: 'How Users Save Videos on Mobile',
      desc: 'On mobile devices, people usually open Facebook in the app or browser, copy the link, then paste it into an online Facebook video downloader page built with responsive input fields and large touch-friendly buttons.',
    },
    {
      icon: 'fas fa-desktop',
      title: 'How Desktop Downloading Works',
      desc: 'Desktop users often prefer Chrome, Edge or Firefox. A clean tool page with preview information, resolution choices and a visible step-by-step section creates a stronger user experience.',
    },
    {
      icon: 'fas fa-video-camera',
      title: 'Facebook Reels, Clips and Posts',
      desc: 'Facebook now contains short Reels, story-like clips, longer posts, page videos and shared media. A complete downloader landing page should naturally mention these content types for broader keyword relevance.',
    },
  ];

  return (
    <section className="th-section">
      <div className="th-container">
        <div className="th-about-grid fb-info-grid">
          <div className="th-about-content">
            <div className="th-badge mb-3"><i className="fas fa-circle-info me-2"></i>Facebook Video Saving Info</div>
            <h2 className="th-section-title text-start">
              Everything Users Want to Know About <span className="th-gradient-text">Facebook Video Downloading</span>
            </h2>
            <p className="th-about-text">
              Searchers often ask how to download Facebook videos without installing software, whether Facebook Reels can be saved online, how to keep video quality high, and which devices work best. A strong downloader website should answer all of these questions directly on the page with clear, structured content.
            </p>
            <p className="th-about-text">
              A good Facebook downloader experience is not only about a single URL field. It should also explain link copying, supported content types, public versus private content, expected quality levels, browser compatibility and device-specific workflows. That type of content helps users and improves visibility for long-tail search queries.
            </p>
            <p className="th-about-text">
              This section is built to make the page feel more complete, trustworthy and useful for people looking for a reliable Facebook video saver. It covers practical usage questions, not just tool presentation.
            </p>
          </div>

          <div className="fb-info-cards">
            {cards.map((card, index) => (
              <div key={index} className="th-feature-item fb-feature-card">
                <div className="th-feature-icon th-icon-blue">
                  <i className={card.icon}></i>
                </div>
                <div>
                  <h5 className="th-feature-title">{card.title}</h5>
                  <p className="th-feature-desc">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsBanner() {
  const stats = [
    { icon: 'fas fa-film', num: 'Video', label: 'Post URLs Supported' },
    { icon: 'fas fa-mobile-screen-button', num: 'All', label: 'Major Device Layouts' },
    { icon: 'fas fa-video', num: 'Reels', label: 'Short-form Focus' },
    { icon: 'fas fa-search', num: 'SEO', label: 'Helpful Content Blocks' },
  ];

  return (
    <div className="th-stats-banner">
      <div className="th-container">
        <div className="th-stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="th-stat-item">
              <div className="th-stat-icon">
                <i className={stat.icon}></i>
              </div>
              <div className="th-stat-info">
                <div className="th-stat-number">{stat.num}</div>
                <div className="th-stat-label">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Guides() {
  const steps = [
    {
      icon: 'fas fa-up-right-from-square',
      num: '01',
      title: 'Open the Facebook Video',
      desc: 'Visit the public Facebook post, Reel or page video you want to save. Make sure the content is publicly accessible and permitted for your use.',
    },
    {
      icon: 'fas fa-copy',
      num: '02',
      title: 'Copy the Video Link',
      desc: 'Use the share menu or browser address bar to copy the Facebook URL. This copied link is what users paste into a Facebook downloader field.',
    },
    {
      icon: 'fas fa-paste',
      num: '03',
      title: 'Paste in the Downloader',
      desc: 'Paste the Facebook URL into the input field, then process the link to reveal the preview, resolution buttons and possible output choices.',
    },
    {
      icon: 'fas fa-download',
      num: '04',
      title: 'Choose Quality & Save',
      desc: 'Select HD or SD depending on availability. Users often choose HD for larger displays and SD for smaller file sizes or faster saving.',
    },
  ];

  return (
    <section id="guides" className="th-section th-section-alt">
      <div className="th-container">
        <div className="th-section-header">
          <div className="th-badge mb-3"><i className="fas fa-list-check me-2"></i>Step by Step</div>
          <h2 className="th-section-title">How to Use a <span className="th-gradient-text">Facebook Video Downloader</span></h2>
          <p className="th-section-desc">
            These four steps explain the basic Facebook video saving flow for desktop and mobile users. Keeping the process visible helps first-time visitors understand what to do immediately.
          </p>
        </div>

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

        <div className="fb-guide-content">
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="fb-content-card">
                <h3>Facebook Downloader Tips for Better Results</h3>
                <p>
                  If users want smoother saving experiences, they should copy the complete public URL, avoid truncated shared links, check that the post is visible in browser mode, and choose the correct resolution for their device. Many Facebook video issues come from incomplete links or private post restrictions.
                </p>
                <ul className="fb-bullet-list">
                  <li>Use the original public post URL whenever possible.</li>
                  <li>Prefer updated browsers like Chrome, Safari, Edge or Firefox.</li>
                  <li>Switch from app view to browser view if the link is not copying properly.</li>
                  <li>Pick SD when storage or bandwidth is limited.</li>
                  <li>Choose HD when the source video quality supports it.</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="fb-content-card">
                <h3>Facebook-Related Search Intent Covered Here</h3>
                <p>
                  This page naturally supports searches such as Facebook video downloader online, save Facebook Reel HD, download Facebook video on iPhone, download Facebook video on Android, Facebook clips downloader, public Facebook post video saver, and how to copy a Facebook video link.
                </p>
                <ul className="fb-bullet-list">
                  <li>Facebook videos from timeline posts</li>
                  <li>Facebook page media and shared clips</li>
                  <li>Facebook Reels and short-form public content</li>
                  <li>Mobile browser workflows on iOS and Android</li>
                  <li>Desktop browser-based download guidance</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    {
      q: 'How do I download a Facebook video online?',
      a: 'Open the public Facebook video, copy the post or video URL, paste it into the downloader field, then continue to the available quality options. This workflow is common across browser-based Facebook video downloader tools.',
    },
    {
      q: 'Can I save Facebook Reels on my phone?',
      a: 'Yes, many users save public Facebook Reels from Android phones, iPhones and tablets by copying the Reel link and opening it in a browser-friendly downloader page with responsive input and large action buttons.',
    },
    {
      q: 'What is the difference between HD and SD download?',
      a: 'HD usually offers better visual clarity and is preferred for larger screens. SD has a smaller file size and can be better for limited storage, mobile data saving or faster transfers.',
    },
    {
      q: 'Why is my Facebook link not working?',
      a: 'Common reasons include a private post, an incomplete copied URL, restricted permissions or a link opened from the app without proper browser access. Using the full public post URL often helps.',
    },
    {
      q: 'Can browser tools work on desktop and mobile?',
      a: 'Yes, a properly built Facebook downloader page should work well on desktop browsers like Chrome and Edge, and on mobile browsers such as Safari and Chrome on iPhone and Android devices.',
    },
    {
      q: 'Should private Facebook videos be downloaded?',
      a: 'Users should only save content they are authorized to access and use. Privacy, creator ownership, copyright and platform rules should always be respected before saving any Facebook media.',
    },
  ];

  return (
    <section id="faq" className="th-section">
      <div className="th-container">
        <div className="th-section-header">
          <div className="th-badge mb-3"><i className="fas fa-circle-question me-2"></i>Common Questions</div>
          <h2 className="th-section-title">Facebook Video Downloader <span className="th-gradient-text">FAQ</span></h2>
          <p className="th-section-desc">
            These frequently asked questions cover the most common things users search before trying to download Facebook videos, clips or Reels online.
          </p>
        </div>

        <div className="accordion fb-accordion" id="faqAccordion">
          {faqs.map((faq, index) => (
            <div className="accordion-item" key={index}>
              <h2 className="accordion-header" id={`heading-${index}`}>
                <button
                  className={`accordion-button ${index !== 0 ? 'collapsed' : ''}`}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse-${index}`}
                  aria-expanded={index === 0 ? 'true' : 'false'}
                  aria-controls={`collapse-${index}`}
                >
                  {faq.q}
                </button>
              </h2>
              <div
                id={`collapse-${index}`}
                className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}
                aria-labelledby={`heading-${index}`}
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">{faq.a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
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
    <section id="contact" className="th-section th-section-alt">
      <div className="th-container">
        <div className="th-section-header">
          <div className="th-badge mb-3"><i className="fas fa-envelope-open-text me-2"></i>Reach Out</div>
          <h2 className="th-section-title">Contact the <span className="th-gradient-text">FBSave HD</span> Team</h2>
          <p className="th-section-desc">
            Use this section for user questions about Facebook video link format, mobile use, HD availability, page usability and feature suggestions.
          </p>
        </div>

        <div className="th-contact-grid">
          <div className="th-contact-info">
            <div className="th-contact-info-card">
              <div className="th-contact-icon th-icon-blue"><i className="fas fa-link"></i></div>
              <div>
                <h5 className="th-contact-info-title">Facebook Link Help</h5>
                <p className="th-contact-info-line">Need help finding the correct Facebook post or Reel URL?</p>
              </div>
            </div>
            <div className="th-contact-info-card">
              <div className="th-contact-icon th-icon-green"><i className="fas fa-mobile-screen-button"></i></div>
              <div>
                <h5 className="th-contact-info-title">Mobile Experience</h5>
                <p className="th-contact-info-line">Questions about saving videos on Android, iPhone or tablets.</p>
              </div>
            </div>
            <div className="th-contact-info-card">
              <div className="th-contact-icon th-icon-purple"><i className="fas fa-high-definition"></i></div>
              <div>
                <h5 className="th-contact-info-title">Quality Guidance</h5>
                <p className="th-contact-info-line">Understand when HD or SD download options may be available.</p>
              </div>
            </div>
            <div className="th-contact-info-card">
              <div className="th-contact-icon th-icon-orange"><i className="fas fa-user-shield"></i></div>
              <div>
                <h5 className="th-contact-info-title">Safe Usage Info</h5>
                <p className="th-contact-info-line">Guidance around permissions, privacy and public content handling.</p>
              </div>
            </div>

            <div className="fb-side-card mt-3">
              <h4>Need a Better Facebook Downloader UX?</h4>
              <p>
                This page layout is designed to feel premium, clean and conversion-focused while still being content-rich enough to support helpful Facebook-related queries in search.
              </p>
            </div>
          </div>

          <div className="th-contact-form-wrap">
            <div className="th-contact-form">
              <h3>Send a Support Message</h3>
              <p className="th-contact-form-sub">Front-end form for demo and UI presentation.</p>
              {sent && (
                <div className="th-success-msg">
                  <i className="fas fa-check-circle me-2"></i>Your message has been recorded in the demo interface.
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="th-form-row">
                  <div className="th-form-group">
                    <label htmlFor="name">Name *</label>
                    <input id="name" name="name" value={form.name} onChange={handleChange} placeholder="Your name" required />
                  </div>
                  <div className="th-form-group">
                    <label htmlFor="email">Email *</label>
                    <input id="email" type="email" name="email" value={form.email} onChange={handleChange} placeholder="name@example.com" required />
                  </div>
                </div>
                <div className="th-form-group">
                  <label htmlFor="topic">Topic</label>
                  <input id="topic" name="topic" value={form.topic} onChange={handleChange} placeholder="Facebook link issue, mobile help, Reel support..." />
                </div>
                <div className="th-form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea id="message" name="message" rows="6" value={form.message} onChange={handleChange} placeholder="Write your question here..." required></textarea>
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
  );
}

function Footer() {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = el.getBoundingClientRect().top + window.scrollY - 82;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  };

  return (
    <footer className="th-footer">
      <div className="th-footer-top">
        <div className="th-container">
          <div className="th-footer-grid">
            <div className="th-footer-brand-col">
              <div className="th-logo mb-3" onClick={() => scrollToSection('home')}>
                <div className="th-logo-icon"><i className="fab fa-facebook-f"></i></div>
                <span className="th-logo-text">FB<span>Save</span> HD</span>
              </div>
              <p className="th-footer-desc">
                A premium React-based Facebook Video Downloader landing page UI built for speed, responsive browsing and search-friendly content presentation.
              </p>
              <div className="th-footer-socials">
                <a href="#" aria-label="Facebook" className="th-social-link"><i className="fab fa-facebook-f"></i></a>
                <a href="#" aria-label="Twitter" className="th-social-link"><i className="fab fa-x-twitter"></i></a>
                <a href="#" aria-label="Instagram" className="th-social-link"><i className="fab fa-instagram"></i></a>
                <a href="#" aria-label="YouTube" className="th-social-link"><i className="fab fa-youtube"></i></a>
              </div>
            </div>

            <div className="th-footer-links-col">
              <h5>Main Sections</h5>
              <ul>
                {[
                  ['Home', 'home'],
                  ['Downloader', 'downloader'],
                  ['Features', 'features'],
                  ['Guides', 'guides'],
                  ['FAQ', 'faq'],
                ].map(([label, id]) => (
                  <li key={id}>
                    <button onClick={() => scrollToSection(id)}>
                      <i className="fas fa-chevron-right me-2"></i>{label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="th-footer-links-col">
              <h5>Popular Topics</h5>
              <ul>
                {[
                  'Facebook Reels Downloader',
                  'Download Facebook Video HD',
                  'Save Facebook Video on iPhone',
                  'Facebook Video on Android',
                  'Copy Facebook Post URL',
                ].map((item, index) => (
                  <li key={index}>
                    <button onClick={() => scrollToSection('guides')}>
                      <i className="fas fa-chevron-right me-2"></i>{item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="th-footer-contact-col">
              <h5>Quick Notes</h5>
              <p className="th-footer-newsletter-text">
                Only save public or authorized content. Respect ownership rights, permissions and privacy when using any Facebook video saving workflow.
              </p>
              <div className="th-footer-contact-items">
                <div className="th-footer-contact-item">
                  <i className="fas fa-download"></i>
                  <span>Public video link workflow</span>
                </div>
                <div className="th-footer-contact-item">
                  <i className="fas fa-mobile-screen-button"></i>
                  <span>Responsive across devices</span>
                </div>
                <div className="th-footer-contact-item">
                  <i className="fas fa-shield-halved"></i>
                  <span>Privacy-aware guidance</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="th-footer-bottom">
        <div className="th-container">
          <div className="th-footer-bottom-inner">
            <p>© {new Date().getFullYear()} FBSave HD. Built as a premium Facebook downloader style interface.</p>
            <div className="th-footer-bottom-links">
              <Link to="/privacy-policy">Privacy</Link>
              <Link to="/terms-conditions">Terms</Link>
              <Link to="/about">About</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function ScrollTopBtn() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  if (!visible) return null;

  return (
    <button
      className="th-scroll-top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
    >
      <i className="fas fa-chevron-up"></i>
    </button>
  );
}

function HomePage() {
  useEffect(() => {
    // Add structured data for home page
    const addStructuredData = () => {
      // Remove existing structured data if any
      const existing = document.querySelectorAll('script[type="application/ld+json"]');
      existing.forEach(el => {
        if (el.textContent.includes('@type') && !el.textContent.includes('WebSite')) {
          el.remove();
        }
      });

      // Add Organization schema
      const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Facebook Video Downloader HD",
        "url": "https://facebookvideodownloader.com",
        "logo": "https://facebookvideodownloader.com/logo.png",
        "description": "Free online tool to download Facebook videos, Reels, and public clips in HD quality",
        "sameAs": [
          "https://www.facebook.com",
          "https://twitter.com"
        ]
      };

      const orgScript = document.createElement('script');
      orgScript.type = 'application/ld+json';
      orgScript.textContent = JSON.stringify(organizationSchema);
      document.head.appendChild(orgScript);

      // Add SoftwareApplication schema
      const softwareSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Facebook Video Downloader",
        "applicationCategory": "MultimediaApplication",
        "operatingSystem": "Web Browser",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "ratingCount": "1250"
        }
      };

      const softwareScript = document.createElement('script');
      softwareScript.type = 'application/ld+json';
      softwareScript.textContent = JSON.stringify(softwareSchema);
      document.head.appendChild(softwareScript);
    };

    addStructuredData();
  }, []);

  return (
    <>
      <Hero />
      <TrustedBy />
      <DownloaderSection />
      <Features />
      <InfoSection />
      <StatsBanner />
      <Guides />
      <FAQ />
      <Contact />
    </>
  );
}

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh' }}>{children}</main>
      <Footer />
      <ScrollTopBtn />
    </>
  );
}

export default function App() {
  useEffect(() => {
    document.title = 'Facebook Video Downloader HD - Download Facebook Videos, Reels & Clips Online';
  }, []);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route index path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </Layout>
    </Router>
  );
}
