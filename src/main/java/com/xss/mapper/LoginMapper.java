package com.xss.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Select;

import com.github.abel533.mapper.Mapper;
import com.xss.pojo.FavGoods;
import com.xss.pojo.User;


public interface LoginMapper extends Mapper<User>{

	public User getUserInfo(User user);

	int isExist(User user);

	int reg(User user);

	//@Select("select * from favgoods where user_id = #{userId} and status = 1")
	List<FavGoods> getFavGoodsByUser(String userId);

}
