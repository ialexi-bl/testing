FROM node:20-alpine3.17 as deploy

WORKDIR /app
COPY ./package*.json .
COPY ./build ./build

RUN npm ci --omit=dev

ENV PORT=80
EXPOSE 80
CMD [ "node", "build" ]
