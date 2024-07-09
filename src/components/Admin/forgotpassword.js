import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Navigate} from "react-router-dom";
import axios, { isAxiosError } from "axios";
import Swal from "sweetalert2";
import EmailIcon from '@mui/icons-material/Email';
import { WidthFull } from '@mui/icons-material';
import { Stack } from '@mui/material';
import Modal from '@mui/material/Modal';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import DialogActions from '@mui/material/DialogActions';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import { Visibility } from "@mui/icons-material";




const defaultTheme = createTheme();




export default function ForgotPassword() {

  const [otpComponent, setOtpComponent] = React.useState(false);
  const [otpCode, setOtpCode] = React.useState();
  const [verifyOtpCode, setVerifyOtpCode] = React.useState();
  const [resetEmail, setResetEmail] = React.useState();
  const [openResetPasswordModal, setOpenResetPasswordModal] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const [confirmPasswordError, setConfirmPasswordError] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const body = {
      emailAddress: data.get('email'),
    }

    if (!body.emailAddress) {
      Swal.fire({
        title: "Unable to Proceed",
        text: "Please input your email",
        icon: "warning"
      });
      return
    } 


    await  axios
        .post('http://192.168.50.217:8080/send-otp-forgotpassword', body)
        .then(async response=> {
          const res = await response.data;
          console.log(res)

          if (res.status === 200){
            setVerifyOtpCode(res.code)
            setResetEmail(res.emailAddress)
            setOtpComponent(true)
            
          }
          else if(res.status === 422){
            Swal.fire({
                title: "Error!",
                text: res.data,
                icon: "error"
            });

          }
          else{
            Swal.fire({
              title: "Error!",
              text: res.data,
              icon: "error"
            });
          }


        }
       ).catch( error =>{
         Swal.fire({
              title: "Error!",
              text: "Something wrong occured",
              icon: "error"
            });
       });
 

  };

  const handlePasswordChange = e => {
    setPassword(e.target.value);
    if (e.target.value.length < 2) {
      setPasswordError("Please enter valid password");
    } else {
      setPasswordError(false);
    }
  };


  const handleConfirmPasswordChange = e => {
    setConfirmPassword(e.target.value);
    if (e.target.value !== password) {
      setConfirmPasswordError("Password does not match!");
    } else {
      setConfirmPasswordError(false);
    }
  };

  const handleCloseResetPasswordModal = (event, reason) => {
    
    if (reason !== 'backdropClick') {

        setOpenResetPasswordModal(false);
      }
 
  };

  
  const handleOtpCodeChange = e => {

    if(e.target.value.length > 4) return

    setOtpCode(e.target.value)
   
  };



  const handleSubmitCode = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const inputCode=  data.get('inputCode')


    if (inputCode === verifyOtpCode) {
     
        return setOpenResetPasswordModal(true)
      } 
  
    else if (inputCode !== verifyOtpCode) {
      Swal.fire({
        title: "Unable to Proceed",
        text: "Code does not match",
        icon: "warning"
      });
      return
    } 
  };

  const handleSubmitResetPassword = async (event) => {
    event.preventDefault();

    console.log("test")

    console.log("test", passwordError, confirmPasswordError)

    if(passwordError !== false || confirmPasswordError !== false){
        Swal.fire({
            title: "Unable to Proceed",
            text: "Please input valid password",
            icon: "warning"
        });
        return
    }else{

        const body = {
          emailAddress: resetEmail,
            password: password
          }


        axios
        .put('http://192.168.50.217:8080/forgot-password-reset', body)
        .then(async response=> {
          const res = await response.data;
          console.log(res)

          if (res.status === 200){
           
            Swal.fire({
                title: "Password reset success!",
                text:"You can now login with your new password",
                icon: "success",
                confirmButtonColor: "#3085d6",
              }). then((result) =>  {
                if (result.isConfirmed) {  
              
                return  window.location.href = '/login';             
                }else{
   
                return  window.location.href = '/login';   
                }
              });
          }
         
          else{
            Swal.fire({
              title: "Error!",
              text: res.data,
              icon: "error"
            });
          }


        }
       ).catch( error =>{
         Swal.fire({
              title: "Error!",
              text: "Something wrong occured",
              icon: "error"
            });
       });
 

    }


  };

 
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        {/* <CssBaseline /> */}
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >

          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <EmailIcon/>
          </Avatar>
          <Typography component="h1" variant="h5">
            Forgot Password
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <Stack>
            <TextField
              margin="normal"
              required
            //   fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              sx={{ mt: 3, mb: 2 }}
              autoFocus
              style={{width: 300}}
            />
           
           {otpComponent? <></> :
            <Button
              type="submit"
            //   fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{width: 300}}
            >
               Send OTP CODE
            </Button>
            }
      

                
            </Stack>
            
       
          </Box>

          {otpComponent?
          <Box component="form" onSubmit={handleSubmitCode} noValidate sx={{ mt: 1 }}>
               <Stack>
            <TextField
              margin="normal"
              required
              fullWidth
              id="inputCode"
              label="Code"
              name="inputCode"
              value={otpCode}
              onChange={handleOtpCodeChange}
              type="number"
              style={{
                width: 300
                
                }}
              sx={{
                 "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
                    display: "none",
                    },
                   "& input[type=number]": {
                    MozAppearance: "textfield",
                    },
                }}   
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
               Confirm Code
            </Button>
           </Stack>
          </Box>
          :
          <>
          </>
          }
          
        </Box>

        <Modal
            disableEscapeKeyDown
            open={openResetPasswordModal}
            onClose={handleCloseResetPasswordModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            tabindex="-1"
            data-bs-focus="false"
          >
            <Box noValidate sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Reset Password : 
                </Typography>

            <FormControl fullWidth sx={{ m: 1 }}>
                  <TextField
                   label="Password"
                   required
                   id="password"
                   name="password"
                   value={password}
                   onChange={handlePasswordChange}
                   error={passwordError}
                   helperText={passwordError} 
                   type={showPassword? 'text' : 'password'} 
                   autoComplete='off'
                   InputProps={{
                    endAdornment: 
                     <IconButton aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                  }}                 
                  />
         
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }}>
                  <TextField
                   label="Confirm Password"
                   required
                   name="confirmPassword"
                   id="confirmPassword"
                   value={confirmPassword}
                   onChange={handleConfirmPasswordChange}
                   error={confirmPasswordError}
                   helperText={confirmPasswordError}   
                   type="password"    
                   autoComplete='off'            
                  />
            </FormControl>  
          

              
          <DialogActions>
            <Button onClick={handleCloseResetPasswordModal}>
                Cancel
            </Button>
            <Button onClick={handleSubmitResetPassword}>
              Confirm
            </Button>
      
          </DialogActions>
        
             
            </Box>
        </Modal>

     
      </Container>
    </ThemeProvider>


  );
}


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };