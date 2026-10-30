package com.examly.springapp.controller;

import com.examly.springapp.dto.MentorshipRequestDto;
import com.examly.springapp.model.MentorshipRequest;
import com.examly.springapp.model.User;
import com.examly.springapp.service.MentorshipService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mentorship")
public class MentorshipController {

    private final MentorshipService mentorshipService;

    public MentorshipController(MentorshipService mentorshipService) {
        this.mentorshipService = mentorshipService;
    }

    @GetMapping("/mentors")
    public ResponseEntity<List<User>> getMentors() {
        return ResponseEntity.ok(mentorshipService.getMentors());
    }

    @PostMapping("/request")
    public ResponseEntity<MentorshipRequest> createRequest(@RequestBody MentorshipRequestDto dto) {
        return ResponseEntity.ok(mentorshipService.createRequest(dto.getMentorId(), dto.getMenteeId(), dto.getAreaOfMentorship()));
    }

    @GetMapping
    public ResponseEntity<List<MentorshipRequest>> getAll() {
        return ResponseEntity.ok(mentorshipService.getAll());
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<MentorshipRequest> updateStatus(@PathVariable Long id, @RequestParam String status) {
        return ResponseEntity.ok(mentorshipService.updateStatus(id, MentorshipRequest.Status.valueOf(status.toUpperCase())));
    }
}
