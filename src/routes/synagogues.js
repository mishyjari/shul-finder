const express = require('express');
const router = new express.Router();
const Synagogue = require('../models/synagogues.js');

// Get routes for main pages
router.get('/', (req,res) => {
    res.render('index')
});

router.get('/map', (req,res) => {
    res.send('Maps view not implemented')
});

router.get('/about', (req,res) => {
    res.send('About view not implemented')
});

// GET /synagogues to query database
// Query params will accept search=(name, city, or state) and/or filters=movement
// Queries are inclusive and case insenstive... 'elohim' will return mathces for 'Beth Elohim', etc
router.get('/synagogues', async ( req, res ) => {
    try {
        // Store query params
        const query = req.query.search || '';
        const filters = req.query.filters || '';

        const synagogues = query || filters
            // Handle db query with args
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
            // No args provided, return all entries
            : await Synagogue.find({})
        res.send(synagogues);
    }
    catch (err) {
        res.status(500).send(err)
    }    
});

// Show details page for a given shul
router.get('/synagogues/:id', (req,res) => {
    res.send('Show page not implemented.')
})

module.exports = router;