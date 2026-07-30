import { redirect } from "next/navigation";

export default async function LocaleHome({ params }) {
  const { locale = "en" } = await params;
  redirect(`/${locale}/studio`);
}
