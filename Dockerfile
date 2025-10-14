FROM node:20-bookworm-slim
WORKDIR /app

# Copia manifests + código + .env ANTES do install (postinstall usa src/)
COPY package.json package-lock.json* ./
COPY src ./src
COPY .env ./

# Instala dependências (postinstall vai rodar e preparar better-sqlite3)
RUN npm ci --omit=dev || npm install --omit=dev

# Garante a pasta de dados (o seed/migrate roda no postinstall)
RUN mkdir -p data

EXPOSE 3000
CMD ["node", "src/server.js"]
