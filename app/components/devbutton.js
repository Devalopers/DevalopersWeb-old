/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function DevButton(props) {
  return (
    <ButtonStyleWrapper>
      {props.children ? (
        props.children
      ) : (
        <button
          disabled={props.disabled}
          onClick={props.click}
          type={props.type || 'button'}
          className={`btn dev-btn ${props.class}`}
        >
          {props.title}
        </button>
      )}
    </ButtonStyleWrapper>
  );
}

const ButtonStyleWrapper = styled.div`
  .dev-btn {
    position: relative;
    z-index: 1;
    min-width: 160px;
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    font-weight: 600;
    display: inline-block;
    padding: 0 30px;
    text-align: center;
    text-transform: capitalize;
    color: #1583e9;
    border: none;
    border-radius: 50px;
    background-color: #ffffff;
    -webkit-transition-duration: 500ms;
    -o-transition-duration: 500ms;
    transition-duration: 500ms;
    -webkit-box-shadow: 0 6px 50px 8px rgba(21, 131, 233, 0.15);
    box-shadow: 0 6px 50px 8px rgba(21, 131, 233, 0.15);
    :hover {
      -webkit-box-shadow: 0 6px 50px 8px rgba(21, 131, 233, 0.15);
      box-shadow: 0 6px 50px 8px rgba(21, 131, 233, 0.15);
      background-color: #1583e9;
      color: #ffffff;
    }
  }

  .btn-2 {
    background-color: #1583e9;
    color: #ffffff;
    :hover {
      background-color: #ffffff;
      color: #1583e9;
    }
  }

  .btn-3 {
    border: 2px solid #1583e9;
    line-height: 46px;
  }

  .login-register-btn a {
    display: inline-block;
  }

  .login-register-btn a span {
    -webkit-transition-duration: 500ms;
    -o-transition-duration: 500ms;
    transition-duration: 500ms;
    color: #a6a6a6;
  }

  .login-register-btn a span:hover {
    color: #1583e9;
  }

  .login-register-btn a:hover {
    color: #1583e9;
  }

  @media only screen and (min-width: 992px) and (max-width: 1199px) {
    .login-register-btn a {
      font-size: 14px;
    }
  }

  @media only screen and (max-width: 576px) {
    .dev-btn {
      min-width: 140px;
    }
  }

  .dev-btn-nav {
    min-width: 20px;
  }
`;

DevButton.propTypes = {
  title: PropTypes.string,
  class: PropTypes.string,
  click: PropTypes.func,
  type: PropTypes.string,
  children: PropTypes.node,
  disabled: PropTypes.bool,
};
