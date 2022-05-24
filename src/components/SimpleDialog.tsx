import '../App.css';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
} from "@mui/material";

interface IProps {
  onClose: () => void;
  message: string;
  title: string;
  open: boolean;
}

function SimpleDialog(props: IProps) {
  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      fullWidth={true}
      maxWidth={"sm"}
      >
      <DialogTitle style={{display: "flex"}}>
        {props.title}
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Typography sx={{width: 555}}>
          {props.message}
        </Typography>
      </DialogContent>
      <Divider />
      <DialogActions>
        <div style={{
          display: "flex",
          margin: "15px 15px 10px 0",
        }}>
          <Button
              variant="contained"
              onClick={props.onClose}
              color="primary"
          >
            OK
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
}

export default SimpleDialog;
