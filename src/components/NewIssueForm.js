import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import schema from "../validation/IssueForm";
import { axiosWithAuth } from '../utils/axiosWithAuth';
import styled from "styled-components";

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

  const [ , setLoading] = useState(false)
  

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
    console.log(formValues)
  };

  // Image upload functionaliy

const uploadImage = async e => {
  const files = e.target.files
  const data = new FormData()
  data.append('file', files[0])
  data.append('upload_preset', 'co-work')

  setLoading(true);
  const res = await fetch("	https://api.cloudinary.com/v1_1/dyp2opcpj/image/upload", 
  {
    method: 'POST',
    body: data
  })

  const file = await res.json()
  formValues.image = file.url
  console.log(formValues)
}

//

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
    window.location.reload()
    console.log(newIssue)
  }

  const goBack = () => {
    history.goBack()
  }

  return (
      <Container>
        <div className="headerContainer">
          <h3>Create a New Issue</h3>
        </div>
        <form className="formContainer" onSubmit={addIssue}>
          <div className="inputContainer">
            <label>
              
              <input
                name="issue"
                type="text"
                value={formValues.issue}
                onChange={update}
                placeholder='Issue'
              />
            </label>
            <br />
            <label>
              
              <textarea
                name="description"
                value={formValues.description}
                onChange={update}
                placeholder='Description'
              />
            </label>
            <br />
            <label>Image
              <ImageInput>
                  <input
                    name="file" //changed from image to file
                    type="file"
                    accept='image/*'
                    
                    //value={formValues.image}
                    onChange={uploadImage}
                  />
              </ImageInput>
            </label>
            <br />
            <label>

              <input
                name="city"
                type="text"
                value={formValues.city}
                onChange={update}
                placeholder='City'
              />
            </label>
            <br />
            <label>
              
              <input
                name="state"
                type="text"
                maxLength={2}
                value={formValues.state}
                onChange={update}
                placeholder='State'
              />
            </label>
            <br />
            <label>
              
              <input
                name="zipcode"
                type="text"
                maxLength={5}
                value={formValues.zipcode}
                onChange={update}
                placeholder='Zipcode'
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
      </Container>
  );
}

const Container = styled.div `
  width: 30%;
  margin: auto; 
  text-align: center;
`
const ImageInput = styled.div `
  background-color: #2A2F4A;
  padding: 10px;
`