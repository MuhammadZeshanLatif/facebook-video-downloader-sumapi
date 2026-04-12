import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { BLOG_POSTS } from '../data/blogPostsList';

const CATEGORY_ICONS = {
  Tips:       'fa-lightbulb',
  Tutorial:   'fa-graduation-cap',
  Guide:      'fa-map',
  Technical:  'fa-cogs',
  Legal:      'fa-balance-scale',
  Comparison: 'fa-exchange-alt',
  Support:    'fa-life-ring',
  Security:   'fa-shield-alt',
};

function Blog() {
  return (
    <>
      <SEO
        title="Facebook Video Downloader Blog - Guides, Tips & Tutorials | FBSave HD"
        description="Read expert guides and tutorials on how to download Facebook videos and Reels in HD quality. Tips, tricks, and best practices for saving Facebook content easily and safely."
        keywords="facebook video downloader blog, download facebook video guide, facebook reels tips, fb video download tutorial, how to download facebook videos, facebook video tips"
        ogUrl="https://fbvideodownloaders.com/blog"
      />

      <div className="th-section" style={{ paddingTop: '110px' }}>
        <div className="th-container">

          {/* Page Header */}
          <div className="th-blog-hero">
            <h1 className="th-blog-hero-title">
              Tips, Guides &amp;{' '}
              <span className="th-gradient-text">Tutorials</span>
            </h1>
            <p className="th-blog-hero-desc">
              Stay updated with the latest guides and tips for downloading
              Facebook videos, Reels, and more — completely free.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="row g-4">
            {BLOG_POSTS.map((post) => {
              const icon = CATEGORY_ICONS[post.category] || 'fa-newspaper';
              const hasSlugg = Boolean(post.slug);

              return (
                <div key={post.title} className="col-lg-4 col-md-6">
                  <div className={`th-blog-card${hasSlugg ? '' : ' th-blog-card--soon'}`}>

                    {/* Thumbnail */}
                    <div className="th-blog-thumb" data-cat={post.category}>
                      {post.image ? (
                        <img
                          src={post.image}
                          alt={post.imageAlt}
                          className="th-blog-thumb-img"
                          loading="lazy"
                          width="400"
                          height="180"
                        />
                      ) : (
                        <i className={`fas ${icon} th-blog-thumb-icon`}></i>
                      )}
                      <span className="th-blog-cat-badge">{post.category}</span>
                      <span className="th-blog-time-badge">
                        <i className="fas fa-clock me-1"></i>{post.readTime}
                      </span>
                      {!hasSlugg && (
                        <div className="th-blog-thumb-soon">
                          <span>Coming Soon</span>
                        </div>
                      )}
                    </div>

                    {/* Body */}
                    <div className="th-blog-body">
                      <div className="th-blog-meta">
                        <span>
                          <i className="fas fa-calendar"></i>
                          {new Date(post.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                      </div>

                      <h2 className="th-blog-title">{post.title}</h2>
                      <p className="th-blog-desc">{post.excerpt}</p>

                      {hasSlugg ? (
                        <Link to={`/blog/${post.slug}`} className="th-blog-link">
                          Read Article <i className="fas fa-arrow-right"></i>
                        </Link>
                      ) : (
                        <span className="th-blog-link" style={{ color: 'var(--th-muted)', cursor: 'default' }}>
                          Coming soon&hellip;
                        </span>
                      )}
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </>
  );
}

export default Blog;
