package com.examly.springapp.service;

import com.examly.springapp.exception.ResourceNotFoundException;
import com.examly.springapp.model.MentorshipRequest;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.MentorshipRequestRepository;
import com.examly.springapp.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MentorshipService {

    private final MentorshipRequestRepository mentorshipRepo;
    private final UserRepository userRepository;

    public MentorshipService(MentorshipRequestRepository mentorshipRepo, UserRepository userRepository) {
        this.mentorshipRepo = mentorshipRepo;
        this.userRepository = userRepository;
    }

    public MentorshipRequest createRequest(Long mentorId, Long menteeId, String area) {
        User mentor = userRepository.findById(mentorId)
                .orElseThrow(() -> new ResourceNotFoundException("Mentor not found"));
        User mentee = userRepository.findById(menteeId)
                .orElseThrow(() -> new ResourceNotFoundException("Mentee not found"));
        MentorshipRequest req = new MentorshipRequest();
        req.setMentor(mentor);
        req.setMentee(mentee);
        req.setAreaOfMentorship(area);
        return mentorshipRepo.save(req);
    }

    public List<MentorshipRequest> getAll() {
        return mentorshipRepo.findAll();
    }

    public MentorshipRequest updateStatus(Long id, MentorshipRequest.Status status) {
        MentorshipRequest req = mentorshipRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Mentorship request not found"));
        req.setStatus(status);
        return mentorshipRepo.save(req);
    }

    public List<User> getMentors() {
        return userRepository.findAll().stream()
                .filter(u -> u.getRole() == User.Role.MENTOR)
                .toList();
    }
}
