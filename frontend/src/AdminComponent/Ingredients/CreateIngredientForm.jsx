import React, {useState} from "react";
import {Button, FormControl, InputLabel, MenuItem, Select, TextField,FormHelperText} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {createIngredient, createIngredientCategory} from "../../State/Ingredients/Action";

const CreateIngredientForm = ({handleClose}) => {

    const {restaurant, ingredients} = useSelector(store=>store)
    const dispatch=useDispatch();
    const jwt=localStorage.getItem("jwt");

    const [formData, setFormData] = useState({
        name: '',
        ingredientCategoryId: '',
    });
    const [errors, setErrors] = useState({
        name: false,
        ingredientCategoryId: false
      });

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!formData.name.trim()){
            setErrors((prevErrors)=>({
                ...prevErrors,
                name:true
            }));
            return;
        }
        if(!formData.ingredientCategoryId){
            setErrors((prevErrors)=>({
                ...prevErrors,
                ingredientCategoryId: true
            }));
            return;
        }
        setErrors({
            name: false,
            ingredientCategoryId: false
        })

        const data = {
            name: formData.name,
            categoryId: formData.ingredientCategoryId,
            restaurantId: restaurant?.usersRestaurant?.id
          };
         dispatch(createIngredient({data,jwt}))
          handleClose();

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
                <h1 className='text-gray-400 text-center text-xl pb-10'>Додај состојка</h1>
                <form className="space-y-5" onSubmit={handleSubmit}>
                <TextField fullWidth
                           id="ingredient"
                           name="name"
                           label="Состојка"
                           variant="outlined"
                           onChange={handleInputChange}
                           value={formData.name}
                           error={errors.name}
            helperText={errors.name ? 'Ingredient name is required' : ''}
                           >
                </TextField>

                <FormControl fullWidth variant="outlined" error={errors.ingredientCategoryId}>
            <InputLabel id="category-label">Категорија</InputLabel>
            <Select
              labelId="category-label"
              id="category"
              name="ingredientCategoryId"
              value={formData.ingredientCategoryId}
              onChange={handleInputChange}
              label="Category"
            >
              {ingredients?.category?.map((option) => (
                <MenuItem key={option} value={option.id}>
                  {option.name || 'Select Category'}
                </MenuItem>
              ))}
            </Select>
            {errors.ingredientCategoryId && <FormHelperText>Category is required</FormHelperText>}
          </FormControl>

                <Button variant="contained" type="submit">
                    Додај
                </Button>
                </form>
            </div>
        </div>
    )
}

export default CreateIngredientForm;