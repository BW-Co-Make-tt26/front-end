import * as yup from "yup";

export default yup.object().shape({
  issue: yup.string().required("Issue is required"),
  description: yup.string().required("Description is required"),
  image: yup.string(),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  zipcode: yup
    .string()
    .required("Zipcode is required")
    .min(5, "Zipcode must 5 digit number")
    .matches(/^\d+$/, "Zip must 5 digit number"),
});
