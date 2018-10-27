import React, { Component } from 'react';
import { startApp } from '../actions/app.action';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import '../styles/home/styles.home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.startApp();
  }

  render() {
    return (
      <div>
        <p>HOME</p>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    prop: state.prop
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      startApp
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
