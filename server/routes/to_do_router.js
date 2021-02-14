const express = require('express');
const toDoRouter = express.Router();
const pool = require('../modules/pool');


//GET route
toDoRouter.get('/', (req, res) => {
  console.log('Getting Tasks');
  let queryLine = `
    SELECT * FROM "todolist" 
      ORDER BY "completed";
  `;
  pool.query(queryLine)
  .then((result) => {
    console.log('List Collected');
    res.send(result.rows);
  }).catch((error) => {
    console.log(error);
    res.sendStatus(500);
  })
}) // end GET

//POST route
toDoRouter.post('/', (req, res) => {
  let newToDo = req.body;
  console.log('Add new task', newToDo);
  let queryLine = `
    INSERT INTO "todolist" ("task") 
      VALUES ($1)
  ;`
  pool.query(queryLine, [newToDo.task])
  .then((result) => {
    console.log('Task added to DB', result);
    res.sendStatus(200);
  })
  .catch((error) => {
    console.log(error);
    res.sendStatus(500);
  })
}) // end POST

//PUT route
toDoRouter.put('/:id', (req, res) => {
  let updateID = req.params.id;
  console.log('updating id', updateID );
  let queryLine = `
    UPDATE "todolist" 
      SET "completed" = NOT "completed" 
      WHERE "id" = $1;
  `;
  pool.query(queryLine, [updateID])
  .then((result) => {
    console.log('Task updated', result);
    res.sendStatus(200);
  })
  .catch((error) => {
    console.log(error);
  })
}) // end PUT

//DELETE route
toDoRouter.delete('/:id', (req, res) => {
  let taskDelete = req.params.id;
  console.log('removing id', taskDelete);
  let queryLine = `
    DELETE FROM "todolist" 
      WHERE "id" = $1;
  `;
  pool.query(queryLine, [taskDelete])
    .then((result) => {
      console.log('Task removed', result);
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log(error);
    })
}) // end DELETE

module.exports = toDoRouter;