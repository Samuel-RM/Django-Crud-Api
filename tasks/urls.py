from django.urls import path, include
from rest_framework import routers
from tasks import views

router = routers.DefaultRouter()
router.register(r"tasks", views.TaskVies, "tasks" )


urlpatterns = [
    path()
]
