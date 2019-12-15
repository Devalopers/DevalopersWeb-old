import React from 'react';
import './LoadingStyle.css';

class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (!this.props.isLoading) return null;
    return (
      <div className="overlay">
        <div className="spinner center">
          <div className="double-bounce1" />
          <div className="double-bounce2" />
        </div>
        <div className="below-center">
          <h3>{this.props.message}</h3>
        </div>
      </div>
    );
  }
}

export default Loading;
