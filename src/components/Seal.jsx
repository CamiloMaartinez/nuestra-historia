export default function Seal({ initials = "A&B", size = 48 }) {
  return (
    <div
      className="seal"
      style={{ width: size, height: size, fontSize: size * 0.32 }}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
}