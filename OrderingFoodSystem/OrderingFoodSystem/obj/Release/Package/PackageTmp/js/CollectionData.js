layui.use(['layer', 'form', 'laydate','table'], function () {
    var layer = layui.layer,
        $ = layui.jquery,
        form = layui.form,
        laydate = layui.laydate,
        table = layui.table;

    table.render({
      elem: '#datatable'
    , id: 'userkpi'
    , url: '/Record/GetUserKpi'
    , limits: [15, 20, 40, 60, 80]
    , limit: 15
    //, response:{
    //    statusName: 'code' //数据状态的字段名称，默认：code
    //  , statusCode: 0 //成功的状态码，默认：0
    //  , msgName: 'msg' //状态信息的字段名称，默认：msg
    //  , countName: 'count' //数据总数的字段名称，默认：count
    //  , dataName: 'userkpi' //数据列表的字段名称，默认：data
    //} 

    , cols: [[
       //{ checkbox: true, fixed: true }
      //, { field: 'id', title: 'id', fixed: true }
       { field: 'userid', title: '用户名', width: 100 }
      , { field: 'Rate', title: '完成率', width: 100, sort: true }
      , { field: 'startDate', title: '开始时间', width: 200, sort: true, templet: '<div>{{Format(d.startDate,"yyyy-M-d h:m:s.S")}}</div>' }
      , { field: 'endDate', title: '结束时间', width: 200, sort: true, templet: '<div>{{Format(d.endDate,"yyyy-M-d h:m:s.S")}}</div>' }
      , { field: 'Consume', title: '省耗(分钟)', width: 150, }
      , { field: 'part', title: '品目', width: 150, sort: true }
      , { field: 'Logno', title: '制番号', width: 200 }
      , { field: 'siteNum', title: '冲数', width: 80 }
      , { field: 'MachineId', title: '机台号', width: 80 }
      , { field: 'Molds', title: '模具编号', width: 200 }
      , { field: 'PlanNum', title: '计划完成/分钟', width: 100, sort: true }
      , { field: 'CountNum', title: '实际完成', width: 100, sort: true }
    ]]

    , page: true
    , request: {
        pageName: 'page' //页码的参数名称，默认：page
        , limitName: 'limit' //每页数据量的参数名，默认：limit
    }
    ,done: function (res, curr, count)
    {
        //如果是异步请求数据方式，res即为你接口返回的信息。
        //如果是直接赋值的方式，res即为：{data: [], count: 99} data为当前页数据、count为数据总长度
        //console.log(res);
        //得到当前页码
        //console.log(curr);
        //$("#curPageIndex").val(curr);
        //得到数据总量
        //console.log(count);
        //alert('加载完成!!');
        //alert(res);
        $('tbody tr').each(function () {
            // alert($(this).find("[data-field='PlanNum']").text());
            
            //var planNum = $(this).find("[data-field='PlanNum']").text();
            //var actualNum = $(this).find("[data-field='ActualNum']").text();
            //var value = parseFloat(((actualNum / planNum) * 100).toFixed(2)) + '%';
            //$(this).find('td').last().find("div").text(value);
        });
    }

    });


    active = {
        reload: function () {
            var demoReload = $('#demoReload');
            table.reload('userkpi', {
                where:{
                        userid: demoReload.val(),
                }
            });
        }
    };

    //$("#search").click(function () {
    //    var strFilter = $("#demoReload").val();
    //    console.log(strFilter);
    //    tableIns.reload({
    //        where: {
    //            userid:strFilter
    //        }
    //    });
    //});


    $('.demoTable .layui-btn').on('click', function () {
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });
    
    $('#addMsg').click(function () {
        //    $.ajax({
        //        type: "POST",
        //        url: '/Record/UserPartial',
        //        data: { },
        //        datatype: "html",
        //        success: function (data) {
        //            alert(data);
        //        },
        //    error: function (data) {
        //        alert("处理失败!");
        //        alert(data);
        //    }
        //});

        layer.open({
            type: 2,
            skin: 'layui-layer-demo', //样式类名
            title: '产能录入',
            scrollbar: true,
            //area: ['480px', '880px'],
            area : ['50%', '100%'],
            shadeClose: false,
            shade: 0.8,
            content: '/Record/FromPage', //iframe的url
            success: function (index, layero) {
                table.reload('userkpi');  //刷新主界面
            }

        });

    });

    //$('#buttontest').click(function () {
    //    PostRequest();
    //});


    function PostRequest() {

        var radioValue = $(":input[type=radio]:checked").attr("title");
        if (typeof (radioValue) == "undefined") {
            alert("请选则人员");
            return;
        }

        $.post('/Record/UserPartial', {}, function (result, status) {
            if (status) {
                GetPart();  //品目请求
                GetMolds(); //模具号请求
                //alert($('#part').text());
                layer.open({
                    type: 1,
                    id:'idtest',
                    skin: 'layui-layer-demo', //样式类名
                    title: '产能录入',
                    scrollbar: false,
                    area: ['460px', '680px'],
                    closeBtn: 1, //不显示关闭按钮
                    anim: 2,
                    shadeClose: true, //开启遮罩关闭
                    content: result,
                    success: function (layero, index) {
                        //form.render('select');
                        //加载日期控件
                        laydate.render({
                            elem: '#date1', value: new Date()
                        });
                    },
                    //刷新父窗体
                    end: function () {
                        //location.reload();
                    }
                });

                $(":input[name='userid']").val(radioValue);
            }
            else {
                alert('get 请求失败!!!');
            }

        });
    }

    form.on('select(part)', function (data) {
        //console.log(data.elem); //得到select原始DOM对象
        //console.log(data.value); //得到被选中的值
        //console.log(data.othis); //得到美化后的DOM对象
        // alert(data.value);
        GetSiteNum(data.value);
        GetLotSN(data.value);
    });

    form.on('submit(buttontest)', function (data) {
        //PostRequest();
        window.location.reload();  //重新加载
        //return false;
    });

    //验证
    form.verify({
        plannum: function (value,item) {
            if (!new RegExp("^[0-9]*$").test(value)){
                return '计划产能只能输入数字';
            }
        },
        ActualNum:function(value,item){
            if (!new RegExp("^[0-9]*$").test(value)) {
                return '实际产能只能输入数字';
            }
    },
   pass: [/(.+){6,12}$/, '密码必须6到12位']
  , content: function (value) {
      layedit.sync(editIndex);
  }
    });

    //获取品目
    function GetPart() {
        var htmlstr = '<option value="">搜索选择</option>';
        $.get("/Record/GetAllPart", function (result, status) {
            if (status) {
                $.each(result, function () {
                    htmlstr += '<option value="' + this + '">' + this + '</option>'
                })
                $("#part option").remove();
                $("#part").append(htmlstr);

                GetSiteNum($('#part option:selected').val());
                GetLotSN($('#lotid option:selected').val());
                form.render('select');
            }
            else {
                alert("品目请求失败,请重新登录");
                window.history.back(-1);
            }

        });
    }

    //获取工序数
    function GetSiteNum(partval) {
        $.getJSON("/Record/GetSiteNum", { part: partval }, function (result, status) {
            var htmlstr = '<option value="">搜索选择</option>';
            if (status) {
                $.each(result, function () {
                    htmlstr += '<option value="' + this + '">' + this + '</option>';
                });
                $('#siteNum option').remove();
                $('#siteNum').append(htmlstr);
                form.render('select');
            }
            else {
                alert("工程序数请求失败,请重新登录");
                window.history.back(-1);
            }
        });
    }

    //获取模具编号
    function GetMolds() {
        $.getJSON("/Record/GetMolds", function (result, status) {
            var htmlstr = '<option value="">搜索选择</option>';
            if (status) {
                $.each(result, function () {
                    htmlstr += '<option value="' + this + '">' + this + '</option>';
                });
                $('#moldsid option').remove();
                $('#moldsid').append(htmlstr);
                form.render('select');
            }
            else {
                layer.msg('获取模具编号数据异常,请重新登录');
                window.history.back(-1);
            }
        })
    }

    function GetLotSN(partval) {
        $.getJSON("/Record/GetLotSN", { part: partval }, function (result, status) {
            var htmlstr = '<option value="">搜索选择</option>';
            if (status) {
                $.each(result, function () {
                    htmlstr += '<option value="' + this + '">' + this + '</option>';
                });
                $('#lotid option').remove();
                $('#lotid').append(htmlstr);
                form.render('select');

                GetWoNum($('#part option:selected').val(), $('#lotid option:selected').val());
            }
            else {
                layer.msg('获取制番号数据异常,请重新登录');
                window.history.back(-1);
            }
        })
    }

    function GetWoNum(partval,lotsnval)
    {
        $.getJSON("/Record/GetWoNum",{part:partval,lotsn:lotsnval}, function (result, status) {
            var htmlstr = '<option value="">搜索选择</option>';
            if (status) {
                $.each(result, function () {
                    htmlstr += '<option value="' + this + '">' + this + '</option>';
                });
                $('#wonum option').remove();
                $('#wonum').append(htmlstr);
                form.render('select');
            }
            else {
                layer.msg('获取工单数据异常,请重新登录');
                window.history.back(-1);
            }
        })
    }

});


function Format(datetime, fmt) {
    var dt = datetime.replace("/Date(", "").replace(")/", "");
    var date = new Date(parseInt(dt));
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
};

