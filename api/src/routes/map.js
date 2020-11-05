const express = require('express');
const router = new express.Router();

const token = require('../utils/jwt.js');

router.get('/gettoken', ( req, res ) => {
    res.send(token)
});

module.exports = router;