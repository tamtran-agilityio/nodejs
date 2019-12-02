FROM node:12-alpine

ENV NODE_ROOT /web

RUN mkdir -p $NODE_ROOT

WORKDIR $NODE_ROOT

COPY package*.json ./

RUN npm install

COPY . $NODE_ROOT

EXPOSE 3000

CMD [ "npm", "start" ]