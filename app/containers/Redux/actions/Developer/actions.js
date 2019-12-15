import axios from 'axios';
import { REGISTER, LOG_IN } from './types';
import { BASE_URL } from '../../../../config/config';

export const register = postData => dispatch =>
  axios
    .post(`${BASE_URL}/developer/registerDeveloper`, postData)
    .then(res =>
      dispatch({
        type: REGISTER,
        payload: res.data,
      }),
    )
    .catch(err => {
      const res = err.response;
      return dispatch({
        type: REGISTER,
        payload: res.data,
      });
    });

export const login = postData => dispatch =>
  axios
    .post(`${BASE_URL}/developer/loginByEmail`, postData)
    .then(res => {
      localStorage.setItem('data', JSON.stringify(res.data));
      return dispatch({
        type: LOG_IN,
        payload: res.data,
      });
    })
    .catch(err => {
      const res = err.response;
      return dispatch({
        type: LOG_IN,
        payload: res.data,
      });
    });
