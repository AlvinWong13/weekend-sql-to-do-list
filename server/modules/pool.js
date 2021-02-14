const pg = require('pg');

const pool = new pg.Pool({
  database: 'to_do_library',
  host: 'localhost',
  port: 5432,
});

module.exports = pool;