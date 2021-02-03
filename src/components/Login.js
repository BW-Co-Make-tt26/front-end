import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import schema from "../validation/logInValidation";
import { Link } from 'react-router-dom'
import { axiosWithAuth } from "../utils/axiosWithAuth";

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

  useEffect(() => {
    schema.isValid(formValues).then((valid) => {
      setDisabled(!valid);
    });
  }, [formValues]);

  const handleLogin = e => {
    e.preventDefault();
    axiosWithAuth()
      .post("api/users/login", formValues)
      .then(res => {
        console.log(res)
        props.setIsLoggedIn(true)
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.data))
        history.push("/issue-board")
    })
      .catch(err => {
        console.log(err)
    })
  }

  const update = (evt) => {
    const { name, value } = evt.target;
    updateForm(name, value);
  };

  return (
    <div className="loginContainer" onSubmit={handleLogin}>
      <div className="headerContainer">
        <h3>Login</h3>
      </div>
      <form className="formContainer">
        <div className="inputContainer">
          <label>
            
            <input
              name="username"
              type="text"
              value={formValues.username}
              onChange={update}
              placeholder='Username'
            />
          </label>
          <br />
          <label>
            
            <input
              name="password"
              type="password"
              value={formValues.password}
              onChange={update}
              placeholder='Password'
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
