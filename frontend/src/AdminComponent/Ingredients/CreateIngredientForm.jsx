import React, {useState} from "react";
import {Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {createIngredient, createIngredientCategory} from "../../State/Ingredients/Action";

const CreateIngredientForm = () => {

    const {restaurant, ingredients} = useSelector(store=>store)
    const dispatch=useDispatch();
    const jwt=localStorage.getItem("jwt");

    const [formData, setFormData] = useState({
        name: "",
        ingredientCategoryId: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const data={
            name:formData.categoryName,
            restaurantId:{
                id:1,
            },
        };
        console.log(data)

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
                <h1 className='text-gray-400 text-center text-xl pb-10'>Create Ingredient</h1>
                <form className="space-y-5" onSubmit={handleSubmit}>
                <TextField fullWidth
                           id="categoryName"
                           name="categoryName"
                           label="Category Type"
                           variant="outlined"
                           onChange={handleInputChange}
                           value={formData.categoryName}>
                </TextField>

                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Ingredient</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={formData.ingredientCategoryId}
                        label="Category"
                        onChange={handleInputChange}
                        name="ingredientCategoryId"
                    >
                        {ingredients.category.map((item) =><MenuItem value={item.id}>{item.name}</MenuItem>)}
                    </Select>
                </FormControl>

                <Button variant="contained" type="submit">
                    Create Ingredient
                </Button>
                </form>
            </div>
        </div>
    )
}

export default CreateIngredientForm;