import { BLOG_POSTS, SITE_ORIGIN } from './blogPostsList';

const SITE_NAME = 'FBSave HD';

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
        name: 'Download Facebook Videos & Reels HD Free - FB Video Downloader',
        description:
          'Download any public Facebook video or Reel in HD quality online for free. No login, no app needed. Paste the FB video link and save it instantly on Android, iPhone, or PC.',
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
            name: 'How do I download a Facebook video for free?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Copy the public Facebook video URL, paste it into the FBSave HD downloader field, and click Download. Choose HD or SD quality and save the video to your device instantly — no login or app needed.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I download Facebook Reels on my phone?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Open the Facebook Reel, copy its link, then paste it on fbvideodownloaders.com. It works on Android and iPhone browsers without any app installation.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I download private Facebook videos?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. FBSave HD only supports publicly shared Facebook videos and Reels. Downloading private videos is not supported to respect user privacy and platform policies.',
            },
          },
          {
            '@type': 'Question',
            name: 'What video formats and quality are available?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'FBSave HD provides both HD (720p or 1080p) and SD quality download options in MP4 format, depending on what quality the original video was uploaded in.',
            },
          },
          {
            '@type': 'Question',
            name: 'Is FBSave HD safe to use?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. FBSave HD does not require your Facebook login or any personal information. We do not store your downloaded videos. Just paste the video link and download.',
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
        name: 'About FBSave HD - Free Facebook Video Downloader',
        description:
          'FBSave HD is a free online Facebook video downloader. Learn how our tool helps you download any public Facebook video or Reel in HD quality without login or app installation.',
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
        name: 'Contact Us - FBSave HD Facebook Video Downloader Support',
        description:
          'Have questions about downloading Facebook videos or Reels? Contact the FBSave HD support team for help, feedback, or inquiries.',
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
        name: 'Privacy Policy - FBSave HD Facebook Video Downloader',
        description:
          "Read FBSave HD's privacy policy to understand how we handle your data. We do not store your videos or require your Facebook login.",
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
        name: 'Terms of Service - FBSave HD Facebook Video Downloader',
        description:
          'Read the terms of service for FBSave HD. Understand the rules and guidelines for using our free tool to download public Facebook videos and Reels responsibly.',
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

const USER_GUIDE_URL = `${SITE_ORIGIN}/user-guide`;

export function buildUserGuideJsonLd() {
  const howToVideo = {
    '@type': 'VideoObject',
    name: 'How to download Facebook videos — FBSave HD guide',
    description: 'Step-by-step video tutorial for downloading public Facebook videos and Reels in HD using FBSave HD.',
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
      q: 'Can I download private Facebook videos?',
      a: 'Most tools only support public videos. Private videos are restricted.',
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
        name: 'How to Download Facebook Videos - Step-by-Step User Guide | FBSave HD',
        description:
          'Step-by-step guide to download Facebook videos and Reels in HD for free. Works on Android, iPhone, PC, and Mac without any app or Facebook login required.',
        isPartOf: webSitePartOf(),
        publisher: orgPublisher(),
        inLanguage: 'en-US',
      }),
    },
    {
      id: 'userguide-howto',
      data: ctx({
        '@type': 'HowTo',
        name: 'How to download Facebook videos with FBSave HD',
        description:
          'Copy a public Facebook video or Reel link, paste it into FBSave HD, pick HD or SD, and save the MP4 to your device.',
        totalTime: 'PT2M',
        video: howToVideo,
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Open the Facebook Video',
            text: 'Go to the Facebook video, Reel, or post you want to download. Open it in your browser and make sure it is public.',
            url: USER_GUIDE_URL,
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Copy the Video Link',
            text: 'Copy the full link from the address bar or use the share option. A correct link helps the downloader process the video properly.',
            url: USER_GUIDE_URL,
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Paste in the Downloader',
            text: 'Paste the link into the downloader field on FBSave HD. The tool will load the video and show available download options.',
            url: `${SITE_ORIGIN}/`,
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Choose Quality and Save',
            text: 'Select HD for better quality or SD for a smaller file size. Then save the video to your device.',
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
        name: 'Facebook Video Downloader Blog - Guides, Tips & Tutorials | FBSave HD',
        description:
          'Read expert guides and tutorials on how to download Facebook videos and Reels in HD quality. Tips, tricks, and best practices for saving Facebook content easily and safely.',
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
    author: { '@type': 'Organization', name: SITE_NAME },
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
