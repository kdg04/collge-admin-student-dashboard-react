import React from 'react';
import { useState, createContext, useContext } from 'react';
import { Box, IconButton } from "@mui/material";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import Authentication from './Authentication';
import UserIcon from './UserIcon';
import Notification from './Notification';
import { LoggedInContext } from '../App';


const User = ({ updateUserInMain }) => {
    
    const [showAuthForm, setShowAuthForm] = useState(false); // State to track whether to show the authentication form
    const { loggedIn, setLoggedIn } = useContext(LoggedInContext);
    const [username, setUsername] = useState('');          
   
    const handleUserIconClick = () => {
      setShowAuthForm(!showAuthForm);
    };
    const handleAuthFormSubmit = (name) => {   
      setShowAuthForm(false);      // Hide the form after submission
      setUsername(name);                
      updateUserInMain(name);
    };
    console.log('user name from User : ' + username);      
  
    return (
      
        <Box display="flex">
            <IconButton>
              <NotificationsOutlinedIcon />
              {loggedIn && <Notification />}
            </IconButton>
            
            <UserIcon username={username} onClick={handleUserIconClick}/>    
            {showAuthForm && <Authentication onSubmit={handleAuthFormSubmit} />}
        </Box>
   
      
    );
  };
  
  export default User;
  