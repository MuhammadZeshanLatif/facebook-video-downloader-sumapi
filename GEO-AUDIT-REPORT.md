# GEO Audit Report: FB Video Downloaders

**Audit Date:** 2026-05-24  
**URL:** https://fbvideodownloaders.com/  
**Business Type:** Free SaaS Tool / Publisher  
**Pages Analyzed:** 21 (from sitemap)  
**Audited By:** Claude Code GEO Audit Skill  

---

## Executive Summary

**Overall GEO Score: 18/100 (CRITICAL)**

fbvideodownloaders.com is currently near-invisible to AI search engines. The site has three compounding critical issues: (1) major AI crawlers are explicitly blocked in robots.txt, (2) all content is JavaScript-rendered via Vite+React SPA with no server-side rendering, making it unreadable even by crawlers that aren't blocked, and (3) there is zero structured data, no llms.txt, and no E-E-A-T signals. Urgent technical fixes are needed before any content optimization will have impact.

### Score Breakdown

| Category | Score | Weight | Weighted Score |
|---|---|---|---|
| AI Citability | 10/100 | 25% | 2.5 |
| Brand Authority | 20/100 | 20% | 4.0 |
| Content E-E-A-T | 15/100 | 20% | 3.0 |
| Technical GEO | 12/100 | 15% | 1.8 |
| Schema & Structured Data | 5/100 | 10% | 0.5 |
| Platform Optimization | 60/100 | 10% | 6.0 |
| **Overall GEO Score** | | | **18/100** |

---

## CRITICAL Issues (Fix Immediately)

### 1. Major AI Crawlers Blocked in robots.txt
**Severity:** CRITICAL  
**File:** `/robots.txt`

The following AI crawlers are explicitly blocked with `Disallow: /`:

| Crawler | AI Platform |
|---|---|
| `GPTBot` | ChatGPT / OpenAI |
| `ClaudeBot` | Claude / Anthropic |
| `Google-Extended` | Google AI Overviews / Gemini |
| `CCBot` | Common Crawl (used by many AI models) |
| `meta-externalagent` | Meta AI |
| `Bytespider` | ByteDance / TikTok AI |

**Impact:** These are the most important AI platforms for GEO. Blocking them means ChatGPT, Claude, Google AI Overviews, and Meta AI literally cannot read your site. You are 100% invisible to these AI systems.

**Fix:**
```
# Remove these lines from robots.txt:
User-agent: GPTBot
Disallow: /

User-agent: ClaudeBot  
Disallow: /

User-agent: Google-Extended
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: meta-externalagent
Disallow: /
```

---

### 2. JavaScript SPA — AI Crawlers Cannot Read Content
**Severity:** CRITICAL  
**Tech Stack:** Vite + React (client-side rendered, no SSR)

Even for crawlers NOT blocked by robots.txt, the site content is rendered by JavaScript. AI crawlers (and most search bots) only read raw HTML — they do NOT execute JavaScript. This means when any AI crawler visits your pages, they see only:

```html
<title>Facebook Video Downloader HD Free | FB Video Downloaders</title>
```

...and nothing else. All blog posts, the user guide, and the tool itself are invisible.

**Fix Options (pick one):**
- **Option A (Recommended):** Migrate to Next.js or Astro for Server-Side Rendering (SSR)
- **Option B:** Add Static Site Generation (SSG) to current Vite build — pre-render pages at build time
- **Option C:** Add a pre-rendering service like Prerender.io or Rendertron

---

### 3. No llms.txt File
**Severity:** HIGH  
**URL:** https://fbvideodownloaders.com/llms.txt — Does NOT exist

`llms.txt` is a new standard that tells AI systems what your site is about, which pages are most important, and how to use your content. Without it, AI has no clear signal about your site.

**Fix:** Create `/public/llms.txt` with this content:

```
# FB Video Downloaders — llms.txt

> FB Video Downloaders is a free online tool for downloading Facebook videos in HD quality.

## About
Free Facebook video downloader supporting HD, SD, and audio-only formats. No registration required.

## Key Pages
- [Home](https://fbvideodownloaders.com/) — Main download tool
- [User Guide](https://fbvideodownloaders.com/user-guide) — How to use the tool
- [Blog](https://fbvideodownloaders.com/blog) — Tips and tutorials
- [About](https://fbvideodownloaders.com/about) — About this service

## Content License
Content is available for AI citation and summarization.
```

---

## HIGH Priority Issues

### 4. No Schema Markup (Structured Data)
**Pages Affected:** All 21 pages  

No schema.org markup detected anywhere on the site. Schema is how AI systems understand what type of business you are and what your content is about.

**Minimum required schema to add:**

```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "FB Video Downloaders",
  "url": "https://fbvideodownloaders.com",
  "description": "Free Facebook video downloader — download HD videos without registration",
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
}
```

Also add `FAQPage` schema to blog posts and `HowTo` schema to the user guide.

---

### 5. No E-E-A-T Signals
**Severity:** HIGH  
**Pages Affected:** All pages, especially About page

Zero author information, no team credentials, no company background found. AI systems use E-E-A-T signals to determine if content is trustworthy enough to cite.

**Missing:**
- Author names on blog posts
- Author bio with credentials
- About page with team/company information
- Contact information
- Privacy policy / Terms of service links visible

---

### 6. No Meta Descriptions
**Severity:** HIGH  
**Pages Affected:** All pages (none detected)

Meta descriptions help AI systems understand page context before crawling. Without them, AI systems have no content summary to work with.

---

## MEDIUM Priority Issues

### 7. No FAQ Sections in Content
Blog posts lack FAQ sections. AI models love structured Q&A format — it makes content directly quotable.

**Add to each blog post:**
```html
<h2>Frequently Asked Questions</h2>
<h3>Can I download Facebook videos for free?</h3>
<p>Yes, FB Video Downloaders is completely free...</p>
```

### 8. No Open Graph Tags
No OG tags detected. These affect how your content appears when shared on social platforms and how AI systems categorize it.

### 9. Content Freshness Issue
Most core pages last updated April 27, 2026. Blog is updated (May 22, 2026). Core pages need more frequent updates.

---

## LOW Priority Issues

- No Twitter/X Card meta tags
- Blog posts may lack word count depth (under 1000 words each — unverifiable due to JS rendering)
- No external citations or source links in blog content

---

## Category Deep Dives

### AI Citability: 10/100
Content is entirely JavaScript-rendered, making it literally unreadable by AI systems. Even quotable content (if it exists) cannot be accessed. Score reflects the topic niche (FB video downloading is a searchable topic) but penalizes heavily for inaccessibility.

### Brand Authority: 20/100
Site has been running and has 21 pages of content. Domain name "fbvideodownloaders.com" is keyword-rich and memorable. However, no detectable brand presence on Reddit, YouTube, Wikipedia, or other AI-training sources. No external mentions found. Score reflects domain existence but lack of third-party validation.

### Content E-E-A-T: 15/100
16 blog posts exist (positive), but no author attribution, no credentials, no company information. Content topics are legitimate (copyright rules, troubleshooting, HD formats) but lack depth signals. Score reflects content volume but penalizes heavily for missing trust signals.

### Technical GEO: 12/100
- Robots.txt exists: ✅
- AI crawlers blocked: ❌ (Critical penalty)
- llms.txt exists: ❌
- Server-side rendering: ❌ (Critical penalty)  
- HTTPS: ✅
- Sitemap: ✅ (21 pages)
- Content-Signal header set correctly: ✅

### Schema & Structured Data: 5/100
No schema markup detected on any page. This is near-zero. Score of 5 reflects that the site exists and is HTTPS (minimal baseline).

### Platform Optimization: 60/100
The topic (Facebook video downloading) is commonly discussed across YouTube and Reddit. The keyword-optimized domain name helps. PerplexityBot is NOT blocked (positive). Score reflects niche demand but lack of active platform presence.

---

## Quick Wins (Implement This Week)

1. **Unblock AI crawlers in robots.txt** — Remove GPTBot, ClaudeBot, Google-Extended blocks. Takes 5 minutes, immediately opens site to AI indexing.

2. **Create llms.txt** — Add `/public/llms.txt` with site description and key pages. Takes 30 minutes.

3. **Add Organization schema to homepage** — Add a `<script type="application/ld+json">` block. Takes 1 hour.

4. **Add meta descriptions to all pages** — Even basic descriptions help AI understand page context. Takes 2 hours.

5. **Add author name + date to all blog posts** — Even "FB Video Downloaders Team" is better than nothing for E-E-A-T signals.

---

## 30-Day Action Plan

### Week 1: Unblock AI Crawlers + llms.txt
- [ ] Edit robots.txt — remove GPTBot, ClaudeBot, Google-Extended, CCBot, meta-externalagent
- [ ] Create /public/llms.txt with site overview and key pages
- [ ] Add Organization schema to homepage
- [ ] Add meta descriptions to all 21 pages

### Week 2: Fix JavaScript Rendering (Most Important Technical Fix)
- [ ] Evaluate migration to Next.js (recommended) or add Vite SSG
- [ ] Set up static pre-rendering for all pages in sitemap
- [ ] Test that page content is visible in curl/wget without JavaScript
- [ ] Verify Google Search Console shows content indexing

### Week 3: E-E-A-T + Content Schema
- [ ] Add author information to all blog posts
- [ ] Create/improve About page with company/team info
- [ ] Add FAQPage schema to top 5 blog posts
- [ ] Add HowTo schema to user-guide page
- [ ] Add WebApplication schema to homepage

### Week 4: Content Expansion + Brand Building
- [ ] Add FAQ sections to existing blog posts
- [ ] Create one piece of "authority content" (e.g., "Complete Guide to Facebook Video Formats")
- [ ] Submit site to relevant directories for brand mentions
- [ ] Add Open Graph and Twitter Card meta tags

---

## Appendix: Pages Analyzed

| URL | Status | Key GEO Issues |
|---|---|---|
| `/` | JS-rendered, no schema | AI invisible, no meta desc, no schema |
| `/user-guide` | JS-rendered | AI invisible, no schema, no author |
| `/about` | JS-rendered | No E-E-A-T signals |
| `/contact` | JS-rendered | No structured contact data |
| `/blog` | JS-rendered | No article listing schema |
| `/blog/*` (16 posts) | JS-rendered | No author, no date schema, no FAQ schema |

---

## Summary: Top 3 Actions Right Now

| Priority | Action | Time | Impact |
|---|---|---|---|
| 🔴 #1 | Fix robots.txt — unblock AI crawlers | 5 min | CRITICAL |
| 🔴 #2 | Add SSR/SSG — make content readable | 1-3 days | CRITICAL |
| 🟡 #3 | Create llms.txt | 30 min | HIGH |

**Without fixing #1 and #2, no other GEO optimization will have any impact.** AI systems either can't access the site (blocked by robots.txt) or can't read it (JavaScript rendering). Fix these first.
