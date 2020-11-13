import React from 'react';
import { MapContext } from '../contexts/MapContext';

const About = (): JSX.Element => (
  <MapContext.Consumer>
    {context => {
      return <h1>About</h1>;
    }}
  </MapContext.Consumer>
);
