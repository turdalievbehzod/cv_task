export default function ResultCard({ result, onRestart }) {
  return (
    <div className="result-card">
      <span className="result-card__emoji">{result.emoji}</span>
      <h2 className="result-card__title">{result.title}</h2>
      <p className="result-card__description">{result.description}</p>

      {result.recommendations?.length > 0 && (
        <div className="result-card__recommendations">
          <h3 className="result-card__recommendations-title">🎬 Recommended for you</h3>
          <ul className="result-card__movie-list">
            {result.recommendations.map((movie) => (
              <li key={movie}>{movie}</li>
            ))}
          </ul>
        </div>
      )}

      <button type="button" className="restart-btn" onClick={onRestart}>
        Take the survey again
      </button>
    </div>
  )
}
