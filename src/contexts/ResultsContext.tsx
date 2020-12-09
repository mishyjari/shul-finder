import React, { useState, createContext, useEffect } from 'react';
import { Synagogue } from '../interfaces/interfaces';

const ResultsContext = createContext({
  results: [],
  setResults: (results: any) => [...results],
});

const ResultsProvider = (props: any) => {
  const [results, setResults]: any = useState([]);

  useEffect(() => {
    fetch('synagogues')
      .then(res => res.json())
      .then(synagogues => {
        setResults(synagogues);
      });
  }, []);

  return (
    <ResultsContext.Provider value={{ results, setResults }}>
      {props.children}
    </ResultsContext.Provider>
  );
};

export { ResultsContext, ResultsProvider };
