import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SITE_NAME   = 'FBSave HD';
const DOMAIN      = 'https://fbvideodownloaders.com';
// Use current origin so the image URL always matches the deployed domain
const ORIGIN      = typeof window !== 'undefined' ? window.location.origin : DOMAIN;
const DEFAULT_IMG = `${ORIGIN}/images/og-image.png`;
const DEFAULT_TITLE =
  'Download Facebook Videos & Reels HD Free - FB Video Downloader';
const DEFAULT_DESC =
  'Download any public Facebook video or Reel in HD quality online for free. No login, no app needed. Paste the FB video link and save it instantly on Android, iPhone, or PC.';

const SEO = ({
  title,
  description,
  keywords,
  ogImage,
  ogUrl,
  type = 'website',
  articlePublishedTime,
  articleModifiedTime,
  articleAuthor,
  /** @type {{ id: string, data: Record<string, unknown> }[] | null | undefined} */
  jsonLd,
}) => {
  const location = useLocation();
  const resolvedTitle = title || DEFAULT_TITLE;
  const resolvedDesc  = description || DEFAULT_DESC;
  const resolvedImg   = ogImage || DEFAULT_IMG;
  const resolvedUrl   = ogUrl || `${DOMAIN}${location.pathname}`;
  const canonical     = `${DOMAIN}${location.pathname}`;

  useEffect(() => {
    // ── Title ──────────────────────────────────────────────
    document.title = resolvedTitle;

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
    setMeta('name', 'robots',       'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    if (keywords) setMeta('name', 'keywords', keywords);

    // ── Open Graph ─────────────────────────────────────────
    setMeta('property', 'og:type',        type);
    setMeta('property', 'og:site_name',   SITE_NAME);
    setMeta('property', 'og:locale',      'en_US');
    setMeta('property', 'og:title',       resolvedTitle);
    setMeta('property', 'og:description', resolvedDesc);
    setMeta('property', 'og:image',       resolvedImg);
    setMeta('property', 'og:image:width', '1200');
    setMeta('property', 'og:image:height','630');
    setMeta('property', 'og:image:alt',   `${SITE_NAME} - ${resolvedTitle}`);
    setMeta('property', 'og:url',         resolvedUrl);

    // ── Twitter ────────────────────────────────────────────
    setMeta('name', 'twitter:card',        'summary_large_image');
    setMeta('name', 'twitter:site',        '@fbvideodownloads');
    setMeta('name', 'twitter:creator',     '@fbvideodownloads');
    setMeta('name', 'twitter:title',       resolvedTitle);
    setMeta('name', 'twitter:description', resolvedDesc);
    setMeta('name', 'twitter:image',       resolvedImg);
    setMeta('name', 'twitter:image:alt',   `${SITE_NAME} - ${resolvedTitle}`);

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
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', canonical);

  }, [
    resolvedTitle,
    resolvedDesc,
    resolvedImg,
    resolvedUrl,
    canonical,
    keywords,
    type,
    articlePublishedTime,
    articleModifiedTime,
    articleAuthor,
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
