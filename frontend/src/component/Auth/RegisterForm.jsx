import {
    Button,
    MenuItem,
    Select,
    TextField,
    Typography,
    FormHelperText
} from '@mui/material';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../State/Authentication/Action';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import {VerifyEmailModal} from "./VerifyEmailModal";

const initialValues = {
    fullName: '',
    email: '',
    password: '',
    role: 'ROLE_CUSTOMER',
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const passwordRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[@#$%^&+=!]).*$/i;

const validationSchema = Yup.object({
    fullName: Yup.string().required('Целосното име е задолжително.'),
    email: Yup.string()
        .matches(emailRegex, 'Невалидна е-пошта.')
        .required('е-поштата е задолжителна.'),
    password: Yup.string()
        .min(8, 'Лозинката мора да има најмалку 8 карактери.')
        .matches(passwordRegex, 'Лозинката мора да има 1 буква, 1 бројка и еден специјален знак.')
        .required('Лозинката е задолжителна.'),
    role: Yup.string().required('Улогата е задолжителна.')
});

export const RegisterForm = () => {
    const [openModal, setOpenModal] = useState(false);
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (values, { setErrors }) => {
        const success = await dispatch(registerUser({ userData: values, navigate, setErrors }));

        if (success) {
            setEmail(values.email);
            setRole(values.role);
            setOpenModal(true);
        }
    };

    return (
        <div>
            <Typography variant='h5' className='text-center'>
                Регистрација
            </Typography>
            <Formik
                onSubmit={handleSubmit}
                initialValues={initialValues}
                validationSchema={validationSchema}
            >
                {({ errors, touched }) => (
                    <Form>
                        <Field
                            as={TextField}
                            name="fullName"
                            label="Целосно име"
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            error={touched.fullName && Boolean(errors.fullName)}
                            helperText={touched.fullName && errors.fullName}
                        />

                        <Field
                            as={TextField}
                            name="email"
                            label="е-пошта"
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            error={touched.email && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                        />

                        <Field
                            as={TextField}
                            name="password"
                            label="лозинка"
                            type="password"
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            error={touched.password && Boolean(errors.password)}
                            helperText={touched.password && errors.password}
                        />

                        <Field
                            as={Select}
                            name="role"
                            fullWidth
                            displayEmpty
                            variant="outlined"
                            margin="normal"
                            error={touched.role && Boolean(errors.role)}
                        >
                            <MenuItem value="ROLE_CUSTOMER">Корисник</MenuItem>
                            <MenuItem value="ROLE_RESTAURANT_OWNER">Газда на маркет</MenuItem>
                        </Field>
                        {touched.role && errors.role && (
                            <FormHelperText error>{errors.role}</FormHelperText>
                        )}

                        <Button
                            sx={{ mt: 2, padding: '1rem' }}
                            fullWidth
                            type="submit"
                            variant="contained"
                        >
                            Регистрација
                        </Button>
                    </Form>
                )}
            </Formik>
            <VerifyEmailModal
                open={openModal}
                handleClose={() => setOpenModal(false)}
                email={email}
                role={role}
            />
            <Typography variant='body2' align='center' sx={{ mt: 3 }}>
                Доколку имате корисничка сметка
                <Button size='small' onClick={() => navigate('/account/login')}>
                    Најава
                </Button>
            </Typography>
        </div>
    );
};