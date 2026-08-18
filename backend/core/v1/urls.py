from django.urls import include, path

urlpatterns = [
    path('survey/', include('apps.survey.v1.urls')),
]
