import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SITE_NAME   = 'FB Video Downloaders';
const DOMAIN      = 'https://fbvideodownloaders.com';
// Use current origin so the image URL always matches the deployed domain
const ORIGIN      = typeof window !== 'undefined' ? window.location.origin : DOMAIN;
const IS_LOCALHOST =
  typeof window !== 'undefined' &&
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
const CANONICAL_BASE = IS_LOCALHOST ? ORIGIN : DOMAIN;
const DEFAULT_IMG = `${DOMAIN}/images/og-image.png`;
const DEFAULT_TITLE =
  'Free, Fast and Online Facebook Video Downloader | FB Video Downloaders';
const DEFAULT_DESC =
  'Download Facebook HD videos, FB Reels, Private and Public Clips. Fb video downloader helps users download Facebook videos, reels, and public clips directly from their google browser.';

const SEO = ({
  title,
  description,
  keywords,
  ogImage,
  /** When set, used for og:image:alt and twitter:image:alt instead of title-based default */
  ogImageAlt,
  ogUrl,
  type = 'website',
  articlePublishedTime,
  articleModifiedTime,
  articleAuthor,
  ogLocale = 'en_US',
  /** Override robots directive — use 'noindex, follow' for legal/utility pages */
  robots,
  /** @type {{ id: string, data: Record<string, unknown> }[] | null | undefined} */
  jsonLd,
}) => {
  if (typeof window === 'undefined') {
    globalThis.__prerenderSeo = { title, description, keywords, ogImage, ogUrl, type, articlePublishedTime, articleModifiedTime, articleAuthor, ogLocale, robots, jsonLd };
  }
  const location = useLocation();
  const resolvedTitle = title || DEFAULT_TITLE;
  const resolvedDesc  = description || DEFAULT_DESC;
  const resolvedImg   = ogImage || DEFAULT_IMG;
  const normalizedPath = location.pathname === '/' ? '/' : location.pathname.replace(/\/+$/, '');
  const canonical     = `${CANONICAL_BASE}${normalizedPath}`;
  const resolvedUrl   = ogUrl || canonical;
  const resolvedOgImageAlt = ogImageAlt || `${SITE_NAME} - ${resolvedTitle}`;
  const isEnglishHome = location.pathname === '/';
  const isSpanishHome = normalizedPath === '/es/descargar-video-de-facebook';

  useEffect(() => {
    // ── Title ──────────────────────────────────────────────
    document.title = resolvedTitle;
    document.documentElement.lang = isSpanishHome ? 'es' : 'en';

    // ── Helper: upsert a <meta> tag ────────────────────────
    const setMeta = (attr, value, content) => {
      let el = document.querySelector(`meta[${attr}="${value}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, value);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };
    const removeMeta = (attr, value) => {
      document.querySelectorAll(`meta[${attr}="${value}"]`).forEach((el) => el.remove());
    };

    // ── Basic ──────────────────────────────────────────────
    setMeta('name', 'description',  resolvedDesc);
    setMeta('name', 'author',       SITE_NAME);
    setMeta('name', 'robots', robots || 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    if (keywords) setMeta('name', 'keywords', keywords);
    else removeMeta('name', 'keywords');

    // ── Open Graph ─────────────────────────────────────────
    setMeta('property', 'og:type',        type);
    setMeta('property', 'og:site_name',   SITE_NAME);
    setMeta('property', 'og:locale',      ogLocale);
    setMeta('property', 'og:title',       resolvedTitle);
    setMeta('property', 'og:description', resolvedDesc);
    setMeta('property', 'og:image',       resolvedImg);
    setMeta('property', 'og:image:width', '1200');
    setMeta('property', 'og:image:height','630');
    setMeta('property', 'og:image:alt',   resolvedOgImageAlt);
    setMeta('property', 'og:url',         resolvedUrl);

    // ── Twitter ────────────────────────────────────────────
    setMeta('name', 'twitter:card',        'summary_large_image');
    setMeta('name', 'twitter:site',        '@fbvideodownloads');
    setMeta('name', 'twitter:creator',     '@fbvideodownloads');
    setMeta('name', 'twitter:title',       resolvedTitle);
    setMeta('name', 'twitter:description', resolvedDesc);
    setMeta('name', 'twitter:image',       resolvedImg);
    setMeta('name', 'twitter:image:alt',   resolvedOgImageAlt);

    // ── Article tags ───────────────────────────────────────
    if (type === 'article' && articlePublishedTime) {
      setMeta('property', 'article:published_time', articlePublishedTime);
      setMeta('property', 'article:modified_time',  articleModifiedTime || articlePublishedTime);
      setMeta('property', 'article:author',         articleAuthor || SITE_NAME);
      setMeta('property', 'article:section',        'Technology');
    } else {
      removeMeta('property', 'article:published_time');
      removeMeta('property', 'article:modified_time');
      removeMeta('property', 'article:author');
      removeMeta('property', 'article:section');
    }

    // ── Canonical ──────────────────────────────────────────
    const canonicalLinks = document.querySelectorAll('link[rel="canonical"]');
    canonicalLinks.forEach((el, i) => { if (i > 0) el.remove(); });
    let link = canonicalLinks[0];
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', canonical);

    // ── Hreflang alternates for EN/ES home routes ───────────
    const removeHreflangLinks = () => {
      document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove());
    };
    removeHreflangLinks();
    if (isEnglishHome || isSpanishHome) {
      const alternates = [
        { hreflang: 'en', href: `${CANONICAL_BASE}/` },
        { hreflang: 'es', href: `${CANONICAL_BASE}/es/descargar-video-de-facebook` },
        { hreflang: 'x-default', href: `${CANONICAL_BASE}/` },
      ];
      alternates.forEach(({ hreflang, href }) => {
        const alt = document.createElement('link');
        alt.setAttribute('rel', 'alternate');
        alt.setAttribute('hreflang', hreflang);
        alt.setAttribute('href', href);
        alt.setAttribute('data-seo-hreflang', 'true');
        document.head.appendChild(alt);
      });
    }

  }, [
    resolvedTitle,
    resolvedDesc,
    resolvedImg,
    resolvedUrl,
    canonical,
    resolvedOgImageAlt,
    keywords,
    type,
    robots,
    articlePublishedTime,
    articleModifiedTime,
    articleAuthor,
    ogLocale,
    isEnglishHome,
    isSpanishHome,
  ]);

  const jsonLdKey =
    jsonLd && jsonLd.length > 0
      ? JSON.stringify(jsonLd.map((b) => [b.id, b.data]))
      : '';

  useEffect(() => {
    const removeManaged = () => {
      document.querySelectorAll('script[data-seo-jsonld]').forEach((n) => n.remove());
    };
    removeManaged();
    if (!jsonLd || !Array.isArray(jsonLd) || jsonLd.length === 0) {
      return removeManaged;
    }
    jsonLd.forEach((block) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-seo-jsonld', block.id || 'schema');
      script.textContent = JSON.stringify(block.data);
      document.head.appendChild(script);
    });
    return removeManaged;
  }, [jsonLdKey, location.pathname]);

  return null;
};

export default SEO;
