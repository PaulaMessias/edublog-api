import request from 'supertest';
import app from '../src/app.js';
import db from '../src/db.js';

beforeAll(() => {
  db.exec('DELETE FROM posts;');
  db.exec(`INSERT INTO posts (title, description, content, authorName, publishedAt)
           VALUES ('Hello', 'desc', 'content', 'Tester', datetime('now'))`);
});

describe('Posts API', () => {
  it('lists posts', async () => {
    const res = await request(app).get('/posts');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
  it('creates / edits / deletes', async () => {
    const created = await request(app).post('/posts').send({ title: 'Novo' });
    const id = created.body.id;
    const edited = await request(app).put(`/posts/${id}`).send({ title: 'Editado' });
    expect(edited.body.title).toBe('Editado');
    const deleted = await request(app).delete(`/posts/${id}`);
    expect(deleted.status).toBe(204);
  });
  it('search works', async () => {
    await request(app).post('/posts').send({ title: 'Banco de Dados' });
    const res = await request(app).get('/posts/search').query({ q: 'Banco' });
    expect(res.status).toBe(200);
    expect(res.body.find(p => p.title.includes('Banco'))).toBeTruthy();
  });
});