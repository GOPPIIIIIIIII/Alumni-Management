package com.examly.springapp.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/jobs")
public class JobController {

    private static final List<Map<String, Object>> mockJobs = new ArrayList<>();

    static {
        Map<String, Object> j1 = new HashMap<>();
        j1.put("id", 1L);
        j1.put("title", "Lead Software Architect — AI Systems");
        j1.put("company", "QuantumLabs Global");
        j1.put("location", "San Francisco, CA (Hybrid)");
        j1.put("type", "Full-time");
        j1.put("salary", "$180,000 - $220,000");
        j1.put("posted", "2 days ago");
        j1.put("featured", true);
        j1.put("description", "Lead the architectural design of high-throughput AI inference pipelines and distributed agent systems.");

        Map<String, Object> j2 = new HashMap<>();
        j2.put("id", 2L);
        j2.put("title", "Senior Product Manager");
        j2.put("company", "FinTech Nexus");
        j2.put("location", "New York, NY (Remote)");
        j2.put("type", "Full-time");
        j2.put("salary", "$150,000 - $180,000");
        j2.put("posted", "3 days ago");
        j2.put("featured", false);
        j2.put("description", "Drive roadmap execution for next-generation cross-border payment protocols.");

        Map<String, Object> j3 = new HashMap<>();
        j3.put("id", 3L);
        j3.put("title", "Principal Machine Learning Engineer");
        j3.put("company", "BioHealth Corp");
        j3.put("location", "Boston, MA");
        j3.put("type", "Full-time");
        j3.put("salary", "$190,000 - $240,000");
        j3.put("posted", "5 days ago");
        j3.put("featured", false);
        j3.put("description", "Build generative models for protein structure prediction and biomarker discovery.");

        mockJobs.add(j1);
        mockJobs.add(j2);
        mockJobs.add(j3);
    }

    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getJobs() {
        return ResponseEntity.ok(mockJobs);
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> createJob(@RequestBody Map<String, Object> job) {
        job.put("id", (long) (mockJobs.size() + 1));
        job.put("posted", "Just now");
        mockJobs.add(0, job);
        return ResponseEntity.ok(job);
    }
}
