/* eslint-disable jsx-a11y/anchor-is-valid,react/style-prop-object */
/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import Headline from '../../components/HomePage/Headline';
import AboutUs from '../../components/HomePage/AboutUs/AboutUs';
import Services from '../../components/HomePage/Services/Services';
import WhyUs from '../../components/HomePage/WhyUs';
import ContactUs from '../../components/HomePage/ContactUs';
import Footer from '../../components/HomePage/Footer';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Headline />
        <main id="main">
          <AboutUs />
          <Services />
          <ContactUs />
        </main>
        <Footer />
        <a href="#" className="back-to-top">
          <i className="fa fa-chevron-up" />
        </a>
      </div>
    );
  }
}

export default HomePage;
