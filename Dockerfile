# syntax=docker/dockerfile:1

# Install dependencies only when needed
FROM node:16-alpine AS staging
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY yarn.lock ./
# todo: add when switched to typescript
# COPY tsconfig.json .

RUN yarn install \
  --immutable \
  --inline-builds


ENV NODE_ENV=staging
ARG NUXT_API_URL

COPY . .

RUN npm install -g nuxt@2.16.1
ENV PATH="/app/node_modules/.bin:${PATH}"

RUN yarn build

# Delete the source code
RUN find . -maxdepth 1 ! -name 'node_modules' ! -name 'static' \
  ! -name '.nuxt' ! -name 'nuxt.config.js' ! -name '.env' \
  -exec rm -rf {} +

ENV HOST 0.0.0.0
EXPOSE 3001

CMD ["yarn", "start"]

FROM node:16-alpine AS production
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY yarn.lock ./
# todo: add when switched to typescript
# COPY tsconfig.json .

RUN yarn install \
  --immutable \
  --inline-builds

COPY . .

ENV NODE_ENV=production
ARG NUXT_API_URL

RUN npm install -g nuxt@2.16.1
ENV PATH="/app/node_modules/.bin:${PATH}"

RUN yarn build

# Delete the source code
RUN find . -maxdepth 1 ! -name 'node_modules' ! -name 'static' \
  ! -name '.nuxt' ! -name 'nuxt.config.js' ! -name '.env' \
  -exec rm -rf {} +

ENV HOST 0.0.0.0
EXPOSE 3000

CMD ["yarn", "start"]
