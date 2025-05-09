import React from 'react'
import { EventCard } from './EventCard'
import {useSelector} from "react-redux";

export const Events = () =>{
    const {restaurant} = useSelector((store) => store);

    return (
      <div>
          {restaurant?.restaurantsEvents &&
          restaurant?.restaurantsEvents.length > 0 ? (
            <div className="flex flex-wrap gap-5 px-5 py-5 mt-5">
                {restaurant.restaurantsEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-80 ">
                <p className="text-gray-500 ">No Events Available</p>
            </div>
          )}
      </div>
    );
}