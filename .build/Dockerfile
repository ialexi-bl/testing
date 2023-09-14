FROM node:20-alpine3.17 as deploy

WORKDIR /app
COPY . .

EXPOSE 80
CMD ['node', 'build']
