import {Button, TextField, Typography} from '@mui/material'
import {Field, Form, Formik} from 'formik'
import React from 'react'
import {useNavigate} from 'react-router-dom'
import {useDispatch} from "react-redux";
import {loginUser} from "../../State/Authentication/Action";

const initialValues = {
  email: "",
  password: ""
}
export const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = (values) => {
    dispatch(loginUser({userData: values, navigate}))
  }
  return (
    <div>
      <Typography variant='h5' className='text-center'>
        Најава
      </Typography>
      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        <Form>

          <Field as={TextField}
                 name="email"
                 label="е-пошта"
                 fullWidth
                 variant="outlined"
                 margin="normal"

          />
          <Field as={TextField}
                 name="password"
                 label="лозинка"
                 fullWidth
                 variant="outlined"
                 margin="normal"

          />
          <Button sx={{mt: 2, padding: "1rem"}} fullWidth type="submit" variant='contained'>Најава</Button>

        </Form>
      </Formik>
      <Typography variant='body2' align='center' sx={{mt: 3}}>
        Сеуште немате корисничка сметка?
        <Button size='small' onClick={() => navigate("/account/register")}>
          Регистрација
        </Button>
      </Typography>
    </div>
  )
}