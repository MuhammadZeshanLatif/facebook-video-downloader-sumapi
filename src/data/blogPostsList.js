/** Shared blog listing metadata (order: newest first for "latest") */
export const BLOG_POSTS = [
  {
    slug: 'how-to-reuse-facebook-videos-for-content-creation-easy-guide',
    title: 'How to Reuse Facebook Videos for Content Creation (Easy Guide)',
    excerpt:
      'Learn how to reuse Facebook videos for content creation with simple steps. Turn one video into multiple posts, grow faster, and save time.',
    date: '2026-04-27',
    category: 'Content Strategy',
    readTime: '12 min read',
    image: '/images/how-to-reuse-facebook-videos-for-content-creation.png',
    imageAlt:
      'How to Reuse Facebook Videos for Content Creation (Easy Guide) featured image with a download icon and title text.',
  },
  {
    slug: 'facebook-copyright-rules-explained-simple-guide-2026',
    title: 'Facebook Copyright Rules Explained (Simple Guide 2026)',
    excerpt:
      'Learn Facebook copyright rules in simple words. See what is allowed, what is not, and how to avoid strikes or bans on videos, reels, and music.',
    date: '2026-04-24',
    category: 'Legal',
    readTime: '12 min read',
    image: '/images/facebook-copyright-rules-explained.webp',
    imageAlt:
      'Facebook Copyright Rules Explained (Simple Guide 2026) header image featuring a video download icon and social media graphics.',
  },
  {
    slug: 'why-some-videos-download-slower-than-others',
    title: 'Why Some Videos Download Slower Than Others',
    excerpt:
      'Learn why some videos download slower than others and how file size, server speed, platform limits, and device issues affect download time.',
    date: '2026-04-20',
    category: 'Technical',
    readTime: '10 min read',
    image: '/images/why-some-videos-download-slower-than-others.png',
    imageAlt:
      'Why some videos download slower than others featured image with video download icon and text',
  },
  {
    slug: 'best-practices-for-saving-facebook-videos',
    title: 'Best Practices for Saving Facebook Videos',
    excerpt:
      'Learn the best practices for saving Facebook videos safely. Avoid risks, protect your data, and download videos in HD without login or apps.',
    date: '2026-04-18',
    category: 'Tips',
    readTime: '12 min read',
    image: '/images/best-practices-saving-facebook-videos.webp',
    imageAlt:
      'Best practices for saving Facebook videos — banner with download icon for safe HD Facebook video saving',
  },
  {
    slug: 'facebook-video-downloader-privacy-and-security-safe-or-risky',
    title: 'Facebook Video Downloader: Privacy and Security (Safe or Risky?)',
    excerpt:
      'Is a Facebook video downloader safe? Learn privacy risks, security threats, and safe ways to download Facebook videos without risking your data.',
    date: '2026-04-16',
    category: 'Security',
    readTime: '10 min read',
    image: '/images/facebook-video-downloader-privacy-and-security.png',
    imageAlt: 'Facebook Video Downloader: Privacy and Security',
  },
  {
    slug: 'troubleshooting-common-download-issues-step-by-step-guide',
    title: 'Troubleshooting Common Download Issues: A Step-by-Step Guide',
    excerpt:
      'Downloading files can sometimes be tricky, and you may face various issues like slow downloads or files that won’t open.',
    date: '2026-04-14',
    category: 'Support',
    readTime: '18 min read',
    image: '/images/troubleshooting-common-download-issues.png',
    imageAlt: 'Image showing a computer screen with a download error message',
  },
  {
    slug: 'understanding-facebook-video-formats-and-quality',
    title: 'Understanding Facebook Video Formats and Quality',
    excerpt:
      'Watching Facebook videos is easy, but many users get confused about video formats and quality.',
    date: '2026-04-08',
    category: 'Technical',
    readTime: '11 min read',
    image: '/images/understanding-facebook-video-formats-andquality.webp',
    imageAlt: 'Understanding Facebook Video Formats and Quality',
  },
  {
    slug: 'facebook-reels-complete-download-guide-hd-mobile-desktop',
    title: 'Facebook Reels: Complete Download Guide (HD, Mobile & Desktop)',
    excerpt:
      'Downloading Facebook Reels sounds easy, but it often doesn’t work. You copy the link, try a tool, and nothing happens.',
    date: '2026-04-08',
    category: 'Guide',
    readTime: '11 min read',
    image: '/images/facebook-reels-complete-download-guide.webp',
    imageAlt: 'Facebook Reels: Complete Download Guide (HD, Mobile & Desktop)',
  },
  {
    slug: 'facebook-video-downloader-mobile-vs-desktop-which-is-better',
    title: 'Facebook Video Downloader: Mobile vs Desktop (Which Is Better?)',
    excerpt:
      'Downloading Facebook videos looks simple, but many users get confused when choosing between mobile and desktop.',
    date: '2026-04-08',
    category: 'Comparison',
    readTime: '11 min read',
    image: '/images/mobile-vs-desktop-facebook-videos.webp',
    imageAlt: 'Facebook Video Downloader: Mobile vs Desktop (Which Is Better?)',
  },
  {
    slug: 'is-it-legal-to-download-facebook-videos-complete-guide',
    title: 'Is It Legal to Download Facebook Videos? (Complete Guide)',
    excerpt:
      'Downloading a Facebook video feels simple, but many people hesitate. You copy the link, open a downloader, and then stop.',
    date: '2026-04-08',
    category: 'Legal',
    readTime: '11 min read',
    image: '/images/is-it-legal-to-download-facebook-videos.webp',
    imageAlt: 'Is It Legal to Download Facebook Videos? Complete Guide',
  },
  {
    slug: 'how-to-download-facebook-videos-in-hd-quality-complete-guide',
    title: 'How to Download Facebook Videos in HD Quality (Complete Guide)',
    excerpt:
      'Downloading a Facebook video sounds simple, but it often fails. You copy the link, paste it into a downloader, and expect HD quality.',
    date: '2026-04-08',
    category: 'Guide',
    readTime: '12 min read',
    image: '/images/how-to-download-facebook-videos-in-hd-quality.webp',
    imageAlt: 'How to Download Facebook Videos in HD Quality',
  },
  {
    slug: 'top-10-tips-facebook-video-downloading',
    title: 'Top 10 Tips for Facebook Video Downloading',
    excerpt:
      'Many people try to download a Facebook video and it fails. The link looks correct, but nothing happens. Sometimes the video downloads in low quality, or the sound is missing.',
    date: '2026-04-04',
    category: 'Tips',
    readTime: '14 min read',
    image: '/images/top-10-tips-for-facebook-video-downloading.webp',
    imageAlt: 'Top 10 tips for downloading Facebook videos — illustrated guide showing video download steps and quality options',
  },
];

export const SITE_ORIGIN = 'https://fbvideodownloaders.com';

export function getPostBySlug(slug) {
  return BLOG_POSTS.find((p) => p.slug === slug) || null;
}
