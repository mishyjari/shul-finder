import React, { useState } from 'react';
import { ResultsContext } from '../contexts/ResultsContext';
import { ResultsContextInterface, Synagogue } from '../interfaces/interfaces';

const Search = (): JSX.Element => {
  const [search, setSearch] = useState('');

  const Submit = () => {
    return (
      <ResultsContext.Consumer>
        {(context: ResultsContextInterface) => {
          return (
            <button
              type='submit'
              onClick={() => {
                console.log(context);
                handleSearch(
                  search,
                  ({ synagogues }: { synagogues: Synagogue[] }) => {
                    context.setResults(synagogues);
                  }
                );
              }}
            >
              Go
            </button>
          );
        }}
      </ResultsContext.Consumer>
    );
  };

  const handleSearch = (query: string, callback: any) => {
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
