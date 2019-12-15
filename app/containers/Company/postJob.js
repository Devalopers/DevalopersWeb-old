import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import BreadCrumb from '../../components/breadcrumb';
import DevButton from '../../components/devbutton';
import FormItem from '../../components/formitem';
import DropDown from '../../components/Dropdown/DropDown';
import { FlashHandle } from '../../components/flash';
import { BASE_URL } from '../../config/config';
import SkillSelect from '../../components/AutoCompleteSkill/AutoCompleteSkill';

class PostJob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      JobTitle: '',
      JobDescription: '',
      ThreeSkills: [],
      SeniorityLevel: '',
      YearsofExperience: '',
      EducationLevel: '',
      EmploymentTime: '',
      WeeklyWorkingHours: '',
      MonthlySalary: '0-1000',
      ClientInteraction: false,
      Presentation: false,
      JobLocation: '',
      Country: '',
      Traveling: false,
      Onboarding: '',
      Email: '',
      Q1: '',
      Q2: '',
      Q3: '',
      statusIsVisible: false,
      apiStatus: false,
      apiMessage: '',
      data: this.getLocalStorageData(),
      token: '',
      isVerifiedJWT: false,
    };
    this.state.token = this.state.data ? this.state.data.token : null; // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhbGphaC5hd2FkQG91dGxvb2suY29tIiwidXNlcm5hbWUiOiJzYW1pc2hzaCIsImlkIjoiNWQ4NzIzYzE0YWYyODYwMDIzOGQ0YjYxIiwiZXhwIjoxNTc0MzIxNzI3LCJpYXQiOjE1NjkxMzc3Mjd9.9CG4LP0bX31npJ84I48t7uY3fw2ee_PijFuh0ooTAMI';
    this.verifyJWT(`${BASE_URL}/company/post/job`, this.state.token);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
    this.handleUnSelection = this.handleUnSelection.bind(this);
  }

  getLocalStorageData() {
    const { data } = localStorage;
    if (data) {
      try {
        return JSON.parse(data);
      } catch (e) {
        return null;
      }
    }
  }

  verifyJWT(url, token) {
    return axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`, // the token is a variable which holds the token
        },
      })
      .then(res => {
        if (res.status == 403) {
          localStorage.removeItem('data');
          this.setState({ isVerifiedJWT: false, loading: false });
          return false;
        }
        this.setState({ isVerifiedJWT: true, loading: false });
        return res.data;
      })
      .catch(err => {
        console.log(err);
        localStorage.removeItem('data');
        this.setState({ isVerifiedJWT: false, loading: false });
        return false;
      });
  }

  handleSelection(e) {
    this.state.ThreeSkills.push(e.value.name);
  }

  handleUnSelection(e) {
    const x = this.state.ThreeSkills;
    x.splice(x.indexOf(e.value.name), 1);
  }

  onSelect(e) {
    const x = { [e.name]: e.value };
    if (x.value === 'Yes' || x.value === 'No') {
      x.value = x.value === 'Yes';
    }
    this.setState(x);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return false;
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
    axios
      .post(
        `${BASE_URL}/company/jobPosts/createJob`,
        {
          JobTitle: this.state.JobTitle,
          JobDescription: this.state.JobDescription,
          SeniorityLevel: this.state.SeniorityLevel,
          YearsofExperience: this.state.YearsofExperience,
          EducationLevel: this.state.EducationLevel,
          EmploymentTime: this.state.EmploymentTime,
          WeeklyWorkingHours: this.state.WeeklyWorkingHours,
          MonthlySalary: this.state.MonthlySalary,
          ClientInteraction: this.state.ClientInteraction,
          Presentation: this.state.Presentation,
          JobLocation: this.state.JobLocation,
          Country: this.state.Country,
          Traveling: this.state.Traveling,
          Onboarding: this.state.Onboarding,
          Email: this.state.Email,
          CompanyIndustry: 'sami',
          CompanyWebsite: 'www.fff.com',
        },
        {
          headers: {
            Authorization: `Bearer ${this.state.token}`,
          },
        },
      )
      .then(res => {
        this.setState(
          {
            statusIsVisible: true,
            apiStatus: true,
            apiMessage: res.data.message,
          },
          axios
            .post(
              `${BASE_URL}/company/jobPosts/addQuestion`,
              {
                jobTitle: this.state.jobTitle,
                questions: [this.state.Q1, this.state.Q2, this.state.Q3],
              },
              {
                headers: {
                  Authorization: `Bearer ${this.state.token}`,
                },
              },
            )
            .then(
              res2 => {},
              () => {
                this.forceUpdate();
              },
            ),
        );
      })
      .catch(err => {
        if (!err.response) return 'unhandled error';
        const res = err.response;
        this.setState(
          {
            statusIsVisible: true,
            apiStatus: false,
            apiMessage: res.data.message || res.data,
          },
          () => {
            alert(res.data.message || res.data);
          },
        );
      });
  }

  validateForm() {
    if (
      this.state.JobTitle.length === 0 ||
      this.state.JobDescription.length === 0 ||
      // this.state.ThreeSkills.length === 0 ||
      this.state.SeniorityLevel.length === 0 ||
      this.state.YearsofExperience.length === 0 ||
      this.state.EducationLevel.length === 0 ||
      this.state.EmploymentTime.length === 0 ||
      this.state.WeeklyWorkingHours.length === 0 ||
      this.state.MonthlySalary.length === 0 ||
      this.state.ClientInteraction.length === 0 ||
      this.state.Presentation.length === 0 ||
      this.state.JobLocation.length === 0 ||
      this.state.Country.length === 0 ||
      this.state.Traveling.length === 0 ||
      this.state.Onboarding.length === 0 ||
      this.state.Email.length === 0
    ) {
      return false;
    }
    return true;
  }

  render() {
    return (
      <div>
        {!this.state.isVerifiedJWT ? <Redirect to="/company/login" /> : null}
        <BreadCrumb title="Post Job" items={['Company', 'Post', 'Job']} />
        <DevContact>
          <FlashHandle
            visible={this.state.statusIsVisible}
            status={this.state.apiStatus}
            message={this.state.apiMessage}
          />
          <form>
            <div className="row">
              <div className="col-lg-12">
                <FormItem>
                  <div className="form-label">Job Title</div>
                  <input
                    type="text"
                    name="JobTitle"
                    placeholder="Job Title *" // { this.state.JobTitle ? this.state.JobTitle :"Job Title *"}
                    onChange={this.handleChange}
                    required
                  />
                </FormItem>
              </div>
              <div className="col-lg-12">
                <FormItem>
                  <div className="form-label">Email</div>
                  <input
                    type="text"
                    name="Email"
                    placeholder="Email *"
                    onChange={this.handleChange}
                    required
                  />
                </FormItem>
              </div>
              <div className="col-lg-12">
                <FormItem>
                  <div className="form-label">Job Description</div>
                  <textarea
                    className="mb-30"
                    name="JobDescription"
                    rows={8}
                    cols={80}
                    placeholder="Job Description"
                    defaultValue=""
                    onChange={this.handleChange}
                  />
                </FormItem>
              </div>
              <div className=" col-lg-12 section-title">Educational</div>
              <div className="col-lg-12">
                <FormItem>
                  <div className="form-label">Three Skills</div>
                </FormItem>
                <SkillSelect
                  onSelect={this.handleSelection}
                  onUnSelect={this.handleUnSelection}
                />
              </div>
              <div className="col-lg-6">
                <FormItem>
                  <div className="form-label">Seniority Level</div>
                  <DropDown
                    options={[
                      'entry level',
                      'junior level',
                      'mid-senior level',
                      'executive level',
                    ]}
                    onSelect={this.onSelect}
                    placeholder={
                      this.state.SeniorityLevel
                        ? this.state.SeniorityLevel
                        : 'Seniority Level'
                    }
                    name="SeniorityLevel"
                  />
                </FormItem>
              </div>
              <div className="col-lg-6">
                <FormItem>
                  <div className="form-label">Education Level</div>
                  <DropDown
                    options={[
                      'n/a',
                      'high school degree',
                      'bachelors degree',
                      'masters degree',
                      'doctoral degree',
                    ]}
                    onSelect={this.onSelect}
                    placeholder={
                      this.state.EducationLevel
                        ? this.state.EducationLevel
                        : 'Education Level'
                    }
                    name="EducationLevel"
                  />
                </FormItem>
              </div>
              <div className="col-lg-6">
                <FormItem>
                  <div className="form-label">Years of Experience</div>
                  <DropDown
                    options={['0-2', '2-5', '5-10', '10-15', '15+']}
                    onSelect={this.onSelect}
                    placeholder={
                      this.state.YearsofExperience
                        ? this.state.YearsofExperience
                        : 'Years of Experience'
                    }
                    name="YearsofExperience"
                  />
                </FormItem>
              </div>
              <div className=" col-lg-12 section-title">Working Details</div>
              <div className="col-lg-6">
                <FormItem>
                  <div className="form-label">Monthly Salary</div>
                  <DropDown
                    options={[
                      '0-1000',
                      '1000-2000',
                      '2000-3000',
                      '3000-5000',
                      '5000-10000',
                      '10000+',
                    ]}
                    onSelect={this.onSelect}
                    placeholder={
                      this.state.MonthlySalary
                        ? this.state.MonthlySalary
                        : 'Monthly Salary'
                    }
                    name="MonthlySalary"
                  />
                </FormItem>
              </div>
              <div className="col-lg-6">
                <FormItem>
                  <div className="form-label">Employment Time</div>
                  <DropDown
                    options={['full time job', 'part time job', 'projects']}
                    onSelect={this.onSelect}
                    placeholder={
                      this.state.EmploymentTime
                        ? this.state.EmploymentTime
                        : 'Employment Time'
                    }
                    name="EmploymentTime"
                  />
                </FormItem>
              </div>
              <div className="col-lg-6">
                <FormItem>
                  <div className="form-label">Weekly Working Hours</div>
                  <input
                    type="text"
                    name="WeeklyWorkingHours"
                    placeholder="Weekly Working Hours"
                    onChange={this.handleChange}
                    required
                  />
                </FormItem>
              </div>
              <div className="col-lg-6">
                <FormItem>
                  <div className="form-label">Job Location</div>
                  <input
                    type="text"
                    name="JobLocation"
                    placeholder="JobLocation"
                    onChange={this.handleChange}
                    required
                  />
                </FormItem>
              </div>
              <div className=" col-lg-12 section-title">General</div>
              <div className="col-lg-6">
                <FormItem>
                  <div className="form-label">Country</div>
                  <input
                    type="text"
                    name="Country"
                    placeholder="Country"
                    onChange={this.handleChange}
                    required
                  />
                </FormItem>
              </div>
              <div className="col-lg-6">
                <FormItem>
                  <div className="form-label">Client Interaction</div>
                  <DropDown
                    options={['Yes', 'No']}
                    onSelect={this.onSelect}
                    placeholder={
                      this.state.ClientInteraction
                        ? this.state.ClientInteraction
                        : 'Client Interaction'
                    }
                    name="ClientInteraction"
                  />
                </FormItem>
              </div>
              <div className="col-lg-6">
                <FormItem>
                  <div className="form-label">Presentation</div>
                  <DropDown
                    options={['Yes', 'No']}
                    onSelect={this.onSelect}
                    placeholder={
                      this.state.Presentation !== ''
                        ? this.state.Presentation
                        : 'Presentation'
                    }
                    name="Presentation"
                  />
                </FormItem>
              </div>
              <div className="col-lg-6">
                <FormItem>
                  <div className="form-label">Traveling</div>
                  <DropDown
                    options={['Yes', 'No']}
                    onSelect={this.onSelect}
                    placeholder={
                      this.state.Traveling !== ''
                        ? this.state.Traveling
                        : 'Traveling'
                    }
                    name="Traveling"
                  />
                </FormItem>
              </div>
              <div className="col-lg-12">
                <FormItem>
                  <div className="form-label">Onboarding</div>
                  <textarea
                    className="mb-30"
                    name="Onboarding"
                    rows={2}
                    cols={20}
                    placeholder="Onboarding"
                    onChange={this.handleChange}
                    defaultValue=""
                  />
                </FormItem>
              </div>
              <div className=" col-lg-12 section-title">Questions</div>
              <div className="col-lg-12">
                <FormItem>
                  <div className="form-label">Question 1</div>
                  <textarea
                    className="mb-20"
                    name="Q1"
                    rows={2}
                    cols={20}
                    placeholder="Question 1"
                    onChange={this.handleChange}
                    defaultValue=""
                  />
                </FormItem>
                <FormItem>
                  <div className="form-label">Question 2</div>
                  <textarea
                    className="mb-20"
                    name="Q2"
                    rows={2}
                    cols={20}
                    placeholder="Question 2"
                    onChange={this.handleChange}
                    defaultValue=""
                  />
                </FormItem>
                <FormItem>
                  <div className="form-label">Question 3</div>
                  <textarea
                    className="mb-20"
                    name="Q3"
                    rows={2}
                    cols={20}
                    placeholder="Question 3"
                    onChange={this.handleChange}
                    defaultValue=""
                  />
                </FormItem>
              </div>

              <div className="col-12">
                <DevButton
                  title="Submit"
                  type="Submit"
                  class="btn-3 mt-15"
                  click={this.handleClick}
                />
              </div>
            </div>
          </form>
        </DevContact>
      </div>
    );
  }
}

DevContact.propTypes = {
  children: PropTypes.node,
};

export function DevContact(props) {
  const DevContactStyleWrapper = styled.div`
    .section-title {
      font-size: 40px;
      color: #1583e9;
      margin-left: -10%;
    }
    .section-padding-80 {
      padding-top: 80px;
      padding-bottom: 80px;
    }

    .dev-contact-area {
      position: relative;
      z-index: 1;
    }

    .dev-contact-area .google-maps {
      position: relative;
      z-index: 1;
      width: 100%;
      height: 500px;
    }

    @media only screen and (max-width: 767px) {
      .dev-contact-area .google-maps {
        height: 280px;
      }
      .section-title {
        font-size: 20px;
        color: #1583e9;
        margin-left: -2%;
      }
    }
    .dev-contact-area .google-maps iframe {
      width: 100%;
      height: 100%;
      border: none;
    }
    .dev-contact-form {
      position: relative;
      z-index: 1;
    }
  `;

  return (
    <DevContactStyleWrapper>
      <section className="dev-contact-area section-padding-80">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-12 col-lg-8">
              <div className="dev-contact-form mb-80">{props.children}</div>
            </div>
          </div>
        </div>
      </section>
    </DevContactStyleWrapper>
  );
}
export default PostJob;
