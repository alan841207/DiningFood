/// <reference path="form.js" />
layui.use(['layer', 'form', 'laydate', 'table'], function () {
    var layer = layui.layer,
        $ = layui.jquery,
        form = layui.form,
        laydate = layui.laydate,
        table = layui.table;

    laydate.render({
        elem: '#dateStart', value: new Date()
    });

    laydate.render({
        elem: '#dateEnd', value: new Date()
    });


    $("#Export").click(function () {
        var useridval = $('#userid').val();
        var starttimeval = $('#dateStart').val();
        var endtimeval = $('#dateEnd').val();
        if (starttimeval == endtimeval) {
            starttimeval = '';
            endtimeval = '';
        }

        window.location.href = 'Report/FileDown' + "?userid=" + useridval + "&dateStart=" + starttimeval + "&dateEnd=" + endtimeval;
    })

    table.render({
        elem: '#dataReport'
   , url: '/Report/RequestDataInfo'
   , limits: [15, 20, 40, 60, 80]
   , limit: 15
   , cols: [[
      { checkbox: true, fixed: true }
       , { field: 'userid', title: '用户名', width: 100 }
       , { field: 'startDate', title: '开始时间', width: 200, sort: true, templet: '<div>{{Format(d.startDate,"yyyy-M-d h:m:s.S")}}</div>' }
      , { field: 'endDate', title: '结束时间', width: 200, sort: true, templet: '<div>{{Format(d.endDate,"yyyy-M-d h:m:s.S")}}</div>' }
       , { field: 'Rate', title: '完成率', width: 100, sort: true }
       , { field: 'Consume', title: '省耗(分钟)', width: 100, sort: true }
      , { field: 'part', title: '品目', width: 150, sort: true }
      , { field: 'Logno', title: '制番号', width: 200 }
      , { field: 'siteNum', title: '冲数', width: 80 }
      , { field: 'MachineId', title: '机台号', width: 80 }
      , { field: 'Molds', title: '模具编号', width: 200 }
      , { field: 'PlanNum', title: '计划完成/分钟', width: 100, sort: true }
      , { field: 'CountNum', title: '实际完成', width: 100, sort: true }
   ]]
   , id: 'testReload'
   , page: true
   , request: {
       pageName: 'page' //页码的参数名称，默认：page
       , limitName: 'limit' //每页数据量的参数名，默认：limit
       , starttime: 'starttime'
       , endtime: 'endtime'
   }
   , done: function (res, curr, count) {
       //alert("加载完成");
       //alert(res);
   }

    });

    //提交查询
    $("#search").click(function () {
        var strFilter = $("#userid").val();
        var timeStart = $("#dateStart").val();
        var timeEnd = $("#dateEnd").val();
        console.log(strFilter);
        table.reload('testReload', {
            where: {
                userid: strFilter,
                starttime: timeStart,
                endtime: timeEnd
            }
        });
    });



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