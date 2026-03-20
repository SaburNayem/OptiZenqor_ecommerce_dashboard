function SummaryGrid({ items }) {
  return (
    <section className="stats-grid">
      {items.map((item) => (
        <article key={item.label} className="stat-card">
          <span>{item.label}</span>
          <strong>{item.value}</strong>
          <small>{item.change}</small>
        </article>
      ))}
    </section>
  );
}

export default SummaryGrid;
