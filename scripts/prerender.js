/**
 * Prerender script: generates static HTML shells for each route.
 * AI crawlers (no JS) read this HTML. Browsers load React and hydrate.
 * Run: node scripts/prerender.js
 */

import { writeFileSync, mkdirSync, readFileSync, unlinkSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const DIST = resolve(ROOT, 'dist');
const builtIndex = readFileSync(resolve(DIST, 'index.html'), 'utf8');
const ssrBundle = resolve(DIST, '.ssr-entry.mjs');
await build({ entryPoints: [resolve(__dirname, 'ssr-entry.jsx')], outfile: ssrBundle, bundle: true, platform: 'node', format: 'esm', external: ['react', 'react-dom', 'react-dom/server'] });
const { renderRoute } = await import(`file://${ssrBundle.replaceAll('\\', '/')}`);
const assets = [...builtIndex.matchAll(/<(?:script|link)\b[^>]*(?:\/assets\/)[^>]*>(?:<\/script>)?/g)].map((match) => match[0]).join('\n  ');
if (!assets.includes('/assets/') || !assets.includes('<script')) {
  throw new Error('Build the Vite app before generating route HTML.');
}

function withApp(html, route) {
  const { html: appHtml, seo } = renderRoute(route);
  if (seo && route !== '/' && !route.startsWith('/es/')) {
    const schema = (seo.jsonLd || []).map((block) => `<script type="application/ld+json" data-seo-jsonld="prerendered">${JSON.stringify(block.data)}</script>`).join('\n  ');
    const head = htmlHead({
      title: seo.title,
      description: seo.description,
      keywords: seo.keywords,
      canonical: `${SITE_ORIGIN}${route}`,
      ogType: seo.type,
      ogImage: seo.ogImage,
      articleDate: seo.articlePublishedTime,
      schema,
    }).replace('content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"', `content="${seo.robots || 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'}"`);
    html = html.replace(/<!DOCTYPE html>[\s\S]*?<body>/i, `${head}\n<body>`);
  } else {
    html = html.replaceAll('<script type="application/ld+json">', '<script type="application/ld+json" data-seo-jsonld="prerendered">');
  }
  return (html.includes('/assets/') ? html : html.replace('</head>', `  ${assets}\n</head>`))
    .replace(/<body>[\s\S]*<\/body>/, `<body>\n<div id="root">${appHtml}</div>\n</body>`);
}

const SITE_ORIGIN = 'https://fbvideodownloaders.com';
const SITE_NAME = 'FB Video Downloaders';

const BLOG_POSTS = [
  { slug: 'how-to-trim-and-edit-facebook-videos-after-download', title: 'How to Trim and Edit Facebook Videos After Download (Easy Guide)', excerpt: 'Learn how to trim and edit Facebook videos after download using free mobile, desktop, and browser-based tools. Resize, crop, and export videos in HD quality easily.', date: '2026-05-22', category: 'Guide', image: '/images/how-to-trim-and-edit-facebook-videos-after-download.webp', keywords: 'trim facebook video, edit facebook video after download, facebook video editing, video trimming guide' },
  { slug: 'how-to-convert-facebook-videos-into-reels-or-shorts-easy-guide', title: 'How to Convert Facebook Videos into Reels or Shorts (Easy Step-by-Step Guide)', excerpt: 'Learn how to convert Facebook videos into Reels or Shorts with simple methods, correct format settings, clip tips, and free tools.', date: '2026-05-11', category: 'Guide', image: '/images/can-you-convert-facebook-videos-into-reels-or-shorts.webp', keywords: 'convert facebook video to reels, facebook video to shorts, convert facebook video, reels conversion guide' },
  { slug: 'can-you-use-downloaded-facebook-videos-on-youtube', title: 'Can You Use Downloaded Facebook Videos on YouTube?', excerpt: 'Can you use downloaded Facebook videos on YouTube? Learn the rules, risks, and safe ways to reuse content without strikes or harming your channel.', date: '2026-05-10', category: 'Legal', image: '/images/can-you-use-downloaded-facebook-videos-on-youtube.webp', keywords: 'facebook video on youtube, reuse facebook video, downloaded facebook videos youtube, facebook video copyright youtube' },
  { slug: 'best-video-formats-for-editing-downloaded-fb-videos', title: 'Best Video Formats for Editing Downloaded FB Videos', excerpt: 'Choose the right format after you download a Facebook clip. Compare MP4 (H.264), MOV, ProRes, and AVI for editing quality and file size.', date: '2026-05-09', category: 'Technical', image: '/images/best-video-formats-editing-downloaded-fb-videos.webp', keywords: 'best video format facebook, mp4 vs mov facebook video, edit downloaded facebook video format, facebook video editing format' },
  { slug: 'how-to-reuse-facebook-videos-for-content-creation-easy-guide', title: 'How to Reuse Facebook Videos for Content Creation (Easy Guide)', excerpt: 'Learn how to reuse Facebook videos for content creation with simple steps. Turn one video into multiple posts, grow faster, and save time.', date: '2026-04-27', category: 'Content Strategy', image: '/images/how-to-reuse-facebook-videos-for-content-creation.png', keywords: 'reuse facebook videos content creation, facebook video repurposing, content creation from facebook videos' },
  { slug: 'facebook-copyright-rules-explained-simple-guide-2026', title: 'Facebook Copyright Rules Explained (Simple Guide 2026)', excerpt: 'Learn Facebook copyright rules in simple words. See what is allowed, what is not, and how to avoid strikes or bans on videos, reels, and music.', date: '2026-04-24', category: 'Legal', image: '/images/facebook-copyright-rules-explained.webp', keywords: 'facebook copyright rules, facebook video copyright, can I download facebook videos legally, facebook DMCA' },
  { slug: 'why-some-videos-download-slower-than-others', title: 'Why Some Videos Download Slower Than Others', excerpt: 'Learn why some videos download slower than others and how file size, server speed, platform limits, and device issues affect download time.', date: '2026-04-20', category: 'Technical', image: '/images/why-some-videos-download-slower-than-others.png', keywords: 'slow video download, why videos download slow, facebook video download speed, slow download reasons' },
  { slug: 'best-practices-for-saving-facebook-videos', title: 'Best Practices for Saving Facebook Videos', excerpt: 'Learn the best practices for saving Facebook videos safely. Avoid risks, protect your data, and download videos in HD without login or apps.', date: '2026-04-18', category: 'Tips', image: '/images/best-practices-saving-facebook-videos.webp', keywords: 'best practices saving facebook videos, save facebook videos safely, facebook video saving guide' },
  { slug: 'facebook-video-downloader-privacy-and-security-safe-or-risky', title: 'Facebook Video Downloader: Privacy and Security (Safe or Risky?)', excerpt: 'Is a Facebook video downloader safe? Learn privacy risks, security threats, and safe ways to download Facebook videos without risking your data.', date: '2026-04-16', category: 'Security', image: '/images/facebook-video-downloader-privacy-and-security.png', keywords: 'facebook video downloader safe, privacy facebook downloader, is facebook downloader safe, facebook video download security' },
  { slug: 'troubleshooting-common-download-issues-step-by-step-guide', title: 'Troubleshooting Common Download Issues: A Step-by-Step Guide', excerpt: 'Fix common Facebook video download problems. Step-by-step solutions for slow downloads, failed downloads, missing audio, and format issues.', date: '2026-04-14', category: 'Support', image: '/images/troubleshooting-common-download-issues.png', keywords: 'facebook video download not working, fix facebook download, facebook video download error, troubleshoot facebook download' },
  { slug: 'understanding-facebook-video-formats-and-quality', title: 'Understanding Facebook Video Formats and Quality', excerpt: 'Understand Facebook video formats, quality options (HD/SD), and how resolution affects your downloaded videos.', date: '2026-04-08', category: 'Technical', image: '/images/understanding-facebook-video-formats-andquality.webp', keywords: 'facebook video formats, facebook video quality, HD SD facebook, facebook video resolution' },
  { slug: 'facebook-reels-complete-download-guide-hd-mobile-desktop', title: 'Facebook Reels: Complete Download Guide (HD, Mobile & Desktop)', excerpt: 'Complete guide to downloading Facebook Reels in HD quality on mobile and desktop. Fix common errors and save Reels without apps.', date: '2026-04-08', category: 'Guide', image: '/images/facebook-reels-complete-download-guide.webp', keywords: 'download facebook reels, facebook reels download HD, save facebook reels, facebook reels downloader' },
  { slug: 'facebook-video-downloader-mobile-vs-desktop-which-is-better', title: 'Facebook Video Downloader: Mobile vs Desktop (Which Is Better?)', excerpt: 'Compare mobile and desktop Facebook video downloading. Understand which method gives better quality, speed, and compatibility.', date: '2026-04-08', category: 'Comparison', image: '/images/mobile-vs-desktop-facebook-videos.webp', keywords: 'mobile vs desktop facebook download, facebook video downloader mobile, facebook downloader desktop' },
  { slug: 'is-it-legal-to-download-facebook-videos-complete-guide', title: 'Is It Legal to Download Facebook Videos? (Complete Guide)', excerpt: 'Is it legal to download Facebook videos? Understand copyright law, Fair Use, and how to download responsibly without violating platform terms.', date: '2026-04-08', category: 'Legal', image: '/images/is-it-legal-to-download-facebook-videos.webp', keywords: 'is it legal to download facebook videos, facebook video download legal, copyright facebook videos, legal facebook download' },
  { slug: 'how-to-download-facebook-videos-in-hd-quality-complete-guide', title: 'How to Download Facebook Videos in HD Quality (Complete Guide)', excerpt: 'Step-by-step guide to downloading Facebook videos in HD quality. Get the best resolution, fix quality issues, and save in MP4 format.', date: '2026-04-08', category: 'Guide', image: '/images/how-to-download-facebook-videos-in-hd-quality.webp', keywords: 'download facebook videos HD, facebook video HD download, how to download facebook video, HD quality facebook' },
  { slug: 'top-10-tips-facebook-video-downloading', title: 'Top 10 Tips for Facebook Video Downloading', excerpt: 'The top 10 proven tips for downloading Facebook videos and Reels successfully in HD quality. Fix failed downloads, low quality, and missing audio.', date: '2026-04-04', category: 'Tips', image: '/images/top-10-tips-for-facebook-video-downloading.webp', keywords: 'top 10 tips facebook video downloading, download facebook video tips, facebook video hd download, facebook reels download guide' },
];

function htmlHead({ title, description, keywords, canonical, ogType, ogImage, articleDate, articleCategory, schema }) {
  const imageUrl = ogImage && ogImage.startsWith('http') ? ogImage : `${SITE_ORIGIN}${ogImage || '/images/og-image.png'}`;
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <script async src="https://www.googletagmanager.com/gtm.js?id=GTM-WTW3XB56"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
  </script>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="author" content="${SITE_NAME}" />
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
  <meta name="theme-color" content="#2563EB" />

  <title>${title}</title>
  <meta name="description" content="${description}" />
  ${keywords ? `<meta name="keywords" content="${keywords}" />` : ''}

  <link rel="canonical" href="${canonical}" />
  <link rel="icon" type="image/png" href="/favicon.png" />
  <link rel="apple-touch-icon" href="/favicon.png" />

  <meta property="og:type" content="${ogType || 'website'}" />
  <meta property="og:site_name" content="${SITE_NAME}" />
  <meta property="og:locale" content="en_US" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:image" content="${imageUrl}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  ${articleDate ? `<meta property="article:published_time" content="${articleDate}" />` : ''}
  ${articleCategory ? `<meta property="article:section" content="${articleCategory}" />` : ''}

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@fbvideodownloads" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${description}" />
  <meta name="twitter:image" content="${imageUrl}" />

  ${schema}

  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" defer></script>
</head>`;
}

function htmlFoot() {
  return `  <script type="module" src="/src/main.jsx"></script>
</body>
</html>`;
}

function navHtml() {
  return `  <nav style="background:#1e40af;padding:12px 24px;display:flex;align-items:center;gap:20px;flex-wrap:wrap">
    <a href="/" style="color:#fff;font-weight:700;text-decoration:none;font-family:sans-serif">${SITE_NAME}</a>
    <a href="/user-guide" style="color:#bfdbfe;text-decoration:none;font-family:sans-serif;font-size:0.9rem">User Guide</a>
    <a href="/blog" style="color:#bfdbfe;text-decoration:none;font-family:sans-serif;font-size:0.9rem">Blog</a>
    <a href="/about" style="color:#bfdbfe;text-decoration:none;font-family:sans-serif;font-size:0.9rem">About</a>
    <a href="/contact" style="color:#bfdbfe;text-decoration:none;font-family:sans-serif;font-size:0.9rem">Contact</a>
  </nav>`;
}

function footerHtml() {
  return `  <footer style="background:#1e3a5f;color:#94a3b8;padding:24px;text-align:center;font-family:sans-serif;font-size:0.85rem;margin-top:48px">
    <p style="margin:0 0 8px">
      <a href="/" style="color:#93c5fd">Home</a> &bull;
      <a href="/user-guide" style="color:#93c5fd">User Guide</a> &bull;
      <a href="/blog" style="color:#93c5fd">Blog</a> &bull;
      <a href="/about" style="color:#93c5fd">About</a> &bull;
      <a href="/contact" style="color:#93c5fd">Contact</a> &bull;
      <a href="/privacy-policy" style="color:#93c5fd">Privacy Policy</a> &bull;
      <a href="/disclaimer" style="color:#93c5fd">Disclaimer</a>
    </p>
    <p style="margin:0">
      &copy; ${new Date().getFullYear()} ${SITE_NAME}. This website is not affiliated with Facebook or Meta Platforms, Inc.
      Facebook is a trademark of Meta Platforms, Inc.
    </p>
  </footer>`;
}

function generateBlogHTML(post) {
  const url = `${SITE_ORIGIN}/blog/${post.slug}`;
  const imageUrl = post.image.startsWith('http') ? post.image : `${SITE_ORIGIN}${post.image}`;
  const isoPub = `${post.date}T08:00:00+00:00`;

  const schema = [
    JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      image: [imageUrl],
      datePublished: isoPub,
      dateModified: isoPub,
      '@id': `${url}#article`,
      author: { '@type': 'Organization', name: SITE_NAME, url: `${SITE_ORIGIN}/about` },
      publisher: {
        '@type': 'Organization',
        name: SITE_NAME,
        logo: { '@type': 'ImageObject', url: `${SITE_ORIGIN}/images/logo.webp` },
      },
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      url,
    }),
    JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_ORIGIN}/` },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_ORIGIN}/blog` },
        { '@type': 'ListItem', position: 3, name: post.title, item: url },
      ],
    }),
  ].map((s) => `<script type="application/ld+json" data-seo-jsonld="prerendered">${s}</script>`).join('\n  ');

  const head = htmlHead({
    title: `${post.title} | ${SITE_NAME}`,
    description: post.excerpt,
    keywords: post.keywords,
    canonical: url,
    ogType: 'article',
    ogImage: imageUrl,
    articleDate: isoPub,
    articleCategory: post.category,
    schema,
  });

  const pubDate = new Date(isoPub).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return `${head}
<body>
${navHtml()}
  <article itemScope itemType="https://schema.org/BlogPosting" style="max-width:800px;margin:48px auto 40px;padding:0 20px;font-family:sans-serif">
    <nav aria-label="Breadcrumb" style="margin-bottom:16px;font-size:0.9rem;color:#666">
      <a href="/">Home</a> &rsaquo; <a href="/blog">Blog</a> &rsaquo; <span>${post.title}</span>
    </nav>

    <span itemProp="articleSection" style="display:inline-block;background:#EFF6FF;color:#2563EB;padding:4px 12px;border-radius:20px;font-size:0.8rem;font-weight:600;margin-bottom:12px">${post.category}</span>

    <h1 itemProp="headline" style="font-size:2rem;font-weight:800;color:#1a1a2e;line-height:1.3;margin-bottom:16px">${post.title}</h1>

    <div style="display:flex;gap:16px;align-items:center;flex-wrap:wrap;margin-bottom:24px;color:#666;font-size:0.9rem">
      <span itemprop="author" itemScope itemType="https://schema.org/Person">
        By <span itemProp="name">FB Video Downloaders Editorial Team</span>
      </span>
      <span>&bull;</span>
      <time itemprop="datePublished" dateTime="${isoPub}">${pubDate}</time>
      <span>&bull;</span>
      <a href="/blog" style="color:#2563EB">More guides</a>
    </div>

    <img src="${imageUrl}" alt="${post.title}" itemProp="image"
      style="width:100%;max-height:400px;object-fit:cover;border-radius:12px;margin-bottom:24px" loading="lazy" />

    <p itemProp="description" style="font-size:1.1rem;color:#374151;line-height:1.8;margin-bottom:24px">
      ${post.excerpt}
    </p>

    <div style="background:#F0F9FF;border-left:4px solid #2563EB;padding:16px 20px;border-radius:0 8px 8px 0;margin:24px 0">
      <strong>Quick Summary:</strong> ${post.excerpt}
    </div>

    <p style="color:#374151;line-height:1.8;margin-bottom:16px">
      The full interactive article with complete step-by-step instructions, screenshots, and tips is available when JavaScript is enabled.
      You can also browse related guides in our <a href="/blog" style="color:#2563EB">blog section</a>
      or read the <a href="/user-guide" style="color:#2563EB">complete user guide</a> for a detailed walkthrough.
    </p>

    <div style="margin:32px 0;padding:20px;background:#f9fafb;border-radius:12px">
      <h2 style="font-size:1.1rem;font-weight:700;color:#1a1a2e;margin-bottom:12px">Ready to download a Facebook video?</h2>
      <p style="color:#374151;margin-bottom:12px">Use our free Facebook video downloader — no login or app required.</p>
      <a href="/" style="display:inline-block;background:#2563EB;color:#fff;padding:10px 24px;border-radius:8px;text-decoration:none;font-weight:600">Open Downloader Tool</a>
    </div>

    <footer style="margin-top:32px;padding-top:16px;border-top:1px solid #E5E7EB;color:#666;font-size:0.9rem">
      <p>Published by <a href="/about" style="color:#2563EB">${SITE_NAME}</a> &bull;
      <a href="/" style="color:#2563EB">Download Facebook Videos Free</a> &bull;
      <a href="/blog" style="color:#2563EB">More Guides</a> &bull;
      <a href="/contact" style="color:#2563EB">Contact Us</a></p>
      <p style="margin-top:8px;font-size:0.8rem;color:#9ca3af">
        This website is not affiliated with Facebook or Meta Platforms, Inc. Facebook is a trademark of Meta Platforms, Inc.
      </p>
    </footer>
  </article>
${footerHtml()}
${htmlFoot()}`;
}

function generateAboutHTML() {
  const url = `${SITE_ORIGIN}/about`;
  const title = 'About FB Video Downloaders | Free Facebook Video Download Tool';
  const description = 'Learn about FB Video Downloaders, a free online tool that helps users save publicly available Facebook videos easily and safely.';

  const schema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': `${url}#webpage`,
    url,
    name: title,
    description,
    isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: `${SITE_ORIGIN}/` },
    publisher: { '@type': 'Organization', name: SITE_NAME, url: `${SITE_ORIGIN}/` },
    inLanguage: 'en-US',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_ORIGIN}/` },
        { '@type': 'ListItem', position: 2, name: 'About', item: url },
      ],
    },
  });

  const head = htmlHead({
    title, description,
    keywords: 'about facebook video downloader, fb video downloaders, free facebook downloader, about us',
    canonical: url,
    schema: `<script type="application/ld+json">${schema}</script>`,
  });

  return `${head}
<body>
${navHtml()}
  <main style="max-width:860px;margin:48px auto 40px;padding:0 20px;font-family:sans-serif">
    <nav style="margin-bottom:16px;font-size:0.9rem;color:#666">
      <a href="/">Home</a> &rsaquo; <span>About</span>
    </nav>

    <h1 style="font-size:2rem;font-weight:800;color:#1a1a2e;line-height:1.3;margin-bottom:12px">About FB Video Downloaders</h1>
    <p style="font-size:1.1rem;color:#374151;line-height:1.8;margin-bottom:24px">
      FB Video Downloaders is a free online tool that helps you save publicly available Facebook videos and Reels directly in your browser —
      no app needed, no login required.
    </p>

    <h2 style="font-size:1.3rem;font-weight:700;color:#1a1a2e;margin:28px 0 10px">What Is FB Video Downloaders?</h2>
    <p style="color:#374151;line-height:1.8;margin-bottom:16px">
      FB Video Downloaders is a free, browser-based tool for saving publicly available Facebook videos and Reels.
      Paste a public Facebook video link, choose your preferred quality (HD or SD), and the video downloads directly to your device.
      No account, no subscription, and no software installation is needed.
    </p>

    <h2 style="font-size:1.3rem;font-weight:700;color:#1a1a2e;margin:28px 0 10px">Who Can Use It?</h2>
    <p style="color:#374151;line-height:1.8;margin-bottom:16px">
      Anyone can use FB Video Downloaders. It is designed for everyday users on mobile, tablet, or desktop.
      The tool works in any modern browser including Chrome, Safari, Firefox, and Edge.
    </p>

    <h2 style="font-size:1.3rem;font-weight:700;color:#1a1a2e;margin:28px 0 10px">Key Facts</h2>
    <ul style="color:#374151;line-height:2;margin-bottom:16px;padding-left:1.4rem">
      <li>No Facebook login or password required</li>
      <li>No app installation needed — everything runs in your browser</li>
      <li>We do not store or keep copies of videos you download</li>
      <li>Works on Android, iPhone, tablet, and desktop</li>
      <li>Free to use with no subscription or hidden fees</li>
    </ul>

    <h2 style="font-size:1.3rem;font-weight:700;color:#1a1a2e;margin:28px 0 10px">Privacy and Safety</h2>
    <ul style="color:#374151;line-height:2;margin-bottom:16px;padding-left:1.4rem">
      <li>We never ask for your Facebook login credentials</li>
      <li>Video files go directly from Facebook's servers to your device</li>
      <li>We do not collect or sell personal data</li>
      <li>We do not use your data for advertising</li>
    </ul>

    <h2 style="font-size:1.3rem;font-weight:700;color:#1a1a2e;margin:28px 0 10px">Independence and Trademark Notice</h2>
    <p style="color:#374151;line-height:1.8;margin-bottom:16px">
      FB Video Downloaders is not affiliated with, endorsed by, or sponsored by Facebook or Meta Platforms, Inc.
      Facebook is a trademark of Meta Platforms, Inc. Third-party brand names are used for descriptive purposes only.
    </p>

    <h2 style="font-size:1.3rem;font-weight:700;color:#1a1a2e;margin:28px 0 10px">Responsible Use</h2>
    <p style="color:#374151;line-height:1.8;margin-bottom:24px">
      This tool is intended for personal and educational use only. Users should only download videos they have
      permission to save and must respect copyright, platform terms, and applicable laws.
    </p>

    <div style="background:#f0f9ff;border-left:4px solid #2563EB;padding:16px 20px;border-radius:0 8px 8px 0;margin:24px 0">
      <p style="margin:0">Have questions? <a href="/contact" style="color:#2563EB">Contact us</a> or read the <a href="/user-guide" style="color:#2563EB">user guide</a> for step-by-step download instructions.</p>
    </div>
  </main>
${footerHtml()}
${htmlFoot()}`;
}

function generateContactHTML() {
  const url = `${SITE_ORIGIN}/contact`;
  const title = 'Contact FB Video Downloaders | Support & Questions';
  const description = 'Contact FB Video Downloaders for support, questions, feedback, or issues related to our free Facebook video downloader tool.';

  const schema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${url}#webpage`,
    url,
    name: title,
    description,
    isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: `${SITE_ORIGIN}/` },
    publisher: { '@type': 'Organization', name: SITE_NAME, url: `${SITE_ORIGIN}/` },
    inLanguage: 'en-US',
  });

  const head = htmlHead({
    title, description,
    keywords: 'contact facebook video downloader, fb video downloaders support, facebook downloader help',
    canonical: url,
    schema: `<script type="application/ld+json">${schema}</script>`,
  });

  return `${head}
<body>
${navHtml()}
  <main style="max-width:860px;margin:48px auto 40px;padding:0 20px;font-family:sans-serif">
    <nav style="margin-bottom:16px;font-size:0.9rem;color:#666">
      <a href="/">Home</a> &rsaquo; <span>Contact</span>
    </nav>

    <h1 style="font-size:2rem;font-weight:800;color:#1a1a2e;line-height:1.3;margin-bottom:12px">Contact FB Video Downloaders</h1>
    <p style="font-size:1.1rem;color:#374151;line-height:1.8;margin-bottom:24px">
      Have a question, feedback, or need help with our free Facebook video downloader?
      Send us a message and we will get back to you as soon as possible.
    </p>

    <h2 style="font-size:1.2rem;font-weight:700;color:#1a1a2e;margin:24px 0 10px">Contact Email</h2>
    <p style="color:#374151;line-height:1.8;margin-bottom:16px">
      Email us at: <strong>support@fbvideodownloaders.com</strong>
    </p>

    <h2 style="font-size:1.2rem;font-weight:700;color:#1a1a2e;margin:24px 0 10px">Response Time</h2>
    <p style="color:#374151;line-height:1.8;margin-bottom:16px">
      We typically respond within 2–5 business days. We read all messages and reply to genuine inquiries.
    </p>

    <h2 style="font-size:1.2rem;font-weight:700;color:#1a1a2e;margin:24px 0 10px">What We Can Help With</h2>
    <ul style="color:#374151;line-height:2;margin-bottom:16px;padding-left:1.4rem">
      <li>Download errors or tool issues</li>
      <li>Help copying Facebook video or Reel URLs</li>
      <li>Questions about supported video types</li>
      <li>Mobile or desktop compatibility questions</li>
      <li>General questions and feedback</li>
      <li>Copyright and policy concerns</li>
    </ul>

    <h2 style="font-size:1.2rem;font-weight:700;color:#1a1a2e;margin:24px 0 10px">Before You Write</h2>
    <p style="color:#374151;line-height:1.8;margin-bottom:8px">Many common questions are already answered in our resources:</p>
    <ul style="color:#374151;line-height:2;margin-bottom:24px;padding-left:1.4rem">
      <li><a href="/user-guide" style="color:#2563EB">User Guide</a> — step-by-step instructions for downloading Facebook videos</li>
      <li><a href="/blog" style="color:#2563EB">Blog</a> — troubleshooting guides, tips, and how-to articles</li>
      <li><a href="/" style="color:#2563EB">Downloader Tool</a> — paste your link and download directly</li>
    </ul>

    <div style="background:#f0f9ff;border-left:4px solid #2563EB;padding:16px 20px;border-radius:0 8px 8px 0;margin-bottom:24px">
      <strong>Your Privacy:</strong> We do not share your contact information with third parties.
      We never ask for your Facebook password or login credentials.
    </div>

    <p style="color:#9ca3af;font-size:0.85rem;margin-top:24px">
      <strong>Disclaimer:</strong> This website is not affiliated with Facebook or Meta Platforms, Inc.
      Facebook is a trademark of Meta Platforms, Inc.
    </p>
  </main>
${footerHtml()}
${htmlFoot()}`;
}

function generateUserGuideHTML() {
  const url = `${SITE_ORIGIN}/user-guide`;
  const title = 'How to Use Facebook Video Downloader | Step-by-Step Guide';
  const description = 'Learn how to use FB Video Downloaders to save Facebook videos online with a simple step-by-step guide for mobile and desktop users.';

  const schema = [
    JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: 'How to Download a Facebook Video',
      description,
      totalTime: 'PT2M',
      step: [
        { '@type': 'HowToStep', position: 1, name: 'Copy the Facebook Video Link', text: 'Open the public Facebook video or Reel in your browser. Copy the URL from the address bar, or use Share → Copy Link.' },
        { '@type': 'HowToStep', position: 2, name: 'Paste the Link into the Downloader', text: 'Go to FB Video Downloaders homepage and paste the full link into the input box.' },
        { '@type': 'HowToStep', position: 3, name: 'Click the Download Button', text: 'Click "Analyze Link". The tool will process the link and fetch available download options.' },
        { '@type': 'HowToStep', position: 4, name: 'Choose Video Quality', text: 'Select HD for higher quality or SD for a smaller file size.' },
        { '@type': 'HowToStep', position: 5, name: 'Save the Video to Your Device', text: 'Click Download for your chosen quality. The video saves to your device downloads folder.' },
      ],
    }),
    JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_ORIGIN}/` },
        { '@type': 'ListItem', position: 2, name: 'User Guide', item: url },
      ],
    }),
  ].map((s) => `<script type="application/ld+json">${s}</script>`).join('\n  ');

  const head = htmlHead({
    title, description,
    keywords: 'how to download facebook videos, fb video downloader guide, download facebook reels, save facebook video without app',
    canonical: url,
    schema,
  });

  return `${head}
<body>
${navHtml()}
  <main style="max-width:860px;margin:48px auto 40px;padding:0 20px;font-family:sans-serif">
    <nav style="margin-bottom:16px;font-size:0.9rem;color:#666">
      <a href="/">Home</a> &rsaquo; <span>User Guide</span>
    </nav>

    <h1 style="font-size:2rem;font-weight:800;color:#1a1a2e;line-height:1.3;margin-bottom:12px">How to Use FB Video Downloaders</h1>
    <p style="font-size:1.1rem;color:#374151;line-height:1.8;margin-bottom:28px">
      This step-by-step guide explains how to download public Facebook videos and Reels using a browser.
      No app installation and no Facebook login required. Works on Android, iPhone, and desktop.
    </p>

    <h2 style="font-size:1.3rem;font-weight:700;color:#1a1a2e;margin:0 0 16px">5-Step Download Guide</h2>
    <ol style="color:#374151;line-height:2;margin-bottom:28px;padding-left:1.4rem">
      <li><strong>Copy the Facebook video link</strong> — open the public Facebook video or Reel in your browser and copy the URL from the address bar.</li>
      <li><strong>Paste the link into the downloader</strong> — go to <a href="/" style="color:#2563EB">fbvideodownloaders.com</a> and paste the full URL into the input box.</li>
      <li><strong>Click the download button</strong> — click "Analyze Link" to process the URL and fetch available quality options.</li>
      <li><strong>Choose video quality</strong> — select HD for best quality or SD for a smaller file size.</li>
      <li><strong>Save the video to your device</strong> — click Download for your chosen quality. The video saves to your downloads folder.</li>
    </ol>

    <h2 style="font-size:1.3rem;font-weight:700;color:#1a1a2e;margin:28px 0 16px">How to Use on Android</h2>
    <ol style="color:#374151;line-height:2;margin-bottom:24px;padding-left:1.4rem">
      <li>Open Facebook in your Android browser (Chrome recommended)</li>
      <li>Find the public video or Reel you want to save</li>
      <li>Copy the URL from the browser address bar</li>
      <li>Open <a href="/" style="color:#2563EB">FB Video Downloaders</a> in a new tab</li>
      <li>Paste the link and tap Download — video saves to your Downloads folder</li>
    </ol>

    <h2 style="font-size:1.3rem;font-weight:700;color:#1a1a2e;margin:28px 0 16px">How to Use on iPhone</h2>
    <ol style="color:#374151;line-height:2;margin-bottom:24px;padding-left:1.4rem">
      <li>Open Facebook in Safari or Chrome on your iPhone</li>
      <li>Navigate to the public video or Reel</li>
      <li>Tap Share, then Copy Link</li>
      <li>Open <a href="/" style="color:#2563EB">FB Video Downloaders</a> in your browser</li>
      <li>Paste the link and tap Download</li>
      <li>Use the share icon to save the video to Files or Camera Roll</li>
    </ol>

    <h2 style="font-size:1.3rem;font-weight:700;color:#1a1a2e;margin:28px 0 16px">How to Use on Desktop</h2>
    <ol style="color:#374151;line-height:2;margin-bottom:24px;padding-left:1.4rem">
      <li>Open Facebook in your desktop browser (Chrome, Firefox, Edge, or Safari)</li>
      <li>Click on the public video to open its own page</li>
      <li>Copy the full URL from the address bar</li>
      <li>Visit <a href="/" style="color:#2563EB">fbvideodownloaders.com</a></li>
      <li>Paste the link and click Analyze Link</li>
      <li>Choose HD or SD and click Download</li>
    </ol>

    <h2 style="font-size:1.3rem;font-weight:700;color:#1a1a2e;margin:28px 0 16px">Common Issues and Fixes</h2>
    <ul style="color:#374151;line-height:2;margin-bottom:24px;padding-left:1.4rem">
      <li><strong>Video not found:</strong> The video may be private — only public videos can be downloaded</li>
      <li><strong>Invalid URL error:</strong> Make sure you paste the complete URL including https://</li>
      <li><strong>Download not starting:</strong> Try a different browser or disable ad blockers</li>
      <li><strong>Low quality only:</strong> Some videos are only available in SD — HD is not always possible</li>
      <li><strong>Reel not working:</strong> Open the Reel in a browser instead of the Facebook app</li>
    </ul>

    <h2 style="font-size:1.3rem;font-weight:700;color:#1a1a2e;margin:28px 0 16px">Safety Notes</h2>
    <ul style="color:#374151;line-height:2;margin-bottom:24px;padding-left:1.4rem">
      <li>We never ask for your Facebook login or password</li>
      <li>We do not store videos on our servers</li>
      <li>Only download videos you have permission to save</li>
      <li>Use this tool for personal and educational purposes only</li>
      <li>Respect copyright and Facebook's Terms of Service</li>
    </ul>

    <h2 style="font-size:1.3rem;font-weight:700;color:#1a1a2e;margin:28px 0 16px">Frequently Asked Questions</h2>
    <dl style="color:#374151;line-height:1.8">
      <dt style="font-weight:700;margin-top:16px">How do I download a Facebook video online?</dt>
      <dd style="margin:4px 0 0 0">Copy the public Facebook video link, paste it into the downloader, click Download, choose your quality, and save the video.</dd>

      <dt style="font-weight:700;margin-top:16px">Can I download Facebook videos without an app?</dt>
      <dd style="margin:4px 0 0 0">Yes. FB Video Downloaders is entirely browser-based — nothing to install.</dd>

      <dt style="font-weight:700;margin-top:16px">Can I save Facebook Reels on my phone?</dt>
      <dd style="margin:4px 0 0 0">Yes. Open the Reel link in your mobile browser, copy the URL, paste it into the downloader, and save.</dd>

      <dt style="font-weight:700;margin-top:16px">Why is my Facebook video not downloading?</dt>
      <dd style="margin:4px 0 0 0">The video is likely private or restricted, or the link is incomplete. Only public video URLs work.</dd>

      <dt style="font-weight:700;margin-top:16px">Is it safe to use this tool?</dt>
      <dd style="margin:4px 0 0 0">Yes. We do not ask for your Facebook login, password, or personal information. Videos go directly to your device.</dd>
    </dl>

    <div style="margin:40px 0;padding:20px;background:#f0f9ff;border-radius:12px;text-align:center">
      <h2 style="font-size:1.2rem;font-weight:700;color:#1a1a2e;margin-bottom:10px">Ready to Download?</h2>
      <p style="color:#374151;margin-bottom:14px">Use the free Facebook video downloader tool — no login or app required.</p>
      <a href="/" style="display:inline-block;background:#2563EB;color:#fff;padding:10px 28px;border-radius:8px;text-decoration:none;font-weight:600">Open FB Video Downloader</a>
    </div>

    <p style="color:#9ca3af;font-size:0.85rem;margin-top:24px">
      Read more guides in our <a href="/blog" style="color:#2563EB">blog</a> or <a href="/contact" style="color:#2563EB">contact us</a> with any questions.
      This website is not affiliated with Facebook or Meta Platforms, Inc. Facebook is a trademark of Meta Platforms, Inc.
    </p>
  </main>
${footerHtml()}
${htmlFoot()}`;
}

function generateBlogIndexHTML() {
  const url = `${SITE_ORIGIN}/blog`;
  const title = 'Facebook Video Downloader Blog | Tips, Guides & Tutorials';
  const description = 'Read helpful guides, tips, and tutorials about downloading Facebook videos online safely and easily.';

  const itemList = BLOG_POSTS.slice(0, 16).map((post, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: post.title,
    url: `${SITE_ORIGIN}/blog/${post.slug}`,
  }));

  const schema = [
    JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      '@id': `${url}#webpage`,
      url,
      name: title,
      description,
      isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: `${SITE_ORIGIN}/` },
      inLanguage: 'en-US',
    }),
    JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Facebook Video Downloader Guides',
      itemListElement: itemList,
    }),
  ].map((s) => `<script type="application/ld+json">${s}</script>`).join('\n  ');

  const head = htmlHead({
    title, description,
    keywords: 'facebook video downloader blog, download facebook video guide, facebook reels tips, fb video tutorial',
    canonical: url,
    schema,
  });

  const postCards = BLOG_POSTS.map((post) => {
    const pubDate = new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    return `    <article style="border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;margin-bottom:24px">
      <div style="padding:20px">
        <div style="display:flex;gap:8px;align-items:center;margin-bottom:8px">
          <span style="background:#EFF6FF;color:#2563EB;padding:2px 10px;border-radius:20px;font-size:0.78rem;font-weight:600">${post.category}</span>
          <span style="color:#9ca3af;font-size:0.85rem">${pubDate}</span>
        </div>
        <h2 style="font-size:1.1rem;font-weight:700;color:#1a1a2e;margin:0 0 8px;line-height:1.4">
          <a href="/blog/${post.slug}" style="color:#1a1a2e;text-decoration:none">${post.title}</a>
        </h2>
        <p style="color:#6b7280;font-size:0.9rem;line-height:1.6;margin:0 0 12px">${post.excerpt}</p>
        <a href="/blog/${post.slug}" style="color:#2563EB;font-size:0.9rem;font-weight:600;text-decoration:none">Read article &rarr;</a>
      </div>
    </article>`;
  }).join('\n');

  return `${head}
<body>
${navHtml()}
  <main style="max-width:860px;margin:48px auto 40px;padding:0 20px;font-family:sans-serif">
    <h1 style="font-size:2rem;font-weight:800;color:#1a1a2e;line-height:1.3;margin-bottom:12px">Facebook Video Downloader Blog</h1>
    <p style="font-size:1.1rem;color:#374151;line-height:1.8;margin-bottom:8px">
      Step-by-step guides, tips, and tutorials for downloading Facebook videos and Reels safely and easily.
    </p>
    <p style="color:#6b7280;margin-bottom:32px">
      New to the tool? <a href="/user-guide" style="color:#2563EB;font-weight:600">Read the User Guide</a> or
      <a href="/" style="color:#2563EB;font-weight:600">go to the downloader</a>.
    </p>

${postCards}

    <div style="margin:40px 0;padding:20px;background:#f0f9ff;border-radius:12px;text-align:center">
      <h2 style="font-size:1.2rem;font-weight:700;color:#1a1a2e;margin-bottom:10px">Ready to Download a Facebook Video?</h2>
      <p style="color:#374151;margin-bottom:14px">Use our free tool — no login or app required.</p>
      <a href="/" style="display:inline-block;background:#2563EB;color:#fff;padding:10px 28px;border-radius:8px;text-decoration:none;font-weight:600">Open Downloader Tool</a>
    </div>
  </main>
${footerHtml()}
${htmlFoot()}`;
}

let count = 0;

// Generate blog post static HTML files
for (const post of BLOG_POSTS) {
  const dir = resolve(DIST, 'blog', post.slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(resolve(dir, 'index.html'), withApp(generateBlogHTML(post), `/blog/${post.slug}`), 'utf8');
  console.log(`✓ Generated: /blog/${post.slug}/index.html`);
  count++;
}

// Generate static page HTML files
const pages = [
  { path: 'about', generate: generateAboutHTML },
  { path: 'contact', generate: generateContactHTML },
  { path: 'user-guide', generate: generateUserGuideHTML },
  { path: 'blog', generate: generateBlogIndexHTML },
];

for (const page of pages) {
  const dir = resolve(DIST, page.path);
  mkdirSync(dir, { recursive: true });
  writeFileSync(resolve(dir, 'index.html'), withApp(page.generate(), `/${page.path}`), 'utf8');
  console.log(`✓ Generated: /${page.path}/index.html`);
  count++;
}

const legalPages = [
  { path: 'privacy-policy', title: 'Privacy Policy - FB Video Downloaders', description: "Read FB Video Downloaders' privacy policy and how the service handles links and personal information." },
  { path: 'terms-conditions', title: 'Terms of Service - FB Video Downloaders', description: 'Read the terms of service for using FB Video Downloaders responsibly.' },
  { path: 'disclaimer', title: 'Disclaimer - FB Video Downloaders', description: 'Read the FB Video Downloaders disclaimer and trademark notice.' },
];
for (const page of legalPages) {
  const dir = resolve(DIST, page.path);
  mkdirSync(dir, { recursive: true });
  const head = htmlHead({ title: page.title, description: page.description, canonical: `${SITE_ORIGIN}/${page.path}`, schema: '' })
    .replace('content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"', 'content="noindex, follow"');
  writeFileSync(resolve(dir, 'index.html'), withApp(`${head}<body></body></html>`, `/${page.path}`), 'utf8');
  count++;
}

const spanishPath = 'es/descargar-video-de-facebook';
const spanishFile = resolve(DIST, spanishPath, 'index.html');
writeFileSync(spanishFile, withApp(readFileSync(spanishFile, 'utf8'), `/${spanishPath}`), 'utf8');
writeFileSync(resolve(DIST, 'index.html'), withApp(builtIndex, '/'), 'utf8');
unlinkSync(ssrBundle);

console.log(`\nDone! Generated ${count} route HTML files in dist/`);
