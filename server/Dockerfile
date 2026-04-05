# Builds native leveldb-zlib (cmake + zlib). Run API with: docker compose up api
FROM node:20-bookworm

RUN apt-get update && apt-get install -y --no-install-recommends \
  python3 make g++ cmake zlib1g-dev \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

COPY src ./src
COPY assets ./assets

ENV NODE_ENV=production
ENV PORT=3001

EXPOSE 3001

CMD ["node", "src/index.js"]
