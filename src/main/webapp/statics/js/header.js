var baseURL = $("#baseURL").val();
var headerVm = '';
$(document).ready(function(){
	// 判断是否登录
	if (localStorage.user){
		// 如果缓存中有用户信息
		var userArr = JSON.parse(localStorage.getItem(localStorage.user));
		//console.log(userArr);
		// 比对时间戳 是否失效
		var timestampnow=new Date().getTime();
		var timestampold = userArr.timestamp;
		
		if(timestampnow-timestampold >= 604800000){
			// 登录过期
			$("#loginArea").show();
			$("#loginArea-login").hide();
			$("#cart-menu").hide();
			$("#account-menu-login").hide();
			$("#account-menu-nologin").show();
			localStorage.removeItem(userArr.userId);
			localStorage.removeItem("user");
			// 移除收藏信息
			localStorage.removeItem("favs");
			localStorage.removeItem("cart");
			
			layer.msg('登录过期(哭唧唧)，是否重新登录？', {
				  time: 0 //不自动关闭
				  ,title: 'Xss-登录过期'
				  ,btn: ['必须啊', '不必了']
				  ,yes: function(index){
				    layer.close(index);
				    window.location.href=baseURL + '/login.html';
				  },
				  end:function(index){
					  layer.close(index);
					  location.reload();
				  }
			});
			
		}else{
			// 自动登录
			// 同时更新localStorage里的 收藏夹信息和购物车信息
			$.ajax({
				url : baseURL+"/login/getFavsAndCars", // 请求地址
				type : "post", // 请求的类型，可选post、get等
				dataType : "json" ,// 返回的类型，可选xml、json、script 或 html
				data : {
					userId: userArr.userId,
				},
				async : "true" , 
				success : function(data){
					//debugger;
					if(data.code=="200"){
						localStorage.setItem("favs",data.map.favs);
						localStorage.setItem("cart",JSON.stringify(data.map.cart));
						var cartList = data.map.cart;
						var imgs = data.map.cartImg;
						var len = cartList.length;
						$("#cartNum").text(len);
						if(len>5){
							len = 5;
							//var cartList2 = null;
							cartList = cartList.slice(0,5);
						}
						for(let i=0;i<len;i++){
							
							if(imgs[cartList[i].goodId]!=null && imgs[cartList[i].goodId]!=""){
								cartList[i].imgsrc = baseURL+"/statics"+imgs[cartList[i].goodId];
							}else{
								cartList[i].imgsrc = baseURL+"/statics/img/product/24.png";
							}
						}
						// 初始化右上角购物车信息
						headerVm = new Vue({
							el: '#cartList',
							data: {
								cartList: cartList
							}
						});
					}
				}
			});
			
			$("#loginArea").hide();
			$("#loginArea-login").show();
			$("#cart-menu").show();
			$("#account-menu-login").show();
			$("#account-menu-nologin").hide();
			console.log(userArr.userName);
			//$("#user_name").val(userArr.userName);// = "<strong>"+userArr.userName+"</strong>";
			$("#user_name").html("<strong>"+userArr.userName+"</strong>");
			
			if(userArr.isVip == 1){
				$("#vipTrue").show();
			}else{
				$("#vipTrue").hide();
			}
		}
	}else{
		// 如果没有缓存 说明没有登录
		$("#loginArea").show();
		$("#loginArea-login").hide();
		$("#cart-menu").hide();
		$("#account-menu-login").hide();
		$("#account-menu-nologin").show();
		$("#vipTrue").hide();
	}

	$("#searchid").focus(function() {
		$(this).animate({
			"width" : "80%",
		},800);
	}).blur(function() {
		$(this).animate({
			"width" : "50%",
		},800);
	});
	
	$("#logout").click(function(){
		layer.open({
		  content: '确定要退出Xss吗？'
		  ,title: '退出XSS'
		  ,btn: ['狠心离开', '我再想想']
		  ,yes: function(index, layero){
			  //按钮【按钮一】的回调
			  // 删除缓存登录信息
			  var userid = localStorage.getItem("user");
			  localStorage.removeItem(userid);
			  localStorage.removeItem("user");
			  // 移除收藏信息
			  localStorage.removeItem("favs");
			  // 移除购物车信息
			  localStorage.removeItem("cart");
			  window.location.reload();
		  }
		  ,btn2: function(index, layero){
		    //按钮【按钮二】的回调
			  layer.close(index);
		    //return false 开启该代码可禁止点击该按钮关闭
		  }
		  ,cancel: function(){ }
		});
	});
	
	$(".menuItem").click(function(){
		var sex = "";
		var key = $(this).text().trim();
		key = key.replace(" ",'');
		if(key.indexOf("男")!=-1){
			sex = '01';
			key = '';
		}else if(key.indexOf("女")!=-1){
			sex = '02';
			key = '';
		}else if(key.indexOf("儿童")!=-1){
			sex = '03';
			key = '';
		}else if(key.indexOf("不限")!=-1){
			sex = '04';
			key = '';
		}
		window.location.href = baseURL+"/shop.html?keyword="+key+"&sex="+sex;
	});
	
	$(".menuItemMan").click(function(){
		var sex = '01';
		var key = $(this).text().trim();
		key = key.replace(" ",'');
		window.location.href = baseURL+"/shop.html?keyword="+key+"&sex="+sex;
	});
	
	$(".menuItemWoman").click(function(){
		var sex = '02';
		var key = $(this).text().trim();
		key = key.replace(" ",'');
		window.location.href = baseURL+"/shop.html?keyword="+key+"&sex="+sex;
	});
	
});	
