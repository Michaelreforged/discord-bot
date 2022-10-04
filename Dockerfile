FROM node:alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN apk add  --no-cache ffmpeg
RUN yarn install

COPY . .

CMD ["yarn", "start"]
