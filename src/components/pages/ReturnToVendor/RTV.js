import "./RTV.css";
import * as React from "react";
import Topbar from "../../topbar/Topbar";
import Sidebar from "../../sidebar/Sidebar";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbar,
} from "@mui/x-data-grid";
import axios from "axios";
import { Button, Stack, buttonBaseClasses } from "@mui/material";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

export default function RTV() {
  const [userData, setUserData] = React.useState([]);
  const [dateFilter, setDateFilter] = React.useState(null);
  const body = { test: "test" };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const XLSX = require("sheetjs-style");
  const [dateBegin, setDateBegin] = React.useState(null);
  const [dateEnd, setDateEnd] = React.useState(null);

  const columns = [
    { field: "count", headerName: "#", width: 75 },
    {
      field: "date",
      headerName: "Date",
      width: 150,
      headerClassName: "bold-header",
    },

    {
      field: "merchandiserName",
      headerName: "Merchandiser Name",
      width: 220,
      headerClassName: "bold-header",
    },
    {
      field: "UserEmail",
      headerName: "Email",
      width: 220,
      headerClassName: "bold-header",
    },
    {
      field: "outlet",
      headerName: "Outlet",
      width: 220,
      headerClassName: "bold-header",
    },
    {
      field: "item",
      headerName: "Item",
      width: 220,
      headerClassName: "bold-header",
    },
    {
      field: "quantity",
      headerName: "Quantity",
      width: 150,
      headerClassName: "bold-header",
    },
    {
      field: "driverName",
      headerName: "Driver Name",
      width: 200,
      headerClassName: "bold-header",
    },
    {
      field: "plateNumber",
      headerName: "Plate Number",
      width: 150,
      headerClassName: "bold-header",
    },
    {
      field: "pullOutReason",
      headerName: "Pull Out Reason",
      width: 200,
      headerClassName: "bold-header",
      //type: buttonBaseClasses,
    },

    // {
    //   field: "action",
    //   headerName: "Action",
    //   width: 200,
    //   sortable: false,
    //   disableClickEventBubbling: true,

    //   renderCell: (params) => {
    //     const onClick = (e) => {
    //       const currentRow = params.row;
    //       return alert(JSON.stringify(currentRow, null, 4));
    //     };

    //     return (
    //       <Stack>
    //         <Link
    //           to={"/view-parcel"}
    //           state={{ state: params.row.email }}
    //           style={{ textDecoration: "none" }}
    //         >
    //           <Button variant="contained" color="warning" size="small">
    //             View More
    //           </Button>
    //         </Link>
    //       </Stack>
    //     );
    //   },
    // },
  ];

  const filterParcelDate = () => {
    //let selectedDate = new Date(dateFilter.$d).toLocaleString('en-us',{month:'numeric', timeZone: 'Asia/Manila'});
    let month = new Date(dateFilter.$d).toLocaleString("en-us", {
      month: "numeric",
      timeZone: "Asia/Manila",
    });
    let day = new Date(dateFilter.$d).toLocaleString("en-us", {
      day: "numeric",
      timeZone: "Asia/Manila",
    });
    let year = new Date(dateFilter.$d).toLocaleString("en-us", {
      year: "numeric",
      timeZone: "Asia/Manila",
    });

    if (month.length === 1) month = "0" + month;
    if (day.length === 1) day = "0" + day;

    const selectedDate = year + "-" + month + "-" + day;
    console.log(selectedDate);
    getDateRTV(selectedDate);
  };

  async function getUser() {
    try {
      // Retrieve the logged-in admin's branches from localStorage
      const loggedInBranch = localStorage.getItem("accountNameBranchManning");

      if (!loggedInBranch) {
        console.error("No branch information found for the logged-in admin.");
        return;
      }

      const branches = loggedInBranch.split(",").map((branch) => branch.trim());

      // Send request to fetch RTV data filtered by branches
      const response = await axios.post(
        "https://towi-admin.onrender.com/retrieve-RTV-data",
        {
          branches,
        }
      );

      const data = response.data.data;

      // Sort and map the data
      const sortedData = data.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      const newData = sortedData.map((data, key) => ({
        count: key + 1,
        date: data.date,
        merchandiserName: data.merchandiserName,
        UserEmail: data.userEmail,
        outlet: data.outlet,
        item: data.item,
        quantity: data.quantity,
        driverName: data.driverName,
        plateNumber: data.plateNumber,
        pullOutReason: data.pullOutReason,
      }));

      console.log("Filtered RTV data:", newData);
      setUserData(newData); // Set the filtered data
    } catch (error) {
      console.error("Error fetching RTV data:", error);
    }
  }

  async function getDateRTV(selectedDate) {
    try {
      // Retrieve the logged-in admin's branches from localStorage
      const loggedInBranch = localStorage.getItem("accountNameBranchManning");

      if (!loggedInBranch) {
        console.error("No branch information found for the logged-in admin.");
        return;
      }

      const branches = loggedInBranch.split(",").map((branch) => branch.trim());

      // Send request to filter RTV data by date and branches
      const response = await axios.post(
        "https://towi-admin.onrender.com/filter-RTV-data",
        {
          selectDate: selectedDate,
          branches,
        }
      );

      const data = response.data.data;

      // Sort and map the data
      const sortedData = data.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      const newData = sortedData.map((data, key) => ({
        count: key + 1,
        date: data.date,
        merchandiserName: data.merchandiserName,
        UserEmail: data.userEmail,
        outlet: data.outlet,
        item: data.item,
        quantity: data.quantity,
        driverName: data.driverName,
        plateNumber: data.plateNumber,
        pullOutReason: data.pullOutReason,
      }));

      console.log("Filtered RTV data by date:", newData);
      setUserData(newData); // Set the filtered data
    } catch (error) {
      console.error("Error filtering RTV data by date:", error);
    }
  }

  const getExportData = async () => {
    if (dateBegin === null || dateEnd === null) {
      return alert("Please fill date fields");
    }

    let bDate = dateBegin.$d.getTime();
    let eDate = dateEnd.$d.getTime();

    if (eDate - bDate <= 0) {
      return alert("End date must be ahead of or the same as the start date");
    }

    try {
      const response = await axios.post(
        "https://towi-admin.onrender.com/export-RTV-data",
        {
          start: bDate,
          end: eDate,
        }
      );

      const headers = [
        "#",
        "Date",
        "Merchandiser Name",
        "Outlet",
        "SKU",
        "Quantity",
        "Driver's Name",
        "Plate Number",
        "Remarks",
        "Pull Out Reason",
      ];

      const newData = response.data.data.map((item, key) => ({
        count: key + 1,
        date: item.date,
        merchandiserName: item.merchandiserName,
        // UserEmail: item.userEmail,
        outlet: item.outlet,
        item: item.item,
        quantity: item.quantity,
        driverName: item.driverName,
        plateNumber: item.plateNumber,
        pullOutReason: item.pullOutReason,
      }));

      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet([]);

      // Add headers and data
      XLSX.utils.sheet_add_aoa(ws, [headers], { origin: "A1" });
      XLSX.utils.sheet_add_json(ws, newData, {
        origin: "A2",
        skipHeader: true,
      });

      // Calculate dynamic column widths for MATERIAL DESCRIPTION and Inventory Days Level
      const colWidths = headers.map((header, index) => {
        if (
          header === "MATERIAL DESCRIPTION" ||
          header === "Inventory Days Level"
        ) {
          const maxLength = Math.max(
            header.length, // Length of the header
            ...newData.map(
              (row) => (row[Object.keys(row)[index]] || "").toString().length
            ) // Length of data in the column
          );
          return { wch: maxLength + 6 }; // Add padding for better appearance
        }
        return { wch: Math.max(header.length, 15) }; // Default width for other columns
      });

      ws["!cols"] = colWidths;

      // Apply bold styling to headers
      headers.forEach((_, index) => {
        const cellAddress = XLSX.utils.encode_cell({ r: 0, c: index });
        if (!ws[cellAddress]) return;
        ws[cellAddress].s = {
          font: { bold: true },
          alignment: { horizontal: "center", vertical: "center" },
        };
      });

      // Apply center alignment to all data cells
      newData.forEach((row, rowIndex) => {
        Object.keys(row).forEach((_, colIndex) => {
          const cellAddress = XLSX.utils.encode_cell({
            r: rowIndex + 1,
            c: colIndex,
          }); // Row index starts at 1 for data
          if (!ws[cellAddress]) return;
          ws[cellAddress].s = {
            alignment: { horizontal: "center", vertical: "center" },
          };
        });
      });

      XLSX.utils.book_append_sheet(wb, ws, "RTV_Data");

      const buffer = XLSX.write(wb, { type: "array", bookType: "xlsx" });
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `RTV_DATA_TOWI_${
        new Date().toISOString().split("T")[0]
      }.xlsx`;
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error(error);
      alert("Error exporting data. Please try again.");
    }
  };

  React.useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="attendance">
      <Topbar />
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}>
        <Sidebar />
        <Box
          sx={{
            flexGrow: 1,
            padding: { xs: "10px", sm: "20px" },
            maxWidth: "100%",
            overflow: "auto",
            backgroundColor: "#52B788",
          }}
        >
          {/* Controls Section */}
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            sx={{ marginBottom: "20px", marginTop: "10px" }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Select Date"
                onChange={(newValue) => setDateBegin(newValue)}
                slotProps={{
                  textField: {
                    size: "small",
                    sx: { backgroundColor: "white" },
                  },
                }}
              />
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Select Date"
                onChange={(newValue) => setDateEnd(newValue)}
                slotProps={{
                  textField: {
                    size: "small",
                    sx: { backgroundColor: "white" },
                  },
                }}
              />
            </LocalizationProvider>

            <Button
              onClick={getExportData}
              variant="contained"
              sx={{
                backgroundColor: "rgb(33, 148, 29)",
                color: "white",
                "&:hover": {
                  backgroundColor: "rgb(33, 148, 29)",
                },
              }}
            >
              Export
            </Button>
          </Stack>

          {/* Responsive DataGrid */}
          <Box
            sx={{
              height: "100%",
              width: "100%",
              maxHeight: "80vh",
              marginTop: 2,
              overflow: "hidden",
              "& .MuiDataGrid-root": {
                backgroundColor: "#fff",
              },
            }}
          >
            <DataGrid
              rows={userData}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              slots={{
                toolbar: GridToolbar,
              }}
              slotProps={{
                toolbar: {
                  showQuickFilter: true,
                  printOptions: { disableToolbarButton: true },
                  csvOptions: { disableToolbarButton: true },
                },
              }}
              disableDensitySelector
              disableColumnFilter
              disableColumnSelector
              disableRowSelectionOnClick
              pageSizeOptions={[5, 10, 20, 30, 50, 100]}
              getRowId={(row) => row.count}
            />
          </Box>

          {/* Responsive Modal */}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={{
                padding: 4,
                backgroundColor: "white",
                margin: { xs: "10% auto", md: "5% auto" },
                width: { xs: "90%", sm: "70%", md: "50%" },
                boxShadow: 24,
                borderRadius: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Text in a modal
              </Typography>
              <Typography
                id="modal-modal-description"
                sx={{ mt: 2, textAlign: "center" }}
              >
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              </Typography>
              <Button
                onClick={handleClose}
                variant="contained"
                sx={{
                  marginTop: 3,
                  backgroundColor: "rgb(33, 148, 29)",
                  color: "white",
                  "&:hover": { backgroundColor: "rgb(33, 148, 29)" },
                }}
              >
                Close
              </Button>
            </Box>
          </Modal>
        </Box>
      </Box>
    </div>
  );
}
