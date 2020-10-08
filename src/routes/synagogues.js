const express = require('express');
const router = new express.Router();
const url = require('url');
const Synagogue = require('../models/synagogues.js');

router.get('/', (req,res) => {
    res.render('index')
});

router.get('/synagogues', async ( req, res ) => {
    try {
        const query = req.query.search;
        const filters = req.query.filters ? req.query.filters.split(',').filter(q => q)[0] : [];
        console.log(filters)
        console.log(query)

        const synagogues = query 
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
            : await Synagogue.find({}).limit(10)
        res.send(synagogues);
    }
    catch (err) {
        res.status(500).send(err)
    }    
});

module.exports = router;