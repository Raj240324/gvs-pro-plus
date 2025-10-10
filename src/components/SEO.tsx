import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonical?: string;
  noindex?: boolean;
  structuredData?: object;
}

const SEO = ({
  title,
  description,
  keywords,
  ogImage = 'https://gvs-pro-plus.vercel.app/logo.png',
  ogType = 'website',
  canonical,
  noindex = false,
  structuredData,
}: SEOProps) => {
  const siteTitle = 'GVS CONTROLS - Electrical, Automation & Consultancy';
  const fullTitle = `${title} | ${siteTitle}`;
  const defaultKeywords = 'electrical engineering, PLC automation, control panels, EPC projects, power plants, steel plants, cement plants, renewable energy, consultancy, SAIL, TISCO, Chennai, industrial automation, control systems';
  
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords || defaultKeywords} />
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}
      
      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:site_name" content={siteTitle} />
      {canonical && <meta property="og:url" content={canonical} />}
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={title} />
      
      {/* Structured Data */}
      {structuredData ? (
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      ) : (
        <>
          {/* Organization */}
          <script type="application/ld+json">
            {JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'GVS CONTROLS',
              url: typeof window !== 'undefined' ? window.location.origin : undefined,
              logo: ogImage,
              sameAs: [
                'https://www.linkedin.com/company/gvs-controls',
                'https://x.com/gvscontrols',
                'https://www.facebook.com/gvscontrols',
                'https://www.instagram.com/gvscontrols'
              ],
              contactPoint: [
                {
                  '@type': 'ContactPoint',
                  telephone: '+91-7338880027',
                  contactType: 'customer service',
                  areaServed: 'IN',
                  availableLanguage: ['en']
                },
                {
                  '@type': 'ContactPoint',
                  telephone: '+91-9884001597',
                  contactType: 'sales',
                  areaServed: 'IN',
                  availableLanguage: ['en']
                }
              ]
            })}
          </script>
          {/* WebSite */}
          <script type="application/ld+json">
            {JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'GVS CONTROLS - Electrical, Automation & Consultancy',
              url: typeof window !== 'undefined' ? window.location.origin : undefined
            })}
          </script>
        </>
      )}
    </Helmet>
  );
};

export default SEO; 