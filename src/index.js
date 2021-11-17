import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import PhotoGalleryApi from './components/context/Context.jsx'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";


ReactDOM.render(
  <React.StrictMode>
    <PhotoGalleryApi>
      <App />
    </PhotoGalleryApi>
  </React.StrictMode>,
  document.getElementById("root")
);


