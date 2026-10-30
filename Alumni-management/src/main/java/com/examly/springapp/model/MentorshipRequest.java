package com.examly.springapp.model;

import jakarta.persistence.*;

@Entity
@Table(name = "mentorship_requests")
public class MentorshipRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "mentor_id", nullable = false)
    private User mentor;

    @ManyToOne
    @JoinColumn(name = "mentee_id", nullable = false)
    private User mentee;

    @Column(name = "area_of_mentorship")
    private String areaOfMentorship;

    @Enumerated(EnumType.STRING)
    private Status status = Status.REQUESTED;

    @Column(name = "sessions_completed")
    private int sessionsCompleted = 0;

    public enum Status { REQUESTED, ACCEPTED, ACTIVE, COMPLETED, DECLINED }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public User getMentor() { return mentor; }
    public void setMentor(User mentor) { this.mentor = mentor; }
    public User getMentee() { return mentee; }
    public void setMentee(User mentee) { this.mentee = mentee; }
    public String getAreaOfMentorship() { return areaOfMentorship; }
    public void setAreaOfMentorship(String areaOfMentorship) { this.areaOfMentorship = areaOfMentorship; }
    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }
    public int getSessionsCompleted() { return sessionsCompleted; }
    public void setSessionsCompleted(int sessionsCompleted) { this.sessionsCompleted = sessionsCompleted; }
}
