// 页面一开始发送请求就显示进度
$(document).ajaxStart(function () {
  NProgress.start()
});

$(document).ajaxStop(function () {
  setTimeout(function () {
    NProgress.done();
  }, 500);
})


// 侧边栏的导航：
$(".bran").prev().on("click", function () {
  // console.log("aa");

  $(this).next().slideToggle();
})

// 点击侧边栏隐藏
$(".icon_menu").on("click", function () {
  // console.log("bb");
  $(".re_left").toggleClass("now");
  $(".re_right").toggleClass("now");

})
// 点击推出 、显示退出模态框
// 
$(".icon_logout").on("click", function () {
  // console.log('aa');

  $("#logoutModal").modal('show');

  // 点击确认按钮，
  $(".btn_logout").on("click", function () {
    // console.log('aa');
    $.ajax({
      type: 'get',
      url: '/employee/employeeLogout',
      success: function (info) {
        //console.log(info);
        if (info.success) {
          location.href = "logoin.html";
        }
      }
    });

  })
})

