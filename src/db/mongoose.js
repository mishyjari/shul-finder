const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/shul_finder', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false 
});