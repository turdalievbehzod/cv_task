#!/bin/sh
set -e

python manage.py migrate --noinput
python manage.py seed_survey
python manage.py collectstatic --noinput

exec gunicorn core.wsgi:application --bind 0.0.0.0:8000 --workers 2
