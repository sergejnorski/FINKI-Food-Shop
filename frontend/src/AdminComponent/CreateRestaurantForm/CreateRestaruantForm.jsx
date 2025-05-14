import {AddPhotoAlternate} from "@mui/icons-material";
import {
    Button,
    CircularProgress,
    Grid,
    IconButton,
    TextField,
} from '@mui/material';
import React, {useState} from 'react';
import CloseIcon from '@mui/icons-material/Close';
import {uploadImageToCloudinary} from "../util/UploadtoCloudaniry";
import {useDispatch} from "react-redux";
import {createRestaurant} from "../../State/Restaurant/Action";

const CreateRestaurantForm = () => {
    const [uploadImage, setUploadImage] = useState(false);
    const [errors, setErrors] = useState({});
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
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleBlur = (e) => {
        const {name, value} = e.target;
        let error = "";

        const phoneRegex = /^(\+389\s?-?\s?7[0-9]{1}\s?-?\s?[0-9]{3}\s?-?\s?[0-9]{3}|07[0-9]{1}-[0-9]{3}-[0-9]{3})$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (value.trim() === "") {
            error = "Полето е задолжително";
        } else if (name === "mobile" && !phoneRegex.test(value)) {
            error = "Телефонот мора да биде во формат +389 70 123 456 или 070-123-456";
        } else if (name === "email" && !emailRegex.test(value)) {
            error = "Невалидна е-пошта";
        }

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: error
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

    const validate = () => {
        const newErrors = {};

        const phoneRegex = /^(\+389\s?-?\s?7[0-9]{1}\s?-?\s?[0-9]{3}\s?-?\s?[0-9]{3}|07[0-9]{1}-[0-9]{3}-[0-9]{3})$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        Object.entries(formData).forEach(([key, value]) => {
            if (typeof value === "string" && value.trim() === "") {
                newErrors[key] = "Полето е задолжително";
            }
        });

        if (!phoneRegex.test(formData.mobile)) {
            newErrors.mobile = "Телефонот мора да биде во формат +389 70 123 456 или 070-123-456";
        }

        if (!emailRegex.test(formData.email)) {
            newErrors.email = "Невалидна е-пошта";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;

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

        dispatch(createRestaurant({data, token: jwt}));
    };

    return (
        <div className='py-10 px-5 lg:flex items-center justify-center min-h-screen'>
            <div className="lg:max-w-4xl">
                <h1 className='font-bold text-2xl text-center py-2'>Креирање на маркет</h1>
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <Grid container spacing={2}>
                        <Grid className='flex flex-wrap gap-5' item xs={12}>
                            <input
                                name='image'
                                accept='image/*'
                                id='fileInput'
                                style={{display: "none"}}
                                onChange={handleImageChange}
                                type="file"
                            />
                            <label className='relative' htmlFor='fileInput'>
                                <span
                                    className='w-24 h-24 cursor-pointer flex items-center justify-center p-3 border rounded-md border-gray-600'>
                                    <AddPhotoAlternate className="text-white"/>
                                </span>
                                {uploadImage && (
                                    <div
                                        className='absolute left-0 right-0 top-0 bottom-0 w-24 h-24 flex justify-center items-center'>
                                        <CircularProgress/>
                                    </div>
                                )}
                            </label>
                            <div className='flex flex-wrap gap-2'>
                                {formData.images.map((image, index) => (
                                    <div key={index} className="relative">
                                        <img className='w-24 h-24 object-cover' src={image} alt=""/>
                                        <IconButton
                                            size="small"
                                            sx={{position: 'absolute', top: 0, right: 0, outline: 'none'}}
                                            onClick={() => handleRemoveImage(index)}
                                        >
                                            <CloseIcon sx={{fontSize: "1rem"}}/>
                                        </IconButton>
                                    </div>
                                ))}
                            </div>
                        </Grid>

                        {[
                            {name: "name", label: "Име на маркетот"},
                            {name: "description", label: "Опис"},
                            {name: "cuisineType", label: "Тип на маркет"},
                            {name: "openingHours", label: "Работно време"},
                            {name: "streetAddress", label: "Адреса"},
                            {name: "city", label: "Град"},
                            {name: "stateProvince", label: "Населба"},
                            {name: "postalCode", label: "Поштенски код"},
                            {name: "country", label: "Држава"},
                            {name: "email", label: "Е-адреса"},
                            {name: "mobile", label: "Телефонски број"},
                            {name: "instagram", label: "Instagram"},
                            {name: "twitter", label: "X"},
                        ].map(({name, label}) => (
                            <Grid item xs={12} sm={6} key={name}>
                                <TextField
                                    fullWidth
                                    id={name}
                                    name={name}
                                    label={label}
                                    variant="outlined"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={formData[name]}
                                    error={Boolean(errors[name])}
                                    helperText={errors[name]}
                                />

                            </Grid>
                        ))}

                        <Grid item xs={12}>
                            <Button type='submit' variant='contained' color='primary'>
                                Креирај
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </div>
    );
};

export default CreateRestaurantForm;
