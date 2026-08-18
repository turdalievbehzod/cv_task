from django.urls import path

from apps.survey.views import QuestionListView, SubmitAnswersView

urlpatterns = [
    path('questions/', QuestionListView.as_view(), name='survey-questions'),
    path('submit/', SubmitAnswersView.as_view(), name='survey-submit'),
]
