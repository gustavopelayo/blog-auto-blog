const cron = require('node-cron');
const generateArticle = require('./aiClient');
const { createArticle } = require('../models/article');

function startDailyArticleJob() {
  // DEV: run every minute
  cron.schedule('0 0 * * *', async () => {
    console.log('cron: generating scheduled article...');
    try {
      const generated = await generateArticle('scheduled daily article');
      const saved = await createArticle(generated);
      console.log('cron: article created with id', saved.id);
    } catch (err) {
      console.error('cron: failed to generate article', err.message);
    }
  });

  // For the challenge, later change to '0 0 * * *' (midnight UTC).
}

module.exports = startDailyArticleJob;
