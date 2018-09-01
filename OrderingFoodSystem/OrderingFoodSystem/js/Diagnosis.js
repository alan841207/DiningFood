$(function () {
        var url = window.location.search;
        //获取请求参数
        var parms = url.substring(url.lastIndexOf('=') + 1, url.length);
      
        var html = "";

        $.ajax({
        type: 'POST',
        url: '/Upload/GetUuidDetail',
        data: parms,
        success: function (result) {
            for (var i in result) {
                html += "<tr><td>" + i + "</td><td><img src='" + result[i].filePath.replace('~', '..').replace('.dcm','.png') + "' width='50',height='30'></td><td>" + result[i].dicFileName + "</td><td>" + result[i].hospitalName + "</td><td>" + result[i].fileType + "</td><td>" + result[i].pesonName + "</td><td><a href='" + result[i].filePath.replace('~', '..') + "'>下载此文件</a></td></tr>";
            }
            $('#personDetailId').append(html);
        }
    });




     $('#submitReportId').click(function () {
            var data = "uuid=" + parms + "&ctId=" + $('#formCtId').val() + "&UserName=" + $('#formUserName').text() + "&Sex=" + $('#formSex').text() + "&Age=" + $('#formAge').text() + "&AcquisitionDate=" + $('#formAcquisitionDate').text() + "&Division=" + $('#divisionId').val() + "&Area=" + $('#areaId').val() + "&Bed=" + $('#bedId').val() + "&ReportDate=" + $('#formReportDate').text() + "&Manufacturer=" + $('#formManufacturer').text() + "&noId=" + $('#noId').val() + "&NuclearDate=" + $('#formNuclearDate').text() + "&clinical=" + $('#clinicalId').val() + "&checkName=" + $('#checkNameId').val() + "&technology=" + $('#technologyId').val() + "&ImagingPerformance=" + $('#ImagingPerformanceId').val() + "&Imagingdiagnosis=" + $('#ImagingdiagnosisId').val() + "&Doctor=" + $('#formDoctor').text() + "&HosptailName=" + $('#formHosptailNameId').text();

              //var data ={"uuid":parms,"ctid": $('#ctId').text(),"UserName":$('#formUserName').text(),"Sex":$('#formSex').text(),"Age" :$('#formAge').text(),"AcquisitionDate": $('#formAcquisitionDate').text(),"Division": $('#divisionId').text(), "Area" : $('#areaId').text(), "Bed":$('#bedId').text(), "ReportDate": $('#formReportDate').text(), "Manufacturer" :$('#formManufacturer').text(), "noId": $('#noId').text() + "&NuclearDate=" + $('#formNuclearDate').text() + "&clinicalId=" + $('#clinicalId').text() + "&checkName=" + $('#checkNameId').text() + "&technology=" + $('#technologyId').text() + "&ImagingPerformance=" + $('#ImagingPerformanceId').text() + "&Imagingdiagnosis=" + $('#ImagingdiagnosisId').text() + "&Doctor=" + $('#formDoctor').text();
           

            $.getJSON("/DicomReport/AddReport?" + data, {}, function (result, status) {
                if (result== "ok") {
                    alert("诊断完成!!!");
                    location.href = "/DicDataQuery/Index";
                }
                else
                {
                    alert("数据保存异常,请检查相关数据");
                    return;
                }
            })
        });
});

function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);
    var ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
    var dataURL = canvas.toDataURL("image/" + ext);
    return dataURL;
}
var img = "http://localhost:11235/DcmFile/第四人民医院/OTHER/WANG TING AN/1434643_2.png";
var image = new Image();
image.src = img;
image.onload = function () {
    var base64 = getBase64Image(image);
    console.log(base64);
}