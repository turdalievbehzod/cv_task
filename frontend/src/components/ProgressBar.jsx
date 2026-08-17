export default function ProgressBar({ current, total }) {
  const percent = Math.round((current / total) * 100)
  return (
    <div className="progress">
      <div className="progress__track">
        <div className="progress__fill" style={{ width: `${percent}%` }} />
      </div>
      <span className="progress__label">
        Question {Math.min(current + 1, total)} of {total}
      </span>
    </div>
  )
}
