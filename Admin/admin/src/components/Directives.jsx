import React, { useContext, useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import SendIcon from '@mui/icons-material/Send';
import InboxIcon from '@mui/icons-material/Inbox';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import SendMessage from './SendMessage';
import SendCircular from './SendCircular';
import ReadMessages from './ReadMessages';
import { LoggedInContext } from '../App';
import Tooltip from '@mui/material/Tooltip';

const MailSection = () => {}


const Directives = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [selectedSection, setSelectedSection] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  
  const { loggedIn } = useContext(LoggedInContext);


  const handleSectionClick = (section) => {
    setSelectedSection(section);
    setIsOpen(true);
  };

  return (
    <Box width="100%" m="0 30px">
      <Tooltip
        title={loggedIn ? '' : 'You are not logged in'}
        enterDelay={100}
        leaveDelay={200}
        disableHoverListener={loggedIn}
        style={{ fontSize: '14px' }}
      >
      <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap="20px">   { /* Grid for even spacing */}
        <Box display="flex" flexDirection="column" alignItems="center">
          <IconButton onClick={() => handleSectionClick('sendCircular')} sx={{ height: '50px' }}> 
            <ListAltOutlinedIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />
          </IconButton>
          <Typography variant="h5" fontWeight="bold" sx={{ color: colors.grey[100], marginTop: '5px' }}>
            Circulars
          </Typography>
        </Box>
        <Box display="flex" flexDirection="column" alignItems="center">
          <IconButton onClick={() => handleSectionClick('mail')} sx={{ height: '50px' }}> 
            <MailOutlineIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />
          </IconButton>
          <Typography variant="h5" fontWeight="bold" sx={{ color: colors.grey[100], marginTop: '5px' }}>
            Mail
          </Typography>
        </Box>
        <Box display="flex" flexDirection="column" alignItems="center">
          <IconButton onClick={() => handleSectionClick('readMessages')} sx={{ height: '50px' }}> 
            <InboxIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />
          </IconButton>
          <Typography variant="h5" fontWeight="bold" sx={{ color: colors.grey[100], marginTop: '5px' }}>
            Inbox
          </Typography>
        </Box>
        <Box display="flex" flexDirection="column" alignItems="center">
          <IconButton onClick={() => handleSectionClick('sendMessages')} sx={{ height: '50px' }}> 
            <SendIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />
          </IconButton>
          <Typography variant="h5" fontWeight="bold" sx={{ color: colors.grey[100], marginTop: '5px' }}>
            Send 
          </Typography>
        </Box>
      </Box>
      </Tooltip>
      <Box m="20px 0">
        {selectedSection === 'sendCircular' && <SendCircular open={isOpen} onClose={() => setIsOpen(false)}/>}
        {selectedSection === 'readMessages' && <ReadMessages open={isOpen} onClose={() => setIsOpen(false)}/>}
        {selectedSection === 'sendMessages' && (loggedIn ? <SendMessage open={isOpen} onClose={() => setIsOpen(false)} />
                                            : <Tooltip></Tooltip>)}
                                              
                                              
 
        
                                        
        {selectedSection === 'mail' && <MailSection />}
      </Box>
    </Box>
  );
};

export default Directives;
