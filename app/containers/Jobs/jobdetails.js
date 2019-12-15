import React from 'react';
import styled from 'styled-components';
import BreadCrumb from '../../components/breadcrumb';
import Apply from '../../components/apply';
const jobSpacedAttributes = {
  isRemote: 'Remote',
  SeniorityLevel: 'Seniority Level',
  YearsOfExperience: 'Years Of Experience',
  EducationLevel: 'Education Level',
  EmploymentTime: 'Employment Time',
  WeeklyWorkingHours: 'Weekly Wroking Hours',
  MonthlySalary: 'Monthly Salary',
  ClientInteraction: 'Client Interaction',
  JobLocation: 'Job Location',
};

const jobFullSizeAttributes = [
  'JobTitle',
  'CompanyName',
  'CompanyWebsite',
  'Skills',
  'JobDescription',
  'Email',
];

export default class JobDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      job: {},
    };
  }

  componentDidMount() {
    const data = {
      CompanyName: 'libro',
      JobTitle: 'IOS Engineer',
      JobDescription:
        'or E-commerce company in Tripoli, Lebanon (Top urgent) We are looking for a full stack developer to produce software solutions (Web and Mobile App, Android and IOS). You’ll be responsible for the full software development life cycle, from conception to deployment. you should be comfortable around both front-end and back-end coding languages, development frameworks and third-party libraries. Two roles available, one permanent, and one temporary (project) ',
      CompanyWebsite: 'https://clubesthetic.com',
      SeniorityLevel: 'Entry Level',
      YearsOfExperience: '0-2',
      EducationLevel: 'Bachelor Degree',
      EmploymentTime: 'Full Time',
      JobLocation: 'Beirut',
      Presentation: 'Well Presented',
    };
    this.setState({
      job: data,
    });
  }

  render() {
    return (
      <React.Fragment>
        <BreadCrumb title="Jobs" items={['Jobs', 'Job Details']} />
        <JobDetailsStyleWrapper>
          <div className="wrapper container mt-50">
            <div className="row justify-content-center mb-30">
              <h1 className="post-title">{this.state.job.CompanyName}</h1>
            </div>
            <div className="row justify-content-between">
              <div className="col-lg-12 mb-30">
                <h2 className="post-heading mb-30">Job:</h2>
                <h4>{this.state.job.JobTitle}</h4>
              </div>
              {this.state.job.JobDescription && (
                <div className="col-lg-12 mb-30">
                  <h2 className="post-heading mb-30">Description:</h2>
                  <p>{this.state.job.JobDescription}</p>
                </div>
              )}

              {this.state.job.Skills && (
                <div className="col-lg-12 mb-30">
                  <h2 className="post-heading mb-30">Skills:</h2>
                  <p>{this.state.job.Skills}</p>
                </div>
              )}
              <div className="col-lg-12 mb-30">
                <h2 className="post-heading">Qualifications:</h2>
              </div>
              {Object.keys(this.state.job)
                .filter(key => !jobFullSizeAttributes.includes(key))
                .map(key => (
                  <div key={key} className="col-lg-6 mb-30">
                    <b>{jobSpacedAttributes[key] || key}: </b>
                    {this.state.job[key]}
                  </div>
                ))}

              <div className="col-lg-12 mt-30 mb-30">
                <h2 className="post-heading">Contact:</h2>
              </div>
              {this.state.job.CompanyWebsite && (
                <div className="col-lg-6 mb-30">
                  <b>Company Website: </b> {this.state.job.CompanyWebsite}
                </div>
              )}
              {this.state.job.Eamil && (
                <div className="col-lg-6 mb-30">
                  <b>Email</b> {this.state.job.Email}
                </div>
              )}
            </div>
            <div className="row justify-content-center">
              <Apply id="123" type="job" />
            </div>
          </div>
        </JobDetailsStyleWrapper>
      </React.Fragment>
    );
  }
}

const JobDetailsStyleWrapper = styled.div`
  .post-title {
    font-weight: 500;
    text-decoration-line: underline;
    text-decoration-style: solid;
    text-decoration-color: black;
    text-decoration-thickness: 0.1rem;
  }
  .post-heading {
    display: inline-block;
    border-bottom-style: solid;
    border-bottom-width: 0.3px;
    border-bottom-color: grey;
  }
`;
