// Use the browser geocode api to send user's coords to local server
const geocode = ( coords, callback ) => {
    fetch(`http://localhost:3000/location?lat=${coords.latitude}&lon=${coords.longitude}`)
        .then( res => res.json() )
        .then( ({city, state}) => {
            searchForm.value = city;
            runSearch()
        })
};