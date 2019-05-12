;;;(function(){
    function addCookie(key,value,day){
        var date=new Date();//创建日期对象
        date.setDate(date.getDate()+day);//过期时间：获取当前的日期+天数，设置给date
        document.cookie=key+'='+encodeURI(value)+';expires='+date;//添加cookie，设置过期时间
    };
$('.submit input').on('click',function(){
    var $username=$('#username').val();
    var $password=$('#password').val();
    $.ajax({
        type:'post',
        url:"http://10.31.163.37/projectname/php/login.php",
        data:{
            name:$username,
			pass:$password
        }
    }).done(function(data){
        console.log(data)
        if(!data){//用户名或者密码错误
            $('.error p').html('用户名或者密码错误');
            $('.error').css('display','block')
            $('#password').val('');
        }else{//成功,存cookie,跳转到首页
            addCookie('UserName',$username,7);
            location.href='http://10.31.163.37/projectname/src/index1.html';
        }
    })
})
})()