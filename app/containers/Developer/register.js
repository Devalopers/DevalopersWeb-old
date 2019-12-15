/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Messages } from 'primereact/messages';
import PrimereactStyle from '@bit/primefaces.primereact.internal.stylelinks';
import { register } from '../Redux/actions/Developer/actions';
import { AvatarWrapper } from '../../components/avatarwrapper';
import { DevContact } from '../../components/devcontact';
import BreadCrumb from '../../components/breadcrumb';
import DevButton from '../../components/devbutton';
import FormItem from '../../components/formitem';
import FormItemGenerator from './formitemgenerator';
import Loading from '../../components/Loading/Loading';
class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      userData: {
        username: '',
        email: '',
        password: '',
        confirmedPassword: '',
        phone: '',
        firstname: '',
        lastname: '',
        address: '',
        gender: '',
        education: {
          major: '',
          graduationDate: '',
          undergrad: true,
        },
        languages: [],
        githubProfile: '',
        seniorityLevel: '',
        yearsOfExperience: '',
        lookingFor: '',
        educationLevel: '',
        skills: ['Clean Code', 'Architecture', 'Android Development'],
      },
      currentStep: 1,
      loading: true,
    };
    this.mounted = false;
    this.returnToTopRef = null;
    this.validityRef = null;
    this.messages = null;
    this.handleChange = this.handleChange.bind(this);
    this.handleLanguageChange = this.handleLanguageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.next = this.next.bind(this);
  }

  componentDidMount() {
    this.mounted = true;
    this.setState({ loading: false });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  handleLanguageChange(e) {
    const { userData } = { ...this.state };
    const currentState = userData;
    currentState.languages = e;
    this.setState({
      userData: currentState,
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

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ loading: true });
    const { confirmedPassword, ...data } = this.state.userData;
    console.log(data);
    this.props.register(data).then(res => {
      if (!this.mounted) return null;
      if (res.payload.status === 'Successful') {
        return this.setState({
          redirect: true,
        });
      }
      return this.setState({ currentStep: 1, loading: false }, () => {
        this.showError(res.payload.status, res.payload.message);
      });
    });
  }

  handleChange(e) {
    const { userData } = { ...this.state };
    const currentState = userData;
    const { name, value } = e.target;
    if (Object.hasOwnProperty.call(userData.education, name))
      currentState.education[name] = value;
    else currentState[name] = value;
    this.setState({ userData: currentState });
  }

  previousButton() {
    const { currentStep } = this.state;
    if (currentStep !== 1) {
      return (
        <div style={{ textAlign: 'left' }}>
          <DevButton
            title="<"
            click={this.prev}
            class="dev-btn-nav btn-2 mt-15"
          />
        </div>
      );
    }
    return null;
  }

  nextButton() {
    const { currentStep } = this.state;
    if (currentStep < 3)
      return (
        <div style={{ textAlign: 'right' }}>
          <DevButton
            title=">"
            click={this.next}
            class="dev-btn-nav btn-2 mt-15"
          />
        </div>
      );
    return null;
  }

  next = () => {
    let { currentStep } = this.state;
    const { userData } = this.state;
    const inputValidity = this.validityRef.reportValidity();
    if (userData.password !== userData.confirmedPassword) {
      return this.showError('Failed', 'Passwords do not match');
    }
    if (inputValidity) {
      window.scrollTo(0, this.returnToTopRef.offsetTop);
      currentStep = currentStep >= 2 ? 3 : currentStep + 1;
      return this.setState({
        currentStep,
      });
    }
    return null;
  };

  prev = () => {
    let { currentStep } = this.state;
    currentStep = currentStep <= 1 ? 1 : currentStep - 1;
    window.scrollTo(0, this.returnToTopRef.offsetTop);
    this.setState({
      currentStep,
    });
  };

  render() {
    if (this.state.redirect) return <Redirect to="/developer/login" />;
    return (
      <React.Fragment>
        <Loading isLoading={this.state.Loading} />
        <BreadCrumb title="Register" items={['Developer', 'Register']} />
        <DevContact>
          <section className="dev-contact-area section-padding-80">
            <div className="container">
              <div className="row justify-content-between">
                <div className="col-12 col-lg-8">
                  <div className="dev-contact-form mb-80">
                    <div className="contact-heading mb-50">
                      <h4>
                        Welcome coder! <span className="fa fa-file-code-o" />
                        <br />
                        Please write your data in plain text
                        <span className="fa fa-smile-o" />
                      </h4>
                    </div>
                    <form
                      method="POST"
                      encType="multipart/form-data"
                      onSubmit={this.handleSubmit}
                      ref={ref => {
                        this.validityRef = ref;
                      }}
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
                        <Step1
                          currentStep={this.state.currentStep}
                          handleChange={this.handleChange}
                          userData={this.state.userData}
                        />
                        <Step2
                          currentStep={this.state.currentStep}
                          handleChange={this.handleChange}
                          userData={this.state.userData}
                          handleLanguageChange={this.handleLanguageChange}
                        />
                        <Step3
                          currentStep={this.state.currentStep}
                          handleChange={this.handleChange}
                          userData={this.state.userData}
                        />
                        <div className="col-6">{this.previousButton()}</div>
                        <div className="col-6">{this.nextButton()}</div>
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

function Step1(props) {
  if (props.currentStep !== 1) {
    return null;
  }
  return (
    <React.Fragment>
      <div className="col-12">
        <AvatarWrapper>
          <div className="avatar-wrapper">
            <img className="profile-pic" alt="" />
            <div className="upload-button">
              <i className="fa fa-arrow-circle-up" aria-hidden="true" />
            </div>
            <input
              className="file-upload"
              type="file"
              name="avatar"
              accept="image/*"
            />
          </div>
        </AvatarWrapper>
      </div>
      <div className="col-lg-6 mb-15">
        <FormItemGenerator
          name="firstname"
          value={props.userData.firstname}
          handler={props.handleChange}
          label
          options={{ required: true }}
        />
      </div>
      <div className="col-lg-6 mb-15">
        <FormItemGenerator
          name="lastname"
          value={props.userData.lastname}
          handler={props.handleChange}
          label
          options={{ required: true }}
        />
      </div>
      <div className="col-lg-6 mb-15">
        <FormItemGenerator
          name="email"
          value={props.userData.email}
          handler={props.handleChange}
          label
          options={{ required: true }}
        />
      </div>
      <div className="col-lg-6 mb-15">
        <FormItemGenerator
          name="username"
          value={props.userData.username}
          handler={props.handleChange}
          label
          options={{ required: true }}
        />
      </div>
      <div className="col-lg-6 mb-15">
        <FormItemGenerator
          name="password"
          value={props.userData.password}
          handler={props.handleChange}
          label
          options={{ required: true }}
        />
      </div>
      <div className="col-lg-6 mb-15">
        <FormItem>
          <label className="form-label" htmlFor="confirmedPassword">
            Confirm Password
          </label>
          <input
            className="mb-15"
            type="password"
            autoComplete="off"
            name="confirmedPassword"
            pattern="^(?=.*[a-z])(?=.*[0-9])(?=.*\W).*$"
            placeholder="password*"
            required
            value={props.userData.confirmedPassword}
            onChange={props.handleChange}
          />
        </FormItem>
      </div>
      <div className="col-lg-6 mb-15">
        <FormItemGenerator
          name="phone"
          value={props.userData.phone}
          handler={props.handleChange}
          label
          options={{ required: true }}
        />
      </div>
      <div className="col-lg-6 mb-15">
        <FormItemGenerator
          name="address"
          value={props.userData.address}
          handler={props.handleChange}
          label
          options={{ required: true }}
        />
      </div>
    </React.Fragment>
  );
}

function Step2(props) {
  if (props.currentStep !== 2) {
    return null;
  }
  return (
    <React.Fragment>
      <div className="col-12 mb-15">
        <FormItemGenerator
          name="gender"
          value={props.userData.gender}
          handler={props.handleChange}
          label
          options={{ required: true }}
        />
      </div>
      <div className="col-12 mb-30 mt-15">
        <FormItemGenerator
          name="languages"
          value={props.userData.languages}
          handler={props.handleLanguageChange}
          label
        />
      </div>
      <div className="col-lg-6 mb-15">
        <FormItemGenerator
          name="major"
          value={props.userData.education.major}
          handler={props.handleChange}
          label
          options={{ required: true }}
        />
      </div>
      <div className="col-lg-6 mb-15">
        <FormItemGenerator
          name="graduationDate"
          value={props.userData.education.graduationDate}
          handler={props.handleChange}
          label
          options={{ required: true }}
        />
      </div>
    </React.Fragment>
  );
}

function Step3(props) {
  if (props.currentStep !== 3) {
    return null;
  }
  return (
    <React.Fragment>
      <div className="col-lg-6 mb-15">
        <FormItemGenerator
          name="lookingFor"
          handler={props.handleChange}
          value={props.userData.lookingFor}
          options={{ required: true }}
          label
        />
      </div>
      <div className="col-lg-6 mb-15">
        <FormItemGenerator
          name="seniorityLevel"
          value={props.userData.seniorityLevel}
          handler={props.handleChange}
          label
          options={{ required: true }}
        />
      </div>
      <div className="col-lg-6 mb-15">
        <FormItemGenerator
          name="yearsOfExperience"
          value={props.userData.yearsOfExperience}
          handler={props.handleChange}
          label
          options={{ required: true }}
        />
      </div>
      <div className="col-lg-6 mb-15">
        <FormItemGenerator
          name="educationLevel"
          value={props.userData.educationLevel}
          handler={props.handleChange}
          label
          options={{ required: true }}
        />
      </div>
      <div className="col-12 mb-15">
        <FormItemGenerator
          name="githubProfile"
          value={props.userData.githubProfile}
          handler={props.handleChange}
          label
          options={{ required: true }}
        />
      </div>
      <div className="col-12">
        <div style={{ textAlign: 'right' }}>
          <DevButton title="Register" type="submit" class="btn-3 mt-15" />
        </div>
      </div>
    </React.Fragment>
  );
}

export default connect(
  null,
  { register },
)(Register);
