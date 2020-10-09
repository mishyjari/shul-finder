const express = require('express');
const router = new express.Router();
const Synagogue = require('../models/synagogues.js');

router.get('/', (req,res) => {
    res.render('index')
});

router.get('/map', (req,res) => {
    res.send('Maps view not implemented')
});

router.get('/about', (req,res) => {
    res.send('About view not implemented')
})

router.get('/synagogues', async ( req, res ) => {
    try {
        const query = req.query.search || '';
        const filters = req.query.filters || '';
        console.log(req.query)

        const synagogues = query || filters
            ? await Synagogue.find(
                {$and: [
                    {$or: [
                        { city: { $regex: `.*(?i)${query}.*` }},
                        { name: { $regex: `.*(?i)${query}.*` }},
                        { state: { $regex: `.*(?i)${query}.*` }}
                    ]},
                    {
                       movement: { $regex: `.*(?i)${filters}.*` }
                    }
                ]}
            ) 
            : await Synagogue.find({})
        res.send(synagogues);
    }
    catch (err) {
        res.status(500).send(err)
    }    
});

router.get('/synagogues/:id', (req,res) => {
    res.send('Show page not implemented.')
})

module.exports = router;