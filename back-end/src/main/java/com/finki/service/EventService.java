package com.finki.service;

import com.finki.model.Event;
import java.util.List;

public interface EventService {

    public Event createEvent(Event event, Long id) throws Exception;

    public List<Event> getAllEvents() throws Exception;

    public Event deleteEvent(Event event, Long id) throws Exception;

    public Event updateEvent(Event event, Long id) throws Exception;

    public List<Event> getEvent(Long id) throws Exception;
}
