import { Router } from 'express';
import db from '../db.js';

const router = Router();

router.get('/', (req, res) => {
  const rows = db.prepare('SELECT * FROM posts ORDER BY datetime(publishedAt) DESC, id DESC').all();
  res.json(rows);
});

router.get('/search', (req, res) => {
  const q = (req.query.q || '').trim();
  if (!q) return res.json([]);
  const like = `%${q}%`;
  const rows = db.prepare(`
    SELECT * FROM posts
    WHERE title LIKE ? OR description LIKE ? OR content LIKE ?
    ORDER BY datetime(publishedAt) DESC, id DESC
  `).all(like, like, like);
  res.json(rows);
});

router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const row = db.prepare('SELECT * FROM posts WHERE id = ?').get(id);
  if (!row) return res.status(404).json({ error: 'Post not found' });
  res.json(row);
});

router.post('/', (req, res) => {
  const { title, description = '', content = '', authorName = '', publishedAt } = req.body || {};
  if (!title) return res.status(400).json({ error: 'title is required' });
  const iso = publishedAt ? new Date(publishedAt).toISOString() : new Date().toISOString();
  const info = db.prepare('INSERT INTO posts (title, description, content, authorName, publishedAt) VALUES (?, ?, ?, ?, ?)')
                 .run(title, description, content, authorName, iso);
  const created = db.prepare('SELECT * FROM posts WHERE id = ?').get(info.lastInsertRowid);
  res.status(201).json(created);
});

router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const row = db.prepare('SELECT * FROM posts WHERE id = ?').get(id);
  if (!row) return res.status(404).json({ error: 'Post not found' });

  const payload = {
    title: req.body.title ?? row.title,
    description: req.body.description ?? row.description,
    content: req.body.content ?? row.content,
    authorName: req.body.authorName ?? row.authorName,
    publishedAt: req.body.publishedAt ? new Date(req.body.publishedAt).toISOString() : row.publishedAt
  };
  if (!payload.title) return res.status(400).json({ error: 'title cannot be empty' });

  db.prepare('UPDATE posts SET title=?, description=?, content=?, authorName=?, publishedAt=? WHERE id=?')
    .run(payload.title, payload.description, payload.content, payload.authorName, payload.publishedAt, id);

  const updated = db.prepare('SELECT * FROM posts WHERE id = ?').get(id);
  res.json(updated);
});

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const info = db.prepare('DELETE FROM posts WHERE id = ?').run(id);
  if (info.changes === 0) return res.status(404).json({ error: 'Post not found' });
  res.status(204).send();
});

export default router;