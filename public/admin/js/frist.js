$(function(){

  var page = 1 ;
  var pageSize = 8 ;

  render();

  function render (){

    $.ajax({
      type:'get',
      url:'/category/queryTopCategoryPaging',
      data:{
        page:page ,
        pageSize:pageSize
      },
      success:function(info){
        // console.log(info);
        $("tbody").html( template("tpl",info));

        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:page,
          totalPages:Math.ceil(info.total/info.size),
          size:'small',
          onpageClicked:function(a,b,c,p){
            page = p ;
            render();
          }
        });
      }
    });
  }

  // 点击添加

  $('.btn_add').on("click",function(){
    // console.log('aaa')
    $("#fristModal").modal('show');

  })
  // 表单校验
  $('form').bootstrapValidator({
    feedbackIcons:{
      valid: 'glyphicon glyphicon-thumbs-up',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
      categoryName:{
        validators:{
          notEmpty:{
            message:'分类名称不能为空'
          }
        }
      }
    }
  });


  // 表单校验成功后阻止页面的跳转 ，发送ajax请求
  $("form").on('success.form.bv',function(e){

    e.preventDefault();

    // console.log('aaa')
    $.ajax({
      type:'post',
      url:'/category/addTopCategory',
      data:$('form').serialize(),
      success:function(info){
        // console.log(info);
        if(info.success){
          $("#fristModal").modal('hide');
          page = 1;
          render();
          // 重置表单内容给
          $("form").data('bootstrapValidator').resetForm(true) ;
        }
      }
    })
  })
  
})