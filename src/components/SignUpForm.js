import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import schema from "../validation/SignUpIn";
import { Link} from 'react-router-dom'
import { axiosWithAuth } from "../utils/axiosWithAuth";
import styled from "styled-components";

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

  const submitForm = () => {
    postFormValues(formValues);
    history.push('/')
  }

  const postFormValues = (userInfo) => {
    axiosWithAuth()
      .post("api/users/register", userInfo)
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
    submitForm();
  };

  const update = (evt) => {
    const { name, value } = evt.target;
    updateForm(name, value);
  };

  return (
    <Container className="signUpContainer" onSubmit={onSubmit}>
      <div className="headerContainer">
        <h3>Sign Up</h3>
      </div>
      <form className="formContainer">
        <div className="inputContainer">
          <label>
            <input
              name="first_name"
              type="text"
              value={formValues.first_name}
              onChange={update}
              placeholder='First Name'
            />
          </label>
          <br />
          <label>
            <input
              name="last_name"
              type="text"
              value={formValues.last_name}
              onChange={update}
              placeholder='Last Name'
            />
          </label>
          <br />
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
              name="email"
              type="email"
              value={formValues.email}
              onChange={update}
              placeholder='Email'
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
      <Link to='/'>
        Login
      </Link>
    </Container>
  );
}

const Container = styled.div `
  width: 30%;
  margin: auto; 
  text-align: center;
`

