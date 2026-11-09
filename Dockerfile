# BOCHKE site: production image (Next.js standalone server on Node 22).
#
# Public settings are baked into the pages at build time, so they live here.
# Change one → commit → release a new version (see docs/12-releases.md).
# Override for a one-off build: docker build --build-arg NEXT_PUBLIC_SITE_URL=https://example.com .
ARG NEXT_PUBLIC_BRAND_NAME=BOCHKE
ARG NEXT_PUBLIC_WHATSAPP_NUMBER=201013361558
ARG NEXT_PUBLIC_DEFAULT_LOCALE=en
ARG NEXT_PUBLIC_SITE_URL=https://infinity-demo.online

FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
# The test MongoDB binary is not needed to build or run the site.
RUN MONGOMS_DISABLE_POSTINSTALL=1 npm ci --no-audit --no-fund

FROM node:22-alpine AS build
WORKDIR /app
ARG NEXT_PUBLIC_BRAND_NAME
ARG NEXT_PUBLIC_WHATSAPP_NUMBER
ARG NEXT_PUBLIC_DEFAULT_LOCALE
ARG NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_BRAND_NAME=$NEXT_PUBLIC_BRAND_NAME \
    NEXT_PUBLIC_WHATSAPP_NUMBER=$NEXT_PUBLIC_WHATSAPP_NUMBER \
    NEXT_PUBLIC_DEFAULT_LOCALE=$NEXT_PUBLIC_DEFAULT_LOCALE \
    NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ARG NEXT_PUBLIC_BRAND_NAME
ARG NEXT_PUBLIC_WHATSAPP_NUMBER
ARG NEXT_PUBLIC_DEFAULT_LOCALE
ARG NEXT_PUBLIC_SITE_URL
ARG APP_VERSION=dev
ENV NODE_ENV=production \
    PORT=3000 \
    HOSTNAME=0.0.0.0 \
    NEXT_TELEMETRY_DISABLED=1 \
    APP_VERSION=$APP_VERSION \
    NEXT_PUBLIC_BRAND_NAME=$NEXT_PUBLIC_BRAND_NAME \
    NEXT_PUBLIC_WHATSAPP_NUMBER=$NEXT_PUBLIC_WHATSAPP_NUMBER \
    NEXT_PUBLIC_DEFAULT_LOCALE=$NEXT_PUBLIC_DEFAULT_LOCALE \
    NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
COPY --from=build --chown=node:node /app/public ./public
COPY --from=build --chown=node:node /app/.next/standalone ./
COPY --from=build --chown=node:node /app/.next/static ./.next/static
USER node
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD wget -qO /dev/null http://127.0.0.1:3000/en || exit 1
# Secrets (MONGODB_URI, ADMIN_EMAIL, ADMIN_PASSWORD, SESSION_SECRET) are given at run time:
#   docker compose up -d   (docker-compose.yml reads them from .env.production on the server)
CMD ["node", "server.js"]
