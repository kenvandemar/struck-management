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
      _id: '',
      truckPlate: '',
      cargoType: '',
      driver: '',
      truckType: 0,
      price: '',
      dimension: '',
      parkingAddress: '',
      productionYear: 0,
      status: '',
      description: '',
      publishedAt: new Date(),
      updatedAt: new Date(),
      char_textArea_length: 0,
      char_park_length: 0,
      isLicenseCorrect: false,
      plateLength: 0,
      isSubmit: false
    };
  }

  componentWillReceiveProps(nextProps) {
    let singgleTruckData = nextProps.truck.singleTruck.toJS();
    this.setState({
      truckPlate: singgleTruckData.truckPlate,
      cargoType: singgleTruckData.cargoType,
      driver: singgleTruckData.driver,
      truckType: singgleTruckData.truckType,
      price: singgleTruckData.price,
      dimension: singgleTruckData.dimension,
      parkingAddress: singgleTruckData.parkingAddress,
      productionYear: singgleTruckData.productionYear,
      status: singgleTruckData.status,
      description: singgleTruckData.description,
      publishedAt: singgleTruckData.publishedAt,
      updatedAt: singgleTruckData.updatedAt,
      _id: singgleTruckData._id
    });

    this.setState({
      char_park_length: nextProps.truck.singleTruck.toJS().parkingAddress
        .length,
      char_textArea_length: nextProps.truck.singleTruck.toJS().description
        .length
    });
  }

  _onChange = e => {
    const patt = /\d\d[A-Z]\-\b\d{5}\b/g;
    const state = this.state;
    let targetName = e.target.name;
    let charLength = e.target.value.length;
    state[e.target.name] = e.target.value;
    this.setState(state);

    if (targetName === 'truckPlate') {
      let isCorrectPatt = patt.test(e.target.value);
      this.setState({
        plateLength: charLength
      });
      if (isCorrectPatt) {
        this.setState({ isLicenseCorrect: true });
      } else {
        this.setState({ isLicenseCorrect: false });
      }
    }

    if (targetName === 'description') {
      if (charLength <= 500) {
        this.setState({
          char_textArea_length: charLength
        });
      }
    }
    if (e.target.name === 'parkingAddress') {
      if (charLength <= 200) {
        this.setState({
          char_park_length: charLength
        });
      }
    }
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
  _onSubmit = e => {
    const {
      _id,
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
    e.preventDefault();
    this.props.editTruck(
      _id,
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

  _warningPlateFormat() {
    if (!this.state.isLicenseCorrect && this.state.plateLength) {
      return (
        <p style={{ fontSize: 10, color: 'red', fontStyle: 'italic' }}>
          Wrong format
        </p>
      );
    } else {
      return null;
    }
  }
  // LEFT SIDE
  _renderLeftSide() {
    const {
      truckPlate,
      truckType,
      price,
      dimension,
      isSubmit,
      driver,
      cargoType
    } = this.state;

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
            value={cargoType}
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
            value={driver}
            isSubmitForm={isSubmit}
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
            min={0}
          />{' '}
          ton
        </div>

        {/* Price */}
        <div>
          <p>Price *</p>
          <input
            type="text"
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
          />
        </div>
      </div>
    );
  }
  // RIGHT SIDE
  _renderRightSide() {
    const { parkingAddress, productionYear, description, status } = this.state;
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
            checked={status === 'New' ? true : false}
          />{' '}
          New
          <input
            type="radio"
            name="status"
            value={'In-use'}
            onChange={this._onChange}
            checked={status === 'In-use' ? true : false}
          />{' '}
          In-use
          <input
            type="radio"
            name="status"
            value={'Stopped'}
            onChange={this._onChange}
            checked={status === 'Stopped' ? true : false}
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
            maxLength={500}
          />
          <p style={styles.countChar}>
            {this.state.char_textArea_length + '/' + 500}
          </p>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="createContainer">
        {/* Left */}
        <div className="createTitle">
          <FontAwesomeIcon icon={faEdit} className="faPlusCircle" />
          <h1>Edit a truck</h1>
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

const styles = {
  countChar: {
    fontSize: 11,
    fontStyle: 'italic',
    color: 'mediumblue'
  }
};

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
