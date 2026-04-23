/**
 * Download or open a remote video URL. Facebook CDN URLs are signed; extra query
 * params (e.g. dl=1) often invalidate them. Cross-origin fetch usually fails; opening
 * the URL in a new tab lets the browser stream it and the user can Save as / download.
 */
export async function triggerVideoDownload(downloadUrl, suggestedFileName) {
  if (!downloadUrl || typeof downloadUrl !== 'string') return;

  const base = (suggestedFileName || 'facebook-video-download')
    .replace(/[^\w\- ]+/g, '')
    .trim()
    .replace(/\s+/g, '-') || 'download';
  const fileName = base.endsWith('.mp4') ? base : `${base}.mp4`;

  try {
    const response = await fetch(downloadUrl, {
      method: 'GET',
      mode: 'cors',
      credentials: 'omit',
    });
    if (response.ok) {
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = blobUrl;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(blobUrl);
      }, 250);
      return;
    }
  } catch {
    /* use fallback */
  }

  const a = document.createElement('a');
  a.href = downloadUrl;
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  setTimeout(() => document.body.removeChild(a), 250);
}
