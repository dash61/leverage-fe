import {
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
} from "@mui/material";
import UserDataForm, { IUserData } from "./UserDataForm";
import { apiAddUser } from "../external/api";
import {IUser} from "../interfaces";


interface IProps {
  onClose: (loggedOut: boolean) => void;
  onRegister: (data: IUserData) => void;
  onLogin: () => void;
  showDialog: boolean;
}

const Register = (props: IProps) => {
  const handleClose = () => {
    props.onClose(false);
  };

  const handleRegister = async (data: IUserData) => {
    const be_data: IUser = await apiAddUser(data.fullname, data.password, data.email);
    data.id = be_data.id || -1; // get id from back-end data
    props.onRegister(data);
    props.onClose(false);
  }

  const handleLogin = () => {
    props.onClose(false);
    props.onLogin();
  }

  return (
    <Dialog
      open={props.showDialog}
      onClose={handleClose}
      fullWidth={true}
      maxWidth={"sm"}
    >
    <DialogTitle>Register</DialogTitle>
    <Divider />
      <DialogContent>
        <UserDataForm onSave={handleRegister} onCancel={handleClose} onLogin={handleLogin}/>
      </DialogContent>
    </Dialog>
  )
}

export default Register;
