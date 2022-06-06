$(document).ready(function () {
    OpProjectExpenses.InitalizeComponent();
});
var OpProjectExpenses;
(function (OpProjectExpenses) {
    var ControllerName = "OpProjectExpenses";
    var txtExpensesEntryId;
    var txtTrNo;
    var txtTrDate;
    var butTrNo;
    var txtProjectID;
    var txtProj_Code;
    var butProj_Code;
    var txtProj_Desc;
    var txtTotalAmount;
    var ChkStatus;
    var txtProjectPhaseId;
    var txtPhase_code;
    var butPhase_code;
    var txtPhase_Desc;
    var btnReopen;
    var txtRemarks;
    var AllExpensesMaster = new Array();
    //var Model: PQ_GetEngExpenses = new PQ_GetEngExpenses();
    var Master = new PQ_GetEngExpenses();
    var M_D_ExpensesDetails = /** @class */ (function () {
        function M_D_ExpensesDetails() {
        }
        return M_D_ExpensesDetails;
    }());
    var MasterDetails = new M_D_ExpensesDetails();
    var dataSource = new Array();
    var AllP_DExpenses = new Array();
    var tbl_DataSource = new Array();
    var AllProjectPhase = new Array();
    var DetailsExpenses = new PQ_GetEngExpensesDetail();
    var DetailsAssignExpense = new PQ_GetEngExpensesDetail();
    var GridInputClassName = "form-control gridIput";
    var GridInputClassNameRight = "text-align: right !important;";
    var Grid = new JsGrid();
    var sys = new SystemTools();
    var _ScreenLang;
    var _CompCode;
    var _BranchCode;
    var ProjectID;
    //var ProjectPhaseId: number = 0;
    var MasterPhaseId;
    function InitalizeComponent() {
        SharedSession.CurrentPrivileges = GetPrivileges();
        SharedSession.CurrentEnvironment = GetSystemEnvironment();
        _ScreenLang = SharedSession.CurrentEnvironment.ScreenLanguage;
        _CompCode = SharedSession.CurrentEnvironment.CompCode;
        _BranchCode = SharedSession.CurrentEnvironment.BranchCode;
        ControlsButtons.AddButton.disabled = false;
        ControlsButtons.EditButton.disabled = false;
        ControlsButtons.DeleteButton.disabled = false;
        ControlsButtons.PrintButton.disabled = false;
        InitalizeControls();
        InitalizeEvents();
        InitalizeitemGrid();
        SharedSession.CurrentEnvironment.ScreenLanguage = ClientSharedWork.Session.Language;
        NavigatorComponent.InitalizeComponent();
        ClientSharedWork.OnNavigate = Navigate;
        ControlsButtons.AddAction(Add);
        ControlsButtons.EditAction(function () { });
        ControlsButtons.SaveAction(function () {
            if (ClientSharedWork.CurrentMode == ScreenModes.Add)
                Insert();
            else if (ClientSharedWork.CurrentMode == ScreenModes.Edit)
                Update();
        });
        ControlsButtons.UndoAction(function () { });
        ControlsButtons.PrintAction(function () { PrintExpenses(); });
        $("#ImageEditorButton").on("click", function () {
            sys.ImgPopup(_CompCode, _BranchCode, Modules.OpProjectExpenses, Master.ExpensesEntryId.toString());
        });
    }
    OpProjectExpenses.InitalizeComponent = InitalizeComponent;
    function PrintExpenses() {
        Ajax.CallAsync({
            url: Url.Action("PPrnt_Eng_Expenses", "PrintTransaction"),
            data: { TrID: Number(Master.ExpensesEntryId) },
            success: function (d) {
                var url = d.result;
                window.open(url, "_blank");
            }
        });
    }
    function Add() {
        ChkStatus.checked = false;
        butPhase_code.disabled = true;
        NewData();
    }
    function NewData() {
        ClearGrid(Grid, new Array());
        dataSource = new Array();
        txtTotalAmount.value = "0.00";
    }
    function Insert() {
        Master = new PQ_GetEngExpenses();
        Assign();
        // check for details
        Master.CompCode = Number(ClientSharedWork.Session.CompCode);
        Master.BraCode = Number(ClientSharedWork.Session.BranchCode);
        Ajax.CallAsync({
            url: Url.Action("Insert", ControllerName),
            data: {
                JsonData: JSON.stringify(MasterDetails)
            },
            success: function (d) {
                var result = d.result;
                if (result.ResponseState == true) {
                    debugger;
                    ClientSharedWork.SwitchModes(ScreenModes.Query);
                    var msg = ReturnMsg("تم الحفظ بنجاح  ", "Data Saved Successfuly. ");
                    MessageBox.Show(msg, "Insert", function () {
                        var Expense = result.ResponseData;
                        var Expense_Index = GetIndexByUseId(result.ResponseData, "PQ_GetEngExpenses", "ExpensesEntryId", " CompCode = " + _CompCode + " and BraCode = " + _BranchCode);
                        NavigateToSearchResultKey(Number(Expense_Index), Navigate);
                    });
                }
                else
                    MessageBox.Show(result.ResponseMessage, "Insert");
            }
        });
    }
    function Assign() {
        Master = DocumentActions.AssignToModel(Master);
        MasterDetails.P_TR_EngExpensesEntry = Master;
        MasterDetails.P_TR_EngExpensesEntry.ExpensesEntryId = 0;
        // assign Details
        MasterDetails.P_TR_EngExpensesEntryDetail = dataSource;
        for (var _i = 0, dataSource_1 = dataSource; _i < dataSource_1.length; _i++) {
            var itm = dataSource_1[_i];
            itm.ExpensesEntryId = Master.ExpensesEntryId;
            //itm.IsApproved = if(itm.IsApproved == "NO") ?false : true; 
            tbl_DataSource.push(itm);
        }
    }
    function Update() {
        AssignUpdate();
        Master.CompCode = Number(ClientSharedWork.Session.CompCode);
        Ajax.CallAsync({
            url: Url.Action("Update", ControllerName),
            data: { JsonData: JSON.stringify(MasterDetails) },
            success: function (d) {
                var result = d.result;
                if (result.ResponseState == true) {
                    ClientSharedWork.SwitchModes(ScreenModes.Query);
                    var msg = ReturnMsg("تم التعديل بنجاح  ", "Data Updated Successfuly. ");
                    MessageBox.Show(msg, "Update", function () {
                        //Display();
                        var Index = GetIndexByUseId(Number(Master.ExpensesEntryId), "PQ_GetEngExpenses", "ExpensesEntryId", "CompCode = " + _CompCode + " and BraCode = " + _BranchCode);
                        NavigateToSearchResultKey(Number(Index), Navigate);
                    });
                }
                else {
                    MessageBox.Show(result.ResponseMessage, "Insert");
                }
            }
        });
    }
    function AssignUpdate() {
        Master = DocumentActions.AssignToModel(Master);
        MasterDetails.P_TR_EngExpensesEntry = Master;
        MasterDetails.P_TR_EngExpensesEntry.ExpensesEntryId = Master.ExpensesEntryId;
        // assign Details
        MasterDetails.P_TR_EngExpensesEntryDetail = dataSource;
        for (var _i = 0, dataSource_2 = dataSource; _i < dataSource_2.length; _i++) {
            var itm = dataSource_2[_i];
            itm.ExpensesEntryId = Master.ExpensesEntryId;
            //itm.IsApproved = if(itm.IsApproved == "NO") ?false : true; 
            tbl_DataSource.push(itm);
        }
    }
    function InitalizeEvents() {
        txtTrNo.onchange = TrNo_Changed;
        butTrNo.onclick = butTrNo_Click;
        butProj_Code.onclick = butProj_Code_Click;
        butPhase_code.onclick = butPhase_code_Click;
        btnReopen.onclick = expenses_Reopen;
        txtProj_Code.onchange = Proj_Code_Changed;
        txtPhase_code.onchange = Phase_code_Changed;
    }
    function expenses_Reopen() {
        ChkStatus.checked = false;
        Master.Status = false;
        Update();
    }
    function butProj_Code_Click() {
        sys.FindKey(Modules.ProjectExpenses, "butProjCode", "CompCode = " + _CompCode + " and BraCode =" + _BranchCode, function () {
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetProjectByID", ControllerName),
                data: { id: _Id },
                success: function (d) {
                    var result = d.result;
                    ProjectID = result.ProjectID;
                    txtProjectID.value = result.ProjectID.toString();
                    txtProj_Code.value = result.ProjectCode;
                    if (ClientSharedWork.Session.ScreenLanguage == "ar") {
                        txtProj_Desc.value = result.DescA;
                    }
                    else {
                        txtProj_Desc.value = result.DescL;
                    }
                    butPhase_code.disabled = false;
                    MasterPhaseId = null;
                    txtProjectPhaseId.value = "";
                    txtPhase_code.value = "";
                    txtPhase_Desc.value = "";
                }
            });
        });
    }
    function Proj_Code_Changed() {
        var Pno = Number(txtProj_Code.value);
        Ajax.CallAsync({
            url: Url.Action("getProjectTableByno", "FindByNo"),
            data: { Pno: Pno },
            success: function (d) {
                if (IsNullOrEmpty(d.result)) {
                    WorningMessage("الرمز خطأ، أعد المحاولة .... ", "Wrong Code , .. Retry .. ");
                    window.open(Url.Action(ControllerName + "Index", ControllerName), "_self");
                }
                debugger;
                var result = d.result;
                ProjectID = result[0].ProjectID;
                txtProjectID.value = result[0].ProjectID;
                txtProj_Code.value = result[0].ProjectCode;
                if (ClientSharedWork.Session.ScreenLanguage == "ar") {
                    txtProj_Desc.value = result[0].DescA;
                }
                else {
                    txtProj_Desc.value = result[0].DescL;
                }
                butPhase_code.disabled = false;
                MasterPhaseId = null;
                txtProjectPhaseId.value = "";
                txtPhase_code.value = "";
                txtPhase_Desc.value = "";
            }
        });
    }
    function Phase_code_Changed() {
        if (ProjectID == null || ProjectID == 0) {
            WorningMessage("يجب اختيار المشروع", "You Must Select Project");
            return;
        }
        var PhaseNo = Number(txtPhase_code.value);
        Ajax.CallAsync({
            url: Url.Action("getProjectPhasetableByno", "FindByNo"),
            data: { ProjectId: ProjectID, PhaseNo: PhaseNo },
            success: function (d) {
                if (IsNullOrEmpty(d.result)) {
                    MasterPhaseId = 0;
                    txtProjectPhaseId.value = "";
                    txtPhase_code.value = "";
                    txtPhase_Desc.value = "";
                    WorningMessage("الرمز خطأ، أعد المحاولة .... ", "Wrong Code , .. Retry .. ");
                    return;
                }
                debugger;
                var result = d.result;
                MasterPhaseId = result[0].ProjectPhaseId;
                txtProjectPhaseId.value = result[0].ProjectPhaseId.toString();
                txtPhase_code.value = result[0].ProjectPhaseCode;
                if (ClientSharedWork.Session.ScreenLanguage == "ar") {
                    txtPhase_Desc.value = result[0].DescA;
                }
                else {
                    txtPhase_Desc.value = result[0].DescL;
                }
                NewData();
            }
        });
    }
    function butPhase_code_Click() {
        if (ProjectID == null || ProjectID == 0) {
            WorningMessage("يجب اختيار المشروع", "You Must Select Project");
            return;
        }
        sys.FindKey(Modules.EngProjectPhases, "btnFindPhases", "ProjectID = " + ProjectID + " and Status = 1", function () {
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetProjectPhaseByID", ControllerName),
                data: { id: _Id },
                success: function (d) {
                    debugger;
                    var result = d.result;
                    MasterPhaseId = result.ProjectPhaseId;
                    txtProjectPhaseId.value = result.ProjectPhaseId.toString();
                    txtPhase_code.value = result.ProjectPhaseCode;
                    if (ClientSharedWork.Session.ScreenLanguage == "ar") {
                        txtPhase_Desc.value = result.DescA;
                    }
                    else {
                        txtPhase_Desc.value = result.DescL;
                    }
                    NewData();
                }
            });
        });
    }
    function butTrNo_Click() {
        sys.FindKey(Modules.ExpensesEntry, "butTrNo", "CompCode = " + _CompCode + " and BraCode="
            + _BranchCode, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            debugger;
            Ajax.CallAsync({
                url: Url.Action("GetExpensesById", ControllerName),
                data: { id: id },
                success: function (d) {
                    Master = d.result;
                    txtTrNo.value = Master.TrNo.toString();
                    txtTotalAmount.value = Master.TotalAmount.toFixed(2);
                    var Index = GetIndexByUseId(Number(Master.ExpensesEntryId), "PQ_GetEngExpenses", "ExpensesEntryId", "CompCode = " + _CompCode + " and BraCode = " + _BranchCode);
                    NavigateToSearchResultKey(Number(Index), Navigate);
                    //let _Index: number = Number(Master.ExpensesEntryId);
                    //let ind = GetIndexByUseId(Number(Master.ExpensesEntryId), "PQ_GetEngExpenses", "ExpensesEntryId")
                    //NavigateToSearchResultKey(Number(ind), Navigate);
                }
            });
        });
    }
    function TrNo_Changed() {
        var trno = Number(txtTrNo.value);
        debugger;
        Ajax.CallAsync({
            url: Url.Action("getEngExpensesEntryViewByNo", "FindByNo"),
            data: { trno: trno },
            success: function (d) {
                if (IsNullOrEmpty(d.result)) {
                    WorningMessage("الرمز خطأ، أعد المحاولة .... ", "Wrong Code , .. Retry .. ");
                    window.open(Url.Action(ControllerName + "Index", ControllerName), "_self");
                }
                Master = d.result;
                txtTrNo.value = Master.TrNo.toString();
                txtTotalAmount.value = Master.TotalAmount.toFixed(2);
                var Index = GetIndexByUseId(Number(Master.ExpensesEntryId), "PQ_GetEngExpenses", "ExpensesEntryId", "CompCode = " + _CompCode + " and BraCode = " + _BranchCode);
                NavigateToSearchResultKey(Number(Index), Navigate);
                //let _Index: number = Number(Master.ExpensesEntryId);
                //let ind = GetIndexByUseId(Number(Master.ExpensesEntryId), "PQ_GetEngExpenses", "ExpensesEntryId")
                //NavigateToSearchResultKey(Number(ind), Navigate);
            }
        });
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
    function Display() {
        DocumentActions.RenderFromModel(Master);
        txtTotalAmount.value = Master.TotalAmount.toFixed(2);
        //GetAllProjectPhaseByprojectId(Master.ProjectID);
        GetExpensesDetailsList(Master.ExpensesEntryId);
        txtTrDate.value = DateFormat(Master.TrDate);
        if (Master.Status == true) {
            ControlsButtons.EditButton.disabled = true;
        }
        else {
            ControlsButtons.EditButton.disabled = !SharedSession.CurrentPrivileges.EDIT;
            ;
        }
        if (SharedSession.CurrentPrivileges.CUSTOM1 == true && Master.Status == true) {
            $('#btnReopen').removeAttr('disabled');
            $("#btnReopen").css('cursor', 'pointer');
            $("#btnReopen").css('backgroundColor', 'red');
        }
        else {
            $('#btnReopen').attr('disabled', 'disabled');
            $("#btnReopen").css('cursor', 'no-drop');
            $("#btnReopen").css('backgroundColor', '#0B6D8A');
        }
        ProjectID = Master.ProjectID;
        MasterPhaseId = Master.ProjectPhaseId;
    }
    function GetAllProjectPhaseByprojectId(projectid) {
        Ajax.CallAsync({
            url: Url.Action("GetAllProjectPhaseByProjectId", ControllerName),
            data: { ProjectId: projectid },
            success: function (d) {
                AllProjectPhase = d.result;
            }
        });
    }
    function GetExpensesDetailsList(ExpensesEntryId) {
        Ajax.CallAsync({
            url: Url.Action("GetExpensesDetailsList", ControllerName),
            data: { id: ExpensesEntryId },
            success: function (d) {
                dataSource = d.result;
                for (var i = 0; i < dataSource.length; i++) {
                    dataSource[i].Amount = Number(dataSource[i].Amount).toFixed(2);
                }
                Grid.DataSource = dataSource;
                Grid.Bind();
            }
        });
    }
    function InitalizeControls() {
        txtExpensesEntryId = DocumentActions.GetElementById("txtExpensesEntryId");
        txtTrNo = DocumentActions.GetElementById("txtTrNo");
        txtTrDate = DocumentActions.GetElementById("txtTrDate");
        butTrNo = DocumentActions.GetElementById("butTrNo");
        txtProjectID = DocumentActions.GetElementById("txtProjectID");
        txtProj_Code = DocumentActions.GetElementById("txtProj_Code");
        butProj_Code = DocumentActions.GetElementById("butProj_Code");
        txtProj_Desc = DocumentActions.GetElementById("txtProj_Desc");
        txtTotalAmount = DocumentActions.GetElementById("txtTotalAmount");
        txtProjectPhaseId = DocumentActions.GetElementById("txtProjectPhaseId");
        txtPhase_code = DocumentActions.GetElementById("txtPhase_code");
        butPhase_code = DocumentActions.GetElementById("butPhase_code");
        txtPhase_Desc = DocumentActions.GetElementById("txtPhase_Desc");
        txtRemarks = DocumentActions.GetElementById("txtRemarks");
        ChkStatus = DocumentActions.GetElementById("ChkStatus");
        btnReopen = DocumentActions.GetElementById("btnReopen");
        AllExpensesMaster = Ajax.Call({ url: Url.Action("GetAllExpensesMaster", ControllerName) });
        //AllP_DExpenses = Ajax.Call<Array<P_D_Expences>>({ url: Url.Action("GetAllPDExpebses", ControllerName) });
        //AllProjectPhase = new Array<P_TR_EngProjectPhase>();
    }
    function InitalizeitemGrid() {
        var res = GetResourceList("OpProExp_");
        Grid.ElementName = "evaluationslist";
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
        //Grid.OnItemInserting = Insert;
        //Grid.OnItemUpdating = Update;
        //Grid.OnItemDeleting = Delete;
        Grid.Columns = [
            {
                title: res.OpProExp_LabClass_Cost_Serial, name: "SeqNo", width: "5.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "SeqNo", " ");
                    txt.id = "h_SeqNo";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.OpProExp_Cost_Serial, txt);
                }
            },
            {
                name: "Exp_ExpCode", width: "11.5%", css: JsGridHeaderLeft,
                headerTemplate: function () {
                    var btnFindExpences = DocumentActions.CreateElement("button");
                    btnFindExpences = DocumentActions.CreateElement("button");
                    btnFindExpences.className = "btn btn-primary btn-block addable editable";
                    btnFindExpences.innerText = ClientSharedWork.Session.ScreenLanguage == "ar" ? " النفقات" : "Load Exps";
                    btnFindExpences.id = "btnFindExpences";
                    btnFindExpences.type = "button";
                    btnFindExpences.onclick = function (e) {
                        btnFindExpences_onclick();
                    };
                    return HeaderTemplateNew(res.OpProExp_project_expno, btnFindExpences);
                }
            },
            {
                title: res.OpProExp_project_expdesc, visible: ClientSharedWork.Session.ScreenLanguage == "ar",
                name: "Exp_DescA", width: "22.5%", css: JsGridHeaderLeft,
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "Exp_DescA", " ");
                    txt.id = "h_Exp_DescA";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.OpProExp_project_expdesc, txt);
                }
            },
            {
                title: res.OpProExp_project_expdesc, visible: ClientSharedWork.Session.ScreenLanguage == "en",
                name: "Exp_DescE", width: "22.5%", css: JsGridHeaderLeft,
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "Exp_DescE", " ");
                    txt.id = "h_Exp_DescE";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.OpProExp_project_expdesc, txt);
                }
            },
            {
                title: res.OpProExp_project_Beneficial, name: "Benificial", width: "22%", css: JsGridHeaderLeft,
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "Benificial", " ");
                    txt.id = "h_Benificial";
                    txt.disabled = false;
                    return HeaderTemplateNew(res.OpProExp_project_Beneficial, txt);
                }
            },
            {
                title: res.OpProExp_project_RefNo, name: "RefNo", width: "9.5%", css: JsGridHeaderLeft,
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "RefNo", " ");
                    txt.id = "h_RefNo";
                    txt.disabled = false;
                    return HeaderTemplateNew(res.OpProExp_project_RefNo, txt);
                }
            },
            {
                title: res.OpProExp_project_amount, name: "Amount", width: "9.5%", css: JsGridHeaderRight,
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "project_amount", " ");
                    txt.id = "h_Amount";
                    txt.disabled = false;
                    return HeaderTemplateNew(res.OpProExp_project_amount, txt);
                }
            },
            {
                name: "Phase_Code", width: "12.5%", css: JsGridHeaderCenter,
                headerTemplate: function () {
                    var btnFindPhases = DocumentActions.CreateElement("button");
                    btnFindPhases = DocumentActions.CreateElement("button");
                    btnFindPhases.className = "btn btn-primary btn-block addable editable";
                    btnFindPhases.innerText = ClientSharedWork.Session.ScreenLanguage == "ar" ? " المراحل" : "Load Phases";
                    btnFindPhases.id = "btnFindPhases";
                    btnFindPhases.type = "button";
                    btnFindPhases.onclick = function (e) {
                        btnFindPhases_onclick();
                    };
                    return HeaderTemplateNew(res.OpProExp_project_Phase_Code, btnFindPhases);
                }
            },
            {
                title: res.OpProExp_Change_Remarks, name: "Remarks", width: "22%", css: JsGridHeaderLeft,
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "Remarks", " ");
                    txt.id = "h_Remarks";
                    txt.disabled = false;
                    return HeaderTemplateNew(res.OpProExp_Change_Remarks, txt);
                }
            },
            {
                title: "#", name: "btnAddItem", visible: true, width: "50px",
                headerTemplate: function () {
                    var btn = DocumentActions.CreateElement("button");
                    btn.className = TransparentButton + " addable editable";
                    btn.type = "button";
                    btn.style.fontSize = "25px";
                    btn.style.color = "forestgreen";
                    btn.innerHTML = "<span class='glyphicon glyphicon-plus'></span>";
                    btn.id = "btnAddItemExpensesGrid";
                    btn.onclick = function (e) {
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }
                        AddItemInExpensesGrid();
                    };
                    return btn;
                },
                // HANDLE DELETE Row in Grid
                itemTemplate: function (s, item) {
                    var btn = DocumentActions.CreateElement("button");
                    btn.innerHTML = "<i class='glyphicon glyphicon-remove'></i>";
                    btn.type = "button";
                    btn.className = TransparentButton + " addable editable";
                    btn.style.fontSize = "24px";
                    btn.style.color = "red";
                    btn.name = dataSource.indexOf(item).toString();
                    btn.onclick = function (e) {
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }
                        var index_id = e.currentTarget.id;
                        var index = Number(e.currentTarget.name);
                        txtTotalAmount.value = (Number(txtTotalAmount.value) - Number(dataSource[index].Amount)).toFixed(2);
                        dataSource.splice(index, 1);
                        Grid.DataSource = dataSource;
                        Grid.Bind();
                        //ReIndexingGrid();
                    };
                    return btn;
                }
            },
            // edit to Grid 
            {
                css: JsGridHeaderCenter,
                width: "50px",
                itemTemplate: function (s, item) {
                    var btn = DocumentActions.CreateElement("button");
                    btn.innerHTML = "<i class='glyphicon glyphicon-pencil'></i>";
                    btn.type = "button";
                    btn.className = TransparentButton + " addable editable";
                    btn.style.fontSize = "20px";
                    btn.style.color = "forestgreen";
                    btn.name = dataSource.indexOf(item).toString();
                    btn.onclick = function (e) {
                        var index = Number(e.currentTarget.name);
                        dataSource.splice(index, 1);
                        Grid.DataSource = dataSource;
                        Grid.Bind();
                        //ReIndexingGrid();
                        $("#h_SeqNo").val(item.SeqNo.toString());
                        //$('#btnFindExpences').text(DetailsAssignExpense.Exp_ExpCode.toString());
                        $("#btnFindExpences").text(item.Exp_ExpCode);
                        $('#h_ExpencesID').val(item.ExpencesID.toString());
                        if (ClientSharedWork.Session.ScreenLanguage == "ar") {
                            $("#h_Exp_DescA").val(item.Exp_DescA.toString());
                        }
                        else {
                            $("#h_Exp_DescE").val(item.Exp_DescE.toString());
                        }
                        $("#h_Benificial").val(item.Benificial.toString());
                        $("#h_RefNo").val(item.RefNo.toString());
                        $("#h_Amount").val(item.Amount);
                        $("#btnFindPhases").text(item.Phase_Code);
                        $("#h_ProjectPhaseId").val(item.ProjectPhaseId.toString());
                        $("#h_Remarks").val(item.Remarks);
                        // update total Amount 
                        txtTotalAmount.value =
                            (Number(txtTotalAmount.value) - Number(item.Amount)).toFixed(2);
                        //End Updte
                    };
                    return btn;
                }
            }
        ];
        Grid.DataSource = dataSource;
        Grid.Bind();
    }
    function btnFindExpences_onclick() {
        sys.FindKey(Modules.EngExpences, "btnFindExpences", "", function () {
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetPDExpencesByID", ControllerName),
                data: { id: _Id },
                success: function (d) {
                    var result = d.result;
                    $('#btnFindExpences').text(result.ExpCode);
                    $('#h_ExpencesID').val(result.ExpencesID);
                    $('#h_Exp_DescA').val(result.DescA);
                    $('#h_Exp_DescE').val(result.DescE);
                }
            });
        });
    }
    function btnFindPhases_onclick() {
        if (ProjectID == null || ProjectID == 0) {
            WorningMessage("يجب اختيار المشروع", "You Must Select Project");
            return;
        }
        sys.FindKey(Modules.EngProjectPhases, "btnFindPhases", "ProjectID = " + txtProjectID.value + " and Status = 1", function () {
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetProjectPhaseByID", ControllerName),
                data: { id: _Id },
                success: function (d) {
                    debugger;
                    var result = d.result;
                    //ProjectPhaseId = result.ProjectPhaseId;
                    $('#btnFindPhases').text(result.ProjectPhaseCode);
                    $('#h_ProjectPhaseId').val(result.ProjectPhaseId);
                }
            });
        });
    }
    function AddItemInExpensesGrid() {
        DetailsExpenses = new PQ_GetEngExpensesDetail();
        var seqNo = $('#h_SeqNo').val();
        if (dataSource.length == 0) {
            DetailsExpenses.SeqNo = 1;
        }
        else if (seqNo == " ") {
            // get greatest SeqNo
            var max = dataSource.reduce(function (prev, current) {
                return (prev.SeqNo > current.SeqNo) ? prev : current;
            });
            // End greatest SeqNo
            DetailsExpenses.SeqNo = Number(max.SeqNo + 1);
        }
        else {
            DetailsExpenses.SeqNo = Number($('#h_SeqNo').val());
        }
        if ($('#btnFindExpences').text() == "Load Exps") {
            WorningMessage("يجب اختيار المصروف", "You Must Select Expences");
            return;
        }
        if ($('#h_Amount').val() == 0) {
            WorningMessage("يجب اختيار مبلغ المصروف", "You Must Enter Expense Amount");
            return;
        }
        if ($('#btnFindPhases').text() == "Load Phases") {
            WorningMessage("يجب اختيار مرحلة", "You Must Select Phase");
            return;
        }
        debugger;
        DetailsExpenses.Exp_ExpCode = $('#btnFindExpences').text();
        DetailsExpenses.ExpencesID = Number($('#h_ExpencesID').val());
        DetailsExpenses.ProjectPhaseId = Number($('#h_ProjectPhaseId').val());
        //DetailsExpenses.ProjectPhaseId = ProjectPhaseId;
        DetailsExpenses.Exp_DescA = $('#h_Exp_DescA').val();
        DetailsExpenses.Exp_DescE = $('#h_Exp_DescE').val();
        DetailsExpenses.Benificial = $('#h_Benificial').val();
        DetailsExpenses.RefNo = $('#h_RefNo').val();
        DetailsExpenses.Amount = Number($('#h_Amount').val()).toFixed(2);
        DetailsExpenses.Phase_Code = $('#btnFindPhases').text();
        //if (DetailsExpenses.ProjectPhaseId == 0) {
        //    DetailsExpenses.ProjectPhaseId = MasterPhaseId;
        //}
        DetailsExpenses.Remarks = $('#h_Remarks').val();
        txtTotalAmount.value = (txtTotalAmount.value == " ") ? Number(DetailsExpenses.Amount).toFixed(2) :
            (Number(txtTotalAmount.value) + Number(DetailsExpenses.Amount)).toFixed(2);
        debugger;
        if (DetailsExpenses.ProjectPhaseId == null || DetailsExpenses.ProjectPhaseId == 0) {
            DetailsExpenses.ProjectPhaseId = Master.ProjectPhaseId;
            DetailsExpenses.Phase_Code = txtPhase_code.value;
        }
        dataSource.unshift(DetailsExpenses);
        Grid.DataSource = dataSource;
        Grid.Bind();
        $('#h_ProjectPhaseId').val("");
    }
})(OpProjectExpenses || (OpProjectExpenses = {}));
//# sourceMappingURL=OpProjectExpenses.js.map