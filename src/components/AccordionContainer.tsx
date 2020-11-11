import React from 'react';
import List from './List';
import Map from './Map';

const AccordionContainer = (): JSX.Element => {
  return (
    <div id='accordion-container'>
      <div id='list-fluid'>
        <List />
      </div>
      <div id='map-fluid'>
        <Map />
      </div>
    </div>
  );
};

export default AccordionContainer;
