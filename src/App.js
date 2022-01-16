import React, { Component } from 'react';
import Nav from './components/Nav';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Matches from './components/Matches';
import Pitches from './components/Pitches';
import Create from './components/Create';
import MatchDetails from './components/MatchDetails';
import Login from './components/Login';
import Contact from './components/Contact'
import Profile from './components/Profile';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


import {useState} from 'react';




class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      displayed_form: '',
      logged_in: localStorage.getItem('token') ? true : false,
      username: ''
    };
  }

  componentDidMount() {
    if (this.state.logged_in) {
      fetch('http://localhost:8000/core/current_user/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      })
        .then(res => res.json())
        .then(json => {
          this.setState({ username: json.username });
        });
    }
  }

  handle_login = (e, data) => {
    e.preventDefault();
    fetch('http://localhost:8000/token-auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('token', json.token);
        this.setState({
          logged_in: true,
          displayed_form: '',
          username: json.user.username
        });
      });
  };

  handle_signup = (e, data) => {
    e.preventDefault();
    fetch('http://localhost:8000/core/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('token', json.token);
        this.setState({
          logged_in: true,
          displayed_form: '',
          username: json.username
        });
      });
  };

  handle_logout = () => {
    localStorage.removeItem('token');
    this.setState({ logged_in: false, username: '' });
  };

  display_form = form => {
    this.setState({
      displayed_form: form
    });
  };


  
  render() {
    let form;
    switch (this.state.displayed_form) {
      case 'login':
        form = <LoginForm handle_login={this.handle_login} />;
        break;
      case 'signup':
        form = <SignupForm handle_signup={this.handle_signup} />;
        break;
      case 'Matches':
        form = <Matches handle_signup={this.handle_signup} />;
        break;
      case 'pitches':
        form = <Pitches handle_signup={this.handle_signup} />;
        break;  
      case 'create_match':
        form = <Create handle_signup={this.handle_signup} />;
        break;  
      case 'contact':
        form = <Contact handle_signup={this.handle_signup} />;
        break;  
      case 'profile':
        form = <Profile handle_signup={this.handle_signup} />;
        break;  
      default:
        form = null;
    }

    return (
      <div className="App">
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
        <Route exact path='/login'>
          {/* <Login /> */}
          <div className="login"> 
            <div className="img">
                <img src="/static/background_.jpg"/>
            </div> 
            <h2>QuickMatch</h2>
        <h3>
          <Nav
          logged_in={this.state.logged_in}
          display_form={this.display_form}
          handle_logout={this.handle_logout}
        />
        </h3>
        {form}
        <h2>
          {this.state.logged_in
            ? `Zalogowano!`
            : 'Musisz się zalogować !'}
        </h2>
            </div>
        
        
    );
    
          




        </Route>
        <Route exact path='/contact'>
          <Contact />
        </Route>
        <Route exact path='/profile'>
            <Profile />
        </Route>
      </Switch>
    </Router>
    </>
    
      </div>
    );
  }
}

export default App;