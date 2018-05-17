FROM node:9.11-alpine as base

WORKDIR /opt/app
COPY package.json yarn.lock ./

#Build and test image
FROM base as build

RUN yarn

COPY . .

#Production image
FROM base as distribution

ENV NODE_ENV production
RUN yarn --production

COPY --from=build /opt/app/pm2-config.json .
COPY --from=build /opt/app/server.js .

# Just for debug purpose
RUN apk add --no-cache curl

CMD ["node_modules/.bin/pm2-docker","pm2-config.json"]
