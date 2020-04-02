package com.xss.pojo;

import java.util.Date;

import javax.persistence.Id;
import javax.persistence.Table;

@Table(name="images")
public class Images {
	@Id
	private String imgId;
	private String userId;
	private String goodId;
	private String brandId;
	private String imgSrc;
	private Date createTime;
	private String isMainImg;
	public String getImgId() {
		return imgId;
	}
	public void setImgId(String imgId) {
		this.imgId = imgId;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getGoodId() {
		return goodId;
	}
	public void setGoodId(String goodId) {
		this.goodId = goodId;
	}
	public String getBrandId() {
		return brandId;
	}
	public void setBrandId(String brandId) {
		this.brandId = brandId;
	}
	public String getImgSrc() {
		return imgSrc;
	}
	public void setImgSrc(String imgSrc) {
		this.imgSrc = imgSrc;
	}
	public Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	public String getIsMainImg() {
		return isMainImg;
	}
	public void setIsMainImg(String isMainImg) {
		this.isMainImg = isMainImg;
	}
	
	
}
