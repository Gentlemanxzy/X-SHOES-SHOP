baseURL = $("#baseURL").val();
var tableData = [];
var checkedData_ = [];
$(document).ready(function(){
	baseURL = $("#baseURL").val();
	$("#delsBtn").hide();
	// 判断是否登录
	var userId = localStorage.getItem("user");
	if(userId){
		// 已经登录
		getTableData(userId);
		
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
		var table = layui.table,
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
		      ,{field: 'goodColor', title: '颜色', width: 100,align:'center'}
		      ,{field: 'goodPrice', title: '单价', width:80, sort: true}
		      ,{field: 'goodNums', title: '数量', width: 70, totalRow: true, edit: 'text',align:'center'}
		      ,{field: 'discountNum', title: '折扣', width:100} 
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
//					  getTableData(userId);
//					  table.reload('cartTable',{
//						  page:{
//							  curr:1
//						  }
//					  },'tableData');
					  location.reload();
				  }	
	    			
			});
	    }
	  });
		
	});
	
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
			//goodNums: data.goodNums,
			//goodTotalPrice: data.goodTotalPrice,
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
	}
}

// 批量删除
function delShopGoods(){
	var userId = localStorage.getItem("user");
	if(checkedData_.length == 0){
		layer.msg("请选择商品");
	}else{
		
		for(let i = 0;i<checkedData_.length;i++){
			let data = checkedData_[i];
			console.log(data);
			delCarGood(data,userId);
		}
		location.reload();
	}
	
}