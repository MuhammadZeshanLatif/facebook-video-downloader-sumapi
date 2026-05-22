const META_API_BASE =
  'https://facebookvideo-downloader-backend.vercel.app/api/meta/download';

const RAPIDCDN_ORIGIN = 'https://d.rapidcdn.app';

/**
 * Normalize pasted Facebook links (trim, add https:// when missing).
 */
export function normalizeInputUrl(raw) {
  let url = String(raw || '').trim();
  if (!url) return '';
  if (!/^https?:\/\//i.test(url)) {
    url = `https://${url.replace(/^\/+/, '')}`;
  }
  return url;
}

/**
 * Turn API media paths into absolute URLs the browser can fetch.
 */
export function resolveMediaUrl(url) {
  if (!url || typeof url !== 'string') return '';
  const trimmed = url.trim();
  if (!trimmed) return '';
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  if (trimmed.startsWith('//')) return `https:${trimmed}`;
  if (trimmed.startsWith('/')) return `${RAPIDCDN_ORIGIN}${trimmed}`;
  return trimmed;
}

/**
 * Extract video items from the backend JSON payload.
 */
export function parseVideoMetaResponse(payload) {
  if (!payload?.success || !payload?.data) return [];

  const inner = payload.data;
  if (inner.data && Array.isArray(inner.data) && inner.data.length > 0) {
    return inner.data;
  }
  if (Array.isArray(inner) && inner.length > 0) {
    return inner;
  }
  if (inner.url || inner.thumbnail || inner.hd || inner.sd) {
    return [inner];
  }
  return [];
}

/**
 * Prefer a direct HTTPS CDN link for preview/download defaults.
 */
export function pickDefaultVideoItem(items) {
  if (!Array.isArray(items) || !items.length) return null;

  const withAbsolute = items
    .map((item) => ({
      ...item,
      url: resolveMediaUrl(item?.url),
      thumbnail: resolveMediaUrl(item?.thumbnail),
    }))
    .filter((item) => item.url);

  return (
    withAbsolute.find((item) => /^https:\/\//i.test(item.url) && !item.shouldRender) ||
    withAbsolute.find((item) => /^https:\/\//i.test(item.url)) ||
    withAbsolute[0] ||
    null
  );
}

export function mapVideoItems(items) {
  return (Array.isArray(items) ? items : []).map((item) => ({
    ...item,
    url: resolveMediaUrl(item?.url),
    thumbnail: resolveMediaUrl(item?.thumbnail),
  }));
}

/**
 * Fetch Facebook video metadata from the Vercel backend.
 */
export async function fetchFacebookVideoMeta(pageUrl) {
  const normalized = normalizeInputUrl(pageUrl);
  if (!normalized) {
    throw new Error('Please enter a Facebook video URL');
  }

  const apiUrl = `${META_API_BASE}?url=${encodeURIComponent(normalized)}`;
  const response = await fetch(apiUrl);

  let payload;
  try {
    payload = await response.json();
  } catch {
    throw new Error('Invalid response from video service. Please try again.');
  }

  if (!response.ok) {
    throw new Error(
      payload?.message || `Video service error (${response.status}). Please try again.`
    );
  }

  const rawItems = parseVideoMetaResponse(payload);
  const items = mapVideoItems(rawItems).filter((item) => item.url);

  if (!items.length) {
    throw new Error(
      payload?.message ||
        payload?.data?.message ||
        'No video data found. Please check the URL and try again.'
    );
  }

  const firstItem = pickDefaultVideoItem(items);

  return {
    pageUrl: normalized,
    items,
    thumbnail: firstItem?.thumbnail || items[0]?.thumbnail || null,
    title: firstItem?.title || items[0]?.title || null,
    defaultUrl: firstItem?.url || items[0]?.url || null,
  };
}
