import { AddPhotoAlternate } from "@mui/icons-material";
import {
    Box,
    Button,
    FormHelperText,
    Chip,
    CircularProgress,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    OutlinedInput,
    Select,
    TextField,
    MenuItem,
} from '@mui/material';
import { useFormik } from "formik";
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import {uploadImageToCloudinary} from "../util/UploadtoCloudaniry";
import { useDispatch, useSelector } from 'react-redux';
import { createMenuItem } from "../../State/Menu/Action";
import { useEffect } from 'react';
import { getIngredientsOfRestaurant } from "../../State/Ingredients/Action";
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
const initialValues = {
    name: "",
    description: "",    
    price:null,
    category: null,
    restaurantId: "",
    vegetarian: true,
    seasonal: false,
    ingredients: [],
    images: []
};

const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    price: Yup.number().required("Price is required"),
    category: Yup.object().required("Category is required"),
    ingredients: Yup.array().required("Ingredients are required"),
});



const CreateMenuForm = () => {
    const dispatch=useDispatch();
    const jwt=localStorage.getItem("jwt");
    const {restaurant, ingredients} = useSelector(store=>store);
    const navigate=useNavigate();

    const [uploadImage,setUploadImage] = React.useState(false);
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            values.restaurantId = restaurant.usersRestaurant.id;
            dispatch(createMenuItem({menu:values,jwt}))
            navigate('/admin/restaurants/menu')
        },
    });

    const handleIngredientChange = (event) => {
        const { value } = event.target;
        formik.setFieldValue('ingredients', typeof value === 'string' ? value.split(',') : value);
    };
    const handleImageChange= async(e) => {
        const  file = e.target.files[0];
        setUploadImage(true)
        const image = await uploadImageToCloudinary(file)
        console.log("image ---",image)
        await formik.setFieldValue("images", [...formik.values.images, image])
        setUploadImage(false)
    };

    const handleRemoveImage=(index) => {
        const updateImage = [...formik.values.images];
        updateImage.splice(index, 1);
        formik.setFieldValue("images", updateImage)
    };
    useEffect(() => {
        
        
        if (restaurant?.usersRestaurant?.id) {
            dispatch(getIngredientsOfRestaurant({
                id: restaurant.usersRestaurant.id,
                jwt
            }));
        }
        
        if(restaurant?.categories?.length<0){
            Swal.fire({
                title: "Resturant category empty",
               
                icon: "question"
              });
            navigate('/admin/restaurants/category');
        }
    }, [dispatch, jwt, restaurant?.usersRestaurant?.id]);

    return (
        <div className='py-10 px-5 lg:flex items-center justify-center min-h-screen'>
            <div className="lg:max-w-4x1">
                <h1 className='font-bold text-2xl text-center py-2'>
                    Add New Menu
                </h1>
                <form onSubmit={formik.handleSubmit} className='space-y-4'>
                    <Grid container spacing={2}>
                        <Grid className='flex flex-wrap gap-5' item xs={12}>
                            <input
                               type='file'
                                name='image'
                                id='fileInput'
                                style={{ display: "none" }}
                                onChange={handleImageChange}
                                accept='image/*'/>

                            <label className='relative' htmlFor='fileInput'>
                  <span className='w-24 h-24 cursor-pointer flex items-center justify-center
                   p-3 border rounded-md border-gray-600'>
                      <AddPhotoAlternate className="text-white"/>
                  </span>
                                {uploadImage &&
                                    (<div className='absolute left-0 right-0 top-0
                       bottom-0 w-24 h-24 flex justify-center items-center'>
                                            <CircularProgress/>
                                        </div>
                                    )}
                            </label>
                            <div className='flex flex-wrap gap-2'>
                                {formik.values?.images?.map((image, index) => (
                                    <div key={index} className="relative">
                                        <img
                                            className='w-24 h-24 object-cover'
                                            
                                            src={image}
                                            alt=""
                                        />
                                        <IconButton
                                            size="small"
                                            sx={{
                                                position: 'absolute',
                                                top: 0,
                                                right: 0,
                                                outline: 'none',
                                            }}
                                            onClick={() => handleRemoveImage(index)}>
                                            <CloseIcon sx={{fontSize:"1rem"}}/>
                                        </IconButton>
                                    </div>
                                ))}
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                        fullWidth
                                        id='name'
                                        name='name'
                                        label='Name'
                                        variant='outlined'
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        error={formik.touched.name && Boolean(formik.errors.name)}
                                        helperText={formik.touched.name && formik.errors.name}>
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth
                                id='description'
                                name='description'
                                label='Description'
                                variant='outlined'
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                error={formik.touched.description && Boolean(formik.errors.description)}
                                helperText={formik.touched.description && formik.errors.description}>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <TextField fullWidth
                                id='price'
                                name='price'
                                label='Price'
                                variant='outlined'
                                value={formik.values.price}
                                onChange={formik.handleChange}
                                error={formik.touched.price && Boolean(formik.errors.price)}
                                helperText={formik.touched.price && formik.errors.price}>
                            </TextField>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth variant="outlined" error={formik.touched.category && Boolean(formik.errors.category)}>
                                <InputLabel id="category-label">Category</InputLabel>
                                <Select
                                    labelId="category-label"
                                    id="category"
                                    name="category"
                                    value={formik.values.category}
                                    onChange={formik.handleChange}
                                    label="Category"
                                >
                                    {restaurant?.categories?.map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {formik.touched.category && formik.errors.category && (
                                    <FormHelperText>{formik.errors.category}</FormHelperText>
                                )}
                            </FormControl>
                        </Grid>

                        <Grid item sm={12}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-multiple-chip-label">Ingredients</InputLabel>
                                <Select
                                    labelId="demo-multiple-chip-label"
                                    id="demo-multiple-chip"
                                    multiple
                                    value={formik.values.ingredients}
                                    onChange={handleIngredientChange}
                                    input={<OutlinedInput id="select-multiple-chip" label="Ingredients" />}
                                    renderValue={(selected) => (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {selected.map((value) => (
                                                <Chip key={value} label={value.name} />
                                            ))}
                                        </Box>
                                    )}
                                >
                                    {ingredients?.ingredients?.map((item) => (
                                        <MenuItem key={item.id} value={item}>
                                            {item.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {formik.touched.ingredients && formik.errors.ingredients && (
                                    <FormHelperText>{formik.errors.ingredients}</FormHelperText>
                                )}
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth variant="outlined" error={formik.touched.vegetarian && Boolean(formik.errors.vegetarian)}>
                                <InputLabel id="is-veg">Is Vegetarian</InputLabel>
                                <Select
                                  labelId="is-veg"
                                  id="vegetarian"
                                  name="vegetarian"
                                  value={formik.values.vegetarian}
                                  onChange={(e) => formik.setFieldValue("vegetarian", e.target.value === "true")}
                                  label="Is Vegetarian"
                                >
                                    {[{ label: "Yes", value: true }, { label: "No", value: false }].map((option) => (
                                      <MenuItem key={option.value.toString()} value={option.value.toString()}>
                                          {option.label}
                                      </MenuItem>
                                    ))}
                                </Select>

                                {formik.touched.vegetarian && formik.errors.vegetarian && (
                                    <FormHelperText>{formik.errors.vegetarian}</FormHelperText>
                                )}
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth variant="outlined" error={formik.touched.seasonal && Boolean(formik.errors.seasonal)}>
                                <InputLabel id="is-seasonal">Is Seasonal</InputLabel>
                                <Select
                                  labelId="is-seasonal"
                                  id="seasonal"
                                  name="seasonal"
                                  value={formik.values.seasonal}
                                  onChange={(e) => formik.setFieldValue("seasonal", e.target.value === "true")}
                                  label="Is Seasonal"
                                >
                                    {[{ label: "Yes", value: true }, { label: "No", value: false }].map((option) => (
                                      <MenuItem key={option.value.toString()} value={option.value.toString()}>
                                          {option.label}
                                      </MenuItem>
                                    ))}
                                </Select>

                                {formik.touched.seasonal && formik.errors.seasonal && (
                                    <FormHelperText>{formik.errors.seasonal}</FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid item sm={6}>
                            <Button
                                color='primary'
                                variant='contained'
                                fullWidth
                                type='submit'
                            >
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </div>
    );
};

export default CreateMenuForm;