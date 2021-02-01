import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import axios from "axios";
import schema from "../validation/IssueForm";

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

export default function NewIssueForm() {
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

  const postFormValues = (issueInfo) => {
    axios
      .post("/api/issues", issueInfo)
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
    history.push("");
  };
  const update = (evt) => {
    const { name, value } = evt.target;
    updateForm(name, value);
  };

  return (
    <div className="issueFormContainer" onSubmit={onSubmit}>
      <div className="headerContainer">
        <h3>Issue Form</h3>
      </div>
      <form className="formContainer">
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
    </div>
  );
}
