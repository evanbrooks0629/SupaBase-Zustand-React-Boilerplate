import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';
//import useStore from '../data/store';
import { supabase } from '../data/supabaseClient';


export default function ProfileDialog(props) {
  // email
  // password
  // eventually: google
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [website, setWebsite] = useState("");
  const [components, setComponents] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [updatedProfile, setUpdatedProfile] = useState(null);

  useEffect(() => {
    getProfile();
  }, [props.session]);

  const getProfile = async () => {
    try {
      //setLoading(true);
      const { user } = props.session;

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url, first_name, last_name`)
        .eq('id', user.id)
        .single()

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setFirstName(data.first_name);
        setLastName(data.last_name);
        setWebsite(data.website);
        //setAvatarUrl(data.avatar_url);
        setUserProfile({
            username: data.username,
            firstName: data.first_name,
            lastName: data.last_name,
            website: data.website
        });
        setUpdatedProfile({
            username: data.username,
            firstName: data.first_name,
            lastName: data.last_name,
            website: data.website
        });
      }
    } catch (error) {
      //alert(error.message);
    } finally {
      //setLoading(false);
    }
  }

  const updateProfile = async () => {
    try {
      //setLoading(true);
      const { user } = props.session;

      const updates = {
        id: user.id,
        username,
        first_name: firstName,
        last_name: lastName,
        website,
        //avatar_url,
        updated_at: new Date(),
      }

      let { error } = await supabase.from('profiles').upsert(updates);

      if (error) {
        throw error;
      }
    } catch (error) {
      //alert(error.message);
    } finally {
      //setLoading(false);
    }
  }

  const handleUpdate = () => {
    updateProfile();
    props.setProfileOpen(false);
    if (JSON.stringify(userProfile) !== JSON.stringify(updatedProfile)) {
        window.location.reload(false);
    }
  }

  const handleClose = () => {
    props.setProfileOpen(false);
    getProfile();
  };

  const handleChangeFirstName = (e) => {
    setFirstName(e.target.value);
    setUpdatedProfile({
        username: username,
        firstName: e.target.value,
        lastName: lastName,
        website: website
    });
  }
  const handleChangeLastName = (e) => {
    setLastName(e.target.value);
    setUpdatedProfile({
        username: username,
        firstName: firstName,
        lastName: e.target.value,
        website: website
    });
  }
  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
    setUpdatedProfile({
        username: e.target.value,
        firstName: firstName,
        lastName: lastName,
        website: website
    });
  }
  const handleChangeWebsite = (e) => {
    setWebsite(e.target.value);
    setUpdatedProfile({
        username: username,
        firstName: firstName,
        lastName: lastName,
        website: e.target.value
    });
  }

  return (
    <div>
      <Dialog open={props.open} onClose={handleClose} style={{textAlign: 'center'}}>
        {props.session !== undefined && 
            [<DialogTitle style={{fontWeight: 'bold', margin: '0 auto', color: '#1976d2', marginTop: '5px'}}>My Profile</DialogTitle>,
            <DialogContent>
            <TextField
                autoFocus
                margin="dense"
                label="First Name"
                type="text"
                variant="outlined"
                style={{width: '48%'}}
                value={firstName}
                onChange={handleChangeFirstName}
            />
            <TextField
                autoFocus
                margin="dense"
                label="Last Name"
                type="text"
                variant="outlined"
                style={{width: '48%', marginLeft: '4%'}}
                value={lastName}
                onChange={handleChangeLastName}
            />
            <TextField
                autoFocus
                margin="dense"
                label="Username"
                type="text"
                fullWidth
                variant="outlined"
                style={{marginTop: '20px'}}
                value={username}
                onChange={handleChangeUsername}
            />
            <TextField
                autoFocus
                margin="dense"
                label="Website"
                type="text"
                fullWidth
                variant="outlined"
                style={{marginTop: '20px'}}
                value={website}
                onChange={handleChangeWebsite}
            />
            <TextField
                autoFocus
                margin="dense"
                label="Email"
                type="email"
                fullWidth
                disabled
                variant="outlined"
                style={{marginTop: '20px', marginBottom: '-5px'}}
                value={props.session !== undefined ? props.session.user.email : ""}
            />
            </DialogContent>,
            
            <DialogActions style={{marginBottom: '28px'}}>
            <Button 
                style={{ width: '45%', color: '#1976d2', textTransform: 'none', fontWeight: 'bold', marginLeft: '3%', marginRight: '2%' }} 
                onClick={handleClose}>
                Cancel
            </Button>
            <Button 
                style={{ width: '45%', color: '#ffffff', textTransform: 'none', fontWeight: 'bold', backgroundColor: '#1976d2',  marginLeft: '2%', marginRight: '3%' }} 
                onClick={handleUpdate}>
                Save Changes
            </Button>
            </DialogActions>,
            <DialogTitle style={{fontWeight: 'bold', margin: '0 auto', color: '#ffffff', marginTop: '-15px', marginBottom: '-15px', backgroundColor: '#1976d2', width: '92%'}}>My Components</DialogTitle>,
            <DialogContent style={{textAlign: 'center', backgroundColor: '#1976d2'}}>
                {
                    // if has no components: display message and let them add
                    // if has components: display components, add button small
                }
                {components.length > 0 ? 
                    <p>You have components.</p>:
                    <p style={{color: '#bbbbbb'}}>You have not uploaded any components yet.</p>
                }
                <Button style={{ color: '#1976d2', textTransform: 'none', fontWeight: 'bold', backgroundColor: '#ffffff', border: '2px solid #1976d2', marginBottom: '10px'}} startIcon={<AddIcon />}>
                Add A Component
                </Button>
            </DialogContent>]
        }
        {props.session === undefined && 
            [<p style={{color: '#bbbbbb', textAlign: 'left', marginLeft: '15px', marginRight: '15px'}}>You have not logged in / created an account yet. Please log in or sign up to access the profile menu.</p>,
            <Button 
                style={{ width: '10%', color: '#ffffff', textTransform: 'none', fontWeight: 'bold', backgroundColor: '#1976d2',  marginLeft: '45%', marginBottom: '15px' }} 
                onClick={handleClose}>
                Ok
            </Button>]
        }
      </Dialog>
    </div>
  );
}