var baseURL = $("#baseURL").val();

$(document).ready(function(){
	//getMap();
	
	layui.use(['form','upload'], function(){
	  var form = layui.form	
	  ,upload = layui.upload;
	  
	  form.render();
	  form.on('submit(commentSub)', function(data){
	  var info = data.field;
	  console.log(info);
	  var str = JSON.stringify(info);
	  
	  $.ajax({
		 url : baseURL + "/user/commitComment",
		 data: info,
		 type : "post", // 请求的类型，可选post、get等
		 dataType : "json" ,
		 async : "true",
		 success:function(data){
			 if(data.code == 200){
				 layer.msg(data.msg);
			 }else{
				 layer.msg(data.msg+",请重试");
			 }
		 }
		  
	  });
	  });
	});
});

function loadJScript() {
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.src = "//api.map.baidu.com/api?v=2.0&ak=9evOkP5FFlUQdwhWWeidAX9nAd5QoDSq&callback=init";
	document.body.appendChild(script);
}
function init() {
	var map = new BMap.Map("baiduMap");            // 创建Map实例
	var point = new BMap.Point(121.560634, 29.876); // 创建点坐标
	//map.centerAndZoom(point,15); 
	map.centerAndZoom("宁波天一广场",17);
	map.addControl(new BMap.NavigationControl());  //添加默认缩放平移控件
	map.addControl(new BMap.OverviewMapControl()); //添加默认缩略地图控件
	map.addControl(new BMap.OverviewMapControl({ isOpen: true, anchor: BMAP_ANCHOR_BOTTOM_RIGHT }));   //右下角，打开
	map.enableScrollWheelZoom();    //启用滚轮放大缩小，默认禁用
	map.enableContinuousZoom();    //启用地图惯性拖拽，默认禁用
	var marker = new BMap.Marker(point);  // 创建标注
	map.addOverlay(marker);               // 将标注添加到地图中
	marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
	map.enableScrollWheelZoom();                 //启用滚轮放大缩小
}  
window.onload = loadJScript;
