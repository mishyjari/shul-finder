const express = require('express');
const path = require('path');
require('./db/mongoose.js');
const Synagogue = require('./models/synagogues.js');
const synagoguesRouter = require('./routes/synagogues.js');
const mapsRouter = require('./routes/map.js');
const hbs = require('hbs');
const app = express();
const port = process.env.PORT || 3001;
const cors = require('cors');

// Define and register paths
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../views');
const partialsPath = path.join(__dirname, '../views/partials');

app.use(express.static(publicPath));
app.use(synagoguesRouter);
app.use(mapsRouter);
app.use(express.json());

app.use(cors({ origin: true }));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

// Set view engine
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Start server
app.listen(port, () => {
  console.log('Server is listening on port ' + port);
});

module.exports = app;
