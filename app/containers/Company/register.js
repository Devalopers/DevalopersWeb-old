import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DevContact } from '../../components/devcontact';
import FlashHandle from '../../components/flash';
import BreadCrumb from '../../components/breadcrumb';
import DevButton from '../../components/devbutton';
import FormItem from '../../components/formitem';
import FieldDescriptor from '../../components/FieldDescriptor';
import validateEntry from './validate';
import Loading from '../../components/Loading/Loading';
import { register } from '../Redux/actions/Company/actions';

class Register extends Component {
  constructor() {
    super();
    this.submitInput = this.submitInput.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.shouldShowFieldCriteria = this.shouldShowFieldCriteria.bind(this);
    this.fieldStyle = this.fieldStyle.bind(this);
    this.fieldMessage = this.fieldMessage.bind(this);
  }

  state = {
    username: '',
    password: '',
    'confirm-password': '',
    phone: '',
    'company-name': '',
    email: '',
    'company-industry': '',
    'company-website': '',
    'company-size': 0,
    'company-description': '',
    submittedInvalidInput: false,
  };

  submitInput(event) {
    event.preventDefault();
    if (!this.isFormValid()) {
      this.setState({
        submittedInvalidInput: true,
      });
    } else {
      this.props.register({
        username: this.state.username,
        password: this.state.password,
        email: this.state.email,
        phone: this.state.phone,
        CompanyName: this.state['company-name'],
        CompanyIndustry: this.state['company-industry'],
        CompanyWebsite: this.state['company-website'],
        CompanySize: this.state['company-size'],
        CompanyDescription: this.state['company-description'],
      });
    }
  }

  isFormValid() {
    // eslint-disable-next-line no-restricted-syntax
    for (const fieldName of [
      'username',
      'password',
      'confirm-password',
      'phone',
      'company-name',
      'email',
      'company-industry',
      'company-website',
      'company-size',
      'company-description',
    ]) {
      if (!this.isFieldValid(fieldName)) {
        return false;
      }
    }
    return true;
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  isFieldValid(fieldName) {
    if (fieldName === 'confirm-password') {
      return this.state.password === this.state['confirm-password'];
    }
    return validateEntry(fieldName, this.state[fieldName]).isValid;
  }

  shouldShowFieldCriteria(fieldName) {
    return !this.isFieldValid(fieldName) && this.state.submittedInvalidInput;
  }

  fieldStyle(fieldName) {
    return !this.isFieldValid(fieldName) && this.state.submittedInvalidInput
      ? { borderColor: 'red' }
      : {};
  }

  errorMessageColor() {
    return this.props.data.company.operation.didLastOperationSucceed ? 'green' : 'red';
  }

  fieldMessage(fieldName) {
    return validateEntry(fieldName, this.state[fieldName]).criteria;
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
        <BreadCrumb title="Register" items={['Company', 'Register']} />
        <FlashHandle visible="true" status="ens" message="ens" />
        <DevContact>
          <section className="dev-contact-area section-padding-80">
            <div className="container">
              <div className="row justify-content-between">
                <div className="col-12 col-lg-8">
                  <div className="dev-contact-form mb-80">
                    <div className="contact-heading mb-50">
                      <h4>
                        Welcome ! <span className="fa fa-registered" /> <br />
                        Please write your data in plain text.
                      </h4>
                    </div>
                    <form>
                      <div className="row">
                        <div className="col-lg-6">
                          <FieldDescriptor
                            mainMessage="Username"
                            sideMessage={this.fieldMessage('username')}
                            showSideMessage={this.shouldShowFieldCriteria(
                              'username',
                            )}
                          />
                          <FormItem>
                            <input
                              type="text"
                              name="username"
                              style={this.fieldStyle('username')}
                              placeholder="Username"
                              required
                              onChange={this.handleChange}
                            />
                          </FormItem>
                        </div>
                        <div className="col-lg-6">
                          <FieldDescriptor
                            mainMessage="Email"
                            sideMessage={this.fieldMessage('email')}
                            showSideMessage={this.shouldShowFieldCriteria(
                              'email',
                            )}
                          />
                          <FormItem>
                            <input
                              type="email"
                              name="email"
                              style={this.fieldStyle('email')}
                              placeholder="Email"
                              required
                              onChange={this.handleChange}
                            />
                          </FormItem>
                        </div>
                        <div className="col-lg-6">
                          <FieldDescriptor
                            mainMessage="Company Name"
                            sideMessage={this.fieldMessage('company-name')}
                            showSideMessage={this.shouldShowFieldCriteria(
                              'company-name',
                            )}
                          />
                          <FormItem>
                            <input
                              type="text"
                              name="company-name"
                              style={this.fieldStyle('company-name')}
                              placeholder="Company Name"
                              required
                              onChange={this.handleChange}
                            />
                          </FormItem>
                        </div>
                        <div className="col-lg-6">
                          <FieldDescriptor
                            mainMessage="Phone"
                            sideMessage={this.fieldMessage('phone')}
                            showSideMessage={this.shouldShowFieldCriteria(
                              'phone',
                            )}
                          />
                          <FormItem>
                            <input
                              type="phone"
                              name="phone"
                              style={this.fieldStyle('phone')}
                              placeholder="Phone"
                              required
                              onChange={this.handleChange}
                            />
                          </FormItem>
                        </div>
                        <div className="col-lg-12">
                          <FieldDescriptor
                            mainMessage="Password"
                            sideMessage={this.fieldMessage('password')}
                            showSideMessage={this.shouldShowFieldCriteria(
                              'password',
                            )}
                          />
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
                        <div className="col-lg-12">
                          <FieldDescriptor
                            mainMessage="Confirm Password"
                            sideMessage="password does not match"
                            showSideMessage={this.shouldShowFieldCriteria(
                              'confirm-password',
                            )}
                          />
                          <FormItem>
                            <input
                              type="password"
                              name="confirm-password"
                              style={this.fieldStyle('confirm-password')}
                              placeholder="Password"
                              required
                              onChange={this.handleChange}
                            />
                          </FormItem>
                        </div>
                        <div className="col-lg-12">
                          <FieldDescriptor
                            mainMessage="Company Industry"
                            sideMessage={this.fieldMessage('company-industry')}
                            showSideMessage={this.shouldShowFieldCriteria(
                              'company-industry',
                            )}
                          />
                          <FormItem>
                            <input
                              type="text"
                              name="company-industry"
                              placeholder="Company Industry"
                              style={this.fieldStyle('company-industry')}
                              required
                              onChange={this.handleChange}
                            />
                          </FormItem>
                        </div>
                        <div className="col-lg-12">
                          <FieldDescriptor
                            mainMessage="Company Website"
                            sideMessage={this.fieldMessage('company-website')}
                            showSideMessage={this.shouldShowFieldCriteria(
                              'company-website',
                            )}
                          />
                          <FormItem>
                            <input
                              type="text"
                              name="company-website"
                              style={this.fieldStyle('company-website')}
                              placeholder="Company Website"
                              required
                              onChange={this.handleChange}
                            />
                          </FormItem>
                        </div>
                        <div className="col-lg-12">
                          <FieldDescriptor
                            mainMessage="Company Size"
                            sideMessage={this.fieldMessage('company-size')}
                            showSideMessage={this.shouldShowFieldCriteria(
                              'company-size',
                            )}
                          />
                          <FormItem>
                            <input
                              type="number"
                              name="company-size"
                              style={this.fieldStyle('company-size')}
                              placeholder="Company Size (number of employees)"
                              onChange={this.handleChange}
                              required
                            />
                          </FormItem>
                        </div>
                        <div className="col-lg-12">
                          <FieldDescriptor
                            mainMessage="Company Description"
                            sideMessage={this.fieldMessage(
                              'company-description',
                            )}
                            showSideMessage={this.shouldShowFieldCriteria(
                              'company-description',
                            )}
                          />
                          <FormItem>
                            <textarea
                              type="text"
                              name="company-description"
                              style={this.fieldStyle('company-description')}
                              placeholder="Company Description"
                              onChange={this.handleChange}
                              required
                            />
                          </FormItem>
                        </div>
                        <div className="col-12">
                          <DevButton
                            title="Register"
                            alignment="right"
                            disabled={this.state.lockForm}
                            class="btn dev-btn btn-3 mt-15"
                            click={this.submitInput}
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
  { register },
)(Register);
