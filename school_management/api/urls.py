from django.urls import path
from .views import ClassList, StudentList ,RegisterUser

urlpatterns = [
    path('classes/', ClassList.as_view(), name='class-list'),
    path('students/', StudentList.as_view(), name='student-list'),
    path('register/', RegisterUser.as_view(), name='register-user'),
]