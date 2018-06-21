$(function () {

  page = 1;
  pageSize = 8;
  render();
  // 查询并渲染第二页
  function render(){

    $.ajax({
      type:'get',
      url:'/category/querySecondCategoryPaging',
      data:{
        page:page,
        pageSize:pageSize
      },
      success:function(info){
        // console.log(info)
        $('tbody').html( template("tpl",info));

        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:page,
          totalPages:Math.ceil("info.total/info.size"),
          size:'small',
          onpageClick:function(a,b,c,p){
            page = p ;
            render();
          }
        })
      }
    })
  }

  //点击触发事件，显示模态框 ,并且要获取到所有的一级类数据，
  $(".btn_add").on("click",function(){
    // console.log('ssss');
    $("#secondModal").modal('show');

    $.ajax({
      type:'get',
      url:'/category/queryTopCategoryPaging',
      data:{
        page:1,
        pageSize:100 
      },
      success:function(info){
        // console.log(info)
        $('.dropdown-menu').html( template("tpo",info));
      }
    })
  })

  
  $(".dropdown-menu").on("click","a",function(){

    var txt = $(this).text();
    // console.log(txt);
    $(".dropdown-text").text(txt);
    var id = $(this).data("id");
    // console.log(id);
    $("[name='categoryId']").val(id);

    // $("form").data("bootstrapValidator").updateStatus("categoryId", "VALID");

  })
  
  $("#fileupload").fileupload({
    dataType:'json',
    done: function (e, data){
      console.log(data);
      $(".img_box img").attr("src",data.result.picAddr);
      $("[name='brandLogo']").val(data.result.picAddr);
    }
  })

})