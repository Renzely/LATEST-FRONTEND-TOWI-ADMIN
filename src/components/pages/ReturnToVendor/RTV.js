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

  const body = { test: "test" };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const columns = [
    { field: "count", headerName: "#", width: 75 },
    {
      field: "date",
      headerName: "Date",
      width: 150,
      headerClassName: 'bold-header'
    },

    {
      field: "merchandiserName",
      headerName: "Merchandiser Name",
      width: 220,
      headerClassName: 'bold-header'
    },
    {
      field: "UserEmail",
      headerName: "Email",
      width: 220,
      headerClassName: 'bold-header'
    },
    {
      field: "item",
      headerName: "Item",
      width: 220,
      headerClassName: 'bold-header'
    },
    {
      field: "quantity",
      headerName: "Quantity",
      width: 150,
      headerClassName: 'bold-header'
    },
    {
      field: "driverName",
      headerName: "Driver Name",
      width: 200,
      headerClassName: 'bold-header'
    },
    {
      field: "plateNumber",
      headerName: "Plate Number",
      width: 150,
      headerClassName: 'bold-header'
    },
    {
      field: "pullOutReason",
      headerName: "Pull Out Reason",
      width: 200,
      headerClassName: 'bold-header'
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

  async function getUser() {
    await axios
      .post("http://192.168.50.217:8080/retrieve-RTV-data")
      .then(async (response) => {
        const data = await response.data.data;
        console.log(data, "test");

        const newData = data.map((data, key) => {
          return {
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
            toolbar: GridToolbar,
          }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              printOptions: { disableToolbarButton: true },
         
            },
          }}
          //disableDensitySelector
          disableColumnFilter
          disableColumnSelector
          disableRowSelectionOnClick
          pageSizeOptions={[5, 10, 20, 30]}
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
