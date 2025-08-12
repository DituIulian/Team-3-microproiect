package com.example.demoShopGT.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import com.example.demoShopGT.service.APIService;
import com.example.demoShopGT.model.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // Allow all origins for development
public class FrontendController {

    @Autowired
    private APIService apiService;

    @GetMapping("/user/profile")
    public UserProfile getUserProfile() {
        System.out.println("🔍 API: Getting user profile...");
        return apiService.getUserProfile("user1");
    }

    @GetMapping("/rewards")
    public RewardResponse getRewards() {
        System.out.println("🎁 API: Getting all rewards...");
        return new RewardResponse(apiService.getRewards());
    }

    // NEW: Filter by rank
    @GetMapping("/rewards/rank/{rank}")
    public RewardResponse getRewardsByRank(@PathVariable String rank) {
        System.out.println("🏆 API: Getting rewards by rank: " + rank);
        return new RewardResponse(apiService.getRewardsByRank(rank));
    }

    // NEW: Filter by type
    @GetMapping("/rewards/type/{type}")
    public RewardResponse getRewardsByType(@PathVariable String type) {
        System.out.println("🔍 API: Getting rewards by type: " + type);
        return new RewardResponse(apiService.getRewardsByType(type));
    }

    // NEW: Filter by availability
    @GetMapping("/rewards/availability/{availability}")
    public RewardResponse getRewardsByAvailability(@PathVariable String availability) {
        System.out.println("📦 API: Getting rewards by availability: " + availability);
        return new RewardResponse(apiService.getRewardsByAvailability(availability));
    }

    // NEW: Filter by category
    @GetMapping("/rewards/category/{category}")
    public RewardResponse getRewardsByCategory(@PathVariable String category) {
        System.out.println("📂 API: Getting rewards by category: " + category);
        List<Reward> filteredRewards = apiService.getRewardsByCategory(category);
        return new RewardResponse(filteredRewards);
    }

    // NEW: Complex filtering endpoint
    @GetMapping("/rewards/filter")
    public RewardResponse getFilteredRewards(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String rank,
            @RequestParam(required = false) String type,
            @RequestParam(required = false) String availability,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice) {
        
        System.out.println("🔍 API: Filtering rewards with params: " + 
                          "category=" + category + ", rank=" + rank + ", type=" + type + 
                          ", availability=" + availability + ", price=" + minPrice + "-" + maxPrice);

        List<Reward> allRewards = apiService.getRewards();
        
        // Apply filters step by step
        if (category != null && !category.isEmpty()) {
            allRewards = apiService.getRewardsByCategory(category);
        }
        
        if (rank != null && !rank.isEmpty()) {
            List<Reward> rankFiltered = apiService.getRewardsByRank(rank);
            allRewards.retainAll(rankFiltered);
        }
        
        if (type != null && !type.isEmpty()) {
            List<Reward> typeFiltered = apiService.getRewardsByType(type);
            allRewards.retainAll(typeFiltered);
        }
        
        if (availability != null && !availability.isEmpty()) {
            List<Reward> availabilityFiltered = apiService.getRewardsByAvailability(availability);
            allRewards.retainAll(availabilityFiltered);
        }
        
        if (minPrice != null || maxPrice != null) {
            List<Reward> priceFiltered = apiService.getRewardsByPriceRange(minPrice, maxPrice);
            allRewards.retainAll(priceFiltered);
        }
        
        return new RewardResponse(allRewards);
    }

    @PostMapping("/cart/add")
    public AddToCartResponse addToCart(@RequestBody AddToCartRequest request) {
        System.out.println("🛒 API: Adding to cart...");
        return apiService.addToCart(request);
    }

    @GetMapping("/cart")
    public CartResponse getCart() {
        System.out.println("🛒 API: Getting cart...");
        return apiService.getCart("user1");
    }

    @PostMapping("/checkout")
    public CheckoutResponse checkout(@RequestBody CheckoutRequest request) {
        System.out.println("💳 API: Processing checkout...");
        return apiService.checkout(request);
    }

    @GetMapping("/user/history")
    public PurchaseHistoryResponse getPurchaseHistory() {
        System.out.println("📋 API: Getting purchase history...");
        return new PurchaseHistoryResponse(apiService.getPurchaseHistory("user1"));
    }
}
