package com.xss.service.impl;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.xss.mapper.CarsMapper;
import com.xss.pojo.Cars;
import com.xss.pojo.Goods;
import com.xss.pojo.OrderDetials;
import com.xss.pojo.Orders;
import com.xss.service.CarsService;

@Service
public class CarsServiceImpl implements CarsService {
	@Autowired
	private CarsMapper carsMapper;

	public List getCarsData(String userId) {
		List<Cars> list = carsMapper.getCarsData(userId);
		
		return list;
	}

	public int updateGoodInfo(String userId, String goodId, String goodSize, String goodNums, double goodTotalPrice,String goodColor) {
		int i = carsMapper.updateGoodInfo(userId,goodId,goodNums,goodSize,goodTotalPrice,goodColor);
		return i;
	}

	public int addToCar(String userId, String goodId, String goodSize, String goodNums, double goodTotalPrice,
			String goodColor) {
		int i = carsMapper.addToCar(userId,goodId,goodNums,goodSize,goodTotalPrice,goodColor);
		return i;
	}

	public int delCarGood(String userId, String goodId, String goodSize, String goodColor) {
		int i = carsMapper.delCarGood(userId,goodId,goodSize,goodColor);
		return i;
	}

	@Override
	public int insertCheckInfo(String userId, String addId, String jsonArray) {
		Boolean flag = true;
		JSONArray array = JSON.parseArray(jsonArray);
		List<OrderDetials> list = JSONObject.parseArray(array.toJSONString(), OrderDetials.class);
		
		String uuid = UUID.randomUUID().toString().replaceAll("-", "");
		Orders orders = new Orders();
		orders.setAddId(addId);
		orders.setUserId(userId);
		orders.setStatus("0");
		orders.setOrderId(uuid);
		// 插入Orders
		int i = carsMapper.insertOrders(orders);
		if(i<=0) {
			return 0;
		}
		
		for (OrderDetials oDetials : list) {
			if(flag) {
				oDetials.setOrderId(uuid);
				oDetials.setOrderDetialStatus("0");
				// 插入OrderDetials表
				int j = carsMapper.insertOrdersDetial(oDetials);
				if(i<=0 || j<=0) {
					flag = false;
					break;
				}
			}
		}
		if(flag) {
			return 1;
		}else {
			return 0;
		}
		
	}

}
