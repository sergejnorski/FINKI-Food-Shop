import React, {useEffect, useState, useMemo} from 'react'
import "./Home.css"
import MultiItemCarousel from './MultiItemCarousel'
import RestaurantCard from '../Restaurant/RestaurantCard'
import {useDispatch, useSelector} from "react-redux";
import {getAllRestaurantsAction} from "../../State/Restaurant/Action";
import {useNavigate} from "react-router-dom";
import {Autocomplete, Button, Divider, Grid, TextField} from "@mui/material";
import EventCard from "../Profile/EventCard";

export const Home = () => {
  const dispatch = useDispatch()
  const {restaurant, auth} = useSelector(store => store);
  const foods = restaurant?.foods || ["food1", "food2"];
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFood, setSelectedFood] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = () => {
      dispatch(getAllRestaurantsAction());
      const now = new Date().getTime();
      const nextThreeMinuteBoundary = Math.ceil(now / (3 * 60 * 1000)) * (3 * 60 * 1000);
      const delay = Math.max(nextThreeMinuteBoundary - now, 3000);

      setTimeout(fetchData, delay);
    };

    fetchData();
    return () => {
      clearTimeout();
    };
  }, [dispatch]);

  const filteredFoods = useMemo(() => {
    if (!searchTerm) {
      const shuffled = [...foods].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, Math.min(3, foods.length));
    }
    return foods.filter((food) =>
      food?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, foods]);

  const handleFoodChange = (_, newFood) => {
    setSelectedFood(newFood);
  };

  const handleInputChange = (event, newInputValue) => {
    setSearchTerm(newInputValue);
    setSelectedFood(null); // Clear selection when typing
  };

  console.log(filteredFoods)

  const goToRestaurant = () => {
    if (selectedFood && auth.user) {
      navigate(`/restaurant/${restaurant.address.city}/${restaurant.name}/${restaurant.id}`)
    } else if (!auth.user) {
      navigate("/account/login");
    }
  };

  const getOptionLabel = (food) => food.name;

  return (
    <div className='pb-10'>
      <div>
        <section className='banner relative flex flex-col justify-evenly items-center'>
          <Grid container spacing={2} className="px-3 justify-center">
            <Grid item xs={8} sm={6} style={{ zIndex: 1 }}>
              <Autocomplete
                id="food-search"
                freeSolo
                options={filteredFoods}
                getOptionLabel={getOptionLabel}
                value={selectedFood}
                inputValue={searchTerm}
                onChange={handleFoodChange}
                onInputChange={handleInputChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    style={{
                      border: "1px solid white",
                      backgroundColor: 'white' // Ensure visible
                    }}
                    placeholder="Пребарајте ги вашите омилени продукти"
                    variant="outlined"
                    InputProps={{
                      ...params.InputProps,
                      type: "search",
                      style: { color: 'black' } // Ensure text visible
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6} sm={2}>
              <Button
                color="primary"
                variant="contained"
                style={{
                  height: "54px",
                  width: "100%",
                  zIndex: 1
                }}
                onClick={goToRestaurant}
                disabled={!selectedFood} // Only disable if no selection
              >
                Пребарувај
              </Button>
            </Grid>
          </Grid>

          <div className='w-[50vw] z-10 text-center banner-content'>
            <p className='text-2xl lg:text-6xl font-bold z-10 py-5'>FINKI Food Shop</p>
            <p className='z-10 text-gray-300 text-xl lg:text-4xl'>Свежи вкусови и квалитетни
              состојки,
              сите во една продавница за храна!</p>
          </div>
          <div className='cover absolute top-0 left-0 right-0'>

          </div>
          <div className='fadout'>

          </div>
        </section>
        <section className='p-10 lg:py-10 lg:px-20'>
          <p className='text-2xl font-semibold text-gray-400 py-3 pb-10'>Врвни производи</p>
          <MultiItemCarousel foods={restaurant?.foods}/>
        </section>
        <Divider/>
        <section className="px-5 pt-10 lg:px-20">
          <h1 className="pb-8 text-2xl font-semibold text-gray-400">
            Маркети
          </h1>
          <div className="flex flex-wrap items-center justify-around gap-5">
            {restaurant?.restaurants?.map((item) => (
              <RestaurantCard key={item?.id} item={item} />
            ))}
          </div>
        </section>

        <Divider className="pt-10" />

        {/*<div>*/}
        {/* <Divider />*/}
        {/* <section className="px-5 pt-10 lg:px-20">*/}
        {/* <h1 className="pb-8 text-2xl font-semibold text-gray-400">Events</h1>*/}
        {/* <div className="flex flex-wrap items-center justify-around gap-5">*/}
        {/* {restaurant?.restaurantsEvents?.map((item) => (*/}
        {/* <EventCard key={item?.id} event={item} />*/}
        {/* ))}*/}
        {/* </div>*/}
        {/* <Divider className="pt-10" />*/}
        {/* </section>*/}
        {/*</div>*/}

      </div>
    </div>
  )
}
export default Home;