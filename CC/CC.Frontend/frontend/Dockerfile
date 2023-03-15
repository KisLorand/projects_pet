# syntax=docker/dockerfile:1.4

# 1. For build React app
FROM node:14-alpine AS development

# Set working directory
WORKDIR /app

# 
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
# COPY frontend/package.json /app/frontend/package.json
# COPY frontend/package-lock.json /app/frontend/package-lock.json

# Same as npm install
#RUN npm ci
# 

RUN npm install --force
# RUN npm install node@14
# RUN npm install node
# RUN npm ci --silent
# RUN npm install react-scripts@3.4.1 -g --silent

COPY . /app

ENV CI=true
ENV PORT=3000

CMD [ "npm", "start" ]

FROM development AS build

# RUN yarn run build
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
EXPOSE 3000
CMD [ "npm", "start" ]