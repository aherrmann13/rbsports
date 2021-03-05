FROM node:14-alpine

RUN mkdir -p /usr/src/app/ && chown -R node:node /usr/src/app

WORKDIR /usr/src/app

COPY --chown=node:node .local .local
COPY --chown=node:node package*.json ./

USER node

RUN npm install && npm cache clean --force --loglevel=error

COPY --chown=node:node dist dist

EXPOSE 3000

CMD [ "node", "." ]
