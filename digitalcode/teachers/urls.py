from django.contrib.auth import views
from django.urls import path
from .views import CSVTeachers, TeachersView,\
    TeacherView, LoginView

urlpatterns = [
    path('import-teachers', CSVTeachers.as_view(), name='import-teachers'),
    path('get-teachers', TeachersView.as_view(), name='get-teachers'),
    path('get-teacher/<str:teacher_id>', TeacherView.as_view(), name='get-teacher'),
    path('authenticate', LoginView.as_view(), name='authenticate'),
]
