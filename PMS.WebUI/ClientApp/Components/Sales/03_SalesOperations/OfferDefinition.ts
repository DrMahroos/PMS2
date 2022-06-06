$(document).ready(() => {
    OfferDefinition.InitalizeComponent();
});
namespace OfferDefinition {
    const ControllerName: string = "P_TR_SalesOffer";
    const TableName: string = "PQ_GetSalesOffer";
    const FieldKey: string = "OfferID";
    const JsGridcombobox: string = "combobox";

    var MasterDetails: M_D_OfferDefDetails = new M_D_OfferDefDetails();
    var MasterDetailsView: M_D_OfferDefDetailsView = new M_D_OfferDefDetailsView();
    var Master: PQ_GetSalesOffer = new PQ_GetSalesOffer();
    //var MasterView: PQ_GetSalesOffer = new PQ_GetSalesOffer();

    var _ScreenLang;
    var _CompCode;
    var _BranchCode;

    var DataSourceParent: Array<PQ_GetSlsOfferStage> = new Array<PQ_GetSlsOfferStage>();
    var DataSourceChildStageItem: Array<PQ_GetSlsOfferStageItem> = new Array<PQ_GetSlsOfferStageItem>();
    var DataSourceChildCompResp: Array<PQ_GetSlsOfferResponsibility> = new Array<PQ_GetSlsOfferResponsibility>();
    var DataSourceChildCompResp2: Array<PQ_GetSlsOfferResponsibility> = new Array<PQ_GetSlsOfferResponsibility>();
    var DataSourceChildPay: Array<PQ_GetSlsOfferPayment> = new Array<PQ_GetSlsOfferPayment>();

    var btnTrNo: HTMLButtonElement;
    var btnLocation: HTMLButtonElement;
    var txtLocationId: HTMLInputElement;
    var txtLocCode: HTMLInputElement;

    var txtLoctionName: HTMLInputElement;
    var btnSalesEngineer: HTMLButtonElement;
    var btnCustomer: HTMLButtonElement;
    var txtSalesEngineerId: HTMLButtonElement;
    var txtEngCode: HTMLButtonElement;
    var txtSalesEngineerName: HTMLButtonElement;
    var txtCustomerID: HTMLButtonElement;
    var txtCustomerCode: HTMLButtonElement;
    var txtCustomerName: HTMLButtonElement;
    var txtTrNo: HTMLInputElement;
    var txtTrSerial: HTMLInputElement;
    var DropFilter: HTMLSelectElement;
    var btnNew: HTMLButtonElement;
    var btnCopy: HTMLButtonElement;
    var btnApprove: HTMLButtonElement;
    var btnSendToCust: HTMLButtonElement;
    var btnCancel: HTMLButtonElement;
    var btnReject: HTMLButtonElement;
    var btnContract: HTMLButtonElement;
    var btnCustClear: HTMLButtonElement;
    var btnCustSave: HTMLButtonElement;
    var btnPrintSubm: HTMLButtonElement;
    var btnContractWord: HTMLButtonElement;
    var btnContractTerms: HTMLButtonElement;
    var txtContractPrice: HTMLInputElement;
    var txtDiscountPrc: HTMLInputElement;
    var txtDiscountPrc: HTMLInputElement;
    var txtContractNetPrice: HTMLInputElement;
    var txtDownPaymentPrc: HTMLInputElement;
    var txtWarrntyPaymentPrc: HTMLInputElement;
    var txtContractCode: HTMLInputElement;
    var txtContractPeriod: HTMLInputElement;
    var txtDiscountAmount: HTMLInputElement;
    var txtContractDate: HTMLInputElement;
    var WaranteePrd: HTMLInputElement;

    var Responsibility: Array<P_D_SalesResponsibility> = new Array<P_D_SalesResponsibility>();
    var SalesPaymentTerms: Array<P_D_SalesPaymentTerms> = new Array<P_D_SalesPaymentTerms>();
    var _Scope: Array<P_D_Scope> = new Array<P_D_Scope>();
    var _Condition: string;

    var GridParent: JsGrid = new JsGrid();
    var GridChild: JsGrid = new JsGrid();
    var GridChild1CompResp: JsGrid = new JsGrid();
    var GridChild2CompResp: JsGrid = new JsGrid();
    var GridChild3Pay: JsGrid = new JsGrid();
    var sys: SystemTools = new SystemTools();

    export function InitalizeComponent() {
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
        ControlsButtons.SaveAction(() => {
            if (ClientSharedWork.CurrentMode == ScreenModes.Add)
                Insert();
            else if (ClientSharedWork.CurrentMode == ScreenModes.Edit)
                Update();
        });
        ControlsButtons.UndoAction(Undo);
        ControlsButtons.EditAction(Edit);
        ControlsButtons.PrintAction(Print);
        $("#btnCalcTotal").click(function () { CalcTotal(); })
        $("#ImageEditorButton").on("click", () => {
            debugger
            ImgPoup();
        });

        $("#ImageEditorButton").on("click", () => {
            sys.ImgPopup(_CompCode, _BranchCode, Modules.OfferDefinition, Master.OfferID.toString());
        });


    }

    function InitalizeControls() {
        btnTrNo = document.getElementById("btnTrNo") as HTMLButtonElement;
        btnLocation = document.getElementById("btnLocation") as HTMLButtonElement;
        txtLocationId = document.getElementById("txtLocationId") as HTMLInputElement;
        txtLocCode = document.getElementById("txtLocCode") as HTMLInputElement;
        txtLoctionName = document.getElementById("txtLoctionName") as HTMLInputElement;
        btnSalesEngineer = document.getElementById("btnSalesEngineer") as HTMLInputElement;
        btnCustomer = document.getElementById("btnCustomer") as HTMLInputElement;
        txtSalesEngineerId = document.getElementById("txtSalesEngineerId") as HTMLInputElement;
        txtEngCode = document.getElementById("txtEngCode") as HTMLInputElement;
        txtSalesEngineerName = document.getElementById("txtSalesEngineerName") as HTMLInputElement;
        txtCustomerID = document.getElementById("txtCustomerID") as HTMLInputElement;
        txtCustomerCode = document.getElementById("txtCustomerCode") as HTMLInputElement;
        txtCustomerName = document.getElementById("txtCustomerName") as HTMLInputElement;
        txtTrNo = document.getElementById("txtTrNo") as HTMLInputElement;
        txtTrSerial = document.getElementById("txtTrSerial") as HTMLInputElement;
        DropFilter = document.getElementById("DropFilter") as HTMLSelectElement;
        btnNew = document.getElementById("btnNew") as HTMLButtonElement;
        btnCopy = document.getElementById("btnCopy") as HTMLButtonElement;
        btnApprove = document.getElementById("btnApprove") as HTMLButtonElement;
        btnSendToCust = document.getElementById("btnSendToCust") as HTMLButtonElement;
        btnCancel = document.getElementById("btnCancel") as HTMLButtonElement;
        btnReject = document.getElementById("btnReject") as HTMLButtonElement;
        btnCustClear = document.getElementById("btnCustClear") as HTMLButtonElement;
        btnCustSave = document.getElementById("btnCustSave") as HTMLButtonElement;
        btnContract = document.getElementById("btnContract") as HTMLButtonElement;
        btnPrintSubm = document.getElementById("btnPrintSubm") as HTMLButtonElement;
        btnContractWord = document.getElementById("btnContractWord") as HTMLButtonElement;
        btnContractTerms = document.getElementById("btnContractTerms") as HTMLButtonElement;
        txtContractPrice = document.getElementById("txtContractPrice") as HTMLInputElement;
        txtDiscountPrc = document.getElementById("txtDiscountPrc") as HTMLInputElement;
        txtDiscountPrc = document.getElementById("txtDiscountPrc") as HTMLInputElement;
        txtContractNetPrice = document.getElementById("txtContractNetPrice") as HTMLInputElement;
        txtDownPaymentPrc = document.getElementById("txtDownPaymentPrc") as HTMLInputElement;
        txtWarrntyPaymentPrc = document.getElementById("txtWarrntyPaymentPrc") as HTMLInputElement;
        txtContractCode = document.getElementById("txtContractCode") as HTMLInputElement;
        txtContractPeriod = document.getElementById("txtContractPeriod") as HTMLInputElement;
        txtDiscountAmount = document.getElementById("txtDiscountAmount") as HTMLInputElement;
        txtContractDate = document.getElementById("txtContractDate") as HTMLInputElement;
        WaranteePrd = document.getElementById("WaranteePrd") as HTMLInputElement;
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
        let _Value: number = Number(txtDiscountPrc.value) * Number(txtContractPrice.value) / 100;
        txtDiscountAmount.value = _Value.toFixed(2);
        txtContractNetPrice.value = (Number(txtContractPrice.value) - Number(txtDiscountAmount.value)).toString();
    }

    function InitalizeGrid() {
        let ResponsibilityCompany: Array<P_D_SalesResponsibility> = new Array<P_D_SalesResponsibility>();
        let ResponsibilityCustomers: Array<P_D_SalesResponsibility> = new Array<P_D_SalesResponsibility>();
        ResponsibilityCompany = Responsibility.filter(x => x.IsCustomer == false);
        ResponsibilityCustomers = Responsibility.filter(x => x.IsCustomer == true);

        let res: any = GetResourceList("Off_");
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
                success: (d) => {
                    let result = d.result as ResponseResult;
                    if (result.ResponseState == false) {
                        WorningMessage(result.ResponseMessage, result.ResponseMessage);
                    } else {
                        debugger;
                        var _nf: string = result.NewFile;
                        var _Of: string = result.OrgFile;
                        //aaa(_f);
                        let urlForUi: string = GetURLForUI();
                        window.open(urlForUi + "OfferDefinition/Download?Orgfile=" + _Of + "&Newfile=" + _nf, "_self");
                        //window.open(Url.Action("Download ?Newfile=" + _f, "OfferDefinition"), "_self");
                        //window.open(aaa(_f), "_self");
                    }
                }
            })
        }
    }

    function btnContractWord_onclick() {
        if (Master.OfferID != 0 || !IsNullOrEmpty(Master.OfferID.toString())) {
            Ajax.Callsync({
                url: Url.Action("PrintContract", "OfferDefinition"),
                data: { OfferId: Master.OfferID },
                success: (d) => {
                    let result = d.result as ResponseResult;
                    if (result.ResponseState == false) {
                        WorningMessage(result.ResponseMessage, result.ResponseMessage);
                    } else {
                        debugger;
                        var _nf: string = result.NewFile;
                        var _Of: string = result.OrgFile;
                        //aaa(_f);
                        let urlForUi: string = GetURLForUI();
                        window.open(urlForUi + "OfferDefinition/Download?Orgfile=" + _Of + "&Newfile=" + _nf, "_self");
                        //window.open(Url.Action("Download ?Newfile=" + _f, "OfferDefinition"), "_self");
                        //window.open(aaa(_f), "_self");
                    }
                }
            })
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

    function aaa(fileName: string): string {
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
        })
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
                let _StageItem: Array<P_Tr_SalesOfferStageItem> = new Array<P_Tr_SalesOfferStageItem>();

                //_StageItem = Ajax.Call<Array<P_Tr_SalesOfferStageItem>>({ url: Url.Action("GetStageItemByOffer", ControllerName), data: { OfferId: Master.OfferID } });
                AjaxApi.CallsyncApi({
                    type: "GET",
                    url: sys.apiUrl(ControllerName, "GetStageItemByOffer"),
                    data: { OfferId: Master.OfferID },
                    success: (d) => {
                        let result = d as BaseResponse;
                        if (result.IsSuccess) {
                            _StageItem = result.Response as Array<P_Tr_SalesOfferStageItem>;
                        }
                    }
                });


                let _Count: boolean = true;
                //Item Count for each stage > 0 
                for (var item of DataSourceParent) {
                    let ItemCount = _StageItem.filter(x => x.OfferStageId == item.OfferStageId).length;
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
        let _StageItem: Array<P_Tr_SalesOfferStageItem> = new Array<P_Tr_SalesOfferStageItem>();
        //_StageItem = Ajax.Call<Array<P_Tr_SalesOfferStageItem>>({ url: Url.Action("GetStageItemByOffer", ControllerName), data: { OfferId: Master.OfferID } }).filter(x => x.IsOfferItem == true);
        Ajax.Callsync({
            type: "GET",
            url: sys.apiUrl(ControllerName, "GetStageItemByOffer"),
            data: { OfferId: Master.OfferID },
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    _StageItem = result.Response as Array<P_Tr_SalesOfferStageItem>;
                }
            }
        });

        for (var item of DataSourceParent) {
            let _ItemTotal = _StageItem.filter(x => x.OfferStageId == item.OfferStageId);
            let SumItem: number = 0;
            for (var item2 of _ItemTotal) {
                if (item2.IsOfferItem == true) {
                    let _Tot: number = item2.Qty * item2.UnitPrice;
                    SumItem += _Tot;
                }
            }
            item.StageTotal = Number(SumItem.toFixed(2));
        }
        let _OfferPrice: number = Sum(DataSourceParent, "StageTotal");
        $("#txtContractPrice").val(_OfferPrice);

        let _Value: number = Number(txtDiscountPrc.value) * Number(txtContractPrice.value) / 100;
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

        if (/*Master.Status != 4 &&*/ Master.Status != 8 && SharedSession.CurrentPrivileges.CUSTOM4 == true)
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

    function GetNewOfferId(typ: number) {
        debugger;
        let id = Master.OfferID;
        Ajax.CallAsync({
            type: "GET",
            url: sys.apiUrl(ControllerName, "GetNewOfferId"),
            data: { id: id, typ: typ },
            success: (d) => {
                debugger
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    debugger;
                    //result = d.result;
                    let NewOfferId: number = Number(result.Response);
                    let Index = GetIndexByUseId(NewOfferId, TableName, FieldKey, _Condition)
                    NavigateToSearchResultKey(Number(Index), Navigate);
                }
            }
        });
    }

    function btnTrNo_onclick() {
        debugger;
        let Condition: string = "CompCode = " + _CompCode + " and BraCode = " + _BranchCode;
        sys.FindKey(Modules.OfferDefinition, "btnTrNo", Condition, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetByID", "OfferDefinition"),
                data: { id: id },
                success: (d) => {
                    debugger;
                    let result = d as PQ_GetSalesOffer;
                    //if (result.IsSuccess) {
                    Master = d.result as PQ_GetSalesOffer;

                    MasterDetails.P_TR_SalesOffer = result as PQ_GetSalesOffer;
                    debugger;
                    let Index = GetIndexByUseId(Master.OfferID, TableName, FieldKey, Condition)
                    ClientSharedWork.PageIndex = Number(Index);
                    NavigateToSearchResultKey(Number(Index), Navigate);
                    //}
                }
            });
        });
    }

    function btnSalesEngineer_onclick() {
        let Condition: string = "CompCode = " + _CompCode + " and BraCode = " + _BranchCode + "  and IsActive = 1 ";
        sys.FindKey(Modules.OfferDefinition, "btnSalesEngineer", Condition, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            let _SalesEng = GetSalesEgineerById(id) as P_D_SalesEgineer;
            txtSalesEngineerId.value = id;
            txtSalesEngineerName.value = _ScreenLang == "ar" ? _SalesEng.DeacA : _SalesEng.DescE;
            txtEngCode.value = _SalesEng.EngCode;
        });
    }

    function btnCustomer_onclick() {
        let Condition: string = "CompCode = " + _CompCode + "  and IsActive = 1 ";
        sys.FindKey(Modules.OfferDefinition, "btnCustomer", Condition, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            let _Customers = GetCustomersById(id) as P_D_SalesCustomer
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
        let _SalesCustomer: P_D_SalesCustomer = new P_D_SalesCustomer();
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
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    let _Count: number = result.Response;
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
            success: (d) => {
                let result = d.result as ResponseResult;
                if (result.ResponseState == true) {
                    let res = result.ResponseData as P_D_SalesCustomer;
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
        let Condition: string = "CompCode = " + _CompCode;
        sys.FindKey(Modules.OfferDefinition, "btnLocation", Condition, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;

            let Location = GetLocationById(id) as P_D_Location;

            txtLocationId.value = id;
            txtLoctionName.value = _ScreenLang == "ar" ? Location.DescA : Location.DescE;
            txtLocCode.value = Location.LocCode;
        })
    }

    function FillDataSource<T>(_Grid: JsGrid, _Arr: Array<T>, _Obj: any) {
        _Arr.push(_Obj);
        _Grid.DataSource = _Arr;
        _Grid.Bind();
    }

    function AddItem(e: JsGridInsertEventArgs) {
        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
            WorningMessage("لا يمكن التعديل في وضع الاستعلام", "Can't Edit in query mode");
            return;
        }

        let _ElementName: string = this.ElementName;
        switch (_ElementName) {
            case "GridParent":
                let SalesOfferStage = e.Item as P_Tr_SalesOfferStage;
                FillDataSource(GridParent, DataSourceParent, e.Item as P_Tr_SalesOfferStage);
                break;
            case "GridChild1CompResp":
                let OfferRespons = e.Item as P_TR_SalesOfferResponsibility;
                OfferRespons.IsCustomer = false;
                FillDataSource(GridChild1CompResp, DataSourceChildCompResp, OfferRespons);
                break;
            case "GridChild2CompResp":
                let OfferRespons2 = e.Item as P_TR_SalesOfferResponsibility;
                OfferRespons2.IsCustomer = true;
                FillDataSource(GridChild2CompResp, DataSourceChildCompResp2, OfferRespons2);
                break;
            case "GridChild3Pay":
                let SalOfferPay = e.Item as P_Tr_SalesOfferPayment;
                FillDataSource(GridChild3Pay, DataSourceChildPay, SalOfferPay);
                break;
        }
    }

    function Validation(): boolean {
        var _Result: boolean = true;
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
            success: (d) => {

                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    debugger
                    ClientSharedWork.SwitchModes(ScreenModes.Query);
                    let _Data: P_TR_SalesOffer = result.Response as P_TR_SalesOffer;
                    let _Id = _Data.OfferID as number;
                    SessionManager.ModelCount = result.ModelCount;

                    //Master = GetMasterById(result.Response.OfferID);

                    let msg: string = ReturnMsg("تم الحفظ برقم ", "Data Saved With Trans NO. ") + Master.TrNo.toString();
                    MessageBox.Show(msg, "Insert", () => {

                        let _Index = GetIndexByUseId(_Id, TableName, FieldKey, " CompCode = " + _CompCode + " and BraCode = " + _BranchCode);
                        NavigateToSearchResultKey(Number(_Index), Navigate)
                        SessionManager.ModelCount = result.ModelCount;
                    });
                }
                else
                    MessageBox.Show(result.ErrorMessage, "Insert");
            }
        });
    }

    function Update() {
        debugger
        Assign();
        MasterDetails.P_TR_SalesOffer.CompCode = _CompCode;
        MasterDetails.P_TR_SalesOffer.BraCode = _BranchCode;
        MasterDetails.P_TR_SalesOffer.UpdatedBy = SharedSession.CurrentEnvironment.UserCode;
        MasterDetails.P_TR_SalesOffer.UpdatedAt = (new Date()).toString();

        AjaxApi.CallsyncApi({
            type: "POST",
            url: sys.apiUrl(ControllerName, "Update"),
            data: JSON.stringify(MasterDetails),
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    ClientSharedWork.SwitchModes(ScreenModes.Query);
                    let msg: string = ReturnMsg("تم الحفظ برقم ", "Data Saved With Trans NO. ") + Master.TrNo.toString();
                    MessageBox.Show(msg, "Update", () => {

                        Master = result.Response;
                        let _Index = GetIndexByUseId(Master.OfferID, TableName, FieldKey, " CompCode = " + _CompCode + " and BraCode = " + _BranchCode);
                        NavigateToSearchResultKey(Number(_Index), Navigate)
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
            $(".jsgrid-insert-mode-button").removeAttr("disabled")
            $(".jsgrid-edit-button").removeAttr("disabled")
            $(".jsgrid-delete-button").removeAttr("disabled")
            $("#btnAddItemGrid").removeAttr("disabled");
        } else {
            $(".Custeditable").attr("disabled", "disabled");
            $(".jsgrid-insert-mode-button").attr("disabled", "disabled")
            $(".jsgrid-edit-button").attr("disabled", "disabled")
            $(".jsgrid-delete-button").attr("disabled", "disabled")
        }
    }

    function Undo() {
    }

    function Navigate() {
        debugger
        Ajax.CallAsync({
            url: Url.Action("GetByIndex", "OfferDefinition"),
            success: (d) => {
                debugger;
                Master = d.result as PQ_GetSalesOffer;
                Master.TrDate = IsNullOrEmpty(Master.TrDate) ? Master.TrDate : DateFormat(Master.TrDate);
                Master.SendDate = IsNullOrEmpty(Master.SendDate) ? Master.SendDate : DateFormat(Master.SendDate);
                Display();
                $("#btnNew").removeAttr("disabled");
                $("#btnCopy").removeAttr("disabled");
                $("#btnCalcTotal").removeAttr("disabled");
            }
        })
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

    function LoadDetails(id: number) {
        AjaxApi.CallAsyncApi({
            type: "GET",
            url: sys.apiUrl("P_TR_SalesOffer", "LoadDetails"),
            data: { id: id },
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    DataSourceParent = result.Response.PQ_GetSlsOfferStage as Array<PQ_GetSlsOfferStage>;
                    DataSourceChildCompResp = result.Response.PQ_GetSlsOfferResponsibility as Array<PQ_GetSlsOfferResponsibility>
                    DataSourceChildCompResp2 = result.Response.PQ_GetSlsOfferResponsibility2 as Array<PQ_GetSlsOfferResponsibility>
                    DataSourceChildPay = result.Response.PQ_GetSlsOfferPayment as Array<PQ_GetSlsOfferPayment>;
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
        })
    }

    function GetDropdowenData() {
        AjaxApi.CallsyncApi({
            type: "GET",
            url: sys.apiUrl("P_TR_SalesOffer", "GetDropdowenData"),
            data: { CompCode: _CompCode },
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    _Scope = result.Response.P_D_Scope;
                    Responsibility = result.Response.P_D_SalesResponsibility;
                    SalesPaymentTerms = result.Response.P_D_SalesPaymentTerms;
                }
            }
        })
    }

    function New() {
        ClearGrid(GridParent, DataSourceParent);
        DataSourceParent = new Array<PQ_GetSlsOfferStage>();
        ClearGrid(GridChild1CompResp, DataSourceChildCompResp);
        DataSourceChildCompResp = new Array<PQ_GetSlsOfferResponsibility>();
        ClearGrid(GridChild2CompResp, DataSourceChildCompResp2);
        DataSourceChildCompResp2 = new Array<PQ_GetSlsOfferResponsibility>();
        ClearGrid(GridChild3Pay, DataSourceChildPay);
        DataSourceChildPay = new Array<PQ_GetSlsOfferPayment>();
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
            success: (d) => {
                let url = d.result as string;
                window.open(url, "_blank");
            }
        })
    }

    function Assign() {
        //AssignMaster
        DocumentActions.AssignToModel<P_TR_SalesOffer>(Master);
        MasterDetails.P_TR_SalesOffer = Master as P_TR_SalesOffer;
        //AssignDetails
        let _CompResp: Array<PQ_GetSlsOfferResponsibility> = new Array<PQ_GetSlsOfferResponsibility>();
        for (var item of DataSourceChildCompResp2) {
            _CompResp.push(item);
        }
        for (var item of DataSourceChildCompResp) {
            _CompResp.push(item);
        }
        MasterDetails.P_Tr_SalesOfferStage = DataSourceParent as Array<P_Tr_SalesOfferStage>;
        MasterDetails.P_TR_SalesOfferResponsibility = _CompResp as Array<P_TR_SalesOfferResponsibility>;
        MasterDetails.P_Tr_SalesOfferPayment = DataSourceChildPay as Array<P_Tr_SalesOfferPayment>;
    }

    function FindTr() {
        sys.FindKey(Modules.OfferDefinition, "btnTr", "CompCode = " + _CompCode, () => {
            let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            let _Index = GetIndexByUseId(_Id, TableName, FieldKey, _Condition);
            NavigateToSearchResultKey(Number(_Index), Navigate);
        });
    }

    function GetMasterById(id: number): P_TR_SalesOffer {
        let _Master = Ajax.Call<P_TR_SalesOffer>({
            url: Url.Action("GetByID", "OfferDefinition"),
            data: { id: id },
        });
        return _Master;
    }

    function CreateGrid(_Grid: JsGrid = new JsGrid(), _ElementName: string) {
        _Grid.ElementName = _ElementName;
        _Grid.OnRefreshed = () => {
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

    export function CheckButtonAddInStageItem() {
        if (ClientSharedWork.CurrentMode == ScreenModes.Edit && Master.Status == 0) {
            $("#btnAddItemGrid").removeAttr("disabled");
            $("#btnDeleteItemGrid").removeAttr("disabled");
            $("#btnEditItemGrid").removeAttr("disabled");
            $("#btnFindSalesItem").removeAttr("disabled");
            $("#txtProjArea").removeAttr("disabled");
        } else {
            $("#btnAddItemGrid").attr("disabled", "disabled");
            $("#btnDeleteItemGrid").attr("disabled", "disabled");
            $("#btnEditItemGrid").attr("disabled", "disabled");
            $("#btnFindSalesItem").attr("disabled", "disabled");
            $("#txtProjArea").attr("disabled", "disabled");
        }

    }

}
