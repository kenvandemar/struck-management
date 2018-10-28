import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import '../styles/create/styles.create.css';
import Autocomplete from '../components/Autocomplete';
import { createTruck } from '../modules/truckManagement.module';

const cargoList = [
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
];
const driverList = [
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
];

class CreateTruck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      truckPlate: '',
      cargoType: '',
      driver: '',
      truckType: '',
      price: 0,
      dimension: '',
      parkingAddress: '',
      productionYear: '',
      status: '',
      description: '',
      publishedAt: new Date(),
      updatedAt: new Date()
    };
  }
  _onChange = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  _onSubmit = e => {
    e.preventDefault();
    const {
      truckPlate,
      cargoType,
      driver,
      truckType,
      price,
      dimension,
      parkingAddress,
      productionYear,
      status,
      description
    } = this.state;
    this.props.createTruck(
      truckPlate,
      cargoType,
      driver,
      truckType,
      price,
      dimension,
      parkingAddress,
      productionYear,
      status,
      description
    );
  };
  _getCargoType(value) {
    this.setState({
      cargoType: value
    });
  }

  _getDrive(value) {
    this.setState({
      driver: value
    });
  }
  // LEFT SIDE
  _renderLeftSide() {
    const { truckPlate, truckType, price, dimension } = this.state;
    return (
      <div className="leftSideWrapper">
        {/* Truck plate */}
        <div>
          <p>Truck plate *</p>
          <input
            required
            type="text"
            name="truckPlate"
            value={truckPlate}
            onChange={this._onChange}
          />
        </div>

        {/* Cargo Type*/}
        <div>
          <p>Cargo type *</p>
          <Autocomplete
            required
            suggestions={cargoList}
            type="text"
            name="cargoType"
            handleToUpdate={this._getCargoType.bind(this)}
          />
        </div>

        {/* Driver */}
        <div>
          <p>Driver</p>
          <Autocomplete
            suggestions={driverList}
            type="text"
            name="driver"
            handleDriveUpdate={this._getDrive.bind(this)}
          />
        </div>

        {/* Truck type */}
        <div className="truckTypeWrapper">
          <p>Truck type</p>
          <input
            type="text"
            name="truckType"
            value={truckType}
            onChange={this._onChange}
          />{' '}
          ton
        </div>

        {/* Price */}
        <div>
          <p>Price *</p>
          <input
            required
            type="number"
            name="price"
            value={price}
            onChange={this._onChange}
          />
        </div>

        {/* Dimension */}
        <div>
          <p>Dimension (L-W-H)</p>
          <input
            type="text"
            name="dimension"
            value={dimension}
            onChange={this._onChange}
          />
        </div>
      </div>
    );
  }
  // RIGHT SIDE
  _renderRightSide() {
    const { parkingAddress, productionYear, status, description } = this.state;
    return (
      <div className="rightSideWrapper">
        {/* Parking Address */}
        <div className="addressWrapper">
          <p>Parking address</p>
          <input
            type="text"
            name="parkingAddress"
            value={parkingAddress}
            onChange={this._onChange}
          />
        </div>

        {/* Production year */}
        <div className="productionYear">
          <p>Production year</p>
          <input
            type="text"
            name="productionYear"
            value={productionYear}
            onChange={this._onChange}
          />
        </div>

        {/* status */}
        <div className="statusWrapper">
          <p>Status *</p>
          <input
            type="radio"
            name="status"
            value={'New'}
            onChange={this._onChange}
            defaultChecked
          />{' '}
          New
          <input
            type="radio"
            name="status"
            value={'In-use'}
            onChange={this._onChange}
          />{' '}
          In-use
          <input
            type="radio"
            name="status"
            value={'Stopped'}
            onChange={this._onChange}
          />{' '}
          Stopped
        </div>

        {/* Description */}
        <div className="descriptionWrapper">
          <p>Description</p>
          <textarea
            type="text"
            name="description"
            value={description}
            onChange={this._onChange}
          />
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

        <form className="createBody" onSubmit={this._onSubmit}>
          <div className="inputField">
            {/* LEFT SIDE */}
            {this._renderLeftSide()}
            {/* RIGHT SIDE */}
            {this._renderRightSide()}
          </div>

          {/* Submit */}
          <div className="btnCreateWrapper">
            <button className="submitCreate" type="submit">
              Submit
            </button>
            <Link to="/" className="linkHome">
              Back
            </Link>
          </div>
          <p style={{ fontSize: 10, color: 'red' }}>
            Fields marked with * are mandatory
          </p>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  truck: state.get('truck')
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      createTruck
    },
    dispatch
  );
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateTruck);
