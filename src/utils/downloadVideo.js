/**
 * Open a remote video URL in a user-gesture-safe way.
 * Facebook CDN links are heavily restricted for CORS and often fail with blob downloads.
 * Opening immediately from the click event is more reliable on mobile production browsers.
 */
export async function triggerVideoDownload(downloadUrl, suggestedFileName) {
  if (!downloadUrl || typeof downloadUrl !== 'string') return;

  const base = (suggestedFileName || 'facebook-video-download')
    .replace(/[^\w\- ]+/g, '')
    .trim()
    .replace(/\s+/g, '-') || 'download';
  const fileName = base.endsWith('.mp4') ? base : `${base}.mp4`;

  const opened = window.open(downloadUrl, '_blank', 'noopener,noreferrer');
  if (opened) return;

  // Fallback for browsers that block window.open but allow anchor navigation.
  const a = document.createElement('a');
  a.href = downloadUrl;
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  a.download = fileName;
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  setTimeout(() => document.body.removeChild(a), 250);
}
