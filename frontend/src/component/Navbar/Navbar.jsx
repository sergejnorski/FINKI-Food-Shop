import {Badge, Box, IconButton} from '@mui/material'
import React, {useEffect} from 'react'
import SearchIcon from '@mui/icons-material/Search';
import {Avatar} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import "./Navbar.css"
import {Person} from '@mui/icons-material';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {getAllCartItems} from "../../State/Cart/Action";

export const Navbar = () => {
  const navigate = useNavigate();
  const {auth, cart} = useSelector(store => store);

  const handleAvatarClick = () => {
    if (auth.user.role === "ROLE_CUSTOMER") {
      navigate("/my-profile")
    } else {
      navigate("/admin/restaurants");
    }
  }

  const dispatch = useDispatch();

  useEffect(() => {
    const reqData = {cartId: cart.cart?.id, token: localStorage.getItem("jwt")}
    dispatch(getAllCartItems(reqData));
  }, []);

  return (
    <Box className='px-5 top-0 z-50 py-[.8rem] bg-red-400 bg-opacity-50 lg:px-20 flex justify-between'>

      <div className='lg: mr-10 cursor-pointer flex item-center space-x-4'>
        <li onClick={() => navigate("/")} className='logo font-semibold text-gray-300 text-2xl'>
          FINKI Food Shop
        </li>
      </div>

      <div className='flex items-center space-x-2 lg:space-x-10'>
        <div className=''>
          {auth.user ?
              <Avatar onClick={handleAvatarClick}
                      sx={{bgcolor: "white", color: "#FFC0CB"}}>
                {auth.user?.fullName ? auth.user.fullName[0].toUpperCase() : ''}
              </Avatar> :
            <IconButton onClick={() => navigate("/account/login")}>
              <Person/>
            </IconButton>}
        </div>
        <div className=''>
          {auth.user ? <IconButton onClick={() => navigate('/cart')}>
              <Badge color='secondary' badgeContent={cart.cartItems?.length ?? cart.cart.item.length}>
                <ShoppingCartIcon sx={{fontSize: "1.5rem"}}/>
              </Badge>
            </IconButton> :
            <IconButton onClick={() => navigate('/account/login')}>
              <Badge color='secondary'>
                <ShoppingCartIcon sx={{fontSize: "1.5rem"}}/>
              </Badge>
            </IconButton>}
        </div>
      </div>
    </Box>
  )
}