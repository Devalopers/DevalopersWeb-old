/* eslint-disable global-require */
import React from 'react';
import './lib/bootstrap/css/bootstrap.min.css';
import './lib/font-awesome/css/font-awesome.min.css';
import './lib/animate/animate.min.css';
import './lib/ionicons/css/ionicons.min.css';
import './lib/owlcarousel/assets/owl.carousel.min.css';
import './lib/lightbox/css/lightbox.min.css';
import './css/style.css';

function Headline() {
  return (
    <section id="intro" className="clearfix">
      <div className="container">
        <div className="intro-img">
          <img
            src={require('./img/intro-img.svg')}
            alt=""
            className="img-fluid"
          />
        </div>

        <div className="intro-info">
          <h2>
            A Platform for
            <br />
            <span>Developers!</span>
          </h2>
          <div>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a href="#" className="btn-get-started scrollto">
              Get Started
            </a>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a href="#" className="btn-services scrollto">
              Our Services
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Headline;
