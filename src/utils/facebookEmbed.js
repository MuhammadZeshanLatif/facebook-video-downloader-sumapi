/**
 * Clean Facebook page URLs for opening in a new tab (strip tracking noise, normalize host).
 * Direct CDN stream URLs in <video> are often blocked; opening the post on facebook.com is reliable.
 */
const TRACKING_PARAMS = new Set([
  'fbclid',
  '__tn__',
  'ref',
  'refid',
  'mibextid',
  'rdid',
  'share_url',
]);

export function normalizeFacebookPageUrl(pageUrl) {
  if (!pageUrl || typeof pageUrl !== 'string') return '';
  const trimmed = pageUrl.trim();
  if (!trimmed) return '';
  try {
    const withProto = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
    const url = new URL(withProto);
    TRACKING_PARAMS.forEach((k) => url.searchParams.delete(k));
    let host = url.hostname.toLowerCase();
    if (host === 'm.facebook.com' || host === 'mobile.facebook.com') {
      url.hostname = 'www.facebook.com';
    } else if (host === 'facebook.com') {
      url.hostname = 'www.facebook.com';
    }
    return url.toString();
  } catch {
    return trimmed;
  }
}
