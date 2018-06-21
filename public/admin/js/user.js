$(function(){
  
  var page =  1;
  var pageSize = 10;
  render()
  
  function render (){
    $.ajax({
      type:'get',
      url:'/user/queryUser',
      data:{
        page:page,
        pageSize:pageSize
      },
      success:function(info){
        // console.log(info);
        var html = template("tpl",info);
        $("tbody").html(html);
    
        $("#paginator").bootstrapPaginator({
          // 版本
          bootstrapMajorVersion: 3,
          // 当前页
          currentPage:page ,
          totalPages:Math.ceil(info.total / info.size),
          size:"small",
          onPageClicked:function(a,b,c,p){
            page = p;
            // 重新渲染
            render();
          }
        })
      }
    })
  }

  $("tbody").on("click", ".btn",function(){

    $("#userModal").modal('show');
    // console.log($(this).parent());
    
    var id = $(this).parent().data('id');
  // 是否含有这个类名，有则让他改变为1 ，没有变为 0
  // 从而决定按钮是哪个
    var isDelete = $(this).hasClass("btn-success")? 1:0;

    $(".btn_confirm").off().on("click",function(){
      // console.log('aa')

      $.ajax({
        type:'post',
        url:'/user/updateUser',
        data:{
          id:id,
          isDelete:isDelete
        },
        success:function(info){
          // console.log('aa')
          if (info.success){
            $("#userModal").modal('hide');
            render();
          }
        }
      })

    })
  })

})