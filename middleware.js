import { NextResponse } from 'next/server';
import languageSettings from './app/[locale]/studio/languages.json';

const enabledLocales = Object.entries(languageSettings.countries)
  .filter(([, config]) => config.enabled !== false)
  .map(([code]) => code);

const defaultLocale = enabledLocales[0] || 'en';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Exclude static files, Next.js internal paths, and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return;
  }

  // Check if pathname already has a valid locale
  const pathnameHasLocale = enabledLocales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Read preferred language from cookies if set by LanguageSwitcher
  const cookieLocale = request.cookies.get('kronel.studio.language')?.value;
  let targetLocale = defaultLocale;
  
  if (cookieLocale && enabledLocales.includes(cookieLocale)) {
    targetLocale = cookieLocale;
  } else {
    // Detect preferred language from headers
    const acceptLanguage = request.headers.get('accept-language');
    if (acceptLanguage) {
      const preferred = acceptLanguage.split(',')[0].split('-')[0].toLowerCase();
      if (enabledLocales.includes(preferred)) {
        targetLocale = preferred;
      }
    }
  }

  request.nextUrl.pathname = `/${targetLocale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
