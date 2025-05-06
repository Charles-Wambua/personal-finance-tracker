from django.urls import path
from .views import (
    RegisterAPI,
    LoginAPI,
    CategoryListCreateAPI,
    CategoryRetrieveUpdateDestroyAPI,  
      TransactionListCreateAPI,
    TransactionRetrieveUpdateDestroyAPI,
)
from knox import views as knox_views

urlpatterns = [
    path('auth/register/', RegisterAPI.as_view(), name='register'),
    path('auth/login/', LoginAPI.as_view(), name='login'),
    path('auth/logout/', knox_views.LogoutView.as_view(), name='logout'),

    path('categories/', CategoryListCreateAPI.as_view(), name='category-list-create'),
    path('categories/<uuid:id>/', CategoryRetrieveUpdateDestroyAPI.as_view(), name='category-detail'), 

        path('transactions/', TransactionListCreateAPI.as_view()),
    path('transactions/<uuid:id>/', TransactionRetrieveUpdateDestroyAPI.as_view()),
]
