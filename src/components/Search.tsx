import React, { useState } from 'react';
import { ResultsContext } from '../contexts/ResultsContext';
import { MapContext } from '../contexts/MapContext';
import { isInVisibleMapRect } from './annotations/annotations';
import {
  MapContextInterface,
  ResultsContextInterface,
  Synagogue,
} from '../interfaces/interfaces';

const Search = (): JSX.Element => {
  const [search, setSearch] = useState('');

  const Submit = () => {
    return (
      <ResultsContext.Consumer>
        {(context: ResultsContextInterface) => {
          return (
            <MapContext.Consumer>
              {({ map, setMap, updateMap }: any) => {
                map.addEventListener('zoom-end', () => {
                  handleSearch(
                    search,
                    ({ synagogues }: any) => {
                      context.setResults(synagogues);
                    },
                    map
                  );
                });
                return (
                  <button
                    type='submit'
                    onClick={() => {
                      handleSearch(
                        search,
                        ({ synagogues }: any) => {
                          context.setResults(synagogues);
                        },
                        map
                      );
                    }}
                  >
                    Go
                  </button>
                );
              }}
            </MapContext.Consumer>
          );
        }}
      </ResultsContext.Consumer>
    );
  };

  // const refreshSearchResults = (
  //   map: mapkit.Map,
  //   context: ResultsContextInterface
  // ): void => {
  //   handleSearch(
  //     search,
  //     (synagogues: Synagogue[]) => context.setResults(synagogues),
  //     map
  //   );
  // };

  const handleSearch = (query: string, callback: any, map: mapkit.Map) => {
    try {
      fetch(`synagogues?search=${query}&limit=all`)
        .then(response => response.json())
        .then(results => {
          callback(results);
        })
        .catch(console.log);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={e => e.preventDefault()}>
      <label>Search: </label>
      <input
        value={search}
        name='search'
        onChange={e => setSearch(e.target.value)}
      />
      <Submit />
    </form>
  );
};

export default Search;
