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

function CreateTable(str)
{
    alert(str);
}

$(function () {
    $('#clearId').click(function () {
        submit(reset);
    });

    var data = $('#formId').serialize();

    $('.personName').click(function () {
        alert(this);
    });

    //$('#searchId').click(function () {
    //    $.ajax({
    //        type: 'POST',
    //        url: '/DataProcessInfo/GetPersonInfoData',
    //        success: function (result) {

    //        },
    //        dataType: 'json'
    //    })
    //});
});

layui.use(['layer', 'form', 'laydate', 'table'], function () {
    var layer = layui.layer,
        $ = layui.jquery,
        form = layui.form,
        laydate = layui.laydate,
        table = layui.table;

    table.render({
      elem: '#datatable'
    , id: 'userkpi'
    , url: '/DataProcessInfo/GetPersonInfoData'
    , limits: [15, 20, 40, 60, 80]
    , limit: 15

    , cols: [[
       //{ checkbox: true, fixed: true }
      //, { field: 'id', title: 'id', fixed: true }
        {title: '序号',templet: '#indexTpl',width:100}
      , { field: 'personName', title: '名称', width: 200, templet: '<div><a href="/Diagnosis/index?filename={{d.uuid}}" class="layui-table-link">{{d.personName}}</a></div>' }
      , { field: 'hospitalName', title: '检查医院', width: 400, sort: true }
      , { field: 'createTime', title: '上传时间', width: 200, sort: true, templet: '<div>{{Format(d.createTime,"yyyy-M-d h:m:s.S")}}</div>' }
    ]]

    , page: true
    , request: {
        pageName: 'page' //页码的参数名称，默认：page
        , limitName: 'limit' //每页数据量的参数名，默认：limit
    }
    , done: function (res, curr, count) {
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

        });
    }

    });


    //active = {
    //    reload: function () {
    //        var demoReload = $('#demoReload');
    //        table.reload('userkpi', {
    //            where: {
    //                userid: demoReload.val(),
    //            }
    //        });
    //    }
    //};


    $('.demoTable .layui-btn').on('click', function () {
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });

});

