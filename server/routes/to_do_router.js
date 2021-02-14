const express = require('express');
const toDoRouter = express.Router();
const pool = require('../modules/pool');

// GET route
toDoRouter.get('/', (req,res) => {
  console.log('getting task');
  let queryLine = `
    SELECT * FROM "todolist" 
      ORDER BY "completed";
  `;
  pool.query(queryLine)
  .then((result) => {
    console.log('List collected');
    res.send(result.row);
  })
  .catch((error) => {
    console.log(error);
  })
}) // end GET

// POST route
toDoRouter.post('/', (req,res) => {
  let newToDo = req.body;
  console.log('Adding new To Do', newToDo);
  let queryLine= `
  INSERT INTO "todolist" 
      ("item") 
    VALUES 
      ($1);
  `;
  pool.query(queryLine, [newToDo.item])
  .then((result) => {
    console.log('Task added to DB', result);
    res.sendStatus(200);
  })
  .catch((error) => {
    console.log(error);
    res.sendStatus(500);
  })
}) // end POST

// PUT route
toDoRouter.put('/:id', (req,res) => {
  let idUpdate = req.params.id;
  console.log('update ID', idUpdate);
  let queryLine = `
    UPDATE "todolist" 
      SET "completed" = NOT "completed"
      WHERE "id" = $1;
    `;
  pool.query(queryLine, [idUpdate])
  .then((result) => {
    console.log('Task updated', result);
    res.sendStatus(200);
  })
  .catch((error) => {
    console.log(error);
    res.sendStatus(500);
  })
}) // end PUT

// DELETE route
toDoRouter.delete('/:id', (req, res) => {
  let taskDelete = req.params.id;
  console.log('Delete ID', taskDelete);
  let queryLine = `
    DELETE FROM "todolist"
      WHERE "id" = $1;
  `;
  pool.query(queryLine, [taskDelete])
  .then((result) => {
    console.log('Task delete', result);
    res.sendStatus(200);
  })
  .catch((error) => {
    console.log(error);
    res.sendStatus(500);
  })
})

module.exports = toDoRouter;