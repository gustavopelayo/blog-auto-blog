const { Pool } = require('pg');

const pool = new Pool(); // reads from env

module.exports = {
  query(text, params) {
    return pool.query(text, params);
  }
};
