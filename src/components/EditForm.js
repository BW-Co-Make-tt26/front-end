import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import * as yup from "yup";
import schema from "../validation/IssueForm";
import {axiosWithAuth} from '../utils/axiosWithAuth'

//make a use effect that sets the initial form values to the issue you clicked edit on
//using useParams somehow. It'll work! Probably! That way you can just edit what was
//there before and it is 'put' into the api to be rendered out as what it was!



const initialFormValues = {
  issue: '',
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

export default function EditForm(props) {
    const [formValues, setFormValues] = useState(initialFormValues);
    const [formErrors, setFormErrors] = useState(initialFormErrors);
    const [disabled, setDisabled] = useState(initialDisabled);
    
    const history = useHistory();
    const {id} = useParams();
    
    useEffect(() => {
        axiosWithAuth()
        .get(`/api/issues/${id}`)
        .then(res => {
            console.log(res)
            setFormValues(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])


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
  
    console.log(newIssue)
    axiosWithAuth()
    .put(`/api/issues/${id}`, newIssue)
    .then(res => {
     
        history.push('/issue-board')
        // window.location.reload()
      })
    .catch(err => {

    })
};
  const goBack = () => {
    history.goBack()
  }
const submit = (e) => {
  e.preventDefault();
  addIssue()
}
  return (
      <>
        <div className="headerContainer">
          <h3>Issue Form</h3>
        </div>
        <form className="formContainer" onSubmit={submit}>
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