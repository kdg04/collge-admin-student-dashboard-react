import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockCirculars } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from '@mui/icons-material/Person';
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import Directives from "../../components/Directives";
import StaffAttendanceStatBox from "../../components/StaffAttendanceStatBox";
import FacultyAttendanceStatBox from "../../components/FacultyAttendanceStatBox";
import ProgressCircle from "../../components/ProgressCircle";
import StaffAttendanceLineChart from "../../components/StaffAttendanceLineChart";
import { LoggedInContext } from "../../App";
import { useContext } from 'react';
import RtmnuScreenSaver from "../RtmnuScreenSaver";


const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const textColor = theme.palette.mode === 'light' ? '#000' : '#fff'; 
  const { loggedIn } = useContext(LoggedInContext);

  return (
    <Box m="20px">
      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {loggedIn ? (<StaffAttendanceStatBox/>) : (<StatBox
                                            title="Staff"
                                            subtitle="--"
                                            increase="--"
                                            icon={<PersonIcon sx={{ color: colors.greenAccent[600], fontSize: '26px' }} />}
                                          />)}
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {loggedIn ? (<FacultyAttendanceStatBox/>) : (<StatBox
                                            title="Faculty"
                                            subtitle="--"
                                            increase="--"
                                            icon={<PersonIcon sx={{ color: colors.greenAccent[600], fontSize: '26px' }} />}
                                          />)}
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
           {loggedIn ? (<StatBox
                              title="Students"
                              subtitle="647"
                              increase="+5%"
                              icon={<PersonIcon sx={{ color: colors.greenAccent[600], fontSize: '26px' }} />}
                        />) : (<StatBox
                                    title="Students"
                                    subtitle="--"
                                    increase="--"
                                    icon={<PersonIcon sx={{ color: colors.greenAccent[600], fontSize: '26px' }} />}
                              />)}
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Directives />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Weekly Attendance
              </Typography>
              <Typography>&nbsp;</Typography>
            </Box>            
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <StaffAttendanceLineChart />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid Rs{colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              RTMNU Circulars
            </Typography>
          </Box>
          
          {loggedIn ? (
            mockCirculars.map((circular, i) => (
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${loggedIn ? '#ddd' : '#333'}`} 
              p="15px"
            >
              <Box>
                <Typography
                  color={textColor} 
                  variant="h5"
                  fontWeight="600"
                >
                  {circular.date}
                </Typography>
                <Typography color={textColor}>
                  {circular.circ}
                </Typography>
              </Box>
             
            </Box>
          ))
                     ) : (
              <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                <RtmnuScreenSaver />
              </Box>
      )}
          
        
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Quarterly Attendance
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size="125" />
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              14,552 Attendance generated
            </Typography>
            <Typography>Includes Present and Absent</Typography>
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Canteen Sales Quantity
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Geography Based Traffic
          </Typography>
          <Box height="200px">
            <GeographyChart isDashboard={true} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
