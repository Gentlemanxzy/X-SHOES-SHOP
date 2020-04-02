package com.xss.service;

import java.util.List;

import com.github.pagehelper.PageInfo;
import com.xss.dto.GoodsDto;
import com.xss.pojo.FavGoods;
import com.xss.pojo.Goods;
import com.xss.pojo.Images;

public interface ShopService {
	public List getShopList(GoodsDto dto);

	public int getShopTotal(GoodsDto dto);

	public List getBrandList();

	public List<Images> getGoodImgs(String goodId);

	public Goods getGoodInfo(String goodId);

	public List<FavGoods> isLikeGood(String userId, String goodId);

	public int insertLikeGood(String userId, String goodId);

	public int updateLikeGood(String userId, String goodId);

	public PageInfo<FavGoods> getFavGoodsByuserId(String userId, int pageNums, int pageSize);

	public int delFav(String goodId, String userId);

	public int favNumController(String goodId, String userId, int num);

	public int addViewHis(String userId, String goodId);
}
