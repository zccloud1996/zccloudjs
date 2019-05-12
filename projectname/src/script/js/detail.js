;;;(function(){
    var sid=location.href.split("=")[1];
    console.log(sid)
    $.ajax({
        url:"http://10.31.163.37/projectname/php/detail.php",
        data:{
            sid:sid,
        },
        dataType: "json",
    }).done(function(data){
        console.log(data)
        var $str="";
        var arr=data[0].urls.split(',');
        $str+=`<div id="detail">
        <div class="detail_l">
            <div class="detail_l_inner clear">
                <div class="inner_l">
                    <div class="xt">
                   <img src="${data[0].url}">
                    <div class="sf"></div>
                    </div>
                    <div class="mover">
                        <ul>
                            <li>
                                <a href="javascript:;" class="active">
                                <img src="${arr[1]}">
                                </a>
                            </li>
                            <li>
                                <a href="javascript:;">
                                <img src="${arr[2]}">
                                </a>
                            </li>
                            <li>
                                <a href="javascript:;">
                                <img src="${arr[3]}">
                                </a>
                            </li>
                            <li>
                                <a href="javascript:;">
                                <img src="${arr[4]}">
                                </a>
                            </li>
                            <li>
                                <a href="javascript:;">
                                <img src="${arr[5]}">
                                </a>
                            </li>
                        </ul>
                    </div>

                </div>
                <div class="inner_r">
                    <div class="title">
                        <h1>
                        ${data[0].title}
                        </h1>
                        <p class="newp">
                            纯棉面料 修身剪裁 DP免烫
                        </p>
                    </div>
                    <div class="shangpinjg">
                        <p class="jg_title"> </p>
                        <div class="jg">
                            <span>价格</span>
                            <p>￥${data[0].money}</p>
                        </div>
                    </div>

                    <div class="content">
                        <p>
                        ${data[0].title}
                        </p>

                        <dl>
                            <dt>
                                尺码
                            </dt>
                            <dd>
                                <ul>
                                    <li class="lis">
                                        <span>37</span>
                                    </li>
                                    <li class="lis">
                                        <span>38</span>
                                    </li>
                                    <li class="lis">
                                        <span>39</span>
                                    </li>
                                    <li class="lis">
                                        <span>40</span>
                                    </li>
                                    <li class="lis">
                                        <span>41</span>
                                    </li>
                                    <li class="lis">
                                        <span>42</span>
                                    </li>
                                    <li class="lis">
                                        <span>43</span>
                                    </li>
                                </ul>
                            </dd>
                        </dl>

                        <dl style="display:block">
                            <dt>
                                颜色
                            </dt>
                        </dl>
                        <dl>
                            <dt>
                                数量
                            </dt>
                            <dd>
                                <ul>
                                <li class="lis lis-">
                                       <span>-</span> 
                                    </li>
                                    <li class="lis lis-num">
                                        <span>1</span>
                                    </li>
                                    <li class="lis lis+">
                                     <span>+</span>
                                    </li>

                                </ul>
                            </dd>
                        </dl>
                    </div>


                    <!-- 购物车按钮 -->
                    <div class="top">
                        <div class="gwc" id="gm">
                            <a href="javascript:;" class="gm_color">立即购买</a>
                        </div>


                        <div class="gwc">
                            <a href="javascript:;">点击加入购物车</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="dt">
        <img class="lazy" data-original="${data[0].url}" width="640" height="640">
        </div>
    </div>`;
    $('.iphone').html($str);
    $(function() {
    $("img.lazy").lazyload({
        effect: "fadeIn" 
    });
    // 放大镜
    class Fd {
        constructor() {
            this.$spic = $(".xt");
            this.$sf = $(".sf");
            this.$bf = $(".dt");
            this.$bpic = $(".dt img");
            this.$wrap = $(".detail_l");
            this.$oUl = $(".mover ul");
            this.bili = this.$bpic.width() / this.$spic.width();
        }
        init() {
            console.log(this.$oUl)
            let $el = this; //存this
            this.$spic.hover( //鼠标移入移出加滑动
                function() {
                    $el.over();
                    $(this).on("mousemove", function(e) {
                        $el.move(e);
                    });
                },
                function() {
                    $el.out();
                }
            );
            this.$oUl.on("click", function(ev) { // 给每个LI添加点击事件
                $el.liclick(this, ev);
            })
        }

        over() {
            //鼠标移入
            this.$sf.css({
                visibility: "visible",
                width: (this.$spic.width() * this.$bf.width()) / this.$bpic.width(),
                height: (this.$spic.height() * this.$bf.height()) / this.$bpic.height()
            });
            this.$bf.css("display", "block");
            this.$sf.css("visibility", "visible")
        }

        out() {
            //鼠标移出
            this.$sf.css("visibility", "hidden");
            this.$bf.css("display", "none");
        }

        move(e) {
            //鼠标移动
            let l = e.pageX - this.$wrap.offset().left - this.$sf.width() / 2;
            let t = e.pageY - this.$wrap.offset().top - this.$sf.height() / 2;
            if (l <= 0) {
                l = 0;
            } else if (l >= this.$spic.width() - this.$sf.width()) {
                l = this.$spic.width() - this.$sf.width();
            }
            if (t <= 0) {
                t = 0;
            } else if (t >= this.$spic.height() - this.$sf.height()) {
                t = this.$spic.height() - this.$sf.height();
            }
            this.$sf.css({
                left: l,
                top: t
            });
            this.$bpic.css({
                left: -this.bili * l,
                top: -this.bili * t
            });
        }

        liclick($el, ev) {
            if (ev.target.nodeName == 'IMG') {
                let url = $(ev.target).prop("src");
                this.$spic.find("img").prop("src", url);
                this.$bpic.prop("src", url);
            }
        }
    }
    new Fd().init();
    // 购物车数量
    var num=$('.lis-num span').html()
    console.log(num)
    $('.lis-').on('click',function(){
        num--;
        if(num>=1){
            $('.lis-num span').html(num)
        }
       else{
           num=1
       }
    })
    $('.lis+').on('click',function(){
        num++;
        $('.lis-num span').html(num)
    })
    // cook
    // $('.gwc').on('click',function(){
    //     $.cookie('amount',$('.lis-num span').html(),{expires:7});
    //     $.cookie('title',data[0].title,{expires:7});
    //     $.cookie('price',data[0].money,{expires:7});    
    // });

//    console.log( $.cookie("cookieName"));
var $addgwc=$('.box_right button');
var sidarr=[];
var numarr=[];
function cookietoarray() {
    if($.cookie('sid')&& $.cookie('num')) {//判断商品是第一次存还是多次存储
        sidarr = $.cookie('sid').split(','); //cookie商品的sid  
        numarr = $.cookie('num').split(','); //cookie商品的num
    }}

$('.gwc').on('click',function(){
   var $num=$('.lis-num span')
    cookietoarray();//获取sid和num
            if($.inArray(sid,sidarr)!=-1){//如果存在
                var num=parseInt(numarr[$.inArray(sid,sidarr)])+parseInt($num.html());
                numarr[$.inArray(sid,sidarr)]=num;
                $.cookie('num',numarr.toString(),7)
                
            }else{
                sidarr.push(sid);
                numarr.push($num.html());
                $.cookie('sid',sidarr.toString(),7);
                $.cookie('num',numarr.toString(),7);
                
            }

})   
//   /-----------------------  
});

});;;;



})();;
