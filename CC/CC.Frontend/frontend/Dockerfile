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

### npm http-server
# RUN npm install -g http-server

# WORKDIR /app
# CMD http-server --gzip --proxy http://backend:80 --port 3000 /app/build
###


## test express http-server
RUN npm install -g express --save && npm install --save-dev http-proxy-middleware
WORKDIR /app
CMD ls && node ./express_http_server_proxy/http-sever.js
##