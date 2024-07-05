import "./attendance.css"
import * as React from 'react';
import { DataGrid} from '@mui/x-data-grid';
import axios from "axios";
import { Inventory, AssignmentInd, AlignHorizontalCenter} from "@mui/icons-material";
import { Button, Stack } from "@mui/material";
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Link } from "react-router-dom";




  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

    
  

export default function Attendance(){

  const [userData, setUserData] = React.useState([]);  

    const body = {test: "test"};
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);  

    const columns = [
      { field: 'count', headerName: '#', width: 150 },
      { field: 'first_name', headerName: 'First name', width: 200 },
      { field: 'middle_name', headerName: 'Middle name', width: 200 },
      { field: 'last_name', headerName: 'Last name', width: 200 },
      {
        field: 'email',
        headerName: 'Email',
        width: 200,
      },
      {
        field: 'action',
        headerName: 'Action',
        width: 180,
        sortable: false,
        disableClickEventBubbling: true,
        
        renderCell: (params) => {
            const onClick = (e) => {
              const currentRow = params.row;
              return alert(JSON.stringify(currentRow, null, 4));
            };
            
            return (
           
             <Stack>
                <Link to={"/view-attendance"}
                  state={{ state : params.row.email }}
                  style={{textDecoration:"none"}}
                >
                <Button variant="contained" color="warning" size="small" >Select</Button>
                </Link>
             </Stack>
           
            );
        },
      }
    ];

    async function getUser(){
      await  axios
        .post('http://192.168.50.139:8082/get-all-user', body)
        .then(async response=> {
          const data = await response.data.data;

        

          const newData = data.map((data, key) => {
            return {
               count : key + 1,
               first_name : data.first_name,
               middle_name : data.middle_name? data.middle_name :"null",
               last_name : data.last_name,
               email: data.email
            };
           }
          );
          console.log(newData, "testing par");
          setUserData(newData);


        });

    }
    
    React.useEffect(() => {
        getUser();
      
    }, []);



    return(
        <div className="attendance">
  
        <div style={{ height: '100%', width : '100%', marginLeft: '100'}}>
        <DataGrid
          rows={userData}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10]}
          getRowId={(row) =>  row.count}

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
          
    );
}
