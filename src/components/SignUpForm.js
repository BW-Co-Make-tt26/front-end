import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import axios from "axios";
import schema from "../validation/SignUpIn";

const initialFormValues = {
  first_name: "",
  last_name: "",
  username: "",
  email: "",
  password: "",
};

const initialFormErrors = {
  first_name: "",
  last_name: "",
  username: "",
  email: "",
  password: "",
};

const initialDisabled = true;

export default function SignUpForm() {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);

  const history = useHistory();

  const updateForm = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then(() => {
        setFormErrors({
          ...formErrors,
          [name]: "",
        });
      })
      .catch((err) => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0],
        });
      });
    setFormValues({ ...formValues, [name]: value });
  };

  const postFormValues = (userInfo) => {
    axios
      .post("/api/users/register", userInfo)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    schema.isValid(formValues).then((valid) => {
      setDisabled(!valid);
    });
  }, [formValues]);

  const onSubmit = (evt) => {
    evt.preventDefault();
    postFormValues(formValues);
    history.push("/?");
  };
  const update = (evt) => {
    const { name, value } = evt.target;
    updateForm(name, value);
  };

  return (
    <div className="signUpContainer" onSubmit={onSubmit}>
      <div className="headerContainer">
        <h3>Sign Up Form</h3>
      </div>
      <form className="formContainer">
        <div className="inputContainer">
          <label>
            First Name
            <input
              name="first_name"
              type="text"
              value={formValues.first_name}
              onChange={update}
            />
          </label>
          <br />
          <label>
            Last Name
            <input
              name="last_name"
              type="text"
              value={formValues.last_name}
              onChange={update}
            />
          </label>
          <br />
          <label>
            Username
            <input
              name="username"
              type="text"
              value={formValues.username}
              onChange={update}
            />
          </label>
          <br />
          <label>
            Email
            <input
              name="email"
              type="email"
              value={formValues.email}
              onChange={update}
            />
          </label>
          <br />
          <label>
            Password
            <input
              name="password"
              type="password"
              value={formValues.password}
              onChange={update}
            />
          </label>
        </div>
        <button className="signUpBtn" disabled={disabled}>
          Sign up
        </button>
        <div className="errorContainer">
          <div>{formErrors.first_name}</div>
          <div>{formErrors.last_name}</div>
          <div>{formErrors.username}</div>
          <div>{formErrors.email}</div>
          <div>{formErrors.password}</div>
        </div>
      </form>
    </div>
  );
}
