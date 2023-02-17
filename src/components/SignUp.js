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

export default function SignUpDialog(props) {
  const { signUpFirstNameErrorMessage, signUpLastNameErrorMessage, signUpUsernameErrorMessage, signUpEmailErrorMessage, signUpPasswordErrorMessage, signUpError, signUpMessage } = useStore();
  // email
  // password
  // eventually: google
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const signUp = useStore((state) => state.signUp);
  const setSignUpFirstNameErrorMessage = useStore((state) => state.setSignUpFirstNameErrorMessage);
  const setSignUpLastNameErrorMessage = useStore((state) => state.setSignUpLastNameErrorMessage);
  const setSignUpUsernameErrorMessage = useStore((state) => state.setSignUpUsernameErrorMessage);
  const setSignUpEmailErrorMessage = useStore((state) => state.setSignUpEmailErrorMessage);
  const setSignUpPasswordErrorMessage = useStore((state) => state.setSignUpPasswordErrorMessage);
  const setSignUpError = useStore((state) => state.setSignUpError);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };

  const handleClose = () => {
    try {
      setSignUpFirstNameErrorMessage("");
      setSignUpLastNameErrorMessage("");
      setSignUpUsernameErrorMessage("");
      setSignUpEmailErrorMessage("");
      setSignUpPasswordErrorMessage("");
      setSignUpError("-");
    } catch (e) {} finally {
      props.setSignUpOpen(false);
      setFirstName("");
      setLastName("");
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setShowPassword(false);
      setShowConfirmPassword(false);
    }
  };

  const handleSignUp = () => {
    const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    // validation
    // check if first and last name are both at least 2 characters
    // check if username is at least 8 characters
    // check if email is valid
    // if email already exists, show error message
    // check if password is at least 8 characters
    // check if password and confirmPassword match
    let firstNameValid, lastNameValid, usernameValid, emailValid, passwordValid = false;
    if (firstName.length >= 2) { 
      firstNameValid = true; 
      setSignUpFirstNameErrorMessage("");
    } else {
      setSignUpFirstNameErrorMessage("First Name must be at least 2 characters.");
    }
    if (lastName.length >= 2) { 
      lastNameValid = true; 
      setSignUpLastNameErrorMessage("");
    } else {
      setSignUpLastNameErrorMessage("Last Name must be at least 2 characters.");
    }
    if (username.length >= 8) { 
      usernameValid = true; 
      setSignUpUsernameErrorMessage("");
    } else {
      setSignUpUsernameErrorMessage("Username must be at least 8 characters.");
    }
    if (emailRegexp.test(email)) { 
      emailValid = true; 
      setSignUpEmailErrorMessage("");
    } else {
      setSignUpEmailErrorMessage("Please enter a valid email address.");
    }
    if (password.length >= 8) {
      if (password === confirmPassword) {
        passwordValid = true;
        setSignUpPasswordErrorMessage("");
      } else {
        setSignUpPasswordErrorMessage("Passwords must match");
      }
    } else {
      setSignUpPasswordErrorMessage("Password must be at least 8 characters long.");
    }
    if (firstNameValid && lastNameValid && usernameValid && emailValid && passwordValid) {
      signUp(firstName, lastName, username, email, password); // this can set a label value in zustand depending on error
      if (signUpError.length > 1) {
        setFormSubmitted(true);
        setFirstName("");
        setLastName("");
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setShowPassword(false);
        setShowConfirmPassword(false);
      }
    }
  }

  return (
    <div>
      <Dialog open={props.open} onClose={handleClose}>
        <DialogTitle style={{fontWeight: 'bold', margin: '0 auto', color: '#1976d2', marginTop: '5px'}}>Sign Up</DialogTitle>
        <DialogContent>
        {!formSubmitted ? 
          [<TextField
            autoFocus
            required
            margin="dense"
            label="First Name"
            type="text"
            variant="outlined"
            style={{width: '48%'}}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            error={signUpFirstNameErrorMessage !== "" ? true : false}
            helperText={signUpFirstNameErrorMessage}
          />,
          <TextField
            autoFocus
            required
            margin="dense"
            label="Last Name"
            type="text"
            variant="outlined"
            style={{width: '48%', marginLeft: '4%'}}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            error={signUpLastNameErrorMessage !== "" ? true : false}
            helperText={signUpLastNameErrorMessage}
          />,
          <TextField
            autoFocus
            required
            margin="dense"
            label="Username"
            type="text"
            fullWidth
            variant="outlined"
            style={{marginTop: '20px'}}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={signUpUsernameErrorMessage !== "" ? true : false}
            helperText={signUpUsernameErrorMessage}
          />,
          <TextField
            autoFocus
            required
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            style={{marginTop: '20px'}}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={signUpEmailErrorMessage !== "" ? true : false}
            helperText={signUpEmailErrorMessage}
          />,
          <TextField
            autoFocus
            required
            margin="dense"
            label="Password"
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
            error={signUpPasswordErrorMessage !== "" ? true : false}
            helperText={signUpPasswordErrorMessage}
          />,
          <TextField
            autoFocus
            required
            margin="dense"
            label="Confirm Password"
            type={showConfirmPassword ? 'text' : 'password'}
            fullWidth
            variant="outlined"
            style={{marginTop: '20px'}}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            InputProps={{
              endAdornment: <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowConfirmPassword}
                  onMouseDown={handleMouseDownConfirmPassword}
                  edge="end">
                    {showConfirmPassword ? 
                    <VisibilityOff /> 
                    : <Visibility />
                    }
                </IconButton>
              </InputAdornment>,
            }}
            error={signUpPasswordErrorMessage !== "" ? true : false}
            helperText={signUpPasswordErrorMessage}
          />,
          <p style={{color: 'red'}}>{signUpError !== "-" && signUpError}</p> ] : 
          <p>{signUpMessage}</p>
          }
        </DialogContent>
        <DialogActions style={{marginBottom: '15px'}}>
          {!formSubmitted ?
          [<Button 
            style={{ width: '45%', color: '#1976d2', textTransform: 'none', fontWeight: 'bold', marginLeft: '3%', marginRight: '2%' }} 
            onClick={handleClose}>
            Cancel
          </Button>,
          <Button 
            style={{ width: '45%', color: '#ffffff', textTransform: 'none', fontWeight: 'bold', backgroundColor: '#1976d2', marginLeft: '2%', marginRight: '3%' }} 
            onClick={handleSignUp}>
            Sign Up
          </Button> ] : 
          <Button 
            style={{ width: '45%', color: '#ffffff', textTransform: 'none', fontWeight: 'bold', backgroundColor: '#1976d2', marginLeft: '2%', marginRight: '3%' }} 
            onClick={handleClose}>
            Close
          </Button>
          }
        </DialogActions>
      </Dialog>
    </div>
  );
}