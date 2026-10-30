package com.examly.springapp.controller;

import com.examly.springapp.dto.DonationRequest;
import com.examly.springapp.model.Donation;
import com.examly.springapp.model.DonationCampaign;
import com.examly.springapp.service.DonationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class DonationController {

    private final DonationService donationService;

    public DonationController(DonationService donationService) {
        this.donationService = donationService;
    }

    @GetMapping("/campaigns")
    public ResponseEntity<List<DonationCampaign>> getCampaigns() {
        return ResponseEntity.ok(donationService.getAllCampaigns());
    }

    @PostMapping("/campaigns")
    public ResponseEntity<DonationCampaign> createCampaign(@RequestBody DonationCampaign campaign) {
        return ResponseEntity.ok(donationService.createCampaign(campaign));
    }

    @GetMapping("/campaigns/{id}/analytics")
    public ResponseEntity<Map<String, Object>> getCampaignAnalytics(@PathVariable Long id) {
        DonationCampaign campaign = donationService.getCampaignById(id);
        List<Donation> donations = donationService.getDonationsByCampaign(id);
        return ResponseEntity.ok(Map.of(
            "campaign", campaign,
            "totalDonations", donations.size(),
            "raisedAmount", campaign.getRaisedAmount(),
            "targetAmount", campaign.getTargetAmount()
        ));
    }

    @PostMapping("/donations")
    public ResponseEntity<Donation> donate(@RequestBody DonationRequest request) {
        return ResponseEntity.ok(donationService.donate(
            request.getCampaignId(),
            request.getDonorId(),
            request.getAmount(),
            request.isAnonymous()
        ));
    }

    @GetMapping("/donations/receipt/{id}")
    public ResponseEntity<Donation> getReceipt(@PathVariable Long id) {
        return ResponseEntity.ok(donationService.getDonationById(id));
    }
}
