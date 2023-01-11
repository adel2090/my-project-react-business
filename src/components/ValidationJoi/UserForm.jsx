import React, { useState } from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";

function UserForm(props) {
    // ---------------state---------------
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

//   -------schema------------
  const schema = {
    name:Joi.string().min(2).max(100).required().label("Name"),
    email:Joi.string().email().min(6).max(100).required().label("Email"),
    password:Joi.string().min(6).max(20).required().label("Password"),
  };

  //--------------submit----------------
  const validateForm = (event) => {
    event.preventDefault();
    const result = Joi.validate(userInput, schema, { abortEarly: false });
    console.log(result);
    const { error } = result;
    if (!error) {
      return null;
    } else {
      const errorData = {};
      for (let item of error.details) {
        const name = item.path[0];
        const message = item.message;
        errorData[name] = message;
      }
      console.log(errors);
      setErrors(errorData);
      return errorData;
    }
  };

  const handleSave = (event) => {
    const { name, value } = event.target;
    let errorData = { ...errors };
    const errorMessage = validateProperty(event);
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
    const subSchema = { [name]: schema[name] };
    const result = Joi.validate(obj, subSchema);
    const { error } = result;
    return error ? error.details[0].message : null;
  };
  const clearState = () => {
    setUserInput({
      name: "",
      email: "",
      password: "",
    });
  };
  return (
    <div>
      <h3>Add Customer</h3>
      <hr />
      <form className="ui form">
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
            onClick={validateForm}
            className="btn btn-success"
          >
            Add customer
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserForm;
