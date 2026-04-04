/** Shared blog listing metadata (order: newest first for "latest") */
export const BLOG_POSTS = [
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
