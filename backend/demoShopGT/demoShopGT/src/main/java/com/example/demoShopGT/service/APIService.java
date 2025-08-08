package com.example.demoShopGT.service;

import com.example.demoShopGT.model.*;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class APIService {
    
    // In-memory storage for demo purposes
    private Map<String, UserProfile> users = new ConcurrentHashMap<>();
    private Map<String, Reward> rewards = new ConcurrentHashMap<>();
    private Map<String, List<CartItem>> userCarts = new ConcurrentHashMap<>();
    private Map<String, List<PurchaseHistoryItem>> userHistory = new ConcurrentHashMap<>();
    
    public APIService() {
        initializeDemoData();
    }
    
    private void initializeDemoData() {
        // Initialize demo user
        UserProfile demoUser = new UserProfile("user1", "Demo User", "/avatar.jpg", 150);
        users.put("user1", demoUser);
        
        // Initialize demo rewards
        rewards.put("reward1", new Reward("reward1", "Coffee Mug", "Premium coffee mug", 
            "High-quality ceramic coffee mug with company logo", 25.0, "/mug.jpg", "Accessories", true, 50));
        rewards.put("reward2", new Reward("reward2", "T-Shirt", "Cotton t-shirt", 
            "100% cotton t-shirt with custom design", 35.0, "/tshirt.jpg", "Clothing", true, 30));
        rewards.put("reward3", new Reward("reward3", "Gift Card", "$50 Gift Card", 
            "Digital gift card for online purchases", 50.0, "/giftcard.jpg", "Digital", true, 100));
        
        // Initialize empty cart and history for demo user
        userCarts.put("user1", new ArrayList<>());
        userHistory.put("user1", new ArrayList<>());
    }
    
    public UserProfile getUserProfile(String userId) {
        return users.getOrDefault(userId, users.get("user1")); // Default to demo user
    }
    
    public List<Reward> getRewards() {
        return new ArrayList<>(rewards.values());
    }
    
    public AddToCartResponse addToCart(AddToCartRequest request) {
        String userId = "user1"; // Assuming default user for demo
        
        Reward reward = rewards.get(request.getRewardId());
        if (reward == null) {
            return new AddToCartResponse(false, "Reward not found", null);
        }
        
        if (!reward.isInStock() || reward.getStockCount() < request.getQuantity()) {
            return new AddToCartResponse(false, "Insufficient stock", null);
        }
        
        List<CartItem> cart = userCarts.computeIfAbsent(userId, k -> new ArrayList<>());
        
        // Check if item already in cart
        Optional<CartItem> existingItem = cart.stream()
            .filter(item -> item.getRewardId().equals(request.getRewardId()))
            .findFirst();
        
        if (existingItem.isPresent()) {
            existingItem.get().setQuantity(existingItem.get().getQuantity() + request.getQuantity());
        } else {
            cart.add(new CartItem(reward.getId(), reward.getName(), reward.getPrice(), request.getQuantity()));
        }
        
        // Calculate total points and create CartResponse
        double totalPoints = cart.stream().mapToDouble(item -> item.getPrice() * item.getQuantity()).sum();
        CartResponse cartResponse = new CartResponse(new ArrayList<>(cart), totalPoints);
        
        return new AddToCartResponse(true, "Item added to cart successfully", cartResponse);
    }
    
    public CartResponse getCart(String userId) {
        userId = userId != null ? userId : "user1";
        List<CartItem> items = userCarts.getOrDefault(userId, new ArrayList<>());
        double totalPoints = items.stream().mapToDouble(item -> item.getPrice() * item.getQuantity()).sum();
        return new CartResponse(items, totalPoints);
    }
    
    public CheckoutResponse checkout(CheckoutRequest request) {
        String userId = "user1"; // Assuming default user for demo
        
        if (request.getItems() == null || request.getItems().isEmpty()) {
            return new CheckoutResponse(false, "No items to checkout", 0, null, null);
        }
        
        List<CartItem> purchasedItems = new ArrayList<>();
        double totalPointsSpent = 0;
        
        // Process each item in the checkout request
        for (CartItem checkoutItem : request.getItems()) {
            Reward reward = rewards.get(checkoutItem.getRewardId());
            if (reward == null) {
                return new CheckoutResponse(false, "Reward not found: " + checkoutItem.getRewardId(), 0, null, null);
            }
            
            if (!reward.isInStock() || reward.getStockCount() < checkoutItem.getQuantity()) {
                return new CheckoutResponse(false, "Insufficient stock for: " + reward.getName(), 0, null, null);
            }
            
            double itemTotal = reward.getPrice() * checkoutItem.getQuantity();
            totalPointsSpent += itemTotal;
            
            // Create purchased item using CartItem
            purchasedItems.add(new CartItem(
                reward.getId(), 
                reward.getName(), 
                reward.getPrice(),
                checkoutItem.getQuantity()
            ));
            
            // Update stock
            reward.setStockCount(reward.getStockCount() - checkoutItem.getQuantity());
            if (reward.getStockCount() <= 0) {
                reward.setInStock(false);
            }
        }
        
        // Check if user has enough points
        UserProfile user = users.get(userId);
        if (user == null || user.getActivityPoints() < totalPointsSpent) {
            return new CheckoutResponse(false, "Insufficient activity points", 0, null, null);
        }
        
        // Deduct points and update user
        user.setActivityPoints((int)(user.getActivityPoints() - totalPointsSpent));
        double newBalance = user.getActivityPoints();
        
        // Generate transaction ID
        String transactionId = "TXN-" + System.currentTimeMillis();
        
        // Add to purchase history using your PurchaseHistoryItem class
        String currentDate = LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME);
        for (CartItem item : purchasedItems) {
            PurchaseHistoryItem historyEntry = new PurchaseHistoryItem(
                transactionId + "-" + item.getRewardId(),
                item.getName(),
                (int)(item.getPrice() * item.getQuantity()),
                currentDate,
                "completed"
            );
            // Get the user's history list, or create a new one if it doesn't exist
            List<PurchaseHistoryItem> userHistoryList = userHistory.get(userId);
            if (userHistoryList == null) {
                userHistoryList = new ArrayList<>();
                userHistory.put(userId, userHistoryList);
            }
            // Add the new history entry to the user's history
            userHistoryList.add(historyEntry);
        }
        
        // Clear cart
        userCarts.put(userId, new ArrayList<>());
        
        return new CheckoutResponse(true, "Order placed successfully", newBalance, purchasedItems, transactionId);
    }
    
    public List<PurchaseHistoryItem> getPurchaseHistory(String userId) {
        userId = userId != null ? userId : "user1";
        return userHistory.getOrDefault(userId, new ArrayList<>());
    }
}
