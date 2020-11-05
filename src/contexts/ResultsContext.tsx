import React, { useState, createContext } from 'react';

const ResultsContext = createContext({
  results: [],
  setResults: (results: any) => [...results],
});

const ResultsProvider = (props: any) => {
  const [results, setResults]: any = useState([]);
  return (
    <ResultsContext.Provider value={{ results, setResults }}>
      {props.children}
    </ResultsContext.Provider>
  );
};

export { ResultsContext, ResultsProvider };
