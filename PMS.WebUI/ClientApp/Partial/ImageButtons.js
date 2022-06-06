$(document).ready(function () {
    ImageButtons.OnLoad();
});
var ImageButtons;
(function (ImageButtons) {
    var UploadImage;
    var btnDownload;
    var btnPrevious;
    var btmbtnNext;
    var btnDelete;
    var StartIndex;
    var EndIndex;
    var StInd = 0;
    var stg_path;
    var img;
    var UploadImg = true;
    var currentpriv;
    var CurrentEnv;
    var sys = new SystemTools();
    var _CompCode;
    ;
    var _BranchCode;
    var _ModuleCode;
    var _TrNo;
    var _CountItems = 1;
    var _Path = "";
    var DataSourceImg;
    function OnLoad() {
        CurrentEnv = SharedSession.CurrentEnvironment = GetSystemEnvironment();
        currentpriv = SharedSession.CurrentPrivileges.EditImages;
        _CompCode = $("#btnCompCode").val();
        _BranchCode = $("#btnBranch").val();
        _ModuleCode = $("#btnmoduleCode").val();
        _TrNo = $("#btnTrNo").val();
        debugger;
        if (!IsNullOrEmpty(_TrNo)) {
            InitalizeComponent();
            InitalizeEvents();
            GetImgListForCurentTrNo();
        }
        if (currentpriv == false) {
            $("#UploadImage").attr("disabled", "disabled");
            $("#btnDelete").attr("disabled", "disabled");
        }
        else {
            $("#UploadImage").removeAttr("disabled");
            $("#btnDelete").removeAttr("disabled");
        }
    }
    ImageButtons.OnLoad = OnLoad;
    function InitalizeComponent() {
        img = DocumentActions.GetElementById("img");
        UploadImage = document.getElementById("UploadImage");
        btnDownload = document.getElementById("btnDownload");
        btnPrevious = document.getElementById("btnPrevious");
        btmbtnNext = document.getElementById("btmbtnNext");
        btnDelete = document.getElementById("btnDelete");
        StartIndex = document.getElementById("StartIndex");
        EndIndex = document.getElementById("EndIndex");
    }
    ImageButtons.InitalizeComponent = InitalizeComponent;
    function InitalizeEvents() {
        UploadImage.onchange = UploadImage_onchange;
        btnDownload.onclick = btnDownload_onclick;
        btnPrevious.onclick = btnPrevious_onclick;
        btmbtnNext.onclick = btmbtnNext_onclick;
        btnDelete.onclick = btnDelete_onclick;
    }
    function btnDownload_onclick() {
        debugger;
        var a = $("<a>")
            .attr("href", img.src)
            .attr("download", "img.png")
            .appendTo("body");
        a[0].click();
        a.remove();
    }
    function btmbtnNext_onclick() {
        //Next Img
        debugger;
        if (DataSourceImg.length != 0) {
            if (DataSourceImg.length == StartIndex.innerText) {
                StInd = 0;
                StartIndex.innerText = (StInd + 1).toString();
                img.src = DataSourceImg[StInd].IncodeImg;
                $("#boxImg").attr("href", DataSourceImg[StInd].IncodeImg);
                stg_path = DataSourceImg[StInd].Name;
            }
            else {
                StInd++;
                StartIndex.innerText = (StInd + 1).toString();
                img.src = DataSourceImg[StInd].IncodeImg;
                $("#boxImg").attr("href", DataSourceImg[StInd].IncodeImg);
                stg_path = DataSourceImg[StInd].Name;
            }
        }
    }
    function btnPrevious_onclick() {
        //Previous Img
        debugger;
        if (DataSourceImg.length != 0) {
            if (StInd == 0) {
                StInd = DataSourceImg.length - 1;
                StartIndex.innerText = (StInd + 1).toString();
                img.src = DataSourceImg[StInd].IncodeImg;
                $("#boxImg").attr("href", DataSourceImg[StInd].IncodeImg);
                stg_path = DataSourceImg[StInd].Name;
            }
            else {
                StInd--;
                StartIndex.innerText = (StInd + 1).toString();
                img.src = DataSourceImg[StInd].IncodeImg;
                $("#boxImg").attr("href", DataSourceImg[StInd].IncodeImg);
                stg_path = DataSourceImg[StInd].Name;
            }
        }
    }
    function btnDelete_onclick() {
        MessageBox.Ask("هل أنت متأكد من حذف البيان", "حذف", function () {
            $.ajax({
                type: "POST",
                url: sys.apiUrl("SystemTools", "DeleteImg"),
                data: JSON.stringify(stg_path),
                headers: {
                    'Accept': 'application/json; charset=utf-8',
                    'Content-Type': 'application/json'
                },
                cache: false,
                async: false,
                success: function (d) {
                    var result = d;
                    if (result.IsSuccess == true) {
                        debugger;
                        GetImgListForCurentTrNo();
                    }
                }
            });
        }, function () { });
    }
    function UploadImage_onchange() {
        debugger;
        var _MaxSize = GetMAxImgSize(Number(_CompCode), Number(_BranchCode));
        debugger;
        if ((UploadImage.files[0].size / 1024) > _MaxSize) {
            WorningMessage("حجم الصورة أكبر من الحجم المحدد", "The image size is larger than the specified size");
            UploadImg = false;
            return;
        }
        UploadImg = true;
        var reader = new FileReader();
        reader.readAsDataURL(UploadImage.files[0]);
        reader.onload = function (_event) {
            img.src = reader.result.toString();
            FileUpload();
            GetImgListForCurentTrNo();
        };
    }
    function GetImgListForCurentTrNo() {
        $.ajax({
            type: "GET",
            url: sys.apiUrl("SystemTools", "GetImgListForCurentTrNo"),
            data: { Comp: _CompCode, Branch: _BranchCode, ModuleCode: _ModuleCode, TrNo: _TrNo },
            dataType: 'json',
            cache: false,
            headers: { 'Accept': 'application/json; charset=utf-8', 'Content-Type': 'application/json' },
            success: function (d) {
                var result = d;
                if (result.IsSuccess == true) {
                    debugger;
                    DataSourceImg = result.Response;
                    EndIndex.innerText = DataSourceImg.length;
                    if (DataSourceImg.length > 0) {
                        StartIndex.innerText = "1";
                        img.src = DataSourceImg[0].IncodeImg;
                        $("#boxImg").attr("href", DataSourceImg[StInd].IncodeImg);
                        stg_path = DataSourceImg[0].Name;
                    }
                    else {
                        StartIndex.innerText = "0";
                        img.src = "#";
                    }
                }
            }
        });
    }
    function FileUpload() {
        if (UploadImg) {
            var file = UploadImage.files[0];
            var formData = new FormData();
            if (file != null) {
                //FileName
                formData.append('UploadedImage', file, _TrNo.toString());
                formData.append('Comp', file, CurrentEnv.CompCode);
                formData.append('Branch', file, CurrentEnv.BranchCode);
                formData.append('MouleCode', file, _ModuleCode);
                $.ajax({
                    type: "POST",
                    url: sys.apiUrl("SystemTools", "UploadImage"),
                    data: formData,
                    dataType: 'json',
                    contentType: false,
                    processData: false,
                    async: false,
                    success: function (d) {
                        var result = d;
                        if (result.IsSuccess == true) {
                        }
                    }
                });
            }
        }
    }
    function PreviewImage() {
        var reader = new FileReader();
        reader.readAsDataURL(UploadImage.files[0]);
        reader.onload = function (_event) {
            img.src = reader.result.toString();
        };
    }
})(ImageButtons || (ImageButtons = {}));
//# sourceMappingURL=ImageButtons.js.map