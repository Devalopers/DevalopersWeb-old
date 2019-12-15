/*
import { REGISTER, LOG_IN } from '../../actions/Developer/types';
*/
const initialState = {
  operation: {
    isOperationPending: false,
    didLastOperationSucceed: false,
    lastOperationMessage: '',
  },
};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'PENDING_OPERATION':
      return {
        ...state,
        operation: {
          isOperationPending: true,
        },
      };
    case 'NETWORK_DISCONNECTED':
      return {
        ...state,
        operation: {
          isOperationPending: false,
          didLastOperationSucceed: false,
          lastOperationMessage: 'Could not connect to internet.',
        },
      };
    case 'UNKNOWN_ERROR':
      return {
        ...state,
        operation: {
          isOperationPending: false,
          didLastOperationSucceed: false,
          lastOperationMessage: 'Unknown failure has just occured.',
        },
      };
    case 'LOGIN_SUCCESSFUL':
      return {
        ...state,
        operation: {
          isOperationPending: false,
          didLastOperationSucceed: true,
          lastOperationMessage: 'Login successful.',
        },
      };
    case 'LOGIN_INVALID':
      return {
        ...state,
        operation: {
          isOperationPending: false,
          didLastOperationSucceed: false,
          lastOperationMessage: 'Username or password invalid.',
        },
      };
    case 'COMPANY_REGISTERED':
      return {
        ...state,
        operation: {
          didLastOperationSucceed: true,
          lastOperationMessage: 'Company registered',
        },
      };
    case 'INVALID_REGISTER_COMPANY_DATA':
      return {
        ...state,
        operation: {
          didLastOperationSucceed: true,
          lastOperationMessage: 'Company registered',
        },
      };
    case 'PASSWORD_RESET_CODE_SENT':
      return {
        ...state,
        operation: {
          didLastOperationSucceed: true,
          lastOperationMessage: 'Password code sent.',
        },
      };
    case 'PASSWORD_RESET_FAILED':
      return {
        ...state,
        operation: {
          didLastOperationSucceed: false,
          lastOperationMessage: 'Password code could not be sent.',
        },
      };
    default:
      return state;
  }
}
