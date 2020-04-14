var baseURL = $("#baseURL").val();
var userId = localStorage.getItem("user");
var blogVM  = new Vue({
	el:'#blog-area',
	data: {
		article:null,
		comList:null,
		commentNum:0
	},
});
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
	var articleId = getUrlParam("articleId");
	if(articleId==null || articleId == ''){
		window.location.href = baseURL + '/error/404.html';
	}else{
		initBrandArea();
		getBlogDetail(articleId);
		//getComment(articleId);
	}
	
});

// 写入getBlogDetail中
function getComment(articleId){
	$.ajax({
		url : baseURL + "/blog/getComment",
		type : "post",
		dataType:"json",
		data:{
			articleId : articleId
		},
		success: function(data){
			if(data.code == '200'){
				if(data.list.length<=0){
					console.log("暂无评论");
				}else{
					blogVM.comList = data.list;
				}
			}
		}
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

function getUrlParam(name) {
	var reg = RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null){
		return decodeURIComponent(r[2]);
	} else {
		return null;
	}
}

function getBlogDetail(articleId){
	$.ajax({
		url:baseURL+"/blog/getBlogDetail",
		data:{
			articleId:articleId
		},
		type : "post", // 请求的类型，可选post、get等
		async:"true",
		success : function(data){
			if(data.code==200){
				blogVM.article = data.data;
				for(let i=0;i<data.list.length;i++){
					data.list[i].createTime = timestampToTime(data.list[i].createTime);
					data.list[i].userName_Head = data.list[i].userName.substring(0,1).toUpperCase();
				}
				// 评论列表
				blogVM.comList = data.list;
				// 评论数目
				blogVM.commentNum = data.list.length;
				$("#article_title").text(data.articleTitle);
			}
		}
	});
}

function subMethod(articleId){
	if(userId){
		var text = $("#reply-comment").val();
		if(text!=null && text!=""){
//			var x = $("#commentForm")[0].action;
//			x = x+"?articleId="+articleId+"&userId="+userId;
//			layer.msg(x);
//			$("#commentForm")[0].action = x;
//			$("#commentForm").submit();
			submitComment(articleId,userId,text);
		}else{
			layer.msg("请先填写评论喔");
			layer.tips('在这里填写评论', '#reply-comment', {
				  tips: [1, '#78BA32']
			});
			return;
		}
	}else{
		layer.msg('您还未登录,请先登录XSS', {
			  time: 0 //不自动关闭
			  ,title: '请先登录'
			  ,btn: ['好啊','不用了']
			  ,yes: function(index){
			    layer.close(index);
			    window.location.href=baseURL + '/login.html';
			  },
			  cancel: function () {
				  layer.close(index);
	        }
		});
	}
}

function submitComment(articleId,userId,content){
	$.ajax({
		url : baseURL+"/blog/submitComment", // 请求地址
		type : "post", // 请求的类型，可选post、get等
		dataType : "json" ,// 返回的类型，可选xml、json、script 或 html
		data : {
			articleId:articleId,
			userId,userId,
			content,content
		}, // 请求的数据,规定连同请求发送到服务器的数据 (data1)
		async : "true" , // 是否异步 默认为true
		success : function(data){
			if(data.code==200){
				if(data.res == 1){
					layer.msg("感谢您的留言");
					getBlogDetail(articleId);
				}else{
					layer.msg("出错啦");
				}
			}else{
				layer.msg(data.msg);
			}
		}
	});
}

function timestampToTime(timestamp) {
    var date = new Date(timestamp );//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    Y = date.getFullYear() + '-';
    M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    D = date.getDate() + ' ';
    h = date.getHours() + ':';
    m = date.getMinutes() + ':';
    s = date.getSeconds();
    return Y+M+D+h+m+s;//时分秒可以根据自己的需求加上
}
// ***********  图片懒加载    *************
$(window).on('scroll',function(){
	lazyLoad (); //滚动页面是 调用一次   方便管理 
})
// 懒加载
function lazyLoad(){
	$('img.lazy').not('[data-isLoaded]').each(function(){
       var $node = $(this)
       if( isShow( $node) ){
           //缓冲效果 
           setTimeout(function(){
           	loadIng( $node)
           },100)
       }
    });
}
function isShow($node){
    // 当一个元素出现在我们眼前    小于 窗口高度 加上窗口滚动的高度的时候    就意味着  到达目标点 
    // 可以开始加载图片 或者其他内容
    return $node.offset().top <= $(window).height() + $(window).scrollTop()
}
function loadIng($img){
    // 获取目标元素 并替换 
    $img.attr('src', $img.attr('data-original'))
    //性能优化   进行判断   已经加载的  不会再进行加载  
    $img.attr('data-isLoaded', 1)
}
// ********** 图片懒加载结束   ***********