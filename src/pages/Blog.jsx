import React from 'react';
import SEO from '../components/SEO';

const blogPosts = [
  {
    id: 1,
    title: "How to Download Facebook Videos in HD Quality",
    excerpt: "Learn the step-by-step process of downloading Facebook videos in high definition quality using our free downloader tool.",
    image: "https://via.placeholder.com/400x250?text=HD+Video+Download",
    date: "2024-01-15",
    category: "Tutorial",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "Facebook Reels: Complete Download Guide",
    excerpt: "Everything you need to know about downloading Facebook Reels, including tips for best quality and format options.",
    image: "https://via.placeholder.com/400x250?text=Facebook+Reels",
    date: "2024-01-10",
    category: "Guide",
    readTime: "7 min read"
  },
  {
    id: 3,
    title: "Understanding Facebook Video Formats and Quality",
    excerpt: "A comprehensive guide to Facebook video formats, resolutions, and how to choose the best quality for your downloads.",
    image: "https://via.placeholder.com/400x250?text=Video+Formats",
    date: "2024-01-05",
    category: "Technical",
    readTime: "6 min read"
  },
  {
    id: 4,
    title: "Is It Legal to Download Facebook Videos?",
    excerpt: "Understanding the legal aspects of downloading Facebook videos, copyright considerations, and best practices.",
    image: "https://via.placeholder.com/400x250?text=Legal+Guide",
    date: "2024-01-01",
    category: "Legal",
    readTime: "8 min read"
  },
  {
    id: 5,
    title: "Top 10 Tips for Facebook Video Downloading",
    excerpt: "Expert tips and tricks to make the most of our Facebook video downloader tool and ensure successful downloads.",
    image: "https://via.placeholder.com/400x250?text=Tips+and+Tricks",
    date: "2023-12-28",
    category: "Tips",
    readTime: "4 min read"
  },
  {
    id: 6,
    title: "Facebook Video Downloader: Mobile vs Desktop",
    excerpt: "Compare the experience of downloading Facebook videos on mobile devices versus desktop computers.",
    image: "https://via.placeholder.com/400x250?text=Mobile+vs+Desktop",
    date: "2023-12-25",
    category: "Comparison",
    readTime: "5 min read"
  },
  {
    id: 7,
    title: "Troubleshooting Common Download Issues",
    excerpt: "Solutions to common problems users face when downloading Facebook videos, including error fixes and workarounds.",
    image: "https://via.placeholder.com/400x250?text=Troubleshooting",
    date: "2023-12-20",
    category: "Support",
    readTime: "6 min read"
  },
  {
    id: 8,
    title: "Facebook Video Downloader: Privacy and Security",
    excerpt: "Learn how we protect your privacy and ensure secure downloads when using our Facebook video downloader service.",
    image: "https://via.placeholder.com/400x250?text=Privacy+Security",
    date: "2023-12-15",
    category: "Security",
    readTime: "5 min read"
  },
  {
    id: 9,
    title: "Best Practices for Saving Facebook Videos",
    excerpt: "Discover best practices for organizing, storing, and managing your downloaded Facebook videos effectively.",
    image: "https://via.placeholder.com/400x250?text=Best+Practices",
    date: "2023-12-10",
    category: "Tips",
    readTime: "4 min read"
  }
];

function Blog() {
  return (
    <>
      <SEO
        title="Blog - Facebook Video Downloader | Guides, Tips & Tutorials"
        description="Read our blog for guides, tutorials, and tips on downloading Facebook videos, Reels, and understanding video formats and quality."
        keywords="blog, guides, tutorials, facebook video download tips, how to download facebook videos"
        ogUrl="https://facebookvideodownloader.com/blog"
      />
      <div className="th-section" style={{ paddingTop: '120px' }}>
      <div className="th-container">
        <div className="th-section-header">
          <div className="th-badge mb-3">
            <i className="fas fa-blog me-2"></i>Blog
          </div>
          <h1 className="th-section-title">Facebook Video Downloader Blog</h1>
          <p className="th-section-desc">
            Stay updated with the latest guides, tutorials, and tips for downloading Facebook videos.
          </p>
        </div>

        <div className="row g-4 mt-4">
          {blogPosts.map((post) => (
            <div key={post.id} className="col-lg-4 col-md-6">
              <div className="fb-tool-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div style={{ 
                  width: '100%', 
                  height: '200px', 
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '12px',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '1.2rem',
                  fontWeight: 'bold'
                }}>
                  {post.category}
                </div>
                
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div className="d-flex align-items-center mb-2" style={{ fontSize: '0.85rem', color: 'var(--th-body)' }}>
                    <span className="me-3">
                      <i className="fas fa-calendar me-1"></i>
                      {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </span>
                    <span>
                      <i className="fas fa-clock me-1"></i>
                      {post.readTime}
                    </span>
                  </div>
                  
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '0.75rem', color: 'var(--th-dark)' }}>
                    {post.title}
                  </h3>
                  
                  <p style={{ color: 'var(--th-body)', flex: 1, marginBottom: '1rem' }}>
                    {post.excerpt}
                  </p>
                  
                  <div className="d-flex align-items-center justify-content-between">
                    <span className="th-badge th-badge-pill" style={{ fontSize: '0.75rem' }}>
                      {post.category}
                    </span>
                    <button className="th-btn th-btn-outline" style={{ padding: '6px 16px', fontSize: '0.85rem' }}>
                      Read More <i className="fas fa-arrow-right ms-2"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-5">
          <button className="th-btn th-btn-primary">
            Load More Articles
          </button>
        </div>
      </div>
    </div>
    </>
  );
}

export default Blog;

