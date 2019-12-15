import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../Redux/actions/Admin/actions';

// import styled from 'styled-components';
import BreadCrumb from '../../components/breadcrumb';
import DevButton from '../../components/devbutton';
import { FlashHandle } from '../../components/flash';
import FormItem from '../../components/formitem';
import Loading from '../../components/Loading/Loading';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import elements from '../../components/NavigationBar/NavigationBarData';
class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isLoading: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  validateForm() {
    return !(this.state.email.length === 0 || this.state.password.length === 0);
  }

  handleClick(e) {
    e.preventDefault();
    if (!this.validateForm()) return;
    this.setState({ isLoading: true });
    const userBody = {
      password: this.state.password,
      email: this.state.email,
    };
    this.props.login(userBody).then(response => {
      this.setState(
        {
          statusIsVisible: response.payload.Status !== '',
          apiStatus: response.payload.Status !== 'Failed',
          apiMessage: response.payload.message,
          isLoading: false,
        },
        () => {
          console.log(!this.state.apiStatus);
          if (!this.state.apiStatus)
            this.setState({ password: '', isLoading: false });
        },
      );
    });
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

  render() {
    return (
      <div>
        <Loading isLoading={this.state.isLoading} message="Loading.." />
        <BreadCrumb title="Login" items={['Admin', 'Login']} />
        {/* <DevContact> */}
        <section className="dev-contact-area section-padding-80">
          <div className="container">
            <div className="row justify-content-between">
              <div className="col-12 col-lg-8">
                <div className="dev-contact-form mb-80">
                  <div className="contact-heading mb-50">
                    <h4>
                      You are about to enter Admin arena.
                      <span className="fa fa-registered" /> <br />
                      Please use your <b>secure card </b>to login.
                    </h4>
                  </div>
                  <FlashHandle
                    visible={this.state.statusIsVisible}
                    status={this.state.apiStatus}
                    message={this.state.apiMessage}
                  />
                  {this.state.apiStatus ? <Redirect to="profile" /> : null}
                  <form onSubmit={this.handleClick}>
                    <div className="row">
                      <div className="col-lg-12">
                        <FormItem>
                          <div className="form-label">Email</div>
                          <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            onChange={this.handleChange}
                            value={this.state.email}
                            required
                          />
                        </FormItem>
                      </div>
                      <div className="col-lg-12">
                        <FormItem>
                          <div className="form-label">Password</div>
                          <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={this.handleChange}
                            value={this.state.password}
                            required
                          />
                        </FormItem>
                      </div>
                      <div className="col-12">
                        <a href="/admin/forgotpassword">
                          Forgot your password ?
                        </a>
                        <DevButton
                          title="Login"
                          alignment="right"
                          type="Submit"
                          class="btn dev-btn btn-3 mt-15"
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* </DevContact> */}
      </div>
    );
  }
}

export default connect(
  null,
  { login },
)(Login);
