import React from 'react';
import '../App.css';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Add, Remove } from "@mui/icons-material";
import { connect } from "react-redux";
import { AppStateType } from "../redux/reducers/index";
import ContactDialog from "./ContactDialog";
import { apiAddContact, apiDeleteContact, apiGetContactsForUser } from "../external/api";
import { IContact } from "../interfaces";
import SimpleDialog from "./SimpleDialog";
import { useAppSelector } from "../App";
import { CombinedState } from "redux";
import { reduxUserState } from "../redux/reducers/userReducer";

interface IProps {
  visible: boolean;
  userId: number;
}


function Contacts(props: IProps) {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [contactsBE, setContactsBE] = React.useState<IContact[]>([]);
  const [showErrDialog, setShowErrDialog] = React.useState(false);
  const token = useAppSelector((state: CombinedState<{ users: reduxUserState}>) => state.users.loginKey);

  const fetchData = async () => {
    if (props.userId > 0) {
      const contacts = await apiGetContactsForUser(props.userId, token || "");
      setContactsBE(contacts);
    } else {
      setContactsBE([]);
    }
  }

  React.useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.userId]);

  const handleAddContact = () => {
    setDialogOpen(true);
  }

  const handleRemoveContact = async (id: number | undefined) => {
    if (id) {
      const result: IContact | undefined = contactsBE.find(item => item.id === id);
      if (result) {
        await apiDeleteContact(result.id || -1, token || "");
        // Loop through contactsBE and delete the contact just deleted.
        const remaining = contactsBE.filter(item => item.id !== id);
        setContactsBE(remaining);
      }
    }
  }

  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleAddingAContact = async (data: IContact) => {
    setDialogOpen(false);
    const result = await apiAddContact(data.contactName, data.contactEmail,
      data.contactPhone, props.userId, token || "");
    if (result.id === -1) {
      setShowErrDialog(true);
    }
    // Refresh current displayed contacts to include new one.
    await fetchData(); // refetch remaining contacts
  };

  const handleErrorDlgClose = () => {
    setShowErrDialog(false);
  }

  return (
    <>
      <div className={`contacts-${props.visible ? "on" : "off"}`}>
        <Grid item xs={12}
          style={{display: "flex", padding: 0, flexDirection: "column", paddingBottom: 10}}
          className="grid-main"
        >
          <IconButton
            aria-label="Add"
            key="add"
            onClick={(e) => { e.stopPropagation(); handleAddContact()}}
            style={{position: "relative", top: 0, color: "lightskyblue"}}>
            <Add sx={{fontSize: "2.5rem"}}/>
          </IconButton>
          { contactsBE.length > 0 && contactsBE.map((item, index) => 
            <div key={index} style={{display: "flex"}}>
              <div className="typo-divs">
                <div style={{display: "flex"}}>
                  <Typography variant="h6" m={0} sx={{flex: 1}}>Name:</Typography>
                  <Typography variant="h6" m={0} sx={{flex: 1}}>{item.contactName}</Typography>
                </div>
                <div style={{display: "flex"}}>
                  <Typography variant="h6" m={0} sx={{flex: 1}}>Email:</Typography>
                  <Typography variant="h6" m={0} sx={{flex: 1}}>{item.contactEmail}</Typography>
                </div>
                <div style={{display: "flex"}}>
                  <Typography variant="h6" m={0} sx={{flex: 1}}>Phone:</Typography>
                  <Typography variant="h6" m={0} sx={{flex: 1}}>{item.contactPhone}</Typography>
                </div>
              </div>
              <IconButton
                aria-label="Remove"
                key="remove"
                onClick={(e) => { e.stopPropagation(); handleRemoveContact(item.id)}}
                style={{justifyContent: "flexStart", color: "lightskyblue"}}>
                <Remove sx={{fontSize: "2.5rem"}}/>
              </IconButton>
            </div>
          )}
        </Grid>
      </div>
      { dialogOpen &&
        <ContactDialog onAdd={handleAddingAContact} onClose={handleClose} showDialog={dialogOpen} />
      }
      { showErrDialog && 
        <SimpleDialog
          message={"Contact already exists, or another error occurred."}
          title={"Error"}
          onClose={handleErrorDlgClose}
          open={showErrDialog}
        />
      }
    </>
  );
}

function mapStateToProps(state: AppStateType, ownProps: IProps) {
  if (state) {
    const { users } = state.users;
    return {
      users,
      ownProps,
    };
  }
  return {};
}

export default connect(mapStateToProps)(Contacts);
