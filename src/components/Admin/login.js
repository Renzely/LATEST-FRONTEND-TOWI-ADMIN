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

// function Copyright(props) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="https://bmphrc.com/">
//         BMPower Rider App Admin
//       </Link>{' '}
//       {2024}
//       {'.'}
//     </Typography>
//   );
// }

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Login() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const body = {
      emailAddress: data.get('email'),
      password: data.get('password')
    }

    if (!body.emailAddress || !body.password) {
      Swal.fire({
        title: "Unable to Proceed",
        text: "Please input your credentials",
        icon: "warning"
      });
      return
    } 
    console.log(body)

    await  axios
        .post('http://192.168.50.217:8080/login-admin', body)
        .then(async response=> {
          const data = await response.data;

          console.log(data);

          if (data.status === 200){
            console.log("login success")
            
            Swal.fire({
              title: "Login Success!",
              icon: "success",
              confirmButtonColor: "#3085d6",
            }). then((result) =>  {
              if (result.isConfirmed) {
     
                localStorage.setItem('isLoggedIn', "admin");
              return  window.location.href = '/view-admin-accounts';             
              }else{
           
                localStorage.setItem('isLoggedIn', "admin");
              return  window.location.href = '/view-admin-accounts';   
              }
            });
           
           
            
          }
          else if (data.status === 401){

            Swal.fire({
              title: "Login Failed!",
              text: data.data,
              icon: "error"
            });
            console.log("login failed")
          }
          else{
            Swal.fire({
              title: "Login Error!",
              text: data.data,
              icon: "error"
            });
          }


        });
  

   

  };

  const LoginSuccess = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >

          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/forgotpassword" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
             
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </ThemeProvider>
  );
}