from django.contrib import admin
from .models import *
# Register your models here.


class CatAdmin(admin.ModelAdmin):
    list_display = ['name']


class QuizAdmin(admin.ModelAdmin):
    list_display = ['id', 'title']


class AnswerInlineModel(admin.TabularInline):
    model = Answer
    fields = ['answer_text', 'is_right']


class QuestionAdmin(admin.ModelAdmin):
    fields = ['title', 'quiz']
    list_display = ['title', 'quiz', 'date_created']
    inlines = [
        AnswerInlineModel,
    ]


class AnswerAdmin(admin.ModelAdmin):
    list_display = [
        'answer_text',
        'is_right',
        'question'
    ]
    


admin.site.register(Category, CatAdmin)
admin.site.register(Quizzes, QuizAdmin)
admin.site.register(Question, QuestionAdmin)
admin.site.register(Answer, AnswerAdmin)
