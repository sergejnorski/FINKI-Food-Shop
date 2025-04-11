import { Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material'
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';




export const EventCard = () =>{
    return(
        <div>
            <Card sx={{width:345}}>
                <CardMedia
                sx={{height:345}}
                image='https://cdn.pixabay.com/photo/2015/04/08/13/13/food-712665_640.jpg'/>
                <CardContent>
                    <Typography variant='h5'>
                        Pomodoro
                    </Typography>
                    <Typography variant='body2'>
                        50% off on your first order
                    </Typography>
                    <div className='py-2 space-y-2'>
                        <p>{"Kumanovo"}</p>
                        <p className='text-sm text-blue-500'>February 20, 2025, 23:00</p>
                        <p className='text-sm text-red-500'>February 21, 2025  23:00 </p> 
                        
                    </div>
                </CardContent>
                {false  &&<CardActions>
                    <IconButton>
                        <DeleteIcon/>
                    </IconButton>
                </CardActions>}
            </Card>
        </div>
    )
}
export default EventCard