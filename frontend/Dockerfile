
FROM node:latest as node
WORKDIR /app

COPY ./frontend/package.json .
COPY ./frontend/package-lock.json .
RUN npm install

COPY .env .

COPY ./frontend ./frontend

WORKDIR /app/frontend

RUN npm run build --prod

FROM nginx:alpine
COPY --from=node /app/frontend/nginx.conf /etc/nginx/nginx.conf
COPY --from=node /app/frontend/dist/frontend /usr/share/nginx/html

