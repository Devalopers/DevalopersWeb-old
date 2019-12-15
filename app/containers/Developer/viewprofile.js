/* eslint-disable react/prop-types */
import React from 'react';
import axios from 'axios';
import { Messages } from 'primereact/messages';
import PrimereactStyle from '@bit/primefaces.primereact.internal.stylelinks';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import { BASE_URL } from '../../config/config';
import BreadCrumb from '../../components/breadcrumb';
import { DevContact } from '../../components/devcontact';
import { AvatarWrapper } from '../../components/avatarwrapper';
import Button from '../../components/devbutton';
import FormItemGenerator from './formitemgenerator';
import Loading from '../../components/Loading/Loading';

function update(obj, obj2) {
  Object.keys(obj2).forEach(prop => {
    const val = obj2[prop];
    if (typeof val === 'object') update(obj[prop], val);
    // eslint-disable-next-line no-param-reassign
    else obj[prop] = val;
  });
  return obj;
}

class ViewProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {},
      updateData: {},
      editMode: false,
      isVerifiedJWT: false,
      loading: true,
    };

    this.returnToTopRef = null;
    this.messages = null;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleViewMode = this.toggleViewMode.bind(this);
    this.toggleEditMode = this.toggleEditMode.bind(this);
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

  getLocalStorageData() {
    const { data } = localStorage;
    if (data) return JSON.parse(data);
    return null;
  }

  componentWillMount() {
    const local = this.getLocalStorageData();
    axios
      .get(`${BASE_URL}/developer/viewProfile`, {
        headers: {
          Authorization: `Bearer ${local && local.token ? local.token : ''}`,
        },
      })
      .then(res => {
        if (res.status === 403) {
          localStorage.removeItem('data');
          this.setState({ isVerifiedJWT: false, loading: false });
        } else {
          const { data } = res.data;
          data.password = '';
          this.setState({
            isVerifiedJWT: true,
            loading: false,
            userData: data,
          });
        }
      })
      .catch(() => {
        localStorage.removeItem('data');
        this.setState({ isVerifiedJWT: false, loading: false });
      });
  }

  toggleViewMode = () => {
    this.setState({
      editMode: false,
      updateData: {},
    });
  };

  toggleEditMode = () => {
    this.setState({
      editMode: true,
    });
  };

  handleChange = e => {
    const { updateData, userData } = { ...this.state };
    const currentState = updateData;
    const { name, value } = e.target;
    if (Object.hasOwnProperty.call(userData.education, name)) {
      const educationObject = updateData.education
        ? updateData.education
        : JSON.parse(JSON.stringify(userData.education));
      educationObject[name] = value;
      this.setState(prevState => ({
        updateData: {
          ...prevState.updateData,
          education: educationObject,
        },
      }));
    } else {
      currentState[name] = value;
      this.setState({ updateData: currentState });
    }
  };

  handleLanguageChange = e => {
    const { updateData } = this.state;
    const currentState = updateData;
    currentState.languages = e;
    this.setState({
      updateData: currentState,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state.updateData);
    const local = this.getLocalStorageData();
    axios
      .post(`${BASE_URL}/developer/edit`, this.state.updateData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${local && local.token ? local.token : ''}`,
        },
      })
      .then(res => {
        if (res.status === 403) {
          localStorage.removeItem('data');
          return this.setState({ isVerifiedJWT: false, loading: false });
        }
        if (res.status === 200) {
          this.showSuccess(res.data.status, res.data.message);
          let { userData } = this.state;
          const { updateData } = this.state;
          userData = update(userData, updateData);
          return this.setState({
            editMode: false,
            updateData: {},
            userData,
          });
        }
        this.showError(res.data.status, res.data.message);
        return this.setState({
          updateData: {},
        });
      })
      .catch(error => {
        this.showError(error.response.data.status, error.response.data.message);
        return this.setState({
          updateData: {},
        });
      });
  };

  render() {
    if (this.state.loading) return <Loading isLoading />;
    if (!this.state.isVerifiedJWT && !this.state.loading)
      return <Redirect to="/developer/login" />;
    return (
      <React.Fragment>
        <BreadCrumb title="Profile" items={['Developer', 'Profile']} />
        <DevContact>
          <section className="dev-contact-area section-padding-80">
            <div className="container">
              <div className="row justify-content-between">
                <div className="col-12 col-lg-8">
                  <div className="dev-contact-form mb-80">
                    <form method="POST" onSubmit={this.handleSubmit}>
                      <ViewProfileStyleWrapper>
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
                          <View
                            userData={this.state.userData}
                            handleChange={this.handleChange}
                            updateData={this.state.updateData}
                            editMode={this.state.editMode}
                            handleLanguageChange={this.handleLanguageChange}
                          />
                          {this.state.editMode ? (
                            <div className="col-12 mt-30">
                              <div className="align-confirmation-btn">
                                <Button
                                  title="Cancel"
                                  class="resize-sm-btn btn-3"
                                  click={this.toggleViewMode}
                                />
                                <Button
                                  title="Save"
                                  class="resize-sm-btn btn-3"
                                  type="submit"
                                />
                              </div>
                            </div>
                          ) : (
                            <div className="col-12 mt-30">
                              <div style={{ textAlign: 'right' }}>
                                <Button
                                  title="Edit"
                                  class="dev-btn-nav btn-2"
                                  click={this.toggleEditMode}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </ViewProfileStyleWrapper>
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

function Underline() {
  const UnderlineStyleWrapper = styled.div`
    width: 100%;
    border-style: solid;
    border-width: 0.5px;
    border-color: gainsboro;
    margin-bottom: 15px;
  `;

  return (
    <UnderlineStyleWrapper>
      <div> </div>
    </UnderlineStyleWrapper>
  );
}

function View(props) {
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
      <div className="col-12 mt-30 mb-10">
        <h2>Basic Information</h2>
      </div>
      <Underline />
      <div className="col-lg-6 col-md-6 mb-15">
        <h3> First Name</h3>
        {!props.editMode ? (
          <h4>{props.userData.firstname}</h4>
        ) : (
          <FormItemGenerator
            name="firstname"
            value={
              props.updateData.firstname === undefined
                ? props.userData.firstname
                : props.updateData.firstname
            }
            handler={props.handleChange}
          />
        )}
      </div>
      <div className="col-lg-6 col-md-6 mb-15">
        <h3> Last Name</h3>
        {!props.editMode ? (
          <h4>{props.userData.lastname}</h4>
        ) : (
          <FormItemGenerator
            name="lastname"
            value={
              props.updateData.lastname === undefined
                ? props.userData.lastname
                : props.updateData.lastname
            }
            handler={props.handleChange}
          />
        )}
      </div>
      <div className="col-lg-6 col-md-6 mb-15">
        <h3>Username</h3>
        {!props.editMode ? (
          <h4>{props.userData.username}</h4>
        ) : (
          <FormItemGenerator
            name="username"
            value={props.updateData.username}
            options={{ disabled: true }}
            handler={props.handleChange}
          />
        )}
      </div>
      <div className="col-lg-6 col-md-6 mb-15">
        <h3> Email</h3>
        {!props.editMode ? (
          <h4>{props.userData.email}</h4>
        ) : (
          <FormItemGenerator
            name="email"
            value={
              props.updateData.email === undefined
                ? props.userData.email
                : props.updateData.email
            }
            handler={props.handleChange}
          />
        )}
      </div>
      {props.editMode && (
        <div className="col-12 mb-15">
          <h3> Password</h3>
          <FormItemGenerator
            name="password"
            value={
              props.updateData.password === undefined
                ? props.userData.password
                : props.updateData.password
            }
            handler={props.handleChange}
          />
        </div>
      )}

      <div className="col-lg-6 col-md-6 mb-15">
        <h3>Phone</h3>
        {!props.editMode ? (
          <h4>{props.userData.phone}</h4>
        ) : (
          <FormItemGenerator
            name="phone"
            value={
              props.updateData.phone === undefined
                ? props.userData.phone
                : props.updateData.phone
            }
            handler={props.handleChange}
          />
        )}
      </div>
      <div className="col-lg-6 col-md-6 mb-15">
        <h3> Address</h3>
        {!props.editMode ? (
          <h4>{props.userData.address}</h4>
        ) : (
          <FormItemGenerator
            name="address"
            value={
              props.updateData.address === undefined
                ? props.userData.address
                : props.updateData.address
            }
            handler={props.handleChange}
          />
        )}
      </div>
      <div className="col-12 mb-15">
        <h3>Gender</h3>
        {!props.editMode ? (
          <h4>{props.userData.gender}</h4>
        ) : (
          <FormItemGenerator
            name="gender"
            value={
              props.updateData.gender === undefined
                ? props.userData.gender
                : props.updateData.gender
            }
            handler={props.handleChange}
          />
        )}
      </div>
      <div className="col-12 mt-30 mb-10">
        <h2>Education</h2>
      </div>
      <Underline />
      <div className="col-lg-6 col-md-6 mb-15">
        <h3>Major</h3>
        {!props.editMode ? (
          <h4>{props.userData.education.major}</h4>
        ) : (
          <FormItemGenerator
            name="major"
            value={
              props.updateData.education !== undefined &&
              props.updateData.education.major !== undefined
                ? props.updateData.education.major
                : props.userData.education.major
            }
            handler={props.handleChange}
          />
        )}
      </div>
      <div className="col-lg-6 col-md-6 mb-15">
        <h3>Graduation Date</h3>
        {!props.editMode ? (
          <h4>{props.userData.education.graduationDate}</h4>
        ) : (
          <FormItemGenerator
            name="graduationDate"
            value={
              props.updateData.education !== undefined &&
              props.updateData.education.graduationDate !== undefined
                ? props.updateData.education.graduationDate
                : props.userData.education.graduationDate
            }
            handler={props.handleChange}
          />
        )}
      </div>
      <div className="col-lg-12 mb-15">
        <h3>Languages</h3>
        {!props.editMode ? (
          <ul>
            {props.userData.languages.map(obj => (
              <li key={obj.name.length + Math.random()}>{`${obj.name}: ${
                obj.level
              }`}</li>
            ))}
          </ul>
        ) : (
          <FormItemGenerator
            name="languages"
            value={
              props.updateData.languages === undefined
                ? props.userData.languages
                : props.updateData.languages
            }
            handler={props.handleLanguageChange}
          />
        )}
      </div>
      <div className="col-12 mt-30 mb-10">
        <h2>Qualifications</h2>
      </div>
      <Underline />
      <div className="col-lg-6 col-md-6 mb-15">
        <h3>Seniority Level</h3>
        {!props.editMode ? (
          <h4>{props.userData.seniorityLevel}</h4>
        ) : (
          <FormItemGenerator
            name="seniorityLevel"
            value={
              props.updateData.seniorityLevel === undefined
                ? props.userData.seniorityLevel
                : props.updateData.seniorityLevel
            }
            handler={props.handleChange}
            options={{ required: true }}
          />
        )}
      </div>
      <div className="col-lg-6 col-md-6 mb-15">
        <h3>Years Of Experience</h3>
        {!props.editMode ? (
          <h4>{props.userData.yearsOfExperience}</h4>
        ) : (
          <FormItemGenerator
            name="yearsOfExperience"
            value={
              props.updateData.yearsOfExperience === undefined
                ? props.userData.yearsOfExperience
                : props.updateData.yearsOfExperience
            }
            handler={props.handleChange}
            options={{ required: true }}
          />
        )}
      </div>
      <div className="col-lg-6 col-md-6 mb-15">
        <h3>Education Level</h3>
        {!props.editMode ? (
          <h4>{props.userData.educationLevel}</h4>
        ) : (
          <FormItemGenerator
            name="educationLevel"
            value={
              props.updateData.educationLevel === undefined
                ? props.userData.educationLevel
                : props.updateData.educationLevel
            }
            handler={props.handleChange}
            options={{ required: true }}
          />
        )}
      </div>
      <div className="col-lg-6 col-md-6 mb-15">
        <h3>Looking For</h3>
        {!props.editMode ? (
          <h4>{props.userData.lookingFor}</h4>
        ) : (
          <FormItemGenerator
            name="lookingFor"
            value={
              props.updateData.lookingFor === undefined
                ? props.userData.lookingFor
                : props.updateData.lookingFor
            }
            handler={props.handleChange}
            options={{ required: true }}
          />
        )}
      </div>
    </React.Fragment>
  );
}

const ViewProfileStyleWrapper = styled.div`
  h2 {
    font-size: 1.4em;
  }
  h3 {
    font-size: 1.2em;
    color: #585858;
    margin: 1em 0 0.5em 0;
    font-weight: normal;
    margin-left: 10px;
  }

  h4 {
    font-size: 1.1em;
    margin-left: 10px;
  }
  ul li {
    margin-left: -10px;
  }
  .align-confirmation-btn {
    display: flex;
    justify-content: flex-end;
    flex-direction: row;
    button:not(last-child) {
      margin-right: 20px;
    }

    @media only screen and (max-width: 576px) {
      justify-content: center;
      flex-direction: row;
      button:not(last-child) {
        margin-right: 10px;
      }
    }
  }
`;

export default ViewProfile;
