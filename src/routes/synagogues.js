const express = require('express');
const router = new express.Router();
const Synagogue = require('../models/synagogues.js');

router.get('/', (req,res) => {
    res.render('index')
});

router.get('/synagogues', async ( req, res ) => {
    try {
        const query = req.query;
        const synagogues = await Synagogue.find(query).limit(10);
        res.send(synagogues);
    }
    catch (err) {
        res.status(500).send(err)
    }    
});

module.exports = router;