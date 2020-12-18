import React, { useState } from 'react';
import { MapContext } from '../contexts/MapContext';
import { Form, Button, Col } from 'react-bootstrap';

const Search = (props: any): JSX.Element => {
  const [search, setSearch] = useState('');

  const Submit = () => {
    return (
      <MapContext.Consumer>
        {({ map }: any) => {
          return (
            <Button
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
            </Button>
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
    <Form onSubmit={e => e.preventDefault()}>
      <Form.Row>
        <Col>
          <Form.Label>Search: </Form.Label>
          <Form.Control
            type='text'
            value={search}
            name='search'
            onChange={e => setSearch(e.target.value)}
          />
        </Col>
        <Col>
          <Submit />
        </Col>
      </Form.Row>
    </Form>
  );
};

export default Search;
