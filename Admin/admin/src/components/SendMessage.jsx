import React, { useState, useEffect } from 'react';
import { TextField, Modal, Box, Button, Typography, Checkbox } from '@mui/material';
import Draggable  from 'react-draggable';

const SendMessage = ({ open, onClose }) => {
  const [rows, setRows] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState([]);
  const [messageDraft, setMessageDraft] = useState('');

  useEffect(() => {
    fetchStaffList();
  }, []);

  const fetchStaffList = async () => {
    try {
      const response = await fetch('http://localhost:8187/College/stafflist');
      const data = await response.json();
      setRows(data);
    } catch (error) {
      console.error('Error fetching staff list:', error);
    }
  };

  const handleRowSelection = (id, checked) => {
    if (checked) {
      setSelectedStaff([...selectedStaff, id]);
    } else {
      setSelectedStaff(selectedStaff.filter(staffId => staffId !== id));
    }
  };

  const handleSendDraft = async () => {
    if (!selectedStaff.length) {
      alert('Please select staff members before sending the message.');
      return;
    }
    try {
      console.log(JSON.stringify({ selectedStaff, messageDraft }));
      const response = await fetch('http://localhost:8187/College/sendmessage', {
        method: 'POST',
            headers: {
                'Content-Type': 'application/json',

      },
      body:JSON.stringify({ selectedStaff, messageDraft }),
      
    });
      if(response.ok)
         console.log('message delivered successfully');
      else 
        console.log('Message delivery failed');
    } catch (error) {
      console.error('Error fetching staff list:', error);
    }

    setMessageDraft('');
  };

  return (
    <Draggable>
      <Modal               // opening message section modally
          open={open}
          onClose={onClose}
          aria-labelledby="send-message-modal-title"
          aria-describedby="send-message-modal-description"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',}}
      >
          <Box  sx={{ bgcolor: '#CBAD7F', width: '60%', p: 4, position: 'absolute', cursor: 'move', borderRadius:'12px' }}>
              <TextField
                  label="Message Draft"
                  variant="outlined"
                  multiline
                  rows={4}
                  value={messageDraft}
                  onChange={(e) => setMessageDraft(e.target.value)}
                  fullWidth
              />
              <Button variant="contained" disabled={!selectedStaff.length} onClick={handleSendDraft} onClose>
                 Send to Selected Staff
              </Button>
              
              <div style={{ overflowY: 'auto',  maxHeight: '400px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                    <th style={{ textAlign: 'left' }}>ID</th>
                    <th style={{ textAlign: 'left' }}>Name</th>
                    <th style={{ textAlign: 'left' }}>Phone Number</th>
                    <th style={{ textAlign: 'left' }}>Email</th>
                    <th style={{ textAlign: 'left' }}>Grade</th>
                    <th style={{ textAlign: 'left' }}>Dept</th>
                    <th style={{ textAlign: 'left' }}>Select</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map(row => (
                      <tr key={row.id} style={{ cursor: 'pointer', borderBottom: '1px solid black' }}>
                        <td style={{ textAlign: 'left' }}>{row.id}</td>
                        <td style={{ textAlign: 'left' }}>{row.name}</td>
                        <td style={{ textAlign: 'left' }}>{row.mob}</td>
                        <td style={{ textAlign: 'left' }}>{row.email}</td>
                        <td style={{ textAlign: 'left' }}>{row.grade}</td>
                        <td style={{ textAlign: 'left' }}>{row.dept}</td>
                        <td>
                          <Checkbox
                            checked={selectedStaff.includes(row.id)}
                            onChange={(e) => handleRowSelection(row.id, e.target.checked)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Box>         
      </Modal>
    </Draggable>  
  );
};

export default SendMessage;
