import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography } from '@mui/material';
import Topbar from "../../topbar/Topbar";
import Sidebar from "../../sidebar/Sidebar";

const ViewAttendance = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState('');
  const [attendanceData, setAttendanceData] = useState([]);

  // Function to fetch user data
  async function getUser() {
    try {
      const response = await axios.post('http://192.168.50.217:8080/get-all-user');
      const data = response.data.data;

      
      if (data && data.length > 0) {
        setUserEmail(data[0].emailAddress); // Use the first user's email
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  // Fetch attendance data for the specific user
  async function fetchAttendanceData(emailAddress) {
    try {
      const response = await axios.post('http://192.168.50.217:8080/get-attendance', { userEmail: emailAddress });
      setAttendanceData(response.data.data);
    } catch (error) {
      console.error('Error fetching attendance data:', error);
    }
  }

  // Fetch user and attendance data on component mount
  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (userEmail) {
      fetchAttendanceData(userEmail);
    }
  }, [userEmail]);

  const columns = [
    { field: "count", headerName: "#", width: 150, headerClassName: 'bold-header' },
    { field: 'userEmail', headerName: 'User Email', width: 200, hide: true }, 
    { field: 'date', headerName: 'Date', width: 200 },
    { field: 'timeIn', headerName: 'Time In', width: 200 },
    { field: 'timeOut', headerName: 'Time Out', width: 200 },
  ];

  return (
    <div className="attendance">
      <Topbar />
      <div className="container">
        <Sidebar />
        <Box sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>
            Attendance History for {userEmail}
          </Typography>
          <Box sx={{ height: 400, width: '200%' }}>
            <DataGrid
              rows={attendanceData}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[5, 10, 20]}
              getRowId={(row) => row._id}
            />
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default ViewAttendance;
