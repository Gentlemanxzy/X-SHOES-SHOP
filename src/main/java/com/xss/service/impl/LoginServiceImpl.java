package com.xss.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.PageInfo;
import com.xss.entry.Series;
import com.xss.pojo.FavGoods;
import com.xss.pojo.User;
import com.xss.mapper.LoginMapper;
import com.xss.service.LoginService;
import com.xss.service.ShopService;

@Service
public class LoginServiceImpl implements LoginService {

	@Autowired
	private LoginMapper loginMapper;
	@Autowired
	private ShopService shopService;
	
	public String login(String shbxdjm) {
		List<Series> series = loginMapper.getSeries();
		String seriesName = series.get(0).getSeriesName();
		System.out.println("登录成功:" + seriesName);
		return seriesName;
	}

	public User login(User user) {
		User u = loginMapper.getUserInfo(user);
		return u;
	}

	public int isExist(User user) {
		int u = loginMapper.isExist(user);
		return u;
	}

	public int reg(User user) {
		int i = loginMapper.reg(user);
		return i;
	}

	public List getFavGoodsByuserId(String userId) {
		//return loginMapper.getFavGoodsByUser(userId);
		PageInfo<FavGoods> pageInfo= shopService.getFavGoodsByuserId(userId, 1, 9999);
		return pageInfo.getList();
	}

}
