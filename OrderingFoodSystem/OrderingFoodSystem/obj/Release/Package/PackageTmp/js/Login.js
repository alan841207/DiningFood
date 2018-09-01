
//一般直接写在一个js文件中
layui.use(['layer', 'form'], function () {
    var layer = layui.layer, $ = layui.jquery, form = layui.form;

    layer.ready(function () {
        //示范一个公告层
        layer.open({
            type: 1
          , title: "Login" //显示标题栏
          , closeBtn: false
          , area: '350px;'
          , shade: 0.8
          , id: 'LAY_layuipro' //设定一个id，防止重复弹出
          , btn: ['登录', '清除']
          , btnAlign: 'c'
          , moveType: 1 //拖拽模式，0或者1
          , content: '<form class="layui-form" action="" id="form1"><div class="layui-form-item"><div class="layui-form-item" style="margin-top: 30px;"><label class="layui-form-label">用户名</label><div class="layui-input-inline"><input type="text" name="username" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" id="username"></div></div><div class="layui-form-item"><label class="layui-form-label">密码</label><div class="layui-input-inline"><input type="password" id="password" name="password" placeholder="请输入密码" autocomplete="off" class="layui-input"></div></div></div></form>'
            //, success: function (index, layero) {
            //    var btn = layero.find('.layui-layer-btn');
            //    btn.find('.layui-layer-btn0').attr({
            //        href: 'http://www.layui.com/#'
            //      , target: '_blank'
            //    });
            //}
          , yes: function (index, layero) {
              var postData = {
                  userID: $("#username").val(),
                  pwd: $("#password").val()
              };
              $.post("/Login/CheckLogin", postData, function (status) {
                  if (status == 'OK') {
                      window.location.href = "/Home/WelcomPage";
                  }
                  else {
                      alert("登录失败");
                      $("#username").val('');
                      $("#password").val('');
                      username.focus();
                      return false;
                  }
              });

          }
          , btn2: function (index, layero) {
              $("#username").val('');
              $("#password").val('');
              username.focus();
              return false;
          }

        });

    });
});




