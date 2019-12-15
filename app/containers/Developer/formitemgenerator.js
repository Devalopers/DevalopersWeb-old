import React from 'react';
import PropTypes from 'prop-types';
import FormItem from '../../components/formitem';
import Language from '../../components/languageselector';
export default function FormItemGenerator(props) {
  switch (props.name) {
    case 'firstname':
      return (
        <FormItem>
          {props.label && (
            <label className="form-label" htmlFor="firstname">
              First name
            </label>
          )}
          <input
            type="text"
            name="firstname"
            maxLength={150}
            value={props.value}
            placeholder="first name*"
            onChange={props.handler}
            {...props.options}
          />
        </FormItem>
      );
    case 'lastname':
      return (
        <FormItem>
          {props.label && (
            <label className="form-label" htmlFor="lastname">
              Last name
            </label>
          )}
          <input
            type="text"
            name="lastname"
            maxLength={150}
            value={props.value}
            placeholder="last name*"
            onChange={props.handler}
            {...props.options}
          />
        </FormItem>
      );
    case 'email':
      return (
        <FormItem>
          {props.label && (
            <label className="form-label" htmlFor="email">
              Email
            </label>
          )}
          <input
            type="email"
            name="email"
            placeholder="email*"
            value={props.value}
            onChange={props.handler}
            {...props.options}
          />
        </FormItem>
      );
    case 'username':
      return (
        <FormItem>
          {props.label && (
            <label className="form-label" htmlFor="username">
              Username
            </label>
          )}
          <input
            type="text"
            name="username"
            pattern="^[a-z0-9_-]{6,9}$"
            title="Please enter a username between 6 and 9 characters"
            value={props.value}
            placeholder="username*"
            onChange={props.handler}
            {...props.options}
          />
        </FormItem>
      );
    case 'password':
      return (
        <FormItem>
          {props.label && (
            <label className="form-label" htmlFor="password">
              Password
            </label>
          )}
          <input
            type="password"
            autoComplete="off"
            name="password"
            pattern="^(?=.*[a-z])(?=.*[0-9])(?=.*\W).*$"
            title="Should have at least 1 number and 1 special character"
            placeholder="password*"
            {...props.options}
            value={props.value}
            onChange={props.handler}
          />
        </FormItem>
      );
    case 'phone':
      return (
        <FormItem>
          {props.label && (
            <label className="form-label" htmlFor="phone">
              Phone
            </label>
          )}
          <input
            type="text"
            name="phone"
            pattern="^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s/0-9]*$"
            minLength={8}
            title="Please match the requested format, ex:03123456"
            placeholder="phone*"
            value={props.value}
            onChange={props.handler}
            {...props.options}
          />
        </FormItem>
      );
    case 'address':
      return (
        <FormItem>
          {props.label && (
            <label className="form-label" htmlFor="address">
              Address
            </label>
          )}
          <input
            type="text"
            name="address"
            placeholder="address*"
            title="Please match the requested format, ex: Beirut, Lebanon"
            pattern=".+,.+"
            value={props.value}
            onChange={props.handler}
            {...props.options}
          />
        </FormItem>
      );
    case 'gender':
      return (
        <FormItem
          type="radio"
          name="gender"
          value={props.value}
          handleChange={props.handler}
          options={['Male', 'Female', 'Other']}
          attributes={{ ...props.options }}
        >
          {props.label && (
            <label className="form-label" htmlFor="gender">
              Gender
            </label>
          )}
        </FormItem>
      );
    case 'major':
      return (
        <FormItem>
          {props.label && (
            <label className="form-label" htmlFor="major">
              Major
            </label>
          )}
          <input
            type="text"
            name="major"
            placeholder="major*"
            value={props.value}
            onChange={props.handler}
            {...props.options}
          />
        </FormItem>
      );
    case 'graduationDate':
      return (
        <FormItem>
          {props.label && (
            <label className="form-label" htmlFor="graduationDate">
              Graduation Date
            </label>
          )}
          <input
            type="text"
            name="graduationDate"
            placeholder="dd/mm/yyyy"
            title="Please match the requested format, ex:01/01/2020"
            pattern="^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$"
            value={props.value}
            onChange={props.handler}
            {...props.options}
          />
        </FormItem>
      );
    case 'lookingFor':
      return (
        <FormItem
          type="select"
          name="lookingFor"
          handleChange={props.handler}
          value={props.value}
          attributes={{ ...props.options }}
          options={[
            { name: 'Select Employment Time', value: '' },
            { name: 'Full Time', value: 'Fulltime job' },
            { name: 'Part Time', value: 'Parttime job' },
            { name: 'Projects', value: 'Projects' },
          ]}
        >
          {props.label && (
            <label className="form-label" htmlFor="employmentTime">
              Employment Time
            </label>
          )}
        </FormItem>
      );
    case 'seniorityLevel':
      return (
        <FormItem
          type="select"
          name="seniorityLevel"
          handleChange={props.handler}
          value={props.value}
          attributes={{ ...props.options }}
          options={[
            { name: 'Select Seniority Level', value: '' },
            { name: 'Entry Level', value: 'Entry Level' },
            { name: 'Junior Level', value: 'Junior Level' },
            { name: 'Mid-Senior Level', value: 'Mid-Senior Level' },
            { name: 'Executive Level', value: 'Executive Level' },
          ]}
        >
          {props.label && (
            <label className="form-label" htmlFor="seniorityLevel">
              Seniority Level
            </label>
          )}
        </FormItem>
      );
    case 'yearsOfExperience':
      return (
        <FormItem
          type="select"
          name="yearsOfExperience"
          handleChange={props.handler}
          value={props.value}
          attributes={{ ...props.options }}
          options={[
            { name: 'Select Years of Experience', value: '' },
            { name: '0 to 2', value: '0-2' },
            { name: '2 to 5', value: '2-5' },
            { name: '5 to 10', value: '5-10' },
            { name: '10 to 15', value: '10-15' },
            { name: '>15', value: '15+' },
          ]}
        >
          {props.label && (
            <label className="form-label" htmlFor="yearsOfExperience">
              Years Of Experience
            </label>
          )}
        </FormItem>
      );
    case 'educationLevel':
      return (
        <FormItem
          type="select"
          name="educationLevel"
          handleChange={props.handler}
          value={props.value}
          attributes={{ ...props.options }}
          options={[
            { name: 'Select Education Level', value: '' },
            { name: 'NA', value: 'n/a' },
            { name: 'High School Degree', value: 'High School Degree' },
            { name: 'Bachelors Degree', value: 'Bachelors Degree' },
            { name: 'Masters Degree', value: 'Masters Degree' },
            { name: 'Doctoral Degree', value: 'Doctoral Degree' },
          ]}
        >
          {props.label && (
            <label className="form-label" htmlFor="educationLevel">
              Education Level
            </label>
          )}
        </FormItem>
      );
    case 'githubProfile':
      return (
        <FormItem>
          {props.label && (
            <label className="form-label" htmlFor="githubProfile">
              Github Profile
            </label>
          )}
          <input
            type="text"
            title="Please match the requested format, ex: https://github.com/username"
            pattern="https://github.com/.*"
            name="githubProfile"
            value={props.value}
            placeholder="github profile*"
            onChange={props.handler}
            {...props.options}
          />
        </FormItem>
      );
    case 'languages':
      return (
        <FormItem>
          {props.label && (
            <label className="form-label" htmlFor="languages">
              Languages
            </label>
          )}
          <Language handleChange={props.handler} value={props.value} />
        </FormItem>
      );
    default:
      return null;
  }
}

FormItemGenerator.propTypes = {
  options: PropTypes.object,
  handler: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.any,
  label: PropTypes.bool,
};
