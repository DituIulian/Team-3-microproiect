package com.example.demoShopGT.model;

import java.util.List;

public class CheckoutRequest {

	private List<CartItem> items;
	
	public CheckoutRequest() {}

	public CheckoutRequest(List<CartItem> items) {
		this.items = items;
	}

	public List<CartItem> getItems() {
		return items;
	}

	public void setItems(List<CartItem> list) {
		this.items = list;
	}
	
	

}
