import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function FormItem(props) {
  switch (props.type) {
    case 'select':
      return (
        <FormItemStyleWrapper>
          <div className="form-group">
            {props.children}
            <select
              name={props.name}
              onChange={props.handleChange}
              value={props.value}
              {...props.attributes}
            >
              {props.options.map(obj => (
                <option key={obj.name} value={obj.value}>
                  {obj.name}
                </option>
              ))}
            </select>
          </div>
        </FormItemStyleWrapper>
      );

    case 'radio':
      return (
        <FormItemStyleWrapper>
          <div className="form-group radio">
            {props.children}
            {props.options.map(elem => (
              <React.Fragment key={elem}>
                <input
                  type="radio"
                  name={props.name}
                  value={elem}
                  id={elem}
                  defaultChecked={props.value === elem}
                  {...props.attributes}
                  onClick={props.handleChange}
                />
                <label htmlFor={elem}> {elem} </label>
              </React.Fragment>
            ))}
          </div>
        </FormItemStyleWrapper>
      );

    default:
      return (
        <FormItemStyleWrapper>
          <div className="form-group">{props.children}</div>
        </FormItemStyleWrapper>
      );
  }
}

const FormItemStyleWrapper = styled.div`
  /* Styles for default input fields */
  input:not([type='radio']),
  textarea,
  .form-control {
    width: 100%;
    height: 50px;
    padding: 0 20px;
    border: 1px solid #ced4da;
    outline: none;
    border-radius: 30px;
    color: black;
    font-size: 14px;
    :focus {
      box-shadow: none;
      border-color: #1583e9;
    }
  }
  textarea {
    height: 110px;
    padding: 20px;
    font-size: 17px;
  }

  /* Styles for form label input field */

  .form-label {
    display: block;
    font-family: inherit;
    margin-left: 20px;
    color: #636e72;
    font-size: 18px;
    @media (max-width: 576px) {
      font-size: 15px;
      margin-left: 20px;
    }
  }

  /* Styles for select input field */
  select {
    width: 100%;
    height: 50px;
    padding: 0 20px;
    border: 1px solid #ced4da;
    outline: none;
    border-radius: 30px;
    font-size: 14px;
    transition: background-color 0.15s ease-in-out,
      border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }

  /* Styles for radio input field */
  .radio {
    input:checked,
    input:not(:checked) {
      width: 1px;
      margin-left: 20px;
      @media (max-width: 576px) {
        margin-left: 10px;
      }
    }
    input:checked + label,
    input:not(:checked) + label {
      position: relative;
      padding-left: 40px;
      padding-right: 20px;
      cursor: pointer;
      line-height: 30px;
      display: inline-block;
      color: #666;
      @media (max-width: 576px) {
        padding-left: 35px;
        padding-right: 4px;
      }
    }
    input:checked + label:before,
    input:not(:checked) + label:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 30px;
      height: 30px;
      border: 1px solid #ddd;
      border-radius: 100%;
      background: #fff;
    }
    input:checked + label:after,
    input:not(:checked) + label:after {
      content: '';
      width: 20px;
      height: 20px;
      background: #0277bd;
      position: absolute;
      top: 5px;
      left: 5px;
      border-radius: 100%;
      -webkit-transition: all 0.2s ease;
      transition: all 0.2s ease;
    }
    input:not(:checked) + label:after {
      opacity: 0;
      -webkit-transform: scale(0);
      transform: scale(0);
    }
    input:checked + label:after {
      opacity: 1;
      -webkit-transform: scale(1);
      transform: scale(1);
    }
  }
`;

FormItem.propTypes = {
  children: PropTypes.node,
  options: PropTypes.array,
  type: PropTypes.string,
  attributes: PropTypes.object,
  handleChange: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.string,
};
