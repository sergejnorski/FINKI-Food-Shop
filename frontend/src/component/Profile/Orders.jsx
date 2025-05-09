import React, {useEffect} from 'react'
import { OrderCard } from './OrderCard'
import {useDispatch, useSelector} from "react-redux";
import {getUsersOrders} from "../../State/Order/Action";

export const Orders = () =>{

  const jwt = localStorage.getItem("jwt");
  const dispatch = useDispatch();
  const {auth, order} = useSelector(store => store);

  useEffect(() => {
    dispatch(getUsersOrders(jwt));
  }, [auth.jwt]);

    return(
        <div className='flex items-center flex-col'>
            <h1 className='text-xl text-center py-7 font-semibold'>Мои Нарачки</h1>
            <div className='space-y-5 w-full lg:w-1/2'>
                {
                    order.orders.map((order)=> order.items.map((item) => <OrderCard order={order} item={item}/>))
                }
            </div>
        </div>
    )
}