export default function Home() {
  return (
    <main className="simple-shell">
      <section className="simple-card">
        <p className="section-label">Kronel</p>
        <h1>Local landing page router</h1>
        <p>
          Use the subdomain routes in local development, or open the direct
          page links below.
        </p>
        <div className="hero__actions">
          <a className="button button--primary" href="/studio">
            Studio
          </a>
          <a className="button button--secondary" href="/advertising">
            Advertising
          </a>
          <a className="button button--secondary" href="/capital">
            Capital
          </a>
        </div>
      </section>
    </main>
  );
}
