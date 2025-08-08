package com.example.demoShopGT;

import com.example.demoShopGT.controller.FrontendController;
import com.example.demoShopGT.model.*;
import com.example.demoShopGT.service.APIService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(FrontendController.class)
@DisplayName("Frontend Controller Tests - Final Version")
class FrontendControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private APIService apiService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @DisplayName("GET /api/user/profile should return correct JSON structure")
    void testGetUserProfile() throws Exception {
        // Given
        UserProfile mockProfile = new UserProfile("user1", "Test User", "/avatar.jpg", 100);
        when(apiService.getUserProfile(anyString())).thenReturn(mockProfile);

        // When & Then
        mockMvc.perform(get("/api/user/profile"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("user1"))
                .andExpect(jsonPath("$.name").value("Test User"))
                .andExpect(jsonPath("$.avatar").value("/avatar.jpg"))
                .andExpect(jsonPath("$.activityPoints").value(100));
        
        System.out.println("✅ GET /api/user/profile endpoint test passed");
    }

    @Test
    @DisplayName("GET /api/rewards should return rewards array")
    void testGetRewards() throws Exception {
        // Given
        List<Reward> mockRewards = Arrays.asList(
            new Reward("reward1", "Test Reward", "Description", "Full desc", 25.0, "/img.jpg", "Category", true, 10)
        );
        when(apiService.getRewards()).thenReturn(mockRewards);

        // When & Then
        mockMvc.perform(get("/api/rewards"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.rewards").isArray())
                .andExpect(jsonPath("$.rewards.length()").value(1))
                .andExpect(jsonPath("$.rewards[0].id").value("reward1"))
                .andExpect(jsonPath("$.rewards[0].name").value("Test Reward"))
                .andExpect(jsonPath("$.rewards[0].price").value(25.0))
                .andExpect(jsonPath("$.rewards[0].inStock").value(true))
                .andExpect(jsonPath("$.rewards[0].stockCount").value(10));
        
        System.out.println("✅ GET /api/rewards endpoint test passed");
    }

    @Test
    @DisplayName("POST /api/cart/add should return success with cart info")
    void testAddToCart() throws Exception {
        // Given
        AddToCartRequest request = new AddToCartRequest("reward1", 2);
        CartResponse cartResponse = new CartResponse(
            Arrays.asList(new CartItem("reward1", "Test Item", 25.0, 2)), 
            50.0
        );
        AddToCartResponse mockResponse = new AddToCartResponse(true, "Item added successfully", cartResponse);
        when(apiService.addToCart(any(AddToCartRequest.class))).thenReturn(mockResponse);

        // When & Then
        mockMvc.perform(post("/api/cart/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("Item added successfully"))
                .andExpect(jsonPath("$.cart.items").isArray())
                .andExpect(jsonPath("$.cart.totalPoints").value(50.0));
        
        System.out.println("✅ POST /api/cart/add endpoint test passed");
    }

    @Test
    @DisplayName("GET /api/cart should return cart with totalPoints")
    void testGetCart() throws Exception {
        // Given
        CartResponse mockCart = new CartResponse(
            Arrays.asList(new CartItem("reward1", "Test Item", 25.0, 1)), 
            25.0
        );
        when(apiService.getCart(anyString())).thenReturn(mockCart);

        // When & Then
        mockMvc.perform(get("/api/cart"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.items").isArray())
                .andExpect(jsonPath("$.totalPoints").value(25.0))
                .andExpect(jsonPath("$.items[0].rewardId").value("reward1"))
                .andExpect(jsonPath("$.items[0].name").value("Test Item"));
        
        System.out.println("✅ GET /api/cart endpoint test passed");
    }

    @Test
    @DisplayName("POST /api/checkout should return success with transaction details")
    void testCheckout() throws Exception {
        // Given
        CheckoutRequest request = new CheckoutRequest();
        request.setItems(Arrays.asList(new CartItem("reward1", "Test Item", 25.0, 1)));
        
        CheckoutResponse mockResponse = new CheckoutResponse(
            true, 
            "Order placed successfully", 
            125.0, 
            Arrays.asList(new CartItem("reward1", "Test Item", 25.0, 1)),
            "TXN-123456"
        );
        when(apiService.checkout(any(CheckoutRequest.class))).thenReturn(mockResponse);

        // When & Then
        mockMvc.perform(post("/api/checkout")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("Order placed successfully"))
                .andExpect(jsonPath("$.newBalance").value(125.0))
                .andExpect(jsonPath("$.purchasedItems").isArray());
        
        System.out.println("✅ POST /api/checkout endpoint test passed");
    }

    @Test
    @DisplayName("GET /api/user/history should return purchase history")
    void testGetPurchaseHistory() throws Exception {
        // Given
        List<PurchaseHistoryItem> mockHistory = Arrays.asList(
            new PurchaseHistoryItem("TXN-1", "Test Item", 25, "2024-01-01T10:00:00", "completed")
        );
        when(apiService.getPurchaseHistory(anyString())).thenReturn(mockHistory);

        // When & Then
        mockMvc.perform(get("/api/user/history"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.purchases").isArray())
                .andExpect(jsonPath("$.purchases.length()").value(1))
                .andExpect(jsonPath("$.purchases[0].id").value("TXN-1"))
                .andExpect(jsonPath("$.purchases[0].rewardName").value("Test Item"))
                .andExpect(jsonPath("$.purchases[0].pointsSpent").value(25))
                .andExpect(jsonPath("$.purchases[0].status").value("completed"));
        
        System.out.println("✅ GET /api/user/history endpoint test passed");
    }
}
