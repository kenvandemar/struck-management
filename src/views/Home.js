import React, { Component } from 'react';
import { startApp } from '../actions/app.action';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlusCircle,
  faEdit,
  faTrash
} from '@fortawesome/free-solid-svg-icons';

import {
  fetchAllTrucks,
  deleteTruck,
  fetchSingleTruck
} from '../modules/truckManagement.module';

import Header from '../components/Header';
import Modal from '../components/Modal';

import '../styles/home/styles.home.css';
import '../styles/modal/styles.baseModal.css';
import '../styles/deleteModal/styles.deleteModal.css';

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
      trucks: null,
      isShowModal: false,
      truckId: null
    };
  }
  componentDidMount() {
    this.props.fetchAllTrucks();
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
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
          <th />
          {tableHeader.data.map((item, index) => {
            return <th key={index}>{item}</th>;
          })}
        </tr>
      </tbody>
    );
  }

  render() {
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
              {this.state.trucks !== null
                ? this.state.trucks.map((item, index) => {
                    return (
                      <tr className="tblDataWrapper" key={index}>
                        <td>
                          <Link to="/edit" className="linkCreate">
                            <FontAwesomeIcon
                              icon={faEdit}
                              className="faEdit"
                              onClick={() =>
                                this.props.fetchSingleTruck(item._id)
                              }
                            />
                          </Link>

                          <FontAwesomeIcon
                            icon={faTrash}
                            className="faTrash"
                            onClick={() => {
                              this.setState({ truckId: item._id });
                              this.refDeleteTruck.open();
                            }}
                          />
                        </td>
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
                  })
                : null}
            </tbody>
          </table>

          {/* Add a new truck */}
          <div className="createBtn">
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
          <Modal ref={ref => (this.refDeleteTruck = ref)}>
            <div className="deleteModalContainer">
              <p className="deleteQuestion">
                Are you sure to delete this truck?
              </p>
              <div className="deleteAction">
                <div
                  className="deleteAction-deny"
                  onClick={() => this.refDeleteTruck.close()}
                >
                  No
                </div>
                <div
                  className="deleteAction-agree"
                  onClick={() => {
                    this.props.deleteTruck(this.state.truckId);
                    this.refDeleteTruck.close();
                  }}
                >
                  Yes
                </div>
              </div>
            </div>
          </Modal>
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
      fetchAllTrucks,
      deleteTruck,
      fetchSingleTruck
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
