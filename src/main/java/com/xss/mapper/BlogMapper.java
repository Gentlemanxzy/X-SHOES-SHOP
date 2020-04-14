package com.xss.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.github.abel533.mapper.Mapper;
import com.xss.pojo.Article;
import com.xss.pojo.ArticleComment;

public interface BlogMapper extends Mapper<Article>{

	List<Article> getBlogList();

	int getBlogCount();

	Article getBlogDetail(@Param("articleId")String articleId);

	List<ArticleComment> getCommentList(@Param("articleId")String articleId);

	int insertComment(@Param("content")String content, @Param("userId")String userId, @Param("articleId")String articleId);

}
