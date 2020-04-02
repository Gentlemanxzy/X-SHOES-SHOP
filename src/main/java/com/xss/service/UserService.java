package com.xss.service;

import java.util.List;

import com.xss.pojo.Contact;
import com.xss.pojo.ShopAddress;
import com.xss.pojo.User;

public interface UserService {

	int updateUserInfo(User user);

	List<ShopAddress> getShopArea(String userId);

	int addShopAddr(ShopAddress sAddress);

	int updateIsMain(String userId);

	int delAddr(String addId);

	ShopAddress getAddrByAddId(String addId);

	int updateAddr(ShopAddress sAddress);

	int commitComment(Contact info);

}
