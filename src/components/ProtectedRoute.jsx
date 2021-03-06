import React from "react";
import { Redirect, Route } from "react-router-dom";

function ProtectedRoute({ component: Component,jwt, ...restOfProps }) {
  const isAuthenticated = jwt
  //console.log(jwt);

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
}

export default ProtectedRoute;