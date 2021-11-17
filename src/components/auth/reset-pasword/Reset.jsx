import {
  Container,
  Typography,
  FormControl,
  Button,
  OutlinedInput,
  IconButton,
} from "@mui/material";
import React, { useState } from "react";
import styles from "./Reset.module.css";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import { Link } from "react-router-dom";
import axios from "axios"
import { useHistory } from 'react-router';


const Reset = () => {
  
  const [email, setEmail] = useState('')
  const history = useHistory()
 
  const handleChange =  (event) => {
    const {name, value}= event.target
    
    if (name === 'email') {
      setEmail(value)
    }
  }


  const handleSubmit = async () => {
    const response = await axios.get(`https://photogalleryapi.herokuapp.com/api/send_password_recovery_email/${email}`)
    if (response.data.status) {
      history.push(`${response.data.url}`)
    }
  }
  return (
    <div className={styles.login}>
      <Container maxWidth="sm">
        <div className={styles.login_content}>
          <div className={styles.login_heading}>
            <Typography variant="h4">Reset Password</Typography>
          </div>
           <TextField
              id="outlined-basic"
            label="Email"
            name='email'
            value={email}
            onChange={handleChange}
                      variant="outlined"
                      className={styles.my_textfield}
            />
                  
            <Button onClick={handleSubmit} variant="contained">Reset</Button>
        
        </div>
      </Container>
    </div>
  );
};

export default Reset;
