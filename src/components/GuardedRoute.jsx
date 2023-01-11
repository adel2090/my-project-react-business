import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
//<Route path="/createcard" component={CreateCard}></Route>
const GuardedRoute = ({ component: Component, ...rest }) => {
  //ifConeecting
  const isLogin = useSelector((state) => state.auth.isConnected);
  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin ? <Component {...props} /> : <Redirect to="/login" />
      }
    ></Route>
  );
};

export default GuardedRoute;
