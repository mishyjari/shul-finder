import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './Header';
import MobileHeader from './MobileHeader';
import Footer from './Footer';
import MobileContainer from './MobileContainer';
import { ResultsProvider } from '../contexts/ResultsContext';
import { MapProvider } from '../contexts/MapContext';
import { BrowserView, MobileView } from 'react-device-detect';
import Alert from './Alert';
import AccordionContainer from './AccordionContainer';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className='App'>
      <Alert
        variant='danger'
        heading='Application under development'
        text='Dataset is incomplete and limited to the US. More thorough data and features coming soon!'
      />
      <MapProvider>
        <ResultsProvider>
          <Router>
            <BrowserView>
              <Header />
              <main id='main'>
                <Switch>
                  <Route exact path='/' component={AccordionContainer} />
                </Switch>
              </main>
            </BrowserView>
            <MobileView>
              <MobileHeader />
              <main id='main-mobile'>
                <Switch>
                  <Route exact path='/' component={MobileContainer} />
                </Switch>
              </main>
            </MobileView>
          </Router>
        </ResultsProvider>
      </MapProvider>
    </div>
  );
}

export default App;
