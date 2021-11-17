import {
  Container,
  Typography,
  FormControl,
  Button,
  OutlinedInput,
  IconButton,
} from "@mui/material";
import React, { useState } from "react";
import styles from "./PasswordReset.module.css";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import { Link } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router";

const PasswordReset = ({ match }) => {
  console.log(match.params.email, match.params.hash);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const history = useHistory();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleChange = async (event) => {
    const { name, value } = event.target;
    if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async () => {
    const response = await axios.post(
      "https://photogalleryapi.herokuapp.com/api/reset_password",
      {
        email: match.params.email,
        hash: match.params.hash,
        password: password,
      }
      );
    if (response.status == 200) {
        history.push(`/`)
      }
      console.log(response)
  };
  return (
    <div className={styles.login}>
      <Container maxWidth="sm">
        <div className={styles.login_content}>
          <div className={styles.login_heading}>
            <Typography variant="h4">Reset Password</Typography>
          </div>
          <FormControl className={styles.my_form_control} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              value={password}
              name="password"
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

          <Button onClick={handleSubmit} variant="contained">
            Reset
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default PasswordReset;
