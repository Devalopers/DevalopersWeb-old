import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import { BASE_URL } from '../../config/config';
import BreadCrumb from '../../components/breadcrumb';

class ViewProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.getLocalStorageData(),
      isVerifiedJWT: false,
      loading: true,
    };
    this.verifyJWT(
      `${BASE_URL}/admin/viewProfile`,
      this.state.data ? this.state.data.token : null,
    );
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

  render() {
    const loadingScreen = <Load>loading...</Load>;
    return (
      <React.Fragment>
        {!this.state.isVerifiedJWT && this.state.loading ? (
          <Redirect to="/admin/login" />
        ) : null}
        {this.state.loading ? loadingScreen : null}
        {this.state.isVerifiedJWT ? (
          <div>
            <BreadCrumb
              title="Your Profile"
              items={['Admin', this.state.data.username]}
            />
            <h1>
              Welcome {this.state.data.username} {this.state.loading}
            </h1>
          </div>
        ) : (
          <h1>FORBIDDEN</h1>
        )}
      </React.Fragment>
    );
  }
}

const LoadingStyleWrapper = styled.div`
  .bg {
    background-color: #1583e9;
    z-index: 10;
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .txt {
    position: absolute;
    color: white;
    font-size: 40px;
    top: 40%;
    left: 40%;
  }
  .fade-In {
    animation: fadeIn ease 0.1s;
    -webkit-animation: fadeIn ease 0.1s;
    -moz-animation: fadeIn ease 0.1s;
    -o-animation: fadeIn ease 0.1s;
    -ms-animation: fadeIn ease 0.1s;
  }
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

function Load(props) {
  return (
    <LoadingStyleWrapper>
      <div className="bg fade-In">
        <div className="txt">{props.children}</div>
      </div>
    </LoadingStyleWrapper>
  );
}

export default ViewProfile;
