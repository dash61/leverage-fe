import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { IContact } from "../interfaces";

interface IProps {
  onClose: () => void;
  onAdd: (data: IContact) => void;
  showDialog: boolean;
}

const ContactDialog = (props: IProps) => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");

  const handleClose = () => {
    props.onClose();
  };

  const handleAddContact = () => {
    const data: IContact = { contactName: name, contactEmail: email, contactPhone: phone };
    props.onAdd(data);
  }

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setName(value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setEmail(value);
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPhone(value);
  };

  return (
    <Dialog
      open={props.showDialog}
      onClose={handleClose}
      fullWidth={true}
      maxWidth={"sm"}
    >
      <DialogTitle>Add Contact Details</DialogTitle>
      <Divider />
      <DialogContent>
        <div style={{display: "flex", alignItems: "baseline"}}>
          <Typography sx={{width: 85}}>
            Name:
          </Typography>
          <TextField
            required
            margin="normal"
            variant="outlined"
            value={name}
            onChange={handleNameChange}
            name="name"
            size="small"
          />
        </div>

        <div style={{display: "flex", alignItems: "baseline"}}>
          <Typography sx={{width: 85}}>
            Email:
          </Typography>
          <TextField
            required
            margin="normal"
            variant="outlined"
            value={email}
            onChange={handleEmailChange}
            name="email"
            size="small"
            type="email"
          />
        </div>

        <div style={{display: "flex", alignItems: "baseline"}}>
          <Typography sx={{width: 85}}>
            Phone:
          </Typography>
          <TextField
            required
            margin="normal"
            variant="outlined"
            value={phone}
            onChange={handlePhoneChange}
            name="phone"
            size="small"
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
          <Button
            variant="contained"
            onClick={handleAddContact}
            color="primary"
          >
            OK
          </Button>
          <Button
            variant="contained"
            onClick={handleClose}
            color="primary"
            sx={{marginLeft: 2}}
          >
            Cancel
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  )
}

export default ContactDialog;
