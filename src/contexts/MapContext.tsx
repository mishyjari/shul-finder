import React, { useState, createContext } from 'react';
require('apple-mapkit-js');

const MapContext = createContext({});

const MapProvider = (props: any) => {
  const [map, setMap]: [mapkit.Map, any] = useState(new mapkit.Map('root'));
  return (
    <MapContext.Provider value={{ map, setMap }}>
      {props.children}
    </MapContext.Provider>
  );
};

export { MapContext, MapProvider };
