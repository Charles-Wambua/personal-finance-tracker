# core/models.py
from django.db import models
from core.user_models.user import User

# No need to import AuthToken or define UUIDAuthToken if you're using Knox as-is.
# You can safely define other models here as needed.
