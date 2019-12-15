import { REGISTER, LOG_IN, LOG_OUT } from '../../actions/Developer/types';

const initialState = {
  items: [],
  item: {},
};

export default function(state = initialState, action) {
  switch (action.type) {
    case REGISTER:
      return {
        ...state,
        items: action.payload,
      };
    case LOG_IN:
      return {
        ...state,
        item: action.payload,
      };
    case LOG_OUT:
      return {
        ...state,
        item: action.payload,
      };
    default:
      return state;
  }
}
