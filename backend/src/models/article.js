const db = require('./db');

async function listArticles() {
  const res = await db.query(
    'SELECT id, title, created_at FROM articles ORDER BY created_at DESC'
  );
  return res.rows;
}

async function getArticleById(id) {
  const res = await db.query(
    'SELECT id, title, content, created_at FROM articles WHERE id = $1',
    [id]
  );
  return res.rows[0] || null;
}

async function createArticle({ title, content }) {
  const res = await db.query(
    'INSERT INTO articles (title, content) VALUES ($1, $2) RETURNING id, title, content, created_at',
    [title, content]
  );
  return res.rows[0];
}

module.exports = {
  listArticles,
  getArticleById,
  createArticle
};
