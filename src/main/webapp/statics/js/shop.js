var pageNums = 1; //页码
var pageSize = 6; //页容量
var pages = 1;// 一共多少页
var count=0;//一共多少记录
var orderBy = "good_IsNew";
var sort = "DESC";
var baseURL = "";
var minPrice = 0;
var maxPrice = 3000;
var shopVm = new Vue({
	el: '#list',
	data: {
		shopList: null
	},
});
var keyword = '';
var sex = '';

$(document).ready(function(){
	baseURL = $("#baseURL").val();
	
	// 如果是从首页过来有关键词的话
	/*var sessionStorage = window.sessionStorage;
	var keyword = sessionStorage.getItem("keyword");
	if(keyword!='' && keyword!=null){
		layer.msg(keyword);
	}*/
	var keyword = getUrlParam("keyword");
	var sex = getUrlParam("sex");
	if(sex==null){
		sex = '';
	}
	
	if(keyword!='' && keyword!=null){ 	// 如果有关键词
		//layer.msg(keyword);
		initGoods(pageNums, pageSize, orderBy ,sort , keyword,sex);
	}else{
		// 调用加载商品列表的方法
		initGoods(pageNums, pageSize, orderBy ,sort , '',sex);
	}
	
	//getShopTotal(); // 获取总共多少记录
	//调用分页插件
	initPageBar();
	// 调用价格区间滑块插件
	initPriceArea();
	// 品牌分类
	initBrandArea();
	
	sessionStorage.removeItem("keyword");
	
	// 排序规则
	$("#sortSelect").add('#sortSelectDesc').change(function(){
		let select = $("#sortSelect").find("option:selected").val();
		
		let paixu = '';
		let msg = '';
		if(select != ''){
			$("#sortSelectDesc").removeClass("isHide");
			paixu = $("#sortSelectDesc").find("option:selected").val();
			msg = "您已选择按"+$("#sortSelect").find("option:selected").text()+$("#sortSelectDesc").find("option:selected").text()+"排序";
			orderBy = select;
			sort = paixu;
		}else{
			$("#sortSelectDesc").addClass("isHide");
		}
		if(msg!=''){
			layer.tips(msg, '#sort-by', {
				tips: [2, '#3595CC'],
				time: 3000
			});
		}
		
		initGoods(pageNums, pageSize, orderBy, sort ,keyword,sex);
		initPageBar();
	});
	
});

function getUrlParam(name) {
	var reg = RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null){
		//return unescape(r[2]);
		return decodeURIComponent(r[2]);
	} else {
		return null;
	}
}

// 加载商品列表
function initGoods(pageNums, pageSize, orderBy, sort ,keyword,sex){	// 当前页，页容量,按什么排序，升序或降序, 关键词
	pageSize = $("#pageNumSelect").find("option:selected").val();
	
	var data={
	    "pageSize":pageSize,	// 页容量
	    "pageNums":pageNums, // 第几页
	    "orderBy":orderBy,
	    "sort":sort,
	    "minPrice":minPrice,
	    "maxPrice":maxPrice,
	    "keyword": keyword,
	    "goodFit":sex
	};
	$.ajax({
		url : baseURL+"/shop/getShopList", // 请求地址
		type : "post", // 请求的类型，可选post、get等
		dataType : "json" ,// 返回的类型，可选xml、json、script 或 html
		data : data, // 请求的数据,规定连同请求发送到服务器的数据 (data1)
		async : false , // 同步 因为要分页 先要获取 count总数
		success : function(data){
			//console.log(shopVm);
			if(data.code=200){
				if(shopVm.shopList!=null){
					shopVm.shopList.splice(pageSize);
				}else{
					shopVm.shopList = null;
				}
				var shopList = data.map.shopList;
				var imgs = data.map.imgs;
				count = data.map.count; // 总数
				var len = shopList.length;
				for(let i=0;i<len;i++){
					var timestamp=new Date().getTime();	//时间戳
					var keyId = shopList[i].goodId+Math.ceil(timestamp/Math.floor(Math.random()*10));
					shopList[i].keyId = keyId;
					if(imgs[shopList[i].goodId]!=null && imgs[shopList[i].goodId]!=""){
						shopList[i].imgsrc = baseURL+"/statics"+imgs[shopList[i].goodId];
					}else{
						shopList[i].imgsrc = baseURL+"/statics/img/product/24.png";
					}
				}
				
				console.log(shopList);
				shopVm.shopList = shopList;
				//shopVm.$forceUpdate();
				//console.log(shopVm);
			}else{
				layer.msg('error');
				return;
			}
		},
		error:function(){
			layer.msg("error");
		}
	});
}

// 此方法暂时不用 获取总数移步到 初始化方法中
function getShopTotal(){
	var data = {};
	$.ajax({
		url : baseURL+"/shop/getShopTotal", // 请求地址
		type : "post", // 请求的类型，可选post、get等
		dataType : "json" ,// 返回的类型，可选xml、json、script 或 html
		data : data, // 请求的数据,规定连同请求发送到服务器的数据 (data1)
		async : "true" , // 是否异步 默认为true
		success : function(data){
			if(data.code=200){
				count = data.total;
				initPageBar();// 调用分页初始化
			}else{
				layer.msg('出错啦');
			}
		}
	});
}

// 初始化分页
function initPageBar(){
	pageSize = $("#pageNumSelect").find("option:selected").val();
	var pages = Math.ceil(1.0*count/pageSize);
	
	layui.use(['laypage', 'layer'], function(){
		  var laypage = layui.laypage
		  ,layer = layui.layer;
		  
		  laypage.render({
			    elem: 'pagebar'
		    	//,skin: '#1E9FFF'
		    	,curr: 1		// 起始页
		    	,count: count
		    	,limit: pageSize
		    	,limits: [6]
			    //,pages: pages //总页数
			    ,first: pageNums	// 起始页
			    ,last: pages	// 最后页
			    ,prev: '<em> ← </em>'
			    ,next: '<em> → </em>'
			    ,layout: ['prev', 'page', 'next','limit','count','refresh','skip'],
			    jump: function (e, first) { //触发分页后的回调
                    if (!first) { //一定要加此判断，否则初始时会无限刷新
                        initGoods(e.curr, e.limit, orderBy, sort,keyword,sex);
                        window.scrollTo(0, 0);
                    }
                }
		  });
		  
	});
}

// 初始化价格滑块
function initPriceArea(){
	layui.use('slider', function(){
	  var slider = layui.slider;
	  //渲染
	  slider.render({
	    elem: '#price-range',  //绑定元素
	    max: 3000,
	    range:true,
	    value: [minPrice,maxPrice],
	    change: function(value){
	    	minPrice = value[0];
	    	maxPrice = value[1];
	    	//layer.msg(max);
	    	var msg = '价格区间: ￥'+minPrice+' -- ￥'+maxPrice+' ';
	    	layer.tips(msg, '#price-range', {
	    		 tips: [4, '#3595CC'],
	    		 time: 3000
	    	});
	    	return;
	    }
	  });
	});
}

function initShopByPrice(){
	initGoods(pageNums, pageSize, orderBy, sort, keyword,sex);
	initPageBar();
}

// 品牌分类
function initBrandArea(){
	$.ajax({
		url : baseURL+"/shop/getBrandList", // 请求地址
		type : "post", // 请求的类型，可选post、get等
		dataType : "json" ,// 返回的类型，可选xml、json、script 或 html
		data : {}, // 请求的数据,规定连同请求发送到服务器的数据 (data1)
		async : "true" , // 是否异步 默认为true
		success : function(data){
			if(data.code=200){
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