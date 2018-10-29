import React, { PureComponent } from 'react';
import '../styles/modal/styles.baseModal.css';

export default class Modal extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      show: props.isOpen,
      width: null
    };
  }

  open = () => {
    const { onOpened } = this.props;
    this.setState(
      {
        show: true
      },
      () => {
        if (typeof onOpened === 'function') {
          onOpened();
        }
      }
    );
  };

  close = () => {
    const { onClosed } = this.props;
    this.setState(
      {
        show: false
      },
      () => {
        if (typeof onClosed === 'function') {
          onClosed();
        }
      }
    );
  };
  render() {
    const { children } = this.props;
    const displayCloseBtn = this.state.show ? 'block' : 'none';
    return (
      <div
        id="modal"
        style={{
          display: this.state.show ? null : 'none'
        }}
      >
        <div
          className="overplay"
          onMouseDown={event => {
            event.preventDefault();
            this.close();
          }}
          style={{
            display: displayCloseBtn
          }}
        />
        <div
          className="Modal"
          style={{
            display: displayCloseBtn
          }}
        >
          <div className="Modal-shadow">
            <div className="Modal-content" ref={ref => (this.refContent = ref)}>
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
