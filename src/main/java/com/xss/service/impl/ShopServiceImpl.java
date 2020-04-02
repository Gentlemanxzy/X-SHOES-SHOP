package com.xss.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.xss.dto.GoodsDto;
import com.xss.mapper.ShopMapper;
import com.xss.pojo.FavGoods;
import com.xss.pojo.Goods;
import com.xss.pojo.Images;
import com.xss.service.ShopService;


@Service
public class ShopServiceImpl implements ShopService{
	@Autowired
	private ShopMapper shopMapper;

	public List getShopList(GoodsDto dto) {
		
		int pageSize = dto.getPageSize();	// 页容量
		int pageNums = (dto.getPageNums() -1) * pageSize;		// 页码
		dto.setPageNums(pageNums);
		
		String sort = dto.getSort();
		String orderBy = dto.getOrderBy();
		orderBy = orderBy + " " +sort;
		
		List list = shopMapper.getShopList(dto);
		return list;
	}

	public int getShopTotal(GoodsDto dto) {
		int i = shopMapper.getShopTotal(dto);
		return i;
	}

	public List getBrandList() {
		// TODO Auto-generated method stub
		return shopMapper.getBrandList();
	}

	public List<Images> getGoodImgs(String goodId) {
		// TODO Auto-generated method stub
		return shopMapper.getGoodImgs(goodId);
	}

	public Goods getGoodInfo(String goodId) {
		Goods good = shopMapper.getGoodInfo(goodId);
		String sizes = good.getGoodSize();
		String[] strArr = sizes.split("/");
		return good;
	}

	public List<FavGoods> isLikeGood(String userId, String goodId) {
		List<FavGoods> fav = shopMapper.isLikeGood(userId, goodId);
		return fav;
	}

	public int insertLikeGood(String userId, String goodId) {
		
		return shopMapper.insertLikeGood(userId,goodId);
	}

	public int updateLikeGood(String userId, String goodId) {
		
		return shopMapper.updateLikeGood(userId,goodId);
	}

	public PageInfo<FavGoods> getFavGoodsByuserId(String userId, int pageNums, int pageSize) {
		PageHelper.startPage(pageNums, pageSize);
		List<FavGoods> list = shopMapper.getFavGoodsByuserId(userId);
		PageInfo<FavGoods> pageInfo = new PageInfo<FavGoods>(list);
		if(!list.isEmpty()) {
			return pageInfo;
		}
		return pageInfo;
		//return list;
	}

	public int delFav(String goodId, String userId) {
		int i = shopMapper.delFav(goodId, userId);
		return i;
	}

	public int favNumController(String goodId, String userId, int num) {
		return shopMapper.favNumController(goodId,userId,num);
	}

	public int addViewHis(String userId, String goodId) {
		
		return shopMapper.addViewHis(userId,goodId);
	}
	
	
}
