import React, { useState } from 'react';
import Map from './Map';
import List from './List';

import { MapContext } from '../contexts/MapContext';

const MobileContainer = (): JSX.Element => {
  const [showMap, setShowMap] = useState(false);
  return (
    <MapContext.Consumer>
      {(context: any) => {
        return showMap ? (
          <Map {...context} />
        ) : (
          <List {...context} mobile={true} />
        );
      }}
    </MapContext.Consumer>
  );
};

export default MobileContainer;
