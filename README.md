# EduBlog API

API simples para um blog educacional onde **professores** podem criar/editar/excluir posts e **alunos** podem ler posts.  
Stack: **Node.js + Express + SQLite (better-sqlite3)**, testes em **Jest/Supertest**, **Docker** e **CI (GitHub Actions)**.

## Sumário
- [Arquitetura](#arquitetura)
- [Modelo de Dados](#modelo-de-dados)
- [Endpoints](#endpoints)
- [Como Rodar (Local)](#como-rodar-local)
- [Docker](#docker)
- [Variáveis de Ambiente (.env)](#variáveis-de-ambiente-env)
- [Scripts NPM](#scripts-npm)
- [Testes & Cobertura](#testes--cobertura)
- [CI (GitHub Actions)](#ci-github-actions)
- [Integração com OutSystems](#integração-com-outsystems)
- [Troubleshooting](#troubleshooting)
- [Roadmap](#roadmap)

---

## Arquitetura
- **Express** (HTTP)
- **better-sqlite3** (SQLite)
- **Jest + Supertest** (testes)
- **Docker**
- **GitHub Actions** (CI)

Estrutura:
```
src/
  app.js
  server.js
  db.js
  migrate.js
  seed.js
  routes/posts.js
tests/
  health.test.js
  posts.e2e.test.js
```

---

## Modelo de Dados
Tabela `posts`:

- `id` (PK, integer)
- `title` (text)
- `description` (text)
- `content` (text)
- `authorName` (text)
- `publishedAt` (ISO string)

---

## Endpoints
```
GET    /               -> { ok: true, service: "edublog-api" }
GET    /posts          -> lista posts
POST   /posts          -> cria post
PUT    /posts/:id      -> atualiza post
DELETE /posts/:id      -> remove post
```

Opcionais recomendados:
```
GET    /posts/:id           -> retorna 1 post
GET    /posts/search?q=...  -> busca por título/conteúdo/descrição
```

Exemplos:
```bash
# Criar um post
curl -X POST http://localhost:3000/posts   -H "Content-Type: application/json"   -d '{"title":"Primeiro post","description":"Demo","content":"Oi","authorName":"Prof"}'

# Listar posts
curl http://localhost:3000/posts
```

---

## Como Rodar (Local)
```bash
npm ci
node src/migrate.js
node src/seed.js
npm start
# EduBlog API on http://0.0.0.0:3000
```

---

## Docker
```bash
# build
docker build -t edublog-api .

# run (Linux/Mac)
docker run -d --name edublog-api   -p 3000:3000   -v "$(pwd)/data:/app/data"   edublog-api
```

> **Windows (Git Bash):** se o `-v` der erro, use caminho estilo `/c/seu/caminho/edublog-api/data:/app/data`.

---

## Variáveis de Ambiente (.env)
```env
PORT=3000
DB_FILE=./data/edublog.db
NODE_ENV=production
```

---

## Scripts NPM
```bash
npm start       # inicia servidor
npm run migrate
npm run seed
npm test
npm run test:ci
```

---

## Testes & Cobertura
```bash
npm test
npm run test:ci
```
No CI, o banco usa `DB_FILE=":memory:"` para testes rápidos.

---

## CI (GitHub Actions)
Veja `.github/workflows/ci.yml`. A pipeline instala dependências e roda testes com cobertura.

---

## Integração com OutSystems
- Tela de **Login** com seleção **Aluno/Professor**.
- **Professor**: CRUD completo de posts.
- **Aluno**: somente leitura de posts.
- Campos do post: **publishedAt** (data ISO), **title**, **description** (+ `content`, `authorName`).

---

## Troubleshooting
- **Windows + better-sqlite3** pode exigir toolchain (Python, make, g++). Se der trabalho, rode via **Docker**.
- **Avisos CRLF/LF** no Git são normais.
- **CI vermelho**: garanta `jest.config.js`, pasta `tests/`, `npm ci` (sem `--omit=dev`) e `DB_FILE=":memory:"` nos testes.

---

## Roadmap
- Paginação e ordenação por data.
- Validações de payload.
- Implementar `GET /posts/:id` e `/posts/search`.
- Autenticação (JWT).
- Conectores REST no OutSystems.

<div>
    <a href="https://www.loom.com/share/dae52660e7294b5aa455711689e378a1">
      <p>Apresentação do Aplicativo Volvo 🚀 - Watch Video</p>
    </a>
    <a href="https://www.loom.com/share/dae52660e7294b5aa455711689e378a1">
      <img style="max-width:300px;" src="https://cdn.loom.com/sessions/thumbnails/dae52660e7294b5aa455711689e378a1-bbf546764c12dca9-full-play.gif">
    </a>
  </div>

