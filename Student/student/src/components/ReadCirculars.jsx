import React, { useState, useEffect, useContext } from 'react';
import { Button, TextField, Typography, Box, Modal } from '@mui/material';
import Draggable from 'react-draggable';
import { UserIDContext } from '../App';
import './ReadMessages.css';
import './ModalTable.css'


const ReadCirculars = ({ open, onClose }) => {
  const [circulars, setCirculars] = useState([]);
  const [currentCircularIndex, setCurrentCircularIndex] = useState(0);
  const { userID } = useContext(UserIDContext);
 

  useEffect(() => {
    fetchCirculars();
  }, [userID]);

  const fetchCirculars = async () => {
    try {
      console.log("userID from ReadCirculars : " + userID);
      const response = await fetch(`http://localhost:8187/College/readCirculars?userId=${userID}`); 
      const data = await response.json();
      setCirculars(data);
      console.log("msgs " + circulars);
    } catch (error) {
      console.error('Error fetching circulars:', error); 
    }
  };

  const handleNextCircular = () => {
    setCurrentCircularIndex((prevIndex) => prevIndex + 1);
  };

  const handlePrevCircular = () => {
    setCurrentCircularIndex((prevIndex) => prevIndex - 1);
  };
  

  const showCircular = () => {
    return circulars[currentCircularIndex].circularDraft;
  };


  return (
    <Draggable>
        <Modal
            open={open}
            onClose={onClose}     
            aria-labelledby="read-circulars-modal-title"
            aria-describedby="read-circulars-modal-description"
            className='ModalTable'
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}
            BackdropProps={{
              style: {
                backgroundColor: 'transparent', 
              },
            }}
        >
            <Box sx={{ bgcolor: '#d6b4fc', width: '40%', p: 4, position: 'absolute', cursor: 'move', borderRadius:'12px', 
                      background: 'linear-gradient(to bottom, #d6b4fc, #ffd7eb)', 
                     }}>
                { circulars.length > 0 ? (
                <>
                <Box style={{display:'flex', justifyContent:'space-between'}}>
                  <Box style={{display:'flex'}}>
                    <Typography sx={{fontsize:'20px', marginBottom:'8px'}}>
                      <span style={{color: 'blue', fontWeight:'bold'}}>Dept: </span>{circulars[currentCircularIndex].dept}
                    </Typography>                    
                  </Box>
                  <Typography sx={{fontsize:'20px', marginBottom:'8px'}}>
                    <span style={{color: 'blue', fontWeight:'bold'}}>Date: </span>{circulars[currentCircularIndex].Date}
                  </Typography>
                </Box>
                <TextField
                    label="Circular"
                    multiline
                    rows={4}
                    value={showCircular()}
                    fullWidth
                    variant="outlined"
                />
                <Box style={{display:'flex', justifyContent:'space-between', margin:'5px'}}>
                  <Box style={{display:'flex', gap:'3px'}}>
                    <Button variant='contained' color='primary' disabled={currentCircularIndex === 0} onClick={handlePrevCircular}>Previous</Button>
                    <Button variant='contained' color='primary' disabled={currentCircularIndex === circulars.length - 1} onClick={handleNextCircular}>Next</Button>                 
                  </Box>  
                    <Typography sx={{fontsize:'20px'}}>Circular {currentCircularIndex + 1} of {circulars.length}</Typography>                                
                </Box>
                </>
                                        ) : (
                <Typography variant="h6">No circulars available.</Typography>
                )}
            </Box>
        </Modal>
    </Draggable>
  );
};

export default ReadCirculars;
