import {
  Container,
  Typography,
  FormControl,
  InputAdornment,
  OutlinedInput,
  Button,
} from "@mui/material";
import React, { useContext, useEffect } from "react";
import styles from "./Home.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { photoData } from "../MockData";
import Masonry from "@mui/lab/Masonry";
import MasonryItem from "@mui/lab/MasonryItem";
import { useHistory } from "react-router";
import { DataCentral } from "./../context/Context";
import axios from "axios";
import Loader from "react-loader-spinner";

const Home = () => {
  const [search, setSearch] = useState("");
  const { jwt, homeImages, loading, handleGetHomeImages, setHomeImages } =
    useContext(DataCentral);

  const history = useHistory();

  const [title, setTitle] = useState("");
  const [category1, setCategory1] = useState([]);
  const [category2, setCategory2] = useState([]);
  const [category3, setCategory3] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "search") {
      setSearch(value);
    }
  };

  useEffect(() => {
    handleGetHomeImages();
  }, []);

  useEffect(() => {
    handlePuttingInCategories();
  }, [homeImages]);

  const handlePuttingInCategories = () => {
    const first_category = homeImages.filter((item) => {
      return item.category_id == 1;
    });
    setCategory1(first_category);
    const second_category = homeImages.filter((item) => {
      return item.category_id == 2;
    });
    setCategory2(second_category);
    const third_category = homeImages.filter((item) => {
      return item.category_id == 3;
    });
    setCategory3(third_category);
  };

  const handleSearch = async () => {
    const response = await axios.get(
      `https://photogalleryapi.herokuapp.com/api/gallery/search/${search}`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    setHomeImages(response.data.data);
  };

  const handleSelectImage = (id) => {
    history.push(`/image/${id}`);
  };
  return (
    <div className={styles.home}>
      <Container maxWidth="md">
        <div className={styles.home_content}>
          <div className={styles.home_heading}>
            <FormControl sx={{ width: "35ch" }} variant="outlined">
              <OutlinedInput
                id="outlined-adornment-weight"
                value={search}
                onChange={handleChange}
                name="search"
                endAdornment={
                  <InputAdornment onClick={handleSearch} position="end">
                    Search
                  </InputAdornment>
                }
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "weight",
                }}
              />
            </FormControl>
            <div className={styles.right_content}>
              <Link to="/list">
                <Button variant="contained" href="#contained-buttons">
                  Photo List
                </Button>
              </Link>
              <Link to="/add-image">
                <Button variant="contained" href="#contained-buttons">
                  Add Photo
                </Button>
              </Link>
            </div>
          </div>
          <div className={styles.masonry}>
            {loading ? (
              <Loader
                type="Bars"
                color="#00BFFF"
                height={100}
                width={100}
                //3 secs
              />
            ) : (
              <>
                <div>
                  <Typography variant="h4" gutterBottom>
                    {category1.length == "0" ? (
                      <Typography variant="h4">
                        No image in Mountain
                      </Typography>
                    ) : (
                      <Typography variant="h4"> Mountain </Typography>
                    )}
                  </Typography>
                  <Masonry columns={3} spacing={1}>
                    {category1.map((item) => (
                      <MasonryItem
                        onClick={() => {
                          handleSelectImage(item.id);
                        }}
                        key={item.id}
                      >
                        <>
                          <img
                            src={`${item.url}?w=162&auto=format`}
                            srcSet={`${item.url}?w=162&auto=format&dpr=2 2x`}
                            alt={item.title}
                          />
                        </>
                      </MasonryItem>
                    ))}
                  </Masonry>
                </div>

                <div>
                  <Typography variant="h4" gutterBottom>
                    {category2.length == "0" ? (
                      <Typography variant="h4">
                        No image in Sport
                      </Typography>
                    ) : (
                      <Typography variant="h4"> Sport </Typography>
                    )}
                  </Typography>
                  <Masonry columns={3} spacing={1}>
                    {category2.map((item) => (
                      <MasonryItem
                        onClick={() => {
                          handleSelectImage(item.id);
                        }}
                        key={item.id}
                      >
                        <>
                          <img
                            src={`${item.url}?w=162&auto=format`}
                            srcSet={`${item.url}?w=162&auto=format&dpr=2 2x`}
                            alt={item.title}
                          />
                        </>
                      </MasonryItem>
                    ))}
                  </Masonry>
                </div>

                <div>
                  <Typography variant="h4" gutterBottom>
                    {category3.length == "0" ? (
                      <Typography variant="h4">
                        No image in Movies
                      </Typography>
                    ) : (
                      <Typography variant="h4"> Movies </Typography>
                    )}
                  </Typography>
                  <Masonry columns={3} spacing={1}>
                    {category3.map((item) => (
                      <MasonryItem
                        onClick={() => {
                          handleSelectImage(item.id);
                        }}
                        key={item.id}
                      >
                        <>
                          <img
                            src={`${item.url}?w=162&auto=format`}
                            srcSet={`${item.url}?w=162&auto=format&dpr=2 2x`}
                            alt={item.title}
                          />
                        </>
                      </MasonryItem>
                    ))}
                  </Masonry>
                </div>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Home;
