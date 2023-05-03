# syntax=docker/dockerfile:1.4

FROM node:14-alpine AS development

WORKDIR /app
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm install --force

COPY . /app

ENV CI=true
ENV PORT=3000

CMD [ "npm", "start" ]
FROM development AS build

RUN npm run build --force

FROM build as dev-envs
RUN npm install -g http-server

WORKDIR /app
CMD http-server --gzip --proxy http://backend:80 --port 3000 /app/build