import React, { useState, useEffect, useContext } from 'react';
import { Button, TextField, Typography, Box, Modal } from '@mui/material';
import Draggable from 'react-draggable';
//import { UserIDContext } from '../App';
import StarIcon from '@mui/icons-material/Star';
import './ReadMessages.css';
import './ModalTable.css'


const ReadMessages = ({ open, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [userID] = useState(0);
  const [hasSeen, setHasSeen] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const VisibilityClass = hasSeen ? 'hidden' : 'new';

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    const VisibilityClass = hasSeen ? 'hidden' : 'new';
  }, [hasSeen]);


  const fetchMessages = async () => {
    try {
      console.log("userID from ReadMessages : " + userID);
      const response = await fetch(`http://localhost:8187/College/messages`); 
      const data = await response.json();
      setMessages(data);
      console.log("msgs " + messages);
    } catch (error) {
      console.error('Error fetching messages:', error); 
    }
  };

  const handleNextMessage = () => {
    setCurrentMessageIndex((prevIndex) => prevIndex + 1);
  };

  const handlePrevMessage = () => {
    setCurrentMessageIndex((prevIndex) => prevIndex - 1);
  };
  
  const handleDeleteMessage = () => {
    console.log("messages old " + messages[0].from + " " + messages[1].from);
    const updatedMessages = messages.filter((message, index) => index !== currentMessageIndex);
    setCurrentMessageIndex(currentMessageIndex-1);
    setMessages(updatedMessages);
    setDeleted(true);
  };

  const showMessage = () => {
    if (!messages[currentMessageIndex].seen) 
       messages[currentMessageIndex].seen = true;
    return messages[currentMessageIndex].msg;
  };

  const handleMsgSatus = () => {
    setHasSeen(messages[currentMessageIndex].seen); 
  };

  const updateMailBox = async () => {
    let reqBody;
    if(deleted) 
       reqBody = JSON.stringify({userID, deleted, messages});  // send message array only if messages deleted
    else 
       reqBody = JSON.stringify({userID, deleted});

    try {
      const response = await fetch('http://localhost:8187/College/updateMailBox', 
            { method: 'POST', 
              headers: {'Content-Type': 'application/json',},
              body: reqBody,
            });
      const data = await response.text();
      if (response.status === 200) {
      console.log('Msg List updated successfully!');       
      } else {
          console.log("error response status not 200 " + data);
      }     
    } catch (error) {  
        console.error('Error in updating user message list:', error); 
    }
    onClose();  
  };

  return (
    <Draggable>
        <Modal
            open={open}
            onClose={updateMailBox}     
            aria-labelledby="read-messages-modal-title"
            aria-describedby="read-messages-modal-description"
            className='ModalTable'
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}
            BackdropProps={{
              style: {
                backgroundColor: 'transparent', // Transparent background
              },
            }}
        >
            <Box sx={{ bgcolor: '#d6b4fc', width: '40%', p: 4, position: 'absolute', cursor: 'move', borderRadius:'12px', fontSize: '16px',
                      background: 'linear-gradient(to bottom, #7BAE37, #BCFD49)', // Linear gradient for modal background
                     }}>
                { messages.length > 0 ? (
                <>
                <Box style={{display:'flex', justifyContent:'space-between'}}>
                  <Box style={{display:'flex'}}>
                    <Typography sx={{fontsize:'20px', marginBottom:'8px'}}>
                      <span style={{color: 'blue', fontWeight:'bold'}}>From: </span>{messages[currentMessageIndex].from}
                    </Typography>        
                    {handleMsgSatus}          
                    <StarIcon sx={{marginLeft:'3px'}} className={VisibilityClass} />                  
                  </Box>
                  <Typography sx={{fontsize:'20px', marginBottom:'8px'}}>
                    <span style={{color: 'blue', fontWeight:'bold'}}>Date: </span>{messages[currentMessageIndex].date}
                  </Typography>
                </Box>
                <TextField
                    label="Message"
                    multiline
                    rows={4}
                    value={showMessage()}
                    fullWidth
                    variant="outlined"
                />
                <Box style={{display:'flex', justifyContent:'space-between', margin:'5px'}}>
                  <Box style={{display:'flex', gap:'3px'}}>
                    <Button variant='contained' color='success' disabled={currentMessageIndex === 0} onClick={handlePrevMessage}>Previous</Button>
                    <Button variant='contained' color='success' disabled={currentMessageIndex === messages.length - 1} onClick={handleNextMessage}>Next</Button>                 
                  </Box>  
                    <Typography sx={{fontsize:'20px'}}>Message {currentMessageIndex + 1} of {messages.length}</Typography>                
                    <Button margin='3px' variant='contained' color='success' disabled={messages.length === 0} onClick={handleDeleteMessage}>Delete</Button>                 
                </Box>
                </>
                                        ) : (
                <Typography variant="h6">No messages available.</Typography>
                )}
            </Box>
        </Modal>
    </Draggable>
  );
};

export default ReadMessages;
