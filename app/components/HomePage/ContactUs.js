import React from 'react';

function ContactUs() {
  return (
    <section id="contact">
      <div className="container-fluid">
        <div className="section-header">
          <h3>Contact Us</h3>
        </div>

        <div className="row wow fadeInUp justify-content-center">
          <div className="col-8">
            <div className="row">
              <div className="col-md-5 info">
                <i className="ion-ios-location-outline" />
                <p>Forn El-Shibbak</p>
              </div>
              <div className="col-md-4 info">
                <i className="ion-ios-email-outline" />
                <p>info@Libro.com</p>
              </div>
              <div className="col-md-3 info">
                <i className="ion-ios-telephone-outline" />
                <p>+961 xxx xxx</p>
              </div>
            </div>

            <div className="form">
              <div id="sendmessage">Your message has been sent. Thank you!</div>
              <div id="errormessage" />
              <div className="form-row">
                <div className="form-group col-lg-6">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    id="name"
                    placeholder="Your Name"
                    data-rule="minlen:4"
                    data-msg="Please enter at least 4 chars"
                  />
                  <div className="validation" />
                </div>
                <div className="form-group col-lg-6">
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    id="email"
                    placeholder="Your Email"
                    data-rule="email"
                    data-msg="Please enter a valid email"
                  />
                  <div className="validation" />
                </div>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="subject"
                  id="subject"
                  placeholder="Subject"
                  data-rule="minlen:4"
                  data-msg="Please enter at least 8 chars of subject"
                />
                <div className="validation" />
              </div>
              <div className="form-group">
                <textarea
                  className="form-control"
                  name="message"
                  rows="5"
                  data-rule="required"
                  data-msg="Please write something for us"
                  placeholder="Message"
                />
                <div className="validation" />
              </div>
              <div className="text-center">
                <button type="submit" title="Send Message">
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactUs;
