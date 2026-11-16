import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Simone Harris - Bail Bond Agent in Newark, Delaware | 24/7 Fast Release',
  description: 'Simone Harris - Not Just Another Bail Bonds Agent, A Mother Who Cares. Professional bail bond services in Newark, Delaware. 24/7 availability, fast release, confidential process. Call (702) 447-8550',
  keywords: 'bail bonds Newark Delaware, bail bond agent, bail bondsman, 24/7 bail bonds, fast bail release, Simone Harris bail bonds, Delaware bail bonds, affordable bail bonds, felony bonds, misdemeanor bonds',
  author: 'Simone Harris Bail Bonds',
  robots: 'index, follow',
  geo: {
    region: 'US-DE',
    placename: 'Newark',
    position: '39.6837;-75.7497',
  },
  openGraph: {
    type: 'website',
    title: 'Simone Harris - Bail Bond Agent in Newark, Delaware',
    description: 'Not Just Another Bail Bonds Agent – A Mother Who Cares. 24/7 bail bond services in Newark, Delaware. Fast, confidential, affordable.',
    url: 'https://www.simoneharrisbailbonds.com',
    siteName: 'Simone Harris Bail Bonds',
    locale: 'en_US',
    image: '/images/bail-office.jpg',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Simone Harris - Bail Bond Agent Newark, Delaware',
    description: 'Professional 24/7 bail bond services. Fast release, confidential process, no hidden fees.',
    image: '/images/bail-office.jpg',
  },
  canonical: 'https://www.simoneharrisbailbonds.com',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script async src="https://www.googletagmanager.com/gtm.js?id=GTM-TC6XTKSP" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
`,
          }}
        />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        
        {/* Primary SEO Meta Tags */}
        <title>{metadata.title}</title>
        <meta name="title" content={metadata.title} />
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta name="author" content={metadata.author} />
        <meta name="robots" content={metadata.robots} />
        <meta name="geo.region" content={metadata.geo.region} />
        <meta name="geo.placename" content={metadata.geo.placename} />
        <meta name="geo.position" content={metadata.geo.position} />
        <meta name="ICBM" content={metadata.geo.position} />

        {/* Open Graph Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta property="og:description" content={metadata.openGraph.description} />
        <meta property="og:url" content={metadata.openGraph.url} />
        <meta property="og:site_name" content={metadata.openGraph.siteName} />
        <meta property="og:locale" content={metadata.openGraph.locale} />
        <meta property="og:image" content={metadata.openGraph.image} />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content={metadata.twitter.card} />
        <meta name="twitter:title" content={metadata.twitter.title} />
        <meta name="twitter:description" content={metadata.twitter.description} />
        <meta name="twitter:image" content={metadata.twitter.image} />

        {/* Canonical URL */}
        <link rel="canonical" href={metadata.canonical} />

        {/* Bootstrap 5 CSS */}
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" />

        {/* Font Awesome */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />

        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet" />

        {/* Schema.org JSON-LD */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Simone Harris Bail Bonds",
            "description": "Not Just Another Bail Bonds Agent – A Mother Who Cares. Professional bail bond services in Newark, Delaware.",
            "image": "https://www.simoneharrisbailbonds.com/images/bail-office.jpg",
            "telephone": "+17024478550",
            "email": "away2freedom302@gmail.com",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "288 E Main St",
              "addressLocality": "Newark",
              "addressRegion": "DE",
              "postalCode": "19711",
              "addressCountry": "US"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "39.6837",
              "longitude": "-75.7497"
            },
            "url": "https://www.simoneharrisbailbonds.com",
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
              "opens": "00:00",
              "closes": "23:59"
            },
            "priceRange": "$$",
            "areaServed": {
              "@type": "City",
              "name": "Newark"
            }
          })
        }} />

        {/* FAQ Schema */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How quickly can you post bail in Newark, Delaware?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We can typically post bail within 1-2 hours in Newark, Delaware. Our 24/7 service ensures fast release from detention centers."
                }
              },
              {
                "@type": "Question",
                "name": "What payment methods do you accept?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We accept cash, credit cards, debit cards, and offer flexible payment plans to make bail bonds affordable for everyone in Newark, Delaware."
                }
              },
              {
                "@type": "Question",
                "name": "Do you handle felony and misdemeanor bonds?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, Simone Harris handles all types of bail bonds including felony bonds, misdemeanor bonds, secured bail, and surety bail throughout Delaware."
                }
              },
              {
                "@type": "Question",
                "name": "Is the bail bond process confidential?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Absolutely. We maintain complete confidentiality throughout the entire bail bond process. Your privacy is our priority."
                }
              }
            ]
          })
        }} />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
