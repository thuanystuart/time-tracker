#!/usr/bin/env bash

flask db upgrade
python3 -m flask run --host 0.0.0.0 --port $BACKEND_PORT
