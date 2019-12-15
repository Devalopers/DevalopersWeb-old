import React from 'react';
import styled from 'styled-components';
import BreadCrumb from '../../components/breadcrumb';
import FormItem from '../../components/formitem';
import JobsFilter from '../../components/jobsfilter';
import ScrollableTable from '../../components/scrollabletable';
import DevButton from '../../components/devbutton';
import Modal from '../../components/modal';

const mobileDeviceWitdth = 576;

function filterByFields(toFilter, filterAttr) {
  return toFilter.filter(job => {
    let flag = 0;
    Object.keys(filterAttr).forEach(key => {
      // eslint-disable-next-line no-param-reassign
      if (filterAttr[key] === 'novalue') delete filterAttr[key];
      else if (job[key].toLowerCase() !== filterAttr[key].toLowerCase())
        flag = 1;
    });
    return flag ? null : job;
  });
}

function filterBYSearch(toFilter, searchValue) {
  return toFilter.filter(job => job.JobTitle.toLowerCase().match(searchValue));
}

export default class JobDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
      filteredJobs: [],
      searchValue: '',
      filterAttributes: {},
      subscriptionEmail: '',
      windowSize: null,
      popup: false,
      loaded: 3,
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.filterJobs = this.filterJobs.bind(this);
    this.submitSubscription = this.submitSubscription.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.loadMore = this.loadMore.bind(this);
  }

  componentDidMount() {
    const data = [
      {
        CompanyName: 'libro',
        JobTitle: 'IOS Engineer',
        SeniorityLevel: 'Entry Level',
        YearsOfExperience: '0 to 2',
        EducationLevel: 'Bachelor Degree',
        EmploymentTime: 'Full Time',
        JobLocation: 'Beirut',
      },
      {
        CompanyName: 'libro',
        JobTitle: 'Android Engineer',
        SeniorityLevel: 'Mid-Senior Level',
        YearsOfExperience: '2 to 5',
        EducationLevel: 'Bachelor Degree',
        EmploymentTime: 'Part Time',
        JobLocation: 'Beirut',
      },
      {
        CompanyName: 'libro',
        JobTitle: 'Web Engineer',
        SeniorityLevel: 'Entry level',
        YearsOfExperience: '0 to 2',
        EducationLevel: 'PHD Candidate',
        EmploymentTime: 'Full Time',
        JobLocation: 'Beirut',
      },
      {
        CompanyName: 'libro',
        JobTitle: 'front end Engineer',
        SeniorityLevel: 'Internship',
        YearsOfExperience: '0-2',
        EducationLevel: 'NA',
        EmploymentTime: 'Full time',
        JobLocation: 'Mount Lebanon',
      },

      {
        CompanyName: 'facebook',
        JobTitle: 'Data scientist',
        SeniorityLevel: 'Mid-Senior Level',
        YearsOfExperience: '5 to 10',
        EducationLevel: 'Master Degree',
        EmploymentTime: 'Full Time',
        JobLocation: 'Beirut',
      },
      {
        CompanyName: 'Google',
        JobTitle: 'Android Developer',
        SeniorityLevel: 'Entry Level',
        YearsOfExperience: '2 to 5',
        EducationLevel: 'Bachelor Degree',
        EmploymentTime: 'Part Time',
        JobLocation: 'South',
      },
      {
        CompanyName: 'libro',
        JobTitle: 'Web Developr',
        SeniorityLevel: 'Entry level',
        YearsOfExperience: '0 to 2',
        EducationLevel: 'Bachelors Degree',
        EmploymentTime: 'Full Time',
        JobLocation: 'Beirut',
      },
      {
        CompanyName: 'libro',
        JobTitle: 'AI Researcher',
        SeniorityLevel: 'Internship',
        YearsOfExperience: '0-2',
        EducationLevel: 'Bachelors Degree',
        EmploymentTime: 'Full time',
        JobLocation: 'Mount Lebanon',
      },
    ];
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    this.setState({
      jobs: data,
      filteredJobs: data,
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ windowSize: window.innerWidth });
  }

  handleSearch(e) {
    let filtered = [];
    const search = e.target.value.trim().toLowerCase();
    let toFilter = this.state.jobs;
    if (Object.entries(this.state.filterAttributes).length)
      toFilter = filterByFields(toFilter, this.state.filterAttributes);
    if (search.length > 0) filtered = filterBYSearch(toFilter, search);
    else filtered = toFilter;
    this.setState({
      searchValue: search,
      filteredJobs: filtered,
    });
  }

  filterJobs(e) {
    let filtered = [];
    // eslint-disable-next-line react/no-access-state-in-setstate
    const filterAttr = this.state.filterAttributes;
    filterAttr[e.target.name] = e.target.value;
    let toFilter = this.state.jobs;
    if (this.state.searchValue.length > 0)
      toFilter = filterBYSearch(toFilter, this.state.searchValue);
    if (Object.entries(filterAttr).length)
      filtered = filterByFields(toFilter, filterAttr);
    else filtered = toFilter;

    this.setState({
      filterAttributes: filterAttr,
      filteredJobs: filtered,
    });
  }

  filterJobsMobile(toFilter) {
    return toFilter.map(el => ({ Company: el.CompanyName, Job: el.JobTitle }));
  }

  toggleModal() {
    this.setState(prevState => ({ popup: !prevState.popup }));
  }

  handleChange(e) {
    console.log(e.target.value);
    this.setState({ subscriptionEmail: e.target.value });
  }

  loadMore() {
    this.setState(prevState => ({ loaded: prevState.loaded + 4 }));
  }

  submitSubscription() {
    console.log(this.state.subscriptionEmail);
    this.toggleModal();
  }

  render() {
    let returnData;
    if (
      this.state.searchValue.length === 0 &&
      Object.entries(this.state.filterAttributes).length === 0
    )
      returnData = this.state.jobs.slice(0, this.state.loaded);
    else returnData = this.state.filteredJobs.slice(0, this.state.loaded);
    if (this.state.windowSize <= mobileDeviceWitdth)
      returnData = this.filterJobsMobile(returnData);

    return (
      <JobDashboardStyleWrapper>
        <Modal status={this.state.popup} close={this.toggleModal}>
          <div className="header mt-15">
            <h2> Filtered Subscription </h2>
          </div>
          <div className="body mt-50">
            <form
              method="POST"
              encType="multipart/form-data"
              onSubmit={this.submitSubscription}
            >
              <div className="row justify-content-center">
                <div className="col-12">
                  {Object.entries(this.state.filterAttributes).length ? (
                    Object.keys(this.state.filterAttributes).map(key => (
                      <li key={key}>
                        {key} : {this.state.filterAttributes[key]}
                      </li>
                    ))
                  ) : (
                    <h6>
                      No filters selected, youll be notified if any new job is
                      posted
                    </h6>
                  )}
                </div>
              </div>

              <div className="row mt-30">
                <div className="col-lg-12">
                  <FormItem>
                    <input
                      type="email"
                      placeholder="email"
                      required
                      onChange={this.handleChange}
                    />
                  </FormItem>
                </div>
              </div>
              <div className="align-confirmation-btn mt-30 ">
                <DevButton
                  class="resize-sm-btn btn-3"
                  title="Save"
                  type="submit"
                />
                <DevButton
                  title="Cancel"
                  class="resize-sm-btn btn-3"
                  click={this.toggleModal}
                />
              </div>
            </form>
          </div>
        </Modal>
        <BreadCrumb title="Jobs" items={['Jobs', 'Dashboard']} />
        <div className="container">
          <JobsFilter change={this.filterJobs} />
          <div className="row justify-content-between">
            <div className="mt-80 subscribe">
              <DevButton
                class="btn-3"
                title="Subscribe to search"
                click={this.toggleModal}
              />
            </div>
            <div className="col-md-4 mt-80">
              <FormItem>
                <input
                  type="text"
                  placeholder="search"
                  onChange={this.handleSearch}
                />
              </FormItem>
            </div>
          </div>
          <div className="mt-30">
            <ScrollableTable
              data={returnData}
              details
              detailsLink="/jobs/jobdetails"
            />
          </div>
          <button
            type="button"
            className="btn-loadmore"
            onClick={this.loadMore}
          >
            Load More
          </button>
        </div>
      </JobDashboardStyleWrapper>
    );
  }
}

const JobDashboardStyleWrapper = styled.div`
  .container {
    @media (min-width: 1200px) {
      max-width: 1300px;
    }
  }

  .subscribe {
    font-size: 11px;
    @media (max-width: 767px) {
      margin-left: auto;
      margin-right: auto;
      margin-top: 30px;
    }
  }
  .header {
    h2 {
      text-align: center;
      font-size: 27px;
    }
  }

  .align-confirmation-btn {
    display: flex;
    justify-content: flex-end;
    flex-direction: row;
    button:not(last-child) {
      margin-right: 10px;
    }

    @media only screen and (max-width: 576px) {
      justify-content: center;
      flex-direction: row;
      button:not(last-child) {
        margin-left: 0px;
      }
    }
  }

  .btn-loadmore {
    background: none;
    color: #1583e9;
    border: none;
    padding: 10px 10px;
    font: inherit;
    cursor: pointer;
    outline: inherit;
  }
`;
