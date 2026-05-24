/**
 * Prerender script: generates static HTML shells for each route.
 * AI crawlers (no JS) read this HTML. Browsers load React and hydrate.
 * Run: node scripts/prerender.js
 */

import { writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const PUBLIC = resolve(ROOT, 'public');

// --- Blog post data (mirrors src/data/blogPostsList.js) ---
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

const STATIC_PAGES = [
  {
    path: 'user-guide',
    title: 'How to Use Facebook Video Downloader | FB Video Downloaders',
    description: 'Step-by-step guide: how to download Facebook videos and Reels using FB Video Downloaders. Works on Android, iPhone, and desktop browsers. No login required.',
    keywords: 'how to use facebook video downloader, facebook video download guide, fb video downloader tutorial',
    image: `${SITE_ORIGIN}/images/og-image.png`,
  },
  {
    path: 'about',
    title: 'About FB Video Downloaders - Free Facebook Video Downloader',
    description: 'Learn about FB Video Downloaders, our editorial goals, and how we provide educational guides for downloading publicly available Facebook videos responsibly.',
    keywords: 'about facebook video downloader, fb video downloaders, free facebook downloader',
    image: `${SITE_ORIGIN}/images/og-image.png`,
  },
  {
    path: 'blog',
    title: 'Facebook Video Downloader Guides & Tips | FB Video Downloaders Blog',
    description: 'Read practical Facebook video downloading guides, privacy tips, HD quality help, mobile advice, and safe usage articles.',
    keywords: 'facebook video downloader blog, facebook download guides, facebook video tips',
    image: `${SITE_ORIGIN}/images/og-image.png`,
  },
];

function generateBlogHTML(post) {
  const url = `${SITE_ORIGIN}/blog/${post.slug}`;
  const imageUrl = post.image.startsWith('http') ? post.image : `${SITE_ORIGIN}${post.image}`;
  const isoPub = `${post.date}T08:00:00+00:00`;

  const schema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: [imageUrl],
    datePublished: isoPub,
    dateModified: isoPub,
    author: [
      { '@type': 'Person', name: 'FB Video Downloaders Editorial Team', url: `${SITE_ORIGIN}/about` },
      { '@type': 'Organization', name: SITE_NAME, url: `${SITE_ORIGIN}/` },
    ],
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: { '@type': 'ImageObject', url: `${SITE_ORIGIN}/images/logo.webp` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    url,
  });

  const breadcrumb = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_ORIGIN}/` },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_ORIGIN}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: url },
    ],
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="author" content="${SITE_NAME}" />
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />

  <title>${post.title} | ${SITE_NAME}</title>
  <meta name="description" content="${post.excerpt}" />
  <meta name="keywords" content="${post.keywords}" />

  <link rel="canonical" href="${url}" />
  <link rel="icon" type="image/png" href="/favicon.png" />

  <!-- Open Graph -->
  <meta property="og:type" content="article" />
  <meta property="og:site_name" content="${SITE_NAME}" />
  <meta property="og:title" content="${post.title}" />
  <meta property="og:description" content="${post.excerpt}" />
  <meta property="og:url" content="${url}" />
  <meta property="og:image" content="${imageUrl}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="article:published_time" content="${isoPub}" />
  <meta property="article:section" content="${post.category}" />
  <meta property="article:author" content="${SITE_NAME}" />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@fbvideodownloads" />
  <meta name="twitter:title" content="${post.title}" />
  <meta name="twitter:description" content="${post.excerpt}" />
  <meta name="twitter:image" content="${imageUrl}" />

  <!-- Schema.org -->
  <script type="application/ld+json">${schema}</script>
  <script type="application/ld+json">${breadcrumb}</script>

  <!-- Bootstrap -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
</head>
<body>
  <div id="root">
    <!-- Static content for AI crawlers — React replaces this on load -->
    <article itemScope itemType="https://schema.org/BlogPosting" style="max-width:800px;margin:80px auto 40px;padding:0 20px;font-family:sans-serif">
      <nav aria-label="Breadcrumb" style="margin-bottom:16px;font-size:0.9rem;color:#666">
        <a href="/">Home</a> &rsaquo; <a href="/blog">Blog</a> &rsaquo; <span>${post.title}</span>
      </nav>

      <span itemProp="articleSection" style="display:inline-block;background:#EFF6FF;color:#2563EB;padding:4px 12px;border-radius:20px;font-size:0.8rem;font-weight:600;margin-bottom:12px">${post.category}</span>

      <h1 itemProp="headline" style="font-size:2rem;font-weight:800;color:#1a1a2e;line-height:1.3;margin-bottom:16px">${post.title}</h1>

      <div style="display:flex;gap:16px;align-items:center;margin-bottom:24px;color:#666;font-size:0.9rem">
        <span itemprop="author" itemScope itemType="https://schema.org/Person">
          <span itemProp="name">FB Video Downloaders Editorial Team</span>
        </span>
        <span>&bull;</span>
        <time itemprop="datePublished" dateTime="${isoPub}">${new Date(isoPub).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
      </div>

      <img src="${imageUrl}" alt="${post.title}" itemProp="image"
        style="width:100%;max-height:400px;object-fit:cover;border-radius:12px;margin-bottom:24px" />

      <p itemProp="description" style="font-size:1.1rem;color:#374151;line-height:1.8;margin-bottom:24px">
        ${post.excerpt}
      </p>

      <p style="color:#374151;line-height:1.8">
        This guide covers everything you need to know about ${post.title.toLowerCase()}.
        FB Video Downloaders provides step-by-step instructions for downloading public Facebook videos
        and Reels in HD quality. No login required. Works on Android, iPhone, and all major desktop browsers.
      </p>

      <div style="background:#F0F9FF;border-left:4px solid #2563EB;padding:16px 20px;border-radius:0 8px 8px 0;margin:24px 0">
        <strong>Quick Summary:</strong> ${post.excerpt}
      </div>

      <p style="color:#374151;line-height:1.8">
        For the complete interactive guide with step-by-step instructions, screenshots, and tips,
        please enable JavaScript or <a href="${url}" style="color:#2563EB">visit the full page</a>.
        You can also explore related guides in our <a href="/blog" style="color:#2563EB">blog section</a>
        or use the <a href="/user-guide" style="color:#2563EB">user guide</a> for a complete walkthrough.
      </p>

      <footer style="margin-top:32px;padding-top:16px;border-top:1px solid #E5E7EB;color:#666;font-size:0.9rem">
        <p>Published by <a href="/about" style="color:#2563EB">${SITE_NAME}</a> &bull;
        <a href="/" style="color:#2563EB">Download Facebook Videos Free</a> &bull;
        <a href="/blog" style="color:#2563EB">More Guides</a></p>
      </footer>
    </article>
  </div>

  <script type="module" src="/src/main.jsx"></script>
</body>
</html>`;
}

function generateStaticPageHTML(page) {
  const url = `${SITE_ORIGIN}/${page.path}`;

  const schema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: page.title,
    description: page.description,
    isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: `${SITE_ORIGIN}/` },
    publisher: { '@type': 'Organization', name: SITE_NAME, url: `${SITE_ORIGIN}/` },
    inLanguage: 'en-US',
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="robots" content="index, follow" />
  <title>${page.title}</title>
  <meta name="description" content="${page.description}" />
  <meta name="keywords" content="${page.keywords}" />
  <link rel="canonical" href="${url}" />
  <link rel="icon" type="image/png" href="/favicon.png" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="${SITE_NAME}" />
  <meta property="og:title" content="${page.title}" />
  <meta property="og:description" content="${page.description}" />
  <meta property="og:url" content="${url}" />
  <meta property="og:image" content="${page.image}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${page.title}" />
  <meta name="twitter:description" content="${page.description}" />
  <script type="application/ld+json">${schema}</script>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
</head>
<body>
  <div id="root">
    <div style="max-width:800px;margin:80px auto 40px;padding:0 20px;font-family:sans-serif">
      <nav style="margin-bottom:16px;font-size:0.9rem;color:#666">
        <a href="/">Home</a> &rsaquo; <span>${page.title}</span>
      </nav>
      <h1 style="font-size:2rem;font-weight:800;color:#1a1a2e;line-height:1.3">${page.title}</h1>
      <p style="font-size:1.1rem;color:#374151;line-height:1.8;margin-top:16px">${page.description}</p>
      <p style="color:#374151;line-height:1.8;margin-top:16px">
        Loading full content... If JavaScript is disabled, please visit
        <a href="/" style="color:#2563EB">FB Video Downloaders home page</a> for the video download tool.
      </p>
    </div>
  </div>
  <script type="module" src="/src/main.jsx"></script>
</body>
</html>`;
}

let count = 0;

// Generate blog post static HTML files
for (const post of BLOG_POSTS) {
  const dir = resolve(PUBLIC, 'blog', post.slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(resolve(dir, 'index.html'), generateBlogHTML(post), 'utf8');
  console.log(`✓ Generated: /blog/${post.slug}/index.html`);
  count++;
}

// Generate static page HTML files
for (const page of STATIC_PAGES) {
  const dir = resolve(PUBLIC, page.path);
  mkdirSync(dir, { recursive: true });
  writeFileSync(resolve(dir, 'index.html'), generateStaticPageHTML(page), 'utf8');
  console.log(`✓ Generated: /${page.path}/index.html`);
  count++;
}

console.log(`\nDone! Generated ${count} static HTML files in public/`);
console.log('These files are served directly by the web server to AI crawlers.');
console.log('Browsers will load React from /src/main.jsx for the full interactive experience.');
