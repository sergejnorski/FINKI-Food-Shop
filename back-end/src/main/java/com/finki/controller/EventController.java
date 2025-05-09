package com.finki.controller;

import com.finki.model.Event;
import com.finki.service.EventService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/")
public class EventController {

    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @PostMapping("admin/event/create/{id}")
    public ResponseEntity<Event> createCategory(@RequestBody Event event,
                                                @RequestHeader("Authorization") String jwt,
                                                @PathVariable Long id) throws Exception {

        Event newEvent = eventService.createEvent(event,id);

        return new ResponseEntity<>(newEvent, HttpStatus.CREATED);
    }

    @GetMapping("event/all")
    public ResponseEntity<List<Event>> getAllEvents() throws Exception {

        List<Event> events = eventService.getAllEvents();

        return new ResponseEntity<>(events, HttpStatus.CREATED);
    }

    @GetMapping("event/id/{id}")
    public ResponseEntity<List<Event>> getEventById(@RequestHeader("Authorization") String jwt,
                                                    @PathVariable Long id) throws Exception {

        List<Event> events = eventService.getEvent(id);

        return new ResponseEntity<>(events, HttpStatus.CREATED);
    }
}
