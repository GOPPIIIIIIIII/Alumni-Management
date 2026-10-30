package com.examly.springapp.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Response returned after successful registration or login")
public class AuthResponse {

    @Schema(description = "Auto-generated user ID", example = "1")
    private Long id;

    @Schema(description = "JWT Bearer token", example = "eyJhbGciOiJIUzI1NiJ9...")
    private String token;

    @Schema(description = "User role", example = "ALUMNI")
    private String role;

    @Schema(description = "User full name", example = "Gopi")
    private String name;

    @Schema(description = "User email", example = "gopi@gmail.com")
    private String email;

    public AuthResponse(Long id, String token, String role, String name, String email) {
        this.id = id;
        this.token = token;
        this.role = role;
        this.name = name;
        this.email = email;
    }

    public Long getId() { return id; }
    public String getToken() { return token; }
    public String getRole() { return role; }
    public String getName() { return name; }
    public String getEmail() { return email; }
}
