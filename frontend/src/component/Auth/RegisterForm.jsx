import { Button, MenuItem, Select, TextField, Typography } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import {registerUser} from "../../State/Authentication/Action";
import {useDispatch} from "react-redux";

const initialValues = {
    fullName: "",
    email: "",
    password: "",
    role: "ROLE_CUSTOMER",
}
export const RegisterForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSubmit = (values) => {
        dispatch(registerUser({userData: values, navigate}));
    }
    return (
        <div>
            <Typography variant='h5' className='text-center'>
                Регистрација
            </Typography>
            <Formik onSubmit={handleSubmit} initialValues={initialValues}>
                <Form >
                    <Field as={TextField}
                        name="fullName"
                        label="Целосно име"
                        fullWidth
                        variant="outlined"
                        margin="normal"

                    />

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
                        type="password"

                    />
                   
                        <Field
                        fullWidth
                        margin="normal"
                        as={Select}
                            labelId="role-simple-select-label"
                            id="demo-simple-select"
                            name="role"
                        
                        >
                            <MenuItem value={"ROLE_CUSTOMER"}>Корисник</MenuItem>
                            <MenuItem value={"ROLE_RESTAURANT_OWNER"}>Газда на маркет</MenuItem>
                        </Field>
                    
                    <Button sx={{ mt: 2, padding: "1rem" }} fullWidth type="submit" variant='contained'>Регистрација</Button>

                </Form>
            </Formik>
            <Typography variant='body2' align='center' sx={{ mt: 3 }}>
                Доколку имате корисничка сметка
                <Button size='small' onClick={() => navigate("/account/login")}>
                    Најава
                </Button>
            </Typography>
        </div>
    )
}