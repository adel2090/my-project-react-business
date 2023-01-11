import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { authActions } from "store/auth";
import userService from "services/userService";

//<Route path="/createcard" component={CreateCard}></Route>
const ProtectedRoute = ({ path, component: Component, render, ...rest }) => {
    const currentUser = userService.getCurrentUser();
    console.log("🚀 ~ file: protectedRoute.jsx ~ line 10 ~ ProtectedRoute ~ currentUser", currentUser)
   

    return (
      <Route
        {...rest}
        render={props => {
          if (!currentUser || (rest.biz && !currentUser.biz))
            return (
              <Redirect
                to="/login"
              />
            );
          return Component ? <Component {...props} /> : render(props);
        }}
      />
    );
  };
   
  export default ProtectedRoute;
