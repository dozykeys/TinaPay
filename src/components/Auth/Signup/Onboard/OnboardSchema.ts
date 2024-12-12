import * as Yup from "yup";

// Existing validation schema for Onboard1
const onboard1Schema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  userName: Yup.string().required("Username is required"),
  referral: Yup.string(),
  phone: Yup.string().required("Phone number is required"),
});

// New validation schema for Onboard2
const onboard2Schema = Yup.object().shape({
  country: Yup.string().required("Country is required"),
  dob: Yup.date().required("Date of birth is required"),
  gender: Yup.string().required("Gender is required"),
  bvn: Yup.string().required("BVN is required"),
  address: Yup.string().required("Address is required"),
});

// Merging the schemas
const mergedSchema = Yup.object().shape({
  ...onboard1Schema.fields,
  ...onboard2Schema.fields,
});

export { onboard1Schema, onboard2Schema, mergedSchema };
