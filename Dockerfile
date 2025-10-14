FROM node:20-bookworm-slim
WORKDIR /app

# Copie manifests + código + .env ANTES do install (postinstall usa src/)
COPY package.json package-lock.json* ./
COPY src ./src
COPY .env ./

# Instala dependências (permite postinstall rodar e gerar o native do better-sqlite3)
RUN npm ci --omit=dev || npm install --omit=dev

# Garante a pasta de dados (o postinstall já roda migrate/seed)
RUN mkdir -p data

EXPOSE 3000
CMD ["node", "src/server.js"]
