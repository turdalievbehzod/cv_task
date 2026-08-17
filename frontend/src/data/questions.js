// Survey content. Edit freely — question/option text, emoji, and the
// `value` category on each option are all that matter for scoring.
// `value` is what gets sent to the backend and used to pick a result.
export const questions = [
  {
    id: 'q1',
    text: 'How do you prefer to start your day?',
    options: [
      { id: 'q1a', label: 'Plan a to-do list', icon: '📝', value: 'planner' },
      { id: 'q1b', label: 'Dive into the most urgent task', icon: '⚡', value: 'doer' },
      { id: 'q1c', label: 'Catch up with the team', icon: '💬', value: 'connector' },
      { id: 'q1d', label: 'Reflect and set an intention', icon: '🌿', value: 'thinker' },
    ],
  },
  {
    id: 'q2',
    text: 'When you face a tough problem, you usually...',
    options: [
      { id: 'q2a', label: 'Break it into smaller steps', icon: '🧩', value: 'planner' },
      { id: 'q2b', label: 'Try the fastest fix and iterate', icon: '🚀', value: 'doer' },
      { id: 'q2c', label: 'Ask others for input', icon: '🤝', value: 'connector' },
      { id: 'q2d', label: 'Step back and analyze deeply', icon: '🔍', value: 'thinker' },
    ],
  },
  {
    id: 'q3',
    text: 'Your ideal work environment is...',
    options: [
      { id: 'q3a', label: 'Organized and predictable', icon: '📋', value: 'planner' },
      { id: 'q3b', label: 'Fast-paced and dynamic', icon: '🔥', value: 'doer' },
      { id: 'q3c', label: 'Collaborative and social', icon: '🌐', value: 'connector' },
      { id: 'q3d', label: 'Quiet and focused', icon: '🎯', value: 'thinker' },
    ],
  },
  {
    id: 'q4',
    text: 'Others would probably describe you as...',
    options: [
      { id: 'q4a', label: 'Reliable and structured', icon: '🏛️', value: 'planner' },
      { id: 'q4b', label: 'Energetic and decisive', icon: '💥', value: 'doer' },
      { id: 'q4c', label: 'Friendly and supportive', icon: '💜', value: 'connector' },
      { id: 'q4d', label: 'Insightful and curious', icon: '💡', value: 'thinker' },
    ],
  },
  {
    id: 'q5',
    text: 'What motivates you the most?',
    options: [
      { id: 'q5a', label: 'Achieving clear goals', icon: '🏆', value: 'planner' },
      { id: 'q5b', label: 'Seeing quick results', icon: '📈', value: 'doer' },
      { id: 'q5c', label: 'Helping others succeed', icon: '🌟', value: 'connector' },
      { id: 'q5d', label: 'Understanding how things work', icon: '🧠', value: 'thinker' },
    ],
  },
]
