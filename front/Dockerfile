FROM node:9.11-alpine as base

WORKDIR /opt/app
COPY package.json yarn.lock ./

#Build image
FROM base as build

RUN yarn install

COPY . .

ENV CI true

#RUN npm t
#RUN yarn run build-storybook
RUN yarn run build

#Production image
FROM base as run

RUN yarn install --production

COPY --from=build /opt/app/server.js .
#COPY --from=build /opt/app/server ./server
COPY --from=build /opt/app/build ./build
COPY --from=build /opt/app/pm2-config.json .

#Azure use this param to publish port when it does docker run
EXPOSE 8080

# Just for debug purpose
RUN apk add --no-cache curl

CMD ["node_modules/.bin/pm2-docker","pm2-config.json"]
