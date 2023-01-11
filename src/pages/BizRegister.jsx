import { useState } from "react";
import validate from "validation/validation";
import registerSchema from "validation/register.validation";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "store/auth";
import { useHistory } from "react-router-dom";
import PageHeader from "components/common/PageHeader";
import { toast } from "react-toastify";
import useAutoLogin from "../hooks/useAutoLogin";
import { Redirect } from "react-router-dom";
import userService from "services/userService";

const BizRegister = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const autoLogin = useAutoLogin();

  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleUserInputChange = (ev) => {
    let copyUserInput = JSON.parse(JSON.stringify(userInput));
    copyUserInput[ev.target.id] = ev.target.value;
    setUserInput(copyUserInput);
  };

  // btn sub
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    console.log(userInput);
    //const{data}=
    //validation
    const { error } = validate(userInput, registerSchema);
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

    try {
      await axios.post("/users/register", { ...userInput, biz: true });
      await userService.loginSave(userInput.email, userInput.password);
      toast.success("A new account is opened!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      history.push("/createcard");
    } catch (error) {
      toast.error('registerBusiness is failed', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    }
  
  };

  if (userService.getCurrentUser()) {
    history.push("/");
  }

  return (
    <form onSubmit={handleSubmit}>
      <PageHeader titlePage="Business Registration Form" />

      {/* --------------------------- */}
      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          id="name"
          placeholder="name"
          value={userInput.name}
          onChange={handleUserInputChange}
        />
        <label htmlFor="name">UserName</label>

        {/* <span className="text-danger">*ad</span> */}
      </div>

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
        Next
      </button>
    </form>
  );
};
export default BizRegister;
