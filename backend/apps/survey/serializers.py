from rest_framework import serializers

from .models import Option, Question, Result


class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = ['id', 'text', 'icon', 'value']


class QuestionSerializer(serializers.ModelSerializer):
    options = OptionSerializer(many=True, read_only=True)

    class Meta:
        model = Question
        fields = ['id', 'text', 'order', 'options']


class ResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = Result
        fields = ['value', 'title', 'emoji', 'description', 'recommendations']


class AnswerInputSerializer(serializers.Serializer):
    question_id = serializers.IntegerField()
    option_id = serializers.IntegerField()


class SubmitSerializer(serializers.Serializer):
    answers = AnswerInputSerializer(many=True)

    def validate_answers(self, answers):
        if not answers:
            raise serializers.ValidationError('At least one answer is required.')
        return answers
