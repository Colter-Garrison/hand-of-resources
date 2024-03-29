const express = require('express');
const app = express();

// Built in middleware
app.use(express.json());

// App routes
app.use('/ciders', require('./controllers/ciders'));
app.use('/bands', require('./controllers/bands'));
app.use('/snails', require('./controllers/snails'));
app.use('/beers', require('./controllers/beers'));
app.use('/animals', require('./controllers/animals'));

// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
