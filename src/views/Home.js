import React, { Component } from 'react';
import { startApp } from '../actions/app.action';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import { fetchAllTrucks } from '../modules/truckManagement.module';

import Header from '../components/Header';

import '../styles/home/styles.home.css';

const tableHeader = {
  data: [
    'Truck plate',
    'Cargo type',
    'Driver',
    'Truck type',
    'Price',
    'Dimension (L-W-H)',
    'Parking address',
    'Production year',
    'Status',
    'Description'
  ]
};
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trucks: null
    };
  }
  componentDidMount() {
    this.props.fetchAllTrucks();
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log('HIHI', nextProps.truck.toJS());
    if (nextProps.truck.toJS().trucks.length) {
      this.setState({
        trucks: nextProps.truck.toJS().trucks
      });
    }
  }

  _renderTableHeader() {
    return (
      <tbody>
        <tr className="tblHeadingRow">
          {tableHeader.data.map((item, index) => {
            return <th key={index}>{item}</th>;
          })}
        </tr>
      </tbody>
    );
  }
  _renderTableData() {
    console.log('CHECK STATE', this.state.trucks);
  }
  render() {
    console.log('CHECK PROPS', this.props.truck.toJS());
    const { isRequestTruck } = this.props.truck.toJS();
    if (!isRequestTruck) {
      return (
        <div className="homeContainer">
          <Header />

          {/* SEARCH FIELD */}
          <div className="searchContainer">
            {/* Search input */}

            <input className="searchInput" placeholder={'Search'} />

            {/* Filter */}
            <div className="filterContainer">
              {/* Status */}
              <div className="select">
                <select name="slct" id="slct">
                  <option>Choose Status</option>
                  <option value="new">New</option>
                  <option value="inUse">In-use</option>
                  <option value="stop">Stopped</option>
                </select>
              </div>

              {/* Price */}
              <div className="select">
                <select name="slct" id="slct">
                  <option>Choose Price</option>
                  <option value="high">High to Low</option>
                  <option value="low">Low to High</option>
                </select>
              </div>
            </div>
          </div>

          {/* Truck data */}
          <table className="tableContainer">
            {this._renderTableHeader()}

            <tbody>
              {this.state.trucks.map((item, index) => {
                return (
                  <tr className="tblDataWrapper" key={index}>
                    <td>{item.truckPlate}</td>
                    <td>{item.cargoType}</td>
                    <td>{item.driver}</td>
                    <td>{item.truckType}</td>
                    <td>{item.price}</td>
                    <td>{item.dimension}</td>
                    <td>{item.parkingAddress}</td>
                    <td>{item.productionYear}</td>
                    <td>{item.status}</td>
                    <td>{item.description}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Add a new truck */}
          <div className="createBtn" onClick={() => console.log()}>
            <Link to="/create" className="linkCreate">
              <FontAwesomeIcon icon={faPlusCircle} className="faPlusCircle" />
              Add a new truck
            </Link>
          </div>

          {/* Paging */}
          <div className="pagingContainer">
            <p>Previous</p>
            <p>1 2 3 4...</p>
            <p>Next</p>
          </div>
        </div>
      );
    }
    return null;
  }
}

const mapStateToProps = state => ({
  truck: state.get('truck')
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      startApp,
      fetchAllTrucks
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
