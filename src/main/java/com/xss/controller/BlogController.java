package com.xss.controller;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.github.pagehelper.PageInfo;
import com.xss.pojo.Article;
import com.xss.pojo.ArticleComment;
import com.xss.service.BlogService;
import com.xss.util.R;

@Controller
@RequestMapping("/blog")
public class BlogController {
	
	@Autowired
	private BlogService blogService;
	
	@ResponseBody
	@RequestMapping("/getBlogList")
	public R getBlogList(int pageNums, int pageSize) {
		HashMap<String, Object> map = new HashMap<String, Object>();
		PageInfo<Article> pageInfo = blogService.getBlogList(pageNums,pageSize);
		List<Article> list = pageInfo.getList();
		if(list==null || list.size()<=0) {
			map.put("count", 0);
			return R.ok().put("data", map);
		}
		//int num = blogService.getBlogCount();
		
		map.put("pageInfo", pageInfo);
		map.put("blogList", list);
		return R.ok().put("data", map);
	}
	
	@ResponseBody
	@RequestMapping("/getBlogDetail")
	public R getBlogDetail(String articleId) {
		Article article = blogService.getBlogDetail(articleId);
		List<ArticleComment> list = blogService.getCommentList(articleId);
		return R.ok().put("data", article).put("list", list);
	}
	
	@ResponseBody
	@RequestMapping("/submitComment")
	public R submitComment(String content,String userId,String articleId) {
		int i = 0;
		try {
			i = blogService.insertComment(content,userId,articleId);
			if(i>=1) {
				return R.ok().put("res", i);
			}else {
				return R.ok().put("res", "写入数据库失败");
			}
		} catch (Exception e) {
			return R.error("数据库ERROR");
		}
		
	}
	
	/**
	 * 暂时不用，写在getBlogDetail方法中
	 * @param articleId
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/getComment")
	public R getCommentList(String articleId) {
		List<ArticleComment> list = blogService.getCommentList(articleId);
		
		return R.ok().put("list", list);
	}
	
}
