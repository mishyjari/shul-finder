const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Define and register paths
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../views');

app.use(express.static(publicPath));

// Set view engine
app.set('view engine', 'hbs');
app.set('views', viewsPath);

// Routes
app.get('/', (req,res) => {
    const synagogues = require('./resources/synagogues.json');
    res.render('index', {
        synagogues: synagogues,
        foo: 'bar'
    })
});

app.get('/synagogues', ( req, res ) => {
    const synagogues = require('./resources/synagogues.json');
    res.send(synagogues)
})

// Start server
app.listen(port, () => {
    console.log('Server is listening on port ' + port)
});