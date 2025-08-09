package com.example.demoShopGT.model;

import java.util.List;

public class CartResponse {
	
	private List<CartItem> items;
	private double totalPoints;
	
	public CartResponse() {}
	
	public CartResponse(List<CartItem> items, double totalPoints) {
		this.items = items;
		this.totalPoints = totalPoints;
	}
	
	
	public List<CartItem> getItems() {
		return items;
	}
	public void setItems(List<CartItem> items) {
		this.items = items;
	}
	public double getTotalPoints() {
		return totalPoints;
	}
	public void setTotalPoints(double totalPoints) {
		this.totalPoints = totalPoints;
	}
	
	


}
