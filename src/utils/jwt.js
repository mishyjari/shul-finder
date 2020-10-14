
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path')
const mapkit = fs.readFileSync(path.join(__dirname, 'AuthKey_FCHCKTS567.p8'));


const token = jwt.sign(
{ 
    "typ": "JWT",
    "origin": "http://localhost:3000"
},
mapkit,
{ 
    "algorithm": "ES256",
    "issuer": "B93A9CG7F9",
    "keyid": 'FCHCKTS567'
},
);


module.exports = token;