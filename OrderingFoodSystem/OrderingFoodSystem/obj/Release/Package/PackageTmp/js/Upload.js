
//用于生成uuid
function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}
function guid() {
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

layui.use(['upload', 'form'], function () {
    var $ = layui.jquery,
        form = layui.form,
        upload = layui.upload;
    
    var uuidStr = '';
    var dataHospitalNamestr = "";
    var dataUserstr = "";
    var dataUserhtmlstr = "";

    var HospitalNamestr = '';
    $.getJSON('/HospitalName/GetHospitalName', {}, function (data, status) {
        if (status) {
            $.each(data, function () {
                HospitalNamestr += '<option value="' + this.id + '">' + this.HospitalName + '</option>';
            });
            $('#optionid').append(HospitalNamestr);
            //重新渲染
            layui.form.render('select');
            //layui.render();
            //form.render('select', 'test1');
        }
    });

    var Userstr = '';
    $.getJSON('/Login/GetUser', {}, function (data, status) {
        if (status) {
            $.each(data, function () {
                Userstr += '<option value="' + this.ID + '">' + this.USER + '</option>';
            });
            $('#reportId').append(Userstr);
            //重新渲染
            //form.render('select', 'test2');
            //layui.form.render('select', 'test2');
            layui.form.render('select');
        }
    });

    var Userhtmlstr = '';
    $.getJSON('/Login/GetUser', {}, function (data, status) {
        if (status) {
            $.each(data, function () {
                Userhtmlstr += '<option value="' + this.ID + '">' + this.USER + '</option>';
            });
            $('#reviewId').append(Userhtmlstr);
            //重新渲染
            //form.render('select', 'test3');
            layui.form.render('select');
        }
    });


    var uploadData = $('#optionid').find('option:selected').text();

    //
    $('#testList').click(function () {
        var value = $('#optionid').find('option:selected').val();
        if (value == 0 || value == null) {
            layer.msg('请选择医院');
            return;
        }
        //$('#optionVal').val($('#optionid').find('option:selected').text());
    });



    //监听下拉框
    form.on('select(test1)', function (data) {
        //uploadData = { myval: data.elem[data.elem.selectedIndex].text, "uuid": $('#uuId').text() };//得到被选中的值
        dataHospitalNamestr = data.elem[data.elem.selectedIndex].text;
    });

    //监听下拉框
    form.on('select(test2)', function (data) {
        //uploadData = { myval: data.elem[data.elem.selectedIndex].text, "uuid": $('#uuId').text() };//得到被选中的值
        dataUserstr = data.elem[data.elem.selectedIndex].text;
    });

    //监听下拉框
    form.on('select(test3)', function (data) {
        //uploadData = { myval: data.elem[data.elem.selectedIndex].text, "uuid": $('#uuId').text() };//得到被选中的值
        dataUserhtmlstr = data.elem[data.elem.selectedIndex].text;
    });


    var files;

    //多文件列表示例
    var demoListView = $('#demoList')
    , uploadListIns = upload.render({
        elem: '#testList'
      , url: '/Upload/uploadfile'
      //, data: { "myval": 'uploadData', "uuid": "555" }
        // , data: { myval: $('#optionid').find('option:selected').text }
      , method: 'post'
      , accept: 'file'
      , multiple: true
      , auto: false
      , bindAction: '#testListAction'
      , before: function (obj) {
          $('#uuId').text("dic" + guid());
          //this.data = uploadData;
          this.data = {
              "hospitalNamestr": dataHospitalNamestr,
              "firstTrial": dataUserstr,
              "finalReview": dataUserhtmlstr,
              "uuid": $('#uuId').text()
          }
          if (this.data == "直接选择") {
              return;
          }
      }
      , choose: function (obj) {
          var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
          //读取本地文件
          obj.preview(function (index, file, result) {
              var tr = $(['<tr id="upload-' + index + '">'
                , '<td>' + $('#optionid').find("option:selected").text() + '</td>'
                //, '<td>' + $('#optionType').find("option:selected").text() + '</td>'
                , '<td>' + file.name + '</td>'
                , '<td>' + (file.size / 1014).toFixed(1) + 'kb</td>'
                , '<td>等待上传</td>'
                , '<td>'
                  , '<button class="layui-btn layui-btn-mini demo-reload layui-hide">重传</button>'
                  , '<button class="layui-btn layui-btn-mini layui-btn-danger demo-delete">删除</button>'
                , '</td>'
              , '</tr>'].join(''));

              //单个重传
              tr.find('.demo-reload').on('click', function () {
                  obj.upload(index, file);
              });

              //删除
              tr.find('.demo-delete').on('click', function () {
                  delete files[index]; //删除对应的文件
                  tr.remove();
                  uploadListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
              });

              demoListView.append(tr);

          });
      }
      , done: function (res, index, upload) {
          if (res.code == 0) { //上传成功
              var tr = demoListView.find('tr#upload-' + index)
              , tds = tr.children();
              tds.eq(2).html('<span style="color: #5FB878;">上传成功</span>');
              tds.eq(3).html(''); //清空操作
              return delete this.files[index]; //删除文件队列已经上传成功的文件
          }
          this.error(index, upload);
      }
      , allDone: function (obj) {   //全部上传完成

          alert('全部上传完成!!');
      }
      , error: function (index, upload) {
          var tr = demoListView.find('tr#upload-' + index)
          , tds = tr.children();
          tds.eq(2).html('<span style="color: #FF5722;">上传失败</span>');
          tds.eq(3).find('.demo-reload').removeClass('layui-hide'); //显示重传
      }
    ,
    });


});

