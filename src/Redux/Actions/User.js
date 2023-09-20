import { ADD_USER, UPDATE_USER } from '../types';

export const addUser = user => {
  return {
    type: ADD_USER,
    payload: user,
  };
};

export const updateUser = user => {
  return {
    type: UPDATE_USER,
    payload: user,
  };
};