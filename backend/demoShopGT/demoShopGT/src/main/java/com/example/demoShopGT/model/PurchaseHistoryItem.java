package com.example.demoShopGT.model;

import java.time.LocalDateTime;

public class PurchaseHistoryItem {

	private String id;
	private String rewardName;
	private int pointsSpent;
	private String purchaseDate;
	private String status;
	
	public PurchaseHistoryItem() {}
	
	public PurchaseHistoryItem(String id, String rewardName, int pointsSpent, String purchaseDate, String status) {
		this.id = id;
		this.rewardName = rewardName;
		this.pointsSpent = pointsSpent;
		this.purchaseDate = purchaseDate;
		this.status = status;
	}
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getRewardName() {
		return rewardName;
	}
	public void setRewardName(String rewardName) {
		this.rewardName = rewardName;
	}
	public int getPointsSpent() {
		return pointsSpent;
	}
	public void setPointsSpent(int pointsSpent) {
		this.pointsSpent = pointsSpent;
	}
	public String getPurchaseDate() {
		return purchaseDate;
	}
	public void setPurchaseDate(String purchaseDate) {
		this.purchaseDate = purchaseDate;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	//PurchasedItem Cart Info
	

}
