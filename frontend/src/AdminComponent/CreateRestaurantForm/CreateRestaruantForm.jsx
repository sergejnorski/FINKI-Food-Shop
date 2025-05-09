import { AddPhotoAlternate } from "@mui/icons-material";
import {
    Button,
    CircularProgress,
    Grid,
    IconButton,
    TextField,
} from '@mui/material';
import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { uploadImageToCloudinary } from "../util/UploadtoCloudaniry";
import { useDispatch, useSelector } from "react-redux";
import { createRestaurant } from "../../State/Restaurant/Action";

const CreateRestaurantForm = () => {
    const [uploadImage, setUploadImage] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        cuisineType: "",
        streetAddress: "",
        city: "",
        stateProvince: "",
        postalCode: "",
        country: "",
        mobile: "",
        twitter: "",
        instagram: "",
        email: "",
        openingHours: "",
        images: []
    });

    const dispatch = useDispatch();
    const jwt = localStorage.getItem('jwt');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploadImage(true);
        const image = await uploadImageToCloudinary(file);
        setFormData(prev => ({
            ...prev,
            images: [...prev.images, image]
        }));
        setUploadImage(false);
    };

    const handleRemoveImage = (index) => {
        const updatedImages = [...formData.images];
        updatedImages.splice(index, 1);
        setFormData(prev => ({
            ...prev,
            images: updatedImages
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            name: formData.name,
            description: formData.description,
            cuisineType: formData.cuisineType,
            address: {
                streetAddress: formData.streetAddress,
                city: formData.city,
                stateProvince: formData.stateProvince,
                postalCode: formData.postalCode,
                country: formData.country
            },
            contactInformation: {
                email: formData.email,
                mobile: formData.mobile,
                twitter: formData.twitter,
                instagram: formData.instagram,
            },
            openingHours: formData.openingHours,
            images: formData.images
        };

        console.log("Submitting restaurant:", data);
        dispatch(createRestaurant({ data, token: jwt }));
    };

    return (
      <div className='py-10 px-5 lg:flex items-center justify-center min-h-screen'>
          <div className="lg:max-w-4xl">
              <h1 className='font-bold text-2xl text-center py-2'>Add New Restaurant</h1>
              <form onSubmit={handleSubmit} className='space-y-4'>
                  <Grid container spacing={2}>
                      <Grid className='flex flex-wrap gap-5' item xs={12}>
                          <input
                            name='image'
                            accept='image/*'
                            id='fileInput'
                            style={{ display: "none" }}
                            onChange={handleImageChange}
                            type="file"
                          />
                          <label className='relative' htmlFor='fileInput'>
                                <span className='w-24 h-24 cursor-pointer flex items-center justify-center p-3 border rounded-md border-gray-600'>
                                    <AddPhotoAlternate className="text-white" />
                                </span>
                              {uploadImage && (
                                <div className='absolute left-0 right-0 top-0 bottom-0 w-24 h-24 flex justify-center items-center'>
                                    <CircularProgress />
                                </div>
                              )}
                          </label>
                          <div className='flex flex-wrap gap-2'>
                              {formData.images.map((image, index) => (
                                <div key={index} className="relative">
                                    <img className='w-24 h-24 object-cover' src={image} alt="" />
                                    <IconButton
                                      size="small"
                                      sx={{ position: 'absolute', top: 0, right: 0, outline: 'none' }}
                                      onClick={() => handleRemoveImage(index)}
                                    >
                                        <CloseIcon sx={{ fontSize: "1rem" }} />
                                    </IconButton>
                                </div>
                              ))}
                          </div>
                      </Grid>

                      {[
                          { name: "name", label: "Name" }, { name: "description", label: "Description" },
                          { name: "cuisineType", label: "Cuisine Type" },
                          { name: "openingHours", label: "Opening Hours" },
                          { name: "streetAddress", label: "Street Address" },
                          { name: "city", label: "City" },
                          { name: "stateProvince", label: "State/Province" },
                          { name: "postalCode", label: "Postal Code" },
                          { name: "country", label: "Country" },
                          { name: "email", label: "Email" },
                          { name: "mobile", label: "Mobile" },
                          { name: "instagram", label: "Instagram" },
                          { name: "twitter", label: "Twitter" },
                      ].map(({ name, label }) => (
                        <Grid item xs={12} sm={6} key={name}>
                            <TextField
                              fullWidth
                              id={name}
                              name={name}
                              label={label}
                              variant="outlined"
                              onChange={handleChange}
                              value={formData[name]}
                            />
                        </Grid>
                      ))}

                      <Grid item xs={12}>
                          <Button type='submit' variant='contained' color='primary'>
                              Create Restaurant
                          </Button>
                      </Grid>
                  </Grid>
              </form>
          </div>
      </div>
    );
};

export default CreateRestaurantForm;
