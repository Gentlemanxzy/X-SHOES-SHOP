package com.xss.pojo;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.Table;

@Table(name="brand")
public class Brand {
	@Id
	private String brandId;
	private String brandName;
	private String brandParent;
	//private String goodId;
	@Column(name = "status")
	private String status;
	private String imgId;
	private String brandDescription;
	private String brandArea;
	private int brandScore;
	
	
	public int getBrandScore() {
		return brandScore;
	}
	public void setBrandScore(int brandScore) {
		this.brandScore = brandScore;
	}
	public String getBrandArea() {
		return brandArea;
	}
	public void setBrandArea(String brandArea) {
		this.brandArea = brandArea;
	}
	public String getBrandId() {
		return brandId;
	}
	public void setBrandId(String brandId) {
		this.brandId = brandId;
	}
	public String getBrandName() {
		return brandName;
	}
	public void setBrandName(String brandName) {
		this.brandName = brandName;
	}
	public String getBrandParent() {
		return brandParent;
	}
	public void setBrandParent(String brandParent) {
		this.brandParent = brandParent;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getImgId() {
		return imgId;
	}
	public void setImgId(String imgId) {
		this.imgId = imgId;
	}
	public String getBrandDescription() {
		return brandDescription;
	}
	public void setBrandDescription(String brandDescription) {
		this.brandDescription = brandDescription;
	}
	
	
}
