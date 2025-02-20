import { Button, Card } from '@mui/material'
import React from 'react'

export const OrderCard = () =>{
    return(
        <Card className='flex justify-between items-center p-5'>
            <div className='flex items-center space-x-5'>
                <img className='h-16 w-16' src="https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_640.jpg" alt="" />
                <div>
                    <p>Pizza</p>
                    <p>300 Ден</p>
                </div>
            </div>
            <div>
                <Button  className='cursor-not-allowed'>Completed</Button>
            </div>
        </Card>
    )
}