from django.urls import path
from django.views.decorators.csrf import csrf_exempt

from .views import *


urlpatterns = [
    path('', csrf_exempt(TaskView.as_view()), name='tasks_list_url'),
    path('<str:id>/complete/', csrf_exempt(TaskComplete.as_view()))
]
