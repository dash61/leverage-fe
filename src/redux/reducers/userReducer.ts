import * as types from "../constants";
import {IUser} from "../../interfaces";

// State definition for users.
export interface reduxUserState {
  users: IUser[];
  loginKey?: string;
}

const initialState: reduxUserState = {
  users: [],
  loginKey: "",
}

// type ActionTypes = UserReduxDataType;


// TODO - figure out TS error when "action: ActionTypes":
//  TS2322: Type '(state: reduxUserState | undefined, action: UserReduxDataType) => reduxUserState' is not assignable to type 'Reducer<reduxUserData, AnyAction>'.
//  Types of parameters 'action' and 'action' are incompatible.
//  Property 'payload' is missing in type 'AnyAction' but required in type 'UserReduxDataType'.
export default function userReducer(state=initialState, action: any): reduxUserState {

  switch (action.type) {
    case types.GET_USERS:
      return state;

    case types.ADD_USER:
      return { users: [{ "userEmail": "email_dummy", "userName": "name_dummy",
        "password": "password_dummy" }] };

    case types.DELETE_USER:
      const clone = [...state.users];
      clone.splice(action.payload, 1);
      return { users: clone };

    case types.SAVE_LOGIN_KEY:
      return { ...state, loginKey: action.payload };

    case types.GET_LOGIN_KEY:
      return state;

    default:
      return state;
  }
}
