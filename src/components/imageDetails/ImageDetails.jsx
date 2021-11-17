import { Container, Button, Typography } from "@mui/material";
import React, { useState, useContext } from "react";
import styles from "./ImageDetails.module.css";
import { photoData } from "../MockData";
import { useEffect } from "react";
import axios from "axios";
import { DataCentral } from "./../context/Context";
import Loader from "react-loader-spinner";
import Tesseract from "tesseract.js";
import { useHistory } from "react-router";


const ImageDetails = ({ match }) => {
  const [gallery, setGallery] = useState(photoData);
  const [exactImage, setExactImage] = useState();
  const [loading, setLoading] = useState(true);
  const { jwt, setJwt, category } = useContext(DataCentral);
  const [ocrText, setOcrText] = useState("");
  const [confidence, setConfidence] = useState("");
  const [ocrLoader, setOcrLoader] = useState(false);
 const history = useHistory();
  useEffect(() => {
    handleGetImage();
 
  
  }, []);

  useEffect(() => {
    if (exactImage == undefined) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [exactImage]);

  const handleGetImage = () => {
    axios
      .get(
        `https://photogalleryapi.herokuapp.com/api/gallery/single/${match.params.id}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      )
      .then((data) => {
        setExactImage(data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleTesseract = () => {
    setOcrLoader(true);
    axios
      .get(
        `https://photogalleryapi.herokuapp.com/api/gallery/getbasegallery/${match.params.id}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      )
      .then((data) => {
      
        Tesseract.recognize(data.data.data, "eng", {
          // logger: (m) => console.log(m),
        }).then(({ data: { text, confidence } }) => {
         
          setOcrText(text);
          setConfidence(confidence);
          setOcrLoader(false);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
 

  return (
    <div className={styles.image_details}>
      <Container maxWidth="md">
        {loading ? (
          <Loader
            type="Bars"
            color="#00BFFF"
            height={100}
            width={100}
            //3 secs
          />
        ) : (
          <div className={styles.image_details_Content}>
            <div className={styles.image_title}>
              <Typography variant="h4">TITLE: {exactImage.title}</Typography>
            </div>
            <div className={styles.image_img}>
              <img src={exactImage.url} alt={exactImage.title} />
            </div>
            <div className={styles.image_description}>
              <Typography>DESCRIPTION: {exactImage.description}</Typography>
            </div>
            <div className={styles.ocr_btn}>
              <Button variant="outlined" onClick={handleTesseract}>
                {ocrLoader ? (
                  <Loader
                    type="Bars"
                    color="#00BFFF"
                    height={20}
                    width={20}
                    //3 secs
                  />
                ) : (
                  "Generate OCR"
                )}
              </Button>
            </div>
            <Typography variant="overline" display="block" gutterBottom>
              {ocrText}
            </Typography>
            {confidence && (
              <Typography variant="caption" display="block" gutterBottom>
                OCR result is {confidence}% accurate
              </Typography>
            )}
          </div>
        )}
      </Container>
    </div>
  );
};

export default ImageDetails;
