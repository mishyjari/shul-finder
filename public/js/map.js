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

const shulAnnotation = name => {
    const div = document.createElement('div');
    div.innerHTML = `<h1>&times</h1>`;
    return div;
};

const search = query => {
    map.removeAnnotations(map.annotations)
    fetch(`http://localhost:3000/synagogues?search=${encodeURIComponent(query)}&limit=10`)
    .then( res => res.json() )
    .then( ({ synagogues }) => {
        console.log(synagogues)
        synagogues.forEach(({ address, city, state, name, _id }) => {
            fetch(`http://localhost:3000/synagogues/${_id}/coords`)
                .then( res => res.json() )
                .then( coords => {
                    try {
                        const [longitude, latitude] = coords
                        map.addAnnotation(
                            new mapkit.Annotation(
                                new mapkit.Coordinate(latitude,longitude), 
                                () => shulAnnotation(name))
                            )
                    }
                    catch ( err ) {
                        console.log(err)
                    }
                })
        })
    })
}

document.getElementById('search-form')
    .addEventListener('submit', e => {
        e.preventDefault();
        search(e.target['search-box'].value)
    })