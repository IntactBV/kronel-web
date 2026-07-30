import languageSettings from "@/app/[locale]/studio/languages.json";

export const SITE_NAME = "Kronel";
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://kronel.io"
).replace(/\/$/, "");

export const enabledLocales = Object.entries(languageSettings.countries)
  .filter(([, config]) => config.enabled !== false)
  .map(([locale]) => locale);

export const defaultLocale = enabledLocales[0] || "en";

export function localePath(locale, pathname = "") {
  const suffix = pathname ? `/${pathname.replace(/^\/|\/$/g, "")}` : "";
  return `/${locale}${suffix}`;
}

export function languageAlternates(pathname = "") {
  return {
    ...Object.fromEntries(
      enabledLocales.map((locale) => [
        locale,
        localePath(locale, pathname),
      ]),
    ),
    "x-default": localePath(defaultLocale, pathname),
  };
}

export function pageMetadata({
  locale,
  pathname = "",
  title,
  description,
  image = "/images/studio/vision-abstract-light-v1.png",
}) {
  const canonical = localePath(locale, pathname);

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: languageAlternates(pathname),
    },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale,
      url: canonical,
      title,
      description,
      images: [{ url: image, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
