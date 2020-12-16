import React, { useState } from 'react';
import { ResultsContext } from '../contexts/ResultsContext';
import { MapContext } from '../contexts/MapContext';
import { ResultsContextInterface } from '../interfaces/interfaces';
import { format } from 'path';

const Search = (cb: any): JSX.Element => {
  const [search, setSearch] = useState('');

  const Submit = () => {
    return (
      <MapContext.Consumer>
        {({ map }: any) => {
          return (
            <button
              type='submit'
              onClick={() => {
                map.removeAnnotations(map.annotations);
                handleSearch(
                  search,
                  (error: any, result: any) => {
                    if (error) console.log(error);

                    try {
                      const {
                        formattedAddress,
                        coordinate,
                        region,
                      } = result.results[0];

                      const { latitude, longitude } = coordinate;
                      const center = new mapkit.Coordinate(latitude, longitude);

                      setSearch(formattedAddress);

                      if (region) {
                        const { latitudeDelta, longitudeDelta } = region.span;
                        const span = new mapkit.CoordinateSpan(
                          latitudeDelta,
                          longitudeDelta
                        );

                        const coordinateRegion = new mapkit.CoordinateRegion(
                          center,
                          span
                        );

                        map.setRegionAnimated(coordinateRegion, span);
                      } else {
                        map.setCenterAnimated(center);
                      }
                    } catch (err) {
                      console.log(err);
                    }
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
      const geocode = new mapkit.Geocoder();
      geocode.lookup(query, (err, res) => callback(err, res));
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
