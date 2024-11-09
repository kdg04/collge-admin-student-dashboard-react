import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import StatBox from "./StatBox";
import PersonIcon from '@mui/icons-material/Person';
import { useTheme } from '@mui/material/styles';
import { tokens } from "../theme";

const StaffAttendanceStatBox = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [attendanceCount, setAttendanceCount] = useState(0);
  const [percentageLevel, setPercentageLevel] = useState(0);
  const total_staff_count = 20;

  useEffect(() => {
    axios.get('http://localhost:8187/College/StaffAttendance')
      .then(response => {
        const { todaysCount } = response.data; 
        setAttendanceCount(todaysCount);
        // Calculate the attendance level
        const level = (todaysCount / total_staff_count) * 100;
        setPercentageLevel(isNaN(level) ? 0 : level);
      })
      .catch(error => {
        console.error('Error fetching attendance data:', error);
      });
  }, []);

  return (
    <StatBox
      title="Staff"
      subtitle={attendanceCount}
      increase={percentageLevel.toFixed(2) + '%'} 
      progress={percentageLevel/100}
      icon={<PersonIcon sx={{ color: colors.greenAccent[600], fontSize: '26px' }} />}
    />
  );
};

export default StaffAttendanceStatBox;
