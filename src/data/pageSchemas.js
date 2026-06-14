import { BLOG_POSTS, SITE_ORIGIN } from './blogPostsList';

const SITE_NAME = 'FB Video Downloaders';

function ctx(node) {
  return { '@context': 'https://schema.org', ...node };
}

function orgPublisher() {
  return {
    '@type': 'Organization',
    name: SITE_NAME,
    url: `${SITE_ORIGIN}/`,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_ORIGIN}/images/logo.webp`,
      width: 200,
      height: 48,
    },
  };
}

function webSitePartOf() {
  return {
    '@type': 'WebSite',
    name: `${SITE_NAME} - Facebook Video Downloader`,
    alternateName: 'Facebook Video Downloader',
    url: `${SITE_ORIGIN}/`,
  };
}

function breadcrumbTrail(items) {
  return ctx({
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  });
}

/** Home only: WebPage + homepage FAQs (SoftwareApplication is static in index.html) */
export function buildHomeJsonLd() {
  return [
    {
      id: 'home-webpage',
      data: ctx({
        '@type': 'WebPage',
        '@id': `${SITE_ORIGIN}/#webpage`,
        url: `${SITE_ORIGIN}/`,
        name: 'Free, Fast and Online Facebook Video Downloader | FB Video Downloaders',
        description:
          'Download Facebook HD videos, FB Reels, Private and Public Clips. Fb video downloader helps users download Facebook videos, reels, and public clips directly from their google browser.',
        isPartOf: webSitePartOf(),
        publisher: orgPublisher(),
        inLanguage: 'en-US',
      }),
    },
    {
      id: 'home-faq',
      data: ctx({
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Is FB Video Downloader free to use?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Fb video downloader is a free online tool that allows users to download Facebook videos without registration or subscription.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I download Facebook reels with this tool?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. This tool supports downloading public Facebook reels. Simply copy the reel link and paste it into the downloader.',
            },
          },
          {
            '@type': 'Question',
            name: 'Do I need to install any software?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. The tool works directly in your browser, so there is no need to install apps or browser extensions.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I download Facebook videos on my phone?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. It works on Android phones and iPhones as long as you use a web browser.',
            },
          },
          {
            '@type': 'Question',
            name: 'Why is my Facebook video not downloading?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'This usually happens when the video is private, the link is incomplete, or the post has restricted access. Make sure you copy the full public video link.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I download someone else\'s Facebook video?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, but only if it is set to public, and you should never use the content for commercial purposes.',
            },
          },
          {
            '@type': 'Question',
            name: 'Where are downloaded videos saved?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Downloaded videos are stored in your device\'s download folder or the location selected by your browser.',
            },
          },
          {
            '@type': 'Question',
            name: 'Does the downloader store my videos?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. This tool does not keep copies of videos. The files are downloaded directly to your device.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I download private Facebook videos?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The tool only works with publicly accessible videos. Private or restricted posts cannot be processed.',
            },
          },
        ],
      }),
    },
  ];
}

export function buildHomeEsJsonLd() {
  const pageUrl = `${SITE_ORIGIN}/es/descargar-video-de-facebook`;
  return [
    {
      id: 'home-es-webpage',
      data: ctx({
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: 'Descargar video de Facebook en espanol',
        description:
          'Guia en espanol para descargar video de Facebook y Reels publicos con un flujo simple en navegador.',
        isPartOf: webSitePartOf(),
        publisher: orgPublisher(),
        inLanguage: 'es',
      }),
    },
    {
      id: 'home-es-faq',
      data: ctx({
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Como funciona para descargar video de Facebook?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Copia la URL publica del video, pegala en el formulario, selecciona calidad y guarda el archivo en tu dispositivo.',
            },
          },
          {
            '@type': 'Question',
            name: 'Funciona en Android, iPhone y PC?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Si, funciona en navegadores modernos de movil y escritorio, sin instalar aplicacion.',
            },
          },
          {
            '@type': 'Question',
            name: 'Se pueden bajar videos privados?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No, solo se admiten enlaces publicos de Facebook.',
            },
          },
        ],
      }),
    },
  ];
}

export function buildAboutJsonLd() {
  const url = `${SITE_ORIGIN}/about`;
  return [
    {
      id: 'about-page',
      data: ctx({
        '@type': 'AboutPage',
        '@id': `${url}#webpage`,
        url,
        name: 'About FB Video Downloaders | Free Facebook Video Download Tool',
        description:
          'Learn about FB Video Downloaders, a free online tool that helps users save publicly available Facebook videos easily and safely. No login or app required.',
        isPartOf: webSitePartOf(),
        publisher: orgPublisher(),
        inLanguage: 'en-US',
      }),
    },
    {
      id: 'about-breadcrumb',
      data: breadcrumbTrail([
        { name: 'Home', url: `${SITE_ORIGIN}/` },
        { name: 'About', url },
      ]),
    },
  ];
}

export function buildContactJsonLd() {
  const url = `${SITE_ORIGIN}/contact`;
  return [
    {
      id: 'contact-page',
      data: ctx({
        '@type': 'ContactPage',
        '@id': `${url}#webpage`,
        url,
        name: 'Contact FB Video Downloaders | Support & Questions',
        description:
          'Contact FB Video Downloaders for support, questions, feedback, or issues related to our free Facebook video downloader tool.',
        isPartOf: webSitePartOf(),
        publisher: orgPublisher(),
        inLanguage: 'en-US',
      }),
    },
    {
      id: 'contact-breadcrumb',
      data: breadcrumbTrail([
        { name: 'Home', url: `${SITE_ORIGIN}/` },
        { name: 'Contact', url },
      ]),
    },
  ];
}

export function buildPrivacyJsonLd() {
  const url = `${SITE_ORIGIN}/privacy-policy`;
  return [
    {
      id: 'privacy-page',
      data: ctx({
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: 'Privacy Policy - FB Video Downloaders',
        description:
          "Read FB Video Downloaders' privacy policy to understand how we handle your data. We do not store your videos or require your Facebook login.",
        isPartOf: webSitePartOf(),
        publisher: orgPublisher(),
        inLanguage: 'en-US',
      }),
    },
    {
      id: 'privacy-breadcrumb',
      data: breadcrumbTrail([
        { name: 'Home', url: `${SITE_ORIGIN}/` },
        { name: 'Privacy Policy', url },
      ]),
    },
  ];
}

export function buildTermsJsonLd() {
  const url = `${SITE_ORIGIN}/terms-conditions`;
  return [
    {
      id: 'terms-page',
      data: ctx({
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: 'Terms of Service - FB Video Downloaders',
        description:
          'Read the terms of service for FB Video Downloaders. Understand the rules and guidelines for using our free tool to download public Facebook videos and Reels responsibly.',
        isPartOf: webSitePartOf(),
        publisher: orgPublisher(),
        inLanguage: 'en-US',
      }),
    },
    {
      id: 'terms-breadcrumb',
      data: breadcrumbTrail([
        { name: 'Home', url: `${SITE_ORIGIN}/` },
        { name: 'Terms and Conditions', url },
      ]),
    },
  ];
}

export function buildDisclaimerJsonLd() {
  const url = `${SITE_ORIGIN}/disclaimer`;
  return [
    {
      id: 'disclaimer-page',
      data: ctx({
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: 'Disclaimer - FB Video Downloaders',
        description:
          'Read the FB Video Downloaders disclaimer, including third-party trademark notice, content responsibility, and limitation of liability.',
        isPartOf: webSitePartOf(),
        publisher: orgPublisher(),
        inLanguage: 'en-US',
      }),
    },
    {
      id: 'disclaimer-breadcrumb',
      data: breadcrumbTrail([
        { name: 'Home', url: `${SITE_ORIGIN}/` },
        { name: 'Disclaimer', url },
      ]),
    },
  ];
}

const USER_GUIDE_URL = `${SITE_ORIGIN}/user-guide`;

export function buildUserGuideJsonLd() {
  const howToVideo = {
    '@type': 'VideoObject',
    name: 'How to download Facebook videos — FB Video Downloaders guide',
    description: 'Step-by-step video tutorial for downloading public Facebook videos and Reels in HD using FB Video Downloaders.',
    embedUrl: 'https://www.youtube.com/embed/MrANb2fytwU',
    contentUrl: 'https://www.youtube.com/watch?v=MrANb2fytwU',
    thumbnailUrl: 'https://i.ytimg.com/vi/MrANb2fytwU/hqdefault.jpg',
    uploadDate: '2026-01-15T08:00:00+00:00',
    publisher: orgPublisher(),
  };

  const faqEntities = [
    {
      q: 'How do I download a Facebook video online?',
      a: 'Open the video, copy the link, paste it into the downloader, and choose the quality to save it.',
    },
    {
      q: 'Can I download Facebook videos without an app?',
      a: 'Yes, this FB video downloader user guide uses browser-based methods that do not require installation.',
    },
    {
      q: 'Can I save Facebook Reels on my phone?',
      a: 'Yes, if the Reel is public, you can copy the link and download it using this method.',
    },
    {
      q: 'Why is my Facebook video not downloading?',
      a: 'This usually happens if the video is private, the link is incomplete, or it was opened inside the app.',
    },
    {
      q: 'What is the difference between HD and SD download?',
      a: 'HD gives better quality, while SD saves faster and uses less storage.',
    },
    {
      q: 'Does this work on iPhone and Android?',
      a: 'Yes, this FB video downloader user guide works on both devices using a browser.',
    },
    {
      q: 'Is it safe to use a Facebook video downloader?',
      a: 'Yes, as long as you use a trusted tool that does not ask for login details.',
    },
    {
      q: 'What links are supported in this user guide?',
      a: 'This guide covers publicly accessible Facebook video and Reel links only.',
    },
  ].map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  }));

  return [
    {
      id: 'userguide-webpage',
      data: ctx({
        '@type': 'WebPage',
        '@id': `${USER_GUIDE_URL}#webpage`,
        url: USER_GUIDE_URL,
        name: 'How to Use Facebook Video Downloader | Step-by-Step Guide',
        description:
          'Learn how to use FB Video Downloaders to save Facebook videos online with a simple step-by-step guide for mobile and desktop users.',
        isPartOf: webSitePartOf(),
        publisher: orgPublisher(),
        inLanguage: 'en-US',
      }),
    },
    {
      id: 'userguide-howto',
      data: ctx({
        '@type': 'HowTo',
        name: 'How to Download a Facebook Video — 5-Step Guide',
        description:
          'Copy a public Facebook video or Reel link, paste it into FB Video Downloaders, click the download button, pick HD or SD quality, and save the video to your device.',
        totalTime: 'PT2M',
        video: howToVideo,
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Copy the Facebook Video Link',
            text: 'Open the public Facebook video or Reel in your browser. Copy the URL from the address bar or tap Share → Copy Link inside the Facebook app.',
            url: USER_GUIDE_URL,
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Paste the Link into the Downloader',
            text: 'Go to FB Video Downloaders homepage and paste the full link into the input box.',
            url: `${SITE_ORIGIN}/`,
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Click the Download Button',
            text: 'Click "Analyze Link". The tool will process the link and fetch available download options from Facebook.',
            url: `${SITE_ORIGIN}/`,
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Choose Video Quality',
            text: 'Select HD for higher quality or SD for a smaller file size. HD is recommended for larger screens.',
            url: USER_GUIDE_URL,
          },
          {
            '@type': 'HowToStep',
            position: 5,
            name: 'Save the Video to Your Device',
            text: 'Click Download for your chosen quality. The video saves directly to your device downloads folder.',
            url: USER_GUIDE_URL,
          },
        ],
      }),
    },
    {
      id: 'userguide-faq',
      data: ctx({
        '@type': 'FAQPage',
        mainEntity: faqEntities,
      }),
    },
    {
      id: 'userguide-breadcrumb',
      data: breadcrumbTrail([
        { name: 'Home', url: `${SITE_ORIGIN}/` },
        { name: 'User Guide', url: USER_GUIDE_URL },
      ]),
    },
  ];
}

export function buildBlogIndexJsonLd() {
  const url = `${SITE_ORIGIN}/blog`;
  const publishedPosts = BLOG_POSTS.filter((p) => p.slug);
  const itemListElement = publishedPosts.map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: p.title,
    item: `${SITE_ORIGIN}/blog/${p.slug}`,
  }));

  return [
    {
      id: 'blog-collection',
      data: ctx({
        '@type': 'CollectionPage',
        '@id': `${url}#webpage`,
        url,
        name: 'Facebook Video Downloader Guides & Tips | FB Video Downloaders',
        description:
          'Read simple Facebook video downloading guides, privacy tips, HD quality help, mobile advice, and safe usage tips.',
        isPartOf: webSitePartOf(),
        publisher: orgPublisher(),
        inLanguage: 'en-US',
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: itemListElement.length,
          itemListElement,
        },
      }),
    },
    {
      id: 'blog-breadcrumb',
      data: breadcrumbTrail([
        { name: 'Home', url: `${SITE_ORIGIN}/` },
        { name: 'Blog', url },
      ]),
    },
  ];
}

/**
 * Blog article: WebPage + BlogPosting + BreadcrumbList (+ optional FAQPage).
 * @param {object} p
 * @param {string} p.idPrefix unique script id segment (e.g. 'legal-guide')
 * @param {string} p.postUrl canonical article URL
 * @param {string} p.headline
 * @param {string} p.description
 * @param {string[]} p.images absolute image URLs
 * @param {string} p.published YYYY-MM-DD
 * @param {string} [p.modified] YYYY-MM-DD
 * @param {string} [p.keywords]
 * @param {string} p.breadcrumbTitle third crumb label
 * @param {{ name: string, text: string }[]} [p.faqEntities]
 */
export function buildBlogArticleJsonLd(p) {
  const {
    idPrefix,
    postUrl,
    headline,
    description,
    images,
    published,
    modified,
    keywords,
    breadcrumbTitle,
    faqEntities,
  } = p;

  const webpageId = `${postUrl}#webpage`;
  const isoPub = `${published}T08:00:00+00:00`;
  const isoMod = modified ? `${modified}T08:00:00+00:00` : isoPub;

  const webPageNode = {
    '@type': 'WebPage',
    '@id': webpageId,
    url: postUrl,
    name: headline,
    description,
    isPartOf: webSitePartOf(),
    publisher: orgPublisher(),
    inLanguage: 'en-US',
  };
  if (images?.[0]) {
    webPageNode.primaryImageOfPage = { '@type': 'ImageObject', url: images[0] };
  }

  const blogPostingNode = {
    '@type': 'BlogPosting',
    headline,
    image: images?.length ? images : undefined,
    datePublished: isoPub,
    dateModified: isoMod,
    author: [
      {
        '@type': 'Person',
        name: 'FB Video Downloaders Editorial Team',
        url: `${SITE_ORIGIN}/about`,
      },
      {
        '@type': 'Organization',
        name: SITE_NAME,
        url: `${SITE_ORIGIN}/`,
      },
    ],
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: { '@type': 'ImageObject', url: `${SITE_ORIGIN}/images/logo.webp` },
    },
    description,
    mainEntityOfPage: { '@type': 'WebPage', '@id': webpageId },
  };
  if (keywords) blogPostingNode.keywords = keywords;

  const blocks = [
    { id: `${idPrefix}-webpage`, data: ctx(webPageNode) },
    { id: `${idPrefix}-blogposting`, data: ctx(blogPostingNode) },
    {
      id: `${idPrefix}-breadcrumb`,
      data: breadcrumbTrail([
        { name: 'Home', url: `${SITE_ORIGIN}/` },
        { name: 'Blog', url: `${SITE_ORIGIN}/blog` },
        { name: breadcrumbTitle, url: postUrl },
      ]),
    },
  ];

  if (faqEntities?.length) {
    blocks.push({
      id: `${idPrefix}-faq`,
      data: ctx({
        '@type': 'FAQPage',
        mainEntity: faqEntities.map((f) => ({
          '@type': 'Question',
          name: f.name,
          acceptedAnswer: { '@type': 'Answer', text: f.text },
        })),
      }),
    });
  }

  return blocks;
}
