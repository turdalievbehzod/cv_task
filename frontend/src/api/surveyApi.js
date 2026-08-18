// API layer for submitting survey answers and getting back a result from
// the Django REST Framework backend.

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

/**
 * @returns {Promise<{id: number, text: string, options: {id: number, label: string, icon: string, value: string}[]}[]>}
 */
export async function fetchQuestions() {
  const response = await fetch(`${API_BASE_URL}/api/v1/survey/questions/`)
  if (!response.ok) {
    throw new Error(`Failed to load survey questions: ${response.status}`)
  }

  const data = await response.json()
  return data.map((question) => ({
    id: question.id,
    text: question.text,
    options: question.options.map((option) => ({
      id: option.id,
      label: option.text,
      icon: option.icon,
      value: option.value,
    })),
  }))
}

/**
 * @param {{questionId: number, optionId: number, value: string}[]} answers
 * @returns {Promise<{title: string, emoji: string, description: string, recommendations: string[]}>}
 */
export async function submitSurvey(answers) {
  const response = await fetch(`${API_BASE_URL}/api/v1/survey/submit/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      answers: answers.map(({ questionId, optionId }) => ({
        question_id: questionId,
        option_id: optionId,
      })),
    }),
  })

  if (!response.ok) {
    throw new Error(`Survey submission failed: ${response.status}`)
  }

  const data = await response.json()
  return {
    title: data.title,
    emoji: data.emoji,
    description: data.description,
    recommendations: data.recommendations
      ? data.recommendations.split(',').map((title) => title.trim())
      : [],
  }
}
