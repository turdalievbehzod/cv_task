export default function ResultCard({ result, onRestart }) {
  return (
    <div className="result-card">
      <span className="result-card__emoji">{result.emoji}</span>
      <h2 className="result-card__title">{result.title}</h2>
      <p className="result-card__description">{result.description}</p>
      <button type="button" className="restart-btn" onClick={onRestart}>
        Take the survey again
      </button>
    </div>
  )
}
