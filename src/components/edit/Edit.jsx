import {
  Container,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Radio,
  RadioGroup,
} from "@mui/material";
import React, { useState, useEffect, useContext, useRef } from "react";
import styles from "./Edit.module.css";
import { photoData } from "./../MockData";
import axios from "axios";
import { Link } from "react-router-dom";
import { DataCentral } from "./../context/Context";
import FormData from "form-data";
 import { useHistory } from "react-router";

const Edit = ({ match }) => {
  
 const history =useHistory()
  const [exactImage, setExactImage] = useState();
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const { jwt, setJwt, gallery, category, handleGetImages, handleGetHomeImages } = useContext(DataCentral);

  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [place_where_shot, setPlaceWhereShot] = useState("");
  const [my_image, setImage] = useState("");
  const [dateTaken, setDateTaken] = useState("");
  const [category_id, setCategory] = useState(Number);
  const [privacy, setPrivacy] = useState("");
  const fileInput = useRef();
  const [file, setFile] = useState();
 

  const handleChange = (event) => {};

   const handleRadioBtnChange = (id) => {
   
    setCategory(id);
  };
  const handleInputTextChange = (event) => {
    const { name, value } = event.target;
    if (name === "title") {
      setTitle(value);
    }
    if (name === "description") {
      setDescription(value);
    }
    if (name === "keywords") {
      setKeywords(value);
    }
    if (name === "dateTaken") {
      setDateTaken(value);
    }
    if (name === "place-where-shot") {
      setPlaceWhereShot(value);
    }
  };

  const handleFileChange = () => {
    setFile(fileInput.current.files[0]);
  };

  const handleSubmit = () => {
let formData = new FormData();

    //Adding files to the formdata
    formData.append("image", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category_id", category_id);
    formData.append("keywords", keywords);
    formData.append("place_where_shot", place_where_shot);
    formData.append("status", 1);

    axios({
      // Endpoint to send files
      url: `https://photogalleryapi.herokuapp.com/api/gallery/update/${match.params.id}`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },

      // Attaching the form data
      data: formData,
    })
      .then((res) => {
       handleGetHomeImages()
        history.push('/list')
        handleGetImages()
      }) // Handle the response from backend here
      .catch((err) => {
        console.log(err);
      }); // Catch errors if any
  };


  useEffect(() => {
    
    handleGetExactImage();
  }, []);

  useEffect(() => {
    if (loading) {
    } else {
      //handlePrepopulation();
    }
  }, [exactImage]);

  const handlePrepopulation = () => {
    setTitle(exactImage.title);
    setDescription(exactImage.description)
    setKeywords(exactImage.keywords)
    setDateTaken(exactImage.created_at)
    setPlaceWhereShot(exactImage.place_where_shot);
    setFile(exactImage.name)
    
  };

  const handleGetExactImage = () => {
    if (gallery.length === 0) {
      setLoading(true);
    } else {
      const exactImage = gallery.find((item) => {
        return item.id == match.params.id;
      });

      setExactImage(exactImage);
      setLoading(false)
    }
  };

  return (
    <div className={styles.edit}>
      <Container>
        <div className={styles.edit_content}>
          <div className={styles.go_back}>
            <Link to="/list">
              <Button href="#text-buttons">Go Back</Button>
            </Link>
          </div>

          {loading ? (
            <Typography variant="h4"> Loading </Typography>
          ) : (
            <>
              {" "}
              <div className={styles.edit_heading}>
                <Typography variant="h4">Edit Image Details</Typography>
              </div>
              <div className={styles.add_img_form}>
                <div className={styles.my_input}>
                  <label htmlFor="">Title:</label>
                  <input
                    value={title}
                    name="title"
                    onChange={handleInputTextChange}
                    type="text"
                  />
                </div>

                <div className={styles.my_input}>
                  <label htmlFor="">Description:</label>
                  <input
                    name="description"
                    value={description}
                    onChange={handleInputTextChange}
                    type="text"
                  />
                </div>
                <div className={styles.form_category}>
                  <div className={styles.aspect_title}>
                    <Typography>Categories:</Typography>
                  </div>
                  <RadioGroup
                    aria-label="gender"
                    defaultValue="female"
                    name="radio-buttons-group"
                  >
                   {category.map((cate) => {
                  return (
                    <FormControlLabel
                      key={cate.id}
                      control={
                        <Radio
                          
                          value={cate.name}
                          onChange={() => {
                            handleRadioBtnChange(cate.id);
                          }}
                          name="category"
                        />
                      }
                      label={cate.name}
                    />
                  );
                })}
                  </RadioGroup>
                </div>
                <div className={styles.my_input}>
                  <label htmlFor="">Keywords:</label>
                  <input
                    name="keywords"
                    value={keywords}
                    onChange={handleInputTextChange}
                    type="text"
                  />
                </div>
                <div className={styles.form_privacy}>
                  <div className={styles.aspect_title}>
                    <Typography>Privacy:</Typography>
                  </div>

                  <RadioGroup
                    aria-label="gender"
                    defaultValue="female"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      control={
                        <Radio
                          value="public"
                          
                          name="privacy"
                        />
                      }
                      label="public"
                    />
                    <FormControlLabel
                      control={
                        <Radio
                          value="private"
                          
                          name="privacy"
                        />
                      }
                      label="private"
                    />
                  </RadioGroup>
                </div>

               
                <div className={styles.my_input}>
                  <label htmlFor="">Place where shot:</label>
                  <input
                    name="place-where-shot"
                    value={place_where_shot}
                    onChange={handleInputTextChange}
                    type="text"
                  />
                </div>
                <div className={styles.my_input}>
                  <label htmlFor="">Upload Image:</label>
                  <input
                    onChange={handleFileChange}
                    ref={fileInput}
                    type="file"
                  />
                </div>
                <div className={styles.form_btn}>
                  <Button onClick={handleSubmit} variant="contained">
                    Save
                  </Button>
                </div>
              </div>{" "}
            </>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Edit;
