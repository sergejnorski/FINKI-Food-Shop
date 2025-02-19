import { Chip, IconButton } from '@mui/material'
import React from 'react'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
export const CartItem = () => {
    return (
        <div className='px-5'>
            <div className='lg:flex items-center lg:space-x-5'>
                <div>
                    <img className='w-[5rem] h-[5rem] object-cover' src="https://cdn.pixabay.com/photo/2020/06/08/16/49/pizza-5275191_640.jpg" alt="" />
                </div>
                <div className='flex items-center justify-between lg:w-[70%]'>
                    <div className='space-y-1 lg:space-y-3 w-full'>
                        <p>Pizza</p>
                        <div className='flex justify-between items-center'>
                            <div className='flex items-center space-x-1'>
                                <IconButton>
                                    <RemoveCircleOutlineIcon />
                                </IconButton>
                                <div className='w-5 h-5 text-xs flex items-center justify-center'>
                                    {5}
                                </div>
                                <IconButton>
                                    <AddCircleOutlineIcon/>
                                </IconButton>

                            </div>
                        </div>
                    </div>
                    <p>450 Ден</p>
                </div>
            </div>
            <div className='pt-3 space-x-2'>
                {[1,1,1].map((item)=><Chip label={"Bread"} />)}
            </div>
        </div>
    )
}