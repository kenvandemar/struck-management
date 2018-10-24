import React, { Component } from 'react';
import { startApp } from '../actions/app.action';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Login extends Component {
  render() {
    return (
      <div>
        <p>LOGIN PAGE</p>
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
