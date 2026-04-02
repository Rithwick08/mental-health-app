export default function FeatureCard({ icon, title, description }) {
  return (
    <div className="mh-feature-card">
      <div className="mh-feature-icon">{icon}</div>
      <h5>{title}</h5>
      <p>{description}</p>
    </div>
  );
}
