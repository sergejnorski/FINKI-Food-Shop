package com.finki.service.impl;

import com.finki.model.Event;
import com.finki.model.Restaurant;
import com.finki.repository.EventRepository;
import com.finki.repository.RestaurantRepository;
import com.finki.service.EventService;
import com.finki.service.RestaurantService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class EventServiceImpl implements EventService {

    private final RestaurantService restaurantService;
    private final RestaurantRepository restaurantRepository;
    private final EventRepository eventRepository;

    public EventServiceImpl(RestaurantService restaurantService, RestaurantRepository restaurantRepository, EventRepository eventRepository) {
        this.restaurantService = restaurantService;
        this.restaurantRepository = restaurantRepository;
        this.eventRepository = eventRepository;
    }

    @Override
    public Event createEvent(Event event, Long id) throws Exception {

        Restaurant restaurant =restaurantService.findRestaurantById(id);

        Event newEvent= new Event();

        newEvent.setEventName(event.getEventName());
        newEvent.setRestaurant(restaurant);
        newEvent.setLocation(event.getLocation());
        newEvent.setImageUrl(event.getImageUrl());
        newEvent.setEndDate(event.getEndDate());
        newEvent.setStartDate(event.getStartDate());

        eventRepository.save(newEvent);
        restaurant.getEvents().add(newEvent);
        restaurantRepository.save(restaurant);

        return newEvent;
    }

    @Override
    public List<Event> getAllEvents() throws Exception {
        return eventRepository.findAll();
    }

    @Override
    public Event deleteEvent(Event event, Long id) throws Exception {
        return null;
    }

    @Override
    public Event updateEvent(Event event, Long id) throws Exception {
        return null;
    }

    @Override
    public List<Event> getEvent(Long id) throws Exception {

        List<Event> events=eventRepository.findAll();
        ArrayList<Event> restaurantEvents= new ArrayList<>();

        for (Event e:events){
            if (Objects.equals(e.getRestaurant().getId(), id)){
                restaurantEvents.add(e);
            }
        }
        return  restaurantEvents;
    }
}
