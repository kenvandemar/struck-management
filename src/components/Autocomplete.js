import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import '../styles/components/autocomplete/styles.autocomplete.css';

class Autocomplete extends Component {
  static propTypes = {
    suggestions: PropTypes.instanceOf(Array)
  };

  static defaultProps = {
    suggestions: []
  };

  constructor(props) {
    super(props);

    this.state = {
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: '',
      chooseText: false,
      items: [],
      focused: false,
      input: ''
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    let value = nextProps.value;
    if (nextProps.name === 'cargoType' && value !== undefined) {
      value = value.split(' ').join('');
      value = value.trim().split(',');

      this.setState({
        items: value
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.userInput !== prevState.userInput &&
      this.state.chooseText !== prevState.chooseText
    ) {
      var handleCargoUpdate = this.props.handleToUpdate;
      var handleDriveUpdate = this.props.handleDriveUpdate;
      if (this.props.name === 'cargoType') {
        handleCargoUpdate(this.state.items);
      }
      if (this.props.name === 'driver') {
        handleDriveUpdate(this.state.userInput);
      }
    }
  }

  _onChange = e => {
    const { suggestions, name } = this.props;
    const { items } = this.state;
    const userInput = e.currentTarget.value;
    const filteredSuggestions = suggestions.filter(
      suggestion =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions:
        items.length === 10 && name === 'cargoType' ? false : true,
      userInput: e.currentTarget.value,
      chooseText: false
    });
  };

  _onClick = e => {
    const { name } = this.props;
    const { items } = this.state;
    let tagsArray = [...items, e.currentTarget.innerText];

    // ACCEPT 1 VALUE ONLY
    if (tagsArray.length) {
      tagsArray = tagsArray.filter((item, pos) => {
        return tagsArray.indexOf(item) === pos;
      });
    }
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: name === 'cargoType' ? '' : e.currentTarget.innerText,
      items: items.length < 10 ? tagsArray : items,
      chooseText: true
    });
  };

  _onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = this.state;
    const { name } = this.props;
    if (e.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput:
          name === 'cargoType' ? '' : filteredSuggestions[activeSuggestion],
        items: [...this.state.items, filteredSuggestions[activeSuggestion]]
      });
    } else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion - 1 });
    } else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }
      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }

    if (
      this.state.items.length &&
      e.keyCode === 8 &&
      !this.state.input.length
    ) {
      this.setState(state => ({
        input: state.items.slice(0, state.items.length - 1)
      }));
    }
  };

  _onRemoveTag(index) {
    this.setState(
      {
        items: this.state.items.filter((item, i) => i !== index),
        userInput: ''
      },
      () => {
        var handleCargoUpdate = this.props.handleToUpdate;
        var handleDriveUpdate = this.props.handleDriveUpdate;
        if (this.props.name === 'cargoType') {
          handleCargoUpdate(this.state.items);
        }
        if (this.props.name === 'driver') {
          handleDriveUpdate(this.state.userInput);
        }
      }
    );
  }
  _renderInputValue = _ => {
    let inputValue = '';
    const { isSubmitForm } = this.props;

    const { userInput } = this.state;

    if (isSubmitForm !== undefined && isSubmitForm) {
      inputValue = '';
    }
    // if (value && !showSuggestions ) {
    //   console.log('MEOOOOO')
    //   inputValue = value
    // }

    if (userInput) {
      inputValue = userInput;
    }
    return inputValue;
  };

  _onWarningExceedCargo = _ => {
    const { items } = this.state;
    const { name } = this.props;
    if (items.length === 10 && name === 'cargoType') {
      return (
        <p style={styles.cargoWarning}>
          Cargo Quantity has reached the limitation
        </p>
      );
    }
  };
  render() {
    const {
      _onChange,
      _onClick,
      _onKeyDown,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput,
        items
      }
    } = this;
    const { name, required } = this.props;
    let suggestionsListComponent;

    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul className="suggestions">
            {filteredSuggestions.map((suggestion, index) => {
              let className;

              if (index === activeSuggestion) {
                className = 'suggestion-active';
              }

              return (
                <li className={className} key={suggestion} onClick={_onClick}>
                  {suggestion}
                </li>
              );
            })}
          </ul>
        );
      } else {
        suggestionsListComponent = (
          <div className="no-suggestions">
            <em>Not exist!</em>
          </div>
        );
      }
    }
    const inputStyle = {
      border: 'none'
    };
    return (
      <Fragment>
        <ul style={name === 'cargoType' ? styles.tagWrapper : null}>
          {this.props.name === 'cargoType' &&
            items.map((item, i) => {
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
            type="text"
            onChange={_onChange}
            onKeyDown={_onKeyDown}
            value={this._renderInputValue()}
            required={!items.length ? required : !required}
            onFocus={() => this.setState({ isActivateInput: true })}
            style={name === 'cargoType' ? inputStyle : null}
          />
        </ul>
        {suggestionsListComponent}
        {this._onWarningExceedCargo()}
      </Fragment>
    );
  }
}
const styles = {
  tagWrapper: {
    maxWidth: '95%',
    border: '1px solid #ddd',
    paddingBottom: '3px',
    paddingLeft: '3px',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  tags: {
    padding: '2px',
    marginTop: '2px',
    border: '1px solid #979797',
    fontFamily: 'Helvetica, sans-serif',
    borderRadius: '5px',
    marginRight: '5px',
    cursor: 'pointer',
    listStyleType: 'none'
  },
  cargoWarning: {
    fontSize: '10px',
    color: 'red'
  }
};

export default Autocomplete;
