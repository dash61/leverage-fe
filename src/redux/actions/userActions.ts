import * as types from "../constants";
import {reduxUserState} from "../reducers/userReducer";

export type UserReduxDataType = {
  type: string,
  payload: reduxUserState | number
}

export function getUsers(value: reduxUserState): UserReduxDataType {
  return {
    type: types.GET_USERS,
    payload: value
  }
}

export function addUser(value: reduxUserState): UserReduxDataType {
  return {
    type: types.ADD_USER,
    payload: value
  }
}

export function deleteUser(value: number): UserReduxDataType {
  return {
    type: types.DELETE_USER,
    payload: value
  }
}

export function saveLoginKey(value: string): UserReduxDataType {
  const temp: reduxUserState = { users: [], loginKey: value };
  return {
    type: types.SAVE_LOGIN_KEY,
    payload: temp
  }
}

export function getLoginKey(): UserReduxDataType {
  return {
    type: types.GET_LOGIN_KEY,
    payload: 0
  }
}
