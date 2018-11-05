import React, { Component } from 'react';
import { startApp } from '../actions/app.action';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import '../styles/auth/styles.auth.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: ''
    };
  }
  handleChangeUserName(event) {
    this.setState({
      userName: event.target.value
    });
  }

  handleChangePassword(event) {
    this.setState({
      password: event.target.value
    });
  }

  render() {
    return (
      <div className="loginContainer">
        <h1 className="loginTitle">Truck Mangement Portal</h1>
        <p className="logo">LINE Corp</p>
        <div className="userNameWrapper">
          <input
            className="userNameInput"
            onChange={this.handleChangeUserName}
            placeHolder={'username'}
          />
        </div>

        <div className="passwordWrapper">
          <input
            className="passwordInput"
            onChange={this.handleChangePassword}
            placeHolder={'password'}
            type="password"
          />
        </div>

        <div className="loginBtn" onClick={() => console.log()}>
          <Link to="/Home" className="linkHome">
            Login
          </Link>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      startApp
    },
    dispatch
  );
};
export default connect(
  null,
  mapDispatchToProps
)(Login);
