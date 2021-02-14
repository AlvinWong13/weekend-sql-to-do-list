const pg = require('pg');

const pool = new pg.Pool({
  database: 'weekend_to_do',
  host: 'localhost',
  port: 5432,
});

module.exports = pool;