export default function ProgressBar({ value, max }) {
  const percent = Math.min(100, (value / max) * 100);
  return (
    <div className="progress-bar-bg">
      <div
        className="progress-bar-fg"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}