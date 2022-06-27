$(document).ready(function () {
    MaterialRequest.InitalizeComponent();
});
var MaterialRequest;
(function (MaterialRequest) {
    var sys = new SystemTools();
    var MaterialGrid = new JsGrid();
    var ControllerName = "MaterialRequest";
    var GridInputClassName = "form-control gridIput";
    var columnWidth = "100px";
    var NumberColumnWidth = "50px";
    var MaterialDatasource = new Array();
    var DetailsMaterial = new Array();
    var DetailsAssignHeaderMaterial = new PQ_GetResRequestMaterialDetails();
    var Tbl_DetailMat = new Array();
    var MasterDetails = new M_D_ReqMaterial();
    var Master = new PQ_GetResRequestMaterial();
    var txtTrNo;
    var txtSchduleTrNo;
    var txtWorkDescr;
    var txtSo_TrNo;
    var txtSo_DescE;
    var txtPrj_ProjectCode;
    var txtPhase_ProjectPhaseCode;
    var txtEng_EngCode;
    var txtEng_DescE;
    var txtTrDate;
    var txtRemarks;
    var txtApprovedBy;
    var txtRequestedBy;
    var rdServiceorder;
    var rdSchdule;
    var btnSearchRequest;
    var btnSeachSchdule;
    var btnSearchSO;
    //var btnNew: HTMLButtonElement;
    var btnRequest;
    var btnApprove;
    var btnclose;
    var chkStatus;
    var _compCode;
    var _braCode;
    var _screenLang;
    var ScheduleId;
    var ServiceOrderId;
    var ItemId;
    var RequestMaterialDetailId;
    var RequestMaterialId;
    function InitalizeComponent() {
        SharedSession.CurrentPrivileges = GetPrivileges();
        SharedSession.CurrentEnvironment = GetSystemEnvironment();
        _compCode = ClientSharedWork.Session.CompCode;
        _braCode = ClientSharedWork.Session.BranchCode;
        _screenLang = ClientSharedWork.Session.ScreenLanguage;
        ControlsButtons.AddButton.disabled = false;
        ControlsButtons.EditButton.disabled = false;
        ControlsButtons.DeleteButton.disabled = true;
        ControlsButtons.PrintButton.disabled = false;
        InitalizeControls();
        InitalizeEvents();
        InitalizeGrid();
        SharedSession.CurrentEnvironment.ScreenLanguage = ClientSharedWork.Session.Language;
        NavigatorComponent.InitalizeComponent();
        ClientSharedWork.OnNavigate = Navigate;
        ControlsButtons.AddAction(Add);
        ControlsButtons.EditAction(Edit);
        ControlsButtons.SaveAction(function () {
            if (ClientSharedWork.CurrentMode == ScreenModes.Add)
                Insert();
            else if (ClientSharedWork.CurrentMode == ScreenModes.Edit)
                Update();
        });
        ControlsButtons.UndoAction(function () { });
        //$('#btnNew').attr('disabled', 'disabled');
        //$('#btnRequest').attr('disabled', 'disabled');
        //$('#btnApprove').attr('disabled', 'disabled');
        //$('#btnclose').attr('disabled', 'disabled');
        ControlsButtons.PrintAction(function () { PrintMaterialReturn(); });
        $("#ImageEditorButton").on("click", function () {
            sys.ImgPopup(_compCode, _braCode, Modules.MaterialRequest, Master.RequestMaterialId.toString());
        });
    }
    MaterialRequest.InitalizeComponent = InitalizeComponent;
    function PrintMaterialReturn() {
        Ajax.CallAsync({
            url: Url.Action("PrintMaterialRequest", "PrintTransaction"),
            data: { TrID: Number(Master.RequestMaterialId) },
            success: function (d) {
                var url = d.result;
                window.open(url, "_blank");
            }
        });
    }
    function InitalizeControls() {
        txtTrNo = DocumentActions.GetElementById("txtTrNo");
        txtSchduleTrNo = DocumentActions.GetElementById("txtSchduleTrNo");
        //txtScheduleId = DocumentActions.GetElementById<HTMLInputElement>("txtScheduleId");
        txtWorkDescr = DocumentActions.GetElementById("txtWorkDescr");
        txtSo_TrNo = DocumentActions.GetElementById("txtSo_TrNo");
        txtSo_DescE = DocumentActions.GetElementById("txtSo_DescE");
        txtPrj_ProjectCode = DocumentActions.GetElementById("txtPrj_ProjectCode");
        txtPhase_ProjectPhaseCode = DocumentActions.GetElementById("txtPhase_ProjectPhaseCode");
        txtEng_EngCode = DocumentActions.GetElementById("txtEng_EngCode");
        txtEng_DescE = DocumentActions.GetElementById("txtEng_DescE");
        txtTrDate = DocumentActions.GetElementById("txtTrDate");
        txtRemarks = DocumentActions.GetElementById("txtRemarks");
        txtApprovedBy = DocumentActions.GetElementById("txtApprovedBy");
        txtRequestedBy = DocumentActions.GetElementById("txtRequestedBy");
        rdServiceorder = DocumentActions.GetElementById("rdServiceorder");
        rdSchdule = DocumentActions.GetElementById("rdSchdule");
        btnSearchRequest = DocumentActions.GetElementById("btnSearchRequest");
        btnSeachSchdule = DocumentActions.GetElementById("btnSeachSchdule");
        btnSearchSO = DocumentActions.GetElementById("btnSearchSO");
        //btnNew = DocumentActions.GetElementById<HTMLButtonElement>("btnNew");
        btnRequest = DocumentActions.GetElementById("btnRequest");
        btnApprove = DocumentActions.GetElementById("btnApprove");
        btnclose = DocumentActions.GetElementById("btnclose");
        chkStatus = DocumentActions.GetElementById("chkStatus");
    }
    function InitalizeEvents() {
        btnSearchRequest.onclick = btnSearchRequest_Clicked;
        btnSeachSchdule.onclick = btnSearchSchdule_Clicked;
        btnSearchSO.onclick = btnSearchSO_Clicked;
        rdSchdule.onclick = RequestTypeChange;
        rdServiceorder.onclick = RequestTypeChange;
        //btnNew.onclick = btnNew_Clicked;
        btnRequest.onclick = btnRequest_Clicked;
        btnApprove.onclick = btnApprove_Clicked;
        btnclose.onclick = btnclose_Clicked;
    }
    function InitalizeGrid() {
        // GridMaterial
        var res = GetResourceList("Resm_Bill_material");
        MaterialGrid.ElementName = "GridMaterial";
        MaterialGrid.Inserting = SharedSession.CurrentPrivileges.AddNew;
        MaterialGrid.OnRefreshed = function () {
            if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                $(".editable").attr("disabled", "disabled");
                $(".addable").attr("disabled", "disabled");
            }
            else {
                $(".editable").removeAttr("disabled");
                $(".addable").removeAttr("disabled");
            }
        };
        MaterialGrid.Editing = SharedSession.CurrentPrivileges.EDIT;
        MaterialGrid.ConfirmDeleteing = SharedSession.CurrentPrivileges.Remove;
        MaterialGrid.InsertionMode = JsGridInsertionMode.Binding;
        MaterialGrid.OnItemInserting = function () { };
        MaterialGrid.OnItemUpdating = function () { };
        MaterialGrid.OnItemDeleting = function () { };
        MaterialGrid.Columns = [
            {
                title: GetResourceByName("Resm_Bill_material_itemcode"), name: "itm_ItemCode", width: columnWidth, css: JsGridHeaderCenter,
                headerTemplate: function () {
                    var btnFindMaterial = DocumentActions.CreateElement("button");
                    btnFindMaterial = DocumentActions.CreateElement("button");
                    btnFindMaterial.className = "btn btn-primary btn-block addable editable";
                    btnFindMaterial.innerText = ClientSharedWork.Session.ScreenLanguage == "ar" ? "تحميل المواد" : "Material";
                    btnFindMaterial.id = "btnFindMaterial";
                    btnFindMaterial.type = "button";
                    btnFindMaterial.onclick = function (e) {
                        btnFindMaterial_onclick();
                    };
                    return HeaderTemplate("Resm_Bill_material_itemcode", btnFindMaterial);
                },
                itemTemplate: function (index, item) {
                    var lbl = DocumentActions.CreateElement("label");
                    lbl.innerText = item.itm_ItemCode;
                    return lbl;
                }
            },
            {
                title: GetResourceByName("Resm_Bill_material_itemdesc"), visible: ClientSharedWork.Session.ScreenLanguage == "ar", name: "itm_DescA", width: "20.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "itm_DescA", " ");
                    txt.id = "h_itm_DescA";
                    txt.disabled = true;
                    return HeaderTemplate("Resm_Bill_material_itemdesc", txt);
                }
            },
            {
                title: GetResourceByName("Resm_Bill_material_itemdesc"), visible: ClientSharedWork.Session.ScreenLanguage == "en", name: "itm_DescL", width: "20.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "itm_DescL", " ");
                    txt.id = "h_itm_DescL";
                    txt.disabled = true;
                    return HeaderTemplate("Resm_Bill_material_itemdesc", txt);
                }
            },
            {
                title: GetResourceByName("Resm_Bill_material_unit"), visible: ClientSharedWork.Session.ScreenLanguage == "ar", name: "Uom_DescA", width: "9.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "Uom_DescA", " ");
                    txt.id = "h_Uom_DescA";
                    txt.disabled = true;
                    return HeaderTemplate("Resm_Bill_material_unit", txt);
                }
            },
            {
                title: GetResourceByName("Resm_Bill_material_unit"), visible: ClientSharedWork.Session.ScreenLanguage == "en", name: "Uom_DescE", width: "9.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "Uom_DescE", " ");
                    txt.id = "h_Uom_DescE";
                    txt.disabled = true;
                    return HeaderTemplate("Resm_Bill_material_unit", txt);
                }
            },
            //{
            //    title: GetResourceByName("Resm_Bill_material_SchedRemain"), visible: false, name: "SchedQty", width: "9.5%",
            //    headerTemplate: (): HTMLElement => {
            //        let txt = CreateElement("label", GridInputClassName, " ", " ", "SchedQty", " ");
            //        txt.id = "h_SchedQty"
            //        txt.disabled = true;
            //        txt.onkeyup = (e) => {
            //            
            //        };
            //        return HeaderTemplate("Resm_Bill_material_SchedRemain", txt);
            //    }
            //},
            {
                title: GetResourceByName("Resm_Bill_material_RequiredQty"), name: "RequiredQty", width: "9.5%", type: "number",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "RequiredQty", " ");
                    txt.id = "h_RequiredQty";
                    txt.type = "number";
                    txt.disabled = false;
                    txt.onkeyup = function (e) {
                        $('#h_ReqQty').val($('#h_RequiredQty').val());
                        $('#h_BalanceQty').val(Number($("#h_ReqQty").val()) - Number($("#h_IssuedQty").val()) + Number($("#h_ReturnQty").val()));
                    };
                    return HeaderTemplate("Resm_Bill_material_RequiredQty", txt);
                }
            },
            {
                title: GetResourceByName("Resm_Bill_material_ApprovedQty"), name: "ReqQty", width: "9.5%", type: "number",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "ReqQty", " ");
                    txt.id = "h_ReqQty";
                    txt.type = "number";
                    txt.disabled = false;
                    txt.onkeyup = function (e) {
                        $('#h_BalanceQty').val(Number($("#h_ReqQty").val()) - Number($("#h_IssuedQty").val()) + Number($("#h_ReturnQty").val()));
                    };
                    return HeaderTemplate("Resm_Bill_material_ApprovedQty", txt);
                }
            },
            {
                title: GetResourceByName("Resm_Bill_material_IssuedQty"), name: "IssuedQty", width: "9.5%", type: "number",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "IssuedQty", " ");
                    txt.id = "h_IssuedQty";
                    txt.type = "number";
                    txt.disabled = true;
                    return HeaderTemplate("Resm_Bill_material_IssuedQty", txt);
                }
            },
            {
                title: GetResourceByName("Resm_Bill_material_ReturnQty"), name: "ReturnQty", width: "9.5%", type: "number",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "ReturnQty", " ");
                    txt.id = "h_ReturnQty";
                    txt.type = "number";
                    txt.disabled = true;
                    return HeaderTemplate("Resm_Bill_material_ReturnQty", txt);
                }
            },
            {
                title: GetResourceByName("Resm_Bill_material_BalanceQty"), name: "BalanceQty", width: "9.5%", type: "number",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "BalanceQty", " ");
                    txt.id = "h_BalanceQty";
                    txt.type = "number";
                    txt.disabled = true;
                    return HeaderTemplate("Resm_Bill_material_BalanceQty", txt);
                }
            },
            {
                title: "#", name: "btnAddItem", visible: true, width: NumberColumnWidth,
                headerTemplate: function () {
                    var btn = DocumentActions.CreateElement("button");
                    btn.className = TransparentButton;
                    btn.type = "button";
                    btn.style.fontSize = "25px";
                    btn.style.color = "forestgreen";
                    btn.innerHTML = "<span class='glyphicon glyphicon-plus'></span>";
                    btn.id = "btnAddItemMaterialGrid";
                    btn.onclick = function (e) {
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }
                        AddItemInMaterialGrid();
                    };
                    return btn;
                },
                itemTemplate: function (s, item) {
                    var btn = DocumentActions.CreateElement("button");
                    btn.innerHTML = "<i class='glyphicon glyphicon-remove'></i>";
                    btn.className = TransparentButton;
                    btn.style.fontSize = "24px";
                    btn.type = "button";
                    btn.id = "btnDeleteGrid";
                    btn.style.color = "red";
                    btn.name = DetailsMaterial.indexOf(item).toString();
                    btn.onclick = function (e) {
                        debugger;
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }
                        var index = Number(e.currentTarget.name);
                        DetailsMaterial.splice(index, 1);
                        BindDataGrid();
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
                    btn.innerHTML = "<i class='glyphicon glyphicon-pencil'></i>";
                    btn.className = TransparentButton;
                    btn.style.fontSize = "20px";
                    btn.style.color = "forestgreen";
                    btn.type = "button";
                    btn.id = "btnEditGrid";
                    btn.name = DetailsMaterial.indexOf(item).toString();
                    btn.onclick = function (e) {
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }
                        debugger;
                        DetailsAssignHeaderMaterial = new PQ_GetResRequestMaterialDetails();
                        ItemId = item.ItemId;
                        RequestMaterialDetailId = item.RequestMaterialDetailId;
                        RequestMaterialId = item.RequestMaterialId;
                        DetailsAssignHeaderMaterial.itm_ItemCode = item.itm_ItemCode;
                        DetailsAssignHeaderMaterial.itm_DescA = item.itm_DescA;
                        DetailsAssignHeaderMaterial.itm_DescL = item.itm_DescL;
                        DetailsAssignHeaderMaterial.Uom_DescA = item.Uom_DescA;
                        DetailsAssignHeaderMaterial.Uom_DescE = item.Uom_DescE;
                        DetailsAssignHeaderMaterial.BalanceQty = item.BalanceQty;
                        DetailsAssignHeaderMaterial.Remarks = item.Remarks;
                        DetailsAssignHeaderMaterial.IssuedQty = item.IssuedQty;
                        DetailsAssignHeaderMaterial.ReqBeforeQty = item.ReqBeforeQty;
                        DetailsAssignHeaderMaterial.ReqQty = item.ReqQty;
                        DetailsAssignHeaderMaterial.RequiredQty = item.RequiredQty;
                        DetailsAssignHeaderMaterial.ReturnQty = item.ReturnQty;
                        DetailsAssignHeaderMaterial.SchedQty = item.SchedQty;
                        var index = Number(e.currentTarget.name);
                        DetailsMaterial.splice(index, 1);
                        BindDataGrid();
                        //ReIndexingGrid();
                        if (Master.Status == 0 || Master.Status == null) {
                            $('#h_ReqQty').attr('disabled', 'disabled');
                            $('#h_RequiredQty').removeAttr('disabled');
                            $('#btnDeleteGrid').removeAttr('disabled');
                        }
                        else if (Master.Status == 1) {
                            $('#h_ReqQty').removeAttr('disabled');
                            $('#h_RequiredQty').attr('disabled', 'disabled');
                            $('#btnDeleteGrid').attr('disabled', 'disabled');
                        }
                        DetailsAssignHeaderMaterial.ItemId = ItemId;
                        DetailsAssignHeaderMaterial.RequestMaterialDetailId = RequestMaterialDetailId;
                        DetailsAssignHeaderMaterial.RequestMaterialId = RequestMaterialId;
                        $('#btnFindMaterial').text(DetailsAssignHeaderMaterial.itm_ItemCode);
                        FillInputText("h_itm_DescA", DetailsAssignHeaderMaterial.itm_DescA);
                        FillInputText("h_itm_DescL", DetailsAssignHeaderMaterial.itm_DescL);
                        FillInputText("h_Uom_DescA", DetailsAssignHeaderMaterial.Uom_DescA);
                        FillInputText("h_Uom_DescE", DetailsAssignHeaderMaterial.Uom_DescE);
                        FillInputText("h_BalanceQty", DetailsAssignHeaderMaterial.BalanceQty.toString());
                        FillInputText("h_IssuedQty", DetailsAssignHeaderMaterial.IssuedQty.toString());
                        FillInputText("h_ReqBeforeQty", DetailsAssignHeaderMaterial.ReqBeforeQty.toString());
                        FillInputText("h_ReqQty", DetailsAssignHeaderMaterial.ReqQty.toString());
                        FillInputText("h_RequiredQty", DetailsAssignHeaderMaterial.RequiredQty.toString());
                        FillInputText("h_ReturnQty", DetailsAssignHeaderMaterial.ReturnQty.toString());
                        FillInputText("h_SchedQty", DetailsAssignHeaderMaterial.SchedQty.toString());
                    };
                    return btn;
                }
            }
        ];
        MaterialGrid.DataSource = DetailsMaterial;
        if (Master.Status == 0 || Master.Status == null) {
            $('#h_ReqQty').attr('disabled', 'disabled');
            $('#h_RequiredQty').removeAttr('disabled');
            $('#btnDeleteGrid').removeAttr('disabled');
        }
        else if (Master.Status == 1) {
            $('#h_ReqQty').removeAttr('disabled');
            $('#h_RequiredQty').attr('disabled', 'disabled');
            $('#btnDeleteGrid').attr('disabled', 'disabled');
        }
        MaterialGrid.Bind();
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
        DetailsMaterial = new Array();
        ClearGrid(MaterialGrid, null);
        rdSchdule.checked = true;
        txtTrDate.value = DateFormat(new Date().toString());
        $('#btnSearchSO').attr('disabled', 'disabled');
        Master.Status = 0;
        $("#chkStatus").val("0");
        //$('#btnNew').removeAttr('disabled');
        //$('#btnRequest').removeAttr('disabled');
        //$('#btnApprove').removeAttr('disabled');
        //$('#btnclose').removeAttr('disabled');
    }
    function Edit() {
        if (Master.Status == 1) {
            debugger;
            $('#btnApprove').removeAttr('disabled');
            $('#btnclose').removeAttr('disabled');
            $('#txtApprovedBy').removeAttr('disabled');
            $('#txtRemarks').removeAttr('disabled');
            $('#h_RequiredQty').attr('disabled', 'disabled');
            $('#btnDeleteGrid').attr('disabled', 'disabled');
        }
        if (Master.Status == 0) {
            $('#txtRequestedBy').removeAttr('disabled');
            $('#txtApprovedBy').removeAttr('disabled');
            $('#txtRemarks').removeAttr('disabled');
            $('#h_RequiredQty').removeAttr('disabled');
            $('#btnDeleteGrid').removeAttr('disabled');
            if (SharedSession.CurrentPrivileges.CUSTOM1 == true) {
                $('#btnRequest').removeAttr('disabled');
            }
        }
        //if (Master.Status != 0 && SharedSession.CurrentPrivileges.CUSTOM2 == true) {
        //    $('#btnApprove').removeAttr('disabled');
        //    $('#btnclose').removeAttr('disabled');
        //}
        if (Master.Status == 2) {
            $('#btnclose').removeAttr('disabled');
        }
        if (Master.Status == 3) {
            ControlsButtons.EditButton.disabled = true;
        }
    }
    function Display() {
        DocumentActions.RenderFromModel(Master);
        RequestMaterialId = Master.RequestMaterialId;
        ScheduleId = Master.ScheduleId;
        ServiceOrderId = Master.SubServiceOrderId;
        LoadDetails(Master.RequestMaterialId);
        //if (Master.Status != 0) {
        //    ControlsButtons.EditButton.disabled = true;
        //} else {
        //    ControlsButtons.EditButton.disabled = false;
        //}
        //$('#btnNew').attr('disabled', 'disabled');
        $('#btnRequest').attr('disabled', 'disabled');
        $('#btnApprove').attr('disabled', 'disabled');
        $('#btnclose').attr('disabled', 'disabled');
        if (txtSchduleTrNo.value == "") {
            rdServiceorder.checked = true;
        }
        if (txtSo_TrNo.value == "") {
            rdSchdule.checked = true;
        }
        if (Master.Status == 3) {
            ControlsButtons.EditButton.disabled = true;
        }
        GetStatusValues();
    }
    function Insert() {
        Assign();
        if (IsNullOrEmpty(txtSchduleTrNo.value) && IsNullOrEmpty(txtSo_TrNo.value)) {
            WorningMessage("يجب اختيار جدول عمل أو أمر مقاول باطن قبل الحفظ", "You Should Select Service Order Or Schedule");
            return;
        }
        Master.TrNo = null;
        Master.Status = 0;
        Master.RequestMaterialId = 0;
        Master.ScheduleId = ScheduleId;
        Master.SubServiceOrderId = ServiceOrderId;
        Master.BraCode = Number(_braCode);
        Master.CompCode = Number(_compCode);
        Ajax.CallAsync({
            url: Url.Action("InsertMaterial", ControllerName),
            data: { JsonData: JSON.stringify(MasterDetails) },
            success: function (d) {
                var result = d.result;
                if (result.ResponseState == true) {
                    ClientSharedWork.SwitchModes(ScreenModes.Query);
                    var msg = ReturnMsg("تم الحفظ  ", "Data Saved");
                    MessageBox.Show(msg, "Insert", function () {
                        //Display();
                        var _Index = GetIndexByUseId(result.ResponseData, "PQ_GetResRequestMaterial", "RequestMaterialId", "CompCode = " + _compCode + " and BraCode = " + _braCode);
                        NavigateToSearchResultKey(Number(_Index), Navigate);
                    });
                }
                else
                    MessageBox.Show(result.ResponseMessage, "Insert");
            }
        });
    }
    function Update() {
        Assign();
        if (IsNullOrEmpty(txtSchduleTrNo.value) && IsNullOrEmpty(txtSo_TrNo.value)) {
            WorningMessage("يجب اختيار جدول عمل أو أمر مقاول باطن قبل الحفظ", "You Should Select Service Order Or Schedule");
            return;
        }
        Master.ScheduleId = ScheduleId;
        Master.SubServiceOrderId = ServiceOrderId;
        Master.CompCode = Number(_compCode);
        Master.BraCode = Number(_braCode);
        Ajax.Callsync({
            url: Url.Action("UpdateMaterial", ControllerName),
            data: { JsonData: JSON.stringify(MasterDetails) },
            success: function (d) {
                var result = d.result;
                if (result.ResponseState == true) {
                    ClientSharedWork.SwitchModes(ScreenModes.Query);
                    var msg = ReturnMsg("تم التعديل بنجاح  ", "Data Updated Successfuly. ");
                    MessageBox.Show(msg, "Insert", function () {
                        debugger;
                        Display();
                        var _Index = GetIndexByUseId(result.ResponseData, "PQ_GetResRequestMaterial", "RequestMaterialId", "CompCode = " + _compCode + " and BraCode = " + _braCode);
                        NavigateToSearchResultKey(Number(_Index), Navigate);
                    });
                }
            }
        });
    }
    function btnSearchSchdule_Clicked() {
        sys.FindKey(Modules.MaterialRequest, "btnSeachSchdule", " CompCode = " + _compCode + " and BraCode = " + _braCode + " and Status = 1 ", function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetSchduleById", ControllerName),
                data: { id: id },
                success: function (d) {
                    var schadule = d.result;
                    ScheduleId = schadule.ScheduleId;
                    ServiceOrderId = null;
                    txtSchduleTrNo.value = schadule.TrNo.toString();
                    txtWorkDescr.value = schadule.WorkDescr;
                    txtPrj_ProjectCode.value = schadule.Prj_ProjectCode;
                    txtPhase_ProjectPhaseCode.value = schadule.Phase_ProjectPhaseCode;
                    txtEng_EngCode.value = schadule.Eng_EngCode;
                    txtEng_DescE.value = schadule.Eng_DescE;
                }
            });
        });
    }
    function btnSearchSO_Clicked() {
        debugger;
        sys.FindKey(Modules.MaterialRequest, "btnSearchSO", "CompCode = " + _compCode + " and BraCode = " + _braCode
            + " and Status = 1", function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetServiceOrderById", ControllerName),
                data: { id: id },
                success: function (d) {
                    debugger;
                    var serviceOrder = d.result;
                    ServiceOrderId = serviceOrder.SubServiceOrderId;
                    ScheduleId = null;
                    txtSo_TrNo.value = serviceOrder.TrNo.toString();
                    txtPrj_ProjectCode.value = serviceOrder.Proj_ProjectCode.toString();
                    txtPhase_ProjectPhaseCode.value = serviceOrder.Phase_ProjectPhaseCode;
                    txtEng_EngCode.value = serviceOrder.Eng_EngCode;
                    if (_screenLang == "ar") {
                        txtSo_DescE.value = serviceOrder.DescA;
                        txtEng_DescE.value = serviceOrder.Eng_DescA;
                    }
                    else {
                        txtSo_DescE.value = serviceOrder.DescE;
                        txtEng_DescE.value = serviceOrder.Eng_DescE;
                    }
                }
            });
        });
    }
    function RequestTypeChange() {
        if (rdSchdule.checked == true) {
            txtSo_TrNo.value = "";
            txtSo_DescE.value = "";
            $('#btnSearchSO').attr('disabled', 'disabled');
            $('#btnSeachSchdule').removeAttr('disabled');
        }
        else if (rdServiceorder.checked == true) {
            txtSchduleTrNo.value = "";
            txtWorkDescr.value = "";
            $('#btnSeachSchdule').attr('disabled', 'disabled');
            $('#btnSearchSO').removeAttr('disabled');
        }
        txtPrj_ProjectCode.value = "";
        txtPhase_ProjectPhaseCode.value = "";
        txtEng_EngCode.value = "";
        txtEng_DescE.value = "";
        DetailsMaterial = new Array();
        ClearGrid(MaterialGrid, null);
    }
    function FillInputText(_TextID, _Data) {
        $("#" + _TextID).text(_Data);
        $("#" + _TextID).val(_Data);
    }
    function BindDataGrid() {
        MaterialGrid.DataSource = DetailsMaterial;
        MaterialGrid.Bind();
    }
    function AddItemInMaterialGrid() {
        if ($("#btnFindMaterial").val() == "Material") {
            WorningMessage("يجب اختيار مادة", "You Should Select Material");
            return;
        }
        debugger;
        for (var _i = 0, DetailsMaterial_1 = DetailsMaterial; _i < DetailsMaterial_1.length; _i++) {
            var itm = DetailsMaterial_1[_i];
            if (itm.ItemId == ItemId) {
                WorningMessage("لا يمكن تكرار المادة", "Material Cannot Repeated");
                return;
            }
        }
        DetailsAssignHeaderMaterial = new PQ_GetResRequestMaterialDetails();
        DetailsAssignHeaderMaterial.ItemId = ItemId;
        DetailsAssignHeaderMaterial.RequestMaterialDetailId = RequestMaterialDetailId;
        DetailsAssignHeaderMaterial.RequestMaterialId = RequestMaterialId;
        DetailsAssignHeaderMaterial.itm_ItemCode = $('#btnFindMaterial').text();
        DetailsAssignHeaderMaterial.itm_DescA = $('#h_itm_DescA').val();
        DetailsAssignHeaderMaterial.itm_DescL = $('#h_itm_DescL').val();
        DetailsAssignHeaderMaterial.Uom_DescA = $('#h_Uom_DescA').val();
        DetailsAssignHeaderMaterial.Uom_DescE = $('#h_Uom_DescE').val();
        DetailsAssignHeaderMaterial.SchedQty = Number($('#h_SchedQty').val());
        DetailsAssignHeaderMaterial.RequiredQty = Number($('#h_RequiredQty').val());
        DetailsAssignHeaderMaterial.ReqQty = Number($('#h_ReqQty').val());
        DetailsAssignHeaderMaterial.IssuedQty = Number($('#h_IssuedQty').val());
        DetailsAssignHeaderMaterial.ReturnQty = Number($('#h_ReturnQty').val());
        DetailsAssignHeaderMaterial.BalanceQty = Number($('#h_BalanceQty').val());
        //DetailsAssignHeaderMaterial.ReqBeforeQty = $('#h_h_WastQty').val();
        DetailsMaterial.unshift(DetailsAssignHeaderMaterial);
        BindDataGrid();
    }
    function btnFindMaterial_onclick() {
        debugger;
        sys.FindKey(Modules.MaterialRequest, "btnFindMaterial", " CompCode =" + _compCode, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetMaterialById", ControllerName),
                data: { id: id, /*ScheduleId: ScheduleId*/ },
                success: function (d) {
                    debugger;
                    //PQ_GetEngWorkSchduleMaterial where schedule id and material id 
                    var material = d.result;
                    ItemId = material.ItemID;
                    //ScheduleId = material.ScheduleId;
                    //ServiceOrderId = material.SubServiceOrderId;
                    $('#btnFindMaterial').text(material.ItemCode);
                    $('#h_itm_DescL').val(material.DescL);
                    $('#h_itm_DescA').val(material.DescA);
                    $('#h_Uom_DescA').val(material.Unit_descA);
                    $('#h_Uom_DescE').val(material.Unit_descE);
                    //$('#h_SchedQty').val(material.SchedQty - material.ReqQty);
                    $('#h_SchedQty').val(0);
                    $("#h_ReqBeforeQty").val(0);
                    $('#h_IssuedQty').val(0);
                    $('#h_ReturnQty').val(0);
                }
            });
        });
    }
    function Assign() {
        //AssignMaster
        //Master = new P_D_Activity();
        DocumentActions.AssignToModel(Master);
        MasterDetails.P_TR_ResRequestMaterial = Master;
        MasterDetails.P_TR_ResRequestMaterial.RequestMaterialId = Master.RequestMaterialId;
        MasterDetails.P_TR_ResRequestMaterial.ScheduleId = Number(Master.ScheduleId);
        //AssignDetails
        MasterDetails.P_TR_ResRequestMaterialDetail = DetailsMaterial;
        for (var _i = 0, DetailsMaterial_2 = DetailsMaterial; _i < DetailsMaterial_2.length; _i++) {
            var mat = DetailsMaterial_2[_i];
            mat.RequestMaterialId = Master.RequestMaterialId;
            Tbl_DetailMat.push(mat);
        }
    }
    function LoadDetails(id) {
        Ajax.Callsync({
            url: Url.Action("LoadDetails", ControllerName),
            data: { id: id },
            success: function (d) {
                DetailsMaterial = d.result;
                MaterialGrid.DataSource = DetailsMaterial;
                MaterialGrid.Bind();
            }
        });
    }
    //function btnNew_Clicked() {
    //    
    //    $('#chkStatus').val('0');
    //}
    function btnRequest_Clicked() {
        if (txtRequestedBy.value == null || txtRequestedBy.value == "") {
            WorningMessage("الرجاء ادخال بتوصية من", "Please enter RequestedBy");
            return;
        }
        $('#chkStatus').val('1');
    }
    function btnApprove_Clicked() {
        if (txtApprovedBy.value == null || txtApprovedBy.value == "") {
            WorningMessage("الرجاء اضافة بيانات في حقل الموافقه عن طريق", "Please Enter data in Approved By");
            return;
        }
        var oldStatus = Number($('#chkStatus').val());
        $('#chkStatus').val('2');
        var newStatus = Number($('#chkStatus').val());
        Update();
        Ajax.Callsync({
            url: Url.Action("PProc_ApproveCloseMaterialRequest", ControllerName),
            data: { ReqID: Master.RequestMaterialId, OldStatus: oldStatus, NewStatus: newStatus },
            success: function (d) {
            }
        });
    }
    function btnclose_Clicked() {
        var oldStatus = Number($('#chkStatus').val());
        $('#chkStatus').val('3');
        var newStatus = Number($('#chkStatus').val());
        Update();
        Ajax.Callsync({
            url: Url.Action("PProc_ApproveCloseMaterialRequest", ControllerName),
            data: { ReqID: Master.RequestMaterialId, OldStatus: oldStatus, NewStatus: newStatus },
            success: function (d) {
            }
        });
    }
    function GetStatusValues() {
        if (Master.Status == 0) {
            $('#chkStatus').val('0');
        }
        else if (Master.Status == 1) {
            $('#chkStatus').val('1');
        }
        else if (Master.Status == 2) {
            $('#chkStatus').val('2');
        }
        else if (Master.Status == 3) {
            $('#chkStatus').val('3');
        }
    }
    function btnSearchRequest_Clicked() {
        var Condition = "CompCode = " + _compCode + " and BraCode = " + _braCode;
        sys.FindKey(Modules.MaterialRequest, "btnSearchRequest", Condition, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetByID", ControllerName),
                data: { id: id },
                success: function (d) {
                    MasterDetails.P_TR_ResRequestMaterial = d.result;
                    Master = d.result;
                    var _Index = GetIndexByUseId(Master.RequestMaterialId, "PQ_GetResRequestMaterial", "RequestMaterialId", "CompCode = " + _compCode + " and BraCode = " + _braCode);
                    NavigateToSearchResultKey(Number(_Index), Navigate);
                }
            });
        });
    }
})(MaterialRequest || (MaterialRequest = {}));
//# sourceMappingURL=MaterialRequest.js.map