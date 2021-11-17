import React, { Component, useEffect } from "react";
import { useState } from "react";
import axios from "axios";

export const DataCentral = React.createContext();
const PhotoGalleryApi = (props) => {
  const [auth, setAuth] = useState(false);
  const [jwt, setJwt] = useState();
  const [gallery, setGallery] = useState([]);
  const [user, setUser] = useState({})
  const [category, setCategory] = useState([])
  const [loading, setLoading] = useState(true);
  const [homeImages, setHomeImages] = useState([]);
  

   const handleGetHomeImages = () => {
    axios
      .get("https://photogalleryapi.herokuapp.com/api/gallery", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((data) => {
        console.log(data.status)
        if (data.status == '200') {
          setLoading(false)
        }
        setHomeImages(data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    handleGetCategory()
   
  }, []);

  useEffect(() => {
    handleGetImages();
  
     handleGetUser()
  }, [jwt])



  const handleGetCategory = async () => {
    
    const response = await axios.get('https://photogalleryapi.herokuapp.com/api/category', {
       headers: {
          "Authorization":`Bearer ${jwt}`,
     }
  
    })
      setCategory(response.data.data)
  }
  const handleGetUser = async () => {
   const response  = await  axios.get('https://photogalleryapi.herokuapp.com/api/user', {
       headers: {
          "Authorization":`Bearer ${jwt}`,
     }
    
   })
    
    setUser(response.data)
  }

  const handleGetImages = () => {
  
    axios
      .get("https://photogalleryapi.herokuapp.com/api/gallery", {
        headers: {
          "Authorization":`Bearer ${jwt}`,
        },
      })
      .then((data) => {
     
        setGallery(data.data.data);
      })
      .catch((err) => {
        console.log(err)
      });
  };

  return (
    <DataCentral.Provider
      value={{
        auth: auth,
        setAuth: setAuth,
        jwt: jwt,
        setJwt: setJwt,
        gallery: gallery,
        user: user,
        category: category,
        handleGetImages: handleGetImages,
        handleGetHomeImages: handleGetHomeImages,
        loading: loading,
        homeImages: homeImages,
     setHomeImages


      }}
    >
      {props.children}
    </DataCentral.Provider>
  );
};

export default PhotoGalleryApi;
