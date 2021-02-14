const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const toDoRouter = require('./routes/to_do_router');

// set up body parser and json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('server/public'));

// set up routes
app.use('/to_do_library', toDoRouter);

// set up port
const PORT = 5000;
app.listen(PORT, () => {
    console.log('up and running on port', PORT);
});
