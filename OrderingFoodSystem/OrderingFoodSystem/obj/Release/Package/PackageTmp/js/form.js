//layui.form.render();
layui.use(['layer', 'form', 'laydate'], function () {
    var layer = layui.layer,
        $ = layui.jquery,
        form = layui.form,
        laydate = layui.laydate;

    layer.ready(function () {
        GetPart();
        GetMolds();

        laydate.render({
            elem: '#startdate', value: new Date(),type:'datetime'
        });
        laydate.render({
            elem: '#enddate', value: new Date(), type: 'datetime'
        });

    });
       

    form.on('radio(radiofilter)', function (data) {
        //console.log(data.elem); //得到radio原始DOM对象
        //console.log(data.value); //被点击的radio的value值
        //alert(data.title);
        //alert(data.value);

        $('input[name=userid]').val(data.value);

    });

    form.on('select(part)', function (data) {
        //console.log(data.elem); //得到select原始DOM对象
        //console.log(data.value); //得到被选中的值
        //console.log(data.othis); //得到美化后的DOM对象
        // alert(data.value);
        GetSiteNum(data.value);
        GetLotSN(data.value);
    });


    form.on('select(lotid)', function (data) {
        GetWoNum($('#part option:selected').val(),$('#lotid option:selected').val());
    })

    form.on('select(OpeartionType)', function (data) {
        if ($('#part').val() != null || data.val != null) {
            GetPlanCount($('#part').val(), data.value);
        }
    });

    form.on('submit(buttontest)', function (data) {
        //window.location.reload();  重新加载
        //return false;
        if($('#startdate').val()>=$('#enddate').val())
        {
            layer.msg('时间选择有误,请确认!!');
            return false;
        }
    });

    //验证
    form.verify({
        plannum: function (value, item) {
            if (value.length <= 0)
            {
                return '计划产能不能为空';
            }
            if (!new RegExp("^[0-9]*$").test(value)) {
                return '计划产能只能输入数字';
            }
        },
        ActualNum: function (value, item) {
            if (value.length <= 0) {
                return '实际产能不能为空';
            }
            if (!new RegExp("^[0-9]*$").test(value)) {
                return '实际产能只能输入数字';
            }
        },
        siteNum: function (value, item) {
            if (value.length <= 0) {
                return '冲数产能不能为空';
            }
            if (!new RegExp("^[0-9]*$").test(value)) {
                return '冲数只能输入数字';
            }
        },
        Consume: function (value, item) {
            if (value.length <= 0) {
                return '省耗产能不能为空';
            }
            if (!new RegExp("^[0-9]*$").test(value)) {
                return '省耗只能输入数字';
            }
        }

    });

    //获取品目
    function GetPart() {
        var htmlstr = '<option value="">搜索选择</option>';
        $.get("/Setting/GetAllPart", function (result, status) {
            if (status) {
                $.each(result, function () {
                    htmlstr += '<option value="' + this + '">' + this + '</option>'
                })
                $("#part option").remove();
                $("#part").append(htmlstr);
                form.render('select');

                //GetSiteNum($('#part option:selected').val());
                //GetLotSN($('#lotid option:selected').val());
                //GetPlanCount($('#part option:selected').val());

            }
            else {
                alert("品目请求失败,请重新登录");
                window.history.back(-1);
            }

        });
    }

    //获取工序数
    function GetSiteNum(partval) {
        $.getJSON("/Setting/GetSiteNum", { part:partval }, function (result, status) {
            var htmlstr = '';
            if (status) {
                $.each(result, function () {
                    htmlstr += '<option value="' + this + '">' + this + '</option>';
                });
                $('#OpeartionType option').remove();
                $('#OpeartionType').append(htmlstr);
                form.render('select');

                if ($('#OpeartionType').val() != null || partval!=null) {
                    GetPlanCount(partval, $('#OpeartionType').val());
                }
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


            }
            else {
                layer.msg('获取制番号数据异常,请重新登录');
                window.history.back(-1);
            }
        })
    }

    function GetPlanCount(partval, stationval) {
        if (partval===null || stationval===null) {
            layer.msg('品目和工序不能为空,请选择值!!!');
            return;
        }
        $.getJSON("/Setting/GetPlanCount", { part: partval, station: stationval }, function (data,status) {
            if (status) {
                $('input[name=plannum]').val(data);
            }
            else {
                layer.msg('请求计划数目失败！！');
                return;
            }
        })
    }

    function GetWoNum(partval,lotsnval) {
        $.getJSON("/Record/GetWoNum",{ part:partval,lotsn:lotsnval }, function (result,status) {
            var htmlstr = '<option value="">搜索选择</option>';
            if (status) {
                $('#wonum').val(result);
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