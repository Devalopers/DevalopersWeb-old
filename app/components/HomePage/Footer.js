/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

function Footer() {
  return (
    <footer id="footer">
      <div className="footer-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-5 col-md-6 footer-info">
              <h3>Libro</h3>
              <p>
                Some info about libro <br />Another info about libro
              </p>
            </div>

            <div className="col-lg-3 col-md-6 footer-links">
              <h4>Useful Links</h4>
              <ul>
                <li>
                  <a href="#">Home</a>
                </li>
                <li>
                  <a href="#">About us</a>
                </li>
                <li>
                  <a href="#">Services</a>
                </li>
                <li>
                  <a href="#">Terms of service</a>
                </li>
                <li>
                  <a href="#">Privacy policy</a>
                </li>
              </ul>
            </div>

            <div className="col-lg-4 col-md-6 footer-contact">
              <h4>Contact Us</h4>
              <p>
                Beirut, Lebanon
                <br />
                <br />
                <strong>Phone:</strong> +961 xxx xxx
                <br />
                <strong>Email:</strong> info@libro.com
                <br />
              </p>

              <div className="social-links">
                <a href="#" className="twitter">
                  <i className="fa fa-twitter" />
                </a>
                <a href="#" className="facebook">
                  <i className="fa fa-facebook" />
                </a>
                <a href="#" className="instagram">
                  <i className="fa fa-instagram" />
                </a>
                <a href="#" className="google-plus">
                  <i className="fa fa-google-plus" />
                </a>
                <a href="#" className="linkedin">
                  <i className="fa fa-linkedin" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="copyright">
          &copy; Copyright <strong>Libro</strong>. All Rights Reserved
        </div>
        <div className="credits" />
      </div>
    </footer>
  );
}

export default Footer;
