export default function QuestionCard({ question, selectedOptionId, onSelect }) {
  return (
    <div className="question-card">
      <h2 className="question-card__text">{question.text}</h2>
      <div className="options">
        {question.options.map((option) => {
          const isSelected = option.id === selectedOptionId
          return (
            <button
              key={option.id}
              type="button"
              className={`option${isSelected ? ' option--selected' : ''}`}
              onClick={() => onSelect(option)}
              aria-pressed={isSelected}
            >
              <span className="option__icon">{option.icon}</span>
              <span className="option__label">{option.label}</span>
              <span className="option__check">✓</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
