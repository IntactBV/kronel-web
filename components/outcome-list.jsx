export function OutcomeList({ items }) {
  return (
    <section className="grid-section">
      <p className="section-label">Business outcomes</p>
      <ul className="outcome-list">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
