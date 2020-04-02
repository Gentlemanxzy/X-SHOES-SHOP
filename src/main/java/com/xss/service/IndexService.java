package com.xss.service;

import java.util.List;

import com.xss.pojo.Goods;
import com.xss.pojo.Images;

public interface IndexService {

	List getShopList(Goods goods);

	List<Images> getGoodImgs(String goodId);

	List<Goods> getShopListFavs();

	List<Goods> getShopListBySearch(String keyword);

}
