FROM node:12-alpine


RUN apk update && apk upgrade

RUN apk --no-cache add --virtual builds-deps build-base python

ENV NODE_ROOT /web

RUN mkdir -p $NODE_ROOT

WORKDIR $NODE_ROOT

COPY package*.json ./

RUN npm install

COPY . $NODE_ROOT

EXPOSE 3000

CMD [ "npm", "start" ]
