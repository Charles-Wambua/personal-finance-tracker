from django.urls import path
from .views import (
    RegisterAPI,
    LoginAPI,
    CategoryListCreateAPI,
    TransactionSerializer
)
from knox import views as knox_views

urlpatterns = [
    # Auth routes
    path('auth/register/', RegisterAPI.as_view(), name='register'),
    path('auth/login/', LoginAPI.as_view(), name='login'),
    path('auth/logout/', knox_views.LogoutView.as_view(), name='logout'),

    # Category routes
    path('categories/', CategoryListCreateAPI.as_view(), name='category-list-create'),
    path('categories/<uuid:pk>/', CategoryListCreateAPI.as_view(), name='category-detail'),

    # Transaction routes
    # path('transactions/', TransactionSerializer.as_view(), name='transaction-list-create'),
    # path('transactions/<uuid:pk>/', TransactionSerializer.as_view(), name='transaction-detail'),
]
