import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import MobileContainer from './MobileContainer';
import { ResultsProvider } from '../contexts/ResultsContext';
import { MapProvider } from '../contexts/MapContext';
import { BrowserView, MobileView } from 'react-device-detect';
import Alert from './Alert';
import AccordionContainer from './AccordionContainer';
import ModalIntercept from './ModalIntercept';

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
        {/* <ModalIntercept /> */}

        <ResultsProvider>
          <Router>
            <Header />
            <BrowserView>
              <main id='main'>
                <Switch>
                  <Route exact path='/' component={AccordionContainer} />
                </Switch>
              </main>
            </BrowserView>
            <MobileView>
              <main id='main-mobile'>
                <Switch>
                  <Route exact path='/' component={MobileContainer} />
                </Switch>
              </main>
            </MobileView>
          </Router>
          <Footer />
        </ResultsProvider>
      </MapProvider>
    </div>
  );
}

export default App;
