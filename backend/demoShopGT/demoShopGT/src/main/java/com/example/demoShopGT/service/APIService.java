package com.example.demoShopGT.service;

import com.example.demoShopGT.model.*;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

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

        // Initialize demo rewards with rank and type
        rewards.put("reward1", new Reward("reward1", "Coffee Mug", "Premium coffee mug",
                "High-quality ceramic coffee mug with company logo", 25.0, "/mug.jpg", "Merch GT", true, 50,
                RewardType.POPULAR, RewardRank.SILVER));

        rewards.put("reward2", new Reward("reward2", "T-Shirt", "Cotton t-shirt",
                "100% cotton t-shirt with custom design", 35.0, "/tshirt.jpg", "Merch GT", true, 30,
                RewardType.POPULAR, RewardRank.SILVER));

        rewards.put("reward3", new Reward("reward3", "Gift Card", "$50 Gift Card",
                "Digital gift card for online purchases", 50.0, "/giftcard.jpg", "Vouchere", true, 100,
                RewardType.RARE, RewardRank.GOLD));

        // Update your existing rewards with rank and type
        rewards.put("reward101", new Reward("reward101", "GT Tote Bag", "Tote bag din bumbac",
                "Tote bag din pânză de bumbac, printat cu logo-ul GT, perfect pentru cursuri sau cumpărături.",
                30.0, "https://images.unsplash.com/photo-1544551763-7ef0468b1dc6?q=80&w=1000&auto=format&fit=crop",
                "Merch GT", true, 80, RewardType.POPULAR, RewardRank.SILVER));

        rewards.put("reward102", new Reward("reward102", "Insignă Email", "Set de 3 insigne",
                "Set de 3 insigne metalice cu iconițe tematice (email, cod, rachetă). Prindere sigură, finisaj lucios.",
                20.0, "https://images.unsplash.com/photo-1516387938699-a93567ec168e?q=80&w=1000&auto=format&fit=crop",
                "Merch GT", true, 120, RewardType.POPULAR, RewardRank.SILVER));

        rewards.put("reward112", new Reward("reward112", "Mouse GT", "Mouse optic 6D",
                "Mouse optic cu 6 butoane programabile, DPI ajustabil, cablu împletit. Ideal pentru taskuri și gaming casual.",
                320.0, "https://images.unsplash.com/photo-1587202372775-98927b0d4f93?q=80&w=1000&auto=format&fit=crop",
                "Accesorii Tech & Gaming", true, 25, RewardType.RARE, RewardRank.GOLD));

        rewards.put("reward113", new Reward("reward113", "Tastatură Mecanică", "Tastatură RGB",
                "Tastatură mecanică compactă 60% cu iluminare RGB, switch-uri tactile și keycaps PBT.",
                520.0, "https://images.unsplash.com/photo-1518441902117-f26c0b08e36a?q=80&w=1000&auto=format&fit=crop",
                "Accesorii Tech & Gaming", true, 15, RewardType.LEGENDARY, RewardRank.DIMOND));

        rewards.put("reward118", new Reward("reward118", "Zi cu Echipa Staff", "Experiență Legend",
                "Experiență de o zi alături de echipa staff: shadowing, QA, mini-workshop. Sloturi foarte limitate.",
                1000.0, "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1000&auto=format&fit=crop",
                "Experiențe", true, 3, RewardType.LEGENDARY, RewardRank.LEGEND));

        // Add more rewards with different combinations...
        rewards.put("reward115", new Reward("reward115", "Mystery Box – Silver", "Cutie surpriză",
                "Mystery Box nivel Silver: șanse mari la merch (tote bag, tricou), șanse medii la avatar/frame, șanse mici la voucher redus.",
                60.0, "https://images.unsplash.com/photo-1596492784531-6e6eb5ea9992?q=80&w=1000&auto=format&fit=crop",
                "Mystery Box", true, 100, RewardType.RARE, RewardRank.SILVER));

        rewards.put("reward116", new Reward("reward116", "Mystery Box – Gold", "Cutie surpriză",
                "Mystery Box nivel Gold: șanse la voucher Steam, reducere bundle, avatar exclusiv sau 2x puncte pentru următoarea acțiune.",
                180.0, "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=1000&auto=format&fit=crop",
                "Mystery Box", true, 60, RewardType.LEGENDARY, RewardRank.GOLD));

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

    // NEW: Filter by rank
    public List<Reward> getRewardsByRank(String rank) {
        try {
            RewardRank rewardRank = RewardRank.valueOf(rank.toUpperCase());
            return rewards.values().stream()
                    .filter(reward -> reward.getRank() == rewardRank)
                    .collect(ArrayList::new, ArrayList::add, ArrayList::addAll);
        } catch (IllegalArgumentException e) {
            return new ArrayList<>();
        }
    }

    // NEW: Filter by type
    public List<Reward> getRewardsByType(String type) {
        try {
            RewardType rewardType = RewardType.valueOf(type.toUpperCase());
            return rewards.values().stream()
                    .filter(reward -> reward.getType() == rewardType)
                    .collect(ArrayList::new, ArrayList::add, ArrayList::addAll);
        } catch (IllegalArgumentException e) {
            return new ArrayList<>();
        }
    }

    // NEW: Filter by availability
    public List<Reward> getRewardsByAvailability(String availability) {
        return rewards.values().stream()
                .filter(reward -> {
                    switch (availability.toLowerCase()) {
                        case "in_stock":
                        case "în stoc":
                            return reward.isInStock() && reward.getStockCount() > 0;
                        case "out_of_stock":
                        case "stoc epuizat":
                            return !reward.isInStock() || reward.getStockCount() == 0;
                        case "new":
                        case "noutăți":
                            return reward.isInStock() && reward.getStockCount() <= 10 && reward.getStockCount() > 0;
                        default:
                            return true;
                    }
                })
                .collect(ArrayList::new, ArrayList::add, ArrayList::addAll);
    }

    // NEW: Filter by category
    public List<Reward> getRewardsByCategory(String category) {
        return rewards.values().stream()
                .filter(reward -> reward.getCategory().equalsIgnoreCase(category))
                .collect(ArrayList::new, ArrayList::add, ArrayList::addAll);
    }

    // NEW: Filter by price range
    public List<Reward> getRewardsByPriceRange(Double minPrice, Double maxPrice) {
        return rewards.values().stream()
                .filter(reward -> {
                    if (minPrice != null && reward.getPrice() < minPrice) return false;
                    if (maxPrice != null && reward.getPrice() > maxPrice) return false;
                    return true;
                })
                .collect(ArrayList::new, ArrayList::add, ArrayList::addAll);
    }

    // NEW: Complex filtering method
    public List<Reward> getFilteredRewards(String category, RewardRank rank, RewardType type,
                                         String availability, Double minPrice, Double maxPrice) {
        return rewards.values().stream()
                .filter(reward -> {
                    // Category filter
                    if (category != null && !category.isEmpty() && !reward.getCategory().equalsIgnoreCase(category)) {
                        return false;
                    }

                    // Rank filter
                    if (rank != null && reward.getRank() != rank) {
                        return false;
                    }

                    // Type filter
                    if (type != null && reward.getType() != type) {
                        return false;
                    }

                    // Price filter
                    if (minPrice != null && reward.getPrice() < minPrice) {
                        return false;
                    }
                    if (maxPrice != null && reward.getPrice() > maxPrice) {
                        return false;
                    }

                    // Availability filter
                    if (availability != null && !availability.isEmpty()) {
                        switch (availability.toLowerCase()) {
                            case "in_stock":
                                return reward.isInStock() && reward.getStockCount() > 0;
                            case "out_of_stock":
                                return !reward.isInStock() || reward.getStockCount() == 0;
                            case "new":
                                return reward.isInStock() && reward.getStockCount() <= 10 && reward.getStockCount() > 0;
                        }
                    }

                    return true;
                })
                .collect(Collectors.toList());
    }

    // Keep your existing methods (addToCart, getCart, checkout, etc.)
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
                    checkoutItem.getQuantity()));

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
        user.setActivityPoints((int) (user.getActivityPoints() - totalPointsSpent));
        double newBalance = user.getActivityPoints();

        // Generate transaction ID
        String transactionId = "TXN-" + System.currentTimeMillis();

        // Add to purchase history using your PurchaseHistoryItem class
        String currentDate = LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME);
        for (CartItem item : purchasedItems) {
            PurchaseHistoryItem historyEntry = new PurchaseHistoryItem(
                    transactionId + "-" + item.getRewardId(),
                    item.getName(),
                    (int) (item.getPrice() * item.getQuantity()),
                    currentDate,
                    "completed");
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
