# EduBlog API — entrega express

Implementa os endpoints REST, persistência (SQLite), Docker, CI (GitHub Actions) e testes (Jest).

## Rodar local
npm ci
npm start

## Testes (gera cobertura)
npm test

## Docker
docker build -t edublog-api .
docker run --rm -p 3000:3000 -v $(pwd)/data:/app/data edublog-api

## Endpoints
GET /posts
GET /posts/{id}
POST /posts
PUT /posts/{id}
DELETE /posts/{id}
GET /posts/search?q=...