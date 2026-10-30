package com.examly.springapp.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/events")
public class EventController {

    private static final List<Map<String, Object>> mockEvents = new ArrayList<>();

    static {
        Map<String, Object> e1 = new HashMap<>();
        e1.put("id", 1L);
        e1.put("title", "Global Alumni Leadership Summit 2026");
        e1.put("category", "Conference");
        e1.put("date", "Oct 15, 2026");
        e1.put("time", "09:00 AM EST");
        e1.put("location", "Grand Hyatt, San Francisco & Virtual");
        e1.put("attendeesCount", 142);
        e1.put("description", "Annual flagship gathering of industry leaders, founders, and academics.");
        e1.put("isRsvped", false);

        Map<String, Object> e2 = new HashMap<>();
        e2.put("id", 2L);
        e2.put("title", "Tech Founders & Investors Networking Mixer");
        e2.put("category", "Networking");
        e2.put("date", "Nov 02, 2026");
        e2.put("time", "06:30 PM PST");
        e2.put("location", "Downtown Tech Hub, Seattle");
        e2.put("attendeesCount", 88);
        e2.put("description", "Connect with venture capitalists and fellow startup founders.");
        e2.put("isRsvped", false);

        mockEvents.add(e1);
        mockEvents.add(e2);
    }

    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getEvents() {
        return ResponseEntity.ok(mockEvents);
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> createEvent(@RequestBody Map<String, Object> event) {
        event.put("id", (long) (mockEvents.size() + 1));
        event.put("attendeesCount", 1);
        event.put("isRsvped", true);
        mockEvents.add(0, event);
        return ResponseEntity.ok(event);
    }

    @PutMapping("/{id}/rsvp")
    public ResponseEntity<Map<String, Object>> rsvp(@PathVariable Long id) {
        for (Map<String, Object> e : mockEvents) {
            if (Objects.equals(e.get("id"), id)) {
                boolean current = Boolean.TRUE.equals(e.get("isRsvped"));
                e.put("isRsvped", !current);
                int count = (int) e.get("attendeesCount");
                e.put("attendeesCount", current ? count - 1 : count + 1);
                return ResponseEntity.ok(e);
            }
        }
        return ResponseEntity.notFound().build();
    }
}
