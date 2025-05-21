import React from 'react'
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {Button} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const CarouselItem = ({image,title, price, restaurant, category}) =>{

  const navigate = useNavigate();
  const {auth} = useSelector(store => store);

  const handleAddItemToCart = () => {
    if (auth.user) {
      navigate(`/restaurant/${restaurant.address.city}/${restaurant.name}/${restaurant.id}?category=${category}`)
    } else {
      navigate('/account/login');
    }
  }

  return (
        <div className='flex flex-col justify-center items-center gap-1 p-6'>
            <img className='w-[10rem] h-[10rem] lg:h-[14rem] lg:w-[14rem] rounded-full object-cover object-center' src={image} alt="" />
            <br/>
          <span className='font-semibold text-gray-400 tex1t-lg'>{title}</span>
          <span className='font-semibold text-gray-400 tex1t-lg '>{price}.00</span>
          <Button
            onClick={handleAddItemToCart}
            variant="contained"
            color="primary"
            startIcon={<ShoppingCartIcon />}
            sx={{ '& .MuiButton-startIcon': { mr: 1 } }}
          >
            До маркетот
          </Button>
        </div>
    )
}
export default CarouselItem