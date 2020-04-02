package com.xss.pojo;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import com.xss.util.*;

@Table(name="User")
public class User {
	@Id
	private String userId;
	private String userName;	// 用户名
	private String passWord;
	@Column(name = "sex")
	private String sex;
	private String phoneNum;
	private String qqNum;
	private String weiboNum;
	@Column(name = "email")
	private String email;
	private String userType;	// 用户类型
	private Date createTime;
	@Column(name = "birthday")
	private Date birthday;
	@Column(name = "status")	// 用户状态
	private String status;
	@Column(name = "isVip")
	private String isVip;
	private String userImg;		// 头像图
	@Column(name = "motto")
	private String motto;		// 座右铭
	private String userArea;	// 所在地
	private int userBonus;	//用户积分
	
	
	public String getUserType() {
		return userType;
	}
	public void setUserType(String userType) {
		this.userType = userType;
	}
	public Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	public Date getBirthday() {
		return birthday;
	}
	public void setBirthday(Date birthday) {
		this.birthday = birthday;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getIsVip() {
		return isVip;
	}
	public void setIsVip(String isVip) {
		this.isVip = isVip;
	}
	public String getUserImg() {
		return userImg;
	}
	public void setUserImg(String userImg) {
		this.userImg = userImg;
	}
	public String getMotto() {
		return motto;
	}
	public void setMotto(String motto) {
		this.motto = motto;
	}
	public String getUserArea() {
		return userArea;
	}
	public void setUserArea(String userArea) {
		this.userArea = userArea;
	}
	public int getUserBonus() {
		return userBonus;
	}
	public void setUserBonus(int userBonus) {
		this.userBonus = userBonus;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getPassWord() {
		return passWord;
	}
	public void setPassWord(String passWord) {
		this.passWord = passWord;
	}
	public String getSex() {
		return sex;
	}
	public void setSex(String sex) {
		this.sex = sex;
	}
	public String getPhoneNum() {
		return phoneNum;
	}
	public void setPhoneNum(String phoneNum) {
		this.phoneNum = phoneNum;
	}
	public String getQqNum() {
		return qqNum;
	}
	public void setQqNum(String qqNum) {
		this.qqNum = qqNum;
	}
	public String getWeiboNum() {
		return weiboNum;
	}
	public void setWeiboNum(String weiboNum) {
		this.weiboNum = weiboNum;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	
	
}
