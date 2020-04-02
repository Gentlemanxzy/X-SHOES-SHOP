package com.xss.service;

import java.util.List;

import com.xss.pojo.User;

public interface LoginService {
	
	/**
	 * 登录功能
	 * @param user
	 * @return 
	 */
	public User login(User user);

	public int isExist(User user);

	public int reg(User user);

	public List getFavGoodsByuserId(String userId);
}
