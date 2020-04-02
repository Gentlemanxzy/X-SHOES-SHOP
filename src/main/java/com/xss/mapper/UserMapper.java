package com.xss.mapper;

import java.util.List;

import com.github.abel533.mapper.Mapper;
import com.xss.pojo.Contact;
import com.xss.pojo.ShopAddress;
import com.xss.pojo.User;

public interface UserMapper extends Mapper<User>{

	int updateUserInfo(User user);

	List<ShopAddress> getShopArea(String userId);

	int addShopAddr(ShopAddress sAddress);

	int updateIsMain(String userId);

	int delAddr(String addId);

	ShopAddress getAddrByAddId(String addId);

	int updateAddr(ShopAddress sAddress);

	int commitComment(Contact info);

}
