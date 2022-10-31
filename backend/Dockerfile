FROM python:3.8

WORKDIR /app

COPY ./backend/requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

COPY ./backend .

COPY .env .
