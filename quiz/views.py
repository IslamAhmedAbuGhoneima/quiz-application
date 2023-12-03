from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import generics
from rest_framework.views import APIView
from .models import *
from .serializers import QuizSerializer, RandomQuestionSerializer, QuestionSerializer
# Create your views here.


class Quize(generics.ListAPIView):
    queryset = Quizzes.objects.all()
    serializer_class = QuizSerializer


class RandomQuestion(APIView):
    def get(self, request, **kwargs):
        question = Question.objects.filter(
            quiz__category__name__icontains=kwargs['topic']).order_by('?')
        serializer = RandomQuestionSerializer(question, many=True)
        return Response(serializer.data)


class QuizQuestion(APIView):
    def get(self, request, **kwargs):
        quiz = Question.objects.filter(
            quiz__title__icontains=kwargs['topic'])
        serializer = QuestionSerializer(quiz, many=True)
        return Response(serializer.data)
