import { SimpleLanding } from "@/components/simple-landing";
import { advertisingContent } from "@/lib/site-content";
import { pageMetadata } from "@/lib/seo";

const localizedContent = {
  en: advertisingContent,
  ro: {
    ...advertisingContent,
    title: "Sisteme de promovare și creație orientate spre creștere.",
    description:
      "Kronel Advertising dezvoltă campanii media și materiale creative axate pe conversii pentru companii ambițioase.",
    cta: "Începe o campanie",
  },
};

export async function generateMetadata({ params }) {
  const { locale = "en" } = await params;
  const content = localizedContent[locale] || localizedContent.en;

  return pageMetadata({
    locale,
    pathname: "advertising",
    title:
      locale === "ro"
        ? "Promovare performantă și creație pentru conversii"
        : "Performance Advertising & Conversion Creative",
    description: content.description,
  });
}

export default async function AdvertisingPage({ params }) {
  const { locale = "en" } = await params;
  return <SimpleLanding content={localizedContent[locale] || localizedContent.en} />;
}
