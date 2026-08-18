import { useEffect, useState } from 'react'
import { fetchQuestions, submitSurvey } from './api/surveyApi.js'
import Decorations from './components/Decorations.jsx'
import ProgressBar from './components/ProgressBar.jsx'
import QuestionCard from './components/QuestionCard.jsx'
import ResultCard from './components/ResultCard.jsx'
import './App.css'

const STATUS = {
  IN_PROGRESS: 'in_progress',
  SUBMITTING: 'submitting',
  DONE: 'done',
  ERROR: 'error',
}

export default function App() {
  const [questions, setQuestions] = useState([])
  const [questionsLoading, setQuestionsLoading] = useState(true)
  const [questionsError, setQuestionsError] = useState(null)

  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState({}) // questionId -> { questionId, optionId, value }
  const [status, setStatus] = useState(STATUS.IN_PROGRESS)
  const [result, setResult] = useState(null)

  useEffect(() => {
    loadQuestions()
  }, [])

  function loadQuestions() {
    setQuestionsLoading(true)
    setQuestionsError(null)
    fetchQuestions()
      .then(setQuestions)
      .catch((err) => {
        console.error(err)
        setQuestionsError('Could not load the survey. Please try again.')
      })
      .finally(() => setQuestionsLoading(false))
  }

  const currentQuestion = questions[currentIndex]
  const selectedOption = currentQuestion && answers[currentQuestion.id]
  const isLastQuestion = currentIndex === questions.length - 1

  function handleSelect(option) {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: {
        questionId: currentQuestion.id,
        optionId: option.id,
        value: option.value,
      },
    }))
  }

  function goBack() {
    setCurrentIndex((i) => Math.max(0, i - 1))
  }

  async function goNext() {
    if (!selectedOption) return

    if (!isLastQuestion) {
      setCurrentIndex((i) => i + 1)
      return
    }

    setStatus(STATUS.SUBMITTING)
    try {
      const answerList = questions.map((q) => answers[q.id])
      const surveyResult = await submitSurvey(answerList)
      setResult(surveyResult)
      setStatus(STATUS.DONE)
    } catch (err) {
      console.error(err)
      setStatus(STATUS.ERROR)
    }
  }

  function handleRestart() {
    setAnswers({})
    setCurrentIndex(0)
    setResult(null)
    setStatus(STATUS.IN_PROGRESS)
  }

  return (
    <div className="app">
      <Decorations />

      <main className="app__content">
        <header className="app__header">
          <h1 className="app__title">🎬 What's Your Movie Vibe?</h1>
          <p className="app__subtitle">Answer 5 questions and discover your on-screen personality</p>
        </header>

        {questionsLoading && (
          <div className="question-card">
            <p className="question-card__text">Loading survey…</p>
          </div>
        )}

        {!questionsLoading && questionsError && (
          <div className="question-card">
            <p className="error-text">{questionsError}</p>
            <div className="nav-buttons">
              <button type="button" className="nav-btn nav-btn--primary" onClick={loadQuestions}>
                Retry
              </button>
            </div>
          </div>
        )}

        {!questionsLoading && !questionsError && status !== STATUS.DONE && currentQuestion && (
          <>
            <ProgressBar current={currentIndex} total={questions.length} />

            <QuestionCard
              question={currentQuestion}
              selectedOptionId={selectedOption?.optionId}
              onSelect={handleSelect}
            />

            {status === STATUS.ERROR && (
              <p className="error-text">
                Something went wrong submitting your answers. Please try again.
              </p>
            )}

            <div className="nav-buttons">
              <button
                type="button"
                className="nav-btn nav-btn--ghost"
                onClick={goBack}
                disabled={currentIndex === 0 || status === STATUS.SUBMITTING}
              >
                Back
              </button>
              <button
                type="button"
                className="nav-btn nav-btn--primary"
                onClick={goNext}
                disabled={!selectedOption || status === STATUS.SUBMITTING}
              >
                {status === STATUS.SUBMITTING
                  ? 'Submitting…'
                  : isLastQuestion
                    ? 'See my result'
                    : 'Next'}
              </button>
            </div>
          </>
        )}

        {status === STATUS.DONE && result && (
          <ResultCard result={result} onRestart={handleRestart} />
        )}
      </main>
    </div>
  )
}
