from collections import Counter

from django.shortcuts import get_object_or_404
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Option, Question, Result, SubmittedAnswer, SurveySubmission
from .serializers import QuestionSerializer, ResultSerializer, SubmitSerializer


class QuestionListView(generics.ListAPIView):
    """GET /api/v1/survey/questions/"""

    queryset = Question.objects.prefetch_related('options').all()
    serializer_class = QuestionSerializer


class SubmitAnswersView(APIView):
    """POST /api/v1/survey/submit/"""

    def post(self, request):
        serializer = SubmitSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        answers_data = serializer.validated_data['answers']

        options = [
            get_object_or_404(Option, pk=answer['option_id'], question_id=answer['question_id'])
            for answer in answers_data
        ]

        value_counts = Counter(option.value for option in options if option.value)
        if not value_counts:
            return Response(
                {'detail': 'Selected options have no category assigned yet.'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # If two or more categories are tied for the highest count, fall back
        # to the "balanced" Result instead of picking an arbitrary winner.
        top_count = max(value_counts.values())
        top_values = [value for value, count in value_counts.items() if count == top_count]
        top_value = top_values[0] if len(top_values) == 1 else 'balanced'

        result = Result.objects.filter(value=top_value).first()
        if result is None:
            return Response(
                {'detail': f'No result configured for category "{top_value}" yet.'},
                status=status.HTTP_404_NOT_FOUND,
            )

        submission = SurveySubmission.objects.create(result=result)
        SubmittedAnswer.objects.bulk_create(
            SubmittedAnswer(submission=submission, question_id=option.question_id, option=option)
            for option in options
        )

        return Response(ResultSerializer(result).data, status=status.HTTP_200_OK)
