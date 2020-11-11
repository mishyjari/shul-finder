import React from 'react';
import List from './List';
import Map from './Map';
import { MapContext } from '../contexts/MapContext';
require('apple-mapkit-js');

const AccordionContainer = (): JSX.Element => {
  return (
    <div id='accordion-container'>
      <div id='list-fluid'>
        <List />
      </div>
      <div id='map-fluid'>
        <MapContext.Consumer>
          {(context: any) => <Map {...context} />}
        </MapContext.Consumer>
      </div>
    </div>
  );
};

export default AccordionContainer;
