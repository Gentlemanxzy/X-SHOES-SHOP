package com.xss.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xss.pojo.Cars;
import com.xss.pojo.FavGoods;
import com.xss.pojo.Images;
import com.xss.pojo.User;
import com.xss.service.CarsService;
import com.xss.service.LoginService;
import com.xss.service.ShopService;
import com.xss.util.R;

@Controller
@RequestMapping("/login")
public class LoginController {
	@Autowired
	private LoginService loginService;
	@Autowired
	private ShopService shopService;
	@Autowired
	private CarsService carsService;
	
	/**
	 * Login 登录
	 * @param 
	 * @return 确认信息
	 */
	@ResponseBody
	@RequestMapping("/login")
	public R loginUser(User user) {
		
		//@RequestParam("user") String userName 
		// 入参和接受参数名字不对时时使用这个
		
		user.setPassWord(DigestUtils.md5Hex(user.getPassWord()));	// md5加密
		User userInfo = loginService.login(user);
		if(userInfo==null) {
			return R.ok().put("msg", "请检查用户名密码");
		}
		String userId = userInfo.getUserId();
		List<FavGoods> favList = loginService.getFavGoodsByuserId(userId);	// 获取用户收藏列表
		List<String> favGoodList = new ArrayList<String>();
		if(!favList.isEmpty()) {
			for (FavGoods favGoods : favList) {
				favGoodList.add(favGoods.getGoodId());
			}
		}else {
			
		}
		
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("userInfo",userInfo);
		map.put("favList", favGoodList);
		
		return R.ok().put("map", map);
	}
	
	/**
	 * reg注册
	 * @param 
	 * @return 确认信息
	 */
	@ResponseBody
	@RequestMapping("/reg")
	public R regUser(User user) {
		
		String id = UUID.randomUUID().toString().replaceAll("-", "");
		user.setUserId(id);
		
		int i = loginService.reg(user);
		
		return R.ok().put("status", i);
	}
	
	/**
	 * 验证用户是否存在
	 * @param user
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/isExist")
	public R isExist(User user) {
		int i = loginService.isExist(user);
		return R.ok().put("count", i);
	}
	
	/**
	 * 收藏 和 购物车 根据userId
	 * @param userId
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/getFavsAndCars")
	public R getFavsAndCars(String userId) {
		// 收藏商品
		List<FavGoods> favList = loginService.getFavGoodsByuserId(userId);
		List<String> favGoodList = new ArrayList<String>();
		if(!favList.isEmpty()) {
			for (FavGoods favGoods : favList) {
				favGoodList.add(favGoods.getGoodId());
			}
		}else {
			
		}
		
		// 购物车商品
		List<Cars> carsList = carsService.getCarsData(userId);
		HashMap<String, String> imgMap = new HashMap<String, String>();
		for (Cars cars : carsList) {
			String goodId =cars.getGoodId();
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
		map.put("favs",favGoodList);
		map.put("cart",carsList);
		map.put("cartImg", imgMap);
		return R.ok().put("map", map);
	}
}
