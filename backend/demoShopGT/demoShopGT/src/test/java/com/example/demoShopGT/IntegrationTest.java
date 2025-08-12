package com.example.demoShopGT;

import com.example.demoShopGT.model.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.TestMethodOrder;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpEntity;
import org.springframework.http.MediaType;

import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(classes = DemoShopGtApplication.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@DisplayName("Integration Tests - Complete User Journey")
class IntegrationTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private ObjectMapper objectMapper;

    private String getBaseUrl() {
        return "http://localhost:" + port + "/api";
    }

    @Test
    @Order(1)
    @DisplayName("1. User views profile")
    void testStep1_ViewProfile() {
        // When
        ResponseEntity<UserProfile> response = restTemplate.getForEntity(
            getBaseUrl() + "/user/profile", 
            UserProfile.class
        );

        // Then
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals("user1", response.getBody().getId());
        assertEquals(150, response.getBody().getActivityPoints());
        
        System.out.println("✅ Step 1: User profile loaded successfully");
        System.out.println("   User: " + response.getBody().getName());
        System.out.println("   Points: " + response.getBody().getActivityPoints());
    }

    @Test
    @Order(2)
    @DisplayName("2. User browses rewards")
    void testStep2_BrowseRewards() {
        // When
        ResponseEntity<RewardResponse> response = restTemplate.getForEntity(
            getBaseUrl() + "/rewards", 
            RewardResponse.class
        );

        // Then
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertNotNull(response.getBody().getRewards());
        assertEquals(3, response.getBody().getRewards().size());
        
        System.out.println("✅ Step 2: Rewards catalog loaded successfully");
        System.out.println("   Available rewards: " + response.getBody().getRewards().size());
    }

    @Test
    @Order(3)
    @DisplayName("3. User adds item to cart")
    void testStep3_AddToCart() {
        // Given
        AddToCartRequest request = new AddToCartRequest("reward1", 1);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<AddToCartRequest> entity = new HttpEntity<>(request, headers);

        // When
        ResponseEntity<AddToCartResponse> response = restTemplate.postForEntity(
            getBaseUrl() + "/cart/add", 
            entity, 
            AddToCartResponse.class
        );

        // Then
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertTrue(response.getBody().isSuccess());
        assertNotNull(response.getBody().getCart());
        assertEquals(25.0, response.getBody().getCart().getTotalPoints());
        
        System.out.println("✅ Step 3: Item added to cart successfully");
        System.out.println("   Cart total: " + response.getBody().getCart().getTotalPoints());
    }

    @Test
    @Order(4)
    @DisplayName("4. User views cart")
    void testStep4_ViewCart() {
        // When
        ResponseEntity<CartResponse> response = restTemplate.getForEntity(
            getBaseUrl() + "/cart", 
            CartResponse.class
        );

        // Then
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(1, response.getBody().getItems().size());
        assertEquals(25.0, response.getBody().getTotalPoints());
        
        System.out.println("✅ Step 4: Cart viewed successfully");
        System.out.println("   Items in cart: " + response.getBody().getItems().size());
    }

    @Test
    @Order(5)
    @DisplayName("5. User checks out")
    void testStep5_Checkout() {
        // Given
        CheckoutRequest request = new CheckoutRequest();
        request.setItems(Arrays.asList(new CartItem("reward1", "Coffee Mug", 25.0, 1)));
        
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<CheckoutRequest> entity = new HttpEntity<>(request, headers);

        // When
        ResponseEntity<CheckoutResponse> response = restTemplate.postForEntity(
            getBaseUrl() + "/checkout", 
            entity, 
            CheckoutResponse.class
        );

        // Then
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertTrue(response.getBody().isSuccess());
        assertEquals(125.0, response.getBody().getNewBalance());
        assertNotNull(response.getBody().getTrasactionId());
        
        System.out.println("✅ Step 5: Checkout completed successfully");
        System.out.println("   Transaction ID: " + response.getBody().getTrasactionId());
        System.out.println("   New balance: " + response.getBody().getNewBalance());
    }

    @Test
    @Order(6)
    @DisplayName("6. User views purchase history")
    void testStep6_ViewHistory() {
        // When
        ResponseEntity<PurchaseHistoryResponse> response = restTemplate.getForEntity(
            getBaseUrl() + "/user/history", 
            PurchaseHistoryResponse.class
        );

        // Then
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertNotNull(response.getBody().getPurchases());
        assertEquals(1, response.getBody().getPurchases().size());
        
        PurchaseHistoryItem purchase = response.getBody().getPurchases().get(0);
        assertEquals("Coffee Mug", purchase.getRewardName());
        assertEquals(25, purchase.getPointsSpent());
        assertEquals("completed", purchase.getStatus());
        
        System.out.println("✅ Step 6: Purchase history loaded successfully");
        System.out.println("   Purchases: " + response.getBody().getPurchases().size());
        System.out.println("🎉 Complete user journey test passed!");
    }

    @Test
    @Order(7)
    @DisplayName("7. Test error handling - Invalid reward")
    void testStep7_ErrorHandling() {
        // Given
        AddToCartRequest request = new AddToCartRequest("invalid_reward", 1);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<AddToCartRequest> entity = new HttpEntity<>(request, headers);

        // When
        ResponseEntity<AddToCartResponse> response = restTemplate.postForEntity(
            getBaseUrl() + "/cart/add", 
            entity, 
            AddToCartResponse.class
        );

        // Then
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertFalse(response.getBody().isSuccess());
        assertEquals("Reward not found", response.getBody().getMessage());
        
        System.out.println("✅ Step 7: Error handling works correctly");
        System.out.println("   Error message: " + response.getBody().getMessage());
    }
}
