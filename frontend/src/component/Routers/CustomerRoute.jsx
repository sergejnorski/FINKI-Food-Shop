//import { Home } from '@mui/icons-material'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import  Home  from '../Home/Home'
import RestaurantDetails from '../Restaurant/RestaurantDetails'
import Cart from '../Cart/Cart'
import Profile from '../Profile/Profile'
import { Navbar } from '../Navbar/Navbar'

export const CustomerRoute = () =>{
    return(
        <div>
            <Navbar/>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/account/:register' element={<Home/>}/>
                <Route path='/restaurant/:city/:title/:id' element={<RestaurantDetails/>}/>
                <Route path='/cart' element={<Cart/>}/>
                <Route path='/my-profile/*' element={<Profile/>}/>
            </Routes>
        </div>
    )
}
