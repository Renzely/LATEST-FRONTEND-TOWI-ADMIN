import "./inventoryStyle.css";
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
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

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

export default function Inventory() {
  const [userData, setUserData] = React.useState([]);
  const [dateFilter, setDateFilter] = React.useState(null);
  const body = { test: "test" };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const XLSX = require("sheetjs-style");
  const [dateBegin, setDateBegin] = React.useState(null);
  const [dateEnd, setDateEnd] = React.useState(null);
  
  


  const filterParcelDate = () => {

    //let selectedDate = new Date(dateFilter.$d).toLocaleString('en-us',{month:'numeric', timeZone: 'Asia/Manila'});
    let month = new Date(dateFilter.$d).toLocaleString('en-us',{month:'numeric', timeZone: 'Asia/Manila'});
    let day = new Date(dateFilter.$d).toLocaleString('en-us',{day:'numeric', timeZone: 'Asia/Manila'});
    let year = new Date(dateFilter.$d).toLocaleString('en-us',{year:'numeric', timeZone: 'Asia/Manila'});

    if (month.length === 1) month = '0' + month
    if (day.length === 1) day = '0' + day

    const selectedDate = year + "-" + month + "-" + day
    console.log(selectedDate);  
    getDate(selectedDate)
  };


  const columns = [
    {
      field: "count",
      headerName: "#",
      width: 150,
      headerClassName: "bold-header",
    },
    {
      field: "date",
      headerName: "Date",
      width: 200,
      headerClassName: "bold-header",
    },
    {
      field: "inputId",
      headerName: "Input ID",
      width: 200,
      headerClassName: "bold-header",
    },
    {
      field: "name",
      headerName: "Merchandiser",
      width: 300,
      headerClassName: "bold-header",
    },
    {
      field: "UserEmail",
      headerName: "Email",
      width: 300,
      headerClassName: "bold-header",
    },
    {
      field: "accountNameBranchManning",
      headerName: "Account Name Branch",
      width: 350,
      headerClassName: "bold-header",
    },
    {
      field: "period",
      headerName: "Period",
      width: 200,
      headerClassName: "bold-header",
    },
    {
      field: "month",
      headerName: "Month",
      width: 150,
      headerClassName: "bold-header",
    },
    {
      field: "week",
      headerName: "Week",
      width: 150,
      headerClassName: "bold-header",
    },
    {
      field: "category",
      headerName: "Category",
      width: 150,
      headerClassName: "bold-header",
    },
    {
      field: "skuDescription",
      headerName: "SKU Description",
      width: 350,
      headerClassName: "bold-header",
    },
    {
      field: "products",
      headerName: "Products",
      width: 200,
      headerClassName: "bold-header",
    },
    {
      field: "skuCode",
      headerName: "SKU Code",
      width: 150,
      headerClassName: "bold-header",
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      headerClassName: "bold-header",
    },
    {
      field: "beginningSA",
      headerName: "Beginning (Selling Area)",
      width: 200,
      headerClassName: "bold-header",
    },
    {
      field: "beginningWA",
      headerName: "Beginning (Warehouse Area)",
      width: 230,
      headerClassName: "bold-header",
    },
    {
      field: "beginning",
      headerName: "Beginning",
      width: 150,
      headerClassName: "bold-header",
    },
    {
      field: "delivery",
      headerName: "Delivery",
      width: 150,
      headerClassName: "bold-header",
    },
    {
      field: "endingSA",
      headerName: "Ending (Selling Area)",
      width: 200,
      headerClassName: "bold-header",
    },
    {
      field: "endingWA",
      headerName: "Ending (Warehouse Area)",
      width: 200,
      headerClassName: "bold-header",
    },
    {
      field: "ending",
      headerName: "Ending",
      width: 150,
      headerClassName: "bold-header",
    },
    {
      field: "expiryFields",
      headerName: "EXPIRY FIELDS",
      width: 350,
      headerClassName: "bold-header",
      renderCell: (params) => {
        const expiryFields = params.value;
        if (Array.isArray(expiryFields) && expiryFields.length > 0) {
          return (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {expiryFields.map((field, index) => (
                <div
                  key={index}
                  style={{ display: "flex", flexDirection: "row" }}
                >
                  {`MONTH: ${field.expiryMonth} PCS: ${field.expiryPcs} ||`}
                </div>
              ))}
            </div>
          );
        }
        return "No expiry fields";
      },
      valueFormatter: (params) => {
        // Preprocess the expiryFields array for CSV export
        const expiryFields = params.value;
        if (Array.isArray(expiryFields) && expiryFields.length > 0) {
          return expiryFields
            .slice(0, 6) // Limit to 6 entries, if necessary
            .map(
              (field) => `MONTH: ${field.expiryMonth}, PCS: ${field.expiryPcs}`
            )
            .join(" | ");
        }
        return "No expiry fields";
      },
    },
    {
      field: "offtake",
      headerName: "Offtake",
      width: 200,
      headerClassName: "bold-header",
    },
    {
      field: "inventoryDaysLevel",
      headerName: "InventoryDaysLevel",
      width: 200,
      headerClassName: "bold-header",
    },
    {
      field: "noOfDaysOOS",
      headerName: "No Of Days OOS",
      width: 180,
      headerClassName: "bold-header",
    },
    {
      field: "remarksOOS",
      headerName: "Remarks",
      width: 150,
      headerClassName: "bold-header",
    },
    {
      field: "reasonOOS",
      headerName: "Reason",
      width: 220,
      headerClassName: "bold-header",
    },
  ];

  

  async function getUser() {
    try {
      // Retrieve the logged-in admin's accountNameBranchManning from localStorage
      const loggedInBranch = localStorage.getItem("accountNameBranchManning");
  
      console.log("Logged in branch:", loggedInBranch);
  
      if (!loggedInBranch) {
        console.error("No branch information found for the logged-in admin.");
        return;
      }
  
      // Prepare the branch list for the request
      const branches = loggedInBranch.split(",");
  
      // Fetch the inventory data filtered by branches
      const response = await axios.post(
        "https://latest-backend-towi-admin.onrender.com/retrieve-parcel-data",
        { branches } // Pass branches in the request body
      );
  
      const data = response.data.data;
      console.log(data, "backend response");
  
      // Sort the data by date in descending order
      const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));
  
      // Map the data for rendering
      const newData = sortedData.map((data, key) => {
        const value = (status, defaultValue) => {
          if (status === "Delisted") return "Delisted";
          if (status === "Not Carried") return "NC";
          return defaultValue || 0;
        };
  
        return {
          count: key + 1,
          date: data.date,
          inputId: data.inputId,
          name: data.name,
          UserEmail: data.userEmail,
          accountNameBranchManning: data.accountNameBranchManning,
          period: data.period,
          month: data.month,
          week: data.week,
          category: data.category,
          skuDescription: data.skuDescription,
          products: data.products,
          skuCode: data.skuCode,
          status: data.status,
          beginningSA: value(data.status, data.beginningSA),
          beginningWA: value(data.status, data.beginningWA),
          beginning: value(data.status, data.beginning),
          delivery: value(data.status, data.delivery),
          endingSA: value(data.status, data.endingSA),
          endingWA: value(data.status, data.endingWA),
          ending: value(data.status, data.ending),
          offtake: value(data.status, data.offtake),
          inventoryDaysLevel: value(data.status, data.inventoryDaysLevel),
          noOfDaysOOS: value(data.status, data.noOfDaysOOS),
          remarksOOS: data.remarksOOS,
          reasonOOS: data.reasonOOS,
          expiryFields: data.expiryFields,
        };
      });
  
      console.log(newData, "mapped data");
      setUserData(newData); // Set the filtered data for rendering
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  
  
  const fetchInventoryByDate = async () => {
    if (!dateBegin || !dateEnd) {
      alert("Please select a valid date range.");
      return;
    }
  
    try {
      const selectedDate = {
        startDate: dateBegin.format("YYYY-MM-DD"), // Format dates properly
        endDate: dateEnd.format("YYYY-MM-DD"),
      };
  
      console.log("Sending date range to backend:", selectedDate);
  
      await getDate(selectedDate); // Call the updated getDate function
    } catch (error) {
      console.error("Error fetching inventory data:", error);
    }
  };
  
  async function getDate(selectedDate) {
    const data = { 
      startDate: selectedDate.startDate, 
      endDate: selectedDate.endDate 
    }; // Ensure the payload matches the backend expectation
  
    try {
      const response = await axios.post(
        "https://latest-backend-towi-admin.onrender.com/filter-date-range", // Correct endpoint
        data
      );
  
      const parcels = response.data.data; // Access the data field
      console.log("Parcels fetched:", parcels);
  
      // Sort the data by date in descending order
      const sortedData = parcels.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
  
      const newData = sortedData.map((data, key) => {
        const value = (status, defaultValue) => {
          if (status === "Delisted") return "Delisted";
          if (status === "Not Carried") return "NC";
          return defaultValue || 0;
        };
  
        return {
          count: key + 1,
          date: data.date,
          inputId: data.inputId,
          name: data.name,
          UserEmail: data.userEmail,
          accountNameBranchManning: data.accountNameBranchManning,
          period: data.period,
          month: data.month,
          week: data.week,
          category: data.category,
          skuDescription: data.skuDescription,
          products: data.products,
          skuCode: data.skuCode,
          status: data.status,
          beginningSA: value(data.status, data.beginningSA),
          beginningWA: value(data.status, data.beginningWA),
          beginning: value(data.status, data.beginning),
          delivery: value(data.status, data.delivery),
          endingSA: value(data.status, data.endingSA),
          endingWA: value(data.status, data.endingWA),
          ending: value(data.status, data.ending),
          offtake: value(data.status, data.offtake),
          inventoryDaysLevel: value(data.status, data.inventoryDaysLevel),
          noOfDaysOOS: value(data.status, data.noOfDaysOOS),
          remarksOOS: data.remarksOOS,
          reasonOOS: data.reasonOOS,
          expiryFields: data.expiryFields,
        };
      });
  
      console.log("Mapped data:", newData);
      setUserData(newData); // Set data to render in the DataGrid
    } catch (error) {
      console.error("Error fetching inventory data:", error);
    }
  }
  
  
  
  

  React.useEffect(() => {
    getUser();
  }, []);

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
        "https://latest-backend-towi-admin.onrender.com/export-inventory-data-towi",
        {
          start: bDate,
          end: eDate,
        }
      );

      const headers = [
        "#",
        "Inventory Number",
        "Date",
        "Fullname",
        "Outlet",
        "Weeks Covered",
        "Month",
        "Week",
        "SKU",
        "SKU CODE",
        "Status",
        "BeginningSA",
        "BeginningWA",
        "Beginning",
        "Delivery",
        "EndingSA",
        "EndingWA",
        "Ending",
        "Expiry Fields",
        "Offtake",
        "Inventory Days Level",
        "No of Days OOS",
        "Remarks OOS",
      ];

      const newData = response.data.data.map((item, key) => ({
        count: key + 1,
        inputId: item.inputId,
        date: item.date,
        name: item.name,
        accountNameBranchManning: item.accountNameBranchManning,
        period: item.period,
        month: item.month,
        week: item.week,
        skuDescription: item.skuDescription,
        skuCode: item.skuCode,
        status: item.status,
        beginningSA: item.beginningSA,
        beginningWA: item.beginningWA,
        beginning: item.beginning,
        delivery: item.delivery,
        endingSA: item.endingSA,
        endingWA: item.endingWA,
        ending: item.ending,
        expiryFields: item.expiryFields
          ? item.expiryFields
              .map(
                (field) =>
                  `${field.expiryMonth || ""}: ${field.expiryPcs || ""}`
              )
              .join(", ")
          : "",
        offtake: item.offtake,
        inventoryDaysLevel: item.inventoryDaysLevel
          ? item.inventoryDaysLevel.toFixed(2)
          : "",
        noOfDaysOOS: item.noOfDaysOOS,
        remarksOOS: item.remarksOOS,
      }));

      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet([]);

      // Add headers and data
      XLSX.utils.sheet_add_aoa(ws, [headers], { origin: "A1" });
      XLSX.utils.sheet_add_json(ws, newData, {
        origin: "A2",
        skipHeader: true,
      });

      // Calculate dynamic column widths for SKU and Inventory Days Level
      const colWidths = headers.map((header, index) => {
        if (header === "SKU" || header === "Inventory Days Level") {
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

      XLSX.utils.book_append_sheet(wb, ws, "Inventory_Data");

      const buffer = XLSX.write(wb, { type: "array", bookType: "xlsx" });
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `INVENTORY_DATA_TOWI_${
        new Date().toISOString().split("T")[0]
      }.xlsx`;
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error(error);
      alert("Error exporting data. Please try again.");
    }
  };


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
              backgroundColor: "#52B788"
          }}
        >
          {/* Responsive Header with Controls */}
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            sx={{ marginBottom: "20px" }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Start Date"
                onChange={(newValue) => setDateBegin(newValue)}
                slotProps={{ textField: { size: "small", fullWidth: false, sx: { backgroundColor: 'white' } } }}
              />
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="End Date"
                onChange={(newValue) => setDateEnd(newValue)}
                slotProps={{ textField: { size: "small", fullWidth: false, sx: { backgroundColor: 'white' } } }}
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

            <Button
              onClick={fetchInventoryByDate}
              variant="contained"
              sx={{
                backgroundColor: "rgb(25, 118, 210)",
                color: "white",
                "&:hover": {
                  backgroundColor: "rgb(21, 101, 192)",
                },
              }}
            >
              Show Inventory
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
                  csvOptions: { disableToolbarButton: false },
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
        </Box>
      </Box>
    </div>
  );
}