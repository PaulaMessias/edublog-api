# EduBlog API

API simples para um blog educacional onde **professores** podem criar/editar/excluir posts e **alunos** podem ler posts.  
Stack: **Node.js + Express + SQLite (better-sqlite3)**, testes em **Jest/Supertest**, **Docker** e **CI (GitHub Actions)**.

## Sumário
- Arquitetura
- Modelo de Dados
- Endpoints
- Como Rodar (Local)
- Docker
- Variáveis de Ambiente
- Scripts NPM
- Testes & Cobertura
- CI (GitHub Actions)
- Integração com OutSystems
- Troubleshooting
- Roadmap

## Arquitetura
- Express HTTP
- better-sqlite3 (SQLite)
- Jest + Supertest (testes)
- Docker
- GitHub Actions (CI)

Estrutura:
src/
  app.js
  server.js
  db.js
  migrate.js
  seed.js
  routes/posts.js

## Modelo de Dados
Tabela `posts`:
id (PK), title, description, content, authorName, publishedAt (ISO string)

## Endpoints
GET /               -> { ok: true, service: "edublog-api" }
GET /posts          -> lista posts
POST /posts         -> cria post
PUT /posts/:id      -> atualiza post
DELETE /posts/:id   -> remove post
(opcional recomendado)
GET /posts/:id      -> retorna 1 post
GET /posts/search?q= -> busca por título/conteúdo/descrição

## Como Rodar (Local)
npm ci
node src/migrate.js
node src/seed.js
npm start
# EduBlog API on http://0.0.0.0:3000

Exemplo:
curl -X POST http://localhost:3000/posts -H "Content-Type: application/json" -d '{"title":"Primeiro post","description":"Demo","content":"Oi","authorName":"Prof"}'
curl http://localhost:3000/posts

## Docker
docker build -t edublog-api .
docker run -d --name edublog-api -p 3000:3000 -v "$(pwd)/data:/app/data" edublog-api

## Variáveis de Ambiente (.env)
PORT=3000
DB_FILE=./data/edublog.db
NODE_ENV=production

## Scripts NPM
npm start      # inicia servidor
npm run migrate
npm run seed
npm test
npm run test:ci

## Testes & Cobertura
npm test
npm run test:ci
(DB_FILE=":memory:" no CI)

## CI (GitHub Actions)
Ver arquivo .github/workflows/ci.yml

## Integração com OutSystems
- Login com seleção Aluno/Professor
- Professor: CRUD
- Aluno: leitura
- Campos do post: data (publishedAt), título e descrição (+ content, authorName)

## Troubleshooting
- Windows + better-sqlite3 pode pedir Python, make, g++
- CRLF/LF avisos são ok
- Se CI vermelho: garanta jest.config.js, tests/, npm ci sem --omit=dev, DB_FILE=":memory:" nos testes

## Roadmap
- Paginação/ordenar por data
- Validações
- /posts/:id e /posts/search (se faltar)
- Auth JWT
- Integração REST OutSystems
