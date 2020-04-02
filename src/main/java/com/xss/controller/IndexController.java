package com.xss.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.xss.pojo.Goods;
import com.xss.pojo.Images;
import com.xss.service.IndexService;
import com.xss.util.R;

@Controller
@RequestMapping("/index")
public class IndexController {

	@Autowired
	private IndexService indexService;
	
	@RequestMapping("/")
	public ModelAndView jumpIndex() {
		
		ModelAndView mv = new ModelAndView();
		mv.setViewName("index");
		
		return mv;
		
	}
	
	@ResponseBody
	@RequestMapping("/getShopList")
	public R getShopList(Goods goods) {
		List<Goods> list = indexService.getShopList(goods);
		HashMap<String, List> imgMap = new HashMap<String, List>();
		for(Goods good : list) {
			String goodId = good.getGoodId();
			List<Images> imgList = indexService.getGoodImgs(goodId);
			
			//imgMap.put(goodId, "");
			List<String> temList = new ArrayList();
			for(int i=0;i<imgList.size();i++) {
				Images img = imgList.get(i);
				String imgsrc = img.getImgSrc();
				String img_goodId = img.getGoodId();
				//List temList = new ArrayList();
				if(img_goodId.equals(goodId)) {
					temList.add(imgsrc);
				}
			}
			imgMap.put(goodId, temList);
		}
		
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("shopList", list);
		map.put("imgs", imgMap);
		
		return R.ok().put("map", map);
	}
	
	/**
	 * 主打商品-收藏数多的
	 * @param goods
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/getShopListFavs")
	public R getShopListFavs() {
		
		HashMap<String, Object> map = new HashMap<String, Object>();
		HashMap<String, List> imgMap = new HashMap<String, List>();
		List<Goods> list = indexService.getShopListFavs();
		for(Goods good : list) {
			String goodId = good.getGoodId();
			List<Images> imgList = indexService.getGoodImgs(goodId);
			
			//imgMap.put(goodId, "");
			List<String> temList = new ArrayList();
			for(int i=0;i<imgList.size();i++) {
				Images img = imgList.get(i);
				String imgsrc = img.getImgSrc();
				String img_goodId = img.getGoodId();
				//List temList = new ArrayList();
				if(img_goodId.equals(goodId)) {
					temList.add(imgsrc);
				}
			}
			imgMap.put(goodId, temList);
		}
		map.put("list", list);
		map.put("imgs", imgMap);
		
		return R.ok().put("map", map);
	}
	
	/**
	 * 搜索框方法
	 * @param keyword
	 * @param model
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/searchToShop")
	public ModelAndView searchToShop(String keyword) {
		ModelAndView mv = new ModelAndView();
		List<Goods> list = indexService.getShopListBySearch(keyword);
		
		mv.setViewName("shop.html");
		mv.addObject("shopList", list);
		mv.addObject("keyword", keyword);
		
		return mv;

	}
	
}

