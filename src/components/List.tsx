import React, { useState, useEffect } from 'react';
import SynagogueListItem from './SynagogueListItem';
import { ResultsContext } from '../contexts/ResultsContext';
import { Synagogue } from '../interfaces/interfaces';
import { isInVisibleMapRect } from './annotations/annotations';
// import InfiniteScroll from 'react-infinite-scroller';

interface ResultsContextInterface {
  results: Synagogue[];
  setResults: any;
}

const displayCountPerPage = 5;

const List = ({ map }: any): JSX.Element => {
  const [hidden, setHidden] = useState(false);
  const [displayResults, setDisplayResults] = useState({
    results: [],
    displayCount: displayCountPerPage,
  });

  const toggleHidden = () => setHidden(!hidden);

  const loadMoreResults = (context: any) => {
    console.log(displayResults);
    console.log(context);
    setDisplayResults({
      results: context.results.slice(0, displayResults.displayCount),
      displayCount: (displayResults.displayCount += displayCountPerPage),
    });
    console.log(displayResults);
  };

  const handleScroll = (e: any) => {
    console.log('scroll');
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      console.log('bottom');
      setDisplayResults({
        results: [],
        displayCount: (displayResults.displayCount += displayCountPerPage),
      });
    }
  };

  return (
    <div
      className={hidden ? 'list-fluid collapse' : 'list-fluid expand'}
      onScroll={handleScroll}
    >
      <button className='toggle-btn' onClick={toggleHidden}>
        <span>{hidden ? '>>' : '<<'}</span>
      </button>
      <ResultsContext.Consumer>
        {(context: ResultsContextInterface) => {
          map.addEventListener('region-change-end', () => {
            context.setResults(context.results);
          });

          return (
            <div>
              {context.results
                .filter((synagogue: Synagogue) => {
                  const { latitude, longitude } = synagogue;
                  const boundingRegion = map.region.toBoundingRegion();
                  return isInVisibleMapRect(
                    { latitude, longitude },
                    boundingRegion
                  );
                })
                .slice(0, displayResults.displayCount)
                .map((synagogue: Synagogue) => {
                  return (
                    <SynagogueListItem key={synagogue._id} {...synagogue} />
                  );
                })}
              <button
                onClick={() => loadMoreResults(context)}
                className='btn btn-secondary w-75'
              >
                Load More
              </button>
            </div>
          );
        }}
      </ResultsContext.Consumer>
    </div>
  );
};

export default List;
