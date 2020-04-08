var baseURL = "";

var favs = localStorage.getItem("favs");

$(document).ready(function(){
	baseURL = $("#baseURL").val();
	
	getFavs();
	
	initShopList("goodIsNew",1);
	initShopList_Favs();// 加载主打商品列表
	
	$("#tablist1").click(function(){	// new
		let msg = $("#tablist1").attr("value");
		initShopList("goodIsNew",1); // 1 代表 new =1时
	});
	
	$("#tablist2").click(function(){	// hot
		initShopList("goodIsHot",1);
	});
	
	$("#tablist3").click(function(){	// off
		initShopList("goodIsDiscount",1);
	});
	
	$("#tablist4").click(function(){	// man
		initShopList("goodFitMan",'01');	// 01 男 04男女
	});
	
	$("#tablist5").click(function(){	// woman
		initShopList("goodFitWoman",'02');	// 02女
	});
	
	$("#tablist6").click(function(){	// b-ball
		initShopList("goodTagsBall",'篮球');	
	});
	
	$("#tablist7").click(function(){	// run
		initShopList("goodTagsRun",'跑步');	
	});
	
	$("#tablist8").click(function(){	// top尖端 根据评分
		initShopList("goodScore",8);	// >=8分
	});
	
});

function getFavs(){
	if (localStorage.user){
		// 如果缓存中有用户信息
		var userArr = JSON.parse(localStorage.getItem(localStorage.user));
		$.ajax({
			url : baseURL+"/login/getFavsAndCars", // 请求地址
			type : "post", // 请求的类型，可选post、get等
			dataType : "json" ,// 返回的类型，可选xml、json、script 或 html
			data : {
				userId: userArr.userId,
			},
			async : false, 
			success : function(data){
				if(data.code=="200"){
					localStorage.setItem("favs",data.map.favs);
				}
			}
		});
	}
}

function initShopList(param, value){
	let datas = {};
	let ele = '#tab1';
	if(param=='goodIsNew'){
		datas ={
			"goodIsNew": value
		};
		ele = '#tab1';
	}else if(param=='goodIsHot'){
		datas={
			"goodIsHot": value
		};
		ele = '#tab2';
	}else if(param=='goodScore'){
		datas = {
			"goodScore": value
		};
		ele = '#tab8';
	}else if(param == 'goodFitMan'){// man
		datas ={
			"goodFit": value
		};
		ele = '#tab4';
	}else if(param == 'goodIsDiscount'){
		datas ={
			"goodIsDiscount": value
		};
		ele = '#tab3';
	}else if(param == 'goodFitWoman'){// woman
		datas ={
			"goodFit": value
		};
		ele = '#tab5';
	}else if(param == 'goodTagsBall'){// b-ball
		datas ={
			"goodTags": value
		};
		ele = '#tab6';
	}else if(param == 'goodTagsRun'){// run
		datas ={
			"goodTags": value
		};
		ele = '#tab7';
	}
	
	var vm = new Vue({
		el: ele,
		data: {
			shopList: null
		},
	});
		
	$.ajax({
		url:baseURL+"/index/getShopList",
		type:"post",
		dataType:"json",
		data:datas,
		async: true,
		success:function(data){
			if(data.code == '200'){
				// 获取收藏数据
				let favs = localStorage.getItem("favs");
				if(favs==null){
					favs='';
				}
				
				let shopList = data.map.shopList;
				let len = shopList.length;
				let imgs = data.map.imgs;
				
				for(let i=0;i<len;i++){
					//var timestamp=new Date().getTime();	//时间戳
					//var keyId = shopList[i].goodId+Math.ceil(timestamp/Math.floor(Math.random()*10));
					//shopList[i].keyId = keyId;
					if(imgs[shopList[i].goodId]!=null && imgs[shopList[i].goodId]!=""){
						if(imgs[shopList[i].goodId][0] != null && imgs[shopList[i].goodId][0]!=""){
							shopList[i].imgsrc1 = baseURL+"/statics"+imgs[shopList[i].goodId][0];
						}
						if(imgs[shopList[i].goodId][1] != null && imgs[shopList[i].goodId][1]!=""){
							shopList[i].imgsrc2 = baseURL+"/statics"+imgs[shopList[i].goodId][1];
						}else{
							shopList[i].imgsrc2 = baseURL+"/statics"+imgs[shopList[i].goodId][0];
						}
					}else{
						shopList[i].imgsrc1 = baseURL+"/statics/img/product/24.png";
						shopList[i].imgsrc2 = baseURL+"/statics/img/product/24.png";
					}
					
					if(favs.indexOf(shopList[i].goodId)!=-1){
						shopList[i].fav = '1';
					}else{
						shopList[i].fav = '0';
					}
				}
				
				vm.shopList = shopList;
			}
		}
	});
}

// 获取主打商品列表
function initShopList_Favs(){
	
	$.ajax({
		url:baseURL+"/index/getShopListFavs",
		type:"post",
		dataType:"json",
		data:{},
		async: true,
		success:function(data){
			if(data.code == '200'){
				let shopList = data.map.list;
				// 收藏
				let favs = localStorage.getItem("favs");
				
				let len = shopList.length;
				let imgs = data.map.imgs;
				for(let i=0;i<len;i++){
					if(imgs[shopList[i].goodId]!=null && imgs[shopList[i].goodId]!=""){
						if(imgs[shopList[i].goodId][0] != null && imgs[shopList[i].goodId][0]!=""){
							shopList[i].imgsrc1 = baseURL+"/statics"+imgs[shopList[i].goodId][0];
						}
						if(imgs[shopList[i].goodId][1] != null && imgs[shopList[i].goodId][1]!=""){
							shopList[i].imgsrc2 = baseURL+"/statics"+imgs[shopList[i].goodId][1];
						}else{
							shopList[i].imgsrc2 = baseURL+"/statics"+imgs[shopList[i].goodId][0];
						}
					}else{
						shopList[i].imgsrc1 = baseURL+"/statics/img/product/24.png";
						shopList[i].imgsrc2 = baseURL+"/statics/img/product/24.png";
					}
					
					if(favs.indexOf(shopList[i].goodId)!=-1){
						shopList[i].fav = '1';
					}else{
						shopList[i].fav = '0';
					}
				}
				
				var vm2 = new Vue({
					el: '#zdShop',
					data: {
						shopList: shopList
					},
					mounted(){
						// 初始化滑块插件
						initOwlCrousel();
					}
				});
			}
		}
	});
}

function initOwlCrousel(){
	$(".feature-product-slider").owlCarousel({
	      autoPlay: false,
	      slideSpeed:2000,
	      pagination:false,
	      navigation:true,
	      items : 4,
	      itemsDesktop : [1199,4],
	      itemsDesktopSmall : [980,3],
	      itemsTablet: [768,2],
	      itemsMobile : [479,1],
	  });
}

// 点击加入购物车弹出layer框
function addToCartLayer(goodId){
	if (localStorage.user){
		var userArr = JSON.parse(localStorage.getItem(localStorage.user));
		if(userArr.length<=0){
			layer.msg('还没有登录喔，请先登录鸭', {
				  time: 0 //不自动关闭
				  ,title: '请先登录'
				  ,btn: ['好啊', '算了']
				  ,yes: function(index){
				    layer.close(index);
				    window.location.href=baseURL + '/login.html';
				  }
			});
		}else{ // 已经登录
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
		}
	}else{
		layer.msg('还没有登录喔，请先登录鸭', {
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

// 点击搜索
$("#searchBtn").click(function(){
	let keyword = $("#searchid").val();
	if(keyword==''||keyword==null){
		layer.tips('请输入关键词', '#searchid', {
			  tips: [1, '#78BA32']
		});
		
		return;
	}
	searchGoods(keyword);
});
// 搜索方法
function searchGoods(keyword){
	/*var sessionStorage = window.sessionStorage;
	sessionStorage.setItem("keyword", keyword);*/
	$("#searchForm").submit();
}

// 点击小心心❤
function likeOrHeat(e,goodId){
	//console.log(e.target);
	// 有可能点到 a 标签 有可能点到 i 标签
	let dom = e.target;
	if(dom.className!="" && dom.className!=null){
		
	}else{
		dom = dom.firstElementChild;
	}
	// 首先判断是否已经登录，没有登录返回登录页面
	if (localStorage.user){
		var userArr = JSON.parse(localStorage.getItem(localStorage.user));
		if(userArr.length<=0){
			layer.msg('还没有登录喔，请先登录鸭', {
				  time: 0 //不自动关闭
				  ,title: '请先登录'
				  ,btn: ['好啊', '算了']
				  ,yes: function(index){
				    layer.close(index);
				    window.location.href=baseURL + '/login.html';
				  }
			});
		}else{ // 已经登录
			
			let userId = localStorage.getItem("user");
			
			// 收藏或取消收藏
			likeOrHeatGoods(userId,goodId,dom);
		}
	}else{
		layer.msg('还没有登录喔，请先登录鸭', {
			  time: 0 //不自动关闭
			  ,title: '提示·请先登录XSS'
			  ,btn: ['好啊', '算了']
			  ,yes: function(index){
			    layer.close(index);
			    window.location.href=baseURL + '/login.html';
			  }
		});
	}
}

//收藏和取消收藏方法
function likeOrHeatGoods(userId,goodId,dom){
	$.ajax({
		url:baseURL+"/shop/likeOrHeatGood",
		type:"post",
		dataType:"json",
		data:{
			userId: userId,
			goodId: goodId
		},
		async: true,
		success:function(data){
			if(data.code == '200'){
				if(data.flag=='1'){
					// 操作成功
					/*if(dom.hasClass("fa-heart-o")){// 还未收藏
						dom.removeClass("fa fa-heart-o").addClass("fa fa-heart");
					}else if(dom.hasClass("fa-heart")){
						dom.removeClass("fa fa-heart").addClass("fa fa-heart-o");
					}*/
					
					if(dom.className.indexOf("fa fa-heart-o")!=-1){
						// 收藏数+1
						let flag = favNumController(userId,goodId,1);
						if(flag=="1"){
							dom.classList.value="fa fa-heart";
							layer.msg("mark，Mark，MARK❤");
						}else{
							layer.msg("sorry，遇到了点小毛病");
						}
						
					}else if(dom.className.indexOf("fa fa-heart")!=-1){
						// 收藏数-1
						let flag = favNumController(userId,goodId,-1);
						if(flag=="1"){
							dom.classList.value="fa fa-heart-o";
							layer.msg("已取消此心愿😫");
						}else{
							layer.msg("sorry，遇到了点小毛病");
						}
					}
					//layer.msg("操作成功");
					getFavs();
				}else if(data.flag=='0'){
					//操作失败
					layer.msg("操作失败");
					
				}
			}else{
				layer.msg("出错咯");
			}
		}
	});
}

function favNumController(userId,goodId,num){
	var flag = "0";
	$.ajax({
		url:baseURL+"/shop/favNumController",
		type:"post",
		dataType:"json",
		data:{
			userId: userId,
			goodId: goodId,
			num: num
		},
		async: false,
		success:function(data){
			if(data.code == '200'){
				if(data.msg=="suc"){
					flag = '1'
				}else if(data.msg=="error"){
					flag = "0";
				}else{
					flag = "0";
				}
			}
		}
	});
	return flag;
}

function linkMethod(value){
	
	switch(value) {
		case 'csdn':
			layer.open({
				title: '关注我的csdn',
				content:'<a target="_blank" href="https://blog.csdn.net/qq_37162090?t=1">点击链接关注我吧</a>',
				//area:['350px','550px']
				anim:3
			});
			break;
		case 'wechat':
			//layer.msg(value);
			layer.open({
				title: '被你发现了我的wechat',
				content:'<img src="statics/img/WeChat.jpg"></img><br><center><p>备注xss</p></center>',
				area:['350px','580px'],
				scrollbar: false
			});
			break;
		case 'weibo':
			layer.msg("微博乃害人之处，避而 远之");
			break;
		case 'github':
			layer.msg(value+",暂未开放");
			break;
		case 'ins':
			layer.msg('ins，最近墙比较严，就算了吧');
			break;
		default:
	        break;
	}
}