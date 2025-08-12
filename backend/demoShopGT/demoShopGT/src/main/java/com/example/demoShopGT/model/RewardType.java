package com.example.demoShopGT.model;

public enum RewardType {
	RARE("Rare"),
	POPULAR("Popular"),
	LEGENDARY("Legendary");
	
	private final String displayName;
	
	RewardType(String displayName){
		this.displayName = displayName;
	}
	
	public String getDisplayName() {
		return displayName;
	}
	
	@Override
	public String toString() {
		return displayName;
	}


}
