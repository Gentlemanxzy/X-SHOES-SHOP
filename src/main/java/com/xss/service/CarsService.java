package com.xss.service;

import java.util.List;

public interface CarsService {

	List getCarsData(String userId);

	int updateGoodInfo(String userId, String goodId, String goodSize, String goodNums, double goodTotalPrice,String goodColor);

	int addToCar(String userId, String goodId, String goodSize, String goodNums, double goodTotalPrice,
			String goodColor);

	int delCarGood(String userId, String goodId, String goodSize, String goodColor);

}
