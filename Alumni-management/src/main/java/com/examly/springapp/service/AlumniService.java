package com.examly.springapp.service;

import com.examly.springapp.exception.DuplicateAlumniException;
import com.examly.springapp.exception.InvalidNameException;
import com.examly.springapp.exception.InvalidPhoneException;
import com.examly.springapp.exception.ResourceNotFoundException;
import com.examly.springapp.model.Alumni;
import com.examly.springapp.repository.AlumniRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AlumniService {

    private final AlumniRepository alumniRepository;

    public AlumniService(AlumniRepository alumniRepository) {
        this.alumniRepository = alumniRepository;
    }

    public Alumni register(Alumni alumni) {
        validateName(alumni.getName());
        validatePhone(alumni.getPhone());
        if (alumniRepository.existsByEmail(alumni.getEmail())) {
            throw new DuplicateAlumniException("Alumni with this email already exists");
        }
        return alumniRepository.save(alumni);
    }

    public List<Alumni> getAll() {
        return alumniRepository.findAll();
    }

    public Alumni getById(Long id) {
        return alumniRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Alumni not found with id: " + id));
    }

    public Alumni update(Long id, Alumni updated) {
        Alumni existing = getById(id);
        validateName(updated.getName());
        validatePhone(updated.getPhone());
        existing.setName(updated.getName());
        existing.setPhone(updated.getPhone());
        existing.setEmail(updated.getEmail());
        existing.setGraduationYear(updated.getGraduationYear());
        existing.setProgramme(updated.getProgramme());
        existing.setCurrentEmployer(updated.getCurrentEmployer());
        existing.setCurrentRole(updated.getCurrentRole());
        existing.setLocation(updated.getLocation());
        existing.setStatus(updated.getStatus());
        return alumniRepository.save(existing);
    }

    public void delete(Long id) {
        if (!alumniRepository.existsById(id)) {
            throw new ResourceNotFoundException("Alumni not found with id: " + id);
        }
        alumniRepository.deleteById(id);
    }

    private void validateName(String name) {
        if (name == null || !name.matches("[a-zA-Z ]{2,100}")) {
            throw new InvalidNameException("Name must not contain numbers or special characters");
        }
    }

    private void validatePhone(String phone) {
        if (phone == null || !phone.matches("\\d{10}")) {
            throw new InvalidPhoneException("Phone Number must be exactly 10 digits long");
        }
    }
}
