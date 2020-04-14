var pageNums = 1; //页码
var pageSize = 5; //页容量
var pages = 1;// 一共多少页
var count=0;//一共多少记录

var blogVm = new Vue({
	el: '#blogList',
	data: {
		blogList: null
	}
});

var baseURL = $("#baseURL").val();
//导航栏 按钮
$(".navItem").click(function(){
	var key = $(this).text().trim();
	key = key.replace(" ",'');
	window.location.href = baseURL+"/shop.html?keyword="+key;
});

$(".colorItem").click(function(){
	var color = $(this).text().trim().replace("色",'');
	window.location.href = baseURL+"/shop.html?color="+color;
});

$("listItem").click(function(){
	var key = $(this).text().trim().replace(" ",'');
	window.location.href = baseURL+"/shop.html?keyword="+key;
});

$(document).ready(function(){
	initBrandArea();
	getBlogList(pageNums,pageSize);
	//initPageBar();// 分页工具
	
});

/**
 * 初始化分页
 * @returns
 */
function initPageBar(pageNums, pageSize,total,lastpage){
	//var pages = Math.ceil(1.0*count/pageSize);
	
	layui.use(['laypage', 'layer'], function(){
		  var laypage = layui.laypage
		  ,layer = layui.layer;
		  
		  laypage.render({
			    elem: 'pagebar'
		    	//,skin: '#1E9FFF'
		    	,curr: pageNums		// 起始页
		    	,count: total
		    	,limit: pageSize
		    	,limits: [5,10]
			    //,pages: pages //总页数
			    ,first: pageNums	// 起始页
			    ,last: lastpage	// 最后页
			    ,prev: '<em> ← </em>'
			    ,next: '<em> → </em>'
			    ,layout: ['prev', 'page', 'next','limit','count','refresh','skip'],
			    jump: function (e, first) { //触发分页后的回调
                  if (!first) { //一定要加此判断，否则初始时会无限刷新
                	  getBlogList(e.curr, e.limit);
                  }
              }
		  });
		  
	});
	
}

//品牌分类
function initBrandArea(){
	$.ajax({
		url : baseURL+"/shop/getBrandList", // 请求地址
		type : "post", // 请求的类型，可选post、get等
		dataType : "json" ,// 返回的类型，可选xml、json、script 或 html
		data : {}, // 请求的数据,规定连同请求发送到服务器的数据 (data1)
		async : "true" , // 是否异步 默认为true
		success : function(data){
			if(data.code==200){
				var vue = new Vue({
					el: '#brandList',
					data: {
						brandList: data.brandList
					}
				});
			}else{
				layer.msg('出错啦');
			}
		}
	});
}

/**
 * 获取blog列表和总数
 * @returns
 */
function getBlogList(pageNums,pageSize){
	$.ajax({
		url : baseURL+"/blog/getBlogList", // 请求地址
		type : "post", // 请求的类型，可选post、get等
		dataType : "json" ,// 返回的类型，可选xml、json、script 或 html
		data : {
			pageNums:pageNums,
			pageSize:pageSize
		}, // 请求的数据,规定连同请求发送到服务器的数据 (data1)
		async : false , // 是否异步 默认为true
		success : function(data){
			if(data.code==200){
				data = data.data;
				var pageInfo = data.pageInfo;
				if(pageInfo.total==0){
					layer.msg("暂无数据");
				}else{
					count = pageInfo.total;
					blogVm.blogList = data.blogList;
					initPageBar(pageNums,pageSize,count,pageInfo.lastPage);
				}
			}else{
				layer.msg('出错啦');
				return;
			}
		}
	});
}

