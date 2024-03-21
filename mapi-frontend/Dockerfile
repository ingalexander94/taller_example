FROM node:20.11.0-alpine3.18 AS builder
WORKDIR /app
COPY src/package*.json ./
RUN npm install && npm cache clean --force
ENV PATH=/app/node_modules/.bin:$PATH
COPY src .
RUN npm run build

FROM nginx:1.25.3-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/dist .
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
