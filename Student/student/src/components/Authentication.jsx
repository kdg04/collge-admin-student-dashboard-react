import React, { useState, useContext } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import './Authentication.css';
import { LoggedInContext } from '../App';
import { UserIDContext } from '../App';

const Authentication = ( {onSubmit} ) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { loggedIn, setLoggedIn } = useContext(LoggedInContext);
  const { userID, setUserID } = useContext(UserIDContext);
  const [error, setError] = useState('');

  const handleLogout = () => {
    setLoggedIn(false);
    setUserID(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8187/College/authenticateUser', 
             { method: 'POST', 
               headers: {'Content-Type': 'application/json',},
               body: JSON.stringify({ username, password }),
             });
      if (response.status === 200) {
        const data = await response.text();
        setLoggedIn(true);
        setUserID(parseInt(data));
        console.log("user id :" + parseInt(data));    // sets userID with parseInt(data)
        console.log("user id from context in Authentication : " + userID);
        console.log('Login successful!');       
        onSubmit(username);             // Notify parent component of successful submission  ### username
      } else {
        setError(response.statusText);
        console.log("error response status not 200 " + error);
        setUsername('');
        setPassword('');
      }     
      } catch (error) {  
        setError('Error occurred while authenticating'); 
        console.error('Error:', error); 
      }
  };

  const handleInputClick = (e) => {
    // Stop event propagation to prevent closing the form
    e.stopPropagation();
  };

  return (
    <div className='authentication-container'>
      <form className='authentication-form' 
            onSubmit={handleSubmit}
            style={{ backgroundColor: '#f3c6f1', padding: '12px', borderRadius: '8px' }}
      >
        <TextField
          label="Username"
          variant="outlined"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onClick={handleInputClick} // Stop event propagation on input click
          required
          fullWidth          
          InputProps={{ style: { backgroundColor: '#ffcfd1' } }} // Set background color of the input field
          InputLabelProps={
            { style: { fontSize: '18px', color: 'black' } }
           }
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onClick={handleInputClick} // Stop event propagation on input click
          required
          fullWidth          
          InputProps={{ style: { backgroundColor: '#ffcfd1' } }} // Set background color of the input field
          InputLabelProps={
                 { style: { fontSize: '18px', color: 'black' } }
                }
        />
       
        <Box sx={{
              display: 'flex',
              gap: 2,
              justifyContent: 'center', // Center the buttons horizontally
              alignItems: 'center', // Center the buttons vertically
             }}
        >
          {loggedIn ? (
             <>
              <Button type="submit" variant="contained" color="success" sx={{ width: '100%' }} disabled>Login</Button>
              <Button type="button" variant="contained" color="success" sx={{ width: '100%' }} onClick={handleLogout} >Logout</Button>
             </>
                     )
                     :
                     (
             <>
               <Button type="submit" variant="contained" color="success" sx={{ width: '100%' }}>Login</Button>
               <Button type="button" variant="contained" color="success" sx={{ width: '100%' }} disabled>Logout</Button>
             </>
                     )  
          }  

        </Box>

        
      </form>
      
    </div>
  );
};

export default Authentication;
