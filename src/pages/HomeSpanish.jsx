import React, { useEffect, useState } from 'react';
import SEO from '../components/SEO';
import { buildHomeEsJsonLd } from '../data/pageSchemas';
import { normalizeFacebookPageUrl } from '../utils/facebookEmbed';
import { triggerVideoDownload } from '../utils/downloadVideo';

function HeroEs() {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState('idle');
  const [loading, setLoading] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!url.trim()) {
      setStatus('error');
      return;
    }
    setLoading(true);
    setStatus('loading');
    window.dispatchEvent(new CustomEvent('fb-download', { detail: { url } }));
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

      <div className="fb-mobile-search-top">
        <div className="fb-mobile-fullscreen">
          <div className="fb-mobile-card-full">
            <h1 className="fb-mobile-title-hero-top">Descargar video de facebook</h1>
            <form className="fb-mobile-search-form" onSubmit={submitHandler}>
              <div className="fb-mobile-input-full">
                <i className="fas fa-link" aria-hidden="true"></i>
                <input
                  type="url"
                  placeholder="Pega aqui URL publica de Facebook"
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
                    <span>Procesando...</span>
                  </>
                ) : (
                  <>
                    <i className="fas fa-magnifying-glass"></i>
                    <span>Analizar enlace</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="fb-tablet-hero">
        <div className="fb-tablet-fullscreen">
          <div className="fb-tablet-card-full">
            <div className="fb-preview-top">
              <div className="fb-preview-brand">
                <span className="fb-preview-dot"></span>
                <strong>Downloader ES</strong>
              </div>
              <span className="fb-preview-badge">HD Ready</span>
            </div>

            <h1 className="fb-tablet-title-full">Descargar video de facebook</h1>
            <form className="fb-preview-form" onSubmit={submitHandler}>
              <div className="fb-preview-input-wrap">
                <i className="fas fa-link" aria-hidden="true"></i>
                <input
                  id="video-url-tablet-es"
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
                {loading ? <><i className="fas fa-spinner fa-spin me-2"></i>Procesando...</> : <><i className="fas fa-cloud-arrow-down me-2"></i>Descargar video</>}
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="th-container">
        <div className="th-hero-grid">
          <div className="th-hero-content">
            <h1 className="th-hero-title">
              <span className="th-gradient-text">Descargar video de facebook</span> y Reels en HD
            </h1>
            <p className="th-hero-desc">
              Esta pagina mantiene exactamente la misma estructura del home en ingles y adapta el contenido para busquedas en espanol.
              Si necesitas descargar video de facebook desde Android, iPhone o PC, pega tu enlace publico y sigue el flujo guiado.
            </p>

            <div className="th-hero-stats">
              <div className="th-hero-stat"><span className="th-stat-num">HD</span><span className="th-stat-label">Calidad</span></div>
              <div className="th-hero-stat-divider"></div>
              <div className="th-hero-stat"><span className="th-stat-num">Reels</span><span className="th-stat-label">Publicos</span></div>
              <div className="th-hero-stat-divider"></div>
              <div className="th-hero-stat"><span className="th-stat-num">All</span><span className="th-stat-label">Dispositivos</span></div>
            </div>

            <div className="th-hero-btns">
              <button className="th-btn th-btn-primary" onClick={() => scrollToSection('downloader')}>
                <i className="fas fa-download me-2"></i>Abrir downloader
              </button>
              <button className="th-btn th-btn-outline" onClick={() => scrollToSection('guides')}>
                <i className="fas fa-circle-play me-2"></i>Ver pasos
              </button>
            </div>
          </div>

          <div className="th-hero-visual">
            <div className="th-hero-img-wrap fb-tool-preview">
              <div className="th-hero-img-bg"></div>
              <div className="fb-preview-card">
                <div className="fb-preview-top fb-desktop-only">
                  <div className="fb-preview-brand">
                    <span className="fb-preview-dot"></span>
                <strong>Downloader ES</strong>
                  </div>
                  <span className="fb-preview-badge">HD Ready</span>
                </div>

                <h3 className="fb-mobile-title-hero">Descargar video de facebook</h3>
                <form className="fb-preview-form" onSubmit={submitHandler}>
                  <label htmlFor="video-url-es" className="fb-preview-label fb-desktop-only">Pega URL de Facebook</label>
                  <div className="fb-preview-input-wrap">
                    <i className="fas fa-link" aria-hidden="true"></i>
                    <input
                      id="video-url-es"
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
                    {loading ? <><i className="fas fa-spinner fa-spin me-2"></i>Procesando...</> : <><i className="fas fa-cloud-arrow-down me-2"></i>Obtener opciones de descarga</>}
                  </button>
                </form>

                <div className={`fb-preview-result ${status}`}>
                  {status === 'idle' && <div className="fb-result-box neutral"><i className="fas fa-link"></i><div><strong>Pega un enlace publico de Facebook</strong><p>Los enlaces de videos, publicaciones y Reels suelen iniciar el flujo.</p></div></div>}
                  {status === 'loading' && <div className="fb-result-box neutral"><i className="fas fa-spinner fa-spin"></i><div><strong>Procesando tu enlace...</strong><p>Espera mientras obtenemos los datos del video.</p></div></div>}
                  {status === 'error' && <div className="fb-result-box danger"><i className="fas fa-circle-exclamation"></i><div><strong>Ingresa una URL valida de Facebook</strong><p>Agrega un enlace publico de video o Reel para continuar.</p></div></div>}
                  {status === 'ready' && <div className="fb-result-box success"><i className="fas fa-circle-check"></i><div><strong>Enlace procesado correctamente</strong><p>Desplazate hacia abajo para ver opciones de descarga.</p></div></div>}
                </div>

                <div className="fb-quality-list">
                  <div className="fb-quality-item">
                    <div>
                      <strong>Descarga HD</strong>
                      <span>Ideal para pantallas grandes y mejor claridad</span>
                    </div>
                    <button type="button">HD</button>
                  </div>
                  <div className="fb-quality-item">
                    <div>
                      <strong>Descarga SD</strong>
                      <span>Archivo mas liviano para guardar rapido</span>
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
                  <div className="th-float-title">Videos Publicos</div>
                  <div className="th-float-sub">Posts, clips y timelines</div>
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
                  <div className="th-float-title">Soporte Reels</div>
                  <div className="th-float-sub">Clips cortos de Facebook</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustedByEs() {
  const items = [
    'Descargar video de facebook',
    'Downloader de Reels',
    'Guardar video en HD',
    'Android y iPhone',
    'Sin instalar app',
    'Compatible con PC',
  ];
  return (
    <div className="th-trusted">
      <div className="th-container">
        <p className="th-trusted-label">Descargar video de facebook en espanol para usuarios de LATAM y Espana</p>
      </div>
      <div className="th-marquee-wrap">
        <div className="th-marquee">
          {[...items, ...items].map((item, index) => (
            <div key={index} className="th-marquee-item"><i className="fas fa-link th-marquee-icon" aria-hidden="true"></i><span>{item}</span></div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DownloaderSectionEs() {
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

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobileView(window.innerWidth <= 991);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

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
      let videoItems = null;
      if (data.success && data.data) {
        if (data.data.data && Array.isArray(data.data.data) && data.data.data.length > 0) videoItems = data.data.data;
        else if (Array.isArray(data.data) && data.data.length > 0) videoItems = data.data;
        else if (data.data.url || data.data.thumbnail || data.data.hd || data.data.sd) videoItems = [data.data];
      }
      if (videoItems && videoItems.length > 0) {
        const firstItem = videoItems[0];
        setFetchedPageUrl(url.trim());
        setVideoData({
          items: videoItems,
          thumbnail: firstItem?.thumbnail,
          title: firstItem?.title || null,
        });
        if (firstItem?.url) {
          setActiveVideoUrl(firstItem.url);
        }
        setTimeout(() => {
          const videoSection = document.getElementById('video-results');
          if (videoSection) {
            videoSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      } else {
        setError('No se encontraron datos del video.');
      }
    } catch (err) {
      setError('Error al obtener datos del video.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!link.trim()) {
      setError('Ingresa una URL de Facebook.');
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
    const stem = `facebook-video-${quality || 'descarga'}`;
    setDownloadKey(buttonKey);
    const started = Date.now();
    try {
      const freshUrl = await getFreshVideoUrl(downloadUrl, quality);
      await triggerVideoDownload(freshUrl || downloadUrl, stem);
    } catch (downloadError) {
      console.error('Download error:', downloadError);
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
            <h1 className="th-section-title fb-section-title-responsive">Herramienta para <span className="th-gradient-text">descargar video de facebook</span></h1>
          ) : (
            <h2 className="th-section-title fb-section-title-responsive">Herramienta para <span className="th-gradient-text">descargar video de facebook</span></h2>
          )}
          <p className="th-section-desc">Pega abajo una URL publica de Facebook. El sistema analiza el enlace y muestra opciones HD y SD segun disponibilidad.</p>
        </div>

        <div className="fb-download-panel">
          <div className="row g-4 align-items-stretch">
            <div className="col-lg-12">
              <div className="fb-tool-card">
                <h3 className="fb-mobile-hide">Pegar enlace de Facebook</h3>
                <p className="fb-mobile-hide">Flujo simple: copiar, pegar y descargar.</p>
                <form onSubmit={handleSubmit}>
                  <div className="fb-large-input-wrap">
                    <i className="fas fa-link" aria-hidden="true"></i>
                    <input
                      type="url"
                      placeholder="Pega URL de Facebook aqui"
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
                  <h3 className="fb-mobile-title">Descargar video de facebook</h3>
                  <div className="fb-action-row">
                    <button type="submit" className="th-btn th-btn-primary" disabled={loading}>
                      {loading ? <><i className="fas fa-spinner fa-spin me-2"></i>Cargando...</> : <><i className="fas fa-magnifying-glass me-2"></i>Analizar enlace</>}
                    </button>
                    <button
                      type="button"
                      className="th-btn th-btn-outline"
                      onClick={() => {
                        setLink('');
                        setError(null);
                        setVideoData(null);
                        setFetchedPageUrl('');
                        setActiveVideoUrl(null);
                        setDownloadKey(null);
                      }}
                      disabled={loading}
                    >
                      <i className="fas fa-eraser me-2"></i>Limpiar campo
                    </button>
                  </div>
                </form>

                {error && <div className="fb-result-box danger" style={{ marginTop: '1rem' }}><i className="fas fa-circle-exclamation"></i><div><strong>Error</strong><p>{error}</p></div></div>}

                {loading && (
                  <div className="fb-loading-container" style={{ marginTop: '1.5rem', textAlign: 'center', padding: '2rem' }}>
                    <div className="fb-loader">
                      <i className="fas fa-spinner fa-spin" style={{ fontSize: '2rem', color: 'var(--th-primary)', marginBottom: '1rem' }}></i>
                      <p style={{ color: 'var(--th-body)', margin: 0 }}>Obteniendo datos del video...</p>
                    </div>
                  </div>
                )}

                {videoData && videoData.items && videoData.items.length > 0 && (
                  <div id="video-results" className="fb-demo-results" style={{ marginTop: '1.5rem' }}>
                    <div className="fb-demo-header">
                      <h4>Opciones de descarga</h4>
                      <span style={{ color: 'var(--th-success)' }}>✓ Video listo</span>
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
                                  if (isPlaying) setShowPlayPauseIcon(true);
                                }}
                                onMouseLeave={() => {
                                  if (isPlaying && videoRef.current && !videoRef.current.paused) {
                                    setTimeout(() => {
                                      if (videoRef.current && !videoRef.current.paused) setShowPlayPauseIcon(false);
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
                                      if (videoRef.current.paused) videoRef.current.play();
                                      else videoRef.current.pause();
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
                                alt="Miniatura del video"
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
                            title="Abre este video en Facebook en una pestana nueva"
                          >
                            <i className="fas fa-up-right-from-square me-2" aria-hidden="true"></i>
                            Ver en Facebook
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
                                Descargando video…
                              </>
                            ) : (
                              <>
                                <i className="fas fa-download me-2" aria-hidden="true"></i>
                                Descargar video
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
                              <p>{isHD ? 'Alta definicion para mejor visualizacion' : 'Calidad estandar para descarga rapida'}</p>
                            </div>
                            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                              <button
                                type="button"
                                className="th-btn th-btn-outline"
                                onClick={() => handlePlaySelection(item.url, qualityLabel)}
                                style={{ padding: '8px 16px', fontSize: '0.85rem' }}
                              >
                                <i className="fas fa-play me-2"></i>Reproducir {qualityLabel}
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
                                    Descargando…
                                  </>
                                ) : (
                                  <>
                                    <i className="fas fa-download me-2" aria-hidden="true"></i>
                                    Descargar {qualityLabel}
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
                <h4>Seguridad y privacidad del usuario</h4>
                <ul className="fb-check-list">
                  <li><i className="fas fa-check-circle"></i>Los videos se guardan directamente en el dispositivo del usuario</li>
                  <li><i className="fas fa-check-circle"></i>No se almacenan copias de videos descargados</li>
                  <li><i className="fas fa-check-circle"></i>No se requiere inicio de sesion</li>
                  <li><i className="fas fa-check-circle"></i>Funciona solo con videos publicos y accesibles</li>
                  <li><i className="fas fa-check-circle"></i>La herramienta no guarda videos en sus servidores</li>
                </ul>

                <div className="fb-note-box">
                  <i className="fas fa-circle-info"></i>
                  <p>
                    Como downloader de Facebook basado en navegador, la herramienta lee tu enlace publico y ofrece archivos servidos desde Facebook sin almacenar copias en nuestro lado.
                  </p>
                </div>

                <div className="fb-mini-stats">
                  <div className="fb-mini-stat">
                    <strong>Android</strong>
                    <span>Flujo en navegador</span>
                  </div>
                  <div className="fb-mini-stat">
                    <strong>iPhone</strong>
                    <span>Diseno compatible con Safari</span>
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

function FeaturesEs() {
  const features = [
    {
      icon: 'fas fa-bolt',
      color: 'blue',
      title: 'Procesamiento rapido de enlaces',
      desc: 'La herramienta procesa enlaces publicos de Facebook en segundos para mostrar opciones de descarga sin esperas largas.',
      tags: ['Velocidad', 'UX'],
    },
    {
      icon: 'fas fa-mobile-screen-button',
      color: 'green',
      title: 'Diseno responsive para movil',
      desc: 'El diseno se adapta a Android, iPhone, tablet y escritorio para una experiencia estable en cualquier pantalla.',
      tags: ['Responsive', 'Mobile'],
    },
    {
      icon: 'fas fa-sliders',
      color: 'purple',
      title: 'Opciones de calidad HD y SD',
      desc: 'Puedes elegir entre mayor nitidez o menor tamano de archivo segun la calidad original del video.',
      tags: ['HD', 'SD'],
    },
    {
      icon: 'fas fa-film',
      color: 'orange',
      title: 'Soporte para Facebook Reels',
      desc: 'Soporta Reels publicos y clips cortos cuando el enlace compartido se encuentra accesible.',
      tags: ['Reels', 'Short Video'],
    },
    {
      icon: 'fas fa-link',
      color: 'pink',
      title: 'Flujo simple de copiar y pegar',
      desc: 'Solo copia la URL de Facebook, pegala en el formulario y elige la opcion de descarga.',
      tags: ['Pegar URL', 'Facil uso'],
    },
    {
      icon: 'fas fa-shield-halved',
      color: 'teal',
      title: 'Uso seguro e informativo',
      desc: 'Incluye recomendaciones para descargar contenido publico de forma responsable y respetando derechos.',
      tags: ['Seguridad', 'Confianza'],
    },
    {
      icon: 'fas fa-list-check',
      color: 'indigo',
      title: 'Guia estructurada y contenido util',
      desc: 'Pasos claros, consejos y FAQ para entender mejor el proceso y resolver problemas comunes.',
      tags: ['Guia', 'FAQ'],
    },
    {
      icon: 'fas fa-laptop-code',
      color: 'red',
      title: 'Herramienta basada en navegador',
      desc: 'Funciona online, sin extensiones ni aplicaciones adicionales para descargar videos publicos.',
      tags: ['Browser Tool', 'Online'],
    },
  ];
  return (
    <section id="features" className="th-section th-section-alt">
      <div className="th-container">
        <div className="th-section-header">
          <h2 className="th-section-title">Por que elegir este sitio para descargar video de facebook</h2>
          <p className="th-section-desc">Misma estructura de diseno del home principal, con contenido en espanol orientado a descargar video de facebook.</p>
        </div>
        <div className="row g-4">
          {features.map((feature, index) => (
            <div key={index} className="col-12 col-sm-6 col-lg-3">
              <div className="th-service-card">
                <div className={`th-service-icon th-icon-${feature.color}`}><i className={feature.icon}></i></div>
                <h4 className="th-service-title">{feature.title}</h4>
                <p className="th-service-desc">{feature.desc}</p>
                <div className="th-service-tags">{feature.tags.map((tag, i) => <span key={i} className="th-tag">{tag}</span>)}</div>
                <button className="th-service-link">
                  Explorar funcion <i className="fas fa-arrow-right ms-1"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function InfoSectionEs() {
  const cards = [
    {
      icon: 'fas fa-copy',
      title: 'Videos compartidos en publicaciones del timeline de Facebook',
      desc: 'Copia el enlace de cualquier publicacion publica y pegalo aqui para guardar el clip en HD o SD, segun la calidad disponible.',
    },
    {
      icon: 'fas fa-flag',
      title: 'Contenido subido en paginas de Facebook',
      desc: 'Los videos de paginas publicas funcionan igual: copia el enlace de reproduccion y procesalo en la herramienta.',
    },
    {
      icon: 'fas fa-users',
      title: 'Videos compartidos en grupos publicos de Facebook',
      desc: 'Los grupos publicos son compatibles cuando el grupo y el video pueden verse sin iniciar sesion.',
    },
    {
      icon: 'fas fa-film',
      title: 'Facebook Reels y videos cortos',
      desc: 'Los Reels publicos y clips cortos se pueden guardar con el mismo flujo usado para videos normales.',
    },
  ];

  return (
    <section className="th-section">
      <div className="th-container">
        <div className="th-about-grid fb-info-grid">
          <div className="th-about-content">
            <h2 className="th-section-title text-start">Contenido de Facebook que puedes <span className="th-gradient-text">descargar</span></h2>
            <p className="th-about-text">
              Esta pagina cubre los principales tipos de contenido publico de Facebook. Si la publicacion se puede abrir en la web, normalmente puedes guardarla aqui para descargar video de facebook.
            </p>
            <p className="th-about-text">
              Los usuarios suelen descargar videos de publicaciones del timeline, contenido subido en paginas, videos de grupos publicos,
              Facebook Reels, clips cortos y videos compartidos por creadores.
            </p>
            <p className="th-about-text">
              Tambien funciona para videos abiertos desde navegadores moviles en Android o iPhone, y para videos vistos en navegadores
              de escritorio en Windows o Mac.
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

function StatsBannerEs() {
  const stats = [
    { icon: 'fas fa-film', num: 'HD', label: 'Calidad' },
    { icon: 'fas fa-mobile-screen-button', num: 'All', label: 'Dispositivos' },
    { icon: 'fas fa-video', num: 'Reels', label: 'Publicos' },
    { icon: 'fas fa-shield', num: 'Free', label: 'Sin registro' },
  ];
  return (
    <div className="th-stats-banner">
      <div className="th-container">
        <div className="th-stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="th-stat-item">
              <div className="th-stat-icon"><i className={stat.icon}></i></div>
              <div className="th-stat-info"><div className="th-stat-number">{stat.num}</div><div className="th-stat-label">{stat.label}</div></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function GuidesEs() {
  const steps = [
    { icon: 'fas fa-up-right-from-square', num: '01', title: 'Abrir video', desc: 'Abre el video o Reel publico que deseas bajar.' },
    { icon: 'fas fa-copy', num: '02', title: 'Copiar enlace', desc: 'Copia la URL completa desde el navegador.' },
    { icon: 'fas fa-paste', num: '03', title: 'Pegar URL', desc: 'Pega el enlace en el campo del downloader.' },
    { icon: 'fas fa-download', num: '04', title: 'Elegir calidad y descargar', desc: 'Selecciona HD o SD y guarda el archivo.' },
  ];
  return (
    <section id="guides" className="th-section th-section-alt">
      <div className="th-container">
        <div className="th-section-header">
          <h2 className="th-section-title">Como descargar video de facebook paso a paso</h2>
          <p className="th-section-desc">Mismo bloque de guia del home en ingles, adaptado a espanol.</p>
        </div>
        <div className="th-steps-grid">
          {steps.map((step, index) => (
            <div key={index} className="th-step-card">
              <div className="th-step-num">{step.num}</div>
              <div className="th-step-icon-wrap"><i className={step.icon}></i></div>
              <h4 className="th-step-title">{step.title}</h4>
              <p className="th-step-desc">{step.desc}</p>
              {index < steps.length - 1 && <div className="th-step-arrow"><i className="fas fa-chevron-right"></i></div>}
            </div>
          ))}
        </div>

        <div className="fb-guide-content">
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="fb-content-card">
                <h3>Consejos para mejores resultados de descarga</h3>
                <p>
                  Para evitar errores y obtener descargas estables, es recomendable seguir estas buenas practicas.
                </p>
                <ul className="fb-bullet-list">
                  <li>Copia la URL publica completa de Facebook y evita enlaces acortados.</li>
                  <li>Si el enlace falla, abre el video en navegador en lugar de la app y copia la URL otra vez.</li>
                  <li>Usa navegadores modernos como Chrome, Safari, Edge o Firefox para mejor compatibilidad.</li>
                  <li>Elige calidad SD si tu internet es lento o tienes poco almacenamiento disponible.</li>
                  <li>Selecciona HD cuando el video original tenga resolucion alta disponible.</li>
                  <li>Verifica que el contenido sea publico; publicaciones privadas no pueden procesarse.</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="fb-content-card">
                <h3>Contenido de Facebook que puedes descargar</h3>
                <p>
                  Esta herramienta maneja los tipos de contenido publico mas comunes cuando la publicacion es visible sin permisos especiales.
                </p>
                <ul className="fb-bullet-list">
                  <li>Videos compartidos en publicaciones del timeline de Facebook</li>
                  <li>Contenido subido en paginas de Facebook</li>
                  <li>Videos compartidos en grupos publicos de Facebook</li>
                  <li>Facebook Reels y videos cortos</li>
                  <li>Clips de video publicos compartidos por creadores</li>
                  <li>Videos abiertos en navegadores moviles de Android o iPhone</li>
                  <li>Videos vistos en navegadores de escritorio en Windows o Mac</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQEs() {
  const faqs = [
    {
      q: 'Descargar video de facebook aqui es gratis?',
      a: 'Si. Es gratuito, sin registro ni suscripcion; solo pega un enlace publico y descarga.',
    },
    {
      q: 'Puedo descargar Facebook Reels con esta herramienta?',
      a: 'Si. Copia cualquier enlace publico de Reel, pegalo en el campo y elige la calidad que mejor se adapte a tu dispositivo.',
    },
    {
      q: 'Necesito instalar algun software?',
      a: 'No. Todo funciona en tu navegador, por lo que no necesitas apps ni extensiones adicionales.',
    },
    {
      q: 'Puedo descargar videos de Facebook en mi telefono?',
      a: 'Si. Abre este sitio en Chrome, Safari u otro navegador movil en Android o iPhone.',
    },
    {
      q: 'Por que mi video de Facebook no se descarga?',
      a: 'Normalmente ocurre cuando el video es privado, el enlace esta incompleto o la publicacion tiene acceso restringido. Verifica que copiaste el enlace publico completo.',
    },
    {
      q: 'Donde se guardan los videos descargados?',
      a: 'Los videos se guardan en la carpeta de descargas del dispositivo o en la ubicacion elegida por tu navegador.',
    },
    {
      q: 'El downloader guarda mis videos?',
      a: 'No. No almacenamos copias de tus videos; los archivos van directamente a tu dispositivo.',
    },
    {
      q: 'Puedo descargar videos privados de Facebook?',
      a: 'La herramienta solo funciona con videos publicos. Las publicaciones privadas o restringidas no pueden procesarse.',
    },
  ];
  return (
    <section id="faq" className="th-section">
      <div className="th-container">
        <div className="th-section-header">
          <h2 className="th-section-title">Preguntas <span className="th-gradient-text">frecuentes</span></h2>
          <p className="th-section-desc">
            Preguntas comunes sobre como usar esta pagina para descargar video de facebook, clips y Reels publicos.
          </p>
        </div>
        <div className="accordion fb-accordion" id="faqAccordionEs">
          {faqs.map((faq, index) => (
            <div className="accordion-item" key={index}>
              <h2 className="accordion-header" id={`heading-es-${index}`}>
                <button className={`accordion-button ${index !== 0 ? 'collapsed' : ''}`} type="button" data-bs-toggle="collapse" data-bs-target={`#collapse-es-${index}`} aria-expanded={index === 0 ? 'true' : 'false'} aria-controls={`collapse-es-${index}`}>
                  {faq.q}
                </button>
              </h2>
              <div id={`collapse-es-${index}`} className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`} aria-labelledby={`heading-es-${index}`} data-bs-parent="#faqAccordionEs">
                <div className="accordion-body">{faq.a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactEs() {
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
          <h2 className="th-section-title">Contacto para <span className="th-gradient-text">descargar video de facebook</span></h2>
          <p className="th-section-desc">
            Tienes dudas sobre enlaces, descarga en movil, HD vs SD o como funciona la herramienta? Envia un mensaje y te ayudamos.
          </p>
        </div>
        <div className="th-contact-grid">
          <div className="th-contact-info">
            <div className="th-contact-info-card">
              <div className="th-contact-icon th-icon-blue"><i className="fas fa-link"></i></div>
              <div>
                <h5 className="th-contact-info-title">Ayuda con enlaces de Facebook</h5>
                <p className="th-contact-info-line">Necesitas ayuda para copiar la URL correcta de video o Reel para descargar video de facebook?</p>
              </div>
            </div>
            <div className="th-contact-info-card">
              <div className="th-contact-icon th-icon-green"><i className="fas fa-mobile-screen-button"></i></div>
              <div>
                <h5 className="th-contact-info-title">Experiencia movil</h5>
                <p className="th-contact-info-line">Consultas sobre guardar videos de Facebook en Android, iPhone o tablet.</p>
              </div>
            </div>
            <div className="th-contact-info-card">
              <div className="th-contact-icon th-icon-purple"><i className="fas fa-sliders"></i></div>
              <div>
                <h5 className="th-contact-info-title">Guia de calidad</h5>
                <p className="th-contact-info-line">Entiende cuando hay opciones HD o SD segun la calidad original del video.</p>
              </div>
            </div>
            <div className="th-contact-info-card">
              <div className="th-contact-icon th-icon-orange"><i className="fas fa-user-shield"></i></div>
              <div>
                <h5 className="th-contact-info-title">Uso seguro e informado</h5>
                <p className="th-contact-info-line">Guia sobre copyright, permisos, privacidad y uso responsable de contenido publico.</p>
              </div>
            </div>

            <div className="fb-side-card mt-3">
              <h4>Acerca de esta herramienta</h4>
              <p>
                Esta herramienta existe para simplificar la descarga de videos publicos y Reels para ver offline, con respeto por la privacidad y los derechos de creadores.
              </p>
            </div>
          </div>
          <div className="th-contact-form-wrap">
            <div className="th-contact-form">
              <h3>Enviar mensaje de soporte</h3>
              <p className="th-contact-form-sub">Formulario front-end para demostracion de interfaz.</p>
              {sent && <div className="th-success-msg"><i className="fas fa-check-circle me-2"></i>Tu mensaje fue registrado en la interfaz de demo.</div>}
              <form onSubmit={handleSubmit}>
                <div className="th-form-row">
                  <div className="th-form-group"><label htmlFor="name-es">Nombre *</label><input id="name-es" name="name" value={form.name} onChange={handleChange} placeholder="Tu nombre" required /></div>
                  <div className="th-form-group"><label htmlFor="email-es">Email *</label><input id="email-es" type="email" name="email" value={form.email} onChange={handleChange} placeholder="nombre@ejemplo.com" required /></div>
                </div>
                <div className="th-form-group"><label htmlFor="topic-es">Tema</label><input id="topic-es" name="topic" value={form.topic} onChange={handleChange} placeholder="Problema de enlace, ayuda movil, soporte Reel..." /></div>
                <div className="th-form-group"><label htmlFor="message-es">Mensaje *</label><textarea id="message-es" name="message" rows="6" value={form.message} onChange={handleChange} placeholder="Escribe tu consulta aqui..." required></textarea></div>
                <button type="submit" className="th-btn th-btn-primary w-100"><i className="fas fa-paper-plane me-2"></i>Enviar mensaje</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomeSpanish() {
  useEffect(() => {
    const prevLang = document.documentElement.lang;
    document.documentElement.lang = 'es';
    return () => {
      document.documentElement.lang = prevLang || 'en';
    };
  }, []);

  return (
    <>
      <SEO
        title="Descargar Video de Facebook en HD Gratis | Downloader Online"
        description="Descarga videos y Reels publicos de Facebook en HD o SD gratis. Pega el enlace, elige calidad y guarda en Android, iPhone o PC sin registro."
        keywords="descargar video de facebook, discarga video di facebook, descargar video de facebook gratis, descargar video de facebook online, descargar reels de facebook"
        ogUrl="https://fbvideodownloaders.com/es/descargar-video-de-facebook"
        ogLocale="es_ES"
        jsonLd={buildHomeEsJsonLd()}
      />
      <HeroEs />
      <TrustedByEs />
      <DownloaderSectionEs />
      <FeaturesEs />
      <InfoSectionEs />
      <StatsBannerEs />
      <GuidesEs />
      <FAQEs />
      <ContactEs />
    </>
  );
}
