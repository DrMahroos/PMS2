$(document).ready(function () {
    IssueProduction.InitalizeComponent();
});
var IssueProduction;
(function (IssueProduction) {
    debugger;
    var ControllerName = "IssueProduction";
    var sys = new SystemTools();
    var NumberColumnWidth = "50px";
    var GridInputClassName = "form-control gridIput";
    var GridProduction = new JsGrid();
    var M_D_IssueProduction = /** @class */ (function () {
        function M_D_IssueProduction() {
            this.sessionRecord = new SessionRecord();
            this.P_TR_SalesProduction = new P_TR_SalesProduction();
        }
        return M_D_IssueProduction;
    }());
    var Productions = new Array();
    var Master = new PQ_GetSalesIssueProduction();
    var MasterDetails = new M_D_IssueProduction();
    var ApiMasterDetails = new M_D_IssueProduction();
    var DetailsIssueProduction = new Array();
    var DetailsAssignHeaderProduction = new PQ_GetSalesIssueProductionDetails();
    var Tbl_IssueProduction = new Array();
    var txtTrNo;
    var txtProjCode;
    var txtCustomerID;
    var txtProjectName;
    var txtCustomerName;
    var txtWorkDiscription;
    var txtTrDate;
    var txtRefCode;
    var txtFromDate;
    var txtToDate;
    var ChkProcess;
    var ChkIsFinal;
    //var ChkClose: HTMLInputElement;
    var txtRemarks;
    var txtProdTotal;
    var txtDiscountPrc;
    var txtDiscount;
    var txtNetAmount;
    var btnSearchProdNo;
    var btnSearchProject;
    var btnGenerateProduction;
    var btnRejectremaining;
    var projectId;
    var ItemId = 0;
    var ProjectPhaseItemId = 0;
    var productiondetailid = 0;
    var _ScreenLang;
    var _CompCode;
    var _BraCode;
    function InitalizeComponent() {
        debugger;
        SharedSession.CurrentPrivileges = GetPrivileges();
        SharedSession.CurrentEnvironment = GetSystemEnvironment();
        _ScreenLang = SharedSession.CurrentEnvironment.ScreenLanguage;
        _CompCode = SharedSession.CurrentEnvironment.CompCode;
        _BraCode = SharedSession.CurrentEnvironment.BranchCode;
        var se = GetSessionRecord();
        InitalizeControls();
        InitalizeGrid();
        SharedSession.CurrentEnvironment.ScreenLanguage = SharedSession.CurrentEnvironment.Language;
        NavigatorComponent.InitalizeComponent();
        ClientSharedWork.OnNavigate = Navigate;
        ControlsButtons.AddAction(Add);
        ControlsButtons.EditAction(Edit);
        ControlsButtons.SaveAction(function () {
            if (ClientSharedWork.CurrentMode == ScreenModes.Add) {
                Insert();
            }
            else if (ClientSharedWork.CurrentMode == ScreenModes.Edit)
                Update();
        });
        ControlsButtons.PrintAction(PrintIssueProduction);
        ControlsButtons.DeleteAction(function () { });
        ControlsButtons.UndoAction(Undo);
        InitalizeEvents();
        //Productions = Ajax.Call<Array<P_TR_SalesProduction>>({ url: Url.Action("GetProductions", ControllerName) })
        $("#ImageEditorButton").on("click", function () {
            sys.ImgPopup(_CompCode, _BraCode, Modules.IssueProduction, Master.ProjectID.toString());
        });
    }
    IssueProduction.InitalizeComponent = InitalizeComponent;
    function PrintIssueProduction() {
        Ajax.CallAsync({
            url: Url.Action("PrintIssueProduction", "PrintTransaction"),
            data: { TrID: Number(Master.ProductionId) },
            success: function (d) {
                var url = d.result;
                window.open(url, "_blank");
            }
        });
    }
    function InitalizeGrid() {
        var res = GetResourceList("SMB_");
        GridProduction.ElementName = "Grid";
        GridProduction.Inserting = false; //  SharedSession.CurrentPrivileges.AddNew;   
        $(".editable").attr("disabled", "disabled");
        $(".addable").attr("disabled", "disabled");
        //GridProduction.OnRefreshed = () => {
        //    if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
        //        $(".editable").attr("disabled", "disabled");
        //        $(".addable").attr("disabled", "disabled");
        //    }
        //    else {
        //        $(".editable").removeAttr("disabled");
        //        $(".addable").removeAttr("disabled");
        //    }
        //};
        GridProduction.Editing = false; //SharedSession.CurrentPrivileges.EDIT;
        GridProduction.ConfirmDeleteing = true; //SharedSession.CurrentPrivileges.Remove;
        GridProduction.InsertionMode = JsGridInsertionMode.Binding;
        GridProduction.OnItemInserting = function () { };
        GridProduction.OnItemUpdating = function () { };
        GridProduction.OnItemDeleting = function () { };
        GridProduction.Columns = [
            {
                title: res.SMB_itemserial, name: "Serial", width: "6%",
                headerTemplate: function () {
                    var txt = CreateElement("text", GridInputClassName, " ", " ", "Serial", " ");
                    txt.id = "h_Serial";
                    txt.disabled = true;
                    return HeaderTemplate("SMB_itemserial", txt);
                }
            },
            {
                title: res.SMB_itemcode, name: "LineCode", width: "10%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "LineCode", " ");
                    txt.id = "h_Itm_ItemCode";
                    txt.disabled = true;
                    return HeaderTemplate("SMB_LineCode", txt);
                }
            },
            {
                title: res.SMB_itemdes, visible: _ScreenLang == "ar", name: "Itm_DescA", width: "35%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "Itm_DescA", " ");
                    txt.id = "h_Itm_DescA";
                    txt.disabled = true;
                    return HeaderTemplate("SMB_itemdes", txt);
                }
            },
            {
                title: res.SMB_itemdes, visible: _ScreenLang == "en", name: "Itm_DescE", width: "35%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "Itm_DescE", " ");
                    txt.id = "h_Itm_DescE";
                    txt.disabled = true;
                    return HeaderTemplate("SMB_itemdes", txt);
                }
            },
            {
                title: res.SMB_itemqty, name: "ItemQty", width: "9.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "ItemQty", " ");
                    txt.id = "h_ItemQty";
                    txt.disabled = true;
                    return HeaderTemplate("SMB_itemqty", txt);
                }
            },
            {
                title: res.SMB_toproqty, name: "TotalProdQty", width: "9.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "TotalProdQty", " ");
                    txt.disabled = true;
                    txt.id = "h_TotalProdQty";
                    return HeaderTemplate("SMB_toproqty", txt);
                }
            },
            {
                title: res.SMB_prev, name: "PrevProdQty", width: "9.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "PrevProdQty", " ");
                    txt.disabled = true;
                    txt.id = "h_PrevProdQty";
                    return HeaderTemplate("SMB_prev", txt);
                }
            },
            {
                title: res.SMB_Current, name: "ProdQty", width: "9.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "ProdQty", " ");
                    txt.disabled = true;
                    txt.id = "h_ProdQty";
                    return HeaderTemplate("SMB_Current", txt);
                }
            },
            {
                title: res.SMB_UnitPrice, name: "UnitPrice", width: "9.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "UnitPrice", " ");
                    txt.disabled = true;
                    txt.id = "h_UnitPrice";
                    return HeaderTemplate("SMB_UnitPrice", txt);
                }
            },
            {
                title: res.SMB_total, name: "Total", width: "9.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "Total", " ");
                    txt.disabled = true;
                    txt.id = "h_Total";
                    return HeaderTemplate("SMB_total", txt);
                }
            },
            //{
            //    title: res.SMB_Remarks, name: "Remarks", width: "25.5%",
            //    headerTemplate: (): HTMLElement => {
            //        let txt = CreateElement("label", GridInputClassName, " ", " ", "Remarks", " ");
            //        txt.disabled = true;
            //        txt.id = "h_Remarks"
            //        return HeaderTemplate("SMB_Remarks", txt);
            //    }
            //},
            //{
            //    title: res.SMB_UnBilledQty, name: "UnBilledQty", width: "9.5%",
            //    headerTemplate: (): HTMLElement => {
            //        let txt = CreateElement("label", GridInputClassName, " ", " ", "UnBilledQty", " ");
            //        txt.disabled = true;
            //        txt.id = "h_UnBilledQty"
            //        return HeaderTemplate("SMB_UnBilledQty", txt);
            //    }
            //},
            //{
            //    title: res.SMB_RejectedQty, name: "RejectedQty", width: "9.5%",
            //    headerTemplate: (): HTMLElement => {
            //        let txt = CreateElement("label", GridInputClassName, " ", " ", "RejectedQty", " ");
            //        txt.id = "h_RejectedQty"
            //        txt.disabled = true;
            //        return HeaderTemplateNew(res.SMB_RejectedQty, txt);
            //    }
            //},
            {
                title: "#", name: "btnAddItem", visible: false, width: NumberColumnWidth,
                headerTemplate: function () {
                    var btn = DocumentActions.CreateElement("button");
                    btn.className = TransparentButton;
                    btn.disabled = true;
                    btn.type = "button";
                    btn.style.fontSize = "25px";
                    btn.style.color = "forestgreen";
                    btn.innerHTML = "<span class='glyphicon glyphicon-plus'></span>";
                    btn.id = "btnAddItemGrid";
                    btn.onclick = function (e) {
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }
                        AddItemInGrid();
                    };
                    return btn;
                },
                itemTemplate: function (s, item) {
                    var btn = DocumentActions.CreateElement("button");
                    btn.innerHTML = "<i class='glyphicon glyphicon-remove'></i>";
                    btn.className = TransparentButton;
                    btn.hidden = true;
                    btn.disabled = true;
                    btn.style.fontSize = "24px";
                    btn.style.color = "red";
                    btn.name = DetailsIssueProduction.indexOf(item).toString();
                    btn.onclick = function (e) {
                        //delete
                        debugger;
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }
                        var index = Number(e.currentTarget.name);
                        DetailsIssueProduction.splice(index, 1);
                        BindDataGrids();
                        //ReIndexingGrid();
                    };
                    return btn;
                }
            },
            {
                css: JsGridHeaderCenter,
                width: NumberColumnWidth,
                itemTemplate: function (s, item) {
                    var btn = DocumentActions.CreateElement("button");
                    btn.hidden = true;
                    btn.innerHTML = "<i class='glyphicon glyphicon-pencil'></i>";
                    btn.className = TransparentButton + "editable";
                    btn.disabled = true;
                    btn.hidden = true;
                    btn.style.fontSize = "20px";
                    btn.style.color = "forestgreen";
                    btn.name = DetailsIssueProduction.indexOf(item).toString();
                    btn.onclick = function (e) {
                        //edit
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }
                        var index = Number(e.currentTarget.name);
                        DetailsIssueProduction.splice(index, 1);
                        BindDataGrids();
                        //ReIndexingGrid();
                        productiondetailid = item.ProductionDetailId;
                        ItemId = item.ItemID;
                        ProjectPhaseItemId = item.ProjectPhaseItemId;
                        FillInputText("h_Serial", item.Serial.toString());
                        FillInputText("h_Itm_ItemCode", item.LineCode);
                        FillInputText("h_Itm_DescA", item.Itm_DescA);
                        FillInputText("h_Itm_DescE", item.Itm_DescE);
                        FillInputText("h_ItemQty", item.ItemQty.toString());
                        if (item.RejectedQty != null) {
                            FillInputText("h_RejectedQty", item.RejectedQty.toString());
                        }
                        else {
                            FillInputText("h_RejectedQty", "0");
                        }
                        if (item.TotalProdQty != null) {
                            FillInputText("h_TotalProdQty", item.TotalProdQty.toString());
                        }
                        if (item.PrevProdQty != null) {
                            FillInputText("h_PrevProdQty", item.PrevProdQty.toString());
                        }
                        if (item.ProdQty != null) {
                            FillInputText("h_ProdQty", item.ProdQty.toString());
                        }
                        if (item.UnitPrice != null) {
                            FillInputText("h_UnitPrice", item.UnitPrice.toString());
                        }
                        if (item.Total != null) {
                            FillInputText("h_Total", item.Total.toString());
                        }
                        //FillInputText("h_Remarks", item.Remarks);
                        //if (item.UnBilledQty != null) {
                        //    FillInputText("h_UnBilledQty", item.UnBilledQty.toString());
                        //}
                    };
                    return btn;
                }
            }
        ];
        GridProduction.DataSource = DetailsIssueProduction;
        GridProduction.Bind();
    }
    function InitalizeControls() {
        txtTrNo = DocumentActions.GetElementById("txtTrNo");
        txtProjCode = DocumentActions.GetElementById("txtProjCode");
        txtProjectName = DocumentActions.GetElementById("txtProjectName");
        txtCustomerID = DocumentActions.GetElementById("txtCustomerID");
        txtCustomerName = DocumentActions.GetElementById("txtCustomerName");
        txtTrDate = DocumentActions.GetElementById("txtTrDate");
        txtWorkDiscription = DocumentActions.GetElementById("txtWorkDiscription");
        txtRefCode = DocumentActions.GetElementById("txtRefCode");
        txtFromDate = DocumentActions.GetElementById("txtFromDate");
        ChkProcess = DocumentActions.GetElementById("ChkProcess");
        ChkIsFinal = DocumentActions.GetElementById("ChkIsFinal");
        txtToDate = DocumentActions.GetElementById("txtToDate");
        //ChkClose = DocumentActions.GetElementById<HTMLInputElement>("ChkClose");
        txtRemarks = DocumentActions.GetElementById("txtRemarks");
        txtProdTotal = DocumentActions.GetElementById("txtProdTotal");
        txtDiscountPrc = DocumentActions.GetElementById("txtDiscountPrc");
        txtDiscount = DocumentActions.GetElementById("txtDiscount");
        txtNetAmount = DocumentActions.GetElementById("txtNetAmount");
        // intialize Controles
        btnSearchProdNo = DocumentActions.GetElementById("btnSearchProdNo");
        btnSearchProject = DocumentActions.GetElementById("btnSearchProject");
        btnGenerateProduction = DocumentActions.GetElementById("btnGenerateProduction");
        btnRejectremaining = DocumentActions.GetElementById("btnRejectremaining");
    }
    function InitalizeEvents() {
        txtProjCode.onchange = SearchProject_Changed;
        txtTrNo.onchange = SearchProdNo_Changed;
        btnSearchProdNo.onclick = btnSearchProdNo_Clicked;
        btnSearchProject.onclick = btnSearchProject_Clicked;
        btnGenerateProduction.onclick = btnGenerateProduction_Clicked;
        ChkProcess.onchange = UpdateStatus;
        btnRejectremaining.onclick = RejecteRemaining;
    }
    function Navigate() {
        Ajax.CallAsync({
            url: Url.Action("GetByIndex", ControllerName),
            success: function (d) {
                Master = d.result;
                Display();
            }
        });
    }
    function Add() {
        debugger;
        txtTrDate.value = DateFormat(new Date().toString());
        txtProdTotal.value = "0";
        txtDiscountPrc.value = "0";
        txtDiscount.value = "0";
        txtNetAmount.value = "0";
        ChkProcess.checked = false;
        //ChkClose.checked = false;
        DetailsIssueProduction = new Array();
        GridProduction.DataSource = DetailsIssueProduction;
        GridProduction.Bind();
    }
    function Edit() {
    }
    function Insert() {
        Master.ProductionId = 0;
        Assign();
        Master.TrNo = 0;
        if (txtProjCode.value == "") {
            WorningMessage("يجب اختيار مشروع قبل الحفظ", "Please Select Project First");
            $('#txtProjCode').css('border', '1px solid red');
            return;
        }
        var compCode = Number(_CompCode);
        var braCode = Number(_BraCode);
        var date = txtTrDate.value;
        if (CheckDate(compCode, braCode, date) == false) {
            WorningMessage("غير مسموح بهذا التاريخ", "This Date is not allowed");
            return;
        }
        debugger;
        Master.ProjectID = projectId;
        Master.TrNo = 0; //Number(txtTrNo.value);
        Master.CompCode = Number(_CompCode);
        Master.BraCode = Number(_BraCode);
        MasterDetails.P_TR_SalesProduction.TrNo = 0;
        MasterDetails.P_TR_SalesProduction.CreatedAt = DateFormat((new Date()).toString());
        MasterDetails.P_TR_SalesProduction.CreatedBy = SharedSession.CurrentEnvironment.UserCode;
        ApiMasterDetails = MasterDetails;
        AjaxApi.CallsyncApi({
            type: "Post",
            url: sys.apiUrl("P_TR_SalesProduction", "InsertMasterDetail"),
            data: JSON.stringify(MasterDetails),
            headers: {
                'Accept': 'application/json; charset=utf-8',
                'Content-Type': 'application/json'
            },
            success: function (d) {
                debugger;
                var result = d;
                if (result.IsSuccess == true) {
                    ClientSharedWork.SwitchModes(ScreenModes.Query);
                    var msg = ReturnMsg("تم الحفظ  ", "Data Saved Successfully");
                    MessageBox.Show(msg, "Insert", function () {
                        var _ProductionId = Number(result.Response);
                        var _Index = GetIndexByUseId(_ProductionId, "PQ_GetSalesIssueProduction", "ProductionId", " CompCode = " + _CompCode + " and BraCode = " + _BraCode);
                        NavigateToSearchResultKey(Number(_Index), Navigate);
                    });
                }
                else
                    MessageBox.Show(result.Response, "Insert");
            }
        });
    }
    function Update() {
        Assign();
        Master.ProjectID = projectId;
        Master.CompCode = Number(_CompCode);
        Master.BraCode = Number(_BraCode);
        MasterDetails.P_TR_SalesProduction.UpdatedAt = DateFormat((new Date()).toString());
        MasterDetails.P_TR_SalesProduction.UpdatedBy = SharedSession.CurrentEnvironment.UserCode;
        debugger;
        AjaxApi.CallsyncApi({
            type: "Post",
            url: sys.apiUrl("P_TR_SalesProduction", "UpdateMasterDetail"),
            data: JSON.stringify(MasterDetails),
            headers: {
                'Accept': 'application/json; charset=utf-8',
                'Content-Type': 'application/json'
            },
            success: function (d) {
                var result = d;
                if (result.IsSuccess == true) {
                    ClientSharedWork.SwitchModes(ScreenModes.Query);
                    var msg = ReturnMsg("تم التعديل بنجاح  ", "Data Updated Successfuly. ");
                    MessageBox.Show(msg, "Update", function () {
                        var _ProductionId = Number(result.Response);
                        var _Index = GetIndexByUseId(_ProductionId, "PQ_GetSalesIssueProduction", "ProductionId", " CompCode = " + _CompCode + " and BraCode = " + _BraCode);
                        NavigateToSearchResultKey(Number(_Index), Navigate);
                    });
                }
                else
                    MessageBox.Show(result.Response, "update");
            }
        });
    }
    function Undo() {
    }
    function Assign() {
        debugger;
        DocumentActions.AssignToModel(Master);
        //MasterDetails.P_TR_SalesProduction = Master as P_TR_SalesProduction;
        var session = GetSessionRecord();
        var DT = new Array();
        MasterDetails.P_TR_SalesProduction = Master;
        MasterDetails.sessionRecord = session;
        //MasterDetails.P_TR_SalesProductionDetail. pop()
        //AssignDetails
        var p;
        for (var _i = 0, DetailsIssueProduction_1 = DetailsIssueProduction; _i < DetailsIssueProduction_1.length; _i++) {
            var prod = DetailsIssueProduction_1[_i];
            var Pd = new P_TR_SalesProductionDetail;
            prod.ProductionId = Master.ProductionId;
            Tbl_IssueProduction.push(prod);
            if (prod.BilledQty.toString() == "undefined" || prod.BilledQty == 0)
                Pd.BilledQty = 0;
            else
                Pd.BilledQty = prod.BilledQty;
            Pd.ItemID = prod.ItemID;
            Pd.PrevProdQty = prod.PrevProdQty;
            Pd.ProdQty = prod.ProdQty;
            Pd.ProductionDetailId = prod.ProductionDetailId;
            Pd.ProductionId = prod.ProductionId;
            Pd.ProjectPhaseItemId = prod.ProjectPhaseItemId;
            Pd.RejectedQty = prod.RejectedQty;
            Pd.Remarks = prod.Remarks;
            Pd.Serial = prod.Serial;
            Pd.UnitPrice = prod.UnitPrice;
            DT.push(Pd);
        }
        MasterDetails.P_TR_SalesProductionDetail = DT;
    }
    function AddItemInGrid() {
        if (IsNullOrEmpty($('#h_Itm_ItemCode').val()) || IsNullOrEmpty($('#h_ItemQty').val())) {
            WorningMessage("يجب اختيار عنصر للاضافة", "You Should Generate Details");
            return;
        }
        if (ItemId == 0 || ProjectPhaseItemId == 0) {
            return;
        }
        if (Number($('#h_ProdQty').val()) > Number(Number($('#h_TotalProdQty').val()) - Number($('#h_PrevProdQty').val()))) {
            WorningMessage("كمية الانجاز يجب الا تزيد عن الانجاز الحقيقي", "Prod Qty Can not exceed the Actual production");
            return;
        }
        DetailsAssignHeaderProduction = new PQ_GetSalesIssueProductionDetails();
        DetailsAssignHeaderProduction.ItemID = ItemId;
        DetailsAssignHeaderProduction.ProductionDetailId = productiondetailid;
        DetailsAssignHeaderProduction.ProjectPhaseItemId = ProjectPhaseItemId;
        DetailsAssignHeaderProduction.Serial = $('#h_Serial').val();
        DetailsAssignHeaderProduction.LineCode = $('#h_Itm_ItemCode').val();
        DetailsAssignHeaderProduction.Itm_DescA = $('#h_Itm_DescA').val();
        DetailsAssignHeaderProduction.Itm_DescE = $('#h_Itm_DescE').val();
        DetailsAssignHeaderProduction.ItemQty = $('#h_ItemQty').val();
        DetailsAssignHeaderProduction.RejectedQty = $('#h_RejectedQty').val();
        DetailsAssignHeaderProduction.TotalProdQty = $('#h_TotalProdQty').val();
        DetailsAssignHeaderProduction.PrevProdQty = $('#h_PrevProdQty').val();
        DetailsAssignHeaderProduction.ProdQty = $('#h_ProdQty').val();
        DetailsAssignHeaderProduction.UnitPrice = $('#h_UnitPrice').val();
        DetailsAssignHeaderProduction.Total = Number((Number($('#h_ProdQty').val()) * Number($('#h_UnitPrice').val())).toFixed(2));
        //DetailsAssignHeaderProduction.Remarks = $('#h_Remarks').val();
        //DetailsAssignHeaderProduction.UnBilledQty = $('#h_UnBilledQty').val();
        DetailsIssueProduction.unshift(DetailsAssignHeaderProduction);
        BindDataGrids();
        ItemId = 0;
        productiondetailid = 0;
        ProjectPhaseItemId = 0;
        CalcSum();
    }
    function BindDataGrids() {
        GridProduction.DataSource = DetailsIssueProduction;
        GridProduction.Bind();
    }
    function FillInputText(_TextID, _Data) {
        $("#" + _TextID).text(_Data);
        $("#" + _TextID).val(_Data);
    }
    function Display() {
        DocumentActions.RenderFromModel(Master);
        projectId = Master.ProjectID;
        txtTrDate.value = DateFormat(Master.TrDate);
        txtFromDate.value = DateFormat(Master.FromDate);
        txtToDate.value = DateFormat(Master.ToDate);
        //Chick to EditParmations
        Master.Status == 1 ? ControlsButtons.EditButton.disabled = true : ControlsButtons.EditButton.disabled = false;
        GetCheckValues();
        if (Master.ProductionId != null) {
            LoadDetails(Master.ProductionId);
        }
        if (Master.Status == 1 && SharedSession.CurrentPrivileges.CUSTOM1 == true) {
            $('#btnRejectremaining').removeAttr('disabled');
        }
        else {
            $('#btnRejectremaining').attr('disabled', 'disabled');
        }
        CalcSum();
    }
    function btnSearchProject_Clicked() {
        sys.FindKey(Modules.IssueProduction, "btnSearchProject", "CompCode= " + _CompCode + " and BraCode = " + _BraCode, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetProject", ControllerName),
                data: { id: id },
                success: function (d) {
                    var result = d.result;
                    for (var i = 0; i < Productions.length; i++) {
                        if (result.ProjectID == Productions[i].ProjectID && Productions[i].Status == 0) {
                            WorningMessage("The project has another not approved production", "The project has another not approved production");
                            return;
                        }
                    }
                    debugger;
                    txtProjCode.value = result.ProjectCode;
                    txtProjectName.value = result.DescL;
                    txtCustomerID.value = result.CustomerID.toString();
                    txtCustomerName.value = result.cust_DescE;
                    if (result.ContractDiscountPrc == null)
                        txtDiscountPrc.value = "0";
                    else
                        txtDiscountPrc.value = result.ContractDiscountPrc.toFixed(2);
                    txtProdTotal.value = "0";
                    txtDiscount.value = "0";
                    txtNetAmount.value = "0";
                    projectId = result.ProjectID;
                    DetailsIssueProduction = new Array();
                    ClearGrid(GridProduction, DetailsIssueProduction);
                }
            });
        });
    }
    function SearchProject_Changed() {
        var Pno = Number(txtProjCode.value);
        Ajax.CallAsync({
            url: Url.Action("getProjectViewByno", "FindByNo"),
            data: { Pno: Pno },
            success: function (d) {
                if (IsNullOrEmpty(d.result)) {
                    WorningMessage("الرمز خطأ، أعد المحاولة .... ", "Wrong Code , .. Retry .. ");
                    window.open(Url.Action(ControllerName + "Index", ControllerName), "_self");
                }
                var result = d.result;
                for (var i = 0; i < Productions.length; i++) {
                    if (result.ProjectID == Productions[i].ProjectID && Productions[i].Status == 0) {
                        WorningMessage("The project has another not approved production", "The project has another not approved production");
                        return;
                    }
                }
                debugger;
                txtProjCode.value = result[0].ProjectCode;
                txtProjectName.value = result[0].DescL;
                txtCustomerID.value = result[0].CustomerID.toString();
                txtCustomerName.value = result[0].cust_DescE;
                if (result.ContractDiscountPrc == null)
                    txtDiscountPrc.value = "0";
                else
                    txtDiscountPrc.value = result[0].ContractDiscountPrc.toFixed(2);
                txtProdTotal.value = "0";
                txtDiscount.value = "0";
                txtNetAmount.value = "0";
                projectId = result[0].ProjectID;
                DetailsIssueProduction = new Array();
                ClearGrid(GridProduction, DetailsIssueProduction);
            }
        });
    }
    function btnGenerateProduction_Clicked() {
        if (projectId == 0 || projectId == null) {
            WorningMessage("يجب اختيار مشروع اولا", "You Must Choose Project First");
            $('#txtProjCode').css('border', '1px solid red');
            $('#txtProjectName').css('border', '1px solid red');
            return;
        }
        else if (IsNullOrEmpty(txtToDate.value)) {
            WorningMessage("يجب تحديد الى تاريخ اولا", "You Must Enter ToDate value");
            $('#txtToDate').css('border', '1px solid red');
            $('#txtProjCode').css('border', '0px solid #fff');
            $('#txtProjectName').css('border', '0px solid #fff');
            return;
        }
        $('#txtToDate').css('border', '0px solid #fff');
        Ajax.CallAsync({
            url: Url.Action("PProc_Sales_Production", ControllerName),
            data: { ProjID: projectId, dt: txtToDate.value },
            success: function (d) {
                var Generated = d.result;
                var _Obj = new PQ_GetSalesIssueProductionDetails;
                DetailsIssueProduction = new Array();
                for (var _i = 0, Generated_1 = Generated; _i < Generated_1.length; _i++) {
                    var item = Generated_1[_i];
                    _Obj = item;
                    _Obj.Serial = item.serial;
                    _Obj.BilledQty = 0;
                    DetailsIssueProduction.push(_Obj);
                }
                GridProduction.DataSource = DetailsIssueProduction;
                GridProduction.Bind();
                CalcSum();
            }
        });
    }
    function LoadDetails(id) {
        Ajax.Callsync({
            url: Url.Action("LoadDetails", ControllerName),
            data: { id: id },
            success: function (d) {
                DetailsIssueProduction = d.result;
                GridProduction.DataSource = DetailsIssueProduction;
                GridProduction.Bind();
            }
        });
    }
    function GetCheckValues() {
        var currentStatus = Master.Status;
        switch (currentStatus) {
            case 0:
                ChkProcess.checked = false;
                //ChkClose.checked = false;
                break;
            case 1:
                ChkProcess.checked = true;
                //ChkClose.checked = false;
                break;
            case 2:
                ChkProcess.checked = true;
                //ChkClose.checked = true;
                break;
            default:
                break;
        }
    }
    function UpdateStatus() {
        debugger;
        Assign();
        if (Master.Status == 1) {
            WorningMessage("الحالة منفذة", "Status Cannot Change ");
            ChkProcess.checked = false;
            return;
        }
        var compCode = Number(_CompCode);
        var braCode = Number(_BraCode);
        var date = txtTrDate.value;
        if (CheckDate(compCode, braCode, date) == false) {
            WorningMessage("غير مسموح بهذا التاريخ", "This Date is not allowed");
            ChkProcess.checked = false;
            return;
        }
        Master.ProjectID = projectId;
        Master.Status = 1;
        Ajax.CallAsync({
            url: Url.Action("UpdateStatus", ControllerName),
            data: Master,
            success: function (d) {
                var result = d.result;
                if (result.ResponseState == true) {
                    ClientSharedWork.SwitchModes(ScreenModes.Query);
                    var msg = ReturnMsg("تم تعديل  الحالة بنجاح  ", "Status Updated Successfuly. ");
                    MessageBox.Show(msg, "UpdateStatus", function () {
                        Display();
                        var _Index = GetIndexByUseId(result.ResponseData.ProductionId, "PQ_GetSalesIssueProduction", "ProductionId", " CompCode = " + _CompCode + " and BraCode = " + _BraCode);
                        NavigateToSearchResultKey(Number(_Index), Navigate);
                    });
                }
            }
        });
    }
    function RejecteRemaining() {
        Master.Status = 2;
        Update();
    }
    function btnSearchProdNo_Clicked() {
        sys.FindKey(Modules.IssueProduction, "btnSearchProdNo", "CompCode = " + _CompCode + " and BraCode = " + _BraCode, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetIssueProduction", ControllerName),
                data: { id: id },
                success: function (d) {
                    MasterDetails = d.result;
                    Master = d.result;
                    var Index = GetIndexByUseId(Number(Master.ProductionId), "PQ_GetSalesIssueProduction", "ProductionId", " CompCode = " + _CompCode + " and BraCode = " + _BraCode);
                    NavigateToSearchResultKey(Number(Index), Navigate);
                }
            });
        });
    }
    function SearchProdNo_Changed() {
        var trno = Number(txtTrNo.value);
        Ajax.CallAsync({
            url: Url.Action("getSalesProductionViewByNo", "FindByNo"),
            data: { trno: trno },
            success: function (d) {
                if (IsNullOrEmpty(d.result)) {
                    WorningMessage("الرمز خطأ، أعد المحاولة .... ", "Wrong Code , .. Retry .. ");
                    window.open(Url.Action(ControllerName + "Index", ControllerName), "_self");
                }
                Master = d.result;
                var Index = GetIndexByUseId(Number(Master.ProductionId), "PQ_GetSalesIssueProduction", "ProductionId", " CompCode = " + _CompCode + " and BraCode = " + _BraCode);
                NavigateToSearchResultKey(Number(Index), Navigate);
            }
        });
    }
    function CalcSum() {
        var sum = 0;
        for (var _i = 0, DetailsIssueProduction_2 = DetailsIssueProduction; _i < DetailsIssueProduction_2.length; _i++) {
            var itm = DetailsIssueProduction_2[_i];
            sum += Number(itm.Total);
        }
        txtProdTotal.value = sum.toFixed(2).toString();
        txtDiscount.value = (sum * Number(txtDiscountPrc.value) / 100).toFixed(2);
        txtNetAmount.value = (Number(txtProdTotal.value) - Number(txtDiscount.value)).toFixed(2);
    }
})(IssueProduction || (IssueProduction = {}));
//# sourceMappingURL=IssueProduction.js.map