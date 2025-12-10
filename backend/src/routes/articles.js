const express = require('express');
const {
  listArticles,
  getArticleById,
  createArticle
} = require('../models/article');
const generateArticle = require('../services/aiClient');

const router = express.Router();

// manual create (no AI)
router.post('/', async (req, res) => {
  const { title, content } = req.body || {};
  if (!title || !content) {
    return res.status(400).json({ error: 'title and content required' });
  }
  try {
    const article = await createArticle({ title, content });
    res.status(201).json(article);
  } catch (err) {
    console.error('Error creating article', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// AI generate
router.post('/generate', async (req, res) => {
  try {
    const topic = req.body?.topic || 'software engineering';
    const generated = await generateArticle(topic);
    const saved = await createArticle(generated);
    res.status(201).json(saved);
  } catch (err) {
    console.error('Error generating article', err);
    res.status(500).json({ error: 'Failed to generate article' });
  }
});

// list
router.get('/', async (_req, res) => {
  try {
    const articles = await listArticles();
    res.json(articles);
  } catch (err) {
    console.error('Error listing articles', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// detail
router.get('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ error: 'Invalid id' });
    }
    const article = await getArticleById(id);
    if (!article) {
      return res.status(404).json({ error: 'Not found' });
    }
    res.json(article);
  } catch (err) {
    console.error('Error getting article', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
