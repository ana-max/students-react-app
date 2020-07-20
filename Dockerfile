FROM node:13

COPY components /components
COPY config /config
COPY dist /dist
COPY server /server
COPY next.config.js /
COPY package.json /
COPY package-lock.json /
COPY uploads /uploads

RUN npm run deps:production

ENV NODE_ENV production

ENV PORT 3000
EXPOSE 3000

CMD node server/index.js
