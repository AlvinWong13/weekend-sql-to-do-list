const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// set up body parser and json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('server/public'));

// set up routes
let toDoRouter = require('./routes/to_do_router');
app.use('/todolibrary', toDoRouter);

// set up port
const PORT = 5000;
app.listen(PORT, () => {
    console.log('up and running on port', PORT);
});
