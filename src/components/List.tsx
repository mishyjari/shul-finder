import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import SynagogueListItem from './SynagogueListItem';
import { ResultsContext } from '../contexts/ResultsContext';
import { Synagogue } from '../interfaces/interfaces';
import { isInVisibleMapRect } from './annotations/annotations';

interface ResultsContextInterface {
  results: Synagogue[];
  setResults: any;
}

const List = ({ map }: any): JSX.Element => {
  const [hidden, setHidden] = useState(false);

  const toggleHidden = () => setHidden(!hidden);

  return (
    <div id='list-fluid' className={hidden ? 'collapse' : 'expand'}>
      <button id='toggle-btn' onClick={toggleHidden}>
        {hidden ? '>>' : 'Hide List'}
      </button>
      <ResultsContext.Consumer>
        {(context: ResultsContextInterface) => {
          return context.results.map((synagogue: Synagogue) => {
            const { latitude, longitude } = synagogue;
            const boundingRegion = map.region.toBoundingRegion();
            if (isInVisibleMapRect({ latitude, longitude }, boundingRegion)) {
              return <SynagogueListItem key={synagogue._id} {...synagogue} />;
            }
            return null;
          });
        }}
      </ResultsContext.Consumer>
    </div>
  );
};

export default List;
