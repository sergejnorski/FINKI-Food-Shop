import { Badge, Box, IconButton } from '@mui/material'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { Avatar } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import "./Navbar.css"

export const Navbar = () =>{
    return(
        <Box className='px-5 sticky top-0 z-50 py-[.8rem] bg-[#e91e63] lg:px-20 flex justify-between'>
        
                <div className='lg: mr-10 cursor-pointer flex item-center space-x-4'>
                        <li className='logo font-semibold text-gray-300 text-2xl'>
                            FINKI Food Shop
                        </li>
                </div>
           
            <div className='flex items-center space-x-2 lg:space-x-10'>
                <div className=''>
                    <IconButton>
                        <SearchIcon sx={{fontSize:"1.5rem"}}/>
                    </IconButton>
                </div>
                <div className=''>
                    <Avatar sx={{bgcolor:"white",color:"#FFC0CB"}}>C</Avatar>
                </div>
                <div className=''>
                    <IconButton>
                        <Badge color='secondary' badgeContent={3}>
                            <ShoppingCartIcon sx={{fontSize:"1.5rem"}}/>
                        </Badge>
                    </IconButton>               
                </div>
            </div>
        </Box>
    )
}