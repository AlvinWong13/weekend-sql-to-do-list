const express = require('express');
const toDoRouter = express.Router();
const pg = require('pg');
const bodyParser = require('body-parser');

toDoRouter.use(bodyParser.urlencoded({ extended: true }));

const Pool = pg.Pool;
const pool = new Pool({
  database: 'weekend_to_do',
  host: 'localhost',
  port: 5432,
});

module.exports = toDoRouter;