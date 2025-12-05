#!/bin/bash
echo "Starting Phantom Splice Backend..."
echo "PORT: $PORT"
echo "Python version:"
python --version
echo "Gunicorn version:"
gunicorn --version
echo "Starting gunicorn..."
exec gunicorn app_simple:app \
  --bind 0.0.0.0:${PORT:-5000} \
  --workers 1 \
  --threads 2 \
  --timeout 120 \
  --log-level debug \
  --access-logfile - \
  --error-logfile - \
  --capture-output \
  --enable-stdio-inheritance
