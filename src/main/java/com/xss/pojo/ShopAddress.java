package com.xss.pojo;

import javax.persistence.Id;
import javax.persistence.Table;

@Table(name="shopaddress")
public class ShopAddress {
	
	@Id
	private String addId;
	private String userId;
	private String shopName; // 收货人姓名
	private String phone;
	private String province;
	private String city;
	private String area;
	private String detailAddress;
	private String zipCode;
	private String isMain;
	public String getAddId() {
		return addId;
	}
	public void setAddId(String addId) {
		this.addId = addId;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getShopName() {
		return shopName;
	}
	public void setShopName(String shopName) {
		this.shopName = shopName;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getProvince() {
		return province;
	}
	public void setProvince(String province) {
		this.province = province;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getArea() {
		return area;
	}
	public void setArea(String area) {
		this.area = area;
	}
	public String getDetailAddress() {
		return detailAddress;
	}
	public void setDetailAddress(String detailAddress) {
		this.detailAddress = detailAddress;
	}
	public String getZipCode() {
		return zipCode;
	}
	public void setZipCode(String zipCode) {
		this.zipCode = zipCode;
	}
	public String getIsMain() {
		return isMain;
	}
	public void setIsMain(String isMain) {
		this.isMain = isMain;
	}
	@Override
	public String toString() {
		return "ShopAddress [addId=" + addId + ", userId=" + userId + ", shopName=" + shopName + ", phone=" + phone
				+ ", province=" + province + ", city=" + city + ", area=" + area + ", detailAddress=" + detailAddress
				+ ", zipCode=" + zipCode + ", isMain=" + isMain + "]";
	}
	
}
