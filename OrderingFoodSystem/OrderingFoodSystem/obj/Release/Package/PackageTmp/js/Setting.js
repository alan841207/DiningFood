layui.use(['layer', 'form', 'laydate','table'], function () {
    var layer = layui.layer,
        $ = layui.jquery,
        form = layui.form,
        laydate = layui.laydate,
        table = layui.table;

    $("#PART").autocomplete({
        appendMethod: 'replace',
        source: [
         function (q, add) {
             jQuery.getJSON("/Record/GetAllPart", function (resp) {
                 add(resp)
             })
         }
        ]
    });

    $("#PART").blur(function () {
        $.getJSON('/Setting/CheckPartExtis', { part: $('#PART').val() }, function (data, status) {
            if (data) {
                alert('品目录入错误,请重新选择');
                $('#PART').val('');
                return;
            }
        })
    });

    //方法级渲染
    table.render({
        elem: '#Settingdatatable'
        , id: 'Settingdatatable'
      , limits: [10, 20, 30, 60, 90, 150, 300]
      , limit: 10 //默认采用60 
      , url: '/Setting/GetSettingData'
      , cols: [[
         { checkbox: true, fixed: true }
        , { field: 'id', title: 'ID', width: 80, sort: true, fixed: true }
        , { field: 'PART', title: '品目', width: 200 }
        , { field: 'STATION', title: '工序', width: 200, sort: true }
        , { field: 'PLANCOUNT', title: '计划产能', width: 200 }
        , { fixed: 'right', width: 178, align: 'center', toolbar: '#barDemo' }
      ]]
      , page: true
      , request: {
          pageName: 'page' //页码的参数名称，默认：page
           , limitName: 'limit' //每页数据量的参数名，默认：limit
      }
    });

    var $ = layui.$, active = {
        reload: function () {
            var demoReload = $('#demoReload');

            //执行重载
            table.reload('Settingdatatable', {
                page: {
                    curr: 1 //重新从第 1 页开始
                }
              , where: {
                  part: demoReload.val()
              }
            });
        }
    };

    table.on('tool(demo)', function (obj) { //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
        var data = obj.data //获得当前行数据
        , layEvent = obj.event; //获得 lay-event 对应的值
       if (layEvent === 'del') {
            layer.confirm('真的删除行么?【品目：'+data.PART+",工序："+data.STATION+",计划数："+data.PLANCOUNT+"】", function (index) {
                obj.del(); //删除对应行（tr）的DOM结构
                layer.close(index);
                //向服务端发送删除指令
                $.getJSON('/Setting/DeleteSetting', { id: data.id }, function () { });
            });
       } else if (layEvent === 'edit') {
           var html = "<form class='layui-form' action=''><input type='text' id='id' value='" + data.id + "' style='display:none' ><div class='layui-form-item'><label class='layui-form-label'>品目:</label><div class='layui-input-block'><input type='text' name='part' id='part' lay-verify='required' autocomplete='off' class='layui-input' value='" + data.PART + "'></div><div class='layui-form-item'><label class='layui-form-label'>工序:</label><div class='layui-input-block'><input type='text' name='station' id='station' lay-verify='required' autocomplete='off' class='layui-input' value='" + data.STATION + "' ></div><div class='layui-form-item'><label class='layui-form-label'>计划数:</label><div class='layui-input-block'><input type='text' name='plancount' id='plancount' lay-verify='required' autocomplete='off' class='layui-input' value='" + data.PLANCOUNT + "'></div></div></form>";
            layer.open({
                type: 1,
                id: 'idtest2',
                skin: 'layui-layer-demo', //样式类名
                title: '基础资料修改',
                closeBtn:false,
                scrollbar:false,
                btn: ['提交', '关闭'],
                area: ['400px', '350px'],
                //closeBtn: 1, //不显示关闭按钮
                //anim: 2,
                shadeClose: false, //开启遮罩关闭
                content: html,
                success: function (layero, index) {  //加载成功回调
                    //var btn = layero.find('.layui-layer-btn');
                    //btn.find('.layui-layer-btn0').attr({
                    //});
                },
                yes:function(layero,index){   //点击提交的回调
                    $.post('/Setting/UpdateSetting', { id: $('#id').val(), part: $('#part').val(), station: $('#station').val(), plancount: $('#plancount').val() }, function (data, status) {
                        if (status) {
                            layer.msg('修改基础完成!');
                            window.parent.location.reload();
                            parent.layer.close(index);
                        }
                        else {
                            lay.msg('修改资料失败,请重新修改');
                        }
                    })
                },
                //刷新父窗体
                end: function () {
                    //location.reload();
                }
            });
        }
    });

    $('.demoTable .layui-btn').on('click', function () {
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });



})