import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import NavigationBarItem from './NavigationBarItem';

class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowing: false,
    };
    this.ToggleNavBar = this.ToggleNavBar.bind(this);
    this.init();
  }

  init() {
    this.leftElements = this.props.elements.map(item =>
      <NavigationBarItem key={item.id} item={item} />
    );
  }

  ToggleNavBar() {
    this.setState(prevState => ({
      isShowing: !prevState.isShowing,
    }));
    this.showNavBar = this.state.isShowing
      ? 'collapse navbar-collapse'
      : 'collapse navbar-collapse show';
  }

  render() {
    return (
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="/">
          {this.props.title}
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={this.ToggleNavBar}
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className={this.showNavBar} id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">{this.leftElements}</ul>
        </div>
      </nav>
    );
  }
}

export default NavigationBar;
