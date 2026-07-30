import { SimpleLanding } from "@/components/simple-landing";
import { capitalContent } from "@/lib/site-content";
import { pageMetadata } from "@/lib/seo";

const localizedContent = {
  en: capitalContent,
  ro: {
    ...capitalContent,
    title: "Soluții de capital structurate pentru o creștere disciplinată.",
    description:
      "Kronel Capital oferă strategie de capital și poziționare investițională pentru dezvoltarea sustenabilă a companiilor.",
    cta: "Discută cu noi",
  },
};

export async function generateMetadata({ params }) {
  const { locale = "en" } = await params;
  const content = localizedContent[locale] || localizedContent.en;

  return pageMetadata({
    locale,
    pathname: "capital",
    title:
      locale === "ro"
        ? "Strategie de capital pentru creșterea afacerii"
        : "Capital Strategy for Disciplined Business Growth",
    description: content.description,
  });
}

export default async function CapitalPage({ params }) {
  const { locale = "en" } = await params;
  return <SimpleLanding content={localizedContent[locale] || localizedContent.en} />;
}
