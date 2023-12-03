from rest_framework import serializers
from .models import *


class QuizSerializer(serializers.ModelSerializer):
    category = serializers.StringRelatedField()

    class Meta:
        model = Quizzes
        fields = [
            'id',
            'title',
            'category'
        ]


class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ['id', 'answer_text', 'is_right']


class RandomQuestionSerializer(serializers.ModelSerializer):
    # answer = serializers.StringRelatedField(many=True)
    answer = AnswerSerializer(many=True, read_only=True)

    class Meta:
        model = Question
        fields = [
            'id',
            'title',
            'answer',
        ]


class QuestionSerializer(serializers.ModelSerializer):
    answer = AnswerSerializer(many=True, read_only=True)
    quiz = QuizSerializer(read_only=True)

    class Meta:
        model = Question
        fields = [
            'quiz', 
            'title', 
            'answer',
        ]
