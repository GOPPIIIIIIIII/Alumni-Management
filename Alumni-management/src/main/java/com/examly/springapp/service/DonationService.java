package com.examly.springapp.service;

import com.examly.springapp.exception.ResourceNotFoundException;
import com.examly.springapp.model.Donation;
import com.examly.springapp.model.DonationCampaign;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.DonationCampaignRepository;
import com.examly.springapp.repository.DonationRepository;
import com.examly.springapp.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Service
public class DonationService {

    private final DonationRepository donationRepository;
    private final DonationCampaignRepository campaignRepository;
    private final UserRepository userRepository;

    public DonationService(DonationRepository donationRepository,
                           DonationCampaignRepository campaignRepository,
                           UserRepository userRepository) {
        this.donationRepository = donationRepository;
        this.campaignRepository = campaignRepository;
        this.userRepository = userRepository;
    }

    public DonationCampaign createCampaign(DonationCampaign campaign) {
        return campaignRepository.save(campaign);
    }

    public List<DonationCampaign> getAllCampaigns() {
        return campaignRepository.findAll();
    }

    public DonationCampaign getCampaignById(Long id) {
        return campaignRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Campaign not found with id: " + id));
    }

    @Transactional
    public Donation donate(Long campaignId, Long donorId, BigDecimal amount, boolean anonymous) {
        if (amount == null || amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Donation must be positive");
        }
        DonationCampaign campaign = getCampaignById(campaignId);
        User donor = userRepository.findById(donorId)
                .orElseThrow(() -> new ResourceNotFoundException("Donor not found"));

        Donation donation = new Donation();
        donation.setCampaign(campaign);
        donation.setDonor(donor);
        donation.setAmount(amount);
        donation.setAnonymous(anonymous);
        donation.setTransactionId(UUID.randomUUID().toString());
        donation.setReceiptUrl("/api/donations/receipt/" + UUID.randomUUID());

        campaign.setRaisedAmount(campaign.getRaisedAmount().add(amount));
        campaignRepository.save(campaign);

        return donationRepository.save(donation);
    }

    public Donation getDonationById(Long id) {
        return donationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Donation not found with id: " + id));
    }

    public List<Donation> getDonationsByCampaign(Long campaignId) {
        return donationRepository.findByCampaignId(campaignId);
    }
}
