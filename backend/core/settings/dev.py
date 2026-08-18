"""Local development settings. Used by default (see manage.py / wsgi.py / asgi.py)."""
from .base import * 

DEBUG = True

if not SECRET_KEY:
    SECRET_KEY = 'django-insecure-dev-only-key-change-me'

ALLOWED_HOSTS = ['localhost', '127.0.0.1']

CORS_ALLOWED_ORIGINS = [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
]
