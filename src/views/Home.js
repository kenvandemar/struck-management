import React, { Component } from 'react';
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
  fetchTrucks,
  deleteTruck,
  fetchSingleTruck,
  searchTruck,
  filterTruckStatus,
  filterPrice
} from '../modules/truckManagement.module';
import Modal from '../components/Modal';

import '../styles/home/styles.home.css';
import '../styles/modal/styles.baseModal.css';
import '../styles/deleteModal/styles.deleteModal.css';
import Helper from '../helper/helper';

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
      trucks: [],
      isShowModal: false,
      truckId: null,
      searchText: '',
      emptySearch: false,
      foundSearch: false,
      items: [],
      focused: false,
      input: '',
      page: 1,
      currentPage: 1,
      totalPage: 1,
      statusName: '',
      statusValue: '',
      priceName: '',
      priceValue: ''
    };
  }
  componentDidMount() {
    this.props.fetchTrucks(this.state.page);
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    let truckData = nextProps.truck.toJS();
    if (truckData.trucks !== undefined && truckData.trucks !== null) {
      this.setState({
        trucks: truckData.trucks,
        currentPage: truckData.currentPage,
        totalPage: truckData.totalPages
      });
    } else {
      this.setState({
        trucks: [],
        currentPage: null,
        totalPage: null
      });
    }
    if (nextProps.truck.toJS().emptySearch) {
      this.setState({ emptySearch: true });
    } else {
      this.setState({ emptySearch: false });
    }
    if (nextProps.truck.toJS().foundSearch) {
      this.setState({ foundSearch: true });
    } else {
      this.setState({ foundSearch: false });
    }
  }

  _onResetPage() {
    this.setState({
      currentPage: 1
    });
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

  _onChange = e => {
    let value = e.target.value;
    this.setState({
      searchText: value,
      currentPage: 1
    });
    if (
      (!value.length && this.state.emptySearch) ||
      (!value.length && this.state.foundSearch)
    ) {
      this.props.fetchTrucks(this.state.page);
    }
  };
  _onSearchTruck(e) {
    const { searchText, currentPage } = this.state;
    e.preventDefault();

    this.props.searchTruck(searchText, currentPage);
    this.setState({
      searchText: ''
    });
  }

  _renderEmptySearch() {
    const { emptySearch } = this.state;
    if (emptySearch) {
      return (
        <p className="notFound">Not found any trucks! Please try again!</p>
      );
    }
    return null;
  }

  _onHandleStatusOption = e => {
    const { currentPage } = this.state;
    const { value, name } = e.target;
    this.props.filterTruckStatus(e.target.value, currentPage);
    this.setState({
      items: value.split(),
      statusName: name,
      statusValue: value,
      priceName: '',
      priceValue: ''
    });
  };

  _onFilterPrice = e => {
    const { value, name } = e.target;
    const { currentPage } = this.state;
    this.setState({
      priceName: name,
      priceValue: value,
      items: value.split(),
      statusName: '',
      statusValue: ''
    });
    this._onFilterPriceOnPage(value, currentPage);
  };

  _onHandleKeyDown = e => {
    if (e.keyCode === 13) {
      const { value } = e.target;
      this.setState(state => ({
        items: [...state.items, value]
      }));
    }
    if (
      this.state.items.length &&
      e.keyCode === 8 &&
      !this.state.searchText.length
    ) {
      this.setState(state => ({
        searchText: state.items.slice(0, state.items.length - 1)
      }));
    }
  };

  _onRemoveTag(index) {
    this.setState(state => ({
      items: state.items.filter((item, i) => i !== index),
      statusName: '',
      statusValue: '',
      priceName: '',
      priceValue: ''
    }));
    if (this.state.items.length === 1) {
      this.props.fetchTrucks(this.state.page);
    }
  }

  _onRenderFirst() {
    const { currentPage, totalPage } = this.state;
    if (Number(currentPage) === 1 && totalPage > 1) {
      return <span className="disablePage">First</span>;
    } else if (Number(currentPage) > 1 && totalPage > 1) {
      return (
        <span onClick={() => this.props.fetchTrucks(1)} className="enablePage">
          First
        </span>
      );
    } else {
      return null;
    }
  }

  _onRenderLast() {
    const { currentPage, totalPage } = this.state;
    if (Number(currentPage) === totalPage && totalPage > 1) {
      return <span className="disablePage">Last</span>;
    } else if (Number(currentPage) < totalPage) {
      return (
        <span
          onClick={() => this.props.fetchTrucks(totalPage)}
          className="enablePage"
        >
          Last
        </span>
      );
    } else {
      return null;
    }
  }

  _onFilterPriceOnPage(condition, page) {
    if (condition === 'highToLow') {
      this.props.filterPrice('-price', page);
    }
    if (condition === 'lowToHigh') {
      this.props.filterPrice('price', page);
    }
  }
  _onFetchTrucksOnPaging(index) {
    const { statusName, statusValue, priceName, priceValue } = this.state;
    if (statusName === 'statusSelected') {
      this.props.filterTruckStatus(statusValue, index);
    } else if (priceName === 'priceSelected') {
      this._onFilterPriceOnPage(priceValue, index);
    } else {
      this.props.fetchTrucks(index);
    }
  }

  _onRenderPageNum() {
    const { currentPage, totalPage } = this.state;
    let pages = [];
    if (totalPage !== null && totalPage > 1) {
      for (let i = 1; i <= Number(totalPage); i++) {
        let isActivePage =
          i === Number(currentPage) ? 'activePage' : 'inActivePage';
        pages.push(
          <p
            key={i}
            className={isActivePage}
            onClick={() => this._onFetchTrucksOnPaging(i)}
          >
            {i}
          </p>
        );
      }
    }
    return pages;
  }

  _onRenderPaging() {
    const { emptySearch } = this.state;

    if (!emptySearch) {
      return (
        <div className="pagingContainer">
          {this._onRenderFirst()}
          {this._onRenderPageNum()}
          {this._onRenderLast()}
        </div>
      );
    } else {
      return null;
    }
  }
  _onClearSearch() {
    const { items } = this.state;
    if (items.length) {
      return (
        <div
          className="clearSearch"
          onClick={() => {
            this.props.fetchTrucks(1);
            this.setState({
              items: []
            });
          }}
        >
          <p>Clear search</p>
        </div>
      );
    }
  }
  render() {
    const { isRequestTruck } = this.props.truck.toJS();
    const { trucks, currentPage } = this.state;
    if (!isRequestTruck) {
      return (
        <div className="homeContainer">
          {/* SEARCH FIELD */}
          <div className="searchContainer">
            {/* Search input */}
            <form
              onSubmit={e => {
                this._onResetPage();
                this._onSearchTruck(e);
              }}
              className="searchForm"
            >
              <ul style={styles.tagWrapper}>
                {this.state.items.map((item, i) => {
                  return (
                    <li
                      key={i}
                      style={styles.tags}
                      onClick={() => this._onRemoveTag(i)}
                    >
                      {item} x
                    </li>
                  );
                })}
                <input
                  className="searchInput"
                  name="search"
                  type="search"
                  placeholder={'Search'}
                  onChange={this._onChange}
                  onKeyDown={this._onHandleKeyDown}
                  value={this.state.searchText}
                  autoComplete="off"
                />
              </ul>
              {this._onClearSearch()}
            </form>

            {/* Filter */}
            <div className="filterContainer">
              {/* Status */}
              <div className="select" onMouseDown={() => this._onResetPage()}>
                <select
                  name="statusSelected"
                  id="slct"
                  onChange={this._onHandleStatusOption}
                >
                  <option>Choose Status</option>
                  <option value="New">New</option>
                  <option value="In-use">In-use</option>
                  <option value="Stopped">Stopped</option>
                </select>
              </div>

              {/* Price */}
              <div className="select" onMouseDown={() => this._onResetPage()}>
                <select
                  name="priceSelected"
                  id="slct"
                  onChange={this._onFilterPrice}
                >
                  <option>Choose Price</option>
                  <option value="highToLow">High to Low</option>
                  <option value="lowToHigh">Low to High</option>
                </select>
              </div>
            </div>
          </div>

          {/* Truck data */}
          <table className="tableContainer">
            {this._renderTableHeader()}
            <tbody>
              {trucks.length && trucks !== null
                ? this.state.trucks.map((item, index) => {
                    return (
                      <tr className="tblDataWrapper" key={index}>
                        <td>
                          <Link to="/edit" className="linkCreate">
                            <FontAwesomeIcon
                              icon={faEdit}
                              className="faEdit"
                              onClick={() =>
                                this.props.fetchSingleTruck(
                                  item._id,
                                  currentPage
                                )
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
                        <td>{Helper.formatMoney(item.price)}</td>
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
          {this._renderEmptySearch()}

          {/* Add a new truck */}
          <div className="createBtn">
            <Link to="/create" className="linkCreate">
              <FontAwesomeIcon icon={faPlusCircle} className="faPlusCircle" />
              Add a new truck
            </Link>
          </div>

          {/* Paging */}
          {this._onRenderPaging()}

          {/* MODAL */}
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
                    this.props.deleteTruck(this.state.truckId, currentPage);
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

const styles = {
  tagWrapper: {
    border: '1px solid #ddd',
    padding: '4px',
    borderRadius: '5px'
  },

  tags: {
    display: 'inline-block',
    padding: '2px',
    border: '1px solid #979797',
    fontFamily: 'Helvetica, sans-serif',
    borderRadius: '5px',
    marginRight: '5px',
    cursor: 'pointer'
  },

  input: {
    outline: 'none',
    border: 'none',
    fontSize: '15px',
    fontFamily: 'Helvetica, sans-serif'
  }
};

const mapStateToProps = state => ({
  truck: state.get('truck')
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchTrucks,
      deleteTruck,
      fetchSingleTruck,
      searchTruck,
      filterTruckStatus,
      filterPrice
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
