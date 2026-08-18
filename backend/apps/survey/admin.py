from django.contrib import admin

from .models import Option, Question, Result, SubmittedAnswer, SurveySubmission


class OptionInline(admin.TabularInline):
    model = Option
    extra = 4


@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ['id', 'text', 'order']
    ordering = ['order', 'id']
    inlines = [OptionInline]


@admin.register(Result)
class ResultAdmin(admin.ModelAdmin):
    list_display = ['value', 'title', 'emoji']


class SubmittedAnswerInline(admin.TabularInline):
    model = SubmittedAnswer
    extra = 0
    readonly_fields = ['question', 'option']
    can_delete = False


@admin.register(SurveySubmission)
class SurveySubmissionAdmin(admin.ModelAdmin):
    list_display = ['id', 'result', 'created_at']
    readonly_fields = ['result', 'created_at']
    inlines = [SubmittedAnswerInline]
