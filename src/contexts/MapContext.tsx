import React, { useState, createContext } from 'react';
require('apple-mapkit-js');

const userAnnotation = (coords: mapkit.Coordinate): mapkit.MarkerAnnotation => {
  const options = {
    title: 'My Location',
    color: 'grey',
  };
  return new mapkit.MarkerAnnotation(coords, options);
};

const MapContext = createContext({});

const MapProvider = (props: any) => {
  mapkit.init({
    authorizationCallback: function (done) {
      fetch('gettoken')
        .then(res => res.text())
        .then(done);
    },
  });

  const [map, setMap]: [mapkit.Map, any] = useState(new mapkit.Map('root'));
  map.isScrollEnabled = true;
  map.isZoomEnabled = true;

  navigator.geolocation.getCurrentPosition(
    ({ coords: { latitude, longitude } }) => {
      try {
        const userLocation = new mapkit.Coordinate(latitude, longitude);
        const span = new mapkit.CoordinateSpan(0.25, 0.25);
        const region = new mapkit.CoordinateRegion(userLocation, span);
        map.showsUserLocation = true;
        map.showsUserLocationControl = true;
        map.addAnnotation(userAnnotation(userLocation));
        map.setCenterAnimated(userLocation);
        map.setRegionAnimated(region);
      } catch {
        console.log('Error setting location');
      }
    },
    (err: PositionError) => {
      console.log(err.message);
      const center = new mapkit.Coordinate(39.5, -98.35);
      const span = new mapkit.CoordinateSpan(50, 50);
      const region = new mapkit.CoordinateRegion(center, span);
      map.setCenterAnimated(center);
      map.setRegionAnimated(region);
    }
  );

  const updateMap = (el: string): void => {
    setMap(new mapkit.Map(el));
  };

  return (
    <MapContext.Provider value={{ map, setMap, updateMap }}>
      {props.children}
    </MapContext.Provider>
  );
};

export { MapContext, MapProvider };
