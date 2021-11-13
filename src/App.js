import React from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Matches from './components/Matches';
import Pitches from './components/Pitches';
import Create from './components/Create';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'


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
        <Route exact path='/pitches'>
          <Pitches />
        </Route>
        <Route exact path='/create_match'>
          <Create />
        </Route>
      </Switch>
    </Router>
    </>
  );
}

export default App;
