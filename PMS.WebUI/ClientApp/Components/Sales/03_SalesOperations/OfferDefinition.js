$(document).ready(function () {
    OfferDefinition.InitalizeComponent();
});
var OfferDefinition;
(function (OfferDefinition) {
    var ControllerName = "P_TR_SalesOffer";
    var TableName = "PQ_GetSalesOffer";
    var FieldKey = "OfferID";
    var JsGridcombobox = "combobox";
    var MasterDetails = new M_D_OfferDefDetails();
    var MasterDetailsView = new M_D_OfferDefDetailsView();
    var Master = new PQ_GetSalesOffer();
    //var MasterView: PQ_GetSalesOffer = new PQ_GetSalesOffer();
    var _ScreenLang;
    var _CompCode;
    var _BranchCode;
    var DataSourceParent = new Array();
    var DataSourceChildStageItem = new Array();
    var DataSourceChildCompResp = new Array();
    var DataSourceChildCompResp2 = new Array();
    var DataSourceChildPay = new Array();
    var btnTrNo;
    var btnLocation;
    var txtLocationId;
    var txtLocCode;
    var txtLoctionName;
    var btnSalesEngineer;
    var btnCustomer;
    var txtSalesEngineerId;
    var txtEngCode;
    var txtSalesEngineerName;
    var txtCustomerID;
    var txtCustomerCode;
    var txtCustomerName;
    var txtTrNo;
    var txtTrSerial;
    var DropFilter;
    var btnNew;
    var btnCopy;
    var btnApprove;
    var btnSendToCust;
    var btnCancel;
    var btnReject;
    var btnContract;
    var btnCustClear;
    var btnCustSave;
    var btnPrintSubm;
    var btnContractWord;
    var btnContractTerms;
    var txtContractPrice;
    var txtDiscountPrc;
    var txtDiscountPrc;
    var txtContractNetPrice;
    var txtDownPaymentPrc;
    var txtWarrntyPaymentPrc;
    var txtContractCode;
    var txtContractPeriod;
    var txtDiscountAmount;
    var txtContractDate;
    var WaranteePrd;
    var Responsibility = new Array();
    var SalesPaymentTerms = new Array();
    var _Scope = new Array();
    var _Condition;
    var GridParent = new JsGrid();
    var GridChild = new JsGrid();
    var GridChild1CompResp = new JsGrid();
    var GridChild2CompResp = new JsGrid();
    var GridChild3Pay = new JsGrid();
    var sys = new SystemTools();
    function InitalizeComponent() {
        SharedSession.CurrentPrivileges = GetPrivileges();
        SharedSession.CurrentEnvironment = GetSystemEnvironment();
        _ScreenLang = SharedSession.CurrentEnvironment.ScreenLanguage;
        _CompCode = SharedSession.CurrentEnvironment.CompCode;
        _BranchCode = SharedSession.CurrentEnvironment.BranchCode;
        GetDropdowenData();
        _Condition = " CompCode = " + _CompCode + " and BraCode = " + _BranchCode;
        InitalizeControls();
        InitalizeEvents();
        InitalizeGrid();
        ClientSharedWork.OnNavigate = Navigate;
        ControlsButtons.AddAction(New);
        ControlsButtons.SaveAction(function () {
            if (ClientSharedWork.CurrentMode == ScreenModes.Add)
                Insert();
            else if (ClientSharedWork.CurrentMode == ScreenModes.Edit)
                Update();
        });
        ControlsButtons.UndoAction(Undo);
        ControlsButtons.EditAction(Edit);
        ControlsButtons.PrintAction(Print);
        $("#btnCalcTotal").click(function () { CalcTotal(); });
        $("#ImageEditorButton").on("click", function () {
            debugger;
            ImgPoup();
        });
        $("#ImageEditorButton").on("click", function () {
            sys.ImgPopup(_CompCode, _BranchCode, Modules.OfferDefinition, Master.OfferID.toString());
        });
    }
    OfferDefinition.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        btnTrNo = document.getElementById("btnTrNo");
        btnLocation = document.getElementById("btnLocation");
        txtLocationId = document.getElementById("txtLocationId");
        txtLocCode = document.getElementById("txtLocCode");
        txtLoctionName = document.getElementById("txtLoctionName");
        btnSalesEngineer = document.getElementById("btnSalesEngineer");
        btnCustomer = document.getElementById("btnCustomer");
        txtSalesEngineerId = document.getElementById("txtSalesEngineerId");
        txtEngCode = document.getElementById("txtEngCode");
        txtSalesEngineerName = document.getElementById("txtSalesEngineerName");
        txtCustomerID = document.getElementById("txtCustomerID");
        txtCustomerCode = document.getElementById("txtCustomerCode");
        txtCustomerName = document.getElementById("txtCustomerName");
        txtTrNo = document.getElementById("txtTrNo");
        txtTrSerial = document.getElementById("txtTrSerial");
        DropFilter = document.getElementById("DropFilter");
        btnNew = document.getElementById("btnNew");
        btnCopy = document.getElementById("btnCopy");
        btnApprove = document.getElementById("btnApprove");
        btnSendToCust = document.getElementById("btnSendToCust");
        btnCancel = document.getElementById("btnCancel");
        btnReject = document.getElementById("btnReject");
        btnCustClear = document.getElementById("btnCustClear");
        btnCustSave = document.getElementById("btnCustSave");
        btnContract = document.getElementById("btnContract");
        btnPrintSubm = document.getElementById("btnPrintSubm");
        btnContractWord = document.getElementById("btnContractWord");
        btnContractTerms = document.getElementById("btnContractTerms");
        txtContractPrice = document.getElementById("txtContractPrice");
        txtDiscountPrc = document.getElementById("txtDiscountPrc");
        txtDiscountPrc = document.getElementById("txtDiscountPrc");
        txtContractNetPrice = document.getElementById("txtContractNetPrice");
        txtDownPaymentPrc = document.getElementById("txtDownPaymentPrc");
        txtWarrntyPaymentPrc = document.getElementById("txtWarrntyPaymentPrc");
        txtContractCode = document.getElementById("txtContractCode");
        txtContractPeriod = document.getElementById("txtContractPeriod");
        txtDiscountAmount = document.getElementById("txtDiscountAmount");
        txtContractDate = document.getElementById("txtContractDate");
        WaranteePrd = document.getElementById("WaranteePrd");
    }
    function InitalizeEvents() {
        btnLocation.onclick = btnLocation_onclick;
        btnSalesEngineer.onclick = btnSalesEngineer_onclick;
        btnCustomer.onclick = btnCustomer_onclick;
        btnTrNo.onclick = btnTrNo_onclick;
        btnNew.onclick = btnNew_onclick;
        btnCopy.onclick = btnCopy_onclick;
        btnApprove.onclick = btnApprove_onclick;
        btnSendToCust.onclick = btnSendToCust_onclick;
        btnCancel.onclick = btnCancel_onclick;
        btnReject.onclick = btnReject_onclick;
        btnCustClear.onclick = btnCustClear_onclick;
        btnCustSave.onclick = btnCustSave_onclick;
        btnContract.onclick = btnContract_onclick;
        btnPrintSubm.onclick = btnPrintSubm_onclick;
        btnContractWord.onclick = btnContractWord_onclick;
        //btnContractTerms.onclick = btnContractTerms_onclick;
        txtDiscountPrc.onkeyup = txtDiscountPrc_onkeyup;
    }
    function ImgPoup() {
        sys.ImgPopup(_CompCode, _BranchCode, Modules.Prepare, Master.OfferID.toString());
    }
    function txtDiscountPrc_onkeyup() {
        var _Value = Number(txtDiscountPrc.value) * Number(txtContractPrice.value) / 100;
        txtDiscountAmount.value = _Value.toFixed(2);
        txtContractNetPrice.value = (Number(txtContractPrice.value) - Number(txtDiscountAmount.value)).toString();
    }
    function InitalizeGrid() {
        var ResponsibilityCompany = new Array();
        var ResponsibilityCustomers = new Array();
        ResponsibilityCompany = Responsibility.filter(function (x) { return x.IsCustomer == false; });
        ResponsibilityCustomers = Responsibility.filter(function (x) { return x.IsCustomer == true; });
        var res = GetResourceList("Off_");
        CreateGrid(GridParent, "GridParent");
        GridParent.Columns = [
            { title: res.Off_StageCode, validate: "required", name: "StageCode", type: "number", width: "10%" },
            { title: res.Off_StageDescA, validate: "required", name: "StageDescA", type: "text", width: "32%" },
            { title: res.Off_StageDescE, validate: "required", name: "StageDescE", type: "text", width: "32%" },
            { title: res.Off_Scope, name: "ScopeID", type: "select", items: _Scope, valueField: "ScopeID", textField: "DescE", width: "22%" },
            { title: res.Off_StTotal, name: "StageTotal", type: "lable", width: "10.5%" },
            { title: res.Off_Remark, name: "Remarks", type: "text", width: "20%" },
            { type: "control", width: "10%" }
        ];
        GridParent.DataSource = DataSourceParent;
        GridParent.Bind();
        //let StringData: string = CreateDropdownListFilter(_Scope, "DescE", "DescE", "ScopeID", "h_ScopeID");
        //$("#GridParent .jsgrid-table .jsgrid-insert-row td").eq(3).append(StringData);
        //Company
        CreateGrid(GridChild1CompResp, "GridChild1CompResp");
        GridChild1CompResp.Columns = [
            { title: res.Off_CompanyResposibility, name: "ReposibilityId", items: ResponsibilityCompany, valueField: "ReposibilityId", textField: "DescA", width: "90%", type: "select", visible: _ScreenLang == "ar", css: JsGridcombobox },
            { title: res.Off_CompanyResposibility, name: "ReposibilityId", items: ResponsibilityCompany, valueField: "ReposibilityId", textField: "DescE", width: "90%", type: "select", visible: _ScreenLang == "en", css: JsGridcombobox },
            { type: "control", width: "10%" }
        ];
        GridChild1CompResp.DataSource = DataSourceChildCompResp;
        GridChild1CompResp.Bind();
        //Customer
        CreateGrid(GridChild2CompResp, "GridChild2CompResp");
        GridChild2CompResp.Columns = [
            { title: res.Off_CustomerResposibility, name: "ReposibilityId", items: ResponsibilityCustomers, valueField: "ReposibilityId", textField: "DescA", width: "90%", type: "select", visible: _ScreenLang == "ar", css: JsGridcombobox },
            { title: res.Off_CustomerResposibility, name: "ReposibilityId", items: ResponsibilityCustomers, valueField: "ReposibilityId", textField: "DescE", width: "90%", type: "select", visible: _ScreenLang == "en", css: JsGridcombobox },
            { type: "control", width: "10%" }
        ];
        GridChild2CompResp.DataSource = DataSourceChildCompResp2;
        GridChild2CompResp.Bind();
        CreateGrid(GridChild3Pay, "GridChild3Pay");
        GridChild3Pay.Columns = [
            { title: res.Off_PaymentId, name: "PaymentId", items: SalesPaymentTerms, valueField: "PaymentId", textField: "DescA", width: "90%", type: "select", visible: _ScreenLang == "ar" },
            { title: res.Off_PaymentId, name: "PaymentId", items: SalesPaymentTerms, valueField: "PaymentId", textField: "DescE", width: "90%", type: "select", visible: _ScreenLang == "en" },
            { type: "control", width: "10%" }
        ];
        GridChild3Pay.DataSource = DataSourceChildPay;
        GridChild3Pay.Bind();
    }
    function btnPrintSubm_onclick() {
        if (Master.OfferID != 0 || !IsNullOrEmpty(Master.OfferID.toString())) {
            Ajax.Callsync({
                url: Url.Action("PrintOffer", "OfferDefinition"),
                data: { OfferId: Master.OfferID },
                success: function (d) {
                    var result = d.result;
                    if (result.ResponseState == false) {
                        WorningMessage(result.ResponseMessage, result.ResponseMessage);
                    }
                    else {
                        debugger;
                        var _nf = result.NewFile;
                        var _Of = result.OrgFile;
                        //aaa(_f);
                        var urlForUi = GetURLForUI();
                        window.open(urlForUi + "OfferDefinition/Download?Orgfile=" + _Of + "&Newfile=" + _nf, "_self");
                        //window.open(Url.Action("Download ?Newfile=" + _f, "OfferDefinition"), "_self");
                        //window.open(aaa(_f), "_self");
                    }
                }
            });
        }
    }
    function btnContractWord_onclick() {
        if (Master.OfferID != 0 || !IsNullOrEmpty(Master.OfferID.toString())) {
            Ajax.Callsync({
                url: Url.Action("PrintContract", "OfferDefinition"),
                data: { OfferId: Master.OfferID },
                success: function (d) {
                    var result = d.result;
                    if (result.ResponseState == false) {
                        WorningMessage(result.ResponseMessage, result.ResponseMessage);
                    }
                    else {
                        debugger;
                        var _nf = result.NewFile;
                        var _Of = result.OrgFile;
                        //aaa(_f);
                        var urlForUi = GetURLForUI();
                        window.open(urlForUi + "OfferDefinition/Download?Orgfile=" + _Of + "&Newfile=" + _nf, "_self");
                        //window.open(Url.Action("Download ?Newfile=" + _f, "OfferDefinition"), "_self");
                        //window.open(aaa(_f), "_self");
                    }
                }
            });
        }
    }
    //function btnContractTerms_onclick() {
    //    if (Master.OfferID != 0 || !IsNullOrEmpty(Master.OfferID.toString())) {
    //        Ajax.Callsync({
    //            url: Url.Action("PrintTerms", "OfferDefinition"),
    //            data: { OfferId: Master.OfferID },
    //            success: (d) => {
    //                let result = d.result as ResponseResult;
    //                if (result.ResponseState == false) {
    //                    WorningMessage(result.ResponseMessage, result.ResponseMessage);
    //                } else {
    //                    debugger;
    //                    var _nf: string = result.NewFile;
    //                    var _Of: string = result.OrgFile;
    //                    //aaa(_f);
    //                    let urlForUi: string = GetURLForUI();
    //                    window.open(urlForUi + "OfferDefinition/Download?Orgfile=" + _Of + "&Newfile=" + _nf, "_self");
    //                    //window.open(Url.Action("Download ?Newfile=" + _f, "OfferDefinition"), "_self");
    //                    //window.open(aaa(_f), "_self");
    //                }
    //            }
    //        })
    //    }
    //}
    function aaa(fileName) {
        debugger;
        Ajax.Callsync({
            url: Url.Action("Download", "OfferDefinition"),
            data: { Newfile: fileName },
            success: function (data) {
                debugger;
                window.open(Url.Action("Download", "OfferDefinition"), "_self");
                //window.location.href = fileName + ".docx";
                //window.open(fileName + ".docx", "viewer");
                alert("Document Created");
            }
        });
        return "";
    }
    function btnApprove_onclick() {
        if (Master.Status == 0 && SharedSession.CurrentPrivileges.CUSTOM1 == true) {
            //Check in All Grids DataSource.Lenth > 0
            if (Validation() == false) {
                WorningMessage("الرجاء استكمال البيانات", "Please complete Data");
                return;
            }
            if (DataSourceParent.length > 0 && DataSourceChildCompResp.length > 0 && DataSourceChildCompResp2.length > 0 && DataSourceChildPay.length > 0) {
                var _StageItem_1 = new Array();
                //_StageItem = Ajax.Call<Array<P_Tr_SalesOfferStageItem>>({ url: Url.Action("GetStageItemByOffer", ControllerName), data: { OfferId: Master.OfferID } });
                AjaxApi.CallsyncApi({
                    type: "GET",
                    url: sys.apiUrl(ControllerName, "GetStageItemByOffer"),
                    data: { OfferId: Master.OfferID },
                    success: function (d) {
                        var result = d;
                        if (result.IsSuccess) {
                            _StageItem_1 = result.Response;
                        }
                    }
                });
                var _Count = true;
                //Item Count for each stage > 0 
                for (var _i = 0, DataSourceParent_1 = DataSourceParent; _i < DataSourceParent_1.length; _i++) {
                    var item = DataSourceParent_1[_i];
                    var ItemCount = _StageItem_1.filter(function (x) { return x.OfferStageId == item.OfferStageId; }).length;
                    if (ItemCount < 1) {
                        _Count = false;
                        WorningMessage("الرجاء اضافة اصناف", "Please add items for stage");
                        break;
                    }
                }
                //Customer, location, sales engineer  <> null
                if (IsNullOrEmpty(Master.LocationId.toString()) || IsNullOrEmpty(Master.SalesEngineerId.toString()) || Master.CustomerID == null) {
                    WorningMessage("الرجاء استكمال البيانات", "Please complete Data");
                    _Count = false;
                }
                if (_Count == true) {
                    $("#txtStatus").val("1");
                    CalcTotal();
                }
            }
        }
    }
    function CalcTotal() {
        var _StageItem = new Array();
        //_StageItem = Ajax.Call<Array<P_Tr_SalesOfferStageItem>>({ url: Url.Action("GetStageItemByOffer", ControllerName), data: { OfferId: Master.OfferID } }).filter(x => x.IsOfferItem == true);
        Ajax.Callsync({
            type: "GET",
            url: sys.apiUrl(ControllerName, "GetStageItemByOffer"),
            data: { OfferId: Master.OfferID },
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    _StageItem = result.Response;
                }
            }
        });
        for (var _i = 0, DataSourceParent_2 = DataSourceParent; _i < DataSourceParent_2.length; _i++) {
            var item = DataSourceParent_2[_i];
            var _ItemTotal = _StageItem.filter(function (x) { return x.OfferStageId == item.OfferStageId; });
            var SumItem = 0;
            for (var _a = 0, _ItemTotal_1 = _ItemTotal; _a < _ItemTotal_1.length; _a++) {
                var item2 = _ItemTotal_1[_a];
                if (item2.IsOfferItem == true) {
                    var _Tot = item2.Qty * item2.UnitPrice;
                    SumItem += _Tot;
                }
            }
            item.StageTotal = Number(SumItem.toFixed(2));
        }
        var _OfferPrice = Sum(DataSourceParent, "StageTotal");
        $("#txtContractPrice").val(_OfferPrice);
        var _Value = Number(txtDiscountPrc.value) * Number(txtContractPrice.value) / 100;
        txtDiscountAmount.value = _Value.toFixed(2);
        txtContractNetPrice.value = (Number(txtContractPrice.value) - Number(txtDiscountAmount.value)).toString();
        Master.DownPaymentAmount = Number((Number(txtDownPaymentPrc.value) * Number(txtContractNetPrice.value) / 100).toFixed(2));
        $("#txtDownPaymentAmount").val(Master.DownPaymentAmount);
        Master.WarrntyPaymentAmount = Number((Number(txtWarrntyPaymentPrc.value) * Number(txtContractNetPrice.value) / 100).toFixed(2));
        $("#txtWarrntyPaymentAmount").val(Master.WarrntyPaymentAmount);
        GridParent.DataSource = DataSourceParent;
        GridParent.Bind();
    }
    function btnSendToCust_onclick() {
        if (Master.Status == 2 && SharedSession.CurrentPrivileges.CUSTOM2 == true) {
            $("#txtStatus").val("3");
            $("#txtSendDate").removeAttr("disabled");
            $("#txtSendDate").val(DateFormat(new Date().toString()));
        }
    }
    function btnCancel_onclick() {
        if ( /*Master.Status != 4 &&*/Master.Status != 8 && SharedSession.CurrentPrivileges.CUSTOM4 == true)
            $("#txtStatus").val("10");
    }
    function btnReject_onclick() {
        if (Master.Status == 3 && SharedSession.CurrentPrivileges.CUSTOM3 == true)
            $("#txtStatus").val("11");
    }
    function btnContract_onclick() {
        if (Master.Status == 3 && SharedSession.CurrentPrivileges.CUSTOM3 == true)
            $("#txtStatus").val("4");
    }
    function btnNew_onclick() {
        GetNewOfferId(1);
    }
    function btnCopy_onclick() {
        debugger;
        GetNewOfferId(2);
    }
    function GetNewOfferId(typ) {
        debugger;
        var id = Master.OfferID;
        Ajax.CallAsync({
            type: "GET",
            url: sys.apiUrl(ControllerName, "GetNewOfferId"),
            data: { id: id, typ: typ },
            success: function (d) {
                debugger;
                var result = d;
                if (result.IsSuccess) {
                    debugger;
                    //result = d.result;
                    var NewOfferId = Number(result.Response);
                    var Index = GetIndexByUseId(NewOfferId, TableName, FieldKey, _Condition);
                    NavigateToSearchResultKey(Number(Index), Navigate);
                }
            }
        });
    }
    function btnTrNo_onclick() {
        debugger;
        var Condition = "CompCode = " + _CompCode + " and BraCode = " + _BranchCode;
        sys.FindKey(Modules.OfferDefinition, "btnTrNo", Condition, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetByID", "OfferDefinition"),
                data: { id: id },
                success: function (d) {
                    debugger;
                    var result = d;
                    //if (result.IsSuccess) {
                    Master = d.result;
                    MasterDetails.P_TR_SalesOffer = result;
                    debugger;
                    var Index = GetIndexByUseId(Master.OfferID, TableName, FieldKey, Condition);
                    ClientSharedWork.PageIndex = Number(Index);
                    NavigateToSearchResultKey(Number(Index), Navigate);
                    //}
                }
            });
        });
    }
    function btnSalesEngineer_onclick() {
        var Condition = "CompCode = " + _CompCode + " and BraCode = " + _BranchCode + "  and IsActive = 1 ";
        sys.FindKey(Modules.OfferDefinition, "btnSalesEngineer", Condition, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            var _SalesEng = GetSalesEgineerById(id);
            txtSalesEngineerId.value = id;
            txtSalesEngineerName.value = _ScreenLang == "ar" ? _SalesEng.DeacA : _SalesEng.DescE;
            txtEngCode.value = _SalesEng.EngCode;
        });
    }
    function btnCustomer_onclick() {
        var Condition = "CompCode = " + _CompCode + "  and IsActive = 1 ";
        sys.FindKey(Modules.OfferDefinition, "btnCustomer", Condition, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            var _Customers = GetCustomersById(id);
            txtCustomerID.value = id;
            txtCustomerName.value = _ScreenLang == "ar" ? _Customers.DescA : _Customers.DescE;
            txtCustomerCode.value = _Customers.CustomerCode.toString();
            $("#txtCustCrNo").val(_Customers.CrNo);
            $("#txtCustCustomerNameE").val(_Customers.DescE);
            $("#txtCustCustomerNameA").val(_Customers.DescA);
            $("#txtCustContactPerson").val();
            $("#txtCustEmail").val(_Customers.Email);
            $("#txtCustMobile").val(_Customers.Mobile);
            $("#txtCustTel").val(_Customers.Tel1);
            $("#txtCustfax").val(_Customers.Fax);
        });
    }
    function btnCustClear_onclick() {
        $(".ClearCustomer").val("");
        $(".ClearCustomer").removeAttr("disabled");
    }
    function btnCustSave_onclick() {
        var _SalesCustomer = new P_D_SalesCustomer();
        _SalesCustomer.CrNo = $("#txtCustCrNo").val();
        _SalesCustomer.IsActive = true;
        _SalesCustomer.IsTemporary = true;
        _SalesCustomer.DescA = $("#txtCustCustomerNameA").val();
        _SalesCustomer.DescE = $("#txtCustCustomerNameE").val();
        _SalesCustomer.ContactPerson = $("#txtCustContactPerson").val();
        _SalesCustomer.Email = $("#txtCustEmail").val();
        _SalesCustomer.Mobile = $("#txtCustMobile").val();
        _SalesCustomer.Tel1 = $("#txtCustTel").val();
        _SalesCustomer.Fax = $("#txtCustfax").val();
        _SalesCustomer.CreatedAt = DateFormat(new Date().toString());
        _SalesCustomer.CreatedBy = ClientSharedWork.Session.UserCode;
        _SalesCustomer.CompCode = Number(_CompCode);
        _SalesCustomer.BraCode = Number(_BranchCode);
        _SalesCustomer.CustomerCategoryID = null;
        _SalesCustomer.SalesEngineerId = null;
        //let _Count: number = Ajax.Call<number>({ url: Url.Action("GetByCrNo", "Customers"), data: { CrNo: _SalesCustomer.CrNo } });
        AjaxApi.CallsyncApi({
            type: "GET",
            url: sys.apiUrl(ControllerName, "GetByCrNo"),
            data: { CrNo: _SalesCustomer.CrNo, CompCode: _CompCode },
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    var _Count = result.Response;
                    if (_Count > 0) {
                        WorningMessage("الرجاء كتابة رقم سجل مختلف", "Please write difference Cr No.");
                        return;
                    }
                }
            }
        });
        Ajax.Callsync({
            url: Url.Action("InsertCustomers", "OfferDefinition"),
            data: _SalesCustomer,
            success: function (d) {
                var result = d.result;
                if (result.ResponseState == true) {
                    var res = result.ResponseData;
                    txtCustomerCode.value = res.CustomerCode.toString();
                    txtCustomerName.value = _ScreenLang == "ar" ? res.DescA : res.DescE;
                    Master.CustomerID = res.CustomerID;
                    $("#txtCustomerID").val(res.CustomerID);
                    WorningMessage("تم الحفظ", "Save Successfully");
                }
            }
        });
    }
    function btnLocation_onclick() {
        var Condition = "CompCode = " + _CompCode;
        sys.FindKey(Modules.OfferDefinition, "btnLocation", Condition, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            var Location = GetLocationById(id);
            txtLocationId.value = id;
            txtLoctionName.value = _ScreenLang == "ar" ? Location.DescA : Location.DescE;
            txtLocCode.value = Location.LocCode;
        });
    }
    function FillDataSource(_Grid, _Arr, _Obj) {
        _Arr.push(_Obj);
        _Grid.DataSource = _Arr;
        _Grid.Bind();
    }
    function AddItem(e) {
        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
            WorningMessage("لا يمكن التعديل في وضع الاستعلام", "Can't Edit in query mode");
            return;
        }
        var _ElementName = this.ElementName;
        switch (_ElementName) {
            case "GridParent":
                var SalesOfferStage = e.Item;
                FillDataSource(GridParent, DataSourceParent, e.Item);
                break;
            case "GridChild1CompResp":
                var OfferRespons = e.Item;
                OfferRespons.IsCustomer = false;
                FillDataSource(GridChild1CompResp, DataSourceChildCompResp, OfferRespons);
                break;
            case "GridChild2CompResp":
                var OfferRespons2 = e.Item;
                OfferRespons2.IsCustomer = true;
                FillDataSource(GridChild2CompResp, DataSourceChildCompResp2, OfferRespons2);
                break;
            case "GridChild3Pay":
                var SalOfferPay = e.Item;
                FillDataSource(GridChild3Pay, DataSourceChildPay, SalOfferPay);
                break;
        }
    }
    function Validation() {
        var _Result = true;
        if (DataSourceParent.length == 0 || DataSourceChildCompResp.length == 0 || DataSourceChildCompResp2.length == 0 || DataSourceChildPay.length == 0) {
            _Result = false;
        }
        return _Result;
    }
    function Insert() {
        Master = new PQ_GetSalesOffer();
        Assign();
        MasterDetails.P_TR_SalesOffer.OfferID = 0;
        MasterDetails.P_TR_SalesOffer.CompCode = _CompCode;
        MasterDetails.P_TR_SalesOffer.BraCode = _BranchCode;
        MasterDetails.P_TR_SalesOffer.CreatedBy = SharedSession.CurrentEnvironment.UserCode;
        MasterDetails.P_TR_SalesOffer.CreatedAt = (new Date()).toString();
        MasterDetails.P_TR_SalesOffer.IsNewProject = true;
        MasterDetails.P_TR_SalesOffer.Status = 0;
        AjaxApi.CallsyncApi({
            type: "POST",
            url: sys.apiUrl(ControllerName, "Insert"),
            data: JSON.stringify(MasterDetails),
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    debugger;
                    ClientSharedWork.SwitchModes(ScreenModes.Query);
                    var _Data = result.Response;
                    var _Id_1 = _Data.OfferID;
                    SessionManager.ModelCount = result.ModelCount;
                    //Master = GetMasterById(result.Response.OfferID);
                    var msg = ReturnMsg("تم الحفظ برقم ", "Data Saved With Trans NO. ") + Master.TrNo.toString();
                    MessageBox.Show(msg, "Insert", function () {
                        var _Index = GetIndexByUseId(_Id_1, TableName, FieldKey, " CompCode = " + _CompCode + " and BraCode = " + _BranchCode);
                        NavigateToSearchResultKey(Number(_Index), Navigate);
                        SessionManager.ModelCount = result.ModelCount;
                    });
                }
                else
                    MessageBox.Show(result.ErrorMessage, "Insert");
            }
        });
    }
    function Update() {
        debugger;
        Assign();
        MasterDetails.P_TR_SalesOffer.CompCode = _CompCode;
        MasterDetails.P_TR_SalesOffer.BraCode = _BranchCode;
        MasterDetails.P_TR_SalesOffer.UpdatedBy = SharedSession.CurrentEnvironment.UserCode;
        MasterDetails.P_TR_SalesOffer.UpdatedAt = (new Date()).toString();
        AjaxApi.CallsyncApi({
            type: "POST",
            url: sys.apiUrl(ControllerName, "Update"),
            data: JSON.stringify(MasterDetails),
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    ClientSharedWork.SwitchModes(ScreenModes.Query);
                    var msg = ReturnMsg("تم الحفظ برقم ", "Data Saved With Trans NO. ") + Master.TrNo.toString();
                    MessageBox.Show(msg, "Update", function () {
                        Master = result.Response;
                        var _Index = GetIndexByUseId(Master.OfferID, TableName, FieldKey, " CompCode = " + _CompCode + " and BraCode = " + _BranchCode);
                        NavigateToSearchResultKey(Number(_Index), Navigate);
                    });
                }
                else
                    MessageBox.Show(result.ErrorMessage, "Update");
            }
        });
    }
    function Edit() {
        if (Master.Status == 0) {
            $(".Custeditable").removeAttr("disabled");
            $(".jsgrid-insert-mode-button").removeAttr("disabled");
            $(".jsgrid-edit-button").removeAttr("disabled");
            $(".jsgrid-delete-button").removeAttr("disabled");
            $("#btnAddItemGrid").removeAttr("disabled");
        }
        else {
            $(".Custeditable").attr("disabled", "disabled");
            $(".jsgrid-insert-mode-button").attr("disabled", "disabled");
            $(".jsgrid-edit-button").attr("disabled", "disabled");
            $(".jsgrid-delete-button").attr("disabled", "disabled");
        }
    }
    function Undo() {
    }
    function Navigate() {
        debugger;
        Ajax.CallAsync({
            url: Url.Action("GetByIndex", "OfferDefinition"),
            success: function (d) {
                debugger;
                Master = d.result;
                Master.TrDate = IsNullOrEmpty(Master.TrDate) ? Master.TrDate : DateFormat(Master.TrDate);
                Master.SendDate = IsNullOrEmpty(Master.SendDate) ? Master.SendDate : DateFormat(Master.SendDate);
                Display();
                $("#btnNew").removeAttr("disabled");
                $("#btnCopy").removeAttr("disabled");
                $("#btnCalcTotal").removeAttr("disabled");
            }
        });
        //AjaxApi.CallsyncApi({
        //    type: "GET",
        //    url: sys.apiUrl("SystemTools", "GetIndex"),
        //    data: { index: ClientSharedWork.PageIndex, TableName: "PQ_GetSalesOffer", Condition: _Condition },
        //    success: (result) => {
        //        debugger;
        //        //Master = result as PQ_GetSalesOffer;
        //        Master = result as PQ_GetSalesOffer;
        //        Master.TrDate = IsNullOrEmpty(Master.TrDate) ? Master.TrDate : DateFormat(Master.TrDate);
        //        Master.SendDate = IsNullOrEmpty(Master.SendDate) ? Master.SendDate : DateFormat(Master.SendDate);
        //        Display();
        //        $("#btnNew").removeAttr("disabled");
        //        $("#btnCopy").removeAttr("disabled");
        //        $("#btnCalcTotal").removeAttr("disabled");
        //    }
        //});
    }
    function Display() {
        debugger;
        DocumentActions.RenderFromModel(Master);
        txtContractDate.value = DateFormat(Master.ContractDate);
        debugger;
        $("#txtOfferId").val(Master.OfferID);
        txtLocCode.value = Master.Loc_LocCode;
        txtLoctionName.value = _ScreenLang == "ar" ? Master.Loc_DescA : Master.loc_DescE;
        txtEngCode.value = Master.eng_EngCode;
        txtSalesEngineerName.value = _ScreenLang == "ar" ? Master.Eng_DescA : Master.Eng_DescE;
        $("#txtCustomerCode").val(Master.cus_CustomerCode);
        txtCustomerName.value = _ScreenLang == "ar" ? Master.cus_DescA : Master.Cus_DescE;
        LoadDetails(Master.OfferID);
        _OfferStageItem.ClearGridStage();
        CheckButtonAddInStageItem();
    }
    function LoadDetails(id) {
        AjaxApi.CallAsyncApi({
            type: "GET",
            url: sys.apiUrl("P_TR_SalesOffer", "LoadDetails"),
            data: { id: id },
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    DataSourceParent = result.Response.PQ_GetSlsOfferStage;
                    DataSourceChildCompResp = result.Response.PQ_GetSlsOfferResponsibility;
                    DataSourceChildCompResp2 = result.Response.PQ_GetSlsOfferResponsibility2;
                    DataSourceChildPay = result.Response.PQ_GetSlsOfferPayment;
                    GridParent.DataSource = DataSourceParent;
                    GridParent.Bind();
                    InitaizeDropdownList(DataSourceParent, "StageDescA", "StageDescE", "OfferStageId", "DropOfferStageId", true);
                    GridChild1CompResp.DataSource = DataSourceChildCompResp;
                    GridChild1CompResp.Bind();
                    GridChild2CompResp.DataSource = DataSourceChildCompResp2;
                    GridChild2CompResp.Bind();
                    GridChild3Pay.DataSource = DataSourceChildPay;
                    GridChild3Pay.Bind();
                }
            }
        });
    }
    function GetDropdowenData() {
        AjaxApi.CallsyncApi({
            type: "GET",
            url: sys.apiUrl("P_TR_SalesOffer", "GetDropdowenData"),
            data: { CompCode: _CompCode },
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    _Scope = result.Response.P_D_Scope;
                    Responsibility = result.Response.P_D_SalesResponsibility;
                    SalesPaymentTerms = result.Response.P_D_SalesPaymentTerms;
                }
            }
        });
    }
    function New() {
        ClearGrid(GridParent, DataSourceParent);
        DataSourceParent = new Array();
        ClearGrid(GridChild1CompResp, DataSourceChildCompResp);
        DataSourceChildCompResp = new Array();
        ClearGrid(GridChild2CompResp, DataSourceChildCompResp2);
        DataSourceChildCompResp2 = new Array();
        ClearGrid(GridChild3Pay, DataSourceChildPay);
        DataSourceChildPay = new Array();
        $("#txtStatus").val("0");
        $("#btnNew").attr("disabled", "disabled");
        $("#btnCopy").attr("disabled", "disabled");
        $("#btnCalcTotal").attr("disabled", "disabled");
        txtTrSerial.value = "1";
        $("#txtDiscountPrc").val(0);
        $("#txtIsMaintenanceWork").prop("checked", false);
        $("#txtIsMainCustomerPay").prop("checked", true);
    }
    function Print() {
        if (Master == null)
            return;
        Ajax.CallAsync({
            url: Url.Action("PrintOffer", "PrintTransaction"),
            data: { OfferID: Master.OfferID },
            success: function (d) {
                var url = d.result;
                window.open(url, "_blank");
            }
        });
    }
    function Assign() {
        //AssignMaster
        DocumentActions.AssignToModel(Master);
        MasterDetails.P_TR_SalesOffer = Master;
        //AssignDetails
        var _CompResp = new Array();
        for (var _i = 0, DataSourceChildCompResp2_1 = DataSourceChildCompResp2; _i < DataSourceChildCompResp2_1.length; _i++) {
            var item = DataSourceChildCompResp2_1[_i];
            _CompResp.push(item);
        }
        for (var _a = 0, DataSourceChildCompResp_1 = DataSourceChildCompResp; _a < DataSourceChildCompResp_1.length; _a++) {
            var item = DataSourceChildCompResp_1[_a];
            _CompResp.push(item);
        }
        MasterDetails.P_Tr_SalesOfferStage = DataSourceParent;
        MasterDetails.P_TR_SalesOfferResponsibility = _CompResp;
        MasterDetails.P_Tr_SalesOfferPayment = DataSourceChildPay;
    }
    function FindTr() {
        sys.FindKey(Modules.OfferDefinition, "btnTr", "CompCode = " + _CompCode, function () {
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            var _Index = GetIndexByUseId(_Id, TableName, FieldKey, _Condition);
            NavigateToSearchResultKey(Number(_Index), Navigate);
        });
    }
    function GetMasterById(id) {
        var _Master = Ajax.Call({
            url: Url.Action("GetByID", "OfferDefinition"),
            data: { id: id },
        });
        return _Master;
    }
    function CreateGrid(_Grid, _ElementName) {
        if (_Grid === void 0) { _Grid = new JsGrid(); }
        _Grid.ElementName = _ElementName;
        _Grid.OnRefreshed = function () {
            if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                $(".jsgrid-insert-mode-button").attr("disabled", "disabled");
                $(".jsgrid-edit-button").attr("disabled", "disabled");
                $(".jsgrid-delete-button").attr("disabled", "disabled");
            }
            else {
                $(".jsgrid-insert-mode-button").removeAttr("disabled");
                $(".jsgrid-edit-button").removeAttr("disabled");
                $(".jsgrid-delete-button").removeAttr("disabled");
            }
        };
        _Grid.Inserting = SharedSession.CurrentPrivileges.AddNew;
        _Grid.Editing = SharedSession.CurrentPrivileges.EDIT;
        _Grid.ConfirmDeleteing = SharedSession.CurrentPrivileges.Remove;
        _Grid.InsertionMode = JsGridInsertionMode.Binding;
        _Grid.OnItemInserting = AddItem;
    }
    function CheckButtonAddInStageItem() {
        if (ClientSharedWork.CurrentMode == ScreenModes.Edit && Master.Status == 0) {
            $("#btnAddItemGrid").removeAttr("disabled");
            $("#btnDeleteItemGrid").removeAttr("disabled");
            $("#btnEditItemGrid").removeAttr("disabled");
            $("#btnFindSalesItem").removeAttr("disabled");
            $("#txtProjArea").removeAttr("disabled");
        }
        else {
            $("#btnAddItemGrid").attr("disabled", "disabled");
            $("#btnDeleteItemGrid").attr("disabled", "disabled");
            $("#btnEditItemGrid").attr("disabled", "disabled");
            $("#btnFindSalesItem").attr("disabled", "disabled");
            $("#txtProjArea").attr("disabled", "disabled");
        }
    }
    OfferDefinition.CheckButtonAddInStageItem = CheckButtonAddInStageItem;
})(OfferDefinition || (OfferDefinition = {}));
//# sourceMappingURL=OfferDefinition.js.map