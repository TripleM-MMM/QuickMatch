import React from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Matches from './components/Matches';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


function App() {
  return (
    <>
    <Router>
      <Navbar />
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/matches'>
          <Matches />
        </Route>
      </Switch>
    </Router>
    </>
  );
}

export default App;
