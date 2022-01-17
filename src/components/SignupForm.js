import React from 'react';
import PropTypes from 'prop-types';

class SignupForm extends React.Component {
  state = {
    username: '',
    password: '',
    email: '',
    first_name: '',
    last_name: ''
  };

  handle_change = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(prevstate => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };

  render() {
    return (
      <form onSubmit={e => this.props.handle_signup(e, this.state)}>
        <h4>Zarejestruj się</h4>
        <label htmlFor="username">Nazwa użytkownika:</label>
        <input
          type="text"
          name="username"
          value={this.state.username}
          onChange={this.handle_change}
        />
        <label htmlFor="password">Hasło:</label>
        <input
          type="password"
          name="password"
          value={this.state.password}
          onChange={this.handle_change}
        />
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          name="email"
          value={this.state.email}
          onChange={this.handle_change}
        />
        <label htmlFor="first_name">Imię:</label>
        <input
          type="text"
          name="first_name"
          value={this.state.first_name}
          onChange={this.handle_change}
        />
        <label htmlFor="last_name">Nazwisko:</label>
        <input
          type="text"
          name="last_name"
          value={this.state.last_name}
          onChange={this.handle_change}
        />
        <input type="submit" />
      </form>
    );
  }
}

export default SignupForm;

SignupForm.propTypes = {
  handle_signup: PropTypes.func.isRequired
};