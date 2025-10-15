import request from 'supertest';
import app from '../src/app.js';
import { db } from '../src/db.js';

beforeAll(() => {
  // cria a tabela quando o DB é ':memory:' (CI)
  db.exec(`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      content TEXT,
      authorName TEXT,
      publishedAt TEXT DEFAULT (datetime('now'))
    )
  `);
});

beforeEach(() => {
  db.prepare('DELETE FROM posts').run();
});

describe('Posts', () => {
  it('POST /posts creates', async () => {
    const payload = { title:'Primeiro post', description:'demo', content:'oi', authorName:'Prof' };
    const res = await request(app).post('/posts').send(payload);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
  });

  it('GET /posts lists', async () => {
    await request(app).post('/posts').send({ title:'A', description:'d', content:'c', authorName:'Prof' });
    const res = await request(app).get('/posts');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
