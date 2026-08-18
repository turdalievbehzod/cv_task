from django.db import models


class Question(models.Model):
    text = models.CharField(max_length=255, blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', 'id']

    def __str__(self):
        return self.text or f'Question #{self.pk}'


class Option(models.Model):
    question = models.ForeignKey(Question, related_name='options', on_delete=models.CASCADE)
    text = models.CharField(max_length=255, blank=True)
    icon = models.CharField(max_length=10, blank=True)
    value = models.CharField(
        max_length=50,
        blank=True,
    )

    def __str__(self):
        return self.text or f'Option #{self.pk}'


class Result(models.Model):
    value = models.CharField(
        max_length=50,
        unique=True,
    )
    title = models.CharField(max_length=255, blank=True)
    emoji = models.CharField(max_length=10, blank=True)
    description = models.TextField(blank=True)
    recommendations = models.TextField(blank=True, help_text='Comma-separated movie titles')

    def __str__(self):
        return self.title or self.value


class SurveySubmission(models.Model):
    result = models.ForeignKey(
        Result, null=True, blank=True, on_delete=models.SET_NULL, related_name='submissions'
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Submission #{self.pk}'


class SubmittedAnswer(models.Model):
    submission = models.ForeignKey(SurveySubmission, related_name='answers', on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    option = models.ForeignKey(Option, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.question} -> {self.option}'
