import React, { useContext, useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import InboxIcon from '@mui/icons-material/Inbox';
import CircularsIcon from '@mui/icons-material/ListAltOutlined';
import SendMessage from './SendMessage';
import ReadMessages from './ReadMessages';
import ReadCirculars from './ReadCirculars';
import { LoggedInContext } from '../App';
import Tooltip from '@mui/material/Tooltip';

const MessageSection = () => {
  const [selectedSection, setSelectedSection] = useState(null);
  const [isOpen, setIsOpen] = useState(false); 
  const { loggedIn } = useContext(LoggedInContext);

  const handleSectionClick = (section) => {
    setSelectedSection(section);
    setIsOpen(true);
  };

  return (
    <Box width="150px" m="0 25px">
      <Tooltip
        title={loggedIn ? '' : 'You are not logged in'}
        enterDelay={100}
        leaveDelay={200}
        disableHoverListener={loggedIn}
        style={{ fontSize: '14px' }}
      >
      <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap="0">      
        <Box display="flex" flexDirection="column" alignItems="center">
          <IconButton onClick={() => handleSectionClick('readCirculars')} sx={{ height: '30px' }}> 
            <CircularsIcon sx={{ fontSize: "26px" }} />
          </IconButton>
          
        </Box>
        <Box display="flex" flexDirection="column" alignItems="center">
          <IconButton onClick={() => handleSectionClick('readMessages')} sx={{ height: '30px' }}> 
            <InboxIcon sx={{ fontSize: "26px" }} />
          </IconButton>
          
        </Box>
        <Box display="flex" flexDirection="column" alignItems="center">
          <IconButton onClick={() => handleSectionClick('sendMessages')} sx={{ height: '30px' }}> 
            <SendIcon sx={{ fontSize: "26px" }} />
          </IconButton>
          
        </Box>
      </Box>
      </Tooltip>
      <Box m="10px 0">
        {selectedSection === 'readMessages' && (loggedIn ? <ReadMessages open={isOpen} onClose={() => setIsOpen(false)}/>
                                            : <Tooltip></Tooltip>)}
        {selectedSection === 'sendMessages' && (loggedIn ? <SendMessage open={isOpen} onClose={() => setIsOpen(false)} />
                                            : <Tooltip></Tooltip>)}
        {selectedSection === 'readCirculars' && (loggedIn ? <ReadCirculars open={isOpen} onClose={() => setIsOpen(false)} />
                                            : <Tooltip></Tooltip>)}                                    
      </Box>
    </Box>
  );
};
export default MessageSection;
