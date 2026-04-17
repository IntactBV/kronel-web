export function FeatureGrid({ services }) {
  return (
    <section className="grid-section">
      <p className="section-label">Core capabilities</p>
      <div className="feature-grid">
        {services.map((service) => (
          <article className="feature-card" key={service.title}>
            <h3>{service.title}</h3>
            <ul>
              {service.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
