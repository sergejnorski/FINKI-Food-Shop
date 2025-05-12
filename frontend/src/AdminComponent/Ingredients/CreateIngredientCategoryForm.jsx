import React, {useState} from "react";
import {Button, TextField} from "@mui/material";
import {createIngredientCategory} from "../../State/Ingredients/Action";
import {useDispatch, useSelector} from "react-redux";

const CreateIngredientCategoryForm = ({handleClose}) => {
    const dispatch=useDispatch();
    const jwt=localStorage.getItem("jwt");
    const {restaurant} = useSelector(store=>store)

    const [formData, setFormData] = useState({
        name: "",
        ingredientCategoryId: ""
    });
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!formData.name.trim()){
            setError("Please enter Ingredient Category Name");
            return;
        }
        else{
            handleClose();
        }
         const data = {name: formData.name, restaurantId: restaurant?.usersRestaurant?.id}
         dispatch(createIngredientCategory({data: data, jwt}));
         setError("");
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
                <h1 className='text-gray-400 text-center text-xl pb-10'>Додај категорија на состојки</h1>
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <TextField fullWidth
                               id="categoryName"
                               name="name"
                               label="Категорија на состојки"
                               variant="outlined"
                               onChange={handleInputChange}
                               value={formData.name}
                               error={!!error} 
                              helperText={error}
                               >
                    </TextField>

                    <Button variant="contained" type="submit">
                        Креирај
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default CreateIngredientCategoryForm;