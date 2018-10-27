import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import '../styles/create/styles.create.css';
import Autocomplete from '../components/Autocomplete';

export default class CreateTruck extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _renderLeftSide() {
    return (
      <div className="leftSideWrapper">
        {/* Truck plate */}
        <div>
          <p>Truck plate *</p>
          <input required />
        </div>

        {/* Cargo Type*/}
        <div>
          <p>Cargo type *</p>
          <Autocomplete
            required
            suggestions={[
              'Computer, Electronic',
              'Vegetable',
              'Kid toys, Computer',
              'Steel',
              'Coffee, tea',
              'Headphone',
              'Smartphone',
              'Clothes',
              'Liquid',
              'Milk'
            ]}
          />
        </div>

        {/* Driver */}
        <div>
          <p>Driver</p>
          <Autocomplete
            suggestions={[
              'Thomas Simson',
              'Newton',
              'Beethoven',
              'Einstein',
              'Donal Trump',
              'Obama',
              'Harry Porter',
              'Bin Clinton',
              'Hillary Rodham Clinton',
              'Super man',
              'Washington',
              'Richard Nixon',
              'J.Kenedy',
              'Abraham Lincoln',
              'Lucky Luke',
              'Michael Jackson',
              'Gerald Ford',
              'Honda',
              'Suzuki',
              'Toyota',
              'David Beckham'
            ]}
          />
        </div>

        {/* Truck type */}
        <div className="truckTypeWrapper">
          <p>Truck type</p>
          <input /> ton
        </div>

        {/* Price */}
        <div>
          <p>Price *</p>
          <input required />
        </div>

        {/* Dimension */}
        <div>
          <p>Dimension (L-W-H)</p>
          <input />
        </div>
      </div>
    );
  }
  _renderRightSide() {
    return (
      <div className="rightSideWrapper">
        {/* Parking Address */}
        <div className="addressWrapper">
          <p>Parking address</p>
          <input />
        </div>

        {/* Production year */}
        <div className="productionYear">
          <p>Production year</p>
          <input />
        </div>

        {/* status */}
        <div class="statusWrapper">
          <p>Status *</p>
          <input type="radio" name="status" value="new" checked /> New
          <input type="radio" name="status" value="inuse" /> In-use
          <input type="radio" name="status" value="stop" /> Stopped
        </div>

        {/* Description */}
        <div className="descriptionWrapper">
          <p>Description</p>
          <textarea />
        </div>
      </div>
    );
  }
  render() {
    return (
      <div className="createContainer">
        {/* Left */}
        <div className="createTitle">
          <FontAwesomeIcon icon={faPlusCircle} className="faPlusCircle" />
          <h1>Add a new truck</h1>
        </div>

        <div className="createBody">
          <div className="inputField">
            {/* LEFT SIDE */}
            {this._renderLeftSide()}
            {/* RIGHT SIDE */}
            {this._renderRightSide()}
          </div>

          {/* Submit */}
          <div className="btnCreateWrapper">
            <button
              className="submitCreate"
              onClick={() => console.log('SUBMIT')}
            >
              Submit
            </button>
            <Link to="/" className="linkHome">
              Back
            </Link>
          </div>
          <p style={{ fontSize: 10, color: 'red' }}>
            Fields marked with * are mandatory
          </p>
        </div>
      </div>
    );
  }
}
