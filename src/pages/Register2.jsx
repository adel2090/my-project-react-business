import React from "react";
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
import Joi from "joi-browser";
const Register2 = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const autoLogin = useAutoLogin();

  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  //errors state
  const[errors,setErrors]=useState({});

  //-------myschema---------
  const registerSchema={
    name:Joi.string().min(2).max(100).required().label("Name"),
    email:Joi.string().email().min(6).max(100).required().label("Email"),
    password:Joi.string().min(6).max(20).required().label("Password"),
}

   // submit
   const validateForm = (ev) => {
    ev.preventDefault();
    //validation
    const { error } = validate(userInput, registerSchema);
    if (error) {
      const errorData={};
      for (let itemError of error.details) {
        const name = itemError.path[0];
        const message = itemError.message;
        errorData[name] = message;
      }
      console.log("massage error type:", errors);
      setErrors(errorData);
      return errorData;
    }

    //post api
    axios
      .post("/users/register", userInput)
      .then((res) => {
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
        history.push("/login");
      })
      .catch((err) => {
        console.log(
          "🚀 ~ file: Register.jsx ~ line 60 ~ handleSubmit ~ err",
          err
        );
        toast.error('register is failed', {
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

  const handleSave = (ev) => {
    // let copyUserInput = JSON.parse(JSON.stringify(userInput));
    // copyUserInput[ev.target.id] = ev.target.value;
    // setUserInput(copyUserInput);
    const { name, value } = ev.target;
    let errorData = { ...errors };
    const errorMessage = validateProperty(ev);
    if (errorMessage) {
      errorData[name] = errorMessage;
    } else {
      delete errorData[name];
    }
    let customerData = { ...userInput };
    customerData[name] = value;
    setUserInput(customerData);
    setErrors(errorData);
  };

  const validateProperty = (event) => {
    const { name, value } = event.target;
    const obj = { [name]: value };
    const subSchema = { [name]: registerSchema[name] };
    const result = Joi.validate(obj, subSchema);
    const { error } = result;
    return error ? error.details[0].message : null;
  };

  // const clearState = () => {
  //   setUserInput({
  //     name: "",
  //     email: "",
  //     password: "",
  //   });
  // };
 
  if(userService.getCurrentUser()) {
    history.push("/");
  }

  
  return (
   
    <div>
     <PageHeader titlePage="Register" />
      {/* <hr /> */}
      <form onSubmit={validateForm}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={userInput.name}
            onChange={handleSave}
          />
        </div>
        {errors.name && <div className="alert alert-danger">{errors.name}</div>}

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={userInput.email}
            onChange={handleSave}
          />
        </div>
        {errors.email && (
          <div className="alert alert-danger">{errors.email}</div>
        )}

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={userInput.password}
            onChange={handleSave}
          />
        </div>
        {errors.password && (
          <div className="alert alert-danger">{errors.password}</div>
        )}

        <div className="btn">
          <button
            type="submit"
            // onClick={validateForm}
            className="btn btn-success"
          >
            Add customer
          </button>
        </div>
      </form>
    </div>
  );
};
export default Register2;
