package com.examly.springapp.dto;

public class MentorshipRequestDto {
    private Long mentorId;
    private Long menteeId;
    private String areaOfMentorship;

    public Long getMentorId() { return mentorId; }
    public void setMentorId(Long mentorId) { this.mentorId = mentorId; }
    public Long getMenteeId() { return menteeId; }
    public void setMenteeId(Long menteeId) { this.menteeId = menteeId; }
    public String getAreaOfMentorship() { return areaOfMentorship; }
    public void setAreaOfMentorship(String areaOfMentorship) { this.areaOfMentorship = areaOfMentorship; }
}
