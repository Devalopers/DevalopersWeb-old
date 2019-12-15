/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import BreadCrumb from '../../components/breadcrumb';
import DevButton from '../../components/devbutton';
import FormItem from '../../components/formitem';
import { DevContact } from '../../components/devcontact';
import Loading from '../../components/Loading/Loading';
import { forgotPassword } from '../Redux/actions/Company/actions';

class ForgotPassword extends Component {
  state = {
    email: '',
    submittedInvalidForm: false,
  };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.isFormValid = this.isFormValid.bind(this);
    this.isFieldValid = this.isFieldValid.bind(this);
    this.fieldStyle = this.fieldStyle.bind(this);
    this.errorMessageColor = this.errorMessageColor.bind(this);
  }

  isFormValid() {
    return this.isFieldValid('email');
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  isFieldValid(fieldName) {
    return this.state[fieldName].length > 0;
  }

  handleClick() {
    if (!this.isFormValid()) {
      this.setState({ submittedInvalidForm: true });
    } else {
      this.props.forgotPassword(this.state.email);
    }
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
        {this.props.data.company.operation.didLastOperationSucceed ? <Redirect to='/company/resetpassword' /> : ''}
        <Loading
          isLoading={this.props.data.company.operation.isOperationPending}
        />
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
        <BreadCrumb
          title="Forgot Password"
          items={['Company', 'Forgot Password']}
        />
        <DevContact>
          <section className="dev-contact-area section-padding-80">
            <div className="container">
              <div className="row justify-content-between">
                <div className="col-12 col-lg-8">
                  <div className="dev-contact-form mb-80">
                    <div className="contact-heading mb-50">
                      <h4>
                        To reset your password enter your <b>email address</b>.
                      </h4>
                    </div>
                    <form>
                      <div className="row">
                        <div className="col-lg-12">
                          <FormItem>
                            <input
                              type="text"
                              name="email"
                              style={this.fieldStyle('email')}
                              placeholder="Email"
                              required
                              onChange={this.handleChange}
                            />
                          </FormItem>
                        </div>
                        <div className="col-lg-6">
                          <DevButton
                            title="Send Password Reset Code"
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
};

const mapStateToProps = state => {
  return {
    data: state,
  };
};

export default connect(
  mapStateToProps,
  { forgotPassword },
)(ForgotPassword);
