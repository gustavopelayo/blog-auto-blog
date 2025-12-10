require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const express = require('express');
const cors = require('cors');
const articlesRouter = require('./routes/articles');
const startDailyArticleJob = require('./services/articleJob');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/articles', articlesRouter);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
  startDailyArticleJob();
});
