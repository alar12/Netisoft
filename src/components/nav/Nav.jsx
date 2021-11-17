import { Container, Button } from "@mui/material";
import React, {useContext} from "react";
import styles from './Nav.module.css'
import {Link} from 'react-router-dom'
import { DataCentral } from './../context/Context';

const Nav = () => {
  const {user} = useContext(DataCentral)
  return (
    <nav className={styles.nav}>
      <Container >
              <div className={styles.nav_content}>
                  <Link to='/home'>
                  Home
          </Link>
          <Button variant="text">Welcome {user.first_name}</Button>
        </div>
      </Container>
    </nav>
  );
};

export default Nav;
