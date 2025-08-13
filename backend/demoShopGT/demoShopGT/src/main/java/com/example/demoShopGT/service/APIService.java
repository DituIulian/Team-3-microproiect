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
        UserProfile demoUser = new UserProfile("user1", "Demo User", "/avatar.jpg", 1450);
        users.put("user1", demoUser);

        // Initialize demo rewards
        rewards.put("reward1", new Reward("reward1", "Coffee Mug", "Premium coffee mug",
                "High-quality ceramic coffee mug with company logo", 25.0, "/frontend/assets/card-img/cana-usb-gt.png",
                "Merch GT", true,
                50, RewardType.POPULAR, RewardRank.SILVER));

        rewards.put("reward2", new Reward("reward2", "T-Shirt", "Cotton t-shirt",
                "100% cotton t-shirt with custom design", 35.0, "/frontend/assets/card-img/tricou-gt.png", "Merch GT",
                true, 30,
                RewardType.POPULAR, RewardRank.SILVER));

        rewards.put("reward3", new Reward("reward3", "Gift Card", "AP 350⚡ Gift Card",
                "Digital gift card for online purchases", 500.0, "/frontend/assets/card-img/gift-card-ap.png",
                "Vouchere", true, 100,
                RewardType.POPULAR, RewardRank.GOLD));
        rewards.put("reward101", new Reward("reward101", "GT Tote Bag", "Tote bag din bumbac",
                "Tote bag din pânză de bumbac, printat cu logo-ul GT, perfect pentru cursuri sau cumpărături.",
                30.0,
                "/frontend/assets/card-img/tote-bag-gt.png",
                "Merch GT", true, 80, RewardType.POPULAR, RewardRank.SILVER));

        rewards.put("reward102", new Reward("reward102", "Insignă Email", "Set de 3 insigne",
                "Set de 3 insigne metalice cu iconițe tematice (email, cod, rachetă). Prindere sigură, finisaj lucios.",
                20.0,
                "/frontend/assets/card-img/insigne-email.png",
                "Merch GT", true, 120, RewardType.POPULAR, RewardRank.SILVER));

        rewards.put("reward103", new Reward("reward103", "Cana GT", "Cană ceramică 350ml",
                "Cană ceramică de calitate (350ml) cu logo GT, compatibilă cu mașina de spălat vase.",
                25.0,
                "/frontend/assets/card-img/cana-gt.png",
                "Merch GT", true, 100, RewardType.POPULAR, RewardRank.SILVER));

        rewards.put("reward104", new Reward("reward104", "Agenda Punctată", "Agenda A5 dot-grid",
                "Agenda A5 cu hârtie punctată, copertă soft-touch și semn de pagină. Ideală pentru notițe și schetch-uri.",
                32.0,
                "/frontend/assets/card-img/agenda.png",
                "Merch GT", true, 70, RewardType.POPULAR, RewardRank.SILVER));

        rewards.put("reward105", new Reward("reward105", "Sticker Pack GT", "Pachet 10 stickere",
                "Pachet cu 10 stickere rezistente la apă: GT logo, cod, cloud, tastatură, monitor.",
                12.0,
                "/frontend/assets/card-img/sticker.png",
                "Merch GT", true, 200, RewardType.POPULAR, RewardRank.SILVER));

        rewards.put("reward106", new Reward("reward106", "Voucher Emag 50 RON", "Voucher eMAG 50 RON",
                "Voucher digital în valoare de 50 RON utilizabil pe eMAG. Termeni și condiții pot varia.",
                120.0,
                "/frontend/assets/card-img/voucher-emag.png",
                "Vouchere", true, 40, RewardType.POPULAR, RewardRank.GOLD));

        rewards.put("reward107", new Reward("reward107", "Voucher Steam 10€", "Voucher jocuri PC",
                "Card digital Steam în valoare de 10€ pentru jocurile sau DLC-urile preferate.",
                200.0,
                "/frontend/assets/card-img/steam-voucher.png",
                "Vouchere", true, 30, RewardType.POPULAR, RewardRank.GOLD));

        rewards.put("reward108", new Reward("reward108", "Reducere 10% (3 inimi)", "Reducere bundle",
                "Reducere de 10% la checkout pentru coșuri cu minim 3 produse, valabil pentru utilizatorii cu 3 inimi. Aceasta este o achiziție 'one-time buy'. Nu vei fi taxat(ă) din nou. ",
                0.0,
                "/frontend/assets/card-img/reducere-inimi.png",
                "Badges", true, 999, RewardType.RARE, RewardRank.DIAMOND));

        rewards.put("reward109", new Reward("reward109", "Avatar: Pisică Coder", "Avatar colecționabil",
                "Avatar colecționabil cu tematică „Pisică Coder” – fișier PNG transparent, rezoluție 1024x1024.",
                40.0,
                "/frontend/assets/card-img/avatar-pisica.png",
                "Avatar", true, 90, RewardType.POPULAR, RewardRank.SILVER));

        rewards.put("reward110", new Reward("reward110", "Avatar: Mașină Retro", "Avatar colecționabil",
                "Avatar colecționabil cu tematică „Retro Car” – fișier PNG transparent, rezoluție 1024x1024.",
                40.0,
                "/frontend/assets/card-img/avatar-masina.png",
                "Avatar", true, 90, RewardType.POPULAR, RewardRank.SILVER));

        rewards.put("reward111", new Reward("reward111", "Frame Neon", "Ramă profil neon",
                "Ramă neon pentru avatarul tău din profilul GT – stil cyberpunk, export SVG/PNG.",
                28.0,
                "/frontend/assets/card-img/frame-neon.png",
                "Avatar", true, 110, RewardType.POPULAR, RewardRank.SILVER));

        rewards.put("reward112", new Reward("reward112", "Mouse GT", "Mouse optic 6D",
                "Mouse optic cu 6 butoane programabile, DPI ajustabil, cablu împletit. Ideal pentru taskuri și gaming casual.",
                320.0,
                "/frontend/assets/card-img/mouse-gt.png",
                "Tech & Gaming", true, 25, RewardType.POPULAR, RewardRank.GOLD));

        rewards.put("reward113", new Reward("reward113", "Tastatură Mecanică", "Tastatură RGB",
                "Tastatură mecanică compactă 60% cu iluminare RGB, switch-uri tactile și keycaps PBT.",
                520.0,
                "/frontend/assets/card-img/tastatura-mecanica.png",
                "Tech & Gaming", true, 15, RewardType.LEGENDARY, RewardRank.DIAMOND));

        rewards.put("reward114", new Reward("reward114", "Căști BT Over-ear", "Căști Bluetooth",
                "Căști Bluetooth over-ear cu anulare pasivă a zgomotului, autonomie 30h, microfon pentru call-uri.",
                450.0,
                "/frontend/assets/card-img/casti-gt.png",
                "Tech & Gaming", true, 20, RewardType.LEGENDARY, RewardRank.DIAMOND));

        rewards.put("reward115", new Reward("reward115", "Mystery Box – Silver", "Cutie surpriză",
                "Mystery Box nivel Silver: șanse mari la merch (tote bag, tricou), șanse medii la avatar/frame, șanse mici la voucher redus.",
                60.0,
                "/frontend/assets/card-img/mystery-box-silver.png",
                "Mystery", true, 100, RewardType.RARE, RewardRank.SILVER));

        rewards.put("reward116", new Reward("reward116", "Mystery Box – Gold", "Cutie surpriză",
                "Mystery Box nivel Gold: șanse la voucher Steam, reducere bundle, avatar exclusiv sau 2x puncte pentru următoarea acțiune.",
                180.0,
                "/frontend/assets/card-img/mystery-box-gold.png",
                "Mystery", true, 60, RewardType.RARE, RewardRank.GOLD));

        rewards.put("reward117", new Reward("reward117", "Sesiune 1:1 Interviu", "Simulare interviu",
                "Sesiune 1:1 de 45 minute pentru simulare de interviu (HR/tehnic) cu mentor sau recruiter; feedback personalizat.",
                600.0,
                "/frontend/assets/card-img/sesiune-1-1.png",
                "Experiențe", true, 10, RewardType.LEGENDARY, RewardRank.DIAMOND));

        rewards.put("reward118", new Reward("reward118", "Zi cu Echipa Staff", "Experiență Legend",
                "Experiență de o zi alături de echipa staff: shadowing, QA, mini-workshop. Sloturi foarte limitate.",
                1000.0,
                "/frontend/assets/card-img/zi-cu-staff.png",
                "Experiențe", true, 3, RewardType.LEGENDARY, RewardRank.LEGEND));

        rewards.put("reward119", new Reward("reward119", "Badge – GT Rank GOLD", "Badge progres",
                "Badge digital GT Rank GOLD: afișat în profil, deblochează accesul la anumite zone și evenimente tematice.",
                0.0,
                "/frontend/assets/card-img/gold-badge.png",
                "Badges", true, 999, RewardType.POPULAR, RewardRank.GOLD));

        rewards.put("reward120", new Reward("reward120", "Badge – GT Rank DIAMOND", "Badge progres",
                "Badge digital GT Rank DIAMOND: afișat în profil, oferă acces la evenimente premium (în stoc limitat).",
                0.0,
                "/frontend/assets/card-img/diamond-badge.png",
                "Badges", true, 999, RewardType.RARE, RewardRank.DIAMOND));

        rewards.put("reward121", new Reward("reward121", "Tricou GT", "Tricou din bumbac 100%",
                "Tricou din bumbac 100% cu design GT – unisex, croi regular, disponibil în mai multe mărimi.",
                35.0,
                "/frontend/assets/card-img/tricou-gt.png",
                "Merch GT", true, 60, RewardType.POPULAR, RewardRank.SILVER));

        rewards.put("reward122", new Reward("reward122", "Carnețel Spirală", "Notepad A6",
                "Notepad A6 cu spirală, hârtie de 90g, 80 file. Ușor de purtat în ghiozdan sau buzunar.",
                18.0,
                "/frontend/assets/card-img/carnetel-spirala.png",
                "Merch GT", true, 140, RewardType.POPULAR, RewardRank.SILVER));

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
                    if (minPrice != null && reward.getPrice() < minPrice)
                        return false;
                    if (maxPrice != null && reward.getPrice() > maxPrice)
                        return false;
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
