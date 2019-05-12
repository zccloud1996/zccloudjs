// ;;;;;;;;;;页面进入的协议
;;;(function(){
    $('.btn').on('click',function(){
        $('.registor').css('display','none')
    })
})();;;



// 注册正则
;;;
(function(){
    $(function(){
        $("#form1").validate({
            rules:{
                //字段的name属性:"校验器"
                username:{required:true,
                minlength:2,
                maxlength:10,
            remote:{
                url:"http://10.31.163.37/projectname/php/zhuce.php",
                type:"post",
            }
        },//required在此含义是必填
                //字段的name属性:{校验器:值,校验器:值}
                password:{
                    required:true,
					minlength:6
                },
                repass:{
                    required:true,
                    equalTo:'#password'
                },
                userid:{
                    required:true,
                minlength:2,
                maxlength:10,
                // remote:{
                //     url:"http://10.31.163.37/projectname/php/zhuce.php",
                //     type:"post",
                // }
                }, 
                submit:{
                    required:true,
                }  
            },
            messages:{
                username:{
                    required:'用户名不能为空',
                    minlength:'用户名不能小于2',
                    maxlength:'用户名不能大于10',
                    remote:'用户名已存在'
                },
                password:{
                    required:'密码不能为空',
                    minlength:'用户名不能小于6',
                },
                repass:{
                    required:'密码重复不能为空',
                    equalTo:'两次密码输入不一致',
                },
                userid:{
                    required:'会员不能为空',
                    remote:'用户名已存在',
                    
                }
            }
        });
        
    });
    $.validator.setDefaults({
        /*添加校验成功后的执行函数--修改提示内容，并为正确提示信息添加新的样式(默认是valid)*/
        success: function(label){
            label.text('√').css('color','green').addClass('valid');
        }
    });


})()