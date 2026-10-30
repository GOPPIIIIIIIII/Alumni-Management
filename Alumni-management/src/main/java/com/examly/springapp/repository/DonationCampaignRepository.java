package com.examly.springapp.repository;

import com.examly.springapp.model.DonationCampaign;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DonationCampaignRepository extends JpaRepository<DonationCampaign, Long> {
}
