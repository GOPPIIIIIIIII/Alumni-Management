package com.examly.springapp.controller;

import com.examly.springapp.dto.AlumniRequest;
import com.examly.springapp.model.Alumni;
import com.examly.springapp.service.AlumniService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/alumni")
public class AlumniController {

    private final AlumniService alumniService;

    public AlumniController(AlumniService alumniService) {
        this.alumniService = alumniService;
    }

    @PostMapping("/register")
    public ResponseEntity<Alumni> register(@RequestBody AlumniRequest request) {
        Alumni alumni = new Alumni();
        alumni.setName(request.getName());
        alumni.setPhone(request.getPhone());
        alumni.setEmail(request.getEmail());
        alumni.setGraduationYear(request.getGraduationYear());
        alumni.setProgramme(request.getProgramme());
        alumni.setCurrentEmployer(request.getCurrentEmployer());
        alumni.setCurrentRole(request.getCurrentRole());
        alumni.setLocation(request.getLocation());
        if (request.getStatus() != null) {
            alumni.setStatus(Alumni.Status.valueOf(request.getStatus().toUpperCase()));
        }
        return ResponseEntity.ok(alumniService.register(alumni));
    }

    @GetMapping("/directory")
    public ResponseEntity<List<Alumni>> getAll() {
        return ResponseEntity.ok(alumniService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Alumni> getById(@PathVariable Long id) {
        return ResponseEntity.ok(alumniService.getById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Alumni> update(@PathVariable Long id, @RequestBody AlumniRequest request) {
        Alumni alumni = new Alumni();
        alumni.setName(request.getName());
        alumni.setPhone(request.getPhone());
        alumni.setEmail(request.getEmail());
        alumni.setGraduationYear(request.getGraduationYear());
        alumni.setProgramme(request.getProgramme());
        alumni.setCurrentEmployer(request.getCurrentEmployer());
        alumni.setCurrentRole(request.getCurrentRole());
        alumni.setLocation(request.getLocation());
        if (request.getStatus() != null) {
            alumni.setStatus(Alumni.Status.valueOf(request.getStatus().toUpperCase()));
        }
        return ResponseEntity.ok(alumniService.update(id, alumni));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        alumniService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
