// Survey content. Mirrors backend/apps/survey/management/commands/seed_survey.py —
// keep the two in sync if you edit questions/options here.
export const questions = [
  {
    id: 'q1',
    text: "It's a Friday night and you're picking a movie. What draws you in first?",
    options: [
      { id: 'q1a', label: 'A trailer full of tension and unanswered questions', icon: '🔪', value: 'thriller' },
      { id: 'q1b', label: 'A trailer that makes you laugh or tugs at your heartstrings', icon: '☕', value: 'comedy' },
      { id: 'q1c', label: 'A trailer packed with explosions, spaceships, or epic quests', icon: '🚀', value: 'action' },
    ],
  },
  {
    id: 'q2',
    text: 'Which opening scene would hook you instantly?',
    options: [
      { id: 'q2a', label: 'A character wakes up with no memory of the night before', icon: '🔪', value: 'thriller' },
      { id: 'q2b', label: 'Two strangers share an awkward, charming meet-cute', icon: '☕', value: 'comedy' },
      { id: 'q2c', label: 'A ship crash-lands on an unknown planet', icon: '🚀', value: 'action' },
    ],
  },
  {
    id: 'q3',
    text: "What's your ideal movie-watching mood?",
    options: [
      { id: 'q3a', label: 'On the edge of your seat, piecing clues together', icon: '🔪', value: 'thriller' },
      { id: 'q3b', label: 'Cozy, warm, ready to smile or cry', icon: '☕', value: 'comedy' },
      { id: 'q3c', label: 'Pumped up and ready for a thrill ride', icon: '🚀', value: 'action' },
    ],
  },
  {
    id: 'q4',
    text: "Pick a setting you'd want a film to take place in.",
    options: [
      { id: 'q4a', label: 'A fog-covered small town hiding a dark secret', icon: '🔪', value: 'thriller' },
      { id: 'q4b', label: 'A charming café or tight-knit neighborhood', icon: '☕', value: 'comedy' },
      { id: 'q4c', label: 'A distant galaxy or post-apocalyptic wasteland', icon: '🚀', value: 'action' },
    ],
  },
  {
    id: 'q5',
    text: 'What keeps you thinking about a movie after the credits roll?',
    options: [
      { id: 'q5a', label: "Piecing together the twist you didn't see coming", icon: '🔪', value: 'thriller' },
      { id: 'q5b', label: 'The warm feeling or the characters you fell for', icon: '☕', value: 'comedy' },
      { id: 'q5c', label: 'The scale of the world and the adventure you witnessed', icon: '🚀', value: 'action' },
    ],
  },
]
