import { Box, Button, Card, Divider, Grid, Modal, TextField } from '@mui/material'
import React, {useEffect} from 'react'
import { CartItem } from './CartItem'
import { AddressCard } from './AddressCard'
import { AddLocation } from '@mui/icons-material';
import { Field, Form, Formik } from 'formik';
import {useDispatch, useSelector} from "react-redux";
import {getAllCartItems} from "../../State/Cart/Action";
import {createOrder} from "../../State/Order/Action";

export const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    outline: "none",
    boxShadow: 24,
    p: 4,
};
const initialValues={
    streetAddress:"",
    state:"",
    pincode:'',
    city:""
}
// const validationSchema=Yup.object.shape({
// streetAddress:Yup.string().required("Street address is required"),
// state:Yup.string().required("State is required"),
// pincode:Yup.required("pincode is required"),
// city:Yup.string().required("city is required")
// })
export const Cart = () => {

    const createOrderUsingSelectedAddress = () => {

    }
    const handleOpenAddressModal = () => setOpen(true);
    const [open, setOpen] = React.useState(false);
    const {cart, auth} = useSelector(store => store);
    const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const handleSubmit = (values) => {
    const data = {
      jwt: localStorage.getItem("jwt"),
      order: {
        restaurantId: cart.cartItems[0].food?.restaurant.id,
        deliveryAddress: {
          fullName: auth.user?.fullName,
          streetAddress: values.streetAddress,
          city: values.city,
          state: values.state,
          postalCode: values.pincode,
          country: "Македонија",
        }
      }
    }
    dispatch(createOrder(data));
  }

  useEffect(() => {
    const reqData = {cartId: cart.cart?.id, token: localStorage.getItem("jwt")}
    dispatch(getAllCartItems(reqData));
  }, []);

    return (
        <>
            <main className='lg:flex justify-between'>
                <section className='lg:w-[30%] space-y-6 lg:min-h-screen pt-10'>

                    {cart.cartItems ? cart.cartItems.map((item) => (<CartItem key={item.id} item={item}/>)) : []}
                    <Divider />
                    <div className='billDetails px-5 text-sm'>
                        <p className='font-extralight py-5'>
                            Bill Details
                        </p>
                        <div className='space-y-3'>
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
                            <Divider />
                        </div>
                        <div className='flex justify-between text-gray-400'>
                            <p>Вкупно</p>
                            <p>{cart.cart?.total + Math.ceil(+cart.cart?.total*0.18) + 80} ден.</p>
                        </div>
                    </div>
                </section>
                <Divider orientation='vertical' flexItem />
                <section className='lg:w-[70%] flex justify-center px-5 pb-10 lg:pb-0'>
                    <div>
                        <h1 className='text-center font-semibold text-2xl py-10'>Адреса за Достава</h1>
                        <div className='flex gap-5 flex-wrap justify-center'>
                            {[1, 1, 1, 1, 1].map((item) => (<AddressCard handleSelectAddress={createOrderUsingSelectedAddress} item={item} showButton={true} />))}
                            <Card className="flex gap-5 w-64 p-5">
                                <AddLocation />
                                <div className='space-y-3 text-gray-500'>
                                    <h1 className='font-semibold text-lg text-white'>Add New Address</h1>

                                    <Button variant='outlined' fullWidth onClick={handleOpenAddressModal}>
                                        Add
                                    </Button>
                                </div>
                            </Card>
                        </div>
                    </div>
                </section>
            </main>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Formik initialValues={initialValues}
                    // validationSchema={validationSchema}
                    onSubmit={handleSubmit}>
                        <Form>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Field as={TextField}
                                    name="streetAddress"
                                    label="Street Address"
                                    fullWidth
                                    variant="outlined"
                                    // error={!ErrorMessage("streetAddress")}
                                    // helperText={
                                    //     <ErrorMessage>
                                    //         {(msg)=><span className='text-red-600'>{msg}</span>}
                                    //     </ErrorMessage>
                                    // }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field as={TextField}
                                    name="state"
                                    label="state"
                                    fullWidth
                                    variant="outlined"
                                    // error={!ErrorMessage("streetAddress")}
                                    // helperText={
                                    //     <ErrorMessage>
                                    //         {(msg)=><span className='text-red-600'>{msg}</span>}
                                    //     </ErrorMessage>
                                    // }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field as={TextField}
                                    name="city"
                                    label="city"
                                    fullWidth
                                    variant="outlined"
                                    // error={!ErrorMessage("streetAddress")}
                                    // helperText={
                                    //     <ErrorMessage>
                                    //         {(msg)=><span className='text-red-600'>{msg}</span>}
                                    //     </ErrorMessage>
                                    // }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field as={TextField}
                                    name="pincode"
                                    label="pincode"
                                    fullWidth
                                    variant="outlined"
                                    // error={!ErrorMessage("streetAddress")}
                                    // helperText={
                                    //     <ErrorMessage>
                                    //         {(msg)=><span className='text-red-600'>{msg}</span>}
                                    //     </ErrorMessage>
                                    // }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                <Button fullWidth variant='contained' type='submit' color='primary'>Deliver Here</Button>
                                </Grid>
                            </Grid>
                        </Form>

                    </Formik>
                </Box>
            </Modal>
            </>
                )
}
                export default Cart