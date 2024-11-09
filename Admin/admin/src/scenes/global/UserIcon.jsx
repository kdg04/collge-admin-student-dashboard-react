import React, { useContext, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import PersonOutlined from '@mui/icons-material/PersonOutlined';
import Tooltip from '@mui/material/Tooltip';
import './UserIcon.css';
import { LoggedInContext } from '../../App';

const UserIcon = ({ onClick }) => {
  const { loggedIn } = useContext(LoggedInContext);      
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  const tooltipText = loggedIn ? 'Admin account' : 'log in';

  return (
    <div className='user-icon-container'>
      <Tooltip title={tooltipText} open={showTooltip} onClose={handleMouseLeave} arrow>
        <IconButton color="inherit" onClick={onClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <PersonOutlined />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default UserIcon;