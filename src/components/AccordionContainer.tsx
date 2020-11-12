import React from 'react';
import List from './List';
import Map from './Map';
import { MapContext } from '../contexts/MapContext';
require('apple-mapkit-js');

const AccordionContainer = (): JSX.Element => {
  return (
    <MapContext.Consumer>
      {(context: any) => {
        return (
          <div id='accordion-container'>
            <div id='list-fluid'>
              <List {...context} />
            </div>
            <div id='map-fluid'>
              <Map {...context} />
            </div>
          </div>
        );
      }}
    </MapContext.Consumer>
  );
};

export default AccordionContainer;
