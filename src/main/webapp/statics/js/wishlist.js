var pageNums = 1; //页码
var pageSize = 5; //页容量
var pages = 1;// 一共多少页
var count=0;//一共多少记录
var wishvm = new Vue({
	el: '#wishlist',
	data: {
		shopList: null
	},
});
$(document).ready(function(){
	baseURL = $("#baseURL").val();
	initBrandArea();
	initFavsList(pageNums, pageSize);
	//initPageBar(pageNums,pageSize,count,0);
});

function initPageBar(pageNums, pageSize,total,lastpage){
	
	layui.use(['laypage', 'layer'], function(){
		  var laypage = layui.laypage
		  ,layer = layui.layer;
		  
		  laypage.render({
			    elem: 'pagebar'
		    	//,skin: '#1E9FFF'
		    	,curr: pageNums		// 起始页
		    	,count: total
		    	,limit: pageSize
		    	,limits: [5,10, 15]
			    //,pages: pages //总页数
			    ,first: pageNums	// 起始页
			    ,last: lastpage	// 最后页
			    ,prev: '<em> ← </em>'
			    ,next: '<em> → </em>'
			    ,layout: ['prev', 'page', 'next','limit','count','refresh','skip'],
			    jump: function (e, first) { //触发分页后的回调
                    if (!first) { //一定要加此判断，否则初始时会无限刷新
                    	initFavsList(e.curr, e.limit);
                    }
                }
		  });
		  
	});
}

function initFavsList(pageNums, pageSize){
	var userId = localStorage.getItem("user");
	if(userId){
		// 已登录
		$.ajax({
			url:baseURL+"/shop/getFavGoodsByuserId",
			data:{
				userId:userId,
				pageNums:pageNums,
				pageSize:pageSize
			},
			type : "post", // 请求的类型，可选post、get等
			async:"true",
			success : function(data){
				if(data.code==200){
					var wishlist = data.map.list;
					var imgs = data.map.imgs;
					var len = wishlist.length;
					
					for(let i=0;i<len;i++){
						var timestamp=new Date().getTime();	//时间戳
						var keyId = wishlist[i].goodId+Math.ceil(timestamp/Math.floor(Math.random()*10));
						wishlist[i].keyId = keyId;
						if(imgs[wishlist[i].goodId]!=null && imgs[wishlist[i].goodId]!=""){
							wishlist[i].imgsrc = baseURL+"/statics"+imgs[wishlist[i].goodId][0].imgSrc;
						}else{
							wishlist[i].imgsrc = baseURL+"/statics/img/product/24.png";
						}
					}
					wishvm.shopList = wishlist;
					
					var pageInfo = data.map.pageInfo;
					count = pageInfo.total;
					// 当前页，页容量，总量，最后一页
					initPageBar(pageNums, pageSize, pageInfo.total,pageInfo.lastPage);
					
				}else{
					layer.msg('error');
					return;
				}
			}
		});
	}else{
		// 未登录
		layer.msg('您还未登录,请先登录XSS', {
			  time: 0 //不自动关闭
			  ,title: '请先登录'
			  ,btn: ['好啊', '算了']
			  ,yes: function(index){
			    layer.close(index);
			    window.location.href=baseURL + '/login.html';
			  }
		});
	}
}

function delFavBtn(goodId){
	var userId = localStorage.getItem("user");
	if(goodId){
		layer.msg('你确定要移除此商品吗？', {
		  time: 0 //不自动关闭
		  ,title: '移除该心愿商品'
		  ,btn: ['是的', '算了']
		  ,yes: function(index){
		    layer.close(index);
		    $.ajax({
		    	url:baseURL+"/shop/delFav",
				data:{
					goodId:goodId,
					userId:userId
				},
				type : "post", // 请求的类型，可选post、get等
				success : function(data){
					if(data.code=="200"){
						if(data.flag == '1'){
							layer.msg("操作成功");
							// 刷新页面
							//initFavsList(1,5);
							location.reload();
						}
					}
				}
		    });
		  }
		});
	}
}

function initBrandArea(){
	$.ajax({
		url : baseURL+"/shop/getBrandList", // 请求地址
		type : "post", // 请求的类型，可选post、get等
		dataType : "json" ,// 返回的类型，可选xml、json、script 或 html
		data : {}, // 请求的数据,规定连同请求发送到服务器的数据 (data1)
		async : "true" , // 是否异步 默认为true
		success : function(data){
			if(data.code==200){
				console.log(data.brandList);
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

function addCartBtn(goodId){
	let userId = localStorage.getItem("user");
	
	layer.open({
		  title: '商品信息确认'
		  ,type: 2
		  ,area: ['800px', '500px']
		  ,fixed: false //不固定
		  //,maxmin: true
		  ,content: baseURL+'/addToCartLayer.html?goodId='+goodId
		  ,success: function(layero, index){
			  var body = layer.getChildFrame('body', index);//获取子页面内容
			  var iframeWin = window[layero.find('iframe')[0]['name']];
		  }
	});
};

$(".navItem").click(function(){
	var key = $(this).text().trim();
	key = key.replace(" ",'');
	window.location.href = baseURL+"/shop.html?keyword="+key;
});

$(".colorItem").click(function(){
	var color = $(this).text().trim().replace("色",'');
	window.location.href = baseURL+"/shop.html?color="+color;
});