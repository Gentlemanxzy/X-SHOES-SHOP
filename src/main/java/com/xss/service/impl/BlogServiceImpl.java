package com.xss.service.impl;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.xss.mapper.BlogMapper;
import com.xss.pojo.Article;
import com.xss.pojo.ArticleComment;
import com.xss.service.BlogService;

@Service
public class BlogServiceImpl implements BlogService {

	@Autowired
	private BlogMapper blogMapper;

	@Override
	public PageInfo<Article> getBlogList(int pageNums, int pageSize) {
		PageHelper.startPage(pageNums,pageSize);
		List<Article> list = blogMapper.getBlogList();
		if(!list.isEmpty()) {
			SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			for (Article obj : list) {
				String formatDate = format.format(list.get(0).getCreateTime());
				obj.setCreateTimeFormat(formatDate);
			}
		}
		PageInfo<Article> pageInfo = new PageInfo<Article>(list);
		
		return pageInfo;
	}

	@Override
	public int getBlogCount() {
		
		return blogMapper.getBlogCount();
	}

	@Override
	public Article getBlogDetail(String articleId) {
		
		return blogMapper.getBlogDetail(articleId);
	}

	@Override
	public List<ArticleComment> getCommentList(String articleId) {
		List<ArticleComment> list = blogMapper.getCommentList(articleId);
//		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		
		return list;
	}

	@Override
	public int insertComment(String content, String userId, String articleId) {
		int i = blogMapper.insertComment(content,userId,articleId);
		return i;
	}
	
	
}
