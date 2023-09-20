import { ADD_USER, UPDATE_USER } from '../types';

const initialState = {
  userData: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return {
        ...state,
        userData: { ...state.userData, ...action.payload },
      };
      case UPDATE_USER:
        return {
          ...state,
          userData: { ...state.userData, ...action.payload },
        };
    default:
      return state;
  }
};

export default userReducer;
