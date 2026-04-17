export function SimpleLanding({ content }) {
  return (
    <main className="simple-shell">
      <section className="simple-card">
        <p className="section-label">{content.brand}</p>
        <h1>{content.title}</h1>
        <p>{content.description}</p>
        <a className="button button--primary" href={content.ctaHref}>
          {content.cta}
        </a>
      </section>
    </main>
  );
}
