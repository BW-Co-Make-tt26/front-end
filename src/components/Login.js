import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import axios from "axios";
import schema from "../validation/logInValidation";
import { Link } from 'react-router-dom'

const initialFormValues = {
  username: "",
  password: "",
};

const initialFormErrors = {
  username: "",
  password: "",
};

const initialDisabled = true;

export default function Login(props) {
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

  // const postFormValues = (userInfo) => {
  //   axios
  //     .post("https://co-make-app-tt26.herokuapp.com/api/users/login", userInfo)
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  useEffect(() => {
    schema.isValid(formValues).then((valid) => {
      setDisabled(!valid);
    });
  }, [formValues]);

  // const onSubmit = (evt) => {
  //   evt.preventDefault();
  //   postFormValues(formValues);
  //   history.push("/");
  // };

  const update = (evt) => {
    const { name, value } = evt.target;
    updateForm(name, value);
  };

  const handleLogin = e => {
    e.preventDefault();
    axios.post("https://co-make-app-tt26.herokuapp.com/api/users/login", formValues)
    .then(res => {
      console.log(res)
      localStorage.setItem("token", res.data.payload);
      history.push("/issue-board")
    })
    .catch(err => {
      console.log(err)
    })
  }

  return (
    <div className="loginContainer" onSubmit={handleLogin}>
      <div className="headerContainer">
        <h3>Login Form</h3>
      </div>
      <form className="formContainer">
        <div className="inputContainer">
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
            Password
            <input
              name="password"
              type="password"
              value={formValues.password}
              onChange={update}
            />
          </label>
        </div>
        <button className="loginBtn" disabled={disabled}>
          Login
        </button>
        <div className="errorContainer">
          <div>{formErrors.username}</div>
          <div>{formErrors.password}</div>
        </div>
      </form>
      <Link to='/sign-up'>
        <p>Create an account</p>
      </Link>
    </div>
  );
}
