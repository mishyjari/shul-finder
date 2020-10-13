mapkit.init({
    authorizationCallback: function(done) {
        fetch('http://localhost:3000/gettoken')
        .then( res => res.text() )
        .then( done )
    }
});

const map = new mapkit.Map('map-container', {
    center: new mapkit.Coordinate(31.51073,-96.4247),
    showsUserLocation: true,
    showsUserLocationControl: true,
    tracksUserLocation: true
})

navigator.geolocation.getCurrentPosition(({ coords } = {}) => {
    const { latitude, longitude } = coords;

    const userLocationAnnotation = () => {
        const div = document.createElement('div')
        div.innerHTML = `<h1>youre here</h1>`
        return div
    }

    if ( latitude && longitude ) {
        map.setCenterAnimated(new mapkit.Coordinate(latitude,longitude));
        map.setCameraDistanceAnimated(50000);
        map.addAnnotation(new mapkit.Annotation(new mapkit.Coordinate(latitude,longitude), userLocationAnnotation))
    }
});


