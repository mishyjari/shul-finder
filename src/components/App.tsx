import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import List from './List';
import Header from './Header';
import Footer from './Footer';
import Map from './Map';
import { ResultsProvider } from '../contexts/ResultsContext';

function App() {
  return (
    <div className='App'>
      <ResultsProvider>
        <Router>
          <Header />
          <main id='main'>
            <Switch>
              <Route exact path='/' component={List} />
              <Route path='/map' component={Map} />
              <Route path='/about'>About</Route>
            </Switch>
          </main>
        </Router>
        <Footer />
      </ResultsProvider>
    </div>
  );
}

export default App;
