package com.xss.pojo;

import java.sql.Date;

import javax.persistence.Id;
import javax.persistence.Table;

@Table(name = "cars")
public class Cars extends Goods {
	@Id
	private String userId;
	//private String goodId;// 已经继承
	//private String goodName;
//	private String goodColor;
//	private String goodSize;
//	private double goodPrice;
	private Integer goodNums;
	private Date createTime;
	private Date modifyTime;
//	private String status;
	private double goodTotalPrice;
	private String goodStatus;// 商品在购物车里的状态
	
	public String getGoodStatus() {
		return goodStatus;
	}
	public void setGoodStatus(String goodStatus) {
		this.goodStatus = goodStatus;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public Integer getGoodNums() {
		return goodNums;
	}
	public void setGoodNums(Integer goodNums) {
		this.goodNums = goodNums;
	}
	public Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	public Date getModifyTime() {
		return modifyTime;
	}
	public void setModifyTime(Date modifyTime) {
		this.modifyTime = modifyTime;
	}
	public double getGoodTotalPrice() {
		return goodTotalPrice;
	}
	public void setGoodTotalPrice(double goodTotalPrice) {
		this.goodTotalPrice = goodTotalPrice;
	}
	
	
}
