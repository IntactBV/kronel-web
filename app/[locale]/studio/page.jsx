import React from 'react';
import StudioClient from './StudioClient';
import { translations } from '../../../data/studio-data';
import { pageMetadata, SITE_URL } from '../../../lib/seo';

export async function generateMetadata({ params }) {
  const { locale = 'en' } = await params;
  const t = translations[locale] || translations.en;
  
  return pageMetadata({
    locale,
    pathname: 'studio',
    title: 'Custom Software Systems & Business Automation',
    description: t.heroDescription,
  });
}

export default async function StudioPageServer({ params }) {
  const { locale = 'en' } = await params;
  const t = translations[locale] || translations.en;
  const pageUrl = `${SITE_URL}/${locale}/studio`;
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'Kronel Studio',
        url: pageUrl,
        email: 'sales@kronel.io',
        parentOrganization: {
          '@type': 'Organization',
          name: 'INTACT SRL',
        },
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${pageUrl}#service`,
        name: 'Kronel Studio',
        url: pageUrl,
        description: t.heroDescription,
        provider: { '@id': `${SITE_URL}/#organization` },
        areaServed: 'Worldwide',
        serviceType: [
          'Custom software development',
          'Business process automation',
          'System integration',
          'Internal tools development',
        ],
      },
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: 'Custom Software Systems & Business Automation',
        description: t.heroDescription,
        inLanguage: locale,
        about: { '@id': `${pageUrl}#service` },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}
      />
      <StudioClient initialLocale={locale} />
    </>
  );
}
