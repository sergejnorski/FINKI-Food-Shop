import {Box, Button, Card, Divider, Grid, Modal, TextField} from '@mui/material'
import React, {useEffect, useState} from 'react'
import {CartItem} from './CartItem'
import {AddressCard} from './AddressCard'
import {AddLocation} from '@mui/icons-material';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import {useDispatch, useSelector} from "react-redux";
import {createOrder} from "../../State/Order/Action";
import {useNavigate} from "react-router-dom";
import {addAddress, getUser} from "../../State/Authentication/Action";
import * as Yup from "yup";
import {clearCartAction} from "../../State/Cart/Action";

export const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  outline: "none",
  border: "2px solid black",
  boxShadow: 24,
  p: 4,
};

export const Cart = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const {cart, auth} = useSelector(store => store);
  const jwt = localStorage.getItem("jwt");
  console.log(cart)
  const handleClose = () => setOpen(false);


  const handleOpenAddressModal = () => setOpen(true);

  const handleAddItemsNavigation = () => {
    alert(auth?.user?.favorites.length);
    auth?.user?.favorites.length > 0
      ? navigate("/my-profile/favorites")
      : navigate("/");
  };

  const validationSchema = Yup.object().shape({
    location: Yup.string().required("Location Type is required"),
    streetAddress: Yup.string().required("Street Address is required"),
    mobile: Yup.string()
      .required("Mobile is required")
      .matches(/^[0-9]+$/, "Mobile must be a number")
      .min(10, "Mobile must be at least 10 digits")
      .max(15, "Mobile must be less than 15 digits"),
    city: Yup.string().required("City is required"),
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

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [jwt, dispatch]);

  const initialValues = {
    location: "",
    streetAddress: "",
    mobile: '',
    city: ""
  }

  return (
    <>
      <main className='lg:flex justify-between'>
        <section className='lg:w-[30%] space-y-6 lg:min-h-screen pt-10'>
          {cart.cartItems ? cart.cartItems.map((item) => (
              <CartItem key={item.id} item={item}/>)) :
            <div className="px-20">
              <div className="flex justify-center">
                <Button onClick={handleAddItemsNavigation} fullWidth variant="outlined">
                  Add Items
                </Button>
              </div>
            </div>}
          <Divider/>

          <div className='billDetails px-5 text-sm'>
            <p className='font-extralight py-5'>Bill Details</p>
            <div className='pb-3 space-y-3'>
              <div className='flex justify-between text-gray-400'>
                <p>Вкупно</p>
                <p>{cart.cart?.total} ден.</p>
              </div>
              <div className='flex justify-between text-gray-400'>
                <p>Достава</p>
                <p>80 ден.</p>
              </div>
              <div className='flex justify-between text-gray-400'>
                <p>DDV 18%</p>
                <p>{Math.ceil(+cart.cart?.total * 0.18)} ден.</p>
              </div>
              <Divider/>
            </div>
            <div className='flex justify-between text-gray-400'>
              <p>Вкупно</p>
              <p>{cart.cart?.total + Math.ceil(+cart.cart?.total * 0.18) + 80} ден.</p>
            </div>
          </div><div className="px-5 mt-5">
          <Button
            fullWidth
            variant="contained"
            color="primary"
            disabled={!selectedAddress}
            onClick={() => {
              const data = {
                jwt: jwt,
                total: cart?.cart?.total,
                order: {
                  restaurantId: cart.cartItems[0].food?.restaurant.id,
                  deliveryAddress: {
                    fullName: auth.user?.fullName,
                    streetAddress: selectedAddress.streetAddress,
                    city: selectedAddress.city,
                    mobile: selectedAddress.mobile,
                    locationType: selectedAddress.locationType,
                  }
                }
              };
              dispatch(createOrder(data));
              dispatch(clearCartAction());
            }}
          >
            Нарачај
          </Button>
        </div>
        </section>

        <Divider orientation='vertical' flexItem/>
        <section className='lg:w-[70%] flex justify-center px-5 pb-10 lg:pb-0'>
          <div>
            <h1 className='text-center font-semibold text-2xl py-10'>Адреса за Достава</h1>
            <div className='flex gap-5 flex-wrap justify-center'>
              {auth?.address?.map((item, index) => (
                <AddressCard
                  key={index}
                  item={item}
                  isSelected={selectedAddress === item}
                  onSelect={() => setSelectedAddress(item)}
                />
              ))}
              <Card className="flex gap-5 w-64 p-5">
                <AddLocation/>
                <div className='space-y-3 text-gray-500'>
                  <h1 className='font-semibold text-lg text-white'>Додај нова адреса</h1>

                  <Button variant='contained' fullWidth onClick={handleOpenAddressModal}>
                    Додај
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Formik initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleOnSubmit}>
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <h1 className="flex justify-center text-xl font-bold text-gray-400">
                      Додајте нова адреса
                    </h1>
                  </Grid>
                  <Grid item xs={12}>
                    <Field as={TextField}
                           name="location"
                           label="Тип на локација"
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
                    ></Field>
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      name="mobile"
                      label="Телефонски број"
                      fullWidth
                      variant="outlined"
                      helperText={<ErrorMessage name="mobile"/>}
                    ></Field>
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      name="city"
                      label="Град"
                      fullWidth
                      variant="outlined"
                      helperText={<ErrorMessage name="city"/>}
                    ></Field>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      fullWidth
                      variant="contained"
                      type="submit"
                      color="primary"
                      className=""
                    >
                      Додај
                    </Button>
                  </Grid>
                </Grid>
              </Form>

            </Formik>
          </Box>
        </Modal>
      </div>
    </>
  )
}
export default Cart