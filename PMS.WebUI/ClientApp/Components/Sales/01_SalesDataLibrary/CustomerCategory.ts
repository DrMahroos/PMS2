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
    var btnEdit: HTMLButtonElement;
    export function InitalizeComponent() {
        
        SharedSession.CurrentPrivileges = GetPrivileges();
        SharedSession.CurrentEnvironment = GetSystemEnvironment();
        _ScreenLang = SharedSession.CurrentEnvironment.ScreenLanguage;
        _CompCode = SharedSession.CurrentEnvironment.CompCode;
        _BraCode = SharedSession.CurrentEnvironment.BranchCode;
         
        InitalizeControls();
        InitalizeEvents()
        loadCustomerCategories();
    }
    
     function InitalizeControls() {
                 btnAddDetails = document.getElementById("btnAddDetails") as HTMLButtonElement;
        btnEdit = document.getElementById("btnedite") as HTMLButtonElement;
        btnsave = document.getElementById("btnsave") as HTMLButtonElement;
        btnback = document.getElementById("btnback") as HTMLButtonElement;
 
    }
    function InitalizeEvents() {

        btnAddDetails.onclick = AddNewRow; 
        btnsave.onclick = btnsave_onClick;
        btnback.onclick = btnback_onclick;
    }

    function loadCustomerCategories() {
        
        Ajax.CallAsync({
            url: Url.Action("getCustomerCategories", "CustomerCategory"),
            success: (d) => {
                debugger
                dataSource = d.result as Array<P_D_SalesCustomerCategory>;
                DisplayGenDefCategory();
 
            }
        });
    }

    function Assign() {
        var StatusFlag: String;
        debugger
        for (var i = 0; i < CountGrid; i++) {
            Model = new P_D_SalesCustomerCategory();

            StatusFlag = $("#txt_StatusFlag" + i).val();
            $("#txt_StatusFlag" + i).val("");



            if (StatusFlag == "i") {
                Model.StatusFlag = StatusFlag.toString();
                Model.CustomerCategoryID = 0;
                Model.CompCode = Number(SharedSession.CurrentEnvironment.CompCode);
  
                Model.Remarks = $("#txtRemarks" + i).val();
                Model.CustomerCatCode = $("#txtCode" + i).val();
                if ($("#txtDescA" + i).val() == "") {
                    Model.DescA = $("#txtDescL" + i).val();
                    $("#txtDescA" + i).val($("#txtDescL" + i).val());
                }
                else {
                    Model.DescE = $("#txtDescA" + i).val();
                }
                if ($("#txtDescL" + i).val() == "") {
                    Model.DescE = $("#txtDescA" + i).val();
                    $("#txtDescL" + i).val($("#txtDescA" + i).val());
                }
                else {
                    Model.DescE = $("#txtDescL" + i).val();
                }
                 
                Details.push(Model);




                //Model.CompCode = Number(compcode);
            }
            if (StatusFlag == "u") {


                var UpdatedDetail = dataSource.filter(x => x.CustomerCategoryID == $("#txt_ID" + i).val())
                 
               // UpdatedDetail[0].StatusFlag = StatusFlag.toString();
                UpdatedDetail[0].CustomerCatCode = $("#txtCode" + i).val();
                UpdatedDetail[0].Remarks = $("#txtRemarks" + i).val();
                
                if ($("#txtDescA" + i).val() == "") {
                    UpdatedDetail[0].DescA = $("#txtDescL" + i).val();
                    $("#txtDescA" + i).val($("#txtDescL" + i).val());
                }
                else {
                    UpdatedDetail[0].DescA = $("#txtDescA" + i).val();
                }
                if ($("#txtDescL" + i).val() == "") {
                    UpdatedDetail[0].DescE = $("#txtDescA" + i).val();
                    $("#txtDescL" + i).val($("#txtDescA" + i).val());
                }
                else {
                    UpdatedDetail[0].DescE = $("#txtDescL" + i).val();
                }
                 
                    
                 
            }
            if (StatusFlag == "d") {
                if ($("#txt_ID" + i).val() != "") {
                    var UpdatedDetail = dataSource.filter(x => x.CustomerCategoryID == $("#txt_ID" + i).val())
                    UpdatedDetail[0].StatusFlag = StatusFlag.toString();
                }

            }

            Details.push(UpdatedDetail[0]);



        }
    }
 
    //function Update() {
        
    //    if (SharedSession.CurrentPrivileges.EDIT == true) {


    //         Ajax.CallAsync({
    //            data: CustCat,
    //            success: (d) => {
                    
    //                let result = d.result as ResponseResult;
    //                if (result.ResponseState == false) {
    //                    MessageBox.Show(result.ResponseMessage, "Update");
    //                }
    //                loadCustomerCategories();
    //            }
    //        });
    //    }
    //    else {
    //        if (_ScreenLang == "ar") {
    //            MessageBox.Show("لا يوجد صلاحية للتعديل", "خطأ");
    //        }
    //        else {
    //            MessageBox.Show("No permission for Editing", "Error");
    //        }
    //    }
    //}
    function Update() {
        if (SharedSession.CurrentPrivileges.EDIT == true) {
            Assign();
            debugger

            AjaxApi.CallAsyncApi({
                url: sys.apiUrl("P_D_SalesCustomerCategory", "UpdateLst"),
                data: (Details),
                success: (d) => {

                    let result = d as BaseResponse;
                    if (result.IsSuccess == true) {
                        if (SharedSession.CurrentEnvironment.ScreenLanguage == "ar") {
                            MessageBox.Show("تم الحفظ", "");
                        } else {
                            MessageBox.Show("Done", "");
                        }

                        btnback_onclick();
                        refresh();
                    }
                    else {

                        MessageBox.Show(result.ErrorMessage, "خطأ");
                    }
                }
            })
            //Ajax.Callsync({

            //    type: "POST",
            //    url: sys.apiUrl("P_D_SalesCustomerCategory", "UpdateLst"),
            //    data: (Details),
            //    success: (d) => {

            //        let result = d as BaseResponse;
            //        if (result.IsSuccess == true) {
            //            if (SharedSession.CurrentEnvironment.ScreenLanguage == "ar") {
            //                MessageBox.Show("تم الحفظ", "");
            //            } else {
            //                MessageBox.Show("Done", "");
            //            }

            //            btnback_onclick();
            //            refresh();
            //        }
            //        else {

            //            MessageBox.Show(result.ErrorMessage, "خطأ");
            //        }
            //    }
            //});

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
    function Delete(e: JsGridDeleteEventArgs) {

        if (SharedSession.CurrentPrivileges.Remove == true) {
            let CustCat = e.Item as P_D_SalesCustomerCategory;
            Ajax.CallAsync({
                url: Url.Action("Delete", "CustomerCategory"),
                data: CustCat,
                success: (d) => {
                    let result = d.result as ResponseResult;
                    if (result.ResponseState == false) {
                        MessageBox.Show(result.ResponseMessage, "Delete");
                    }
                    loadCustomerCategories();
                }
            });
        }
        else {
            if (_ScreenLang == "ar") {
                MessageBox.Show("لا يوجد صلاحية للحذف", "خطأ");
            }
            else {
                MessageBox.Show("No permission for Deleting", "Error");
            }
        }
    }
    function DisplayGenDefCategory() {
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
        $("#txtAcount_Code" + cnt).on('change', function () {
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

        if (!SharedSession.CurrentPrivileges.Remove) return;
        WorningMessage("هل تريد الحذف؟", "Do you want to delete?", "تحذير", "worning", () => {



            $("#No_Row" + RecNo).attr("hidden", "true");
            $("#txt_StatusFlag" + RecNo).val() == 'i' ? $("#txt_StatusFlag" + RecNo).val('m') : $("#txt_StatusFlag" + RecNo).val('d');
            $("#txtCode" + RecNo).val("000");
        });
    }

    function btnback_onclick() {

        $('#btnAddDetails').toggleClass("display_none");
        $('#btnsave').toggleClass("display_none");
        $('#btnback').toggleClass("display_none");
        $("#div_ContentData :input").attr("disabled", "true");
        $(".minus_btn").addClass("display_none");
        $("#btnedite").removeClass("display_none");
        $("#btnedite").removeAttr("disabled");

        CountGrid = 0;
        $("#div_Data").html("");
        //Display();

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

    function refresh() {

        $('#div_Data').html("");

        CountGrid = 0;

        loadCustomerCategories();

    }

    function Validation_Grid(rowcount: number) {
         
        if ($("#txt_StatusFlag" + rowcount).val() == "d" || $("#txt_StatusFlag" + rowcount).val() == "m") {
            return true;
        }
        else {

            if ($("#txtDescA" + rowcount).val() == "") {
                $("#txtDescA" + rowcount).val($("#txtDescL" + rowcount).val());
            }
            if ($("#txtDescL" + rowcount).val() == "") {
                $("#txtDescL" + rowcount).val($("#txtDescL" + rowcount).val());
            }

            if ($("#txtCode" + rowcount).val() == '') {

                WorningMessage('ادخل كود', 'Enter The code', 'خطاء', 'Erorr');
                Errorinput($("#txtCode" + rowcount));
                return false;

            }
            if ((_ScreenLang == "ar" ? $("#txtDescA" + rowcount).val() : $("#txtDescL" + rowcount).val()) == '') {

                WorningMessage('ادخل الوصف ', 'Enter The Description', 'خطاء', 'Erorr');
                Errorinput((_ScreenLang == "ar" ? $("#txtDescA" + rowcount) : $("#txtDescL" + rowcount)));
                return false;

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
        if ($("#txt_StatusFlag" + rowno).val() != "i") $("#txt_StatusFlag" + rowno).val("u");
        return true;
    }
    function Errorinput(input: any) {

        if (input.selector != null) {

            $('' + input.selector + '').addClass('text_Mandatory');
            $('' + input.selector + '').focus();
            setTimeout(function () { $('' + input.selector + '').removeClass('text_Mandatory'); }, 5000);
        }
        else {
            input.classList.add('text_Mandatory');
            input.focus();
            setTimeout(function () { input.classList.remove('text_Mandatory'); }, 5000);
        }

    }

    function loading(NameBtn: string) {
        $('#' + NameBtn + '').attr('disabled', 'disabled');
    }
    function finishSave(NameBtn: string) {
        setTimeout(function () {
            $('#' + NameBtn + '').removeAttr('disabled');

        }, 100);
    }
    function AddNewRow() {
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

            $("#btnedite").removeClass("display_none");

            CountGrid++;
        }
        $("#btnedite").addClass("display_none");
    }

}