package com.example.demoShopGT.model;

import java.util.List;

public class CheckoutResponse {

	private boolean success;
	private String message;
	private double newBalance;
	private List<CartItem> purchasedItems;
	private String trasactionId;
	
	public CheckoutResponse() {}
	
	public CheckoutResponse(boolean success, String message, double newBalance, List<CartItem> purchasedItems,
			String trasactionId) {
		this.success = success;
		this.message = message;
		this.newBalance = newBalance;
		this.purchasedItems = purchasedItems;
		this.trasactionId = trasactionId;
	}
	
	public boolean isSuccess() {
		return success;
	}
	public void setSuccess(boolean success) {
		this.success = success;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public double getNewBalance() {
		return newBalance;
	}
	public void setNewBalance(double newBalance) {
		this.newBalance = newBalance;
	}
	public List<CartItem> getPurchasedItems() {
		return purchasedItems;
	}
	public void setPurchasedItems(List<CartItem> purchasedItems) {
		this.purchasedItems = purchasedItems;
	}
	public String getTrasactionId() {
		return trasactionId;
	}
	public void setTrasactionId(String trasactionId) {
		this.trasactionId = trasactionId;
	}
	
	

}
