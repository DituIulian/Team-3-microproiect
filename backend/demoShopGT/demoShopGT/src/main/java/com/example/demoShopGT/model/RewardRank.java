package com.example.demoShopGT.model;

public enum RewardRank {
	SILVER("Silver"),
	GOLD("Gold"),
	DIMOND("Diamond"),
	LEGEND("Legend");
	
	private final String displayName;
	RewardRank(String displayName){
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
