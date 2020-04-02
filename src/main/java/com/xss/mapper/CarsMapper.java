package com.xss.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.github.abel533.mapper.Mapper;
import com.xss.pojo.Cars;

public interface CarsMapper extends Mapper<Cars>{

	List<Cars> getCarsData(String userId);

	int updateGoodInfo(@Param("userId")String userId, @Param("goodId")String goodId, 
			@Param("goodNums")String goodNums, @Param("goodSize")String goodSize, 
			@Param("goodTotalPrice")double goodTotalPrice, @Param("goodColor")String goodColor);

	int addToCar(@Param("userId")String userId, @Param("goodId")String goodId, 
			@Param("goodNums")String goodNums, @Param("goodSize")String goodSize, 
			@Param("goodTotalPrice")double goodTotalPrice, @Param("goodColor")String goodColor);

	int delCarGood(@Param("userId")String userId, @Param("goodId")String goodId, 
			@Param("goodSize")String goodSize, @Param("goodColor")String goodColor);

}
