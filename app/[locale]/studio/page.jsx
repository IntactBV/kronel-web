import React from 'react';
import StudioClient from './StudioClient';
import { translations } from '../../../data/studio-data';

export async function generateMetadata({ params }) {
  const locale = params?.locale || 'en';
  const t = translations[locale] || translations.en;
  
  return {
    title: `${t.brand} | Enterprise Systems`,
    description: t.heroDescription,
  };
}

export default function StudioPageServer({ params }) {
  const locale = params?.locale || 'en';
  return <StudioClient initialLocale={locale} />;
}
