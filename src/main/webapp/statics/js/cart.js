var baseURL = $("#baseURL").val();
var tableData = [];
var checkedData_ = [];
var addId_check = '';// 记录哪个收货地址被选中
var table = null;
var total_price = 0;
var discount;// 默认为1 不打折 8折为0.8
var addrVm = new Vue({
	el: '#areaList',
	data: {
		areaList: null
	},
});
var userId = localStorage.getItem("user");

$(document).ready(function(){
	discount = 1;
	baseURL = $("#baseURL").val();
	$("#delsBtn").hide();
	// 判断是否登录
	userId = localStorage.getItem("user");
	if(userId){
		// 已经登录
		getTableData(userId);
		getShopArea(userId);
	}else{
		// 未登录
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
	
	layui.use(['laypage','table'], function(){
		table = layui.table,
		laypage = layui.laypage,
		$ = layui.$;
		
		table.render({
		    elem: '#cartTable'
		    //,height: 820
		    //,url: '/demo/table/user/' //数据接口
		    ,title: '购物车'
		    ,page: true //开启分页
		    //,toolbar: 'default' //开启工具栏，此处显示默认图标，可以自定义模板，详见文档
		    ,totalRow: true //开启合计行
		    ,limits:[5,10,15]
		    ,cols: [[ //表头
		      {type: 'checkbox'}
		      //,{field: 'id', title: 'ID', width:80, sort: true, fixed: 'left', totalRowText: '合计：'}
		      ,{field: 'No', title: '序号', width:60 ,align:'center'}
		      ,{field: 'imgsrc', title: '图片', width:135,
		    	  templet:'<div><center><img src="{{ d.imgsrc}}"></center></div>'}
		      ,{field: 'goodName', title: '名称', width: 210, sort: true}
		      ,{field: 'goodSize', title: '尺码', width: 75,align:'center'}
		      ,{field: 'goodColor', title: '颜色', width: 130,align:'center'}
		      ,{field: 'goodPrice', title: '单价', width:80, sort: true}
		      ,{field: 'goodNums', title: '数量', width: 70, totalRow: true, edit: 'text',align:'center'}
		      ,{field: 'discountNum', title: '折扣', width:70} 
		      ,{field: 'goodTotalPrice', title: '总价', width: 100 , totalRow: true, sort: true}
		      ,{title:'操作', width: 150, align:'center', toolbar: '#barDemo'}
		      ,{field: 'createTime', title: '加购时间', width: 110}
		    ]],
		    data: tableData
		  });
		
		table.on('edit(cartTable)', function(obj){
			//console.log(obj);
		    var value = obj.value //得到修改后的值
		    ,data = obj.data //得到所在行所有键值
		    ,field = obj.field; //得到字段
		    data.goodTotalPrice = data.goodPrice*value;
		    updateGoodInfo(data,userId);
		    //layer.msg(field + ' 字段更改为：'+ value);
		    obj.update(data);
		});
		
		// 复选框
		table.on('checkbox(cartTable)', function(obj){
			var checkStatus = table.checkStatus('cartTable');
			var data = checkStatus.data;
			checkedData_ = data;
			if(checkedData_.length == 0){
				$("#delsBtn").hide();
			}else{
				$("#delsBtn").show();
			}
			console.log(data);
			
			let total_price_1 = 0;
			for(let i=0;i<data.length;i++){
				total_price_1+=data[i].goodTotalPrice;
			}
			let discount_1 = discount;
			total_price = total_price_1;
			$("#total-price-1").text(total_price_1.toFixed(2));
			$("#total-price-2").text((total_price_1*discount_1).toFixed(2));
			
		});
		
		//监听工具条
	  table.on('tool(cartTable)', function(obj){
	    var data = obj.data;
	    // 查看
	    if(obj.event === 'detail'){
	      //layer.msg('No：'+ data.No + ' 的查看操作');
	      window.location.href = baseURL + "/single-product.html?goodId="+data.goodId;
	    } else if(obj.event === 'del'){// 删除
	      layer.confirm('确定移除此商品吗？', function(index){
	    	  delCarGood(data,userId);
	          obj.del();
	          layer.close(index);
	      });
	    } else if(obj.event === 'edit'){// 编辑
	    	//layer.alert('编辑行：<br>'+ JSON.stringify(data));
	    	layer.open({
				  title: '商品信息修改'
				  ,type: 2
				  ,area: ['350px', '535px']
				  ,fixed: false //不固定
				  //,maxmin: true
				  ,content: baseURL+'/modifyCarGood.html?goodId='+data.goodId
				    +'&goodColor='+data.goodColor+'&goodSize='+data.goodSize+'&goodNums='+data.goodNums
				  	+'&goodPrice='+data.goodPrice+'&discountNum='+data.discountNum
				  ,success: function(layero, index){
					  var body = layer.getChildFrame('body', index);//获取子页面内容
					  var iframeWin = window[layero.find('iframe')[0]['name']];
				  },
				  end: function(){
					  getTableData(userId);
					 table.render({
					    elem: '#cartTable'
					    ,title: '购物车'
					    ,page: true //开启分页
					    ,totalRow: true //开启合计行
					    ,limits:[5,10,15]
					    ,cols: [[ //表头
					      {type: 'checkbox'}
					      ,{field: 'No', title: '序号', width:60 ,align:'center'}
					      ,{field: 'imgsrc', title: '图片', width:135,
					    	  templet:'<div><center><img src="{{ d.imgsrc}}"></center></div>'}
					      ,{field: 'goodName', title: '名称', width: 210, sort: true}
					      ,{field: 'goodSize', title: '尺码', width: 75,align:'center'}
					      ,{field: 'goodColor', title: '颜色', width: 130,align:'center'}
					      ,{field: 'goodPrice', title: '单价', width:80, sort: true}
					      ,{field: 'goodNums', title: '数量', width: 70, totalRow: true, edit: 'text',align:'center'}
					      ,{field: 'discountNum', title: '折扣', width:70} 
					      ,{field: 'goodTotalPrice', title: '总价', width: 100 , totalRow: true, sort: true}
					      ,{title:'操作', width: 150, align:'center', toolbar: '#barDemo'}
					      ,{field: 'createTime', title: '加购时间', width: 110}
					    ]],
					    data: tableData
					  });
				  }	
			});
	    }
	  });
	});
	
});

$("#discount-btn").click(function(){
	let discount= $("#discount-input").val();
	if(discount==null || discount==''){
		layer.msg('请填写折扣码喔，优惠多多');
	}else if(discount=='kobe'){
		layer.msg('恭喜获得8折折扣，愉快购物');
		discount = 0.8;
		$("#total-price-2").text((total_price*discount).toFixed(2));
		$("#discount-btn").hide();
		$("#discount-div").text('已获得8折折扣优惠');
	}else{
		layer.msg('暂无优惠');
		$("#discount-input").val('');
	}
});

// 移除
function delCarGood(data,userId){
	$.ajax({
    	url:baseURL+"/cars/delCarGood",
		type:"post",
		dataType:"json",
		data:{
			userId: userId,
			goodId: data.goodId,
			goodSize: data.goodSize,
			goodColor: data.goodColor
		},
		async: true,
		success:function(data){
			if(data.code == '200'){
				layer.msg("成功移除此商品");
			}else{
				layer.msg(data.msg);
			}
		}
	});
}

// 修改
function updateGoodInfo(data,userId){
	$.ajax({
    	url:baseURL+"/cars/updateGoodInfo",
		type:"post",
		dataType:"json",
		data:{
			userId: userId,
			goodId: data.goodId,
			goodSize: data.goodSize,
			goodNums: data.goodNums,
			goodTotalPrice: data.goodTotalPrice,
			goodColor: data.goodColor
		},
		async: true,
		success:function(data){
			if(data.code == '200'){
				if(data.msg=="suc"){
					layer.msg("修改成功");
//					var index = parent.layer.getFrameIndex(window.name);
//					parent.layer.close(index);
					layer.closeAll();
				}else{
					layer.msg("修改失败");
					layer.closeAll();
				}
			}else{
				layer.msg("修改失败");
				layer.closeAll();
			}
		}
    });
}

// 获取购物车表格数据
function getTableData(userId){
	$.ajax({
		url : baseURL+"/cars/getCarsData", // 请求地址
		type : "post", // 请求的类型，可选post、get等
		dataType : "json" ,// 返回的类型，可选xml、json、script 或 html
		data : {
			userId: userId,
		},
		async : false, 
		success : function(data){
			if(data.code=="200"){
				var list = data.map.data;
				var imgs = data.map.imgs;
				var len = list.length;
				for(let i=0;i<len;i++){
					list[i].No = i+1;
					if(imgs[list[i].goodId]!=null && imgs[list[i].goodId]!=""){
						list[i].imgsrc = baseURL+"/statics"+imgs[list[i].goodId];
					}else{
						list[i].imgsrc = baseURL+"/statics/img/product/24.png";
					}
				}
				tableData = list;
			}
		}
	});
}

// 
function reflesh(){
	location.reload();
}

// 清空购物车


// 提交
function submitBtn(){
	// checkedData_
	if(checkedData_.length == 0){
		layer.msg("请选择商品");
	}else{
		window.location.href = "#discount-code";
		layer.msg("请核实您的信息");
		$(".discount-code").css("visibility","visible");
	}
}

// 最终提交
$("#checkBtn").click(function(){
	if(checkedData_.length == 0){
		layer.msg("请选择商品");
		window.location.href = "#cartTable";
	}else if(addId_check==''){// 判断是否选中了收货地址
		layer.msg("请选择收货地址");
		window.location.href = "#discount-code";
	}else{
		//layer.msg(addId_check);
		let checkedDataJson = JSON.stringify(checkedData_);
		$.ajax({
			url : baseURL+"/cars/jumpToCheck", // 请求地址
			type : "post", // 请求的类型，可选post、get等
			dataType : "json" ,// 返回的类型，可选xml、json、script 或 html
			data : {
				userId: userId,// 用户id
				addId: addId_check, // 收货地址id
				checkedData : checkedDataJson,// 选中的商品 array str
			},
			async : true, 
			success : function(data){
				if(data.code=="200"){
					
				}
			}
		});
	}
});

// 批量删除
function delShopGoods(){
	var userId = localStorage.getItem("user");
	if(checkedData_.length == 0){
		layer.msg("请选择商品");
	}else{
		layer.confirm('确定移除选中的商品吗？', function(index){
			for(let i = 0;i<checkedData_.length;i++){
				let data = checkedData_[i];
				console.log(data);
				delCarGood(data,userId);
			}
			getTableData(userId);
//	        table.reload('cartTable', {
//	            data: tableData // 调用table.reload 重新渲染显示加载追加了数据的表格
//	        });
			table.render({
			    elem: '#cartTable'
			    ,title: '购物车'
			    ,page: true //开启分页
			    ,totalRow: true //开启合计行
			    ,limits:[5,10,15]
			    ,cols: [[ //表头
			      {type: 'checkbox'}
			      ,{field: 'No', title: '序号', width:60 ,align:'center'}
			      ,{field: 'imgsrc', title: '图片', width:135,
			    	  templet:'<div><center><img src="{{ d.imgsrc}}"></center></div>'}
			      ,{field: 'goodName', title: '名称', width: 210, sort: true}
			      ,{field: 'goodSize', title: '尺码', width: 75,align:'center'}
			      ,{field: 'goodColor', title: '颜色', width: 130,align:'center'}
			      ,{field: 'goodPrice', title: '单价', width:80, sort: true}
			      ,{field: 'goodNums', title: '数量', width: 70, totalRow: true, edit: 'text',align:'center'}
			      ,{field: 'discountNum', title: '折扣', width:70} 
			      ,{field: 'goodTotalPrice', title: '总价', width: 100 , totalRow: true, sort: true}
			      ,{title:'操作', width: 150, align:'center', toolbar: '#barDemo'}
			      ,{field: 'createTime', title: '加购时间', width: 110}
			    ]],
			    data: tableData
			  });
	        layer.close(index);
	    });
	}
}

// 获取收货列表
var getShopArea = function(userId){
	$.ajax({
		url:baseURL+"/user/getShopArea",
		type : "post", // 请求的类型，可选post、get等
		dataType : "json" ,
		data : {
			userId:userId
		}, // 请求的数据,规定连同请求发送到服务器的数据 (data1)
		async : true , // 同步 因为要分页 先要获取 count总数
		success:function(data){
			if(data.code==200){
				var list = data.shopAddressList;
				addrVm.areaList = list;
				for(let i=0;i<list.length;i++){
					if(list[i].isMain=='1'){
						// 把id拿出来
						addId_check = list[i].addId;
					}
				}
			}
		}
	});
}

function funcA(addId, that){
	let ulNode = $("#areaList li .areaLiDiv");
	let liNodes = $("#areaList li");
	// 判断是否选中的是 li
	if(that.path[1].className.indexOf("areaLiDiv")!=-1){
		
		// 把原来选中的 改为未选中
		for(let i=0;i<ulNode.length;i++){
			if(ulNode[i].getAttribute("class").indexOf("active")!=-1){
				ulNode[i].setAttribute("class","areaLiDiv");
			}
		}
		
		// 如果包含了active
		if(that.path[1].className.indexOf("active")!=-1){
			that.path[1].className = that.path[1].className.replace("active",'');
		}else{
			// 如果没有.active
			that.path[1].className = that.path[1].className + " active";
		}
		
	}else if(that.path[2].className.indexOf("areaLiDiv")!=-1){
		
		// 把原来选中的 改为未选中
		for(let i=0;i<ulNode.length;i++){
			if(ulNode[i].getAttribute("class").indexOf("active")!=-1){
				ulNode[i].setAttribute("class","areaLiDiv");
			}
		}
		
		if(that.path[2].className.indexOf("active")!=-1){
			that.path[2].className = that.path[2].className.replace("active",'');
		}else{
			// 如果没有.active
			that.path[2].className = that.path[2].className + " active";
		}
	}else if(that.path[3].className.indexOf("areaLiDiv")!=-1){
		
		// 把原来选中的 改为未选中
		for(let i=0;i<ulNode.length;i++){
			if(ulNode[i].getAttribute("class").indexOf("active")!=-1){
				ulNode[i].setAttribute("class","areaLiDiv");
			}
		}
		
		if(that.path[3].className.indexOf("active")!=-1){
			that.path[3].className = that.path[3].className.replace("active",'');
		}else{
			// 如果没有.active
			that.path[3].className = that.path[3].className + " active";
		}
	}
	
	for(let i=0;i<ulNode.length;i++){
		if(ulNode[i].getAttribute("class").indexOf("active")!=-1){
			addId_check = ulNode[i].parentElement.getAttribute("value");
			console.log(addId_check);
		}
	}
	
}

