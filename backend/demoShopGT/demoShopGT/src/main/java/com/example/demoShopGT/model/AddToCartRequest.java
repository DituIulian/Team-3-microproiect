package com.example.demoShopGT.model;

public class AddToCartRequest {

	private String rewardId;
	private int quantity;
	
	public AddToCartRequest() {}
	
	public AddToCartRequest(String rewardId, int quantity) {
		this.rewardId = rewardId;
		this.quantity = quantity;
	}
	
	public String getRewardId() {
		return rewardId;
	}
	public void setRewardId(String rewardId) {
		this.rewardId = rewardId;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	
	

}
