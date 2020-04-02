package com.xss.mapper;

import java.util.List;

import com.github.abel533.mapper.Mapper;
import com.xss.pojo.Goods;

public interface IndexMapper extends Mapper<Goods>{

	List getShopList(Goods goods);

	List getGoodImgs(String goodId);

	List<Goods> getShopListFavs();

	List<Goods> getShopListBySearch(String keyword);


}
