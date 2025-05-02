import {
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography
} from '@mui/material'
import React, {useEffect, useState} from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MenuCard from './MenuCard';
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getRestaurantById, getRestaurantsCategory} from "../../State/Restaurant/Action";
import {getMenuItemsByRestaurantId} from "../../State/Menu/Action";

const foodTypes = [
  {label: "Сите", value: "all"},
  {label: "Вегетеријанско", value: "vegeterian"},
  {label: "Не-Вегетеријанско", value: "non_vegetarian"},
  {label: "Сезонски", value: "seasonal"}
]

const RestaurantDetails = () => {
  const [foodType, setFoodType] = useState("all")
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const {restaurant, menu} = useSelector(store => store);
  const [selectedCategory, setSelectedCategory] = useState("");
  const {id} = useParams();

  const handleFilter = (e, value) => {
    setFoodType(value)
  }

  const handleFilterCategory = (e, value) => {
    setSelectedCategory(value)
  }
  useEffect(() => {
    dispatch(getRestaurantById({jwt, restaurantId: id}));
    dispatch(getRestaurantsCategory({jwt, restaurantId: id}));
  }, []);

  useEffect(() => {
    console.log(foodType)
    console.log(selectedCategory)
    dispatch(getMenuItemsByRestaurantId({
      jwt,
      restaurantId: id,
      vegetarian: foodType === "vegeterian",
      nonveg: foodType === "non_vegetarian",
      seasonal: foodType === "seasonal",
      foodCategory: selectedCategory,
    }));
    console.log("restaurant: ", restaurant)
    console.log("menu: ", menu)
  }, [selectedCategory, foodType]);

  return (
    <div className='px-5 lg:px-20'>
      <section>
        <h3 className='text-gray-500 py-2 mt-10'>{restaurant.restaurant?.name}</h3>
      </section>

      <div>
        <Grid container spacing={2}>
          {restaurant?.restaurant?.images.map((item) => (
            <Grid item xs={12}>
              <img
                className="w-full h-[40vh] object-cover "
                src={item}
                alt=""
              />
            </Grid>
          ))}
        </Grid>
      </div>
      <div className='pt-3 pb-5'>
        <h1 className='text-4xl font-semibold'>{restaurant.restaurant?.name}</h1>
        <p className='text-gray-500 mt-1'>{restaurant.restaurant?.description}</p>
        <div className="space-y-3 mt-3">
          <p className='text-gray-500 flex items-center gap-3'>
            <LocationOnIcon/>
            <span>
              {restaurant.restaurant?.address?.streetAddress}, {restaurant.restaurant?.address?.city}
            </span>
          </p>
          <p className='text-gray-500 flex items-center gap-3'>
            <CalendarMonthIcon/>
            <span>{restaurant.restaurant?.openingHours}</span>
          </p>
        </div>
      </div>
      <Divider/>
      <section className='pt-[2rem] lg:flex relative'>
        <div className='space-y-10 lg:w-[20%] filter'>
          <div className='box space-y-5 lg:sticky top-28 '>
            <div>
              <Typography variant='h5' sx={{paddingBottom: "1rem"}}>
                Тип на храна
              </Typography>
              <FormControl className='py-10 space-y-5' component={"fieldset"}>
                <RadioGroup onChange={handleFilter} name='food_type' value={foodType}>
                  {foodTypes.map((item) => (<FormControlLabel
                    key={item.value}
                    value={item.value} control={<Radio/>} label={item.label}/>))}
                </RadioGroup>
              </FormControl>
            </div>
            <Divider/>

            <div>
              <Typography variant='h5' sx={{paddingBottom: "1rem"}}>
                Категорија
              </Typography>
              <FormControl className='py-10 space-y-5' component={"fieldset"}>
                <RadioGroup onChange={handleFilterCategory} name='food_category'
                            value={selectedCategory}>
                  {restaurant.categories.map((item) => (
                    <FormControlLabel
                      key={item.name}
                      value={item.name}
                      control={<Radio />}
                      label={item.name}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </div>
          </div>
        </div>
        <div className='space-y-5 lg:w-[80%] lg:pl-10'>
          {menu.menuItems.map((item) => <MenuCard item={item}/>)}
        </div>
      </section>
    </div>
  )
}
export default RestaurantDetails
