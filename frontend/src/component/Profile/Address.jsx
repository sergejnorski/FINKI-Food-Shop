import React, {useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {addAddress} from "../../State/Authentication/Action";
import {ErrorMessage, Field, Form, Formik} from "formik";
import AddLocationIcon from '@mui/icons-material/AddLocation';
import * as Yup from "yup";
import {Box, Button, Card, Grid, Modal, TextField} from "@mui/material";
import {AddressCard} from "../Cart/AddressCard";

export const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const Address = () => {
  const {auth} = useSelector(store => store);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
  const handleOpenAddressModal = () => setOpen(true);

  const initialValues = {
    location: '',
    streetAddress: '',
    mobile: '',
    city: '',
  };

  const phoneRegex = /^(\+389\s?-?\s?7[0-9]{1}\s?-?\s?[0-9]{3}\s?-?\s?[0-9]{3}|07[0-9]{1}-[0-9]{3}-[0-9]{3})$/;

  const validationSchema = Yup.object().shape({
    location: Yup.string().required('Името на локацијата е задолжително'),
    streetAddress: Yup.string().required('Адресата е задолжителна'),
    mobile: Yup.string()
      .required('Телефонскиот број е задолжителен')
      .matches(phoneRegex, 'Внесете валиден телефонски број.'),
    city: Yup.string().required('Градот е задолжителен'),
  });

  const handleOnSubmit = (values) => {
    const data = {
      jwt: localStorage.getItem('jwt'),
      deliveryAddress: {
        mobile: values.mobile,
        fullName: auth.user?.fullName,
        streetAddress: values.streetAddress,
        city: values.city,
        locationType: values.location,
      },
    };
    dispatch(addAddress(data));
    handleClose();
  };

  return (
    <div>
      <section className='flex justify-center px-5 pb-10 lg:pb-0'>
        <div>
          <h1 className='py-10 text-2xl font-semibold text-center'>Адреси за достава</h1>
          <div className='flex flex-wrap justify-center gap-5 pb-20'>
            {auth?.address?.map((item, index) => (
              <AddressCard key={index} item={item}/>
            ))}
            <Card className='flex w-64 gap-5 p-5'>
              <AddLocationIcon/>
              <div className='space-y-3 text-gray-500'>
                <h1 className='text-lg font-semibold'>Додајте нова адреса</h1>
                <Button variant='contained' fullWidth onClick={handleOpenAddressModal}>
                  Додај
                </Button>
              </div>
            </Card>
          </div>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values, {setSubmitting, resetForm}) => {
                  handleOnSubmit(values);
                  setSubmitting(false);
                  resetForm();
                }}
              >
                {({isSubmitting}) => (
                  <Form>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <h1 className='flex justify-center text-xl font-bold text-gray-400'>Додај адреса</h1>
                      </Grid>
                      <Grid item xs={12}>
                        <Field
                          as={TextField}
                          name="location"
                          label="Име на локацијата"
                          fullWidth
                          variant="outlined"
                          helperText={<ErrorMessage name="location"/>}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Field
                          as={TextField}
                          name="streetAddress"
                          label="Адреса"
                          fullWidth
                          variant="outlined"
                          helperText={<ErrorMessage name="streetAddress"/>}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Field
                          as={TextField}
                          name="mobile"
                          label="Телефонски број"
                          fullWidth
                          variant="outlined"
                          helperText={<ErrorMessage name="mobile"/>}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Field
                          as={TextField}
                          name="city"
                          label="Град"
                          fullWidth
                          variant="outlined"
                          helperText={<ErrorMessage name="city"/>}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button fullWidth variant='contained' type='submit' color='primary'
                                disabled={isSubmitting}>
                          {isSubmitting ? 'Се додава...' : 'Додај'}
                        </Button>
                      </Grid>
                    </Grid>
                  </Form>
                )}
              </Formik>
            </Box>
          </Modal>
        </div>
      </section>
    </div>
  );
};