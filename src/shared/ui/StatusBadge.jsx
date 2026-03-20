function StatusBadge({ value, toneMap }) {
  const tone = toneMap[value] || "muted";

  return <span className={`status-badge ${tone}`}>{value}</span>;
}

export default StatusBadge;
