import request from 'supertest';

// força DB em memória para não tocar disco nos testes
process.env.DB_FILE = ':memory:';

const { default: app } = await import('../src/app.js');
const { default: migrate } = await import('../src/migrate.js');
const { default: seed } from '../src/seed.js';

beforeAll(async () => {
  await migrate();
  await seed();
});

describe('Posts E2E', () => {
  it('should create and list posts', async () => {
    const create = await request(app)
      .post('/posts')
      .send({ title: 'Teste', description: 'Demo', content: 'Oi', authorName: 'Prof' })
      .set('Content-Type', 'application/json');

    expect(create.status).toBe(201);
    expect(create.body.id).toBeDefined();

    const list = await request(app).get('/posts');
    expect(list.status).toBe(200);
    expect(Array.isArray(list.body)).toBe(true);
    expect(list.body.length).toBeGreaterThan(0);
  });
});
