package com.xss.service;

import java.util.List;

import com.github.pagehelper.PageInfo;
import com.xss.pojo.Article;
import com.xss.pojo.ArticleComment;

public interface BlogService {

	PageInfo<Article> getBlogList(int pageNums, int pageSize);

	int getBlogCount();

	Article getBlogDetail(String articleId);

	List<ArticleComment> getCommentList(String articleId);

	int insertComment(String content, String userId, String articleId);

}
