import React from 'react';

import { MapContext } from '../contexts/MapContext';

import Search from './Search';
import MobileList from './MobileList';

export default function Menu() {
  return (
    <MapContext.Consumer>
      {(context: any) => {
        return (
          <div className='menu'>
            <Search {...context} />
            <MobileList {...context} />
          </div>
        );
      }}
    </MapContext.Consumer>
  );
}
