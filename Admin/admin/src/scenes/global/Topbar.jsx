import { Box, IconButton, useTheme } from "@mui/material";
import { useContext, useState, createContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import SearchIcon from "@mui/icons-material/Search";
import Authentication from "./Authentication";
import UserIcon from "./UserIcon";
import Notification from "./Notification";
import { LoggedInContext } from "../../App";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [showAuthForm, setShowAuthForm] = useState(false); // State to track whether to show the authentication form
  const { loggedIn } = useContext(LoggedInContext);
  
 
  const handleUserIconClick = () => {
    setShowAuthForm(!showAuthForm);
  };
  const handleAuthFormSubmit = () => {
    setShowAuthForm(false);      // Hide the form after submission
  };


  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex">
          <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "dark" ? ( <DarkModeOutlinedIcon /> ) : ( <LightModeOutlinedIcon /> )}
          </IconButton>
          <IconButton>
            <NotificationsOutlinedIcon />
            {loggedIn && <Notification />}
          </IconButton>
          <IconButton>
            <SettingsOutlinedIcon />
          </IconButton>
          <UserIcon onClick={handleUserIconClick}/>
          {showAuthForm && <Authentication onSubmit={handleAuthFormSubmit} />}
      </Box>

    </Box>
  );
};

export default Topbar;
