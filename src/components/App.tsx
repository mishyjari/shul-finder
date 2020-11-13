import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import List from './List';
import Header from './Header';
import Footer from './Footer';
import Map from './Map';
import { ResultsProvider } from '../contexts/ResultsContext';
import { MapProvider } from '../contexts/MapContext';

import AccordionContainer from './AccordionContainer';

function App() {
  return (
    <div className='App'>
      <MapProvider>
        <ResultsProvider>
          <Router>
            <Header />
            <main id='main'>
              <Switch>
                <Route exact path='/' component={AccordionContainer} />
                <Route path='/about'>About</Route>
              </Switch>
            </main>
          </Router>
          <Footer />
        </ResultsProvider>
      </MapProvider>
    </div>
  );
}

export default App;
