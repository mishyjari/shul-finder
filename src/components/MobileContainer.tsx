import React, { useState } from 'react';
import Map from './Map';

import { MapContext } from '../contexts/MapContext';

const MobileContainer = (): JSX.Element => {
  return (
    <MapContext.Consumer>
      {(context: any) => {
        return <Map {...context} />;
      }}
    </MapContext.Consumer>
  );
};

export default MobileContainer;
