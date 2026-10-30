package com.examly.springapp.repository;

import com.examly.springapp.model.MentorshipRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MentorshipRequestRepository extends JpaRepository<MentorshipRequest, Long> {
    List<MentorshipRequest> findByMentorId(Long mentorId);
    List<MentorshipRequest> findByMenteeId(Long menteeId);
}
