/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { Messages } from 'primereact/messages';
import PrimereactStyle from '@bit/primefaces.primereact.internal.stylelinks';
import { login } from '../Redux/actions/Developer/actions';
import { DevContact } from '../../components/devcontact';
import BreadCrumb from '../../components/breadcrumb';
import DevButton from '../../components/devbutton';
import FormItemGenerator from './formitemgenerator';
class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      redirect: false,
    };
    this.returnToTopRef = null;
    this.messages = null;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  showSuccess(status, message) {
    window.scrollTo(0, this.returnToTopRef.offsetTop);
    this.messages.show({
      severity: 'success',
      summary: status,
      detail: message,
    });
  }

  showError(status, message) {
    window.scrollTo(0, this.returnToTopRef.offsetTop);
    this.messages.show({
      severity: 'error',
      summary: status,
      detail: message,
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props
      .login({
        email: this.state.email,
        password: this.state.password,
      })
      .then(response => {
        if (response.payload.status === 'Successful') {
          this.showSuccess(response.payload.status, response.payload.message);
          return this.setState({
            redirect: true,
          });
        }
        return this.setState({ password: '' }, () => {
          this.showError(response.payload.status, response.payload.message);
        });
      });
  }

  render() {
    if (this.state.redirect) return <Redirect to="/developer/viewProfile" />;
    return (
      <React.Fragment>
        <BreadCrumb title="Login" items={['Developer', 'Login']} />
        <DevContact>
          <section className="dev-contact-area section-padding-80">
            <div className="container">
              <div className="row justify-content-between">
                <div className="col-12 col-lg-8">
                  <div className="dev-contact-form mb-80">
                    <div className="contact-heading mb-50">
                      <h4>
                        You are about to enter developers arena.
                        <span className="fa fa-registered" /> <br />
                        Please use your <b>secure card </b>to login.
                      </h4>
                    </div>
                    <form
                      method="POST"
                      encType="multipart/form-data"
                      onSubmit={this.handleSubmit}
                    >
                      <div
                        className="row"
                        ref={ref => {
                          this.returnToTopRef = ref;
                        }}
                      >
                        <div className="col-12">
                          <PrimereactStyle />
                          <Messages
                            style={{ width: '100%' }}
                            ref={el => {
                              this.messages = el;
                            }}
                          />
                        </div>
                        <div className="col-lg-12 mb-30">
                          <FormItemGenerator
                            name="email"
                            value={this.state.email}
                            handler={this.handleChange}
                            options={{ required: true }}
                          />
                        </div>
                        <div className="col-lg-12 mb-30">
                          <FormItemGenerator
                            name="password"
                            value={this.state.password}
                            handler={this.handleChange}
                            options={{ required: true, pattern: '.*' }}
                          />
                        </div>
                        <div className="col-12">
                          <Link to="/developer/forgotpassword">
                            Forgot your password ?
                          </Link>
                          <div style={{ textAlign: 'right' }}>
                            <DevButton
                              title="Login"
                              type="submit"
                              class="btn-3 mt-15"
                            />
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </DevContact>
      </React.Fragment>
    );
  }
}

export default connect(
  null,
  { login },
)(Login);
