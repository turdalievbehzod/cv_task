"""
Seeds the movie-preference survey: 5 questions x 3 options (A/B/C, each
tied to a genre bucket) plus the 4 result profiles (3 genres + a tie-breaker
"balanced" profile). Safe to re-run — uses update_or_create throughout.
"""
from django.core.management.base import BaseCommand

from apps.survey.models import Option, Question, Result

QUESTIONS = [
    {
        'order': 1,
        'text': "It's a Friday night and you're picking a movie. What draws you in first?",
        'options': [
            {'value': 'thriller', 'icon': '🔪', 'text': 'A trailer full of tension and unanswered questions'},
            {'value': 'comedy', 'icon': '☕', 'text': 'A trailer that makes you laugh or tugs at your heartstrings'},
            {'value': 'action', 'icon': '🚀', 'text': 'A trailer packed with explosions, spaceships, or epic quests'},
        ],
    },
    {
        'order': 2,
        'text': 'Which opening scene would hook you instantly?',
        'options': [
            {'value': 'thriller', 'icon': '🔪', 'text': 'A character wakes up with no memory of the night before'},
            {'value': 'comedy', 'icon': '☕', 'text': 'Two strangers share an awkward, charming meet-cute'},
            {'value': 'action', 'icon': '🚀', 'text': 'A ship crash-lands on an unknown planet'},
        ],
    },
    {
        'order': 3,
        'text': "What's your ideal movie-watching mood?",
        'options': [
            {'value': 'thriller', 'icon': '🔪', 'text': 'On the edge of your seat, piecing clues together'},
            {'value': 'comedy', 'icon': '☕', 'text': 'Cozy, warm, ready to smile or cry'},
            {'value': 'action', 'icon': '🚀', 'text': 'Pumped up and ready for a thrill ride'},
        ],
    },
    {
        'order': 4,
        'text': "Pick a setting you'd want a film to take place in.",
        'options': [
            {'value': 'thriller', 'icon': '🔪', 'text': 'A fog-covered small town hiding a dark secret'},
            {'value': 'comedy', 'icon': '☕', 'text': 'A charming café or tight-knit neighborhood'},
            {'value': 'action', 'icon': '🚀', 'text': 'A distant galaxy or post-apocalyptic wasteland'},
        ],
    },
    {
        'order': 5,
        'text': 'What keeps you thinking about a movie after the credits roll?',
        'options': [
            {'value': 'thriller', 'icon': '🔪', 'text': "Piecing together the twist you didn't see coming"},
            {'value': 'comedy', 'icon': '☕', 'text': 'The warm feeling or the characters you fell for'},
            {'value': 'action', 'icon': '🚀', 'text': 'The scale of the world and the adventure you witnessed'},
        ],
    },
]

RESULTS = [
    {
        'value': 'thriller',
        'title': 'The Shadow Seeker',
        'emoji': '🔪',
        'description': (
            "You're drawn to intellectual tension and the discomfort of not knowing — your "
            'enjoyment comes from active engagement, not passive viewing. You likely relish '
            'ambiguity, moral grey areas, and the dopamine hit of a well-earned twist. Dread, '
            "for you, isn't a bug; it's the whole appeal."
        ),
        'recommendations': 'Se7en, Gone Girl, Knives Out, Hereditary, Prisoners',
    },
    {
        'value': 'comedy',
        'title': 'The Warmth Chaser',
        'emoji': '☕',
        'description': (
            'You watch movies to feel something honest — connection, humor, comfort. '
            "Spectacle matters less to you than character; you're likely more invested in "
            'who people are than what happens to them. Film is emotional company, not just '
            'entertainment.'
        ),
        'recommendations': 'La La Land, Crazy Rich Asians, The Grand Budapest Hotel, Little Women, When Harry Met Sally',
    },
    {
        'value': 'action',
        'title': 'The Horizon Chaser',
        'emoji': '🚀',
        'description': (
            "You watch to escape scale — bigger worlds, higher stakes, faster momentum. You're "
            'energized by spectacle and drawn to stories that stretch beyond the everyday. For '
            'you, cinema is a ride, not a conversation.'
        ),
        'recommendations': 'Mad Max: Fury Road, Dune, Interstellar, The Avengers, Jurassic Park',
    },
    {
        'value': 'balanced',
        'title': 'The Genre Fusion',
        'emoji': '🎭',
        'description': (
            'No single driver dominates your taste — you shift moods and expect film to shift '
            'with you. You likely value strong storytelling and craft over genre convention '
            'itself, gravitating toward films that blend tones rather than commit to one.'
        ),
        'recommendations': 'Everything Everywhere All at Once, Inception, Parasite, Guardians of the Galaxy, Knives Out',
    },
]


class Command(BaseCommand):
    help = 'Seeds the movie-preference survey questions, options, and result profiles.'

    def handle(self, *args, **options):
        for question_data in QUESTIONS:
            question, _ = Question.objects.update_or_create(
                order=question_data['order'],
                defaults={'text': question_data['text']},
            )
            for option_data in question_data['options']:
                Option.objects.update_or_create(
                    question=question,
                    value=option_data['value'],
                    defaults={'text': option_data['text'], 'icon': option_data['icon']},
                )

        for result_data in RESULTS:
            Result.objects.update_or_create(
                value=result_data['value'],
                defaults={
                    'title': result_data['title'],
                    'emoji': result_data['emoji'],
                    'description': result_data['description'],
                    'recommendations': result_data['recommendations'],
                },
            )

        self.stdout.write(
            self.style.SUCCESS(f'Seeded {len(QUESTIONS)} questions and {len(RESULTS)} result profiles.')
        )
