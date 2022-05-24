import React from 'react';
import './App.css';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Login, Logout } from "@mui/icons-material";
import { CombinedState } from "redux";
import { connect, useSelector, useDispatch, TypedUseSelectorHook } from "react-redux";
import { AppStateType } from "./redux/reducers/index";
import { reduxUserState } from "./redux/reducers/userReducer";
import { RootState, AppDispatch } from "./redux/store";
import Contacts from "./components/Contacts";
import Register from "./components/Register";
import LogoutDlg from "./components/LogoutDlg";
import { IUserData } from "./components/UserDataForm";
import LoginDlg from './components/LoginDlg';
import SimpleDialog from "./components/SimpleDialog";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

function App() {
  const users = useAppSelector((state: CombinedState<{ users: reduxUserState}>) => state.users);
  const [showDialog, setShowDialog] = React.useState(false);
  const [showErrorDialog, setShowErrorDialog] = React.useState(false);
  const [registered, setRegistered] = React.useState(false);
  const [loggedInUser, setLoggedInUser] = React.useState("");
  const [loggedInUserId, setLoggedInUserId] = React.useState(-1);

  const handleIconPress = () => {
    setShowDialog(true);
  }

  const handleClose = (loggedOut: boolean) => {
    setShowDialog(false);
    setRegistered(false);
    if (loggedOut) {
      setLoggedInUser("");
    }
  }

  const handleLogout = (success: boolean) => {
    setShowDialog(false);
    if (success) {
      setRegistered(false);
      setLoggedInUser("");
      setLoggedInUserId(-1);
    }
  }

  const handleRegister = (data: IUserData) => {
    setLoggedInUser(data.fullname);
    setLoggedInUserId(data.id || -1);
  }

  const showLogin = () => {
    setRegistered(true);
    setShowDialog(true);
  }

  const handleLogin = (data: IUserData) => {
    setRegistered(true);
    setShowDialog(false);
    setLoggedInUser(data.fullname);
    setLoggedInUserId(data.id || -1);
  }

  const handleLoginError = () => {
    setRegistered(false);
    setLoggedInUser("");
    setShowErrorDialog(true);
    setShowDialog(false);
  }

  const handleCloseErrDlg = () => {
    setShowErrorDialog(false);
    setShowDialog(true);
    setRegistered(true);
  }

  const showRegister = () => {
    setRegistered(false);
    setShowDialog(true);
  }

  return (
    <div className="App">
      <h2>
        Contacts
        <Typography sx={{diplay: "inline-block", position: "absolute", top: 22, right: 53}}>
          User Logged In: {loggedInUser || "(none)"}
        </Typography>
        <IconButton
          aria-label="Login"
          key="login"
          onClick={(e) => { e.stopPropagation(); handleIconPress()}}
          style={{position: "absolute", right: 11, top: 14, color: "lightskyblue"}}>
          { loggedInUser ?
            <Logout />
          :
            <Login />
          }
        </IconButton>
      </h2>

      <Contacts visible={!!loggedInUser} userId={loggedInUserId} />

      { showDialog && loggedInUser &&
        <LogoutDlg onClose={handleLogout} user={loggedInUser}/>
      }
      { showDialog && !loggedInUser &&
        <Register
          onClose={handleClose}
          onRegister={handleRegister}
          onLogin={showLogin}
          showDialog={!registered}
        />
      }
      { showDialog && registered && !loggedInUser && 
        <LoginDlg
          onClose={handleClose}
          onLogin={handleLogin}
          onError={handleLoginError}
          onRegister={showRegister}
        />
      }
      { showErrorDialog && !loggedInUser &&
        <SimpleDialog
          title="Error"
          message="No such user found."
          onClose={handleCloseErrDlg}
          open={showErrorDialog}
        />
      }
    </div>
  );
}

function mapStateToProps(state: AppStateType) {
  if (state) {
    const { users } = state.users;
    return { users };
  }
  return {};
}

export default connect(mapStateToProps)(App);
