$(document).ready(() => {
    CustomerCategory.InitalizeComponent();
});
namespace CustomerCategory {

    var dataSource: Array<P_D_SalesCustomerCategory> = new Array<P_D_SalesCustomerCategory>();
    var Model: P_D_SalesCustomerCategory = new P_D_SalesCustomerCategory();
    var Details: Array<P_D_SalesCustomerCategory> = new Array<P_D_SalesCustomerCategory>();

    var CustomersGrid: JsGrid = new JsGrid();
    var sys: SystemTools = new SystemTools();
    var _ScreenLang: string;
    var _CompCode: string;
    var _BraCode: string;
    var CountGrid = 0;
    var btnback: HTMLButtonElement;
    var btnsave: HTMLButtonElement;
    var btnAddDetails: HTMLButtonElement;
    var btnedite: HTMLButtonElement;



    export function InitalizeComponent() {

        SharedSession.CurrentPrivileges = GetPrivileges();
        SharedSession.CurrentEnvironment = GetSystemEnvironment();
        _ScreenLang = SharedSession.CurrentEnvironment.ScreenLanguage;
        _CompCode = SharedSession.CurrentEnvironment.CompCode;
        _BraCode = SharedSession.CurrentEnvironment.BranchCode;

        InitalizeControls();
        InitalizeEvents()
        Display();
    }
    function InitalizeControls() {
        btnAddDetails = document.getElementById("btnAddDetails") as HTMLButtonElement;
        btnedite = document.getElementById("btnedite") as HTMLButtonElement;
        btnsave = document.getElementById("btnsave") as HTMLButtonElement;
        btnback = document.getElementById("btnback") as HTMLButtonElement;

    }
    function InitalizeEvents() {

        btnAddDetails.onclick = AddNewRow;
        btnsave.onclick = btnsave_onClick;
        btnback.onclick = btnback_onclick;
        btnedite.onclick = btnedite_onclick;
    }



    function Display() {
        debugger
        CountGrid = 0;
        AjaxApi.CallsyncApi({
            type: "GET",
            url: sys.apiUrl("P_D_SalesCustomerCategory", "GetList"),            
            headers: {
                'Accept': 'application/json; charset=utf-8',
                'Content-Type': 'application/json'
            },         
            success: (d) => {
                debugger
                dataSource = d as Array<P_D_SalesCustomerCategory>;
                $("#div_Data").html("");
                for (var i = 0; i < dataSource.length; i++) {

                    BuildControls(CountGrid);
                    CountGrid++;
                    $("#txt_ID" + i).val(dataSource[i].CustomerCategoryID);
                    $("#txtCode" + i).val(dataSource[i].CustomerCatCode);
                    $("#txtDescA" + i).val(dataSource[i].DescA);
                    $("#txtDescL" + i).val(dataSource[i].DescE);
                    $("#txtRemarks" + i).val(dataSource[i].Remarks);
                    $("#txt_StatusFlag" + i).val("");
                }
                disableInputs();
            }
        });
    }

    function btnedite_onclick() {
        debugger
        EnableInputs();
    }
    function btnback_onclick() {
        Display();

    }
    function btnsave_onClick() {

        loading('btnsave');
        setTimeout(function () {

            finishSave('btnsave');

            var CanAdd: boolean = true;
            if (CountGrid > 0) {
                for (var i = 0; i < CountGrid; i++) {

                    CanAdd = Validation_Grid(i);
                    if (CanAdd == false) {
                        break;
                    }
                }
            }
            if (CanAdd) {
                Update();
            }
        }, 100);
    }

    function BuildControls(cnt: number) {
        var html;
        // 
        html = '<div id="No_Row' + cnt + '" class="col-lg-12" ><div class="col-lg-12"><span id="btn_minus' + cnt + '" class="glyphicon glyphicon-remove-sign fontitm3GenDefCustomerCat  minus_btn"></span><div class="col-lg-1 col-xs-2 style_pading"> <input id="txtCode' + cnt + '" type= "text" class="form-control right2 " disabled="disabled"/></div><div class="col-lg-4 col-xs-3 style_pading"> <input id="txtDescA' + cnt + '" type= "text" class="form-control right3" disabled="disabled"/></div><div class="col-lg-4 col-xs-3 style_pading"> <input id="txtDescL' + cnt + '" type= "text" class="form-control right4" disabled="disabled" /></div><div class="col-lg-2 col-xs-3 style_pading"> <input id="txtRemarks' + cnt + '" type= "text" class="form-control right4" disabled="disabled" /></div><div class="col-lg-12"> <input id = "txt_StatusFlag' + cnt + '" name = " " type = "hidden" disabled class="form-control"/></div><div class="col-lg-12"> <input id = "txt_ID' + cnt + '" name = " " type = "hidden" class="form-control"/></div></div></div>';
        $("#div_Data").append(html);

        $("#btn_minus" + cnt).on('click', function () {
            DeleteRow(cnt);
        });
        $("#txtCode" + cnt).on('change', function () {
            if ($("#txt_StatusFlag" + cnt).val() != "i")
                $("#txt_StatusFlag" + cnt).val("u");

            Validate_code(cnt);
        });

        $("#txtDescA" + cnt).on('change', function () {
            if ($("#txt_StatusFlag" + cnt).val() != "i")
                $("#txt_StatusFlag" + cnt).val("u");
        });
        $("#txtDescL" + cnt).on('change', function () {
            if ($("#txt_StatusFlag" + cnt).val() != "i")
                $("#txt_StatusFlag" + cnt).val("u");
        });

        if (SharedSession.CurrentPrivileges.Remove) {
            //$("#btn_minus" + cnt).removeClass("display_none");
            //$("#btn_minus" + cnt).removeAttr("disabled");

            $("#btn_minus" + cnt).addClass("display_none");
            $("#btn_minus" + cnt).attr("disabled", "disabled");
        }
        else {
            $("#btn_minus" + cnt).addClass("display_none");
            $("#btn_minus" + cnt).attr("disabled", "disabled");
        }

        return;
    }
    function DeleteRow(RecNo: number) {
        debugger
        if (!SharedSession.CurrentPrivileges.Remove) return;
        WorningMessage("هل تريد الحذف؟", "Do you want to delete?", "تحذير", "worning", () => {
            $("#No_Row" + RecNo).attr("hidden", "true");
            $("#txt_StatusFlag" + RecNo).val() == 'i' ? $("#txt_StatusFlag" + RecNo).val('m') : $("#txt_StatusFlag" + RecNo).val('d');
            $("#txtCode" + RecNo).val("000");
        });
    }
    function AddNewRow() {
        debugger
        if (!SharedSession.CurrentPrivileges.AddNew) return;

        var CanAdd: boolean = true;
        if (CountGrid > 0) {
            for (var i = 0; i < CountGrid; i++) {       
                CanAdd = Validation_Grid(i);
                if (CanAdd == false) {
                    break;
                }
            }
        }
        if (CanAdd) {
            BuildControls(CountGrid);
            $("#txt_StatusFlag" + CountGrid).val("i"); //In Insert mode 
            $("#txtCode" + CountGrid).removeAttr("disabled");
            $("#txtDescA" + CountGrid).removeAttr("disabled");
            $("#txtDescL" + CountGrid).removeAttr("disabled");
            $("#txtRemarks" + CountGrid).removeAttr("disabled");        
            $("#btn_minus" + CountGrid).removeClass("display_none");
            $("#btn_minus" + CountGrid).removeAttr("disabled");   
            CountGrid++;
        }                              
    }
    function Validation_Grid(rowcount: number) {

        if ($("#txt_StatusFlag" + rowcount).val() == "d" || $("#txt_StatusFlag" + rowcount).val() == "m") {
            return true;
        }
        else {
            if ($("#txtCode" + rowcount).val() == '') {
                WorningMessage('ادخل كود', 'Enter The code', 'خطاء', 'Erorr');
                Errorinput($("#txtCode" + rowcount));
                return false;

            }
            if ($("#txtDescA" + rowcount).val() == "" && $("#txtDescL" + rowcount).val() != "") {
                $("#txtDescA" + rowcount).val($("#txtDescL" + rowcount).val());
            }
            if ($("#txtDescL" + rowcount).val() == "" && $("#txtDescA" + rowcount).val() != "") {
                $("#txtDescL" + rowcount).val($("#txtDescA" + rowcount).val());
            }
        }
        return true;
    }
    function Validate_code(rowno: number) {

        for (var i = 0; i < CountGrid; i++) {
            if (i != rowno) {

                if ($("#txt_StatusFlag" + i).val() == "d" || $("#txt_StatusFlag" + i).val() == "m") {
                    return true;

                }
                else {

                    if ($("#txtCode" + rowno).val() == $("#txtCode" + i).val()) {
                        let Code = $("#txtCode" + rowno).val();
                        $("#txtCode" + rowno).val("");
                        WorningMessage("لا يمكن تكرار رقم الكود " + Code, "code cannot br repeated?", "تحذير", "worning", () => {
                            $("#txtCode" + rowno).val("");
                            return false;
                        });
                    }
                }
            }
        }

    }

    function EnableInputs() {
        for (var i = 0; i < CountGrid; i++) {
            $('#txtCode' + i).removeAttr('disabled');
            $('#txtDescA' + i).removeAttr('disabled');
            $('#txtDescL' + i).removeAttr('disabled');
            $('#txtRemarks' + i).removeAttr('disabled');
            $('#btn_minus' + i).removeAttr('disabled');
            $('#btn_minus' + i).removeClass('display_none');
        }
        $('#btnsave').removeClass('display_none');
        $('#btnback').removeClass('display_none');
        $('#btnedite').addClass('display_none');
        $('#btnAddDetails').removeClass('display_none');
    }
    function disableInputs() {
        for (var i = 0; i < CountGrid; i++) {
            $('#txtCode' + i).attr('disabled', 'disabled');
            $('#txtDescA' + i).attr('disabled', 'disabled');
            $('#txtDescL' + i).attr('disabled', 'disabled');
            $('#txtRemarks' + i).attr('disabled', 'disabled');
            $('#btn_minus' + i).attr('disabled', 'disabled');
            $('#btn_minus' + i).addClass('display_none');
        }
        $('#btnsave').addClass('display_none');
        $('#btnback').addClass('display_none');
        $('#btnAddDetails').addClass('display_none');
        $('#btnedite').removeClass('display_none');
    }


    function Assign() {
        var StatusFlag: String;
        Details = new Array<P_D_SalesCustomerCategory>();
        for (var i = 0; i < CountGrid; i++) {
            Model = new P_D_SalesCustomerCategory();

            StatusFlag = $("#txt_StatusFlag" + i).val();
            $("#txt_StatusFlag" + i).val("");



            if (StatusFlag == "i") {
                Model.StatusFlag = StatusFlag.toString();
                Model.CompCode = Number(SharedSession.CurrentEnvironment.CompCode);

                Model.CustomerCategoryID = 0;
                Model.CustomerCatCode = $("#txtCode" + i).val();
                Model.DescA = $("#txtDescA" + i).val();
                Model.DescE = $("#txtDescL" + i).val();
                Model.Remarks = $("#txtRemarks" + i).val();

                Details.push(Model);
            }
            if (StatusFlag == "u") {
                Model.StatusFlag = StatusFlag.toString();
                Model.CompCode = Number(SharedSession.CurrentEnvironment.CompCode);

                Model.CustomerCategoryID = Number($("#txt_ID" + i).val());
                Model.CustomerCatCode = $("#txtCode" + i).val();
                Model.DescA = $("#txtDescA" + i).val();
                Model.DescE = $("#txtDescL" + i).val();
                Model.Remarks = $("#txtRemarks" + i).val();

                Details.push(Model);
            }
            if (StatusFlag == "d") {
                if ($("#txt_ID" + i).val() != "") {
                    Model.CustomerCategoryID = Number($("#txt_ID" + i).val());
                    Model.StatusFlag = StatusFlag.toString();
                }
                Details.push(Model);
            }
        }
    }
    function Update() {       
        if (SharedSession.CurrentPrivileges.EDIT == true) {
            Assign();
            
            AjaxApi.CallsyncApi({      
                type: "POST",
                url: sys.apiUrl("P_D_SalesCustomerCategory", "UpdateLst"),                 
                data: JSON.stringify(Details),
                headers: {
                    'Accept': 'application/json; charset=utf-8',
                    'Content-Type': 'application/json'
                },      
                success: (d) => {  
                    let result = d as BaseResponse;
                    if (result.IsSuccess == true) {
                        MessageBox.Show("Saved", "Success");
                        Display();
                    } else {
                        MessageBox.Show("Error", "Error");
                    }
                }
            });

        }
        else {
            if (_ScreenLang == "ar") {
                MessageBox.Show("لا يوجد صلاحية للتعديل", "خطأ");
            }
            else {
                MessageBox.Show("No permission for Editing", "Error");
            }
        }

    }
    function finishSave(NameBtn: string) {
        setTimeout(function () {
            $('#' + NameBtn + '').removeAttr('disabled');

        }, 100);
    }

}