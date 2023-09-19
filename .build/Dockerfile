FROM node:20-alpine3.17 as deploy

WORKDIR /app
COPY ./package*.json .
COPY ./build ./build

RUN npm ci --omit=dev

CMD [ "node", "build" ]
