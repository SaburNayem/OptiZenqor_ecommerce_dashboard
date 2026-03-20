function DashboardSection({ title, subtitle, action, children }) {
  return (
    <section className="panel-card">
      <div className="section-heading">
        <div>
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

export default DashboardSection;
