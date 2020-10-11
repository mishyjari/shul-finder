const api = require('./apiKeys.js');
const request = require('postman-request')

const geocode = ( query, callback ) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${api.mapbox}`;
    console.log(url)
    request({
        url,
        json: true,
    }, ( err, { body }={} ) => {
        if ( err ) throw new Error(err);

        return callback(body.features)
    })
};

module.exports = geocode;