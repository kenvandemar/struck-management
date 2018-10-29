import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { editTruck } from '../modules/truckManagement.module';
import Autocomplete from '../components/Autocomplete';
import MockList from '../MockList';
import Helper from '../helper/helper';

import '../styles/create/styles.create.css';

class EditTruck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      truck: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      truck: nextProps.truck.singleTruck.toJS()
    });
  }

  _onChange = e => {
    const state = this.state.truck;
    state[e.target.name] = e.target.value;
    this.setState({ truck: state });
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
    const { truckPlate, truckType, price, dimension, truck } = this.state;
    console.log('CHCEK TRUCK', truck);
    return (
      <div className="leftSideWrapper">
        {/* Truck plate */}
        <div>
          <p>Truck plate *</p>
          <input
            required
            type="text"
            name="truckPlate"
            value={truck.truckPlate}
            onChange={this._onChange}
          />
        </div>

        {/* Cargo Type*/}
        <div>
          <p>Cargo type *</p>
          <Autocomplete
            required
            suggestions={MockList.cargoList}
            type="text"
            name="cargoType"
            handleToUpdate={this._getCargoType.bind(this)}
            value={truck.cargoType}
          />
        </div>

        {/* Driver */}
        <div>
          <p>Driver</p>
          <Autocomplete
            suggestions={MockList.driverList}
            type="text"
            name="driver"
            handleDriveUpdate={this._getDrive.bind(this)}
            value={truck.driver}
          />
        </div>

        {/* Truck type */}
        <div className="truckTypeWrapper">
          <p>Truck type</p>
          <input
            type="text"
            name="truckType"
            value={truck.truckType}
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
            value={truck.price}
            onChange={this._onChange}
          />
        </div>

        {/* Dimension */}
        <div>
          <p>Dimension (L-W-H)</p>
          <input
            type="text"
            name="dimension"
            value={truck.dimension}
            onChange={this._onChange}
          />
        </div>
      </div>
    );
  }
  // RIGHT SIDE
  _renderRightSide() {
    const {
      parkingAddress,
      productionYear,
      status,
      description,
      truck
    } = this.state;
    return (
      <div className="rightSideWrapper">
        {/* Parking Address */}
        <div className="addressWrapper">
          <p>Parking address</p>
          <input
            type="text"
            name="parkingAddress"
            value={truck.parkingAddress}
            onChange={this._onChange}
          />
        </div>

        {/* Production year */}
        <div className="productionYear">
          <p>Production year</p>
          <input
            type="text"
            name="productionYear"
            value={truck.productionYear}
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
            checked={truck.status === 'New' ? true : false}
          />{' '}
          New
          <input
            type="radio"
            name="status"
            value={'In-use'}
            onChange={this._onChange}
            checked={truck.status === 'In-use' ? true : false}
          />{' '}
          In-use
          <input
            type="radio"
            name="status"
            value={'Stopped'}
            onChange={this._onChange}
            checked={truck.status === 'Stopped' ? true : false}
          />{' '}
          Stopped
        </div>

        {/* Description */}
        <div className="descriptionWrapper">
          <p>Description</p>
          <textarea
            type="text"
            name="description"
            value={truck.description}
            onChange={this._onChange}
          />
        </div>
      </div>
    );
  }

  render() {
    console.log('CHECK STATE', this.state.truck);
    const { truck } = this.state;

    return (
      <div className="createContainer">
        {/* Left */}
        <div className="createTitle">
          <FontAwesomeIcon icon={faEdit} className="faPlusCircle" />
          <h1>Edit a truck</h1>
        </div>
        <form className="createBody" onSubmit={this._onSubmit}>
          {!Helper.checkEmpty(truck) ? (
            <div className="inputField">
              {/* LEFT SIDE */}
              {this._renderLeftSide()}
              {/* RIGHT SIDE */}
              {this._renderRightSide()}
            </div>
          ) : null}

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
      editTruck
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditTruck);
