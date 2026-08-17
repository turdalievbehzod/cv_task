// -----------------------------------------------------------------------
// API layer for submitting survey answers and getting back a result.
//
// Right now `submitSurvey` is MOCKED locally so the frontend works without
// a backend. Once the Django REST Framework endpoint exists, delete the
// mock block below and uncomment the `fetch` implementation.
// -----------------------------------------------------------------------

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

// Local fallback results, keyed by the option `value` that was picked most.
// Replace/extend this to match whatever the DRF backend will return.
const MOCK_RESULTS = {
  planner: {
    title: 'The Planner',
    emoji: '📋',
    description:
      'You thrive on structure and clear goals. You bring order to chaos and make sure nothing falls through the cracks.',
  },
  doer: {
    title: 'The Doer',
    emoji: '⚡',
    description:
      'You move fast and get things done. Momentum is your superpower, and you learn best by taking action.',
  },
  connector: {
    title: 'The Connector',
    emoji: '🤝',
    description:
      'You bring people together and thrive on collaboration. Your energy comes from helping the team succeed.',
  },
  thinker: {
    title: 'The Thinker',
    emoji: '💡',
    description:
      'You dig deep before acting, valuing understanding over speed. Your insight often reveals what others miss.',
  },
}

function computeMockResult(answers) {
  const tally = {}
  for (const answer of answers) {
    tally[answer.value] = (tally[answer.value] || 0) + 1
  }
  const topValue = Object.keys(tally).sort((a, b) => tally[b] - tally[a])[0]
  return MOCK_RESULTS[topValue] || MOCK_RESULTS.thinker
}

/**
 * @param {{questionId: string, optionId: string, value: string}[]} answers
 * @returns {Promise<{title: string, emoji: string, description: string}>}
 */
export async function submitSurvey(answers) {
  // --- MOCK implementation (remove once the backend is live) -----------
  await new Promise((resolve) => setTimeout(resolve, 700))
  return computeMockResult(answers)

  // --- Real DRF implementation (uncomment when backend is ready) -------
  // const response = await fetch(`${API_BASE_URL}/api/survey/submit/`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({
  //     answers: answers.map(({ questionId, optionId }) => ({
  //       question_id: questionId,
  //       option_id: optionId,
  //     })),
  //   }),
  // })
  // if (!response.ok) {
  //   throw new Error(`Survey submission failed: ${response.status}`)
  // }
  // const data = await response.json()
  // return {
  //   title: data.result_title,
  //   emoji: data.result_emoji,
  //   description: data.result_description,
  // }
}
