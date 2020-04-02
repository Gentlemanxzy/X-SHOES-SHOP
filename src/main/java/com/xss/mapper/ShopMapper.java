package com.xss.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.github.abel533.mapper.Mapper;
import com.xss.dto.GoodsDto;
import com.xss.pojo.FavGoods;
import com.xss.pojo.Goods;
import com.xss.pojo.Images;

public interface ShopMapper extends Mapper<Goods>{

	List getShopList(GoodsDto dto);

	int getShopTotal(GoodsDto dto);

	List getBrandList();

	List<Images> getGoodImgs(String goodId);

	Goods getGoodInfo(String goodId);

	List<FavGoods> isLikeGood(@Param("userId")String userId, @Param("goodId")String goodId);

	int insertLikeGood(@Param("userId")String userId,@Param("goodId")String goodId);

	int updateLikeGood(@Param("userId")String userId,@Param("goodId")String goodId);
	
	List getFavGoodsByuserId(@Param("userId")String userId);

	int delFav(@Param("goodId")String goodId, @Param("userId")String userId);

	int favNumController(@Param("goodId")String goodId, @Param("userId")String userId, @Param("num")int num);

	int addViewHis(@Param("userId")String userId, @Param("goodId")String goodId);

}
