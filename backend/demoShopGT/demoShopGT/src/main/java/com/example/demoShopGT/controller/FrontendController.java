package com.example.demoShopGT.controller;

import com.example.demoShopGT.model.*;
import com.example.demoShopGT.service.APIService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class FrontendController {
	
	@Autowired
	private APIService apiService;
	
	@GetMapping("/user/profile")
	public UserProfile getProfile(@RequestParam(defaultValue = "user1") String userid) {
		return apiService.getUserProfile(userid);
	}
	
	@GetMapping("/rewards")
	public RewardResponse getAllRewards(){
		List<Reward> rewards = apiService.getRewards();
		RewardResponse response = new RewardResponse();
		response.setRewards(rewards);
		return response;
	}
	
	@PostMapping("/cart/add")
	public AddToCartResponse addToCart(@RequestBody AddToCartRequest request) {
		return apiService.addToCart(request);
	}
	
	@GetMapping("/cart")
	public CartResponse viewCart(@RequestParam(defaultValue = "user1") String userid) {
		return apiService.getCart(userid);
	}
	
	@PostMapping("/checkout")
	public CheckoutResponse checkout(@RequestBody CheckoutRequest request) {
		return apiService.checkout(request);
	}
	
	@GetMapping("/user/history")
	public PurchaseHistoryResponse getHistory(@RequestParam(defaultValue = "user1") String userId){
		List<PurchaseHistoryItem> purchases = apiService.getPurchaseHistory(userId);
		PurchaseHistoryResponse response = new PurchaseHistoryResponse();
		response.setPurchases(purchases);
		return response;
	}
	

}
