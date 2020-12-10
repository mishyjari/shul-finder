import React, { useState } from 'react';
import SynagogueListItem from './SynagogueListItem';
import { ResultsContext } from '../contexts/ResultsContext';
import { Synagogue } from '../interfaces/interfaces';
import { isInVisibleMapRect } from './annotations/annotations';
// import InfiniteScroll from 'react-infinite-scroller';

interface ResultsContextInterface {
  results: Synagogue[];
  setResults: any;
}

const List = ({ map }: any): JSX.Element => {
  const [hidden, setHidden] = useState(false);
  const [displayResults, setDisplayResults] = useState([]);

  const toggleHidden = () => setHidden(!hidden);

  // map.addEventListener('region-change-end', () => {});

  return (
    <div className={hidden ? 'list-fluid collapse' : 'list-fluid expand'}>
      <button className='toggle-btn' onClick={toggleHidden}>
        <span>{hidden ? '>>' : '<<'}</span>
      </button>
      <ResultsContext.Consumer>
        {(context: ResultsContextInterface) => {
          map.addEventListener('region-change-end', () => {
            context.setResults(context.results);
          });

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
