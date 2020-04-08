$(document).ready(function(){
	const baseURL = $("#baseURL").val();
	var isReg = false;// 不能注册
	
	var signUpButton = document.getElementById('signUp');
	var signInButton = document.getElementById('signIn');
	var container = document.getElementById('container');
	
	signUpButton.addEventListener('click', () => {
	    container.classList.add("right-panel-active");
	});

	signInButton.addEventListener('click', () => {
	    container.classList.remove("right-panel-active");
	});
	
	$("#userReg").blur(function(){
		var tmp_user = $("#userReg").val();
		// 判断用户名是否存在
		var data = {"userName": tmp_user};
		$.ajax({
			url : baseURL+"/login/isExist", // 请求地址
			type : "post", // 请求的类型，可选post、get等
			dataType : "json" ,// 返回的类型，可选xml、json、script 或 html
			data : data, // 请求的数据,规定连同请求发送到服务器的数据 (data1)
			async : "true" , // 是否异步 默认为true
			success : function(data){ // 请求成功时的回调函数	(data2)
				if(data.code==200){
					var count = data.count;
					if(count>=1){
						// 用户名已存在
						isReg = false;
						layer.tips('用户名已存在喔', '#userReg', {
							  tips: [2, 'red']
						});
						$("#userReg").addClass("errorInput");
						return;
					}else{
						// 用户名不存在
						isReg = true;
						layer.tips('恭喜你，用户名可用', '#userReg', {
							  tips: [2, '#78BA32']
						});
						$("#userReg").removeClass("errorInput");
					}
				}else{
					alert("error");
				}
			},
		});
	});
	
	// 注册
	$("#btnReg").click(function(){
		$("#psdReg").removeClass("errorInput");
		$("#repsdReg").removeClass("errorInput");
		$("#userReg").removeClass("errorInput");
		
		var userReg = $("#userReg").val();
		var psdReg = $("#psdReg").val();
		var repsdReg = $("#repsdReg").val();
		
		if(userReg == "" || userReg==null){
			layer.tips('用户名不能为空哦~', '#userReg', {
				  tips: [2, 'red']
			});
			$("#userReg").addClass("errorInput");
			$("#userReg").focus();
			return;
		}
		
		if(psdReg == "" || psdReg==null){
			layer.tips('密码不能为空哦~', '#psdReg', {
				  tips: [2, 'red']
			});
			$("#psdReg").addClass("errorInput");
			$("#psdReg").focus();
			return;
		}
		
		if(psdReg.length<6){
			layer.tips('密码长度要大于6哦~', '#psdReg', {
				  tips: [2, 'red']
			});
			$("#psdReg").addClass("errorInput");
			$("#psdReg").focus();
			return;
		}
		
		if(repsdReg == "" || repsdReg==null){
			layer.tips('确认密码不能为空哦~', '#repsdReg', {
				  tips: [2, 'red']
			});
			$("#repsdReg").addClass("errorInput");
			$("#repsdReg").focus();
			return;
		}
		
		if(psdReg != repsdReg){
			layer.msg('两次密码输入不一致喔', function(){
				$("#psdReg").addClass("errorInput");
				$("#repsdReg").addClass("errorInput");
				$("#psdLogin").focus();
			});
			return;
		}
		
		if(!isReg){
			layer.tips('请检查输入的内容', '#regform', {
				  tips: [2, 'red']
			});
			return;
		}
		
		psdReg = hex_md5(encodeURIComponent(psdReg));
		var data = {
			'userName':userReg,
			'passWord' :psdReg,
		}
		
		$.ajax({
			url : baseURL+"/login/reg", // 请求地址
			type : "post", // 请求的类型，可选post、get等
			dataType : "json" ,// 返回的类型，可选xml、json、script 或 html
			data : data, // 请求的数据,规定连同请求发送到服务器的数据 (data1)
			async : "true" , // 是否异步 默认为true
			success : function(data){ // 请求成功时的回调函数	(data2)
				layer.alert('注册成功，马上为您转到登录页面···', {title:'恭喜',icon :1,time:1500,anim:4,closeBtn: 0},
					function(index){
				        layer.close(index);
				}); 
				container.classList.remove("right-panel-active"); // 切换到登录块
			},
		});
		
	});
	
	$("#psdReg").change(function(){
		if($("#psdReg").val().length>0){
			$("#psdReg").removeClass("errorInput");
		}
	});
	
	// 登录
	$("#btnLogin").bind('click', function(){
	//$("#btnLogin").click(function(){
		$("#userLogin").removeClass("errorInput");
		$("#psdLogin").removeClass("errorInput");
		
		var user = $("#userLogin").val();
		var psd = $("#psdLogin").val();
		
		if(user == "" || user == null){
			layer.tips('用户名不能为空~', '#userLogin', {
				  tips: [4, 'red']
			});
			$("#userLogin").addClass("errorInput");
			$("#userLogin").focus();
			return;
		}else{
			if(psd == "" || psd == null){
				layer.tips('密码不能为空哦~', '#psdLogin', {
					  tips: [4, 'red']
				});
				$("#psdLogin").addClass("errorInput");
				$("#psdLogin").focus();
				return false;
			}
		}
		var datas = {
			'userName':user,
			'passWord' :psd,
		}
		$.ajax({
			url : baseURL+"/login/login", // 请求地址
			type : "post", // 请求的类型，可选post、get等
			dataType : "json" ,// 返回的类型，可选xml、json、script 或 html
			data : datas, 
			async : "false" , 
			success : function(data){
				if(data.code=="200"){// 返回成功
					var user = null;
					try{
						user = data.map.userInfo;
					}catch(Exception){
						$("#userLogin").addClass("errorInput");
						$("#psdLogin").addClass("errorInput");
						$("#psdLogin").val("");
						layer.msg('账号或密码错误，请重试···', function(){
						});
						return;
					};
					
					if(user != null){// 同时查到了数据
						var flag = false;
						// 获取当前时间戳
						var timestamp=new Date().getTime();
						data.map.userInfo.timestamp=timestamp;
						// 判断user是否存在于缓存中
						if(localStorage.getItem(data.map.userInfo.userId)){// 如果这个id存在于缓存中
							if(localStorage.getItem(data.map.userInfo.userId).userName = data.map.userInfo.userName){
								flag = true;
								// 更新时间戳,更新用户信息
								localStorage.removeItem(data.map.userInfo.userId);
								localStorage.setItem(data.map.userInfo.userId, JSON.stringify(data.map.userInfo));
								localStorage.setItem("user", data.map.userInfo.userId); // 存放信息 免登录
								// 放入用户收藏夹信息
								localStorage.setItem("favs", data.map.favList);
							}
						}else{
							// 把userInfo放入到缓存中 Html5
							localStorage.setItem(data.map.userInfo.userId, JSON.stringify(data.map.userInfo));
							localStorage.setItem("user", data.map.userInfo.userId); 
							// 放入用户收藏夹列表
							localStorage.setItem("favs", data.map.favList);
						}
						//sessionStorage.userId = data.userInfo.userId;// 用于验证这次是谁登录
						// 跳转页面
						window.location.href=baseURL + '/index.html';
						// 在header中更改样式 在index中更改
					}else{
						// 请先登录
						layer.msg('账号或密码错误，请重试···', function(){
							$("#userLogin").addClass("errorInput");
							$("#psdLogin").addClass("errorInput");
							$("#psdLogin").val("");
							layer.tips('请检查用户名或密码哟', '#psdLogin', {
								  tips: [4, 'red']
							});
						});
						
						$("#userLogin").focus(function(){
							$("#userLogin").removeClass("errorInput");
							$("#psdLogin").removeClass("errorInput");
						});
						
						$("#psdLogin").focus(function(){
							$("#userLogin").removeClass("errorInput");
							$("#psdLogin").removeClass("errorInput");
						});
						
					}
				}
			},
		});
	});
	
});

// 回车事件
$(document).keydown(function(event){
	if(event.keyCode==13){
		$("#btnLogin").click();
	}
});
