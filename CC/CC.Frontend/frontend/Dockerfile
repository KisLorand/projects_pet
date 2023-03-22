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

FROM development as dev-envs
RUN <<EOF
apt-get update
apt-get install -y --no-install-recommends git
EOF

RUN <<EOF
useradd -s /bin/bash -m vscode
groupadd docker
usermod -aG docker vscode
EOF
# install Docker tools (cli, buildx, compose)
COPY --from=gloursdocker/docker / /

CMD [ "npm", "start" ]