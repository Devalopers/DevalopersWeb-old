import axios from 'axios';

export const register = registerCompanyFields => dispatch => {
  dispatch({
    type: 'PENDING_OPERATION',
  });
  axios
    .post('http://localhost:2000/company/create', registerCompanyFields)
    .then(() => {
      dispatch({
        type: 'COMPANY_REGISTERED',
      });
    })
    .catch(err => {
      if (err.response) {
        if (err.response.data.Missing) {
          dispatch({
            type: 'INVALID_REGISTER_COMPANY_DATA',
          });
        }
        if (err.response.data.error) {
          dispatch({
            type: 'INVALID_REGISTER_COMPANY_DATA',
          });
        }
      } else if (err.request) {
        dispatch({
          type: 'NETWORK_DISCONNECTED',
        });
      } else {
        dispatch({
          type: 'UNKNOWN_ERROR',
        });
      }
    });
};

export const login = loginCredentials => dispatch => {
  dispatch({
    type: 'PENDING_OPERATION',
  });
  axios
    .post('http://localhost:2000/company/login', loginCredentials)
    .then(() => {
      dispatch({
        type: 'LOGIN_SUCCESSFUL',
      });
    })
    .catch(err => {
      if (err.response) {
        if (err.response.data.failed) {
          dispatch({
            type: 'LOGIN_INVALID',
          });
        }
      } else if (err.request) {
        dispatch({
          type: 'NETWORK_DISCONNECTED',
        });
      } else {
        dispatch({
          type: 'UNKNOWN_ERROR',
        });
      }
    });
};

export const forgotPassword = email => dispatch => {
  dispatch({
    type: 'PENDING_OPERATION',
  });
  axios
    .post('http://localhost:2000/company/sendPsd', { email })
    .then(() => {
      dispatch({
        type: 'PASSWORD_RESET_CODE_SENT',
      });
    })
    .catch(err => {
      if (err.response) {
        if (err.response.data.error) {
          dispatch({
            type: 'PASSWORD_RESET_FAILED',
          });
        }
      } else if (err.request) {
        dispatch({
          type: 'NETWORK_DISCONNECTED',
        });
      } else {
        dispatch({
          type: 'UNKNOWN_ERROR',
        });
      }
    });
};
