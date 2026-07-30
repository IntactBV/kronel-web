FROM node:24-alpine AS base

ENV NEXT_TELEMETRY_DISABLED=1

RUN apk add --no-cache libc6-compat
RUN corepack enable


FROM base AS deps

WORKDIR /app

COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn

RUN yarn install --immutable


FROM base AS builder

WORKDIR /app

COPY --from=deps /app/package.json ./package.json
COPY --from=deps /app/yarn.lock ./yarn.lock
COPY --from=deps /app/.yarnrc.yml ./.yarnrc.yml
COPY --from=deps /app/.yarn ./.yarn
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN yarn build


FROM node:24-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV HOSTNAME=0.0.0.0
ENV PORT=8080
ENV SMTP_HOST="server22.romania-webhosting.com"
ENV SMTP_PORT=465
ENV SMTP_SECURE="true"
ENV SMTP_USER="freshair@pias.ro"
ENV SMTP_PASS="F;XpD~CqeP0b_zQB"
ENV SMTP_FROM="Kronel.IO freshair@pias.ro"
ENV CONTACT_EMAIL_TO="gabi.balasz@gmail.com"
ENV CONTACT_CAPTCHA_SECRET="BunelFromKronestadt"

RUN apk add --no-cache libc6-compat
RUN corepack enable

COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/yarn.lock ./yarn.lock
COPY --from=builder /app/.yarnrc.yml ./.yarnrc.yml
COPY --from=builder /app/.yarn ./.yarn
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/next.config.mjs ./next.config.mjs
COPY --from=builder /app/public ./public
COPY --from=builder /app/data ./data

EXPOSE 8080

CMD ["sh", "-c", "yarn start -p ${PORT:-8080}"]
