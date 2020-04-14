var baseURL = $("#baseURL").val();
var userId = localStorage.getItem("user");

$(document).ready(function(){
	
	if(userId){
		var userArr = JSON.parse(localStorage.getItem(localStorage.user));
		layui.use(['form','laydate','upload'], function(){
			  var form = layui.form	//只有执行了这一步，部分表单元素才会自动修饰成功
			  ,laydate = layui.laydate
			  ,upload = layui.upload;
			  
			  var myDate = new Date();
			  laydate.render({
			    elem: '#date'
				,theme: '#faa70e'
				,max: myDate.toLocaleString()
				,value: '2012-12-21'
			  });
			  
			  form.val('userInfo', {
			      "userName": userArr.userName // "name": "value"
			      ,"phoneNum": userArr.phoneNum
			      ,"email": userArr.email
			      ,"birthday": userArr.birthday 
			      ,"qqNum": userArr.qqNum 
			      ,"weiboNum": userArr.weiboNum
			      ,"userArea": userArr.userArea
			      ,"sex": userArr.sex
			      ,"motto": userArr.motto
			    });
			  //但是，如果你的HTML是动态生成的，自动渲染就会失效
			  //因此你需要在相应的地方，执行下述方法来进行渲染
			  form.render();
			  
			  var userName = userArr.userName;
			  $("#userName").text(userName);
			  if(userArr.motto!=null && userArr.motto!=''){
				  $("#motto").text(userArr.motto);
			  }else{
				  $("#motto").text('帅气的人不需要个性签名也很帅气');
			  }
			  $("#jifen").text('累计积分：'+userArr.userBonus);
			  
			  //监听提交
			  form.on('submit(save)', function(data){
				  
			    var userInfo = data.field;
			    userInfo.userId = userId;
			    var user = JSON.stringify(userInfo);
			    $.ajax({
			    	url:baseURL+"/user/updateUserInfo",
			    	data: {
			    		userId: userId,
			    		str:user
			    	},
					type : "post", // 请求的类型，可选post、get等
					dataType : "json" ,
					async : "true",
					success : function(data){
						if(data.code==200){
							// 操作成功
							// 修改localStorage
							localStorage.setItem(userId, JSON.stringify(userInfo));
							
							layer.msg(data.msg);
						}else{
							layer.msg(data.msg);
						}
					}
			    });
			    
			    return false;
			  });
		});
		
		
		// 获取收货地址列表
		getShopArea(userId);
		
	}else{
		layer.msg('您还未登录,请先登录XSS', {
			  time: 0 //不自动关闭
			  ,title: '请先登录'
			  ,btn: ['好啊(你没得选)']
			  ,yes: function(index){
			    layer.close(index);
			    window.location.href=baseURL + '/login.html';
			  },
			  cancel: function () {
				  layer.close(index);
				  window.location.href=baseURL + '/login.html';
	        }
		});
	}
});

var addrVm = new Vue({
	el: '#areaList',
	data: {
		areaList: null
	},
});

function updateList(){
	getShopArea(userId);
}

// 新增收货地址
$("#addShopAdd").click(function(){
	layer.open({
	  title: '新增收货地址'
	  ,type: 2
	  ,area: ['600px', '650px']
	  ,fixed: false //不固定
	  //,maxmin: true
	  ,content: baseURL+'/updateAddr.html?userId='+userId+"&status=1"	// 1是新增 2是修改
	  ,success: function(layero, index){
		  var body = layer.getChildFrame('body', index);//获取子页面内容
		  var iframeWin = window[layero.find('iframe')[0]['name']];
	  }
	});
});

var getShopArea = function(userId){
	$.ajax({
		url:baseURL+"/user/getShopArea",
		type : "post", // 请求的类型，可选post、get等
		dataType : "json" ,// 返回的类型，可选xml、json、script 或 html
		data : {
			userId:userId
		}, // 请求的数据,规定连同请求发送到服务器的数据 (data1)
		async : true , // 同步 因为要分页 先要获取 count总数
		success:function(data){
			if(data.code==200){
				var list = data.shopAddressList;
				addrVm.areaList = list;
			}
		}
	});
}

function delAddr(addId){
	layer.confirm('确定要删除？', {
	  btn: ['YES','NO'] //按钮
	}, function(){
		$.ajax({
			url:baseURL+"/user/delAddr",
			type : "post", // 请求的类型，可选post、get等
			dataType : "json" ,// 返回的类型，可选xml、json、script 或 html
			data : {
				addId:addId
			}, 
			async : true , 
			success:function(data){
				if(data.code==200){
					getShopArea(userId);
					layer.msg(data.msg);
				}
			}
		});
	}, function(){	});
}

function updateAddr(addId){
	layer.open({
	  title: '修改收货地址'
	  ,type: 2
	  ,area: ['600px', '650px']
	  ,fixed: false //不固定
	  //,maxmin: true
	  ,content: baseURL+'/updateAddr.html?userId='+userId+"&status=2"+"&addId="+addId	// 1是新增 2是修改
	  ,success: function(layero, index){
		  var body = layer.getChildFrame('body', index);//获取子页面内容
		  var iframeWin = window[layero.find('iframe')[0]['name']];
	  }
	});
}
