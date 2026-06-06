import React, { useEffect, useMemo, useRef } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import SEO from '../components/SEO';
import { BLOG_POSTS } from '../data/blogPostsList';
import { buildBlogIndexJsonLd } from '../data/pageSchemas';

const POSTS_PER_PAGE = 9;

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
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const pageRaw = searchParams.get('page');
  const skipScrollRef = useRef(true);

  const { totalPages, currentPage, postsOnPage } = useMemo(() => {
    const total = BLOG_POSTS.length;
    const pages = Math.max(1, Math.ceil(total / POSTS_PER_PAGE));
    const parsed = pageRaw ? parseInt(pageRaw, 10) : NaN;
    const requested = Number.isFinite(parsed) && parsed >= 1 ? parsed : 1;
    const page = Math.min(requested, pages);
    const start = (page - 1) * POSTS_PER_PAGE;
    return {
      totalPages: pages,
      currentPage: page,
      postsOnPage: BLOG_POSTS.slice(start, start + POSTS_PER_PAGE),
    };
  }, [pageRaw]);

  useEffect(() => {
    if (!pageRaw) return;
    const parsed = parseInt(pageRaw, 10);
    const invalid = !Number.isFinite(parsed) || parsed < 1 || parsed > totalPages;
    if (invalid) {
      navigate(currentPage === 1 ? '/blog' : `/blog?page=${currentPage}`, { replace: true });
    }
  }, [pageRaw, currentPage, totalPages, navigate]);

  useEffect(() => {
    if (skipScrollRef.current) {
      skipScrollRef.current = false;
      return;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  return (
    <>
      <SEO
        title="Facebook Video Downloader Blog | Tips, Guides & Tutorials"
        description="Read helpful guides, tips, and tutorials about downloading Facebook videos online safely and easily."
        keywords="facebook video downloader blog, download facebook video guide, facebook reels tips, fb video download tutorial, how to download facebook videos, facebook video tips"
        ogUrl="https://fbvideodownloaders.com/blog"
        jsonLd={buildBlogIndexJsonLd()}
      />

      <div className="th-section" style={{ paddingTop: '110px' }}>
        <div className="th-container">

          {/* Page Header */}
          <div className="th-blog-hero">
            <h1 className="th-blog-hero-title">
              Facebook Video Downloader{' '}
              <span className="th-gradient-text">Blog</span>
            </h1>
            <p className="th-blog-hero-desc">
              Step-by-step guides, tips, and tutorials for downloading Facebook videos and Reels safely and easily.
              New to the tool? <Link to="/user-guide" style={{ color: 'var(--th-primary)', fontWeight: 600 }}>Read the User Guide</Link> or <Link to="/" style={{ color: 'var(--th-primary)', fontWeight: 600 }}>go to the downloader</Link>.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="row g-4">
            {postsOnPage.map((post) => {
              const icon = CATEGORY_ICONS[post.category] || 'fa-newspaper';
              const hasSlugg = Boolean(post.slug);

              return (
                <div key={post.slug || post.title} className="col-lg-4 col-md-6">
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

          {totalPages > 1 && (
            <nav className="th-blog-pagination" aria-label="Blog list pagination">
              <span className="th-blog-pagination-info">
                Page {currentPage} of {totalPages}
              </span>
              <div className="th-blog-pagination-pages">
                {currentPage > 1 ? (
                  <Link
                    to={currentPage === 2 ? '/blog' : `/blog?page=${currentPage - 1}`}
                    className="th-btn th-btn-outline th-btn-outline-sm"
                    rel="prev"
                  >
                    <i className="fas fa-chevron-left me-1" aria-hidden="true" />
                    Previous
                  </Link>
                ) : (
                  <span className="th-btn th-btn-outline th-btn-outline-sm th-blog-pagination-disabled" aria-disabled="true">
                    <i className="fas fa-chevron-left me-1" aria-hidden="true" />
                    Previous
                  </span>
                )}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
                  const isActive = p === currentPage;
                  const to = p === 1 ? '/blog' : `/blog?page=${p}`;
                  return isActive ? (
                    <span key={p} className="th-blog-pagination-num th-blog-pagination-num--active" aria-current="page">
                      {p}
                    </span>
                  ) : (
                    <Link key={p} to={to} className="th-blog-pagination-num">
                      {p}
                    </Link>
                  );
                })}
                {currentPage < totalPages ? (
                  <Link
                    to={`/blog?page=${currentPage + 1}`}
                    className="th-btn th-btn-outline th-btn-outline-sm"
                    rel="next"
                  >
                    Next
                    <i className="fas fa-chevron-right ms-1" aria-hidden="true" />
                  </Link>
                ) : (
                  <span className="th-btn th-btn-outline th-btn-outline-sm th-blog-pagination-disabled" aria-disabled="true">
                    Next
                    <i className="fas fa-chevron-right ms-1" aria-hidden="true" />
                  </span>
                )}
              </div>
            </nav>
          )}

        </div>
      </div>
    </>
  );
}

export default Blog;
