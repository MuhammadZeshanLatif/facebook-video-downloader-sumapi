import React, { useEffect, useMemo, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import About from './pages/About';
import ContactPage from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import Disclaimer from './pages/Disclaimer';
import Blog from './pages/Blog';
import BlogPostTop10Tips from './pages/BlogPostTop10Tips';
import BlogPostHowToDownloadHDQuality from './pages/BlogPostHowToDownloadHDQuality';
import BlogPostIsItLegalFacebookVideos from './pages/BlogPostIsItLegalFacebookVideos';
import BlogPostMobileVsDesktop from './pages/BlogPostMobileVsDesktop';
import BlogPostFacebookReelsCompleteGuide from './pages/BlogPostFacebookReelsCompleteGuide';
import BlogPostUnderstandingFormatsQuality from './pages/BlogPostUnderstandingFormatsQuality';
import BlogPostTroubleshootingCommonDownloadIssues from './pages/BlogPostTroubleshootingCommonDownloadIssues';
import BlogPostPrivacySecurity from './pages/BlogPostPrivacySecurity';
import BlogPostBestPracticesSavingFacebookVideos from './pages/BlogPostBestPracticesSavingFacebookVideos';
import BlogPostWhySomeVideosDownloadSlower from './pages/BlogPostWhySomeVideosDownloadSlower';
import BlogPostFacebookCopyrightRules from './pages/BlogPostFacebookCopyrightRules';
import BlogPostReuseFacebookVideos from './pages/BlogPostReuseFacebookVideos';
import UserGuide from './pages/UserGuide';
import HomeSpanish from './pages/HomeSpanish';
import SEO from './components/SEO';
import { buildHomeJsonLd } from './data/pageSchemas';
import { normalizeFacebookPageUrl } from './utils/facebookEmbed';
import { triggerVideoDownload } from './utils/downloadVideo';

const LOGO_SRC = '/images/logo.webp';

function BrandLogo({ className = '', footer = false }) {
  return (
    <img
      src={LOGO_SRC}
      alt="FBSave HD — save Facebook videos and Reels in HD"
      className={`th-logo-img${footer ? ' th-logo-img--footer' : ''}${className ? ` ${className}` : ''}`}
      width={200}
      height={48}
      decoding="async"
      fetchPriority="high"
    />
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';
  const isSpanishPage = location.pathname.startsWith('/es/');
  const languageValue = isSpanishPage ? 'es' : 'en';

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
    { path: '/', label: isSpanishPage ? 'Inicio' : 'Home', id: 'home' },
    { path: '/blog', label: 'Blog', id: null },
    { path: '/privacy-policy', label: isSpanishPage ? 'Privacidad' : 'Privacy', id: null },
    { path: '/terms-conditions', label: isSpanishPage ? 'Terminos' : 'Terms', id: null },
    { path: '/disclaimer', label: isSpanishPage ? 'Aviso legal' : 'Disclaimer', id: null },
    { path: '/about', label: isSpanishPage ? 'Acerca de' : 'About', id: null },
    { path: '/contact', label: isSpanishPage ? 'Contacto' : 'Contact', id: 'contact' },
  ];

  const onLanguageChange = (e) => {
    const nextLanguage = e.target.value;
    if (nextLanguage === 'es') {
      navigate('/es/descargar-video-de-facebook');
    } else {
      navigate('/');
    }
    setMenuOpen(false);
  };

  return (
    <nav className={`th-navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="th-container">
        <div className="th-nav-inner">
          <Link to="/" className="th-logo" style={{ textDecoration: 'none', cursor: 'pointer' }}>
            <BrandLogo />
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
            <div className="th-lang-switch-wrap">
              <select
                id="site-language"
                className="th-lang-switch"
                value={languageValue}
                onChange={onLanguageChange}
                aria-label="Switch language"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
              </select>
            </div>
            {isHomePage ? (
              <>
                <Link to="/user-guide" className="th-btn th-btn-outline-sm">
                  {isSpanishPage ? 'Guia' : 'User Guide'}
                </Link>
                <button className="th-btn th-btn-primary-sm" onClick={() => scrollToSection('downloader')}>
                  {isSpanishPage ? 'Descargar ahora' : 'Download Now'}
                </button>
              </>
            ) : (
              <>
                <Link to="/user-guide" className="th-btn th-btn-outline-sm">
                  {isSpanishPage ? 'Guia' : 'User Guide'}
                </Link>
                <Link to="/" className="th-btn th-btn-primary-sm">
                  {isSpanishPage ? 'Descargar ahora' : 'Download Now'}
                </Link>
              </>
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
          <div className="th-mobile-lang-wrap">
            <select
              id="site-language-mobile"
              className="th-lang-switch th-lang-switch--mobile"
              value={languageValue}
              onChange={onLanguageChange}
              aria-label="Switch language"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
            </select>
          </div>
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
              {isSpanishPage ? 'Iniciar descarga' : 'Start Download'}
            </button>
          ) : (
            <Link to="/" className="th-btn th-btn-primary-sm w-100 mt-3" onClick={() => setMenuOpen(false)}>
              {isSpanishPage ? 'Iniciar descarga' : 'Start Download'}
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
            <h1 className="fb-mobile-title-hero-top">FBSave HD</h1>
            <form className="fb-mobile-search-form" onSubmit={submitHandler}>
              <div className="fb-mobile-input-full">
                <i className="fas fa-link" aria-hidden="true"></i>
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
                <strong>FBSave HD</strong>
              </div>
              <span className="fb-preview-badge">HD Ready</span>
            </div>

            <h1 className="fb-tablet-title-full">FBSave HD</h1>
            <form className="fb-preview-form" onSubmit={submitHandler}>
              <div className="fb-preview-input-wrap">
                <i className="fas fa-link" aria-hidden="true"></i>
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
            <h1 className="th-hero-title">
              Download <span className="th-gradient-text">Facebook Videos</span>, Reels & Public Clips in HD
            </h1>
            <p className="th-hero-desc">
              This Facebook video downloader helps you save public Facebook videos, Reels, and clips right in your browser. Copy the video link, paste it into the field below, pick HD or SD, and download—no app or login required.
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
                <span>Safe &amp; Secure</span>
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
                    <strong>FBSave HD</strong>
                  </div>
                  <span className="fb-preview-badge">HD Ready</span>
                </div>

                <h3 className="fb-mobile-title-hero">FBSave HD</h3>

                <form className="fb-preview-form" onSubmit={submitHandler}>
                  <label htmlFor="video-url" className="fb-preview-label fb-desktop-only">Paste Facebook video URL</label>
                  <div className="fb-preview-input-wrap">
                    <i className="fas fa-link" aria-hidden="true"></i>
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
    'Download Facebook Videos',
    'Facebook Reels Downloader',
    'Save Facebook Video HD',
    'Android & iPhone Friendly',
    'Desktop Browser Ready',
    'Safe & Secure Tool',
    'No App Installation',
    'Tool Guide Available',
  ];

  return (
    <div className="th-trusted">
      <div className="th-container">
        <p className="th-trusted-label">FBSave HD — download Facebook videos, Reels, and public clips in HD</p>
      </div>
      <div className="th-marquee-wrap">
        <div className="th-marquee">
          {[...items, ...items].map((item, index) => (
            <div key={index} className="th-marquee-item">
              <i className="fas fa-link th-marquee-icon" aria-hidden="true"></i>
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
  const [fetchedPageUrl, setFetchedPageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [videoData, setVideoData] = useState(null);
  const [error, setError] = useState(null);
  const [activeVideoUrl, setActiveVideoUrl] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayPauseIcon, setShowPlayPauseIcon] = useState(true);
  const [isMobileView, setIsMobileView] = useState(false);
  const [downloadKey, setDownloadKey] = useState(null);
  const videoRef = React.useRef(null);
  const playRetryRef = React.useRef(false);

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

  useEffect(() => {
    if (!activeVideoUrl || !videoRef.current) return;
    playRetryRef.current = false;
    videoRef.current.load();
  }, [activeVideoUrl]);

  const fetchVideoData = async (url) => {
    setLoading(true);
    setError(null);
    setVideoData(null);
    setActiveVideoUrl(null);
    setFetchedPageUrl('');
    setDownloadKey(null);

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
        setFetchedPageUrl(url.trim());
        setVideoData({
          items: videoItems,
          thumbnail: firstItem?.thumbnail,
          title: firstItem?.title || null,
        });
        // set active video URL (first item) for downloads / fallback player
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

  const getFreshVideoUrl = async (currentUrl, quality = '') => {
    if (!fetchedPageUrl) return currentUrl;
    try {
      const encodedUrl = encodeURIComponent(fetchedPageUrl);
      const apiUrl = `https://facebookvideo-downloader-backend.vercel.app/api/meta/download?url=${encodedUrl}`;
      const response = await fetch(apiUrl);
      const data = await response.json();

      let videoItems = null;
      if (data.success && data.data) {
        if (data.data.data && Array.isArray(data.data.data) && data.data.data.length > 0) {
          videoItems = data.data.data;
        } else if (Array.isArray(data.data) && data.data.length > 0) {
          videoItems = data.data;
        } else if (data.data.url || data.data.thumbnail || data.data.hd || data.data.sd) {
          videoItems = [data.data];
        }
      }

      if (!videoItems?.length) return currentUrl;

      const q = String(quality || '').toLowerCase();
      const byQuality =
        q && q !== 'video'
          ? videoItems.find((item) => String(item?.resolution || '').toLowerCase().includes(q))
          : null;
      const byUrl = currentUrl ? videoItems.find((item) => item?.url && item.url === currentUrl) : null;
      return byQuality?.url || byUrl?.url || videoItems[0]?.url || currentUrl;
    } catch {
      return currentUrl;
    }
  };

  const handlePlaySelection = async (targetUrl, quality = '') => {
    if (!targetUrl || !fetchedPageUrl) {
      setActiveVideoUrl(targetUrl || null);
      return;
    }
    const freshUrl = await getFreshVideoUrl(targetUrl, quality);
    setActiveVideoUrl(freshUrl || targetUrl);
    setIsPlaying(false);
    setShowPlayPauseIcon(true);
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play().catch(() => {});
      }
    }, 120);
  };

  const handleDownload = async (downloadUrl, quality = '', buttonKey = 'main') => {
    if (!downloadUrl || downloadKey !== null) return;
    const stem = `facebook-video-${quality || 'download'}`;
    setDownloadKey(buttonKey);
    const started = Date.now();
    try {
      const freshUrl = await getFreshVideoUrl(downloadUrl, quality);
      await triggerVideoDownload(freshUrl || downloadUrl, stem);
    } catch (error) {
      console.error('Download error:', error);
    } finally {
      const minMs = 900;
      const elapsed = Date.now() - started;
      if (elapsed < minMs) {
        await new Promise((r) => setTimeout(r, minMs - elapsed));
      }
      setDownloadKey(null);
    }
  };

  return (
    <section id="downloader" className="th-section">
      <div className="th-container">
        <div className="th-section-header">
          {isMobileView ? (
            <h1 className="th-section-title fb-section-title-responsive">Facebook <span className="th-gradient-text">Video Downloader</span> Tool UI</h1>
          ) : (
            <h2 className="th-section-title fb-section-title-responsive">Facebook <span className="th-gradient-text">Video Downloader</span> Tool UI</h2>
          )}
          <p className="th-section-desc">
            Paste a public Facebook video URL below. This Facebook video downloader reads the link and lists HD and SD options based on what Facebook exposes for that post.
          </p>
        </div>

        <div className="fb-download-panel">
          <div className="row g-4 align-items-stretch">
            <div className="col-lg-12">
              <div className="fb-tool-card">
                <h3 className="fb-mobile-hide">Paste Facebook Link</h3>
                <p className="fb-mobile-hide">
                  Copy the video URL from Facebook, paste it here, and choose the video quality you prefer. The system then processes the link and generates download options based on the original video quality available.
                </p>
                <form onSubmit={handleSubmit}>
                  <div className="fb-large-input-wrap">
                    <i className="fas fa-link" aria-hidden="true"></i>
                    <input
                      type="url"
                      placeholder="Paste Facebook video, post or Reel URL here"
                      value={link}
                      onChange={(e) => {
                        setLink(e.target.value);
                        setError(null);
                        setVideoData(null);
                        setFetchedPageUrl('');
                        setActiveVideoUrl(null);
                        setDownloadKey(null);
                      }}
                      disabled={loading}
                    />
                  </div>
                  <h3 className="fb-mobile-title">FBSave HD</h3>
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
                      setFetchedPageUrl('');
                      setActiveVideoUrl(null);
                      setDownloadKey(null);
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
                                key={activeVideoUrl}
                                ref={videoRef}
                                src={activeVideoUrl}
                                poster={videoData.thumbnail || videoData.items[0]?.thumbnail || undefined}
                                controls
                                muted
                                playsInline
                                preload="metadata"
                                referrerPolicy="no-referrer"
                                style={{ width: '100%', maxHeight: '420px', background: '#0f172a', display: 'block' }}
                                onPlay={() => {
                                  setIsPlaying(true);
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
                                onClick={() => {
                                  if (!videoRef.current) return;
                                  if (videoRef.current.paused) {
                                    videoRef.current.play().catch(() => {});
                                  } else {
                                    videoRef.current.pause();
                                  }
                                }}
                                onError={async () => {
                                  if (playRetryRef.current || !activeVideoUrl) return;
                                  playRetryRef.current = true;
                                  const refreshed = await getFreshVideoUrl(activeVideoUrl, 'Video');
                                  if (refreshed && refreshed !== activeVideoUrl) {
                                    setActiveVideoUrl(refreshed);
                                  }
                                }}
                                onMouseEnter={() => {
                                  if (isPlaying) {
                                    setShowPlayPauseIcon(true);
                                  }
                                }}
                                onMouseLeave={() => {
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
                                onClick={() => handlePlaySelection(videoData.items[0]?.url, 'Video')}
                              >
                                <i className="fas fa-play"></i>
                              </button>
                            </>
                          )}
                        </div>
                      )}
                      {normalizeFacebookPageUrl(fetchedPageUrl) ? (
                        <div className="fb-watch-on-fb-row">
                          <a
                            className="th-btn th-btn-outline fb-watch-on-fb-link"
                            href={normalizeFacebookPageUrl(fetchedPageUrl)}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Opens this video on Facebook in a new tab"
                          >
                            <i className="fas fa-up-right-from-square me-2" aria-hidden="true"></i>
                            Watch on Facebook
                          </a>
                        </div>
                      ) : null}
                    </div>

                    {(() => {
                      const mainUrl = activeVideoUrl || videoData.items[0]?.url;
                      if (!mainUrl) return null;
                      return (
                        <div className="fb-main-actions">
                          <button
                            type="button"
                            className="th-btn th-btn-primary fb-download-btn"
                            disabled={downloadKey !== null}
                            aria-busy={downloadKey === 'main'}
                            onClick={() => handleDownload(mainUrl, 'Video', 'main')}
                          >
                            {downloadKey === 'main' ? (
                              <>
                                <i className="fas fa-spinner fa-spin me-2" aria-hidden="true"></i>
                                Downloading video…
                              </>
                            ) : (
                              <>
                                <i className="fas fa-download me-2" aria-hidden="true"></i>
                                Download Video
                              </>
                            )}
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
                                onClick={() => handlePlaySelection(item.url, qualityLabel)}
                                style={{ padding: '8px 16px', fontSize: '0.85rem' }}
                              >
                                <i className="fas fa-play me-2"></i>Play {qualityLabel}
                              </button>
                              <button
                                type="button"
                                className="th-btn th-btn-primary fb-download-btn"
                                disabled={downloadKey !== null}
                                aria-busy={downloadKey === `opt-${index}`}
                                onClick={() => handleDownload(item.url, qualityLabel, `opt-${index}`)}
                                style={{ padding: '8px 16px', fontSize: '0.85rem' }}
                              >
                                {downloadKey === `opt-${index}` ? (
                                  <>
                                    <i className="fas fa-spinner fa-spin me-2" aria-hidden="true"></i>
                                    Downloading…
                                  </>
                                ) : (
                                  <>
                                    <i className="fas fa-download me-2" aria-hidden="true"></i>
                                    Download {qualityLabel}
                                  </>
                                )}
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
                <h4>Security and User Privacy</h4>
                <ul className="fb-check-list">
                  <li><i className="fas fa-check-circle"></i>Videos are saved directly to the user's device</li>
                  <li><i className="fas fa-check-circle"></i>No copies of downloaded videos are stored</li>
                  <li><i className="fas fa-check-circle"></i>No account login is required</li>
                  <li><i className="fas fa-check-circle"></i>Works with publicly accessible videos only</li>
                  <li><i className="fas fa-check-circle"></i>FBSave HD does not store videos on its servers</li>
                </ul>

                <div className="fb-note-box">
                  <i className="fas fa-circle-info"></i>
                  <p>
                    As a browser-based Facebook video downloader, FBSave HD reads your public link and offers files served from Facebook—without storing copies on our side.
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
      title: 'Fast Link Processing',
      desc: 'FBSave HD quickly processes public Facebook links and shows download options within seconds, so you can save videos without long waits.',
      tags: ['Speed', 'UX'],
    },
    {
      icon: 'fas fa-mobile-screen-button',
      color: 'green',
      title: 'Mobile Responsive Design',
      desc: 'Most saves happen on phones. The layout adapts to small and large screens and works smoothly on Android, iPhone, tablet, and desktop browsers.',
      tags: ['Responsive', 'Mobile'],
    },
    {
      icon: 'fas fa-sliders',
      color: 'purple',
      title: 'HD and SD Quality Options',
      desc: 'The downloader allows users to choose between HD and SD video quality depending on the source video. HD is suitable for larger screens, while SD creates smaller files that download faster.',
      tags: ['HD', 'SD'],
    },
    {
      icon: 'fas fa-film',
      color: 'orange',
      title: 'Facebook Reels Support',
      desc: 'Short-form clips are huge on Facebook. You can save public Reels whenever the share link opens without restrictions.',
      tags: ['Reels', 'Short Video'],
    },
    {
      icon: 'fas fa-link',
      color: 'pink',
      title: 'Simple Copy-Paste Workflow',
      desc: 'The tool uses a simple copy-paste process. Users copy the Facebook video link, paste it into the downloader, and select their download option.',
      tags: ['Paste URL', 'Easy Use'],
    },
    {
      icon: 'fas fa-shield-halved',
      color: 'teal',
      title: 'Safe and Informational Use',
      desc: 'The page provides helpful information about downloading public videos responsibly and respecting content ownership.',
      tags: ['Safety', 'Trust'],
    },
    {
      icon: 'fas fa-list-check',
      color: 'indigo',
      title: 'Structured Guide and Helpful Content',
      desc: 'Clear instructions, tips, and FAQs help users understand how the downloader works and how to solve common issues when downloading Facebook videos.',
      tags: ['Guide', 'FAQ'],
    },
    {
      icon: 'fas fa-laptop-code',
      color: 'red',
      title: 'Browser-Based Tool',
      desc: 'Everything runs in your browser—no software, extensions, or apps required to grab a public video.',
      tags: ['Browser Tool', 'Online'],
    },
  ];

  return (
    <section id="features" className="th-section th-section-alt">
      <div className="th-container">
        <div className="th-section-header">
          <h2 className="th-section-title">Why Choose <span className="th-gradient-text">FBSave HD</span></h2>
          <p className="th-section-desc">
            FBSave HD is built around a simple paste-and-download flow and works smoothly on phones, tablets, laptops, and desktop browsers.
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
      title: 'Videos shared on Facebook timeline posts',
      desc: 'Copy the link from any public timeline post and paste it here to save the clip in HD or SD, depending on what Facebook published.',
    },
    {
      icon: 'fas fa-flag',
      title: 'Media uploaded on Facebook pages',
      desc: 'Public Page uploads work the same way: copy the watch link from the Page and run it through the tool.',
    },
    {
      icon: 'fas fa-users',
      title: 'Videos shared in public Facebook groups',
      desc: 'Public group posts are supported when both the group and the clip are visible without logging in—always verify access before copying the URL.',
    },
    {
      icon: 'fas fa-film',
      title: 'Facebook Reels and short-form videos',
      desc: 'Reels and other short public clips from creators can be saved the same way as standard video posts.',
    },
  ];

  return (
    <section className="th-section">
      <div className="th-container">
        <div className="th-about-grid fb-info-grid">
          <div className="th-about-content">
            <h2 className="th-section-title text-start">
              Facebook Video Content You Can <span className="th-gradient-text">Download</span>
            </h2>
            <p className="th-about-text">
              FBSave HD covers the main kinds of public Facebook content. If the post is open on the web, you can usually save it here.
            </p>
            <p className="th-about-text">
              Users commonly download videos shared on Facebook timeline posts, media uploaded on Facebook pages, videos shared in public Facebook groups, Facebook Reels and short-form videos, and public video clips shared by creators.
            </p>
            <p className="th-about-text">
              The tool also works for videos opened through mobile browsers on Android or iPhone and videos viewed in desktop browsers on Windows or Mac.
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
    { icon: 'fas fa-film', num: 'HD', label: 'Quality Support' },
    { icon: 'fas fa-mobile-screen-button', num: 'All', label: 'Major Devices' },
    { icon: 'fas fa-video', num: 'Reels', label: 'Public Clips' },
    { icon: 'fas fa-shield', num: 'Free', label: 'No Registration' },
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
      desc: 'Open Facebook and locate the video or reel you want to download.',
    },
    {
      icon: 'fas fa-copy',
      num: '02',
      title: 'Copy the Video Link',
      desc: 'Copy the video link from the Facebook post.',
    },
    {
      icon: 'fas fa-paste',
      num: '03',
      title: 'Paste in the Downloader',
      desc: 'Paste the copied link into the downloader field on this page.',
    },
    {
      icon: 'fas fa-download',
      num: '04',
      title: 'Choose Quality & Download',
      desc: 'Choose the video quality option you prefer. HD works best for larger displays, while SD downloads faster and uses less storage. Click the Download Video button and save the file to your device.',
    },
  ];

  return (
    <section id="guides" className="th-section th-section-alt">
      <div className="th-container">
        <div className="th-section-header">
          <h2 className="th-section-title">How to Download a <span className="th-gradient-text">Facebook Video or Reel</span></h2>
          <p className="th-section-desc">
            Use FBSave HD—a simple Facebook video downloader for public links. After saving, you can watch offline whenever you like.
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
                <h3>Tips for Better Download Results</h3>
                <p>
                  To avoid errors and get stable downloads, it is helpful to follow these tips when using the downloader.
                </p>
                <ul className="fb-bullet-list">
                  <li>Copy the complete public Facebook video URL instead of shortened or shared links.</li>
                  <li>If the link does not work correctly, open the video in a browser view instead of the Facebook app and copy the link again.</li>
                  <li>Use modern browsers such as Chrome, Safari, Edge, or Firefox for better compatibility.</li>
                  <li>Choose SD quality if your internet speed is slow or storage space is limited.</li>
                  <li>Select HD quality when the original Facebook video supports higher resolution.</li>
                  <li>Make sure the video is publicly accessible, since private posts cannot be processed.</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="fb-content-card">
                <h3>Facebook Video Content You Can Download</h3>
                <p>
                  FBSave HD handles the same public content types listed above whenever the post is visible without special permissions.
                </p>
                <ul className="fb-bullet-list">
                  <li>Videos shared on Facebook timeline posts</li>
                  <li>Media uploaded on Facebook pages</li>
                  <li>Videos shared in public Facebook groups</li>
                  <li>Facebook Reels and short-form videos</li>
                  <li>Public video clips shared by creators</li>
                  <li>Videos opened through mobile browsers on Android or iPhone</li>
                  <li>Videos viewed in desktop browsers on Windows or Mac</li>
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
      q: 'Is FBSave HD free to use?',
      a: 'Yes. FBSave HD is free, with no registration or subscription—just paste a public link and download.',
    },
    {
      q: 'Can I download Facebook reels with this tool?',
      a: 'Yes. Copy any public Reel link, paste it into the field, and pick the quality option that fits your device.',
    },
    {
      q: 'Do I need to install any software?',
      a: 'No. Everything runs in your browser, so you do not need extra apps or extensions.',
    },
    {
      q: 'Can I download Facebook videos on my phone?',
      a: 'Yes. Open this site in Chrome, Safari, or another mobile browser on Android or iPhone.',
    },
    {
      q: 'Why is my Facebook video not downloading?',
      a: 'This usually happens when the video is private, the link is incomplete, or the post has restricted access. Make sure you copy the full public video link.',
    },
    {
      q: 'Where are downloaded videos saved?',
      a: 'Downloaded videos are stored in your device\'s download folder or the location selected by your browser.',
    },
    {
      q: 'Does the downloader store my videos?',
      a: 'No. We do not keep copies of your videos—files go straight to your device downloads folder.',
    },
    {
      q: 'What links are supported by this tool?',
      a: 'FBSave HD supports publicly accessible Facebook video and Reel links only.',
    },
  ];

  return (
    <section id="faq" className="th-section">
      <div className="th-container">
        <div className="th-section-header">
          <h2 className="th-section-title">Frequently Asked <span className="th-gradient-text">Questions</span></h2>
          <p className="th-section-desc">
            Common questions about using this Facebook video downloader for public Facebook videos, clips, and Reels online.
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
          <h2 className="th-section-title">Contact the <span className="th-gradient-text">FBSave HD</span> Team</h2>
          <p className="th-section-desc">
            Questions about links, mobile saving, HD vs SD, or how the tool works? Send us a note—we are happy to help.
          </p>
        </div>

        <div className="th-contact-grid">
          <div className="th-contact-info">
            <div className="th-contact-info-card">
              <div className="th-contact-icon th-icon-blue"><i className="fas fa-link"></i></div>
              <div>
                <h5 className="th-contact-info-title">Facebook Link Help</h5>
                <p className="th-contact-info-line">Need help copying the right Facebook video or Reel URL for FBSave HD?</p>
              </div>
            </div>
            <div className="th-contact-info-card">
              <div className="th-contact-icon th-icon-green"><i className="fas fa-mobile-screen-button"></i></div>
              <div>
                <h5 className="th-contact-info-title">Mobile Experience</h5>
                <p className="th-contact-info-line">Questions about saving Facebook videos on Android, iPhone, or tablet browsers.</p>
              </div>
            </div>
            <div className="th-contact-info-card">
              <div className="th-contact-icon th-icon-purple"><i className="fas fa-sliders"></i></div>
              <div>
                <h5 className="th-contact-info-title">Quality Guidance</h5>
                <p className="th-contact-info-line">Understand when HD or SD download options are available depending on the original Facebook video quality.</p>
              </div>
            </div>
            <div className="th-contact-info-card">
              <div className="th-contact-icon th-icon-orange"><i className="fas fa-user-shield"></i></div>
              <div>
                <h5 className="th-contact-info-title">Safe Usage Info</h5>
                <p className="th-contact-info-line">Guidance around copyright, permissions, privacy, and responsible use of publicly accessible Facebook content.</p>
              </div>
            </div>

            <div className="fb-side-card mt-3">
              <h4>About FBSave HD</h4>
              <p>
                FBSave HD exists to make saving public Facebook videos and Reels for offline viewing straightforward, with clear respect for privacy and creator rights.
              </p>
            </div>
          </div>

          <div className="th-contact-form-wrap">
            <div className="th-contact-form">
              <h3>Send a Support Message</h3>
              <p className="th-contact-form-sub">Use this form for support questions, feedback, or policy-related requests.</p>
              {sent && (
                <div className="th-success-msg">
                  <i className="fas fa-check-circle me-2"></i>Thanks. Your message has been submitted successfully.
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
  const location = useLocation();
  const isSpanishPage = location.pathname.startsWith('/es/');

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
              <Link to="/" className="th-logo th-logo-footer mb-3">
                <BrandLogo footer />
              </Link>
              <p className="th-footer-desc">
                {isSpanishPage
                  ? 'Esta herramienta te ayuda a guardar videos publicos y Reels de Facebook para ver offline con una interfaz simple y rapida.'
                  : 'FBSave HD helps you save public Facebook videos and Reels for offline viewing with a simple interface, quick link processing, and support for common phones and browsers.'}
              </p>
              <div className="th-footer-socials">
                <a href="#" aria-label="Twitter" className="th-social-link"><i className="fab fa-x-twitter"></i></a>
                <a href="https://www.instagram.com/fbvideodownloaders2026" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="th-social-link"><i className="fab fa-instagram"></i></a>
                <a href="https://www.youtube.com/@FacebookVideoDownloader-n8h" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="th-social-link"><i className="fab fa-youtube"></i></a>
                <a href="https://www.pinterest.com/facebookvideod/" target="_blank" rel="noopener noreferrer" aria-label="Pinterest" className="th-social-link"><i className="fab fa-pinterest-p"></i></a>
                <a href="https://www.facebook.com/profile.php?id=61573277168900" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="th-social-link"><i className="fab fa-facebook-f"></i></a>
              </div>
            </div>

            <div className="th-footer-links-col">
              <h5>{isSpanishPage ? 'Secciones principales' : 'Main Sections'}</h5>
              <ul>
                {[
                  [isSpanishPage ? 'Inicio' : 'Home', 'home'],
                  [isSpanishPage ? 'Downloader' : 'Downloader', 'downloader'],
                  [isSpanishPage ? 'Funciones' : 'Features', 'features'],
                  [isSpanishPage ? 'Guia' : 'Guides', 'guides'],
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
              <h5>{isSpanishPage ? 'Temas populares' : 'Popular Topics'}</h5>
              <ul>
                {[
                  isSpanishPage ? 'Downloader de Reels de Facebook' : 'Facebook Reels Downloader',
                  isSpanishPage ? 'Descargar video de Facebook HD' : 'Download Facebook Video HD',
                  isSpanishPage ? 'Guardar video de Facebook en iPhone' : 'Save Facebook Video on iPhone',
                  isSpanishPage ? 'Video de Facebook en Android' : 'Facebook Video on Android',
                  isSpanishPage ? 'Copiar URL de publicacion de Facebook' : 'Copy Facebook Post URL',
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
              <h5>{isSpanishPage ? 'Notas rapidas' : 'Quick Notes'}</h5>
              <p className="th-footer-newsletter-text">
                {isSpanishPage
                  ? 'Este sitio es independiente y no esta afiliado a Facebook o Meta. Usalo para descargas personales y responsables.'
                  : 'FBSave HD is independent and not affiliated with Facebook or Meta. Use it for personal, rights-respecting downloads only.'}
              </p>
              <div className="th-footer-contact-items">
                <div className="th-footer-contact-item">
                  <i className="fas fa-download"></i>
                  <span>{isSpanishPage ? 'Gratis y sin registro' : 'Free to use, no registration'}</span>
                </div>
                <div className="th-footer-contact-item">
                  <i className="fas fa-mobile-screen-button"></i>
                  <span>{isSpanishPage ? 'Compatible con Android e iPhone' : 'Android &amp; iPhone Friendly'}</span>
                </div>
                <div className="th-footer-contact-item">
                  <i className="fas fa-shield-halved"></i>
                  <span>{isSpanishPage ? 'Seguro y confiable' : 'Safe &amp; Secure'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="th-footer-bottom">
        <div className="th-container">
          <div className="th-footer-bottom-inner">
            <p>
              © {new Date().getFullYear()} fbvideodownloaders. {isSpanishPage
                ? 'Herramienta independiente sin conexion con Facebook o el grupo Meta.'
                : 'An independent tool with no connection to Facebook or the Meta group.'}
            </p>
            <div className="th-footer-bottom-links">
              <Link to="/user-guide">{isSpanishPage ? 'Guia' : 'User Guide'}</Link>
              <Link to="/privacy-policy">{isSpanishPage ? 'Privacidad' : 'Privacy'}</Link>
              <Link to="/terms-conditions">{isSpanishPage ? 'Terminos' : 'Terms'}</Link>
              <Link to="/disclaimer">{isSpanishPage ? 'Aviso legal' : 'Disclaimer'}</Link>
              <Link to="/about">{isSpanishPage ? 'Acerca de' : 'About'}</Link>
              <Link to="/es/descargar-video-de-facebook">ES</Link>
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
  return (
    <>
      <SEO
        title="Download Facebook Videos & Reels in HD - FB Video Downloader"
        description="Download public Facebook videos and Reels in HD or SD online for free. Paste the link, choose quality, and save on Android, iPhone, or PC instantly."
        keywords="facebook video downloader, download facebook videos, fb video downloader, facebook reels downloader, save facebook video online, download fb video hd, free facebook downloader, download fb reels, facebook video saver, fb video download"
        ogUrl="https://fbvideodownloaders.com/"
        jsonLd={buildHomeJsonLd()}
      />
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

function FloatingSocials() {
  const socials = [
    { href: 'https://www.youtube.com/@FacebookVideoDownloader-n8h', icon: 'fab fa-youtube', label: 'YouTube', cls: 'th-float-social--yt' },
    { href: 'https://www.instagram.com/fbvideodownloaders2026', icon: 'fab fa-instagram',  label: 'Instagram', cls: 'th-float-social--ig' },
    { href: 'https://x.com/',             icon: 'fab fa-x-twitter',  label: 'X / Twitter', cls: 'th-float-social--tw' },
    { href: 'https://www.pinterest.com/facebookvideod/', icon: 'fab fa-pinterest-p', label: 'Pinterest', cls: 'th-float-social--pt' },
    { href: 'https://www.facebook.com/profile.php?id=61573277168900', icon: 'fab fa-facebook-f', label: 'Facebook', cls: 'th-float-social--fb' },
  ];

  return (
    <div className="th-float-socials" aria-label="Follow us on social media">
      {socials.map(({ href, icon, label, cls }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`th-float-social ${cls}`}
          aria-label={label}
          title={label}
        >
          <span className="th-float-social-icon" aria-hidden="true">
            <i className={icon}></i>
          </span>
          <span className="th-float-social-label">{label}</span>
        </a>
      ))}
    </div>
  );
}

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh' }}>{children}</main>
      <Footer />
      <ScrollTopBtn />
      <FloatingSocials />
    </>
  );
}

export default function App() {
  useEffect(() => {
    document.title = 'Download Facebook Videos & Reels HD Free | FBSave HD';
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
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/is-it-legal-to-download-facebook-videos-complete-guide" element={<BlogPostIsItLegalFacebookVideos />} />
          <Route path="/blog/facebook-video-downloader-mobile-vs-desktop-which-is-better" element={<BlogPostMobileVsDesktop />} />
          <Route path="/blog/facebook-reels-complete-download-guide-hd-mobile-desktop" element={<BlogPostFacebookReelsCompleteGuide />} />
          <Route path="/blog/understanding-facebook-video-formats-and-quality" element={<BlogPostUnderstandingFormatsQuality />} />
          <Route path="/blog/how-to-download-facebook-videos-in-hd-quality-complete-guide" element={<BlogPostHowToDownloadHDQuality />} />
          <Route path="/blog/top-10-tips-facebook-video-downloading" element={<BlogPostTop10Tips />} />
          <Route path="/blog/troubleshooting-common-download-issues-step-by-step-guide" element={<BlogPostTroubleshootingCommonDownloadIssues />} />
          <Route path="/blog/facebook-video-downloader-privacy-and-security-safe-or-risky" element={<BlogPostPrivacySecurity />} />
          <Route path="/blog/best-practices-for-saving-facebook-videos" element={<BlogPostBestPracticesSavingFacebookVideos />} />
          <Route path="/blog/why-some-videos-download-slower-than-others" element={<BlogPostWhySomeVideosDownloadSlower />} />
          <Route path="/blog/facebook-copyright-rules-explained-simple-guide-2026" element={<BlogPostFacebookCopyrightRules />} />
          <Route path="/blog/how-to-reuse-facebook-videos-for-content-creation-easy-guide" element={<BlogPostReuseFacebookVideos />} />
          <Route path="/user-guide" element={<UserGuide />} />
          <Route path="/es/descargar-video-de-facebook" element={<HomeSpanish />} />
        </Routes>
      </Layout>
    </Router>
  );
}
