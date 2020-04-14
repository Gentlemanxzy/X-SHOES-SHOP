package com.xss.pojo;

import java.sql.Timestamp;
import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.Table;

@Table(name = "article")
public class Article {
	@Id
	private String articleId;
	@Column(name = "author")
	private String author;
	private Date createTime;
	private String createTimeFormat;// 用于格式化数据用sql中没有
	private String articleTitle;
	private String articleTag;
	private int readNum;
	private String status;
	private String articleContent;
	private String articleProfiles;
	private String coverImg;
	private String articleUrl;
	
	
	public String getArticleUrl() {
		return articleUrl;
	}
	public void setArticleUrl(String articleUrl) {
		this.articleUrl = articleUrl;
	}
	public String getCreateTimeFormat() {
		return createTimeFormat;
	}
	public void setCreateTimeFormat(String createTimeFormat) {
		this.createTimeFormat = createTimeFormat;
	}
	public String getArticleProfiles() {
		return articleProfiles;
	}
	public void setArticleProfiles(String articleProfiles) {
		this.articleProfiles = articleProfiles;
	}
	public String getCoverImg() {
		return coverImg;
	}
	public void setCoverImg(String coverImg) {
		this.coverImg = coverImg;
	}
	public String getArticleId() {
		return articleId;
	}
	public void setArticleId(String articleId) {
		this.articleId = articleId;
	}
	public String getAuthor() {
		return author;
	}
	public void setAuthor(String author) {
		this.author = author;
	}
	public Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	public String getArticleTitle() {
		return articleTitle;
	}
	public void setArticleTitle(String articleTitle) {
		this.articleTitle = articleTitle;
	}
	public String getArticleTag() {
		return articleTag;
	}
	public void setArticleTag(String articleTag) {
		this.articleTag = articleTag;
	}
	public int getReadNum() {
		return readNum;
	}
	public void setReadNum(int readNum) {
		this.readNum = readNum;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getArticleContent() {
		return articleContent;
	}
	public void setArticleContent(String articleContent) {
		this.articleContent = articleContent;
	}
	@Override
	public String toString() {
		return "Article [articleId=" + articleId + ", author=" + author + ", createTime=" + createTime
				+ ", articleTitle=" + articleTitle + ", articleTag=" + articleTag + ", readNum=" + readNum + ", status="
				+ status + ", articleContent=" + articleContent + "]";
	}
	
}
