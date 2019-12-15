import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
export default function JobsFilter(props) {
  return (
    <JobsFilterStyleWrapper>
      <div className="container-fluid">
        <div id="jobsFilter" className="row justify-content-between">
          <select
            name="SeniorityLevel"
            className="custom-select col-xs-12 col-sm-12 col-md-4 col-lg-2 "
            onChange={props.change}
            defaultValue="novalue"
          >
            <option value="novalue">Select Seniority Level</option>
            <option value="Internship">Internship</option>
            <option value="Entry Level">Entry Level</option>
            <option value="Mid-Senior Level">Mid-Senior Level</option>
            <option value="Executive Level">Executive Level</option>
            <option value="Startup CTO">Startup CTO</option>
          </select>
          <select
            name="YearsOfExperience"
            className="custom-select col-xs-12 col-sm-12 col-md-4 col-lg-2"
            onChange={props.change}
            defaultValue="novalue"
          >
            <option value="novalue">Select Years of Experience</option>
            <option value="0 to 2">0 to 2</option>
            <option value="2 to 5">2 to 5</option>
            <option value="5 to 10">5 to 10</option>
            <option value=">10">&gt;10</option>
          </select>
          <select
            name="EducationLevel"
            className="custom-select col-xs-12 col-sm-12 col-md-4 col-lg-2"
            onChange={props.change}
            defaultValue="novalue"
          >
            <option value="novalue">Select Education Level</option>
            <option value="NA">NA</option>
            <option value="Bachelor Degree">Bachelor Degree</option>
            <option value="Master Degree">Master Degree</option>
            <option value="PHD candidate">PHD candidate</option>
          </select>
          <select
            name="EmploymentTime"
            className="custom-select col-xs-12 col-sm-12 col-md-4 col-lg-2"
            onChange={props.change}
            defaultValue="novalue"
          >
            <option value="novalue">Select Employment Time</option>
            <option value="Full Time">Full Time</option>
            <option value="Part Time">Part Time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
          <select
            name="JobLocation"
            className="custom-select col-xs-12 col-sm-12 col-md-4 col-lg-2"
            onChange={props.change}
            defaultValue="novalue"
          >
            <option value="novalue">Select Job Location</option>
            <option value="Beirut">Beirut</option>
            <option value="Mount Lebanon">Mount Lebanon</option>
            <option value="South">South</option>
            <option value="North">North</option>
            <option value="Bikaa">Bikaa</option>
            <option value="Outside Lebanon">Outside Lebanon</option>
          </select>
        </div>
      </div>
    </JobsFilterStyleWrapper>
  );
}

const JobsFilterStyleWrapper = styled.div`
  .custom-select {
    border: 0;
    margin-left: 7px;
    margin-right: 7px;
    margin-top: 10px;
    margin-bottom: 7px;
    height: 32px;
    box-shadow: 3px 3px 5px 1px #ccc;
    transition: background-color 0.15s ease-in-out,
      border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }
`;

JobsFilter.propTypes = {
  change: PropTypes.func,
};
