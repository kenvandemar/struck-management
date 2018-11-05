import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import Autocomplete from '../components/Autocomplete';
import { createTruck } from '../modules/truckManagement.module';
import MockList from '../MockList';
import '../styles/create/styles.create.css';

class CreateTruck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      truckPlate: '',
      cargoType: '',
      driver: '',
      truckType: '',
      price: '',
      dimension: '',
      parkingAddress: '',
      productionYear: '',
      status: 'New',
      description: '',
      publishedAt: new Date(),
      updatedAt: new Date(),
      char_textArea_length: 0,
      char_park_length: 0,
      isLicenseCorrect: false,
      isDimensionCorrect: false,
      plateLength: 0,
      dimensionLength: 0,
      isSubmit: false
    };
  }
  _onValidatePattern(plate, dimensions) {
    const { truckPlate, dimension } = this.state;
    // We assume our license plate follow format:
    // 30A-12345(dda-dddd) [d:digit, a: alphabet, -: character '-']
    const truckPlatePatt = /\d\d[A-Z]-\b\d{5}\b/g;

    // This Dimension Pattern only match for dimension likes: 4.5-4.3-4.4
    const dimensionPatt = /[+-]?([0-9]+([.][0-9]*))-[+-]?([0-9]+([.][0-9]*))-[+-]?([0-9]+([.][0-9]*))/g;
    if (truckPlate.length || dimension.length) {
      if (plate !== null) {
        let isTruckPlateCorrect = truckPlatePatt.test(plate);
        if (isTruckPlateCorrect) {
          this.setState({ isLicenseCorrect: true });
        } else {
          this.setState({ isLicenseCorrect: false });
        }
      }
      if (dimensions !== null) {
        let isDimensionCorrect = dimensionPatt.test(dimensions);
        if (isDimensionCorrect) {
          this.setState({ isDimensionCorrect: true });
        } else {
          this.setState({ isDimensionCorrect: false });
        }
      }
    }
  }
  _onChange = e => {
    const state = this.state;
    const { value, name } = e.target;
    let targetName = name;

    let charLength = value.length;
    state[targetName] = value;
    this.setState(state);

    if (targetName === 'truckPlate') {
      this.setState({
        plateLength: charLength
      });
      this._onValidatePattern(value, null);
    }
    if (targetName === 'dimension') {
      this.setState({
        dimensionLength: charLength
      });
      this._onValidatePattern(null, value);
    }

    if (targetName === 'description') {
      if (charLength <= 500) {
        this.setState({
          char_textArea_length: charLength
        });
      }
    }
    if (targetName === 'parkingAddress') {
      if (charLength <= 200) {
        this.setState({
          char_park_length: charLength
        });
      }
    }
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
    this.setState({
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
      isSubmit: true
    });
  };
  _getCargoType(value) {
    let vl = value.slice();
    vl = vl.join(', ').toString();
    this.setState({
      cargoType: vl
    });
  }

  _getDrive(value) {
    this.setState({
      driver: value
    });
  }
  _warningPlateFormat() {
    if (!this.state.isLicenseCorrect && this.state.plateLength) {
      return <p style={styles.warningPattern}>Incorrect truck plate format</p>;
    } else {
      return null;
    }
  }
  _warningDimensionFormat() {
    if (!this.state.isDimensionCorrect && this.state.dimensionLength) {
      return <p style={styles.warningPattern}>Incorrect dimension format</p>;
    } else {
      return null;
    }
  }

  // LEFT SIDE
  _renderLeftSide() {
    const { truckPlate, truckType, price, dimension, isSubmit } = this.state;

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
            placeholder={'30A-12345'}
          />
          {this._warningPlateFormat()}
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
            isSubmitForm={isSubmit}
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
            isSubmitForm={isSubmit}
          />
        </div>

        {/* Truck type */}
        <div className="truckTypeWrapper">
          <p>Truck type</p>
          <input
            type="number"
            name="truckType"
            value={truckType}
            onChange={this._onChange}
            min={0}
          />{' '}
          ton
        </div>

        {/* Price */}
        <div>
          <p>Price *</p>
          <input
            type="number"
            required
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
            placeholder={'9.5-1.9-22'}
          />
          {this._warningDimensionFormat()}
        </div>
      </div>
    );
  }
  // RIGHT SIDE
  _renderRightSide() {
    const { parkingAddress, productionYear, description } = this.state;
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
            maxLength={200}
          />
          <p style={styles.countChar}>
            {this.state.char_park_length + '/' + 200}
          </p>
        </div>

        {/* Production year */}
        <div className="productionYear">
          <p>Production year</p>
          <input
            type="number"
            name="productionYear"
            value={productionYear}
            onChange={this._onChange}
            min={0}
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
            disabled={false}
            maxLength={500}
          />
          <p style={styles.countChar}>
            {this.state.char_textArea_length + '/' + 500}
          </p>
        </div>
      </div>
    );
  }
  _onKeydownForm = e => {
    if (e.keyCode === 13) {
      if (this.state.isLicenseCorrect) {
        this.setState({
          isSubmit: true
        });
        return;
      } else {
        return null;
      }
    }
  };

  render() {
    return (
      <div className="createContainer">
        <div className="createWrapper">
          {/* Left */}
          <div className="createTitle">
            <FontAwesomeIcon icon={faPlusCircle} className="faPlusCircle" />
            <h1>Add a new truck</h1>
          </div>

          <form
            className="createBody"
            onSubmit={this._onSubmit}
            onKeyDown={this._onKeydownForm}
          >
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
                type="submit"
                disabled={
                  this.state.isLicenseCorrect && this.state.isDimensionCorrect
                    ? false
                    : true
                }
              >
                Submit
              </button>
              <Link to="/Home" className="linkHome">
                Back
              </Link>
            </div>
            <p style={styles.mandatory}>Fields marked with * are mandatory</p>
          </form>
        </div>
      </div>
    );
  }
}
const styles = {
  countChar: {
    fontSize: 11,
    fontStyle: 'italic',
    color: 'mediumblue'
  },
  mandatory: {
    fontSize: 10,
    color: 'red',
    marginTop: 5
  },
  warningPattern: {
    fontSize: 10,
    color: 'red',
    fontStyle: 'italic'
  }
};
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
