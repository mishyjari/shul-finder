import React from 'react';
import { Table } from 'react-bootstrap';
import SynagogueListItem from './SynagogueListItem';
import { ResultsContext } from '../contexts/ResultsContext';

interface Synagogue {
  _id: number;
  name: string;
  city: string;
  state: string;
  movement: string;
}

interface ResultsContextInterface {
  results: Synagogue[];
  setResults: any;
}

const List = (): JSX.Element => {
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
            return context.results.map((result: Synagogue) => {
              return <SynagogueListItem key={result._id} {...result} />;
            });
          }}
        </ResultsContext.Consumer>
      </tbody>
    </Table>
  );
};

export default List;
