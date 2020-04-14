package com.xss.pojo;

import java.util.Date;

import javax.persistence.Id;
import javax.persistence.Table;

@Table(name="articlecomment")
public class ArticleComment {
	@Id
	private String commentId;
	private String articleId;
	private String userId;
	private String userName;
	private String content;
	private Date createTime;
	private String faCommentId;
	private String status;
	
	
	public ArticleComment() {
		super();
	}
	
	public ArticleComment(String commentId, String articleId, String userId, String userName, String content,
			Date createTime, String faCommentId, String status) {
		super();
		this.commentId = commentId;
		this.articleId = articleId;
		this.userId = userId;
		this.userName = userName;
		this.content = content;
		this.createTime = createTime;
		this.faCommentId = faCommentId;
		this.status = status;
	}


	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getCommentId() {
		return commentId;
	}
	public void setCommentId(String commentId) {
		this.commentId = commentId;
	}
	public String getArticleId() {
		return articleId;
	}
	public void setArticleId(String articleId) {
		this.articleId = articleId;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	public String getFaCommentId() {
		return faCommentId;
	}
	public void setFaCommentId(String faCommentId) {
		this.faCommentId = faCommentId;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	
	
}
