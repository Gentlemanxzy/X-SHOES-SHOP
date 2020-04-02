package com.xss.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.github.pagehelper.PageInfo;
import com.xss.dto.GoodsDto;
import com.xss.pojo.FavGoods;
import com.xss.pojo.Goods;
import com.xss.pojo.Images;
import com.xss.service.ShopService;
import com.xss.util.R;

@Controller
@RequestMapping("/shop")
public class ShopController {
	@Autowired
	private ShopService shopService;

	@ResponseBody
	@RequestMapping("/getShopList")
	public R getShopList(GoodsDto dto) {
		List shopList = new ArrayList();
		shopList = shopService.getShopList(dto);
		int total = shopService.getShopTotal(dto);// 获取商品总数
		HashMap<String, String> imgMap = new HashMap<String, String>();

		// 根据goodid获取商品封面图 只取一张图
		for (int i = 0; i < shopList.size(); i++) {
			Goods goods = (Goods) shopList.get(i);
			String goodId = goods.getGoodId();
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
		map.put("count", total);
		map.put("shopList", shopList);
		return R.ok().put("map", map);
	}

	/**
	 * 获取总数
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/getShopTotal")
	public R getShopTotal(GoodsDto dto) {
		int total = shopService.getShopTotal(dto);
		return R.ok().put("total", total);
	}

	@ResponseBody
	@RequestMapping("/getBrandList")
	public R getBrandList() {
		List list = new ArrayList();
		list = shopService.getBrandList();
		return R.ok().put("brandList", list);
	}

	/**
	 * 根据goodid获取某个商品信息
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/getGoodInfo")
	public R getGoodInfo(String goodId) {
		Goods good = shopService.getGoodInfo(goodId);
		return R.ok().put("goodInfo", good);
	}

	@ResponseBody
	@RequestMapping("/initGoodImgs")
	public R initGoodImgs(String goodId) {
		List<Images> list = shopService.getGoodImgs(goodId);
		return R.ok().put("goodImg", list);
	}

	@ResponseBody
	@RequestMapping("/likeOrHeatGood")
	public R likeOrHeatGood(String userId, String goodId) {

		// 判断是否已经在收藏夹
		List<FavGoods> list = shopService.isLikeGood(userId, goodId);
		// 判断是否为空
		if (list.size() <= 0) {
			int i = shopService.insertLikeGood(userId, goodId);
			if (i > 0) {
				// 新增成功
				return R.ok().put("flag", 1);
			} else {
				return R.ok().put("flag", 0);
			}
		}else {
			
			FavGoods fav = list.get(0);
			// 需要修改
			for (FavGoods favGoods : list) {
				String status = favGoods.getStatus();
				if ("1".equals(status)) {
					fav = favGoods;
					break;
				}
			}
			
			if (fav != null && "1".equals(fav.getStatus())) {
				// 弹出提示 取消收藏
				int i = shopService.updateLikeGood(userId, goodId);
				if (i > 0) {
					return R.ok().put("flag", 1);// 成功
				} else {
					return R.ok().put("flag", 0); // 操作失败
				}
				
			} else if (fav == null || "0".equals(fav.getStatus())) {
				// 新增心愿表
				int i = shopService.insertLikeGood(userId, goodId);
				if (i > 0) {
					// 新增成功
					return R.ok().put("flag", 1);
				} else {
					return R.ok().put("flag", 0);
				}
			}
		}
		return R.ok();
	}

	@ResponseBody
	@RequestMapping("/getFavGoodsByuserId")
	public R getFavGoodsByuserId(String userId, int pageNums, int pageSize) {
		// 收藏列表
		PageInfo<FavGoods> pageInfo = shopService.getFavGoodsByuserId(userId, pageNums, pageSize);
		List<FavGoods> favList = pageInfo.getList();

		List<Goods> goodList = new ArrayList<Goods>();
		HashMap<String, Object> map = new HashMap<String, Object>();
		HashMap<String, Object> imgMap = new HashMap<String, Object>();
		// 获取list里的goodId
		for (FavGoods favGoods : favList) {
			String goodId = favGoods.getGoodId();
			List<Images> imgList = shopService.getGoodImgs(goodId);
			goodList.add(shopService.getGoodInfo(goodId));
			imgMap.put(goodId, imgList);
			map.put("imgs", imgMap);
		}
		map.put("list", goodList);
		map.put("pageInfo", pageInfo);
		return R.ok().put("map", map);
	}

	@ResponseBody
	@RequestMapping("/delFav")
	public R delFav(String goodId, String userId) {
		int i = shopService.delFav(goodId, userId);
		if (i >= 1) {
			int j = shopService.favNumController(goodId, userId, -1);
			if(j>=1) {
				return R.ok().put("flag", 1);
			}else {
				return R.ok().put("flag", 0);
			}
		}
		return R.ok().put("flag", 0);
	}

	@ResponseBody
	@RequestMapping("/favNumController")
	public R favNumController(String goodId, String userId, int num) {
		int i = shopService.favNumController(goodId, userId, num);
		if (i > 0) {
			return R.ok().put("msg", "suc");
		}
		return R.ok().put("msg", "error");
	}
	
	/**
	 * 浏览记录表
	 * @param goodId
	 * @param userId
	 * @param num
	 * @return R
	 */
	@ResponseBody
	@RequestMapping("/addViewHis")
	public R addViewHis(String userId, String goodId) {
		int i = shopService.addViewHis(userId,goodId);
		if(i>=1) {
			return R.ok();
		}else {
			return R.error();
		}
	}

}
