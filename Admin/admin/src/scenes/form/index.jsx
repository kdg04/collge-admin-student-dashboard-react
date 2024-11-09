import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useState, useEffect } from 'react';
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { Radio, RadioGroup, FormControlLabel, FormControl } from '@mui/material';

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [value, setValue] = useState('staff');
  const [lastID, setLastID] = useState(-1);
  const mobRegex = /^\d{10}$/;
  const [checkoutSchema, setCheckoutSchema] = useState(null);

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    dept: "",
    sem: "" , 
    grade: "",
    contact: "",
    id: "",
    address1: "",
    address2: ""
  };
useEffect( () => {
const Schema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  dept: yup.string().required("required"),
  sem: value === 'student' ? yup.string().required('required') : null,
  grade: value === 'student' ? null : yup.string().required('required'),
  contact: yup.string().matches(mobRegex, "Mobile number is not valid").required("required"),
  address1: yup.string().required("required"),
  address2: yup.string().required("required") 
});
setCheckoutSchema(Schema);
}, [value]);

  const handleRadioChange = (event) => {
    setValue(event.target.value);
  }

  const fetchLastID = async () => {
    let data;
    try {
      const response = await fetch('http://localhost:8187/College/addUser', {
        method: "GET",
    }); 
      data = await response.text();
      setLastID(parseInt(data));
      console.log("last user Id: " + data);              
    } catch (error) {
      console.error('Error fetching user id:', error);
    }
    return (parseInt(data)+1);
  };

  const handleFormSubmit = async (values) => {
    console.log(values);
    try {
      const response = await fetch('http://localhost:8187/College/createUser', {
          method: "POST",   
          headers: {'Content-Type': 'application/json'},    
          body: JSON.stringify(values)
      });
      if (response.status === 200) {
          const data = await response.text();
          console.log(data);       
          } else {
              console.log("error response status not 200 " + response.statusText + " " + response.status);
          }   

  } catch (error) {  
      console.error('Error:', error); 
    }  
  };


  return (
    <Box m="20px">
      <Header title="CREATE USER" subtitle="Create a New User Profile" />
      <FormControl component="fieldset">
        <RadioGroup
          aria-label="options"
          name="options"
          value={value}
          onChange={handleRadioChange}
        >
          <FormControlLabel value="staff" control={<Radio sx={{ '& .MuiSvgIcon-root': { color: 'green' }}} />} label="Staff" />
          <FormControlLabel value="student" control={<Radio sx={{ '& .MuiSvgIcon-root': { color: 'green' }}} />} label="Student" />
        </RadioGroup>
      </FormControl>

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" }
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="First Name"
                onChange={handleChange} 
                value={values.firstName}               
                onBlur={() => {                 
                  if (values.firstName) {
                    fetchLastID().then((Id) => {
                        setFieldValue('id', Id);
                    });
                }
                }           
              }                             
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Dept"
                onChange={handleChange}
                value={values.dept}
                name="dept"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"               
                label={value === 'student' ? 'Sem' : 'Grade'}
                onChange={handleChange}
                value={value === 'student' ? values.sem : values.grade}
                name={value === 'student' ? 'sem' : 'grade'}
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Contact Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contact}
                name="contact"
                error={!!touched.contact && !!errors.contact}
                helperText={touched.contact && errors.contact}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="ID"
                onChange={handleChange}
                disabled
                value={values.id}
                name="id"
                error={!!touched.contact && !!errors.contact}
                helperText={touched.contact && errors.contact}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address 1"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address1}
                name="address1"
                error={!!touched.address1 && !!errors.address1}
                helperText={touched.address1 && errors.address1}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address 2"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address2}
                name="address2"
                error={!!touched.address2 && !!errors.address2}
                helperText={touched.address2 && errors.address2}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New User
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};



export default Form;
