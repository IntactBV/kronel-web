import { enabledLocales, languageAlternates, SITE_URL } from "@/lib/seo";

const routes = ["studio", "advertising", "capital"];

export default function sitemap() {
  return routes.flatMap((route) =>
    enabledLocales.map((locale) => ({
      url: `${SITE_URL}/${locale}/${route}`,
      changeFrequency: "monthly",
      priority: route === "studio" ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(
          Object.entries(languageAlternates(route)).map(([language, path]) => [
            language,
            `${SITE_URL}${path}`,
          ]),
        ),
      },
    })),
  );
}
