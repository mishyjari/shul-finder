import React from 'react';
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
  return (
    <Table bordered striped hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>City</th>
          <th>State</th>
          <th>Movement</th>
        </tr>
      </thead>
      <tbody>
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
      </tbody>
    </Table>
  );
};

export default List;
