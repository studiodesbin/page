export default function Row({ label, children, className = '' }) {
  return <div className={`row ${className}`}><div className="row-label">{label}</div><div className="row-body">{children}</div></div>;
}
