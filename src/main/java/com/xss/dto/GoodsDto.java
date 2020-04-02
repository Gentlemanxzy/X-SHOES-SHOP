package com.xss.dto;

import com.xss.pojo.Goods;

/**
 * 
 * @author xzy
 *
 */
public class GoodsDto extends Goods {
	
	private int pageNums=1;//第几页
	
	private int pageSize=9;//页容量
	
	private int pages=1;//总共多少页
	
	private int count=0; // 总共多少记录
	
	private String orderBy;//根据哪个字段排序 
	
	private String sort;//正序或者倒序
	
	private int minPrice; // 价格区间
	private int maxPrice;
	private String keyword;
	
	public String getKeyword() {
		return keyword;
	}

	public void setKeyword(String keyword) {
		this.keyword = keyword;
	}

	public int getMinPrice() {
		return minPrice;
	}

	public void setMinPrice(int minPrice) {
		this.minPrice = minPrice;
	}

	public int getMaxPrice() {
		return maxPrice;
	}

	public void setMaxPrice(int maxPrice) {
		this.maxPrice = maxPrice;
	}

	public int getPageNums() {
		return pageNums;
	}

	public void setPageNums(int pageNums) {
		this.pageNums = pageNums;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public int getPages() {
		return pages;
	}

	public void setPages(int pages) {
		this.pages = pages;
	}

	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}

	public String getOrderBy() {
		return orderBy;
	}

	public void setOrderBy(String orderBy) {
		this.orderBy = orderBy;
	}

	public String getSort() {
		return sort;
	}

	public void setSort(String sort) {
		this.sort = sort;
	}
	
}
