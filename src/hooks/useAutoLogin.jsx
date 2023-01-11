import { useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import { authActions } from "store/auth";

const useAutoLogin = () => {
  const dispatch = useDispatch();

  const autoLogin = async (token) => {
    try {
      const dataUserFromToken = jwt_decode(token);
      dispatch(authActions.login(dataUserFromToken)); // update redux the data of user
      return true;
    } catch (error) {
      return false;
    }
  };
  return autoLogin;
};

export default useAutoLogin;
