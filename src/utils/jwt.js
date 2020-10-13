
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path')
const mapkit = fs.readFileSync(path.join(__dirname, 'AuthKey_FCHCKTS567.p8'));
console.log(mapkit)

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

jwt.verify(token, mapkit, {algorithms: ["ES256"]}, (err,dec) => {
    console.log(err ? err : dec)
});

module.exports = token;