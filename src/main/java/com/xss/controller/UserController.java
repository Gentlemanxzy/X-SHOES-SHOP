package com.xss.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.xss.pojo.Contact;
import com.xss.pojo.ShopAddress;
import com.xss.pojo.User;
import com.xss.service.UserService;
import com.xss.util.R;

@Controller
@RequestMapping("/user")
public class UserController {

	@Autowired
	private UserService userService;
	
	@RequestMapping("/updateUserInfo")
	@ResponseBody
	public R updateUserInfo(String userId, String str) {
		
		User user = JSON.parseObject(str, User.class);
		user.setUserId(userId);
		int i = userService.updateUserInfo(user);
		if(i>=1) {
			return R.ok().put("msg", "更新成功");
		}else {
			return R.error("操作失败");
		}
	}
	
	@RequestMapping("/getShopArea")
	@ResponseBody
	public R getShopArea(String userId) {
		List<ShopAddress> list = userService.getShopArea(userId);
		
		return R.ok().put("shopAddressList", list);
	}
	
	@RequestMapping("/getAddrByAddId")
	@ResponseBody
	public R getAddrByAddId(String addId) {
		ShopAddress sAddress = userService.getAddrByAddId(addId);
		
		return R.ok().put("addrInfo", sAddress);
	}
	
	@RequestMapping("/delAddr")
	@ResponseBody
	public R delAddr(String addId) {
		int i = userService.delAddr(addId);
		if(i>0) {
			return R.ok().put("msg", "删除成功");
		}else {
			return R.error("删除失败");
		}
	}
	
	/**
	 * 新增收货地址
	 * @param userId
	 * @param str
	 * @return
	 */
	@RequestMapping("/addAddr")
	@ResponseBody
	public R addAddr(String userId, String str) {
		ShopAddress sAddress = JSON.parseObject(str, ShopAddress.class);
		sAddress.setUserId(userId);
		// 如果此地址设为默认地址，需要修改其他地址
		if("1".equals(sAddress.getIsMain())) {
			int j = userService.updateIsMain(userId);
			if(j>=0) {
				int i = userService.addShopAddr(sAddress);
				if(i>0) {
					return R.ok().put("msg", "新增成功");
				}else {
					return R.error("添加新收货地址出错");
				}
			}else {
				return R.error("修改默认地址出错");
			}
		}
		int i = userService.addShopAddr(sAddress);
		if(i>0) {
			return R.ok().put("msg", "新增成功");
		}else {
			return R.error("添加新收货地址出错");
		}
	}
	
	/**
	 * 更新收货地址
	 * @param userId
	 * @param str
	 * @return
	 */
	@RequestMapping("/updateAddr")
	@ResponseBody
	public R updateAddr(String userId, String str) {
		ShopAddress sAddress = JSON.parseObject(str, ShopAddress.class);
		sAddress.setUserId(userId);
		// 如果此地址设为默认地址，需要修改其他地址
		if("1".equals(sAddress.getIsMain())) {
			int j = userService.updateIsMain(userId);
			if(j>=0) {
				int i = userService.updateAddr(sAddress);
				if(i>0) {
					return R.ok().put("msg", "修改成功");
				}else {
					return R.error("修改收货地址出错");
				}
			}else {
				return R.error("修改默认地址出错");
			}
		}
		int i = userService.updateAddr(sAddress);
		if(i>0) {
			return R.ok().put("msg", "修改成功");
		}else {
			return R.error("修改收货地址出错");
		}
	}
	
	@RequestMapping("/commitComment")
	@ResponseBody
	public R commitComment(Contact info) {
		int i = userService.commitComment(info);
		
		if(i>=1) {
			return R.ok().put("msg", "感谢您的反馈😀");
		}else if(i==-1) {
			// 邮件报错
			return R.error("邮件发送失败");
		}else {
			// 数据库报错
			return R.error("操作失败");
		}
		
	}
	
}
