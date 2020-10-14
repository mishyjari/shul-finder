const express = require('express');
const router = new express.Router();
const geocode = require('../utils/geolocation.js');
const Synagogue = require('../models/synagogues.js');
const fs = require('fs')

// Get routes for main pages
router.get('/', (req,res) => {
    res.render('index')
});

router.get('/map', (req,res) => {
    res.render('map')
});

router.get('/about', (req,res) => {
    res.render('about')
});

// GET /synagogues to query database
// Query params will accept search=(name, city, or state) and/or filters=movement
// Queries are inclusive and case insenstive... 'elohim' will return mathces for 'Beth Elohim', etc
router.get('/synagogues', async ( req, res ) => {
    
    try {
        // Store query params
        const query = req.query.search || '';
        const filters = req.query.filters || '';



        const dbSearch = {$and: [
            {$or: [
                { city: { $regex: `.*(?i)${query}.*` }},
                { name: { $regex: `.*(?i)${query}.*` }},
                { state: { $regex: `.*(?i)${query}.*` }}
            ]},
            
        ]};

        // If filters are provided, add include in db query
        if ( filters.length > 0 ) {
            dbSearch['$and'].push({
                movement: { $in: filters.split(',') }
            })
        }


        // Total entries returned
        const count = await Synagogue.countDocuments(dbSearch)

        // Set limit to count if limit == all
        if ( req.query.limit === 'all' ) {
            req.query.limit = count;
        }

        const synagogues = query || filters
            // Handle db query with args
            ? await Synagogue.find( dbSearch )
                .limit( parseInt( req.query.limit || 10 ))
                .skip( parseInt(req.query.skip || 0 ))

            // No args provided, return all entries
            : await Synagogue.find({})
                .limit( parseInt( req.query.limit || 10 ))
                .skip( parseInt(req.query.skip || 0 ))
        res.send({synagogues, count});
    }
    catch (err) {
        res.status(500).send(err)
    }    
});

// Show details page for a given shul
router.get('/synagogues/:id', async (req,res) => {
    try {
        const synagogue = await Synagogue.findById(req.params.id);
        res.send({ synagogue })
    }
    catch ( err ) {
        console.log(err)
    }
})

// Get route for location based on coordinates
router.get('/location', async ( req, res ) => {
    const results = await geocode((encodeURIComponent(req.query.lon) + ',' + encodeURIComponent(req.query.lat)), 
        data => {
            try {
                const city = data[3].text;
                const state = data[4].text;
                res.send({ city, state })
            }
            catch (err) {
                res.send({ data, err })
            }
            
        }
    )
});

router.get('/lookup', async ( req, res ) => {
    await geocode((encodeURIComponent(req.query.search)), 
        data => {
            try {
                res.send({
                    data
                })
            }
            catch (err) {
                res.send({ data, err })
            }
        }
    ) 
});

router.get('/synagogues/:id/coords', async ( req, res ) => {
    const shul = await Synagogue.findById( req.params.id )
    const search = `${shul.address} ${shul.city} ${shul.state} ${shul.zip}`;

    await geocode(search, 
    data => {
        try {
            res.send(data[0].geometry.coordinates)
        }
        catch ( err ) {
            console.log(err)
        }
    }
) 
})

module.exports = router;