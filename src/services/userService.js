import axios from "axios";
import jwtDecode from "jwt-decode";
import jwt_decode from "jwt-decode";
const tokenKey = "token";

const logout = () => {
  localStorage.clear();
};

// return dataFromToken
const getCurrentUser = () => {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwt_decode(jwt);
    //return jwtDecode(jwt);
  } catch (error) {
    return null;
  }
};

const loginSave = async (email, password) => {
  const { data } = await axios.post("/users/login", { email, password });
  localStorage.setItem(tokenKey, data.token);
};

export default { loginSave, getCurrentUser, logout };
