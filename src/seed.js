import db from './db.js';

const count = db.prepare('SELECT COUNT(*) AS c FROM posts').get().c;
if (count === 0) {
  const stmt = db.prepare(`INSERT INTO posts (title, description, content, authorName, publishedAt)
                            VALUES (@title, @description, @content, @authorName, @publishedAt)`);
  const now = new Date();
  const seeds = [
    { title: 'Boas-vindas ao EduBlog', description: 'Como a plataforma funciona para alunos.', content: 'Primeiro post do EduBlog.', authorName: 'Prof. Ana', publishedAt: new Date(now.getTime()-86400000*7).toISOString() },
    { title: 'Agenda da Semana 1', description: 'Atividades previstas.', content: 'Confira as atividades da semana.', authorName: 'Prof. Carlos', publishedAt: new Date(now.getTime()-86400000*5).toISOString() }
  ];
  const insertMany = db.transaction((rows) => rows.forEach(r => stmt.run(r)));
  insertMany(seeds);
  console.log('Seed inserted.');
}