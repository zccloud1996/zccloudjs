// 二级导航
(function () {
  $('.banner-bd-hd ul li').hover(function () {
    $('.banner-bd-hd-nav').css("display", "block")
    $('.banner-bd-hd-nav').stop().animate({
      opacity: 1
    })
  }, function () {
    $('.banner-bd-hd-nav').css("display", "none")
    $('.banner-bd-hd-nav').stop().animate({
      opacity: 0
    })
  });
  $('.two-code').hover(function () {
    $('.two-code-two').css('display', 'block')
  }, function () {
    $('.two-code-two').css('display', 'none')
  })
})();;
// 楼梯效果
(function () {
  var $lou = $('.lou-ti a').not('.last-no');
  var $louceng = $('.louceng')
  $(window).on('scroll', function () {
    var $win = $(window).scrollTop();
    if ($win >= 478) {
      $('.lou-ti div').css({
        "position": "fixed",
        "top": 40,
        "right": '50%',
      })
    }
    else (
      $('.lou-ti div').css({
        "position": "absolute",
        "top": 478,
        "right": '50%'
      })
    );
    $louceng.each(
      function (index, element) {
        if ($(element).offset().top > $win) {
          $lou.removeClass('active')
          $lou.eq(index).addClass('active')
          return false
        }
      }
    )
  });
  $lou.on('click', function () {
    $(this).addClass('active').siblings().removeClass('active');
    $('html,body').animate({
      scrollTop: $louceng.eq($(this).index()).offset().top
    }

    )
  })
  $('.last').on('click', function () {
    $('html,body').animate({
      scrollTop: 0
    })
  })
})();;;

// 幻灯片插件 
(function () {
  window.onload = function () {
    var swiper = new Swiper('.swiper-container', {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
    });
  }
})();;;;
// 首页猜你喜欢渲染
(function () {
  $.ajax({
    url: "http://10.31.163.37/projectname/php/index-shuju.php",
    dataType: "json"
  }).done(function (data) {
    console.log(data)
    var $str = "";
    $.each(data, function (index, value) {
      $str += `
      <div class="like-gif-box">
      <a href="http://10.31.163.37/projectname/src/details.html#sid=${value.sid}">
          <div class="like-pic">
              <img class="lazy" data-original="${value.url}" width="198" height="197">
          </div>
          <h4>${value.title}</h4>
      </a>
      <p>
          <span class="like-gif-small-pic"></span>
          <span class="like-gif-pir">
              <em>¥</em>
              ${value.money}
          </span>
          <span class="like-gif-num">销量:86</span>
      </p>
  </div>`
    });
    $('.like-gif-link').html($str)
  });;
  $(function() {
    $("img.lazy").lazyload({
      effect: "fadeIn"
    });
  });


})();;;;;
// 登陆后  名字+欢迎你
(function(){

  setTimeout(function(){ 
if($.cookie('UserName')==undefined){
  $('.head-link').html('亲，请登录').attr("href","http://10.31.163.37/projectname/src/login.html")
  $('.head-del').html('免费注册').attr('href',"http://10.31.163.37/projectname/src/registor.html")
}
  else{ $('.head-link').html($.cookie('UserName')+'欢迎您').attr('href',"javascript:;")
  $('.head-del').html('退出').attr('href',"javascript:;")
};

// /*-------
$('.head-del').on('click',function(){

  if($('.head-del').html()=='退出'){
    $.removeCookie('UserName');

    location.reload(true)
  }
  
})

    
})
})()