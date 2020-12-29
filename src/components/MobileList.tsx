import React, { useState } from 'react';
import MobileListItem from './MobileListItem';
import { ResultsContext } from '../contexts/ResultsContext';
import { Synagogue } from '../interfaces/interfaces';
import { isInVisibleMapRect } from './annotations/annotations';

interface ResultsContextInterface {
  results: Synagogue[];
  setResults: any;
}

const displayCountPerPage = 10;

export default function MobileList({ map }: any, props: any) {
  const [displayResults, setDisplayResults] = useState({
    results: [],
    displayCount: displayCountPerPage,
  });

  const loadMoreResults = (context: any) => {
    setDisplayResults({
      results: context.results.slice(0, displayResults.displayCount),
      displayCount: (displayResults.displayCount += displayCountPerPage),
    });
    console.log(displayResults);
  };

  const handleScroll = (e: any) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      setDisplayResults({
        results: [],
        displayCount: (displayResults.displayCount += displayCountPerPage),
      });
    }
  };

  return (
    <ResultsContext.Consumer>
      {(context: ResultsContextInterface) => {
        map.addEventListener('region-change-end', () => {
          context.setResults(context.results);
          loadMoreResults(context);
        });

        return (
          <div className='mobile-list' onScroll={handleScroll}>
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
                return <MobileListItem key={synagogue._id} {...synagogue} />;
              })}
            <button
              onClick={() => loadMoreResults(context)}
              className='btn btn-secondary w-100 load-more-btn'
            >
              Load More
            </button>
          </div>
        );
      }}
    </ResultsContext.Consumer>
  );
}
