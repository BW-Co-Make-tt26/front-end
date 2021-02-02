import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import schema from "../validation/IssueForm";
import { axiosWithAuth } from '../utils/axiosWithAuth'

const initialFormValues = {
  issue: "",
  description: "",
  image: "",
  city: "",
  state: "",
  zipcode: "",
};

const initialFormErrors = {
  issue: "",
  description: "",
  city: "",
  state: "",
  zipcode: "",
};

const initialDisabled = true;

export default function NewIssueForm(props) {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);

  const [issues, setIssues] = useState([])

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


  const update = (evt) => {
    const { name, value } = evt.target;
    updateForm(name, value);
  };


  const addIssue = () => {
    const user = JSON.parse(localStorage.getItem('user'))

    const newIssue = {
      issue: formValues.issue,
      description: formValues.description,
      image: formValues.image,
      city: formValues.city,
      state: formValues.state,
      zipcode: formValues.zipcode,
      user_id: user.user_id
    }

    axiosWithAuth()
    .post('/api/issues', newIssue)
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
    history.push('/issue-board')
    console.log(newIssue)
  }

  const goBack = () => {
    history.goBack()
  }

  return (
      <>
        <div className="headerContainer">
          <h3>Issue Form</h3>
        </div>
        <form className="formContainer" onSubmit={addIssue}>
          <div className="inputContainer">
            <label>
              Issue
              <input
                name="issue"
                type="text"
                value={formValues.issue}
                onChange={update}
              />
            </label>
            <br />
            <label>
              Description
              <textarea
                name="description"
                value={formValues.description}
                onChange={update}
              />
            </label>
            <br />
            <label>
              Image
              <input
                name="image"
                type="file"
                //   not sure if correct type
                value={formValues.image}
                onChange={update}
              />
            </label>
            <br />
            <label>
              City
              <input
                name="city"
                type="text"
                value={formValues.city}
                onChange={update}
              />
            </label>
            <label>
              State
              <input
                name="state"
                type="text"
                maxLength={2}
                value={formValues.state}
                onChange={update}
              />
            </label>
            <br />
            <label>
              Zipcode
              <input
                name="zipcode"
                type="text"
                maxLength={5}
                value={formValues.zipcode}
                onChange={update}
              />
            </label>
          </div>
          <button className="submitBtn" disabled={disabled}>
            Submit Issue
          </button>
          <div className="errorContainer">
            <div>{formErrors.issue}</div>
            <div>{formErrors.description}</div>
            <div>{formErrors.city}</div>
            <div>{formErrors.state}</div>
            <div>{formErrors.zipcode}</div>
          </div>
        </form>
        <button onClick={goBack}>Back</button>
    </>
  );
}
