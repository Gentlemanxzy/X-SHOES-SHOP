package com.xss.controller;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.xss.pojo.Cars;
import com.xss.pojo.Goods;
import com.xss.pojo.Images;
import com.xss.service.CarsService;
import com.xss.service.ShopService;
import com.xss.util.R;

@Controller
@RequestMapping("/cars")
public class CarsController {
	@Autowired
	private CarsService carsService;
	@Autowired
	private ShopService shopService;
	
	/**
	 * 获取购物车信息
	 * @param userId
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/getCarsData")
	public R getCarsData(String userId) {
		HashMap<String, String> imgMap = new HashMap<String, String>();
		List<Cars> list = carsService.getCarsData(userId);
		for (Cars car : list) {
			String goodId = car.getGoodId();
			List<Images> imgList = shopService.getGoodImgs(goodId);
			imgMap.put(goodId, "");
			for (int j = 0; j < imgList.size(); j++) {
				Images img = imgList.get(j);
				String imgsrc = img.getImgSrc();
				// System.out.println(imgMap.get(goodId));
				if (imgMap.get(goodId) == "" || imgMap.get(goodId) == null) {
					imgMap.put(goodId, imgsrc);
				}
			}
		}
		
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("imgs", imgMap);
		map.put("data", list);
		return R.ok().put("map", map);
	}
	
	@ResponseBody
	@RequestMapping("/updateGoodInfo")
	public R updateGoodInfo(String userId,String goodId,String goodSize,String goodNums,double goodTotalPrice,String goodColor) {
		int i = carsService.updateGoodInfo(userId,goodId,goodSize,goodNums,goodTotalPrice,goodColor);
		if(i>=1) {
			return R.ok().put("msg", "suc");
		}else {
			return R.error("遇到了点问题");
		}
	}
	
	@ResponseBody
	@RequestMapping("/addToCar")
	public R addToCar(String userId,String goodId,String goodSize,String goodNums,double goodTotalPrice,String goodColor) {
		int i = carsService.addToCar(userId,goodId,goodSize,goodNums,goodTotalPrice,goodColor);
		if(i>=1) {
			return R.ok().put("msg", "添加成功");
		}else {
			return R.error("遇到了点问题");
		}
	}
	
	@ResponseBody
	@RequestMapping("/delCarGood")
	public R delCarGood(String userId,String goodId,String goodSize,String goodColor) {
		int i = carsService.delCarGood(userId,goodId,goodSize,goodColor);
		if(i>=1) {
			return R.ok().put("msg", "删除成功");
		}else {
			return R.error("遇到了点问题");
		}
	}
	
	/**
	 * 跳转结算页面
	 * @param userId 
	 * @param addId
	 * @param object 选中的商品array
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/jumpToCheck")
	public Object jumpToCheck(String userId,String addId,String checkedData) {
		ModelAndView mv = new ModelAndView();
		int i = carsService.insertCheckInfo(userId,addId,checkedData);
		
		if(i>=1) {
			mv.setViewName("checkout.html");
			return mv;
		}else {
			return new R().ok("ERROR,插入数据库失败");
		}
		//mv.addObject("shopList", list);
		//mv.addObject("keyword", keyword);
	}
}
