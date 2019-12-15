import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DevContact } from '../../components/devcontact';
import BreadCrumb from '../../components/breadcrumb';
import DevButton from '../../components/devbutton';
import FormItem from '../../components/formitem';
import Loading from '../../components/Loading/Loading';
import { login } from '../Redux/actions/Company/actions';

function isEmail(email) {
  // eslint-disable-next-line no-useless-escape
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email,
  );
}

class Login extends Component {
  state = {
    identifier: '',
    password: '',
    apiStatus: false,
    apiMessage: '',
    submittedInvalidForm: false,
  };

  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.isFieldValid = this.isFieldValid.bind(this);
    this.isFormValid = this.isFormValid.bind(this);
    this.fieldStyle = this.fieldStyle.bind(this);
    this.errorMessageColor = this.errorMessageColor.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    const loginRequest = { password: this.state.password };
    if (!this.isFormValid()) {
      this.setState({ submittedInvalidForm: true });
    } else {
      if (isEmail(this.state.identifier)) {
        loginRequest.email = this.state.identifier;
      } else {
        loginRequest.username = this.state.identifier;
      }
      this.props.login(loginRequest);
    }
  }

  isFormValid() {
    return this.isFieldValid('identifier') && this.isFieldValid('password');
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  isFieldValid(fieldName) {
    return this.state[fieldName].length > 0;
  }

  fieldStyle(fieldName) {
    return this.state.submittedInvalidForm && !this.isFieldValid(fieldName)
      ? { borderColor: 'red' }
      : {};
  }

  errorMessageColor() {
    return this.props.data.company.operation.didLastOperationSucceed ? 'green' : 'red';
  }

  render() {
    return (
      <div>
        <Loading isLoading={this.props.data.company.operation.isOperationPending} />
        <div
          style={{
            textAlign: 'center ',
            width: '100%',
            zIndex: '10',
            backgroundColor: this.errorMessageColor(),
            position: 'sticky',
            top: '0',
          }}
        >
          <span style={{ lineHeight: '300%', color: 'white' }}>
            {this.props.data.company.operation.lastOperationMessage}
          </span>
        </div>
        <BreadCrumb title="Login" items={['Company', 'Login']} />
        <DevContact>
          <section className="dev-contact-area section-padding-80">
            <div className="container">
              <div className="row justify-content-between">
                <div className="col-12 col-lg-8">
                  <div className="dev-contact-form mb-80">
                    <div className="contact-heading mb-50">
                      <h4>
                        You are about to enter Company arena.
                        <span className="fa fa-registered" /> <br />
                        Please use your <b>secure card </b>to login.
                      </h4>
                    </div>
                    <form>
                      <div className="row">
                        <div className="col-lg-12">
                          <FormItem>
                            <input
                              type="text"
                              name="identifier"
                              style={this.fieldStyle('identifier')}
                              placeholder="Email or username"
                              required
                              onChange={this.handleChange}
                            />
                          </FormItem>
                        </div>
                        <div className="col-lg-12">
                          <FormItem>
                            <input
                              type="password"
                              name="password"
                              style={this.fieldStyle('password')}
                              placeholder="Password"
                              required
                              onChange={this.handleChange}
                            />
                          </FormItem>
                        </div>
                        <div className="col-12">
                          <a href="/Company/forgotpassword">
                            Forgot your password ?
                          </a>
                          <DevButton
                            title="Login"
                            alignment="right"
                            class="btn dev-btn btn-3 mt-15"
                            click={this.handleClick}
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

const mapStateToProps = state => {
  return {
    data: state,
  };
};

export default connect(
  mapStateToProps,
  { login },
)(Login);
