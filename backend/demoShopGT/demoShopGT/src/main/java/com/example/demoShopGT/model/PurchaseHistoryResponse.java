package com.example.demoShopGT.model;

import java.util.List;

public class PurchaseHistoryResponse {

	private List<PurchaseHistoryItem> purchases;

	public PurchaseHistoryResponse() {}
	
	public PurchaseHistoryResponse(List<PurchaseHistoryItem> purchases) {
		this.purchases = purchases;
	}

	public List<PurchaseHistoryItem> getPurchases() {
		return purchases;
	}

	public void setPurchases(List<PurchaseHistoryItem> purchases) {
		this.purchases = purchases;
	}
	
	

}
