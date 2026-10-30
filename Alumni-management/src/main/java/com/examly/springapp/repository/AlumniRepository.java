package com.examly.springapp.repository;

import com.examly.springapp.model.Alumni;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface AlumniRepository extends JpaRepository<Alumni, Long> {
    Optional<Alumni> findByEmail(String email);
    boolean existsByEmail(String email);
}
