export function ProcessSteps({ steps }) {
  return (
    <section className="grid-section">
      <p className="section-label">Execution model</p>
      <div className="steps-grid">
        {steps.map((step) => (
          <article className="step-card" key={step.step}>
            <span>{step.step}</span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
