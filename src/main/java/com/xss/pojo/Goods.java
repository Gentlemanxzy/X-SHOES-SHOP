package com.xss.pojo;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.Table;

@Table(name="goods")
public class Goods {
	@Id
	private String goodId;
	private int goodFavs;		// 收藏数
	private String goodFit;		// 适用人群
	private String goodTags;
	private Date goodFsTime; 	// 发售时间
	private String goodScore;	// 评分
	private String goodName;	// 商品名
	private String goodSeries;	// 系列
	private String brandId;		// 品牌id
	private String goodColor;	// 商品颜色
	private String goodSize;	// 商品尺码
	private double goodPrice;	// 价格
	private String goodDescription;	// 描述
	private String storeId; 	// 店铺id 暂不用
	private String goodIsNew;
	private String goodIsHot;
	private String goodIsDiscount;
	@Column(name = "discountNum")
	private int discountNum;
	@Column(name = "status")
	private String status;
	private String imgId;		// 关联图片id
	private int goodSales;		// 销量
	
	
	public int getGoodSales() {
		return goodSales;
	}
	public void setGoodSales(int goodSales) {
		this.goodSales = goodSales;
	}
	public String getImgId() {
		return imgId;
	}
	public void setImgId(String imgId) {
		this.imgId = imgId;
	}
	public String getGoodId() {
		return goodId;
	}
	public void setGoodId(String goodId) {
		this.goodId = goodId;
	}
	public int getGoodFavs() {
		return goodFavs;
	}
	public void setGoodFavs(int goodFavs) {
		this.goodFavs = goodFavs;
	}
	public String getGoodFit() {
		return goodFit;
	}
	public void setGoodFit(String goodFit) {
		this.goodFit = goodFit;
	}
	public String getGoodTags() {
		return goodTags;
	}
	public void setGoodTags(String goodTags) {
		this.goodTags = goodTags;
	}
	public Date getGoodFsTime() {
		return goodFsTime;
	}
	public void setGoodFsTime(Date goodFsTime) {
		this.goodFsTime = goodFsTime;
	}
	public String getGoodScore() {
		return goodScore;
	}
	public void setGoodScore(String goodScore) {
		this.goodScore = goodScore;
	}
	public String getGoodName() {
		return goodName;
	}
	public void setGoodName(String goodName) {
		this.goodName = goodName;
	}
	public String getGoodSeries() {
		return goodSeries;
	}
	public void setGoodSeries(String goodSeries) {
		this.goodSeries = goodSeries;
	}
	public String getBrandId() {
		return brandId;
	}
	public void setBrandId(String brandId) {
		this.brandId = brandId;
	}
	public String getGoodColor() {
		return goodColor;
	}
	public void setGoodColor(String goodColor) {
		this.goodColor = goodColor;
	}
	public String getGoodSize() {
		return goodSize;
	}
	public void setGoodSize(String goodSize) {
		this.goodSize = goodSize;
	}
	public double getGoodPrice() {
		return goodPrice;
	}
	public void setGoodPrice(double goodPrice) {
		this.goodPrice = goodPrice;
	}
	public String getGoodDescription() {
		return goodDescription;
	}
	public void setGoodDescription(String goodDescription) {
		this.goodDescription = goodDescription;
	}
	public String getStoreId() {
		return storeId;
	}
	public void setStoreId(String storeId) {
		this.storeId = storeId;
	}
	public String getGoodIsNew() {
		return goodIsNew;
	}
	public void setGoodIsNew(String goodIsNew) {
		this.goodIsNew = goodIsNew;
	}
	public String getGoodIsHot() {
		return goodIsHot;
	}
	public void setGoodIsHot(String goodIsHot) {
		this.goodIsHot = goodIsHot;
	}
	public String getGoodIsDiscount() {
		return goodIsDiscount;
	}
	public void setGoodIsDiscount(String goodIsDiscount) {
		this.goodIsDiscount = goodIsDiscount;
	}
	public int getDiscountNum() {
		return discountNum;
	}
	public void setDiscountNum(int discountNum) {
		this.discountNum = discountNum;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	
	
}
