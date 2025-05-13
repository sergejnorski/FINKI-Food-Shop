package com.finki.service;

import com.finki.model.Event;
import java.util.List;

public interface EventService {

    Event createEvent(Event event, Long id) throws Exception;

    List<Event> getAllEvents() throws Exception;

    Event deleteEvent(Event event, Long id) throws Exception;

    Event updateEvent(Event event, Long id) throws Exception;

    List<Event> getEvent(Long id) throws Exception;
}
