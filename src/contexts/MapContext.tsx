import React, { useState, createContext } from 'react';
require('apple-mapkit-js');

const MapContext = createContext({});

const MapProvider = (props: any) => {
  mapkit.init({
    authorizationCallback: function (done) {
      fetch('gettoken')
        .then(res => res.text())
        .then(done);
    },
  });
  const [map, setMap]: [any, any] = useState(new mapkit.Map('root'));

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
