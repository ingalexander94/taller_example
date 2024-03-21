FROM node:20.11.0-alpine3.18 AS base

ENV NODE_ENV=local

RUN apk add -q iproute2

RUN echo $( ip -4 route show default | cut -d' ' -f3 )" host.docker.internal" >> /tmp/hosts

WORKDIR /app

COPY src/package*.json .

RUN npm install && npm cache clean --force

COPY src .

FROM base AS production

CMD npm start
