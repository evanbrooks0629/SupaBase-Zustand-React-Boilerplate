import React, { useState } from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import useStore from '../data/store';

export default function LogInDialog(props) {
  const { logInEmailErrorMessage, logInPasswordErrorMessage, logInError } = useStore();
  // email
  // password
  // eventually: google
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const logIn = useStore((state) => state.logIn);
  const setLogInEmailErrorMessage = useStore((state) => state.setLogInEmailErrorMessage);
  const setLogInPasswordErrorMessage = useStore((state) => state.setLogInPasswordErrorMessage);
  const setLogInError = useStore((state) => state.setLogInError);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClose = () => {
    try {
      setLogInEmailErrorMessage("");
      setLogInPasswordErrorMessage("");
      setLogInError("-");
    } catch (e) {} finally {
      props.setLogInOpen(false);
      setEmail("");
      setPassword("");
      setShowPassword(false);
    }
  };

  const handleLogIn = () => {
    const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    // validation
    // check if email is right type
    // make sure password is greater than 8 characters
    // if email doesn't exist, show error message
    // if password is wrong, show error message
    // add forgot password button --> send email link and let user change pw
    let emailValid, passwordValid = false;
    if (emailRegexp.test(email)) { 
      emailValid = true; 
      setLogInEmailErrorMessage("");
    } else {
      setLogInEmailErrorMessage("Please enter a valid email address.");
    }
    if (password.length >= 8) {
      passwordValid = true;
      setLogInPasswordErrorMessage("");
    } else {
      setLogInPasswordErrorMessage("Password must be at least 8 characters long.");
    }
    if (emailValid && passwordValid) {
      logIn(email, password); // this can set a label value in zustand depending on error
      if (logInError.length > 1) {
        props.setLogInOpen(false);
        setEmail("");
        setPassword("");
        setShowPassword(false);
        setLogInError("-");
      } 
    }
  }

  return (
    <div>
      <Dialog open={props.open} onClose={handleClose}>
        <DialogTitle style={{fontWeight: 'bold', margin: '0 auto', color: '#1976d2', marginTop: '5px'}}>Log In</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={logInEmailErrorMessage !== "" ? true : false}
            helperText={logInEmailErrorMessage}
          />
          <TextField
            id="outlined-adornment-password"
            autoFocus
            margin="dense"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            variant="outlined"
            style={{marginTop: '20px'}}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end">
                    {showPassword ? 
                    <VisibilityOff /> 
                    : <Visibility />
                    }
                </IconButton>
              </InputAdornment>,
            }}
            label="Password"
            error={logInPasswordErrorMessage !== "" ? true : false}
            helperText={logInPasswordErrorMessage}
          />
          <p style={{color: 'red'}}>{logInError !== "-" && logInError}</p>
        </DialogContent>
        <DialogActions style={{marginBottom: '12px'}}>
          <Button 
            style={{ width: '45%', color: '#1976d2', textTransform: 'none', fontWeight: 'bold', marginLeft: '3%', marginRight: '2%' }} 
            onClick={handleClose}>
            Cancel
          </Button>
          <Button 
            style={{ width: '45%', color: '#ffffff', textTransform: 'none', fontWeight: 'bold', backgroundColor: '#1976d2', marginLeft: '2%', marginRight: '3%' }} 
            onClick={handleLogIn}>
            Log In
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}