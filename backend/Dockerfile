FROM python:3.8 as python

WORKDIR /app

COPY ./backend/requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

COPY .env .

COPY ./backend ./backend

WORKDIR /app/backend

