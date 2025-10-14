FROM node:20-bookworm-slim
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev || npm install --omit=dev
COPY src ./src
COPY .env ./
COPY data ./data
RUN npm run migrate && npm run seed
EXPOSE 3000
CMD ["npm", "start"]