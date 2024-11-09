import React, { useState, useContext } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import './Authentication.css';
//import { LoggedInContext } from './Topbar';
import { LoggedInContext } from '../../App';

const Authentication = ( {onSubmit} ) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { loggedIn, setLoggedIn } = useContext(LoggedInContext);
  const [error, setError] = useState('');

  const handleLogout = () => {
    setLoggedIn(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8187/College/authenticate', { method: 'POST', headers: {'Content-Type': 'application/json',},body: JSON.stringify({ username, password }),});
      if (response.status === 200) {
        console.log('Login successful!');
        setLoggedIn(true);   
        onSubmit();             // Notify parent component (Topbar) of successful submission
        console.log('logIn after login ' + loggedIn);  
      } else {
        setError(response.statusText);
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
            style={{ backgroundColor: '#B0E0E6', padding: '15px', borderRadius: '8px' }}
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
          margin="normal"
          InputProps={{ style: { backgroundColor: '#D3D3D3' } }} // Set background color of the input field
          InputLabelProps={
            { style: { fontSize: '19px', color: 'black' } }
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
          margin="normal"
          InputProps={{ style: { backgroundColor: '#D3D3D3' } }} // Set background color of the input field
          InputLabelProps={
                 { style: { fontSize: '19px', color: 'black' } }
                }
        />
        {/*error && <div style={{ color: 'red', marginTop: '8px' }}>{error}</div>*/}
       
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
