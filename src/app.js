import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import postsRouter from './routes/posts.js';

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => res.json({ ok: true, service: 'edublog-api' }));
app.use('/posts', postsRouter);

app.use((req, res) => res.status(404).json({ error: 'Not Found' }));
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error', details: String(err) });
});

export default app;