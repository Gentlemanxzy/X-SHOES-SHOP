var baseURL = "";
var goodId = '';
var vm = null;
var userId = '';

$(document).ready(function(){
	baseURL = $("#baseURL").val();
	// url参数
	goodId = getUrlParam("goodId");
	
	if (localStorage.user){ // 判断是否登录
		userId = localStorage.getItem("user");
		// 新增浏览记录
		if(goodId){
			addViewHis(userId,goodId);
		}
	}
	
	getFavs();
	if(goodId!=null){
		initGoodInfo(goodId);
		initGoodImgs(goodId);
	}else{
		layer.msg("商品id为空，出错咯");
	}
	
});
// 获取收藏的商品
function getFavs(){
	if (localStorage.user){
		// 如果缓存中有用户信息
		var userArr = JSON.parse(localStorage.getItem(localStorage.user));
		userId = userArr.userId;
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

var addViewHis = function(userId,goodId){
	$.ajax({
		url : baseURL+"/shop/addViewHis", // 请求地址
		type : "post", // 请求的类型，可选post、get等
		dataType : "json" ,// 返回的类型，可选xml、json、script 或 html
		data : {
			userId: userId,
			goodId:goodId
		},
		async : true, 
		success : function(data){
			//if(data.code=="200"){}
		}
	});
}

// 获取url参数的js方法
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

// 修改合计价格
function modifyprice(nums){
	//layer.msg(nums);
	let goodPrice = $("#goodPrice").text();
	goodPrice = goodPrice.substring(1);
	$("#totPrice").text(nums * goodPrice);
}

// 初始化商品信息
function initGoodInfo(goodId){
	$.ajax({
		url:baseURL+"/shop/getGoodInfo",
		type:"post",
		dataType:"json",
		data:{
			goodId:goodId,
		},
		async: true,
		success:function(data){
			//console.log(data);
			let sizes = data.goodInfo.goodSize;
			let sizeArr = sizes.split('/');
			data.goodInfo.goodSize = sizeArr;
			if(data.code=="200"){
				
				let favs = localStorage.getItem("favs");
				if(favs==null){
					favs='';
				}
				
				if(favs.indexOf(data.goodInfo.goodId)!=-1){
					data.goodInfo.fav = '1';
				}else{
					data.goodInfo.fav = '0';
				}
				
				vm = new Vue({
					el: "#good_info",
					data: {
						good: data.goodInfo
					},
					mounted(){
						$("#gooddesc").text(data.goodInfo.goodDescription);
						$("#shopName_").text(" / "+data.goodInfo.goodName);
					}
				});
				//vm.good = data.goodInfo;
			}
		}
	});
}

function initGoodImgs(goodId){
	$.ajax({
		url:baseURL+"/shop/initGoodImgs",
		type:"post",
		dataType:"json",
		data:{
			goodId:goodId,
		},
		async: true,
		success:function(data){
			if(data.code=="200"){
				let imgs = data.goodImg;
				if(imgs!=null){
					for (let i=0;i<imgs.length;i++){
						imgs[i].imgSrc = '/xss/statics'+imgs[i].imgSrc
					}
				}
				var vm2 = new Vue({
					el: "#good_img",
					data: {
						imgs: imgs
					},
					mounted(){
						initOptimaZoom();  //插件程序，放在mounted中
						initOwlCrousel();
						initSumAdd();
					}
				});
			}
		}
	});
}

//点击小心心❤
function likeOrHeat(e,goodId){
	//console.log(e.target);
	// 有可能点到 a 标签 有可能点到 i 标签 这里我们需要的是a标签
	let dom = e.target;
	if(dom.localName=="i"){
		dom = dom.parentNode;
	}else if(dom.localName=="a"){
		//dom = dom.firstElementChild;
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
					
					if(dom.className.indexOf("isFavIcon")!=-1){
						let flag = favNumController(userId,goodId,-1);
						if(flag=="1"){
							dom.classList.value="";
							layer.msg("已取消此心愿😫");
						}else{
							layer.msg("sorry，遇到了点小毛病");
						}
						//layer.msg("mark，Mark，MARK❤");
					}else if(dom.className.indexOf("isFavIcon")==-1){
						let flag = favNumController(userId,goodId,1);
						if(flag=="1"){
							dom.classList.value="isFavIcon";
							layer.msg("mark，Mark，MARK❤");
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

// 加入购物车
function addCartBtn(){
//$("#addCartBtn").click(function(){
	var color = $("#select-1").find("option:selected").val();
	var size =  $("#select-2").find("option:selected").val();
	var nums = $("#qtyinput").val();
	var total = $("#totPrice").text();
	
	if(color==""){
		layer.msg("请选择颜色");
		return;
	}else if(size == ''){
		layer.msg("请选择尺码");
		return;
	}else if(nums<=0){
		layer.msg("请至少选择一双");
		return;
	}else{
		$.ajax({
			url:baseURL+"/cars/addToCar",
			type:"post",
			dataType:"json",
			data:{
				userId: userId,
				goodId: goodId,
				goodSize: size,
				goodNums: nums,
				goodTotalPrice: total,
				goodColor: color
			},
			async: true,
			success:function(data){
				if(data.code == '200'){
					layer.closeAll();
					layer.msg("添加购物车成功");
					//var index = parent.layer.getFrameIndex(window.name);
					//parent.layer.close(index);
				}
			}
		});
	}
};

// 放大镜初始化
function initOptimaZoom(){
	$("#optima_zoom").elevateZoom({gallery:'optima_gallery', cursor: 'pointer', galleryActiveClass: "active", imageCrossfade: true, loadingIcon: ""});

    $("#optima_zoom").bind("click", function(e) {
        var ez =   $('#optima_zoom').data('elevateZoom');
        ez.closeAll(); //NEW: This function force hides the lens, tint and window
        $.fancybox(ez.getGalleryList());
        return false;
    });
}
// 滑块初始化
function initOwlCrousel(){
  $(".product-slider").owlCarousel({
	  autoPlay: false,
	  slideSpeed:2000,
	  pagination:false,
	  navigation:false,
	  items : 3,
	  itemsDesktop : [1199,3],
	  itemsDesktopSmall : [980,3],
	  itemsTablet: [768,2],
	  itemsMobile : [479,1],
  });
  $(".product-page-slider").owlCarousel({
      autoPlay: false,
      slideSpeed:2000,
      pagination:false,
      navigation:true,
      items : 3,
      itemsDesktop : [1199,3],
      itemsDesktopSmall : [980,3],
      itemsTablet: [768,2],
      itemsMobile : [479,1],
  });
}
// 数量控制按钮初始化
function initSumAdd(){
    $(".cart-plus-minus").append('<div class="dec qtybutton"><</div><div class="inc qtybutton">></div>');
    $(".qtybutton").on("click", function() {
        var $button = $(this);
        var oldValue = $button.parent().find("input").val();
        if ($button.text() == ">") {
            var newVal = parseFloat(oldValue) + 1;
            modifyprice(newVal);		// 更新价格数据
        } else {
            // Don't allow decrementing below zero
            if (oldValue > 0) {
                var newVal = parseFloat(oldValue) - 1;
                modifyprice(newVal);
            } else {
                newVal = 0;
            }
        }
        $button.parent().find("input").val(newVal);
    });
}

// 切换大图方法
function changeImg(data){
	$("#optima_zoom").attr("src",data);
	$("#optima_zoom").attr("data-zoom-image",data);
	var ez =   $('#optima_zoom').data('elevateZoom');
	$(".zoomWindowContainer").css("background-image","url:("+data+")");
    //ez.closeAll();
	//ez=new Object();
    ez.imageSrc = data;
    ez.zoomImage = data;
    //$("#optima_zoom").refresh();
	$("#optima_zoom").elevateZoom({gallery:'optima_gallery', cursor: 'pointer', galleryActiveClass: "active", imageCrossfade: true, loadingIcon: ""},
			data);
	//initOptimaZoom();
}