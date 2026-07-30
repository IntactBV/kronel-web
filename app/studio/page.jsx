import { permanentRedirect } from "next/navigation";

export default function LegacyStudioPage() {
  permanentRedirect("/en/studio");
}
