import {
  Container,
  Typography,
  FormControl,
  Button,
  OutlinedInput,
  IconButton,
} from "@mui/material";
import React, { useState, useContext } from "react";
import styles from "./Login.module.css";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import { Link } from "react-router-dom";
import axios from "axios";
import { DataCentral } from './../../context/Context';
import Loader from "react-loader-spinner";
import { useHistory } from "react-router";
const Login = () => {
  const {jwt, setJwt, setAuth} = useContext(DataCentral)
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const history = useHistory()

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (event) => {
    const { name, value } = event.target
    if (name === 'email') {
      setEmail(value)
    }
    
    if (name === 'password') {
      setPassword(value)
    }

  }

  const handleSubmit = async () => {
    setTimeout(() => {
      setLoading(false)
      setMessage('something went wrong, check email, password or internet connectivity')
    }, 10000)
     setLoading(true)
     const response = await axios.post('https://photogalleryapi.herokuapp.com/api/login', {
      email: email,
      password: password,
    
     })
      try {
         if (response.status == '200') {
     
      setJwt(response.data.access_token)
 history.push('/home')
      setLoading(false)
      
        }
         else {
           setLoading(false)
        }
      } catch (error) {
          console.log('running')
        setLoading(false)
      }
 
       setLoading(false)
    
      
    
  }
  

  return (
    <div className={styles.login}>
      <Container maxWidth="sm">
        <div className={styles.login_content}>
          <div className={styles.login_heading}>
            <Typography variant="h4">Login</Typography>
          </div>
         
            <TextField
              id="outlined-basic"
            label="Email"
            name='email'
            onChange={handleChange}
            variant="outlined"
            className={styles.my_textfield}
            />
            <FormControl className={styles.my_form_control}  variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
              value={password}
              name='password'
              onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
                  </FormControl>
                  <div className={styles.links}>
                      <Link to='/reset-password'>
                      Forgot Pasword
                      </Link>
                      <Link to='/register'>
                      Register
                      </Link>
          </div>
           <Typography style={{color: 'red'}} variant="caption" display="block" gutterBottom>
       {message}
      </Typography>
          <Button onClick={handleSubmit} variant="contained"> {loading? <Loader
        type="Bars"
        color="#00BFFF"
        height={30}
        width={30}
         //3 secs
      />:   'Login' }</Button>
        
        </div>
      </Container>
    </div>
  );
};

export default Login;
