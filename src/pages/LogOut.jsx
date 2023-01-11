import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { authActions } from "store/auth";
const LogOut = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    localStorage.clear();
    console.log("hello logout");
    dispatch(authActions.logout());
    history.push("/");
  }, []);
  return;
};
export default LogOut;
