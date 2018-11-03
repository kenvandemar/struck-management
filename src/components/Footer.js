import React, { Component } from 'react';
import '../styles/components/footer/styles.footer.css';
export default class Footer extends Component {
  render() {
    return (
      <div className="footerContainer">
        <div className="footerRow1">
          <h1>LINE</h1>
          <div className="column2">
            <p>ABOUT US</p>
            <p>CAREER</p>
            <p>CONTACT US</p>
            <p>MEDIA CENTER</p>
          </div>
          <div className="column3">
            <p>POLICY LIBRARY</p>
            <p>SITE MAP</p>
            <p>VIE | EN | JA | GER</p>
          </div>
          <div className="column3">
            <p>FOLLOW US</p>
            <p>Facebook</p>
            <p>Twitter</p>
            <p>Youtube</p>
          </div>
        </div>

        <div className="footerRow2">
          <p>&copy; LINE COPERATION 2017 | Privacy Policy</p>
        </div>
      </div>
    );
  }
}
