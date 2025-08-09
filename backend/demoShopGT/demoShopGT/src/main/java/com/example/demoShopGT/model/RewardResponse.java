package com.example.demoShopGT.model;

import java.util.ArrayList;
import java.util.List;

public class RewardResponse {

	private List<Reward> rewards;
	
	public RewardResponse() {
		this.rewards = new ArrayList<>();
	}
	
	public void addReward(Reward reward) {
		this.rewards.add(reward);
	}

	public List<Reward> getRewards() {
		return rewards;
	}
	
	public void setRewards(List<Reward> newRewards){
		this.rewards = newRewards;
	}

}
