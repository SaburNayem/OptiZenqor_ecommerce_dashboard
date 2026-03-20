function InsightCard({ eyebrow, title, value, description }) {
  return (
    <article className="insight-card">
      <p className="eyebrow">{eyebrow}</p>
      <h3>{title}</h3>
      <strong>{value}</strong>
      <p>{description}</p>
    </article>
  );
}

export default InsightCard;
