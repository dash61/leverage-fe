import React from 'react';
import '../App.css';
import {
  Button,
  Dialog,
  DialogTitle,
  Divider,
} from "@mui/material";

interface IProps {
  onClose: (success: boolean) => void;
  user: string;
}

function LogoutDlg(props: IProps) {
  const [showDialog, setShowDialog] = React.useState(true);

  const handleLogout = () => {
    // call to api to set user as logged out
    setShowDialog(false);
    props.onClose(true);
  }

  const handleClose = () => {
    setShowDialog(false);
    props.onClose(false);
  };

  return (
    <Dialog
      open={showDialog}
      onClose={handleClose}
      fullWidth={true}
      maxWidth={"sm"}
    >
      <DialogTitle style={{display: "flex"}}>
        Logout Current User: {props.user}
      </DialogTitle>
      <Divider />
      <div style={{
        display: "flex",
        justifyContent: "space-around",
        marginBottom: 25,
        marginTop: 25,
      }}>
        <Button
          variant="contained"
          onClick={handleLogout}
          color="primary"
        >
          OK
        </Button>
        <Button
          variant="contained"
          onClick={handleClose}
          color="primary"
        >
          Cancel
        </Button>
      </div>
    </Dialog>
  );
}

export default LogoutDlg;
