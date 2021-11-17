import {
  Container,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  RadioGroup,
  Radio,
} from "@mui/material";
import React, { useState, useEffect, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./AddImages.module.css";
import axios from "axios";
import { DataCentral } from "./../context/Context";
import FormData from "form-data";
import { useHistory } from "react-router";
import Loader from "react-loader-spinner";
import Tesseract from 'tesseract.js';


const AddImages = () => {
  const { jwt, setJwt, auth, category, handleGetImages } = useContext(DataCentral);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [place_where_shot, setPlaceWhereShot] = useState("");
  const [file, setFile] = useState();
  const [dateTaken, setDateTaken] = useState("");
  const [category_id, setCategory] = useState(Number);
  const [privacy, setPrivacy] = useState("");
  const fileInput = useRef();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [patterns, setPatterns] = useState("");
  const [confidence, setConfidence] = useState("");
  const [ocrText, setOCRText] = useState("");
 
  
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

  const handleFileChange = (event) => {
    const { name, value, files } = event.target;
    setFile(files[0]);
  };

  ;
  const handleSubmit = () => {
    
    setLoading(true);
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
      url: `https://photogalleryapi.herokuapp.com/api/gallery/create`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },

      // Attaching the form data
      data: formData,
    })
      .then((res) => {
        console.log(res);
        handleGetImages();
        history.push("/home");
      }) // Handle the response from backend here
      .catch((err) => {
        console.log(err);
        setLoading(false);
      }); // Catch errors if any
  };

  return (
    <div className={styles.add_img}>
      <Container maxWidth="md">
        <div className={styles.add_img_content}>
          <div className={styles.add_img_content_heading}>
            <Typography variant="h4">Add Photo</Typography>
            <Link to="/list">
              <Button variant="contained">Photo List</Button>
            </Link>
          </div>
          <div className={styles.add_img_form}>
            <div className={styles.my_input}>
              <label htmlFor="">Title:</label>
              <input
                name="title"
                value={title}
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
                  control={<Radio value="public" name="privacy" />}
                  label="public"
                />
                <FormControlLabel
                  control={<Radio value="private" name="privacy" />}
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
              <input onChange={handleFileChange} type="file" />
            </div>
            <div className={styles.form_btn}>
              <Button onClick={handleSubmit} variant="contained">
                {loading ? (
                  <Loader
                    type="Bars"
                    color="#00BFFF"
                    height={30}
                    width={30}
                    //3 secs
                  />
                ) : (
                  "Save"
                )}
              </Button>
           
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AddImages;
