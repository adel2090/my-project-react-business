import { useState } from "react";
import validate from "validation/validation";
import loginSchema from "validation/login.validation";
import { authActions } from "store/auth";
import axios from "axios";
import { useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import PageHeader from "components/common/PageHeader";
import userService from "services/userService";
import useAutoLogin from "../hooks/useAutoLogin";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const autoLogin = useAutoLogin();
  const history = useHistory();

  const handleUserInputChange = (ev) => {
    let copyUserInput = JSON.parse(JSON.stringify(userInput));
    copyUserInput[ev.target.id] = ev.target.value;
    setUserInput(copyUserInput);
  };

  // btn sub
  const handleSubmit = async (ev) => {
    ev.preventDefault();

    //validation
    const { error } = validate(userInput, loginSchema);
    console.log("error validation:", { error });
    if (error) {
      let massageError = "";
      for (let itemError of error.details) {
        switch (itemError.type) {
          case "string.min":
            massageError += `${itemError.context.label} length must be at least ${itemError.context.limit} characters long`;
            break;
          case "string.max":
            massageError += `${itemError.context.label} length must be less than or equal to ${itemError.context.limit} characters long`;
            break;
          default:
            massageError += "massage error dont have type";
            break;
        }
      }
      console.log("massage error type:", massageError);
    }
    //post api

    // try {
    //   await userService.loginSave(userInput.email, userInput.password);
    //   autoLogin()
    //   window.location="/";
    // } catch (error) {
    //   console.log("🚀 ~ file: Login.jsx ~ line 56 ~ handleSubmit ~ error", error)

    // }
    axios
      .post("/users/login", userInput)
      .then((res) => {
        localStorage.setItem("token", res.data.token); // save local storage the token
        autoLogin(res.data.token); // call autoLogin with token
        history.push("/");
        
      })
      .catch((err) => {
        
        toast.error('check your name or password', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
    });
  };



  //if the user connected
  if(userService.getCurrentUser()) {
    history.push("/");
  }
  return (
   
    <form onSubmit={handleSubmit}>
      <PageHeader titlePage="Login" />
      {/* --------------------------- */}

      <div className="form-floating mb-3">
        <input
          type="email"
          className="form-control"
          id="email"
          placeholder="name@example.com"
          value={userInput.email}
          onChange={handleUserInputChange}
        />
        <label htmlFor="email">Email address</label>
      </div>

      <div className="form-floating mb-3">
        <input
          type="password"
          className="form-control"
          id="password"
          placeholder="password"
          value={userInput.password}
          onChange={handleUserInputChange}
        />
        <label htmlFor="password">password</label>
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};
export default Login;
