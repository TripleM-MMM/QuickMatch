import React from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Matches from './components/Matches';
import Pitches from './components/Pitches';
import Create from './components/Create';
import MatchDetails from './components/MatchDetails';
import Login from './components/Login';
import Contact from './components/Contact'
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
        <Route exact path='/matches/:id'>
          <MatchDetails />
        </Route>
        <Route exact path='/pitches'>
          <Pitches />
        </Route>
        <Route exact path='/create_match'>
          <Create />
        </Route>
        <Route exact path='/Login'>
          <Login />
        </Route>
        <Route exact path='/Contact'>
          <Contact />
        </Route>
      </Switch>
    </Router>
    </>
  );
}

export default App;
