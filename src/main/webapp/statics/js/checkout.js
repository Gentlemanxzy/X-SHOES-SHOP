var baseURL = $("#baseURL").val();
var userId = localStorage.getItem("user");


$(document).ready(function(){
	initBrandArea();
	if(userId){
		
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
