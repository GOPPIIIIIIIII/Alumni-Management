package com.examly.springapp.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Request body for user registration")
public class RegisterRequest {

    @Schema(description = "Full name (alphabetic only)", example = "Gopi Kumar")
    private String name;

    @Schema(description = "Exactly 10 digit phone number", example = "7788556633")
    private String phoneNumber;

    @Schema(description = "Valid unique email address", example = "gopi@gmail.com")
    private String email;

    @Schema(description = "Min 8 chars with uppercase, lowercase, digit and special character", example = "Gopi@1234")
    private String password;

    @Schema(description = "Role: ADMIN, ALUMNI, MENTOR, CHAPTER_LEAD, ALUMNI_RELATIONS_OFFICE, GUEST", example = "ALUMNI")
    private String role;

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
}
