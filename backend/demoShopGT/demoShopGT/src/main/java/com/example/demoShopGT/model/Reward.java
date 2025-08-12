package com.example.demoShopGT.model;

public class Reward {

	private String id;
	private String name;
	private String description;
	private String fullDescription;
	private double price;
	private String image;
	private String category;
	private boolean inStock = true;
	private int stockCount;
	private RewardType type;
	private RewardRank rank;
	
	public Reward() {}
	
	
	public Reward(String id, String name, String description, String fullDescription, double price, String image,
			String category, boolean inStock, int stockCount, RewardType type, RewardRank rank) {
		this.id = id;
		this.name = name;
		this.description = description;
		this.fullDescription = fullDescription;
		this.price = price;
		this.image = image;
		this.category = category;
		this.inStock = inStock;
		this.stockCount = stockCount;
		this.type = type;
		this.rank = rank;
	}

	
	@Override
	public String toString() {
		return "Reward [id=" + id + ", name=" + name + ", description=" + description + ", fullDescription="
				+ fullDescription + ", price=" + price + ", image=" + image + ", category=" + category + ", inStock="
				+ inStock + ", stockCount=" + stockCount + ", type=" + type + ", rank=" + rank + "]";
	}


	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getFullDescription() {
		return fullDescription;
	}
	public void setFullDescription(String fullDescription) {
		this.fullDescription = fullDescription;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public boolean isInStock() {
		return inStock;
	}
	public void setInStock(boolean inStock) {
		this.inStock = inStock;
	}
	public int getStockCount() {
		return stockCount;
	}
	public void setStockCount(int stockCount) {
		this.stockCount = stockCount;
	}
	public RewardType getType() {
		return type;
	}
	public void setType(RewardType type) {
		this.type = type;
	}
	public RewardRank getRank() {
		return rank;
	}
	public void setRank(RewardRank rank) {
		this.rank = rank;
	}
	
	

}
