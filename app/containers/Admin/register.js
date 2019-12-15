import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { register } from '../Redux/actions/Admin/actions';

import { DevContact } from '../../components/devcontact';
import BreadCrumb from '../../components/breadcrumb';
import DevButton from '../../components/devbutton';
import { FlashMessage } from '../../components/flash';
import FormItem from '../../components/formitem';
class Register extends React.Component {
  constructor() {
    super();
    this.alreadyTiming = false;
    this.state = {
      username: '',
      password: '',
      password2: '',
      phonenumber: '',
      firstname: '',
      lastname: '',
      country: '',
      email: '',
      statusIsVisible: false,
      apiStatus: false,
      apiMessage: '',
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  componentDidUpdate() {
    if (this.state.statusIsVisible && !this.alreadyTiming) {
      this.alreadyTiming = true;
      setTimeout(() => {
        this.setState({ statusIsVisible: false });
        this.alreadyTiming = false;
      }, 5000);
    }
  }

  handleClick(e) {
    e.preventDefault();
    if (!this.validateForm()) return; // TODO add more validations + flash messages
    const userBody = {
      username: this.state.username,
      password: this.state.password,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      country: this.state.country,
      phonenumber: this.state.phonenumber,
    };
    this.props.register(userBody).then(response => {
      this.setState({
        statusIsVisible: response.payload.Status !== '',
        apiStatus: response.payload.Status !== 'Failed',
        apiMessage: response.payload.message,
      });
      if (response.payload.Status === 'Successful') {
        console.log('redirecting');
        return <Redirect to="../login" />;
      }
    });
  }

  validateForm() {
    if (this.state.password !== this.state.password2) {
      return this.setState(
        {
          statusIsVisible: true,
          apiStatus: false,
          apiMessage: 'Passwords do not match',
        },
        () => false,
      );
    }
    if (
      this.state.firstname.length === 0 ||
      this.state.lastname.length === 0 ||
      this.state.username.length === 0 ||
      this.state.email.length === 0 ||
      this.state.country.length === 0 ||
      this.state.password.length === 0
    )
      return false;
    return true;
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleFlashVisibility(val) {
    const nextState = !this.state.statusIsVisible;
    if (val) {
      this.setState(
        { statusIsVisible: false },
        this.setState({ statusIsVisible: true }),
      );
    }
    return this.setState({ statusIsVisible: nextState }, () => nextState);
  }

  render() {
    return (
      <div>
        {this.state.apiStatus ? <Redirect to="/admin/login" /> : null}
        <BreadCrumb title="Register" items={['Admin', 'Register']} />
        <DevContact>
          <section className="dev-contact-area section-padding-80">
            <div className="container">
              <div className="row justify-content-between">
                <div className="col-12 col-lg-8">
                  <div className="dev-contact-form mb-80">
                    <div className="contact-heading mb-50">
                      <h4>
                        Welcome administrator !{' '}
                        <span className="fa fa-github" /> <br />
                        Please fill-up the form, it's the first step towards an
                        amazing responsibility !
                        <span className="fa fa-smile-o" />
                      </h4>
                    </div>
                    {this.state.statusIsVisible && (
                      <FlashMessage
                        open
                        type={this.state.apiStatus ? 'success' : 'error'}
                      >
                        <strong>{this.state.apiMessage}</strong>
                      </FlashMessage>
                    )}
                    <form
                      onSubmit={this.handleClick}
                      encType="multipart/form-data"
                    >
                      <div className="row">
                        <div className="col-12" />
                        <div className="col-lg-6">
                          <FormItem>
                            <div className="form-label">First name</div>
                            <input
                              type="text"
                              name="firstname"
                              placeholder="First Name"
                              onChange={this.handleChange}
                              required
                              value={this.state.firstname}
                            />
                          </FormItem>
                        </div>
                        <div className="col-lg-6">
                          <FormItem>
                            <div className="form-label">Last name</div>
                            <input
                              type="text"
                              name="lastname"
                              placeholder="Last Name"
                              onChange={this.handleChange}
                              required
                              value={this.state.lastname}
                            />
                          </FormItem>
                        </div>
                        <div className="col-lg-12">
                          <FormItem>
                            <div className="form-label">Username</div>
                            <input
                              type="text"
                              className="mb-10"
                              pattern="^[a-zA-Z0-9_]{5,}[a-zA-Z]+[0-9]*$"
                              required
                              maxLength={20}
                              name="username"
                              placeholder="Username *"
                              onChange={this.handleChange}
                            />
                          </FormItem>
                        </div>
                        <div className="col-6">
                          <FormItem>
                            <div className="form-label">Password</div>
                            <input
                              type="password"
                              name="password"
                              placeholder="Password *"
                              onChange={this.handleChange}
                              required
                            />
                          </FormItem>
                        </div>
                        <div className="col-6">
                          <FormItem>
                            <div className="form-label">Confirm Password</div>
                            <input
                              type="password"
                              name="password2"
                              placeholder="Confirm password *"
                              onChange={this.handleChange}
                              required
                            />
                          </FormItem>
                        </div>
                        <div className="col-lg-6">
                          <FormItem>
                            <div className="form-label">Email</div>
                            <input
                              type="email"
                              name="email"
                              placeholder="Email *"
                              onChange={this.handleChange}
                              required
                            />
                          </FormItem>
                        </div>
                        <div className="col-lg-6">
                          <FormItem>
                            <div className="form-label">Phone number</div>
                            <input
                              type="text"
                              name="phonenumber"
                              placeholder="Phone"
                              onChange={this.handleChange}
                              required={false}
                            />
                          </FormItem>
                        </div>
                        <div className="col-12">
                          <FormItem>
                            <div className="form-label">Country</div>
                            <input
                              id="country"
                              name="country"
                              placeholder="country*"
                              onChange={this.handleChange}
                              required
                            />
                          </FormItem>
                        </div>
                        <div className="col-12">
                          <DevButton
                            title="Register"
                            type="Submit"
                            class="btn-3 mt-15"
                            // click={this.handleClick}
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </DevContact>
      </div>
    );
  }
}

export default connect(
  null,
  { register },
)(Register);
