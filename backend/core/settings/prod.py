"""Production settings. Activate with DJANGO_SETTINGS_MODULE=core.settings.prod"""
from django.core.exceptions import ImproperlyConfigured

from .base import *  

DEBUG = False

if not SECRET_KEY:
    raise ImproperlyConfigured('SECRET_KEY environment variable is required in production.')

ALLOWED_HOSTS = [h.strip() for h in os.environ.get('ALLOWED_HOSTS', '').split(',') if h.strip()]
if not ALLOWED_HOSTS:
    raise ImproperlyConfigured('ALLOWED_HOSTS environment variable is required in production.')

CORS_ALLOWED_ORIGINS = [
    o.strip() for o in os.environ.get('CORS_ALLOWED_ORIGINS', '').split(',') if o.strip()
]

# Nginx terminates TLS and proxies plain HTTP to Gunicorn; this tells Django
# to trust the X-Forwarded-Proto header instead of misreading every request
# as insecure (which would otherwise cause an SSL-redirect loop).
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

CSRF_TRUSTED_ORIGINS = [f'https://{host}' for host in ALLOWED_HOSTS]

# Serve collected static files (admin CSS/JS) straight from Gunicorn via
# WhiteNoise, so Nginx doesn't need a shared volume for /static/.
STORAGES = {
    'staticfiles': {
        'BACKEND': 'whitenoise.storage.CompressedManifestStaticFilesStorage',
    },
}

SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_HSTS_SECONDS = 60 * 60 * 24 * 30  # 30 days
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True
SECURE_CONTENT_TYPE_NOSNIFF = True
X_FRAME_OPTIONS = 'DENY'

STATIC_ROOT = BASE_DIR / 'staticfiles'
