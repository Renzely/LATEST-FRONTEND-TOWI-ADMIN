import "./parcel.css";
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

export default function Parcel() {
  const [userData, setUserData] = React.useState([]);

  const body = { test: "test" };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const columns = [
    { field: "count", headerName: "#", width: 150 },
    {
      field: "date",
      headerName: "Date",
      width: 200,
    },
    {
      field: "inputId",
      headerName: "Input ID",
      width: 200,
    },
    {
      field: "name",
      headerName: "Merchandiser",
      width: 300,
    },
    {
      field: "UserEmail",
      headerName: "Email",
      width: 300,
    },
    {
      field: "accountNameBranchManning",
      headerName: "Account Name Branch",
      width: 450,
    },
    {
      field: "period",
      headerName: "Period",
      width: 200,
    },
    {
      field: "month",
      headerName: "Month",
      width: 200,
    },
    {
      field: "week",
      headerName: "Week",
      width: 200,
    },
    {
      field: "category",
      headerName: "Category",
      width: 200,
    },
    {
      field: "skuDescription",
      headerName: "SKU Description",
      width: 350,
    },
    {
      field: "products",
      headerName: "Products",
      width: 200,
    },
    {
      field: "skuCode",
      headerName: "SKU Code",
      width: 150,
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
    },
    {
      field: "beginning",
      headerName: "Beginning",
      width: 150,
    },
    {
      field: "delivery",
      headerName: "Delivery",
      width: 150,
    },
    {
      field: "inventoryDaysLevel",
      headerName: "InventoryDaysLevel",
      width: 200,
    },
    {
      field: "noOfDaysOOS",
      headerName: "No Of Days OOS",
      width: 150,
    },
  ];

  async function getUser() {
    await axios
      .post("http://192.168.50.217:8080/retrieve-parcel-data")
      .then(async (response) => {
        const data = await response.data.data;
        console.log(data, "test");

        const newData = data.map((data, key) => {
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
            beginning: data.beginning? data.beginning: 0,
            delivery: data.delivery? data.delivery: 0,
            ending: data.ending? data.ending: 0,
            offtake: data.offtake? data.offtake: 0,
            inventoryDaysLevel: data.inventoryDaysLevel? data.inventoryDaysLevel: 0,
            noOfDaysOOS: data.noOfDaysOOS? data.noOfDaysOOS: 0,
          };
        });
        console.log(newData, "testing par");
        setUserData(newData);
      });
  }

  React.useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="attendance">
        <Topbar/>
         <div className="container">
         <Sidebar/>
      <div style={{ height: "100%", width: "85%", marginLeft: "100" }}>
        <DataGrid
          rows={userData}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          slots={{
            toolbar: CustomToolbar,
          }}
          pageSizeOptions={[5, 10]}
          getRowId={(row) => row.count}
        />
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </div>
    </div>
  );
}
