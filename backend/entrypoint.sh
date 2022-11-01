#!/usr/bin/env bash

flask db upgrade
gunicorn --workers 3 --bind 0.0.0.0:$BACKEND_PORT src.main:app
