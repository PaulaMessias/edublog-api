FROM node:20-bookworm-slim
WORKDIR /app
COPY package.json package-lock.json* ./
COPY src ./src
COPY .env ./
RUN npm ci --omit=dev
RUN mkdir -p data
EXPOSE 3000
CMD ["node", "src/server.js"]
