/** Shared blog listing metadata (order: newest first for "latest") */
export const BLOG_POSTS = [
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
  {
    slug: null,
    title: 'How to Download Facebook Videos in HD Quality',
    excerpt:
      'Learn the step-by-step process of downloading Facebook videos in high definition quality using our free downloader tool.',
    date: '2024-01-15',
    category: 'Tutorial',
    readTime: '5 min read',
  },
  {
    slug: null,
    title: 'Facebook Reels: Complete Download Guide',
    excerpt:
      'Everything you need to know about downloading Facebook Reels, including tips for best quality and format options.',
    date: '2024-01-10',
    category: 'Guide',
    readTime: '7 min read',
  },
  {
    slug: null,
    title: 'Understanding Facebook Video Formats and Quality',
    excerpt:
      'A comprehensive guide to Facebook video formats, resolutions, and how to choose the best quality for your downloads.',
    date: '2024-01-05',
    category: 'Technical',
    readTime: '6 min read',
  },
  {
    slug: null,
    title: 'Is It Legal to Download Facebook Videos?',
    excerpt:
      'Understanding the legal aspects of downloading Facebook videos, copyright considerations, and best practices.',
    date: '2024-01-01',
    category: 'Legal',
    readTime: '8 min read',
  },
  {
    slug: null,
    title: 'Facebook Video Downloader: Mobile vs Desktop',
    excerpt:
      'Compare the experience of downloading Facebook videos on mobile devices versus desktop computers.',
    date: '2023-12-25',
    category: 'Comparison',
    readTime: '5 min read',
  },
  {
    slug: null,
    title: 'Troubleshooting Common Download Issues',
    excerpt:
      'Solutions to common problems users face when downloading Facebook videos, including error fixes and workarounds.',
    date: '2023-12-20',
    category: 'Support',
    readTime: '6 min read',
  },
  {
    slug: null,
    title: 'Facebook Video Downloader: Privacy and Security',
    excerpt:
      'Learn how we protect your privacy and ensure secure downloads when using our Facebook video downloader service.',
    date: '2023-12-15',
    category: 'Security',
    readTime: '5 min read',
  },
  {
    slug: null,
    title: 'Best Practices for Saving Facebook Videos',
    excerpt:
      'Discover best practices for organizing, storing, and managing your downloaded Facebook videos effectively.',
    date: '2023-12-10',
    category: 'Tips',
    readTime: '4 min read',
  },
];

export const SITE_ORIGIN = 'https://facebookvideodownloader.com';

export function getPostBySlug(slug) {
  return BLOG_POSTS.find((p) => p.slug === slug) || null;
}
