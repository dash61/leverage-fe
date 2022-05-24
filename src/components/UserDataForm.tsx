import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

export type IUserData = {
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
  id: number;
};

interface IProps {
  onSave: (data: IUserData) => void;
  onCancel: () => void;
  onLogin: () => void;
}

const UserDataForm = (props: IProps) => {
  const validationSchema = Yup.object().shape({
    fullname: Yup.string()
      .required('Fullname is required')
      .min(6, 'Fullname must be at least 6 characters')
      .max(40, 'Fullname must not exceed 40 characters'),
    email: Yup.string()
      .required('Email is required')
      .email('Email is invalid'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(30, 'Password must not exceed 30 characters'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password'), null], 'Confirm Password does not match'),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState: {errors} } = useForm<IUserData>(formOptions);

  const onSubmit = (data: IUserData) => {
    props.onSave(data);
  };

  const handleClose = () => {
    props.onCancel();
  };

  const handleLogin = () => {
    props.onLogin();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="field">
        <Typography sx={{width: 135, textAlign: "right", marginRight: 2}}>
          Name
        </Typography>
        <input type="text" className="input-field" {...register("fullname", {required: true, maxLength: 80})} />
        {errors.fullname && (
          <div className="error">{errors.fullname.message}</div>
        )}
      </div>
      <div className="field">
        <Typography sx={{width: 135, textAlign: "right", marginRight: 2}}>
          Email
        </Typography>
        <input type="text" className="input-field" {...register("email", {required: true, pattern: /^\S+@\S+$/i})} />
        {errors.email && (
          <div className="error">{errors.email.message}</div>
        )}
      </div>
      <div className="field">
        <Typography sx={{width: 135, textAlign: "right", marginRight: 2}}>
          Password
        </Typography>
        <input type="password" className="input-field" {...register("password", {required: true, minLength: 4})} />
        {errors.password && (
          <div className="error">{errors.password.message}</div>
        )}
      </div>
      <div className="field">
        <Typography sx={{width: 135, textAlign: "right", marginRight: 2}}>
          Confirm Password
        </Typography>
        <input type="password" className="input-field" {...register("confirmPassword", {required: true, minLength: 4})} />
        {errors.confirmPassword && (
          <div className="error">{errors.confirmPassword.message}</div>
        )}
      </div>
      <Divider style={{marginBottom: 20}}/>

      <Button color="primary" onClick={handleClose} variant="outlined" sx={{float: "right", marginLeft: 2}}>
        Cancel
      </Button>
      <Button type="submit" color="primary" variant="contained" sx={{float: "right", marginLeft: 2}}>
        Register
      </Button>
      <Button color="primary" variant="text"
        sx={{float: "right", marginLeft: 2, textTransform: "capitalize"}}
        onClick={handleLogin}
      >
        Already registered? Sign In.
      </Button>
    </form>
  );
};

export default UserDataForm;
