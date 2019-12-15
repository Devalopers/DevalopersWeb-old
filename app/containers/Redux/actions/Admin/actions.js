import axios from 'axios';
import { REGISTER, LOG_IN, LOG_OUT } from './types';
import { BASE_URL } from '../../../../config/config';

// export const fetchPosts = () => dispatch => {
//   fetch(BASE_URL+'/admin/register')
//     .then(res => res.json())
//     .then(data =>
//       dispatch({
//         type: REGISTER,
//         payload: data
//       })
//     );
// };

export const register = postData => dispatch =>
  axios
    .post(`${BASE_URL}/admin/createProfile`, postData)
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
    .post(`${BASE_URL}/admin/login`, postData)
    .then(res => {
      console.log(res.data);
      localStorage.setItem('data', JSON.stringify(res.data.data));
      return dispatch({
        type: LOG_IN,
        payload: res.data,
      });
    })
    .catch(err => {
      const res = err.response;
      console.log(res.data);
      return dispatch({
        type: LOG_IN,
        payload: res.data,
      });
    });
