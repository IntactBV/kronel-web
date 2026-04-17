import { ThemeBadge } from "./theme-badge";
import { FeatureGrid } from "./feature-grid";
import { ProcessSteps } from "./process-steps";
import { OutcomeList } from "./outcome-list";

export function LandingPage({ content }) {
  return (
    <main className="studio-shell">
      <section className="hero">
        <div className="hero__eyebrow">{content.brand}</div>
        <h1>
          <span>{content.heroTitle1}</span>
          <span>{content.heroTitle2}</span>
        </h1>
        <p className="hero__description">{content.heroDescription}</p>
        <p className="hero__experience">{content.heroExperience}</p>
        <div className="hero__actions">
          <a className="button button--primary" href={content.primaryCtaHref}>
            {content.primaryCta}
          </a>
          <a className="button button--secondary" href={content.secondaryCtaHref}>
            {content.secondaryCta}
          </a>
        </div>
      </section>

      <ThemeBadge />
      <div id="capabilities">
        <FeatureGrid services={content.services} />
      </div>
      <ProcessSteps steps={content.process} />
      <OutcomeList items={content.outcomes} />

      <section className="contact-card">
        <p className="section-label">{content.contactEyebrow}</p>
        <h2>{content.contactTitle}</h2>
        <p>{content.contactDescription}</p>
        <p className="contact-card__footer">{content.operatedBy}</p>
      </section>
    </main>
  );
}
