package com.example.demoShopGT;

import com.example.demoShopGT.model.*;
import com.example.demoShopGT.service.APIService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@DisplayName("API Service Tests - Final Version")
class APIServiceTest {

    private APIService apiService;

    @BeforeEach
    void setUp() {
        apiService = new APIService();
    }

    @Test
    @DisplayName("Should return user profile with correct structure")
    void testGetUserProfile() {
        // When
        UserProfile profile = apiService.getUserProfile("user1");

        // Then
        assertNotNull(profile);
        assertEquals("user1", profile.getId());
        assertEquals("Demo User", profile.getName());
        assertEquals("/avatar.jpg", profile.getAvatar());
        assertEquals(150, profile.getActivityPoints());
        
        System.out.println("✅ User Profile Test Passed:");
        System.out.println("   ID: " + profile.getId());
        System.out.println("   Name: " + profile.getName());
        System.out.println("   Points: " + profile.getActivityPoints());
    }

    @Test
    @DisplayName("Should return list of rewards with correct structure")
    void testGetRewards() {
        // When
        List<Reward> rewards = apiService.getRewards();

        // Then
        assertNotNull(rewards);
        assertEquals(3, rewards.size());
        
        Reward firstReward = rewards.get(0);
        assertNotNull(firstReward.getId());
        assertNotNull(firstReward.getName());
        assertNotNull(firstReward.getDescription());
        assertNotNull(firstReward.getFullDescription());
        assertTrue(firstReward.getPrice() > 0);
        assertNotNull(firstReward.getImage());
        assertNotNull(firstReward.getCategory());
        assertTrue(firstReward.getStockCount() >= 0);
        
        System.out.println("✅ Rewards Test Passed:");
        for (Reward reward : rewards) {
            System.out.println("   - " + reward.getName() + " ($" + reward.getPrice() + ")");
        }
    }

    @Test
    @DisplayName("Should add item to cart and return cart info")
    void testAddToCart() {
        // Given
        AddToCartRequest request = new AddToCartRequest("reward1", 2);

        // When
        AddToCartResponse response = apiService.addToCart(request);

        // Then
        assertTrue(response.isSuccess());
        assertEquals("Item added to cart successfully", response.getMessage());
        assertNotNull(response.getCart());
        assertEquals(1, response.getCart().getItems().size());
        assertEquals(50.0, response.getCart().getTotalPoints()); // 2 * 25.0
        
        CartItem addedItem = response.getCart().getItems().get(0);
        assertEquals("reward1", addedItem.getRewardId());
        assertEquals("Coffee Mug", addedItem.getName());
        assertEquals(2, addedItem.getQuantity());
        
        System.out.println("✅ Add to Cart Test Passed:");
        System.out.println("   Item: " + addedItem.getName());
        System.out.println("   Quantity: " + addedItem.getQuantity());
        System.out.println("   Total Points: " + response.getCart().getTotalPoints());
    }

    @Test
    @DisplayName("Should return cart with totalPoints")
    void testGetCart() {
        // Given - Add item first
        AddToCartRequest request = new AddToCartRequest("reward2", 1);
        apiService.addToCart(request);

        // When
        CartResponse cart = apiService.getCart("user1");

        // Then
        assertNotNull(cart);
        assertEquals(1, cart.getItems().size());
        assertEquals(35.0, cart.getTotalPoints()); // T-Shirt price
        
        CartItem item = cart.getItems().get(0);
        assertEquals("reward2", item.getRewardId());
        assertEquals("T-Shirt", item.getName());
        
        System.out.println("✅ Get Cart Test Passed:");
        System.out.println("   Items in cart: " + cart.getItems().size());
        System.out.println("   Total Points: " + cart.getTotalPoints());
    }

    @Test
    @DisplayName("Should checkout successfully and return correct response")
    void testCheckout() {
        // Given - Add items to cart first
        AddToCartRequest addRequest = new AddToCartRequest("reward1", 1);
        apiService.addToCart(addRequest);
        
        // Create checkout request with the items
        CheckoutRequest checkoutRequest = new CheckoutRequest();
        CartItem checkoutItem = new CartItem("reward1", "Coffee Mug", 25.0, 1);
        checkoutRequest.setItems(List.of(checkoutItem));

        // When
        CheckoutResponse response = apiService.checkout(checkoutRequest);

        // Then
        assertTrue(response.isSuccess());
        assertEquals("Order placed successfully", response.getMessage());
        assertEquals(125.0, response.getNewBalance()); // 150 - 25 = 125
        assertNotNull(response.getTrasactionId());
        assertTrue(response.getTrasactionId().startsWith("TXN-"));
        
        assertNotNull(response.getPurchasedItems());
        assertEquals(1, response.getPurchasedItems().size());
        
        CartItem purchasedItem = response.getPurchasedItems().get(0);
        assertEquals("reward1", purchasedItem.getRewardId());
        assertEquals("Coffee Mug", purchasedItem.getName());
        
        System.out.println("✅ Checkout Test Passed:");
        System.out.println("   Transaction ID: " + response.getTrasactionId());
        System.out.println("   New Balance: " + response.getNewBalance());
        System.out.println("   Purchased: " + purchasedItem.getName());
    }

    @Test
    @DisplayName("Should return purchase history with correct structure")
    void testGetPurchaseHistory() {
        // Given - Make a purchase first
        AddToCartRequest addRequest = new AddToCartRequest("reward3", 1);
        apiService.addToCart(addRequest);
        
        CheckoutRequest checkoutRequest = new CheckoutRequest();
        CartItem checkoutItem = new CartItem("reward3", "Gift Card", 50.0, 1);
        checkoutRequest.setItems(List.of(checkoutItem));
        apiService.checkout(checkoutRequest);

        // When
        List<PurchaseHistoryItem> history = apiService.getPurchaseHistory("user1");

        // Then
        assertNotNull(history);
        assertEquals(1, history.size());
        
        PurchaseHistoryItem purchase = history.get(0);
        assertNotNull(purchase.getId());
        assertEquals("Gift Card", purchase.getRewardName());
        assertEquals(50, purchase.getPointsSpent());
        assertNotNull(purchase.getPurchaseDate());
        assertEquals("completed", purchase.getStatus());
        
        System.out.println("✅ Purchase History Test Passed:");
        System.out.println("   Purchase ID: " + purchase.getId());
        System.out.println("   Item: " + purchase.getRewardName());
        System.out.println("   Points Spent: " + purchase.getPointsSpent());
        System.out.println("   Status: " + purchase.getStatus());
    }

    @Test
    @DisplayName("Should handle insufficient stock error")
    void testInsufficientStock() {
        // Given - Try to add more than available stock
        AddToCartRequest request = new AddToCartRequest("reward1", 100); // More than 50 available

        // When
        AddToCartResponse response = apiService.addToCart(request);

        // Then
        assertFalse(response.isSuccess());
        assertEquals("Insufficient stock", response.getMessage());
        assertNull(response.getCart());
        
        System.out.println("✅ Insufficient Stock Test Passed:");
        System.out.println("   Error Message: " + response.getMessage());
    }

    @Test
    @DisplayName("Should handle invalid reward ID")
    void testInvalidRewardId() {
        // Given
        AddToCartRequest request = new AddToCartRequest("invalid_reward", 1);

        // When
        AddToCartResponse response = apiService.addToCart(request);

        // Then
        assertFalse(response.isSuccess());
        assertEquals("Reward not found", response.getMessage());
        
        System.out.println("✅ Invalid Reward Test Passed:");
        System.out.println("   Error Message: " + response.getMessage());
    }
}
