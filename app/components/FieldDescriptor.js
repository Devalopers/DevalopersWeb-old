import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class FieldDescriptor extends Component {
  constructor(props) {
    super(props);
    this.sideMessageDisplay = this.sideMessageDisplay.bind(this);
  }

  sideMessageDisplay() {
    return this.props.showSideMessage ? 'block' : 'none';
  }

  render() {
    return (
      <div
        style={{ display: 'flex', alignItems: 'center' }}
        className="col-lg-12"
      >
        <div>
          <h5>{this.props.mainMessage}</h5>
        </div>
        <div style={{ flex: 1 }}>
          <h6
            style={{
              wordWrap: 'break-word',
              color: 'red',
              textAlign: 'right',
              display: this.sideMessageDisplay(),
            }}
          >
            {this.props.sideMessage}
          </h6>
        </div>
      </div>
    );
  }
}

FieldDescriptor.propTypes = {
  mainMessage: PropTypes.string,
  sideMessage: PropTypes.string,
  showSideMessage: PropTypes.bool,
};
