import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import AttendanceLineChart from './AttendanceLineChart';

const StaffAttendanceLineChart = () => {
    const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8187/College/StaffAttendance')
      .then(response => {
        const { dailyAttdn } = response.data;  
        const attndData = dailyAttdn.map((count, index) => ({
            date: index + 1, 
            count: count
          }));
        
        setAttendanceData(attndData);
        
        
      })
      .catch(error => {
        console.error('Error fetching attendance data:', error);
      });
  }, []);

  return (
    <AttendanceLineChart attendanceData={attendanceData} />
  );
};

export default StaffAttendanceLineChart;
