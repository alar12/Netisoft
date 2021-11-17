import {
  Container,
  Typography,
  FormControl,
  Button,
  OutlinedInput,
  IconButton,
} from "@mui/material";
import React, { useState } from "react";
import styles from "./Register.module.css";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import { Link } from "react-router-dom";
import axios from "axios";
import {useHistory} from 'react-router'
import Loader from "react-loader-spinner";


const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState('')
  const [first_name, setFirstName] = useState('')
  const [last_name, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const history = useHistory()
  
 const [loading, setLoading] = useState(false)



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
    if (name === 'first-name') {
      setFirstName(value)
    }
    if (name === 'last-name') {
      setLastName(value)
    }
    if (name === 'phone') {
      setPhone(value)
    }
    if (name === 'password') {
      setPassword(value)
    }

  }

  const handleSubmit = () => {
    setLoading(true)
    axios.post('https://photogalleryapi.herokuapp.com/api/register', {
      email: email,
      first_name: first_name,
      last_name: last_name,
      phone: phone,
      password: password,
      role: 'user'
    }).then((data) => {
      console.log(data.status)
      if (data.status == '201') {
        history.push('/')
        setLoading(false)
      }
    }).catch((error) => {
      console.log(error)
       setLoading(false)
    })
  }
  return (
    <div className={styles.login}>
      <Container maxWidth="sm">
        <div className={styles.login_content}>
          <div className={styles.login_heading}>
            <Typography variant="h4">Register</Typography>
          </div>

          <TextField
            id="outlined-basic"
            label="email"
            variant="outlined"
            className={styles.my_textfield}
            onChange={handleChange}
            value={email}
            name='email'
          />
          <TextField
            id="outlined-basic"
            label="First Name"
            variant="outlined"
            className={styles.my_textfield}
            onChange={handleChange}
            value={first_name}
            name='first-name'
          />
          <TextField
            id="outlined-basic"
            label="Last Name"
            variant="outlined"
            className={styles.my_textfield}
            onChange={handleChange}
            value={last_name}
            name='last-name'
          />
          <TextField
            id="outlined-basic"
            label="Phone Number"
            variant="outlined"
            className={styles.my_textfield}
            onChange={handleChange}
            value={phone}
            name='phone'
          />
          <FormControl className={styles.my_form_control} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handleChange}
               name='password'
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
            <Link to="/">Login</Link>
          </div>
          <Button onClick={handleSubmit} variant="contained">{loading? <Loader
        type="Bars"
        color="#00BFFF"
        height={30}
        width={30}
         //3 secs
      />:   'Register'}</Button>
        </div>
      </Container>
    </div>
  );
};

export default Register;
