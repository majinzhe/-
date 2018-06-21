$(function(){

  $("form").bootstrapValidator({

    fields: {
      //对应了表单中的name属性
      username: {
        //配置用户名的具体的校验规则
        validators: {
          notEmpty: {
            message: '用户名不能为空'
          },
          stringLength: {
            message: "用户名长度是3-9位",
            min: 3,
            max: 9
          },
          callback: {
            message: '用户名不正确'
          }
        }
      },
      password: {
        validators: {
          notEmpty: {
            message: '用户密码不能为空'
          },
          stringLength: {
            min: 6,
            max: 12,
            message: '用户密码长度是6-12位'
          },
          callback: {
            message: '用户密码不正确'
          }
        }
      }
    },
    // 表单后的小图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-thumbs-up',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    }
    
  });  
// 成功的时候被触发 success.form.bv
  $("form").on("success.form.bv",function(e){
    e.preventDefault();
    $.ajax({
      type:'post',
      url:'/employee/employeeLogin',
      data:$("form").serialize(),
      success:function(info){
        // console.log(info);
        
        if( info.success ){
          location.href = "index.html"
        }
        if (info.error === 1000){
          $("form").data("bootstrapValidator").updataStatus("username","INVALID", "callback")
        }
        if (info.error ===1001){
          $("form").data("bootstrapValidator").updataStatus("username","INVALID", "callback")
        }
      }
    })
   })
  //  重置表单样式，消除小图标与错误提醒
   $("[type='reset']").on("click", function() {
    $("form").data("bootstrapValidator").resetForm(true);
   })


})