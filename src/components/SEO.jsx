import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SEO = ({ title, description, keywords, ogImage, ogUrl, type = 'website' }) => {
  const location = useLocation();

  useEffect(() => {
    // Update document title
    document.title = title || 'Facebook Video Downloader HD - Download Facebook Videos, Reels & Clips Online';

    // Update or create meta tags
    const updateMetaTag = (name, content, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Update description
    if (description) {
      updateMetaTag('description', description);
      updateMetaTag('og:description', description, true);
      updateMetaTag('twitter:description', description);
    }

    // Update keywords
    if (keywords) {
      updateMetaTag('keywords', keywords);
    }

    // Update OG tags
    if (ogImage) {
      updateMetaTag('og:image', ogImage, true);
      updateMetaTag('twitter:image', ogImage);
    }

    if (ogUrl) {
      updateMetaTag('og:url', ogUrl, true);
    }

    updateMetaTag('og:type', type, true);
    updateMetaTag('og:title', title || document.title, true);
    updateMetaTag('twitter:title', title || document.title);

    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `https://facebookvideodownloader.com${location.pathname}`);

  }, [title, description, keywords, ogImage, ogUrl, type, location.pathname]);

  return null;
};

export default SEO;

