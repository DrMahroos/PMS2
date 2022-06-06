$(document).ready(function () {
    Customers.InitalizeComponent();
});
var Customers;
(function (Customers) {
    var sys = new SystemTools();
    var CodesTypes = new Array();
    var Nationalty = new Array();
    var ajaxCall = new AjaxCaller();
    var cust = new Array();
    var DataSource = new Array();
    var NewDataSource = new Array();
    var CatCode = new P_D_SalesEgineer();
    var ControllerName = "Customers";
    var TableName = "P_D_SalesCustomer";
    var FieldKey = "CustomerID";
    var Master_ = new P_D_SalesCustomer();
    var Master = new M_D_SalesCustomer();
    var SalesCustomerDoc = new P_D_SalesCustomerDoc();
    var Details = new Array();
    var Grid = new JsGrid();
    var ajaxCall = new AjaxCaller();
    var sys = new SystemTools();
    var Area = new G_BRANCH();
    var _ScreenLang;
    var _CompCode;
    var _BraCode;
    var Docmet = new Array();
    var GetCustomerDoc = new Array();
    var Cust = new P_D_SalesCustomerCategory();
    var txtCustomerCode;
    var txtCustomerCategoryID;
    var btnCustomerCode;
    var txtIsActive;
    var txtVatType;
    var txtCustomerID;
    var txtDescE;
    var txtMobile;
    var txtDescA;
    var txtIsTemporary;
    var txtEmail;
    var txtContactTel;
    var txtTel1;
    var txtTel2;
    var txtContactPerson;
    var txtFax;
    var txtCustomercCode;
    var btnCustomerCat;
    var txtCustomerName1;
    var txtCrNo;
    var btnArea;
    var txtBraCode;
    var txtAreaName;
    var txtChamberNo;
    var txtSalesEngineerId;
    var txtSalesEngineerCode;
    var butEngCode;
    var btnAddDetails;
    var txtEngName;
    var txtVatNo;
    var txt_Country;
    var Count = 0;
    var Countgerd = 0;
    var _customerId;
    var SlsEngId;
    var CustomerCatId;
    var CountGrid = 0;
    var Newcount = 0;
    //var customers: Array<P_D_SalesCustomer> = new Array<P_D_SalesCustomer>();
    function InitalizeComponent() {
        SharedSession.CurrentPrivileges = GetPrivileges();
        SharedSession.CurrentEnvironment = GetSystemEnvironment();
        _ScreenLang = SharedSession.CurrentEnvironment.ScreenLanguage;
        _CompCode = SharedSession.CurrentEnvironment.CompCode;
        _BraCode = SharedSession.CurrentEnvironment.BranchCode;
        InitalizeGrid();
        InitalizeControls();
        InitalizeEvents();
        ajaxCall.ControllerName = "Customers";
        SharedSession.CurrentEnvironment.ScreenLanguage = SharedSession.CurrentEnvironment.Language;
        NavigatorComponent.InitalizeComponent();
        ClientSharedWork.OnNavigate = Navigate;
        ControlsButtons.AddAction(Add);
        ControlsButtons.UndoAction(function () { });
        ControlsButtons.SaveAction(function () {
            if (ClientSharedWork.CurrentMode == ScreenModes.Add)
                Insert();
            else if (ClientSharedWork.CurrentMode == ScreenModes.Edit)
                Update();
        });
        ControlsButtons.EditAction(Edit);
        ControlsButtons.DeleteAction(Delete);
        ControlsButtons.UndoAction(ClearItem);
        ControlsButtons.PrintButton.disabled = false;
        ControlsButtons.PrintAction(function () { OpenReportsPopup("_SLsCustomerCard"); });
        $("#ImageEditorButton").on("click", function () {
            sys.ImgPopup(_CompCode, _BraCode, Modules.Customers, Master.P_D_SalesCustomer.CustomerID.toString());
        });
        GetCusType();
        GETNationalty();
    }
    Customers.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        // Initialize TextBoxs 
        txtCustomerCategoryID = DocumentActions.GetElementById("txtCustomerCategoryID");
        txtCustomerCode = DocumentActions.GetElementById("txtCustomerCode");
        btnCustomerCode = DocumentActions.GetElementById("btnCustomerCode");
        txtIsActive = DocumentActions.GetElementById("txtIsActive");
        txtVatType = DocumentActions.GetElementById("txtVatType");
        txtDescE = DocumentActions.GetElementById("txtDescE");
        txtMobile = DocumentActions.GetElementById("txtMobile");
        txtDescA = DocumentActions.GetElementById("txtDescA");
        txtIsTemporary = DocumentActions.GetElementById("txtIsTemporary");
        txtEmail = DocumentActions.GetElementById("txtEmail");
        txtContactTel = DocumentActions.GetElementById("txtContactTel");
        txtTel1 = DocumentActions.GetElementById("txtTel1");
        txtTel2 = DocumentActions.GetElementById("txtTel2");
        txtContactPerson = DocumentActions.GetElementById("txtContactPerson");
        txtFax = DocumentActions.GetElementById("txtFax");
        txtCustomercCode = DocumentActions.GetElementById("txtCustomercCode");
        btnCustomerCat = DocumentActions.GetElementById("btnCustomerCat");
        txtCrNo = DocumentActions.GetElementById("txtCrNo");
        btnArea = DocumentActions.GetElementById("btnArea");
        txtBraCode = DocumentActions.GetElementById("txtBraCode");
        txtAreaName = DocumentActions.GetElementById("txtAreaName");
        txtChamberNo = DocumentActions.GetElementById("txtChamberNo");
        txtSalesEngineerId = DocumentActions.GetElementById("txtSalesEngineerId");
        txtSalesEngineerCode = DocumentActions.GetElementById("txtSalesEngineerCode");
        butEngCode = DocumentActions.GetElementById("butEngCode");
        btnAddDetails = DocumentActions.GetElementById("btnAddDetails");
        txtEngName = DocumentActions.GetElementById("txtEngName");
        txtCustomerName1 = DocumentActions.GetElementById("txtCustomerName1");
        txtCustomerID = DocumentActions.GetElementById("txtCustomerID");
        txtVatNo = DocumentActions.GetElementById("txtVatNo");
        txt_Country = DocumentActions.GetElementById("txt_Country");
    }
    function InitalizeEvents() {
        btnCustomerCode.onclick = btnCustomerCode_Clicked;
        btnArea.onclick = btnBraCode_Click;
        butEngCode.onclick = btnEng_Click;
        btnCustomerCat.onclick = btnCustomerCat_Click;
        txtIsTemporary.onchange = txtIsTemporary_onchange;
        txtVatType.onchange = txtVatType_onchange;
        btnAddDetails.onclick = AddNewRow;
    }
    function txtVatType_onchange() {
        if (txtVatType.checked == false) {
            txtVatNo.disabled = true;
            txtVatNo.value = "";
        }
        else {
            txtVatNo.disabled = false;
        }
    }
    function txtIsTemporary_onchange() {
        //if (txtIsTemporary.checked == false)
        //    $("#txtIsTemporary").attr("disabled", "disabled");
    }
    function btnCustomerCode_Clicked() {
        sys.FindKey(Modules.Customers, "btnCustomerCode", "CompCode = " + _CompCode, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetByID", ControllerName),
                data: { id: id },
                success: function (d) {
                    Master.P_D_SalesCustomer = d.result;
                    _customerId = Master.P_D_SalesCustomer.CustomerID;
                    txtCustomerCode.value = Master.P_D_SalesCustomer.CustomerCode.toString();
                    var Index = GetIndexByUseId(Number(Master.P_D_SalesCustomer.CustomerID), TableName, FieldKey, " CompCode = " + _CompCode);
                    NavigateToSearchResultKey(Number(Index), Navigate);
                }
            });
        });
    }
    function btnBraCode_Click() {
        sys.FindKey(Modules.Customers, "btnArea", "COMP_CODE = " + _CompCode, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getArea", ControllerName),
                data: { id: id },
                success: function (d) {
                    Area = d.result;
                    txtBraCode.value = Area.BRA_CODE.toString();
                    txtAreaName.value = _ScreenLang == "ar" ? Area.BRA_DESCL : Area.BRA_DESCE;
                }
            });
        });
    }
    function btnEng_Click() {
        sys.FindKey(Modules.Customers, "butEngCode", "CompCode = " + _CompCode, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getSalesEng", ControllerName),
                data: { id: id },
                success: function (d) {
                    CatCode = d.result;
                    SlsEngId = CatCode.SalesEngineerId;
                    txtSalesEngineerId.value = CatCode.SalesEngineerId.toString();
                    txtSalesEngineerCode.value = CatCode.EngCode.toString();
                    txtEngName.value = _ScreenLang == "ar" ? CatCode.DeacA.toString() : CatCode.DescE.toString();
                }
            });
        });
    }
    function btnCustomerCat_Click() {
        //Customer Category
        sys.FindKey(Modules.Customers, "btnCustomerCat", "CompCode = " + _CompCode, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("CustomerCode", ControllerName),
                data: { _id: id },
                success: function (d) {
                    Cust = d.result;
                    txtCustomerCategoryID.value = Cust.CustomerCategoryID.toString();
                    CustomerCatId = Cust.CustomerCategoryID;
                    txtCustomercCode.value = Cust.CustomerCatCode;
                    txtCustomerName1.value = _ScreenLang == "ar" ? Cust.DescA : Cust.DescE;
                }
            });
        });
    }
    function Navigate() {
        Ajax.CallAsync({
            url: Url.Action("GetByIndex", ControllerName),
            success: function (d) {
                Master.P_D_SalesCustomer = d.result;
                Display();
            }
        });
    }
    function Display() {
        DocumentActions.RenderFromModel(Master.P_D_SalesCustomer);
        getArea();
        getEngCode();
        getCatCategory();
        DisplayDetails();
        BindGetCustomerDocGridData();
        if (Master.P_D_SalesCustomer.VatType == 1) {
            txtVatType.checked = true;
        }
        else {
            txtVatType.checked = false;
        }
        var RefCode1 = Master.P_D_SalesCustomer.RefCode1;
        $('#txt_Country').val(RefCode1);
    }
    function getArea() {
        Ajax.CallAsync({
            url: Url.Action("getArea", ControllerName),
            data: { id: Number(txtBraCode.value) },
            success: function (d) {
                Area = d.result;
                if (Area != null) {
                    txtAreaName.value = _ScreenLang == "ar" ? Area.BRA_DESCL : Area.BRA_DESCE;
                }
            }
        });
    }
    function getEngCode() {
        Ajax.CallAsync({
            url: Url.Action("getSalesEng", ControllerName),
            data: { id: Number(Master.P_D_SalesCustomer.SalesEngineerId) },
            success: function (d) {
                CatCode = d.result;
                if (CatCode != null) {
                    txtSalesEngineerId.value = CatCode.SalesEngineerId.toString();
                    txtSalesEngineerCode.value = CatCode.EngCode;
                    txtEngName.value = _ScreenLang == "ar" ? CatCode.DeacA : CatCode.DescE;
                }
            }
        });
    }
    function getCatCategory() {
        Ajax.CallAsync({
            url: Url.Action("CustomerCode", ControllerName),
            data: { _id: Number($("#txtCustomerCategoryID").val()) },
            success: function (d) {
                Cust = d.result;
                if (Cust != null) {
                    txtCustomercCode.value = Cust.CustomerCatCode;
                    txtCustomerName1.value = _ScreenLang == "ar" ? Cust.DescA : Cust.DescE;
                }
            }
        });
    }
    function DisplayDetails() {
        Ajax.CallAsync({
            url: Url.Action("LoadDetails", ControllerName),
            data: { id: Number(Master.P_D_SalesCustomer.CustomerID) },
            success: function (d) {
                Details = d.result;
                Grid.DataSource = Details;
                Grid.Bind();
                // getDco();
            }
        });
    }
    function Add() {
        ClearItem();
        txtCustomerID.value = "0";
        txtCustomerCode.value = "";
        txtVatType.checked = true;
        txtIsTemporary.checked = false;
        txtCustomerCode.disabled = true;
        ClearGrid(Grid, Details);
        Details = new Array();
        $("#btnAddDetails").removeClass("display_none");
        $("#data_lebel").html('');
    }
    function Edit() {
        if (txtIsTemporary.checked == false) {
            //$("#txtIsTemporary").attr("disabled", "disabled");
        }
        else {
            //$("#txtIsTemporary").removeAttr("disabled");
        }
        for (var i = 0; i < CountGrid; i++) {
            $("#btn_minus3" + i).removeClass("display_none");
            $("#btn_minus3" + i).removeAttr("disabled");
        }
        $("#btnAddDetails").removeClass("display_none");
        for (var i = 0; i < Docmet.length; i++) {
            $("#CustomerDocID" + i).removeAttr("disabled");
            $("#CusIDTypeCode" + i).removeAttr("disabled");
            $("#IDNo" + i).removeAttr("disabled");
            $("#IDIssuePlace" + i).removeAttr("disabled");
            $("#IDIssueDate" + i).removeAttr("disabled");
            $("#IDIssueDateH" + i).removeAttr("disabled");
            $("#IDExpireDate" + i).removeAttr("disabled");
            $("#IDExpireDateH" + i).removeAttr("disabled");
        }
    }
    function Delete() {
        Assign();
        ajaxCall.Delete(Master.P_D_SalesCustomer, function (result) {
            txtCustomerID.value = "";
            ClearItem();
        });
    }
    function Insert() {
        Assign();
        if (!ValidData())
            return;
        var check = Master.P_D_SalesCustomer.VatType;
        if (Boolean(check) == true) {
            Master.P_D_SalesCustomer.VatType = 1;
        }
        else {
            Master.P_D_SalesCustomer.VatType = 0;
        }
        //Master.P_D_SalesCustomer = new P_D_SalesCustomer();
        Master.P_D_SalesCustomer.CompCode = Number(_CompCode);
        Master.P_D_SalesCustomer.SalesEngineerId = SlsEngId;
        Master.P_D_SalesCustomer.CustomerCategoryID = CustomerCatId;
        Master.P_D_SalesCustomer.IsActive = true;
        var session = GetSessionRecord();
        Master.sessionRecord = session;
        AjaxApi.CallsyncApi({
            type: "Post",
            url: sys.apiUrl("P_D_SalesCustomer", "InsertMasterDetail"),
            data: JSON.stringify(Master),
            headers: {
                'Accept': 'application/json; charset=utf-8',
                'Content-Type': 'application/json'
            },
            success: function (d) {
                var result = d;
                if (result.IsSuccess == true) {
                    ClientSharedWork.SwitchModes(ScreenModes.Query);
                    var msg = ReturnMsg("تم الحفظ بنجاح  ", "Data Updated Successfuly. ");
                    MessageBox.Show(msg, "Insert", function () {
                        var _Index = GetIndexByUseId(result.Response, TableName, FieldKey);
                        NavigateToSearchResultKey(Number(_Index), Navigate);
                    });
                }
                else
                    MessageBox.Show(result.ErrorMessage, "Insert");
            }
        });
    }
    function Assign() {
        DocumentActions.AssignToModel(Master.P_D_SalesCustomer);
        Assign_CustomerDoc();
    }
    function ValidData() {
        //if (IsNullOrEmpty(txtCrNo.value)) {
        //    WorningMessage("الرجاء ادخال رقم السجل", "Please enter CR No.");
        //    return;
        //}
        if (txtVatType.checked == true && IsNullOrEmpty(txtVatNo.value)) {
            WorningMessage("الرجاء ادخال رقم الضريبه ", "Please enter vat no.  ");
            return false;
        }
        else {
            if (Master.P_D_SalesCustomerDoc.length == 0) {
                WorningMessage("الرجاء ادخال رقم معرف ", "Please enter At least one Identifier  ");
                return false;
            }
        }
        var vatno = txtVatNo.value;
        var _SalesCustomer = 0;
        //Ajax.Callsync({
        //    url: Url.Action("GetVatFromSalesCustomer", ControllerName),
        //    data: { vatno: vatno, custid: Master.P_D_SalesCustomer.CustomerID },
        //    success: (d) => {
        //        var re = d.result as P_D_SalesCustomer;
        //        if (re.CustomerID != null)
        //            _SalesCustomer = 1;
        //        else
        //            _SalesCustomer = 0; 
        //    }
        //});
        //let _SalesCustomer = Ajax.Call<number>({
        //    url: Url.Action("GetVatFromSalesCustomer", ControllerName),
        //    data: { vatno: vatno, custid: Master.P_D_SalesCustomer.CustomerID },
        //});
        //if (_SalesCustomer > 0) {
        //    WorningMessage("الرجاء عدم تكرار الرقم الضريبي  ", "VAT NO is Repeated ");
        //    return false;
        //}
        if (Master.P_D_SalesCustomer.CustomerCategoryID == 0 || Master.P_D_SalesCustomer.CustomerCategoryID == null) {
            WorningMessage("الرجاء ادخال فئة العميل", "Please enter Customer Category");
            return false;
        }
        for (var i = 0; i < Master.P_D_SalesCustomerDoc.length; i++) {
            if (Master.P_D_SalesCustomerDoc[i].StatusFlag == "i" || Master.P_D_SalesCustomerDoc[i].StatusFlag == "u") {
                if (Master.P_D_SalesCustomerDoc[i].CusIDTypeCode == 0 || Master.P_D_SalesCustomerDoc[i].CusIDTypeCode == null ||
                    Master.P_D_SalesCustomerDoc[i].IDNo == "" || Master.P_D_SalesCustomerDoc[i].IDNo == "0") {
                    WorningMessage("يجب ادخال نوع و رقم المعرف", "Identfier number and type must be selected");
                    return false;
                }
            }
        }
        return true;
    }
    function Update() {
        Assign();
        if (ValidData() == false)
            return;
        // Master.P_D_SalesCustomer.CustomerCategoryID = $("#txtCustomerCategoryID").val();
        var session = GetSessionRecord();
        Master.sessionRecord = session;
        debugger;
        AjaxApi.CallsyncApi({
            type: "Post",
            url: sys.apiUrl("P_D_SalesCustomer", "UpdateMasterDetail"),
            data: JSON.stringify(Master),
            headers: {
                'Accept': 'application/json; charset=utf-8',
                'Content-Type': 'application/json'
            },
            success: function (d) {
                debugger;
                var result = d;
                if (result.IsSuccess == true) {
                    ClientSharedWork.SwitchModes(ScreenModes.Query);
                    var msg = ReturnMsg("تم التعديل بنجاح  ", "Data Updated Successfuly. ");
                    MessageBox.Show(msg, "Update", function () {
                        var _Index = GetIndexByUseId(result.Response, TableName, FieldKey);
                        NavigateToSearchResultKey(Number(_Index), Navigate);
                    });
                }
                else
                    MessageBox.Show(result.ErrorMessage, "Insert");
            }
        });
        //Ajax.CallAsync({
        //    url: Url.Action("Update", ControllerName),
        //    data: Master,
        //    success: (d) => {
        //        let result = d.result as ResponseResult;
        //        if (result.ResponseState == true) {
        //            ClientSharedWork.SwitchModes(ScreenModes.Query);
        //            let msg: string = ReturnMsg("تم التعديل بنجاح  ", "Data Updated Successfuly. ");
        //            MessageBox.Show(msg, "Insert", () => {
        //                let _Index = GetIndexByUseId(result.ResponseData.CustomerID, TableName, FieldKey);
        //                NavigateToSearchResultKey(Number(_Index), Navigate);
        //            });
        //        }
        //    }
        //})
    }
    function ClearItem() {
    }
    function InitalizeGrid() {
        var res = GetResourceList("Cust_");
        Grid.ElementName = "Grid";
        Grid.Inserting = SharedSession.CurrentPrivileges.AddNew;
        Grid.OnRefreshed = function () {
            if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                $(".editable").attr("disabled", "disabled");
                $(".addable").attr("disabled", "disabled");
            }
            else {
                $(".editable").removeAttr("disabled");
                $(".addable").removeAttr("disabled");
            }
        };
        Grid.Editing = SharedSession.CurrentPrivileges.EDIT;
        Grid.ConfirmDeleteing = SharedSession.CurrentPrivileges.Remove;
        Grid.InsertionMode = JsGridInsertionMode.Binding;
        Grid.Inserting = false;
        Grid.SwitchEditing();
        Grid.Columns = [
            { title: res.Cust_GLAccountCode, name: "CustomerAccCode", type: "text", width: "7.5%" },
            { title: res.Cust_ProjectCode, name: "ProjectCode", type: "text", width: "7.5%" },
            { title: res.Cust_Proj_descE, name: "DescL", type: "text", width: "20.5%" },
            { title: res.Cust_BraCode, name: "BraCode", type: "text", width: "7.5%" },
            { title: res.Cust_custEng_code, name: "Eng_DescE", type: "text", width: "7.5%" },
            { title: res.Cust_CustomerContact, name: "CustomerContact", type: "text", width: "7.5%" },
            { title: res.Cust_CustomerTel, name: "CustomerTel", type: "text", width: "7.5%" },
            { title: res.Cust_Customermobile, name: "CustomerMobile", type: "text", width: "7.5%" },
            { title: res.Cust_Proj_remarks, name: "Remarks", type: "text", width: "7.5%" },
            { type: "control", width: "7%", deleteButton: false, itemTemplate: false }
        ];
        Grid.DataSource = DataSource;
        Grid.Bind();
    }
    $('#btndiv_1').on('click', function () {
        $("#btndiv_1").addClass("Actiev");
        $("#btndiv_1").removeClass("navbar navbar-inverse");
        $("#btndiv_2").removeClass("Actiev");
        $("#btndiv_3").removeClass("Actiev");
        $("#btndiv_2").addClass("navbar navbar-inverse");
        $("#btndiv_3").addClass("navbar navbar-inverse");
        $("#div_1").removeClass("display_none");
        $("#div_2").addClass("display_none");
        $("#div_3").addClass("display_none");
    });
    $('#btndiv_2').on('click', function () {
        $("#btndiv_2").addClass("Actiev");
        $("#btndiv_2").removeClass("navbar navbar-inverse");
        $("#btndiv_1").removeClass("Actiev");
        $("#btndiv_3").removeClass("Actiev");
        $("#btndiv_1").addClass("navbar navbar-inverse");
        $("#btndiv_3").addClass("navbar navbar-inverse");
        $("#div_2").removeClass("display_none");
        $("#div_1").addClass("display_none");
        $("#div_3").addClass("display_none");
    });
    $('#btndiv_3').on('click', function () {
        $("#btndiv_3").addClass("Actiev");
        $("#btndiv_3").removeClass("navbar navbar-inverse");
        $("#btndiv_1").removeClass("Actiev");
        $("#btndiv_2").removeClass("Actiev");
        $("#btndiv_1").addClass("navbar navbar-inverse");
        $("#btndiv_2").addClass("navbar navbar-inverse");
        $("#div_3").removeClass("display_none");
        $("#div_1").addClass("display_none");
        $("#div_2").addClass("display_none");
    });
    function DeleteRow(RecNo) {
        WorningMessage("هل تريد الحذف؟", "Do you want to delete?", "تحذير", "worning", function () {
            $("#txt_StatusFlag" + RecNo).val() == 'i' ? $("#txt_StatusFlag" + RecNo).val('m') : $("#txt_StatusFlag" + RecNo).val('d');
            $("#CusIDTypeCode" + RecNo).val("1");
            $("#IDNo" + RecNo).val("2");
            $("#IDIssuePlace" + RecNo).val("1");
            $("#row_font_header" + RecNo).attr("hidden", "true");
        });
    }
    function BindGetCustomerDocGridData() {
        Ajax.CallAsync({
            url: Url.Action("getDco", ControllerName),
            data: { CustomerId: Number(Master.P_D_SalesCustomer.CustomerID) },
            success: function (d) {
                Docmet = d.result;
                $("#data_lebel").html('');
                CountGrid = 0;
                for (var i = 0; i < Docmet.length; i++) {
                    BuildControls(i);
                    $("#btnAddDetails").addClass("display_none");
                    $("#btn_minus3" + i).addClass("display_none");
                    $("#txt_StatusFlag" + i).val("");
                    $("#CustomerDocID" + i).val(Docmet[i].CustomerDocID);
                    $("#CusIDTypeCode" + i).val(Docmet[i].CusIDTypeCode);
                    $("#IDNo" + i).val(Docmet[i].IDNo);
                    $("#IDIssuePlace" + i).val(Docmet[i].IDIssuePlace);
                    $("#IDIssueDate" + i).val(DateFormat(Docmet[i].IDIssueDate));
                    $("#IDIssueDateH" + i).val(Docmet[i].IDIssueDateH);
                    $("#IDExpireDate" + i).val(DateFormat(Docmet[i].IDExpireDate));
                    $("#IDExpireDateH" + i).val(Docmet[i].IDExpireDateH);
                    CountGrid += 1;
                }
            }
        });
    }
    function BuildControls(cnt) {
        var html;
        html = '<div id="row_font_header' + cnt + '" class="col-lg-12 font_header" style="bottom: 5px;font-weight:bold">' +
            '<span id="btn_minus3' + cnt + '" class="fa fa-minus-circle fontitm7Processes lebelminus"></span>' +
            '<div class="col-lg-2" style = "width: 14%;"><select disabled id="CusIDTypeCode' + cnt + '" class="form-control"> <option value="null"> ' + (_ScreenLang == "ar" ? "اختار نوع المعرف" : "Choose Identity Type") + '</option> </select ></div>' +
            '<div class="col-lg-1" style = "width: 17%;" ><input disabled id="IDNo' + cnt + '" type="number" class="form-control"></div>' +
            '<div class="col-lg-1" style = "width: 13%;"><input disabled id="IDIssuePlace' + cnt + '" type="text" class="form-control"></div>' +
            '<div class="col-lg-2" style = "width: 14%;"><input type="date" disabled id="IDIssueDate' + cnt + '" class="form-control"></div>' +
            '<div class="col-lg-2" style = "width: 14%;"><input type="text" disabled id="IDIssueDateH' + cnt + '" class="form-control"></div>' +
            '<div class="col-lg-2" style = "width: 14%;"><input type="date" disabled id="IDExpireDate' + cnt + '" class="form-control"></div>' +
            '<div class="col-lg-2" style = "width: 14%;"><input type="text" disabled id="IDExpireDateH' + cnt + '" class="form-control"></div>' +
            '<div class="col-lg-2" style=""><input id="txt_StatusFlag' + cnt + '" name = " " type = "hidden" class="form-control"/><input id="CustomerDocID' + cnt + '" name = " " type = "hidden" class="form-control" /></div></div>';
        $("#data_lebel").append(html);
        for (var i = 0; i < CodesTypes.length; i++) {
            $('#CusIDTypeCode' + cnt).append('<option value="' + CodesTypes[i].StatusCode + '">' + (_ScreenLang == "ar" ? CodesTypes[i].DescA : CodesTypes[i].DescE) + '</option>');
        }
        $("#btn_minus3" + cnt).on('click', function () {
            DeleteRow(cnt);
        });
        if (ClientSharedWork.CurrentMode == ScreenModes.Edit) {
            $("#btn_minus3" + cnt).addClass("display_none");
            $("#btn_minus3" + cnt).attr("disabled", "disabled");
        }
        else {
            $("#btn_minus3" + cnt).addClass("display_none");
            $("#btn_minus3" + cnt).attr("disabled", "disabled");
        }
        $("#CusIDTypeCode" + cnt).on('change', function () {
            if ($("#txt_StatusFlag" + cnt).val() != "i")
                $("#txt_StatusFlag" + cnt).val("u");
        });
        $("#IDNo" + cnt).on('change', function () {
            if ($("#txt_StatusFlag" + cnt).val() != "i")
                $("#txt_StatusFlag" + cnt).val("u");
        });
        $("#IDIssuePlace" + cnt).on('change', function () {
            if ($("#txt_StatusFlag" + cnt).val() != "i")
                $("#txt_StatusFlag" + cnt).val("u");
        });
        $("#IDIssueDate" + cnt).on('change', function () {
            if ($("#txt_StatusFlag" + cnt).val() != "i")
                $("#txt_StatusFlag" + cnt).val("u");
            //$("#IDIssueDateH" + cnt).val($("#IDIssueDate" + cnt).val());
        });
        $("#IDIssueDateH" + cnt).on('change', function () {
            if ($("#txt_StatusFlag" + cnt).val() != "i")
                $("#txt_StatusFlag" + cnt).val("u");
        });
        $("#IDExpireDate" + cnt).on('change', function () {
            if ($("#txt_StatusFlag" + cnt).val() != "i")
                $("#txt_StatusFlag" + cnt).val("u");
            //  $("#IDExpireDateH" + cnt).val($("#IDExpireDate" + cnt).val());
        });
        $("#IDExpireDateH" + cnt).on('change', function () {
            if ($("#txt_StatusFlag" + cnt).val() != "i")
                $("#txt_StatusFlag" + cnt).val("u");
        });
    }
    function GetCusType() {
        Ajax.Callsync({
            url: Url.Action("GetCusType", ControllerName),
            data: { CusIDType: 'CusIDType' },
            success: function (d) {
                CodesTypes = d.result;
            }
        });
    }
    function AddNewRow() {
        if (ClientSharedWork.CurrentMode == ScreenModes.Add)
            Newcount = 0;
        var CanAdd = true;
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
            $("#Div_ADDRESS :input").removeAttr("disabled");
            $("#txt_StatusFlag" + CountGrid).val("i"); //In Insert mode
            $("#btn_minus3" + CountGrid).removeClass("display_none");
            $("#btn_minus3" + CountGrid).removeAttr("disabled");
            $("#IDIssueDate" + CountGrid).val(DateFormat((new Date()).toString()));
            $("#IDExpireDate" + CountGrid).val(DateFormat((new Date()).toString()));
            $("#IDIssueDateH" + CountGrid).val();
            $("#IDExpireDateH" + CountGrid).val();
            $("#CusIDTypeCode" + CountGrid).removeAttr("disabled");
            $("#IDNo" + CountGrid).removeAttr("disabled");
            $("#IDIssuePlace" + CountGrid).removeAttr("disabled");
            $("#IDIssueDate" + CountGrid).removeAttr("disabled");
            $("#IDExpireDate" + CountGrid).removeAttr("disabled");
            $("#IDIssueDateH" + CountGrid).removeAttr("disabled");
            $("#IDExpireDateH" + CountGrid).removeAttr("disabled");
            CountGrid++;
        }
    }
    function Validation_Grid(rowcount) {
        if (($("#txt_StatusFlag" + rowcount).val() != 'd' || $("#txt_StatusFlag" + rowcount).val() != 'm')) {
            Newcount++;
        }
        if ($("#CusIDTypeCode" + rowcount).val() == "null" && ($("#txt_StatusFlag" + rowcount).val() != 'd' || $("#txt_StatusFlag" + rowcount).val() != 'm')) {
            MessageBox.Show("برجاء اختيار نوع المعرف!", "Please choose ID Type!");
            return false;
        }
        if ($("#IDNo" + rowcount).val() == "" && ($("#txt_StatusFlag" + rowcount).val() != 'd' || $("#txt_StatusFlag" + rowcount).val() != 'm')) {
            MessageBox.Show(" برجاء ادخال رقم المعرف!", "Please enter the ID number!");
            return false;
        }
        if ($("#IDIssuePlace" + rowcount).val() == "" && ($("#txt_StatusFlag" + rowcount).val() != 'd' || $("#txt_StatusFlag" + rowcount).val() != 'm')) {
            MessageBox.Show(" برجاء ادخال مكان إصدار ", "Please enter the place of issuance of the ID!");
            return false;
        }
        if (Newcount == 0) {
            MessageBox.Show("يجب ادخال  بيانات  المعرف   ", "Identity data must be entered");
            AddNewRow();
            return false;
        }
        return true;
    }
    function Assign_CustomerDoc() {
        Master.P_D_SalesCustomerDoc = new Array();
        var StatusFlag;
        for (var i = 0; i < CountGrid; i++) {
            SalesCustomerDoc = new P_D_SalesCustomerDoc();
            StatusFlag = $("#txt_StatusFlag" + i).val();
            if (StatusFlag == "i") {
                SalesCustomerDoc.CustomerDocID = 0;
                SalesCustomerDoc.CustomerId = Number(txtCustomerID.value);
                SalesCustomerDoc.StatusFlag = StatusFlag.toString();
                SalesCustomerDoc.CusIDTypeCode = Number($("#CusIDTypeCode" + i).val());
                SalesCustomerDoc.IDNo = $("#IDNo" + i).val();
                SalesCustomerDoc.IDIssuePlace = $('#IDIssuePlace' + i).val(); //
                SalesCustomerDoc.IDIssueDate = $('#IDIssueDate' + i).val();
                SalesCustomerDoc.IDIssueDateH = $("#IDIssueDateH" + i).val();
                SalesCustomerDoc.IDExpireDate = $("#IDExpireDate" + i).val();
                SalesCustomerDoc.IDExpireDateH = $("#IDExpireDateH" + i).val();
                Master.P_D_SalesCustomerDoc.push(SalesCustomerDoc);
            }
            if (StatusFlag == "u") {
                var CustomerDocID = $("#CustomerDocID" + i).val();
                SalesCustomerDoc.CustomerDocID = $("#CustomerDocID" + i).val();
                ;
                SalesCustomerDoc.CustomerId = Number(txtCustomerID.value);
                SalesCustomerDoc.StatusFlag = StatusFlag.toString();
                SalesCustomerDoc.CusIDTypeCode = Number($("#CusIDTypeCode" + i).val());
                SalesCustomerDoc.IDNo = $("#IDNo" + i).val();
                SalesCustomerDoc.IDIssuePlace = $('#IDIssuePlace' + i).val(); //
                SalesCustomerDoc.IDIssueDate = $('#IDIssueDate' + i).val();
                SalesCustomerDoc.IDIssueDateH = $("#IDIssueDateH" + i).val();
                SalesCustomerDoc.IDExpireDate = $("#IDExpireDate" + i).val();
                SalesCustomerDoc.IDExpireDateH = $("#IDExpireDateH" + i).val();
                Master.P_D_SalesCustomerDoc.push(SalesCustomerDoc);
            }
            if (StatusFlag == "d") {
                if ($("#CustomerDocID" + i).val() != "") {
                    var CustomerDocID = $("#CustomerDocID" + i).val();
                    SalesCustomerDoc.CustomerDocID = $("#CustomerDocID" + i).val();
                    SalesCustomerDoc.CustomerId = Number(txtCustomerID.value);
                    SalesCustomerDoc.StatusFlag = StatusFlag.toString();
                    Master.P_D_SalesCustomerDoc.push(SalesCustomerDoc);
                }
            }
        }
    }
    function GETNationalty() {
        Ajax.CallAsync({
            url: Url.Action("getNationalty", "Customers"),
            success: function (d) {
                Nationalty = d.result;
                for (var i = 0; i < Nationalty.length; i++) {
                    for (var i = 0; i < Nationalty.length; i++) {
                        $('#txt_Country').append('<option value="' + Nationalty[i].NationalityID + '">' + (_ScreenLang == "ar" ? Nationalty[i].DescA : Nationalty[i].DescL) + '</option>');
                    }
                }
            }
        });
    }
})(Customers || (Customers = {}));
//# sourceMappingURL=Customers.js.map