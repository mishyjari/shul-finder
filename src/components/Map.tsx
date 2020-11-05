import * as React from 'react';
import { useState, useEffect } from 'react';
import { ResultsContext } from '../contexts/ResultsContext';
import { Synagogue, ResultsContextInterface } from '../interfaces/interfaces';
import { synagogueAnnotation, userAnnotation } from './annotations/annotations';

require('apple-mapkit-js');

const Map = (): JSX.Element => {
  mapkit.init({
    authorizationCallback: function (done) {
      fetch('gettoken')
        .then(res => res.text())
        .then(done);
    },
  });

  const [map, setMap]: any = useState(new mapkit.Map('root'));

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

  useEffect(() => {
    setMap(new mapkit.Map('map-container'));
    return () => map.destroy();
  }, []);

  return (
    <ResultsContext.Consumer>
      {(context: ResultsContextInterface) => {
        context.results.forEach((synagogue: Synagogue) => {
          try {
            map.addAnnotation(synagogueAnnotation(synagogue));
          } catch (err) {
            console.log(err);
            console.log(synagogue);
          }
        });
        return <div id='map-container'></div>;
      }}
    </ResultsContext.Consumer>
  );
};

export default Map;
