import * as React from 'react';
import '../App.css';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { connect } from "react-redux";
import { CombinedState } from "redux";
import { IUserData } from "./UserDataForm";
import { apiLoginUser } from "../external/api";
import SimpleDialog from "./SimpleDialog";
import { AppStateType } from "../redux/reducers/index";
import { reduxUserState } from "../redux/reducers/userReducer";
import { SAVE_LOGIN_KEY } from "../redux/constants";
import { useAppDispatch, useAppSelector } from "../App";

interface IProps {
  onClose: (loggedOut: boolean) => void;
  onLogin: (data: IUserData) => void;
  onError: () => void;
  onRegister: () => void;
}

function LoginDlg(props: IProps) {
  const [showDialog, setShowDialog] = React.useState(true);
  const [user, setUser] = React.useState("");
  const [showErrDialog, setShowErrDialog] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const dispatch = useAppDispatch();

  const handleLogin = async () => {
    const loginData = await apiLoginUser(user, password);
    if (loginData.access_token) {
      dispatch({ type: SAVE_LOGIN_KEY, payload: loginData.access_token });
      props.onClose(true);
      props.onLogin({
        fullname: loginData.user.userName,
        email: loginData.user.userEmail,
        password: "",
        confirmPassword: "",
        id: loginData.user.id || 0
      });
    } else {
      // Message user that the login details don't match a known user.
      setShowErrDialog(true);
      props.onError();
    }
    setShowDialog(false);
  }

  const handleClose = () => {
    setShowDialog(false);
    props.onClose(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setUser(value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPassword(value);
  };

  const handleErrorDlgClose = () => {
    setShowErrDialog(false);
  }

  const handleRegister = () => {
    props.onRegister();
  }

  return (
    <>
      <Dialog
        open={showDialog}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"sm"}
      >
        <DialogTitle style={{display: "flex"}}>
          Login
        </DialogTitle>
        <Divider />

        <DialogContent>
          <div style={{display: "flex", alignItems: "baseline"}}>
            <Typography sx={{width: 85, textAlign: "right", marginRight: 2}}>
              User
            </Typography>
            <TextField
              required
              margin="normal"
              variant="outlined"
              value={user}
              onChange={handleUserChange}
              name="username"
              size="small"
            />
          </div>

          <div style={{display: "flex", alignItems: "baseline"}}>
            <Typography sx={{width: 85, textAlign: "right", marginRight: 2}}>
              Password
            </Typography>
            <TextField
              required
              margin="normal"
              variant="outlined"
              value={password}
              onChange={handlePasswordChange}
              name="password"
              size="small"
              type="password"
            />
          </div>
        </DialogContent>
        <Divider />

        <DialogActions>
          <div style={{
            display: "flex",
            justifyContent: "space-around",
            marginBottom: 10,
            marginTop: 15,
          }}>
            <Button type="submit" color="primary" variant="text"
              sx={{float: "right", marginRight: 2, textTransform: "capitalize"}}
              onClick={handleRegister}
            >
              Not registered? Register.
            </Button>
            <Button
              variant="contained"
              onClick={handleLogin}
              color="primary"
            >
              OK
            </Button>
            <Button
              variant="outlined"
              onClick={handleClose}
              color="primary"
              sx={{marginLeft: 2}}
            >
              Cancel
            </Button>
          </div>
        </DialogActions>
      </Dialog>

      { showErrDialog && 
        <SimpleDialog
          message={"No such registered user found"}
          title={"Error"}
          onClose={handleErrorDlgClose}
          open={showErrDialog}
        />
      }
    </>
  );
}

function mapStateToProps(state: AppStateType) {
  if (state) {
    return {
      users: state.users.users,
      loginKey: state.users.loginKey,
    };
  }
  return {};
}

export default connect(mapStateToProps)(LoginDlg);
