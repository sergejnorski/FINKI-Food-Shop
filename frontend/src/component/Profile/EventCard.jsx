import {Card, CardActions, CardContent, CardMedia, IconButton, Typography} from '@mui/material'
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import {useSelector} from "react-redux";

export const EventCard = ({event}) => {
  const {restaurant} = useSelector(store => store);

  return (
    <div>
      <Card sx={{width: 345}}>
        <CardMedia
          sx={{height: 345}}
          image={event.imageUrl}/>
        <CardContent>
          <Typography variant='h5'>
            {event.eventName}
          </Typography>
          <Typography variant='body2'>
            50% off on your first order
          </Typography>
          <div className='py-2 space-y-2'>
            <p>{event.location}</p>
            <p className='text-sm text-blue-500'>{event.startDate}</p>
            <p className='text-sm text-red-500'>{event.endDate}</p>
          </div>
        </CardContent>
        <CardActions>
          {restaurant?.usersRestaurant != null && <IconButton>
            <DeleteIcon/>
          </IconButton>}
        </CardActions>
      </Card>
    </div>
  )
}
export default EventCard