// 商品价格++--

;;;;(function(){
	 
    function goodslist(id,count){
        
		$.ajax({
			url:'http://10.31.163.37/projectname/php/index-shuju.php',//获取所有的接口数据
			dataType:'json'
		}).done(function(data){
            console.log(data)
			$.each(data,function(index,value){
				if(id==value.sid){
                    //遍历判断sid和传入的sid是否相同，方便将那条数据设置到渲染的商品列表中。
					var $clonebox=$('.shop-car-box:hidden').clone(true,true);
					$clonebox.find('.car-pic-left').find('img').attr('src',value.url);
					$clonebox.find('.car-pic-left').find('img').attr('sid',value.sid);
					$clonebox.find('.car-pic-right').find('a').html(value.title);
					$clonebox.find('.car-pir').find('i').html(value.money);
					$clonebox.find('.car-num-box').html(count);
					//计算每个商品的价格。
					$clonebox.find('.car-money ').find('i').html((value.money*count).toFixed(2));
					$clonebox.css('display','block');
					
                    // /计算总价的
					$('.clone').append($clonebox);
					num()
                }
				
				
			});
		})
	}


    if($.cookie('sid') && $.cookie('num')){
		var s=$.cookie('sid').split(',');//数组sid
		var n=$.cookie('num').split(',');//数组num
		$.each(s,function(i,value){
			goodslist(s[i],n[i]);
			// return false
		});
    };
	
	function num(){
		$('.num-right').on('click', function() {
			var $count = $(this).parents('.shop-car-box').find('.car-num-box').html();
			console.log($count)//值
			$count++;
			if ($count >= 99) {
				$count = 99;
			}
			$(this).parents('.shop-car-box').find('.car-num-box').html($count);//赋值回去
			 $(this).parents('.shop-car-box').find('.car-money ').find('i').html(singlegoodsprice($(this)));//改变后的价格
			// priceall();//重新计算总和。
			setcookie($(this));//将改变的数量重新添加到cookie
			
		
		});
		$('.num-left').on('click', function() {
			var $count = $(this).parents('.shop-car-box').find('.car-num-box').html();
			console.log($count)//值
			$count--;
			if ($count<1) {
				$count = 1;
			}
			$(this).parents('.shop-car-box').find('.car-num-box').html($count);//赋值回去
			 $(this).parents('.shop-car-box').find('.car-money ').find('i').html(singlegoodsprice($(this)));//改变后的价格
			// priceall();//重新计算总和。
			setcookie($(this));//将改变的数量重新添加到cookie
			
		
		});
	};
	function singlegoodsprice(obj) { //obj:当前元素
	    var $dj = parseFloat(obj.parents('.shop-car-box').find('.car-pir').find('i').html());//单价
	    var $cnum = parseInt(obj.parents('.shop-car-box').find('.car-num-box').html());//数量
	    return ($dj * $cnum).toFixed(2);//结果
	};
	//8.将改变后的数量的值存放到cookie
	//点击按钮将商品的数量和id存放cookie中
	var arrsid=[]; //商品的id
	var arrnum=[]; //商品的数量
	//提前获取cookie里面id和num
	function cookietoarray(){
		if($.cookie('sid') && $.cookie('num')){
			arrsid=$.cookie('sid').split(',');//cookie商品的sid  
			arrnum=$.cookie('num').split(',');//cookie商品的num
		}
	}
	function setcookie(obj) { //obj:当前操作的对象
		cookietoarray();//得到数组
	    var $index = obj.parents('.shop-car-box').find('img').attr('sid');//通过id找数量的位置
	    arrnum[$.inArray($index,arrsid)] = obj.parents('.shop-car-box').find('.car-num-box').html();
	    $.cookie('num', arrnum.toString(), 7);
	}


// $('.car-del a').on('click',function(){
// 	cookietoarray();//得到数组,上面的删除cookie需要。
// 	if(confirm('你确定要全部删除吗？')){
// 		$$('.shop-car-box:hidden').each(function(){
			
// 		})
// 	}
// })
})()