import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRing } from '@fortawesome/free-solid-svg-icons';
import '../styles/components/header/styles.header.css';
export default class Header extends Component {
  render() {
    return (
      <div className="headerContainer">
        <h1>Truck Management Portal</h1>
        <FontAwesomeIcon icon={faRing} className="faRing" />
      </div>
    );
  }
}
