package com.xss.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xss.mapper.IndexMapper;
import com.xss.pojo.Goods;
import com.xss.pojo.Images;
import com.xss.service.IndexService;

@Service
public class IndexServiceImpl implements IndexService {
	@Autowired
	private IndexMapper indexMapper;

	public List getShopList(Goods goods) {
		List list = indexMapper.getShopList(goods);
		return list;
	}

	public List<Images> getGoodImgs(String goodId) {
		List list = indexMapper.getGoodImgs(goodId);
		return list;
	}

	public List<Goods> getShopListFavs() {
		return indexMapper.getShopListFavs();
	}

	public List<Goods> getShopListBySearch(String keyword) {
		
		return indexMapper.getShopListBySearch(keyword);
	}
	
	
}
