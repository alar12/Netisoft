import { Container, Typography, Button } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import styles from "./ImageList.module.css";
import { photoData } from "../MockData";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { DataCentral } from './../context/Context';
import axios  from 'axios';
import Loader from "react-loader-spinner";
import Moment from 'react-moment';


const ImageList = () => {
   const { jwt, setJwt, gallery, handleGetImages, category } = useContext(DataCentral);
const [loading, setLoading] = useState(false)
  const history = useHistory()


 




  const handleGoToEdit = (id) => {
    history.push(`/edit-image/${id}`)
  }
  const handleDelete = async (id) => {
    setLoading(true)
    const response = await axios.delete(`https://photogalleryapi.herokuapp.com/api/gallery/delete/${id}`, {
       headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
    try {
      console.log(response)
    handleGetImages()
  setLoading(false)
    } catch (error) {
      setLoading(false)
    }
    
  }
  return (
    <div className={styles.home}>
      <Container maxWidth="md">
        <div className={styles.home_content}>
          <div className={styles.home_content_heading}>
            <Typography variant="h4">Manage Photos</Typography>
            <Link to="/add-image">
              <Button variant="contained" href="#contained-buttons">
                Add Photo
              </Button>
            </Link>
          </div>
          <div className={styles.home_content_table}>
            <table>
              <thead>
                <td>Image</td>
                <td>Description</td>
                <td>Category</td>
                <td>Uploaded on</td>
                <td>Edit</td>
                <td>Delete</td>
              </thead>
              <tbody>
                {gallery.map((imageContent) => {
                  return (
                    <tr key={imageContent.id} >
                      <td>{imageContent.title}</td>
                      <td>{imageContent.description}</td>
                      <td>{imageContent.category.name}</td>
                      <td> <Moment>{imageContent.created_at}</Moment></td>
                      <td>
                        <Button onClick={() => { handleGoToEdit(imageContent.id)}} key={imageContent.id} variant="outlined">Edit</Button>
                      </td>
                      <td>
                        <Button onClick={()=>{handleDelete(imageContent.id)}}  variant="outlined"> Delete</Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ImageList;
