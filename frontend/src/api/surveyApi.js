// -----------------------------------------------------------------------
// API layer for submitting survey answers and getting back a result.
//
// Right now `submitSurvey` is MOCKED locally so the frontend works without
// a backend. Once the Django REST Framework endpoint exists, delete the
// mock block below and uncomment the `fetch` implementation.
// -----------------------------------------------------------------------

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

// Local fallback results, keyed by the option `value` that was picked most.
// Mirrors backend/apps/survey/management/commands/seed_survey.py — keep in sync.
const MOCK_RESULTS = {
  thriller: {
    title: 'The Shadow Seeker',
    emoji: '🔪',
    description:
      "You're drawn to intellectual tension and the discomfort of not knowing — your enjoyment comes from active engagement, not passive viewing. You likely relish ambiguity, moral grey areas, and the dopamine hit of a well-earned twist. Dread, for you, isn't a bug; it's the whole appeal.",
    recommendations: ['Se7en', 'Gone Girl', 'Knives Out', 'Hereditary', 'Prisoners'],
  },
  comedy: {
    title: 'The Warmth Chaser',
    emoji: '☕',
    description:
      "You watch movies to feel something honest — connection, humor, comfort. Spectacle matters less to you than character; you're likely more invested in who people are than what happens to them. Film is emotional company, not just entertainment.",
    recommendations: ['La La Land', 'Crazy Rich Asians', 'The Grand Budapest Hotel', 'Little Women', 'When Harry Met Sally'],
  },
  action: {
    title: 'The Horizon Chaser',
    emoji: '🚀',
    description:
      "You watch to escape scale — bigger worlds, higher stakes, faster momentum. You're energized by spectacle and drawn to stories that stretch beyond the everyday. For you, cinema is a ride, not a conversation.",
    recommendations: ['Mad Max: Fury Road', 'Dune', 'Interstellar', 'The Avengers', 'Jurassic Park'],
  },
  balanced: {
    title: 'The Genre Fusion',
    emoji: '🎭',
    description:
      'No single driver dominates your taste — you shift moods and expect film to shift with you. You likely value strong storytelling and craft over genre convention itself, gravitating toward films that blend tones rather than commit to one.',
    recommendations: ['Everything Everywhere All at Once', 'Inception', 'Parasite', 'Guardians of the Galaxy', 'Knives Out'],
  },
}

function computeMockResult(answers) {
  const tally = {}
  for (const answer of answers) {
    if (!answer.value) continue
    tally[answer.value] = (tally[answer.value] || 0) + 1
  }

  const counts = Object.entries(tally)
  if (counts.length === 0) return MOCK_RESULTS.balanced

  const maxCount = Math.max(...counts.map(([, count]) => count))
  const topValues = counts.filter(([, count]) => count === maxCount).map(([value]) => value)

  // Two or more categories tied for first place -> the balanced profile.
  const topValue = topValues.length === 1 ? topValues[0] : 'balanced'
  return MOCK_RESULTS[topValue] || MOCK_RESULTS.balanced
}

/**
 * @param {{questionId: string, optionId: string, value: string}[]} answers
 * @returns {Promise<{title: string, emoji: string, description: string, recommendations: string[]}>}
 */
export async function submitSurvey(answers) {
  // --- MOCK implementation (remove once the backend is live) -----------
  await new Promise((resolve) => setTimeout(resolve, 700))
  return computeMockResult(answers)

  // --- Real DRF implementation (uncomment when backend is ready) -------
  // const response = await fetch(`${API_BASE_URL}/api/v1/survey/submit/`, {
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
  //   title: data.title,
  //   emoji: data.emoji,
  //   description: data.description,
  //   recommendations: data.recommendations
  //     ? data.recommendations.split(',').map((title) => title.trim())
  //     : [],
  // }
}
