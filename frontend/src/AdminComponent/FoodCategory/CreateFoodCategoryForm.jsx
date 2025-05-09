import React, {useState} from "react";
import {Button, TextField,Typography } from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {createCategoryAction} from "../../State/Restaurant/Action";

const CreateFoodCategoryForm = ({handleClose}) => {
    const {restaurant} = useSelector((store) => store);
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        categoryName: "",
        restaurantId: ""
    });
    const [categoryNameError, setCategoryNameError] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        if(formData.categoryName.trim()){
            const data={
                name: formData.categoryName,
                restaurantId: formData.restaurantId
            };
        dispatch(createCategoryAction({reqData:data, jwt:localStorage.getItem("jwt")}));
        setCategoryNameError(false); 
        handleClose();
        }
        else {
            setCategoryNameError(true);
        }
    }

    const handleInputChange = (e) => {
        const {name, value}=e.target
        setFormData({
            ...formData, [name]:value
        })
    }

    return (
        <div className=''>
            <div className='p-5'>
                <h1 className='text-gray-400 text-center text-xl pb-10'>Create Food Category</h1>
                <form className="space-y-5" onSubmit={handleSubmit}>
                <TextField fullWidth
                           id="categoryName"
                           name="categoryName"
                           label="Food Category"
                           variant="outlined"
                           onChange={handleInputChange}
                           value={formData.categoryName}>
                            error={categoryNameError}
                </TextField>
                {categoryNameError && ( 
                        <Typography variant="body2" color="error">
                            Category name is required.
                        </Typography>
                    )}
                <Button variant="contained" type="submit">
                    Create Category
                </Button>
                </form>
            </div>
        </div>
    )
}

export default CreateFoodCategoryForm;