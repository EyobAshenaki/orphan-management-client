# syntax=docker/dockerfile:1

# Install dependencies only when needed
FROM node:16-alpine AS dependencies
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY yarn.lock ./
# todo: add when switched to typescript
# COPY tsconfig.json .

RUN yarn install \
  --immutable \
  --inline-builds

FROM node:16-alpine AS base-builder

WORKDIR /app

COPY --from=dependencies /app/node_modules node_modules

COPY . .

FROM base-builder AS staging

ENV NODE_ENV=staging
ARG NUXT_API_URL

RUN npm install -g nuxt@2.16.1
ENV PATH="/app/node_modules/.bin:${PATH}"

RUN yarn add vuetify@2.6.10

RUN TARGET=staging yarn build

ENV HOST 0.0.0.0
EXPOSE 3001

CMD ["yarn", "start"]

FROM base-builder AS production

ENV NODE_ENV=production
ARG NUXT_API_URL

RUN npm install -g nuxt@2.16.1
ENV PATH="/app/node_modules/.bin:${PATH}"

RUN yarn add vuetify@2.6.10

RUN TARGET=production yarn build

ENV HOST 0.0.0.0
EXPOSE 3000

CMD ["yarn", "start"]
