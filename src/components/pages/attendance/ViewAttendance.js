import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import Topbar from "../../topbar/Topbar";
import Sidebar from "../../sidebar/Sidebar";

export default function ViewAttendance() {
  const location = useLocation();
  const [attendanceData, setAttendanceData] = useState([]);

  const userEmail = location.state?.userEmail || "";

  // Function to format date and time
  const formatDateTime = (dateTime) => {
    if (!dateTime) return null; // Handle null dateTime
    const dateObj = new Date(dateTime);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = dateObj.toLocaleDateString(undefined, options);
    const time = dateObj.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    return { date, time };
  };

  // Fetch attendance data for the specific user
  async function fetchAttendanceData(emailAddress) {
    try {
      const response = await axios.post(
        "http://192.168.50.217:8080/get-attendance",
        { userEmail: emailAddress }
      );
      let data = response.data.data;

      // Get today's date in the formatted form
      const today = new Date();
      const formattedTodayDate = formatDateTime(today).date;

      // Check if there's an entry for today
      const hasTodayEntry = data.some(
        (item) => formatDateTime(item.date)?.date === formattedTodayDate
      );

      if (!hasTodayEntry) {
        // Add a placeholder entry for today
        data.unshift({
          _id: "placeholder", // Placeholder ID
          date: today,
          timeIn: null,
          timeOut: null,
        });
      }

      // Add a count and format date and time
      const formattedData = data.map((item, index) => {
        const formattedDate = formatDateTime(item.date);
        const formattedTimeIn = formatDateTime(item.timeIn);
        const formattedTimeOut = formatDateTime(item.timeOut);
        return {
          ...item,
          date: formattedDate ? formattedDate.date : "N/A",
          timeIn: formattedTimeIn ? formattedTimeIn.time : "No Time In",
          timeOut: formattedTimeOut ? formattedTimeOut.time : "No Time Out",
        };
      });

      // Sort data by date in descending order
      formattedData.sort((a, b) => new Date(b.date) - new Date(a.date));

      // Update the count field to match the sorted order
      formattedData.forEach((item, index) => {
        item.count = index + 1;
      });

      setAttendanceData(formattedData);
    } catch (error) {
      console.error("Error fetching attendance data:", error);
    }
  }

  // Fetch attendance data when userEmail changes
  useEffect(() => {
    if (userEmail) {
      fetchAttendanceData(userEmail);
    }
  }, [userEmail]);

  const columns = [
    { field: "count", headerName: "#", width: 100, headerClassName: "bold-header" },
    { field: "date", headerName: "Date", width: 200, headerClassName: "bold-header"},
    { field: "timeIn", headerName: "Time In", width: 150, headerClassName: "bold-header"},
    { field: "timeOut", headerName: "Time Out", width: 150, headerClassName: "bold-header"},
    {
      field: "currentAttendance",
      headerName: "",
      width: 250,
      renderCell: (params) => {
        if (params.row.count === 1) {
          return (
            <span style={{ color: 'green', fontWeight: 'bold' }}>
              CURRENT ATTENDANCE
            </span>
          );
        }
        return "";
      },
      headerClassName: "bold-header",
    },
  ];

  return (
    <div className="attendance">
      <Topbar />
      <div className="container">
        <Sidebar />
        <Box sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>
            Attendance for {userEmail}
          </Typography>
          <Box sx={{ height: 400, width: "200%" }}>
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
}
