package com.xss.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xss.mapper.CarsMapper;
import com.xss.pojo.Cars;
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

}
