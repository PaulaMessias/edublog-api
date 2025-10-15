import app from './app.js';

const port = process.env.PORT || 3000;
// bind em 0.0.0.0 pra aceitar conexões de fora do container
app.listen(port, '0.0.0.0', () => {
  console.log(`EduBlog API on http://0.0.0.0:${port}`);
});
export default app; // ou: export { app }
