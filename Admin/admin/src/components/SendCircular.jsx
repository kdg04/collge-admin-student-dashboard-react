import React, { useState } from 'react';
import { TextField, Modal, Box, Button } from '@mui/material';
import Draggable from 'react-draggable';

const SendCircular = ({ open, onClose }) => {
  const [circularDraft, setCircularDraft] = useState('');
  const [dept, setDept] = useState('');
  const [subject, setSubject] = useState('');

  const handleClear = () => {
    setCircularDraft('');
    setDept('');
    setSubject('');
  }

  const handleSendDraft = async () => {
    if (!circularDraft.length || !dept || !subject) {
      alert('Please fill in all fields before sending.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8187/College/circulars', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ circularDraft, dept, subject }),
      });
      if (response.ok) {
        console.log('Circular delivered successfully');
      } else {
        console.log('Circular delivery failed');
      }
    } catch (error) {
      console.error('Error in delivering circular:', error);
    }

    setCircularDraft('');
    setDept('');
    setSubject('');
  };

  return (
    <Draggable>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="send-circular-modal-title"
        aria-describedby="send-circular-modal-description"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        BackdropProps={{
          style: {
            backgroundColor: 'transparent', 
          }
        }}
      >
        
        <Box sx={{ bgcolor: '#CBAD7F', width: '60%', p: 4, position: 'absolute', cursor: 'move', borderRadius:'12px' }}>
          <Box sx={{ display: 'flex', gap: '16px' }}>
              <TextField
                label="Dept"
                variant="outlined"
                value={dept}
                autoComplete="off"
                onChange={(e) => setDept(e.target.value)}
                sx={{ marginBottom: '8px', color: 'black', width: '20%', '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                              borderColor: 'blue' 
                                            },
                                            '&:hover fieldset': {
                                              borderColor: 'blue' 
                                            }
                                          }, '& .MuiInputLabel-root': {
                                            color: 'blue', 
                                            width: 'auto', 
                                          }
                }}
              />
              <TextField
                label="Subject"
                variant="outlined"
                value={subject}
                autoComplete="off"
                onChange={(e) => setSubject(e.target.value)}
                sx={{ marginBottom: '8px', width: '80%', '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                              borderColor: 'blue' 
                                            },
                                            '&:hover fieldset': {
                                              borderColor: 'blue' 
                                            }
                                          }, '& .MuiInputLabel-root': {
                                            color: 'blue', 
                                            width: 'auto', 
                                          }
                }}
              />
            </Box>
          <TextField
            label="Circular Draft"
            variant="outlined"
            multiline
            rows={4}
            value={circularDraft}
            autoComplete='off'
            onChange={(e) => setCircularDraft(e.target.value)}
            fullWidth
            sx={{ marginBottom: '8px', '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                          borderColor: 'blue' 
                                        },
                                        '&:hover fieldset': {
                                          borderColor: 'blue' 
                                        }
                                      }, '& .MuiInputLabel-root': {
                                        color: 'blue', 
                                        width: 'auto', 
                                      }
            }}
          />
          <Box style={{display:'flex', gap:'3px'}}>
            <Button variant="contained" color='success' disabled={!circularDraft.length || !dept || !subject} onClick={handleSendDraft}>
              Send Circular
            </Button>
            <Button margin='3px' variant="contained" color='success' onClick={handleClear}>
              Clear
            </Button>
          </Box>
        </Box>
      </Modal>
    </Draggable>
  );
};

export default SendCircular;
