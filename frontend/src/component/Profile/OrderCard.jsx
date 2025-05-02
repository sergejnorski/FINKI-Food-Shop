import {Button, Card} from '@mui/material'
import React from 'react'

export const OrderCard = ({item, order}) => {
  return (
    <Card className='flex justify-between items-center p-4'>
      <div className='flex items-center justify-between p-4'>
        <img className='h-16 w-16' src={item.food.images[0]} alt=""/>
      </div>
      <div>
        <p>{item?.food.name}</p>
        <p>{item?.totalPrice} ден.</p>
      </div>

      <div>
        <Button className='cursor-not-allowed'>{order.orderStatus}</Button>
      </div>
    </Card>
  )
}