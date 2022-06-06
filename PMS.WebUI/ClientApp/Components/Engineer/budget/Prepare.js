$(document).ready(function () {
    Prepare.InitalizeComponent();
});
var Prepare;
(function (Prepare) {
    var ControllerName = "Prepare";
    var NumberColumnWidth = "40px";
    var columnWidth = "100px";
    var GridPhase = new JsGrid();
    var GridActivity = new JsGrid();
    var DataSourcePhase = new Array();
    //var ObjPhase: PProc_Eng_BudgetEngineer_Result = new PProc_Eng_BudgetEngineer_Result;
    var DataSourceActivity = new Array();
    var ObjectActivity = new PProc_Eng_BudgetEngineerActiv_Result;
    var SelectProject = new Array();
    var SelectActivity = new Array();
    var _Budget = new Array();
    var ObjBudget = new P_G_Budget();
    var _BudgetId = 0;
    var columnWidth = "100px";
    var GridInputClassName = "form-control gridIput";
    var sys = new SystemTools();
    var btnArea;
    var btnEng;
    var btnLoadDetails;
    var txtAreaCode;
    var txtAreaName;
    var txtMonth;
    var txtEngCode;
    var txtEngName;
    var txtSiteEngineerId;
    var _ScreenLanguage;
    var _CompCode;
    var _BranchCode;
    function InitalizeComponent() {
        SharedSession.CurrentPrivileges = GetPrivileges();
        SharedSession.CurrentEnvironment = GetSystemEnvironment();
        _ScreenLanguage = SharedSession.CurrentEnvironment.ScreenLanguage;
        _CompCode = SharedSession.CurrentEnvironment.CompCode;
        _BranchCode = SharedSession.CurrentEnvironment.BranchCode;
        Ajax.CallAsync({
            url: Url.Action("getArea", "SalesEngineer"),
            data: { id: _BranchCode },
            success: function (d) {
                var Area = d.result;
                txtAreaCode.value = Area.BRA_CODE.toString();
                txtAreaName.value = _ScreenLanguage == "ar" ? Area.BRA_DESC : Area.BRA_DESCL;
            }
        });
        $("#txtLoginYear").val(SharedSession.CurrentEnvironment.CurrentYear);
        InitalizephaseGrid();
        SharedSession.CurrentEnvironment.ScreenLanguage = ClientSharedWork.Session.Language;
        $("#ModelPreview").val("1");
        ControlsButtons.EditAction(function () { });
        //ControlsButtons.ImageEditorAction(() => {
        //    myfunction();
        //});
        $("#ImageEditorButton").on("click", function () {
            debugger;
            myfunction();
        });
        ControlsButtons.UndoAction(function () { });
        ControlsButtons.SaveButton.disabled = true;
        ControlsButtons.DeleteButton.disabled = true;
        ControlsButtons.PrintAction(Print);
        //ImageButtons.UploadAction(_CompCode, _BranchCode, SharedSession.CurrentPrivileges.MODULE_CODE);
        InitalizeControls();
        InitalizeEvents();
    }
    Prepare.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        btnArea = DocumentActions.GetElementById("btnArea");
        btnEng = DocumentActions.GetElementById("btnEng");
        txtAreaCode = DocumentActions.GetElementById("txtAreaCode");
        txtAreaName = DocumentActions.GetElementById("txtAreaName");
        txtMonth = DocumentActions.GetElementById("txtMonth");
        txtEngCode = DocumentActions.GetElementById("txtEngCode");
        txtEngName = DocumentActions.GetElementById("txtEngName");
        btnLoadDetails = DocumentActions.GetElementById("btnLoadDetails");
        txtSiteEngineerId = DocumentActions.GetElementById("txtSiteEngineerId");
    }
    function InitalizeEvents() {
        btnArea.onclick = btnArea_onclick;
        btnEng.onclick = btnEng_onclick;
        btnLoadDetails.onclick = LoadDetails;
    }
    function myfunction() {
        sys.ImgPopup(_CompCode, _BranchCode, Modules.Prepare, txtSiteEngineerId.value);
    }
    function InitalizephaseGrid() {
        var res = GetResourceList("Eng_budget_");
        GridPhase.ElementName = "GridPhase";
        GridPhase.OnRowDoubleClicked = GridPhase_OnRowDoubleClicked;
        GridPhase.Columns = [
            { title: res.Eng_budget_ProjNo, name: "ProjectCode", width: "4%", type: "label" },
            { title: res.Eng_budget_PhaseNo, name: "ProjectPhaseCode", width: "3.5%", type: "label" },
            { title: res.Eng_budget_Value, name: "PhaseValue", width: "3.5%", type: "label" },
            { title: res.Eng_budget_BeforeJan, name: "Bud01", width: "3.5%", type: "label" },
            { title: res.Eng_budget_budgetJan, name: "Bud01", width: "3.5%", type: "label" },
            { title: res.Eng_budget_ActualJan, name: "ACT01", width: "3.5%", type: "label" },
            { title: res.Eng_budget_BudgetFeb, name: "Bud02", width: "3.5%", type: "label" },
            { title: res.Eng_budget_ActualFeb, name: "ACT02", width: "3.5%", type: "label" },
            { title: res.Eng_budget_BudgetMarch, name: "Bud03", width: "3.5%", type: "label" },
            { title: res.Eng_budget_ActualMarch, name: "ACT03", width: "3.5%", type: "label" },
            { title: res.Eng_budget_BudgetApirl, name: "Bud04", width: "3.5%", type: "label" },
            { title: res.Eng_budget_BudgetApirl, name: "ACT04", width: "3.5%", type: "label" },
            { title: res.Eng_budget_Budgetmay, name: "Bud05", width: "3.5%", type: "label" },
            { title: res.Eng_budget_Actualmay, name: "ACT05", width: "3.5%", type: "label" },
            { title: res.Eng_budget_Budgetjune, name: "Bud06", width: "3.5%", type: "label" },
            { title: res.Eng_budget_Actualjune, name: "ACT06", width: "3.5%", type: "label" },
            { title: res.Eng_budget_Budgetjuly, name: "Bud07", width: "3.5%", type: "label" },
            { title: res.Eng_budget_Actualjuly, name: "ACT07", width: "3.5%", type: "label" },
            { title: res.Eng_budget_Budgetaug, name: "Bud08", width: "3.5%", type: "label" },
            { title: res.Eng_budget_Actualaug, name: "ACT08", width: "3.5%", type: "label" },
            { title: res.Eng_budget_Budgetsept, name: "Bud09", width: "3.5%", type: "label" },
            { title: res.Eng_budget_Actualsept, name: "ACT09", width: "3.5%", type: "label" },
            { title: res.Eng_budget_Budgetoct, name: "Bud10", width: "3.5%", type: "label" },
            { title: res.Eng_budget_Actualoct, name: "ACT10", width: "3.5%", type: "label" },
            { title: res.Eng_budget_BudgetNov, name: "Bud11", width: "3.5%", type: "label" },
            { title: res.Eng_budget_ActualNov, name: "ACT11", width: "3.5%", type: "label" },
            { title: res.Eng_budget_BudgetDec, name: "Bud12", width: "3.5%", type: "label" },
            { title: res.Eng_budget_ActualDec, name: "ACT12", width: "3.5%", type: "label" },
            { title: res.Eng_budget_Budgetytod, name: "BudYTD", width: "3.5%", type: "label" },
            { title: res.Eng_budget_Actualytod, name: "ActYTD", width: "3.5%", type: "label" }
        ];
        GridPhase.DataSource = DataSourcePhase;
        GridPhase.Bind();
        GridActivity.ElementName = "GridActivity";
        GridActivity.OnRefreshed = function () {
            if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                $(".editable").attr("disabled", "disabled");
                $(".addable").attr("disabled", "disabled");
            }
            else {
                $(".editable").removeAttr("disabled");
                $(".addable").removeAttr("disabled");
            }
        };
        GridActivity.InsertionMode = JsGridInsertionMode.Binding;
        GridActivity.Columns = [
            {
                name: "ProjectCode", width: columnWidth, css: JsGridHeaderCenter,
                headerTemplate: function () {
                    var btnProject = DocumentActions.CreateElement("button");
                    btnProject = DocumentActions.CreateElement("button");
                    btnProject.className = "btn btn-primary btn-block editable";
                    btnProject.innerText = _ScreenLanguage == "ar" ? "المشروع" : "Project";
                    btnProject.id = "btnProject";
                    btnProject.type = "button";
                    btnProject.onclick = function (e) {
                        btnProject_onclick();
                    };
                    return HeaderTemplateNew(res.Eng_budget_project, btnProject);
                }
            },
            {
                name: "projectphasecode", width: "9.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "projectphasecode", " ");
                    txt.id = "h_projectphasecode";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.Eng_budget_phase, txt);
                }
            },
            {
                name: "ActivityCode", width: columnWidth, css: JsGridHeaderCenter,
                headerTemplate: function () {
                    var btnActivity = DocumentActions.CreateElement("button");
                    btnActivity = DocumentActions.CreateElement("button");
                    btnActivity.className = "btn btn-primary btn-block editable";
                    btnActivity.innerText = _ScreenLanguage == "ar" ? "الانشطه" : "Activity";
                    btnActivity.id = "btnActivity";
                    btnActivity.type = "button";
                    btnActivity.onclick = function (e) {
                        btnActivity_onclick();
                    };
                    return HeaderTemplateNew(res.Eng_budget_Activity, btnActivity);
                }
            },
            {
                name: "DescA", width: "15%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "DescA", " ");
                    txt.id = "h_DescA";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.Eng_budget_Description, txt);
                }
            },
            {
                name: "ActivQty", width: "8%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "ActivQty", " ");
                    txt.id = "h_ActivQty";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.Eng_budget_ActQty, txt);
                }
            },
            {
                name: "PM_BudgetQty", width: "8.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "PM_BudgetQty", " ");
                    txt.id = "h_PM_BudgetQty";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.Eng_budget_budgetBeforeJan, txt);
                }
            },
            {
                name: "PM_ActualQty", width: "8%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "PM_ActualQty", " ");
                    txt.id = "h_PM_ActualQty";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.Eng_budget_budgetactualJan, txt);
                }
            },
            {
                name: "BudYTD", width: "8%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "BudYTD", " ");
                    txt.id = "h_BudYTD";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.Eng_budget_budgetBudgetLastMonth, txt);
                }
            },
            {
                name: "ActYTD", width: "8%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "ActYTD", " ");
                    txt.id = "h_ActYTD";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.Eng_budget_budgetActualLastMonth, txt);
                }
            },
            {
                name: "BudgetQty", width: "8%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "BudgetQty", " ");
                    txt.id = "h_BudgetQty";
                    return HeaderTemplateNew(res.Eng_budget_budgetBudgetCurrentMonth, txt);
                }
            },
            {
                name: "ActualQty", width: "9%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "ActualQty", " ");
                    txt.id = "h_ActualQty";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.Eng_budget_budgetActualCurrentMonth, txt);
                }
            },
            {
                title: "#", name: "btnAddItem", visible: true, width: NumberColumnWidth,
                headerTemplate: function () {
                    var btn = DocumentActions.CreateElement("button");
                    btn.className = TransparentButton + " editable";
                    btn.type = "button";
                    btn.style.fontSize = "20px";
                    btn.style.color = "forestgreen";
                    btn.innerHTML = "<span class='glyphicon glyphicon-plus'></span>";
                    btn.id = "btnAddItemGrid";
                    btn.onclick = function (e) {
                        //add
                        //if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                        //    WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                        //    return;
                        //}
                        if (_BudgetId == 0) {
                            AddActivityGrid();
                        }
                        else if (_BudgetId > 0) {
                            UpdateActivityGrid();
                        }
                    };
                    return btn;
                },
                itemTemplate: function (s, item) {
                    var btn = DocumentActions.CreateElement("button");
                    btn.innerHTML = "<i class='glyphicon glyphicon-remove'></i>";
                    btn.className = TransparentButton + " editable";
                    btn.style.fontSize = "19px";
                    btn.type = "button";
                    btn.style.color = "red";
                    btn.name = DataSourceActivity.indexOf(item).toString();
                    btn.onclick = function (e) {
                        //delete
                        //if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                        //    WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                        //    return;
                        //}
                        var index = Number(e.currentTarget.name);
                        DataSourceActivity.splice(index, 1);
                        GridActivity.DataSource = DataSourceActivity;
                        GridActivity.Bind();
                        DeleteActivityGrid(item.budjetid);
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
                    btn.className = TransparentButton + " editable";
                    btn.style.fontSize = "20px";
                    btn.type = "button";
                    btn.style.color = "forestgreen";
                    btn.name = DataSourceActivity.indexOf(item).toString();
                    btn.onclick = function (e) {
                        //edit
                        //if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                        //    WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                        //    return;
                        //}
                        var index = Number(e.currentTarget.name);
                        DataSourceActivity.splice(index, 1);
                        GridActivity.DataSource = DataSourceActivity;
                        GridActivity.Bind();
                        ObjectActivity = new PProc_Eng_BudgetEngineerActiv_Result();
                        ObjectActivity = item;
                        if (item.ProjectPhaseItemActivId != 0) {
                            FillInputText("txtProjectPhaseItemActivId", item.ProjectPhaseItemActivId.toString());
                        }
                        _BudgetId = item.budjetid;
                        FillInputText("btnProject", item.ProjectCode);
                        FillInputText("txtProjectID", item.ProjectID.toString());
                        FillInputText("btnActivity", item.ActivityCode.toString());
                        FillInputText("h_ActivQty", item.ActivQty.toString());
                        FillInputText("h_ProjectID", item.ProjectID.toString());
                        FillInputText("h_projectphasecode", item.projectphasecode.toString());
                        FillInputText("h_ActivityID", item.ActivityID.toString());
                        FillInputText("h_DescA", item.DescA.toString());
                        FillInputText("h_ActualQty", item.ActualQty.toString());
                        FillInputText("h_BudgetQty", item.BudgetQty.toString());
                        FillInputText("h_BudYTD", item.BudYTD.toString());
                        FillInputText("h_ActYTD", item.ActYTD.toString());
                        FillInputText("h_PM_BudgetQty", item.PM_BudgetQty.toString());
                        FillInputText("h_PM_ActualQty", item.PM_ActualQty.toString());
                    };
                    return btn;
                }
            }
        ];
        GridActivity.DataSource = DataSourceActivity;
        GridActivity.Bind();
    }
    function btnProject_onclick() {
        //where txtSiteEngineerId == curent
        if (IsNullOrEmpty(txtEngCode.value))
            return;
        var Condition = " CompCode = " + _CompCode + " and BraCode = " + _BranchCode + " and SiteEngineerId = " + txtSiteEngineerId.value;
        sys.FindKey(Modules.Prepare, "btnProject", Condition, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetProjectPhaseByID", ControllerName),
                data: { id: id },
                success: function (d) {
                    var _ProjPhase = d.result;
                    $("#txtProjectPhaseId").val(_ProjPhase.ProjectPhaseId);
                    $("#txtProjectID").val(_ProjPhase.ProjectID);
                    $("#btnProject").text(_ProjPhase.EngProj_ProjectCode);
                    $("#h_projectphasecode").val(_ProjPhase.ProjectPhaseCode);
                }
            });
        });
    }
    function btnActivity_onclick() {
        //$("#txtProjectPhaseId").val()
        if (IsNullOrEmpty($("#txtProjectPhaseId").val()))
            return;
        sys.FindKey(Modules.Prepare, "btnActivity", " ProjectPhaseId = " + $("#txtProjectPhaseId").val(), function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetActivityByID", ControllerName),
                data: { id: id },
                success: function (d) {
                    var _Act = d.result;
                    debugger;
                    $("#txtProjectPhaseItemActivId").val(_Act.ProjectPhaseItemActivId);
                    $("#btnActivity").text(_Act.act_ActivityCode);
                    $("#h_DescA").val(_ScreenLanguage == "ar" ? _Act.act_DescA : _Act.act_DescE);
                    $("#h_ActivQty").val(_Act.ActivQty);
                }
            });
        });
    }
    function GridPhase_OnRowDoubleClicked() {
        LoadEngProjectActivity();
    }
    function AddActivityGrid() {
        debugger;
        if (IsNullOrEmpty(txtAreaCode.value) || IsNullOrEmpty(txtEngCode.value)) {
            WorningMessage("الرجاء اختيار بيانات", "Please select data");
            return;
        }
        if (Number($("#h_BudgetQty").val()) > Number($("#h_ActivQty").val())) {
            WorningMessage("ميزانية الشهر الحالي يجب ان تصبح اقل من او تساوي كمية الانسطه", "Current Month Budget must be Less than or equal to Activity QTY");
            return;
        }
        if (IsNullOrEmpty($("#h_projectphasecode").val().trim()) || IsNullOrEmpty($("#h_BudgetQty").val().trim())) {
            return;
        }
        var ProjetcCode = $("#btnProject").text();
        var desc = _ScreenLanguage == "ar" ? "المشروع" : "Project";
        if (ProjetcCode == desc) {
            return;
        }
        //ObjBudget.BudjetID = 0;
        ObjBudget.PeriodID = Number(txtMonth.value);
        ObjBudget.YearID = Number(SharedSession.CurrentEnvironment.CurrentYear);
        ObjBudget.PeriodCode = Number(txtMonth.value);
        ObjBudget.BranchCode = Number(txtAreaCode.value);
        ObjBudget.SiteEngineerId = Number(txtSiteEngineerId.value);
        ObjBudget.ProjectPhaseItemActivId = Number($("#txtProjectPhaseItemActivId").val());
        ObjBudget.BudgetQty = Number($("#h_BudgetQty").val());
        ObjBudget.ActualQty = 0;
        Ajax.Callsync({
            url: Url.Action("InsertActGrid", ControllerName),
            data: ObjBudget,
            success: function (d) {
                var result = d.result;
                if (result.ResponseState == true) {
                    //WorningMessage("تم التعديل بنجاح  ", "Data Updated Successfuly. ");
                    LoadDetails();
                }
            }
        });
        _BudgetId = 0;
    }
    function UpdateActivityGrid() {
        debugger;
        if (IsNullOrEmpty(txtAreaCode.value) || IsNullOrEmpty(txtEngCode.value)) {
            WorningMessage("الرجاء اختيار بيانات", "Please select data");
            return;
        }
        if (Number($("#h_BudgetQty").val()) > Number($("#h_ActivQty").val())) {
            WorningMessage("ميزانية الشهر الحالي يجب ان تصبح اقل من او تساوي كمية الانسطه", "Current Month Budget must be Less than or equal to Activity QTY");
            return;
        }
        if (IsNullOrEmpty($("#h_projectphasecode").val().trim()) || IsNullOrEmpty($("#h_BudgetQty").val().trim())) {
            return;
        }
        var ProjetcCode = $("#btnProject").text();
        var desc = _ScreenLanguage == "ar" ? "المشروع" : "Project";
        if (ProjetcCode == desc) {
            return;
        }
        ObjBudget.BudjetID = _BudgetId;
        ObjBudget.PeriodID = Number(txtMonth.value);
        ObjBudget.YearID = Number(SharedSession.CurrentEnvironment.CurrentYear);
        ObjBudget.PeriodCode = Number(txtMonth.value);
        ObjBudget.BranchCode = Number(txtAreaCode.value);
        ObjBudget.SiteEngineerId = Number(txtSiteEngineerId.value);
        ObjBudget.ProjectPhaseItemActivId = Number($("#txtProjectPhaseItemActivId").val());
        ObjBudget.BudgetQty = Number($("#h_BudgetQty").val());
        ObjBudget.ActualQty = 0;
        Ajax.CallAsync({
            url: Url.Action("UpdateActGrid", ControllerName),
            data: ObjBudget,
            success: function (d) {
                var result = d.result;
                if (result.ResponseState == true) {
                    WorningMessage("تم التعديل بنجاح  ", "Data Updated Successfuly. ");
                    _BudgetId = 0;
                    LoadDetails();
                }
            }
        });
    }
    function DeleteActivityGrid(id) {
        Ajax.CallAsync({
            url: Url.Action("DeleteActGrid", ControllerName),
            data: { id: id },
            success: function (d) {
                var result = d.result;
                if (result.ResponseState == true) {
                    WorningMessage("تم التعديل بنجاح  ", "Data Updated Successfuly. ");
                    LoadDetails();
                }
            }
        });
    }
    function Assign() {
        for (var _i = 0, DataSourceActivity_1 = DataSourceActivity; _i < DataSourceActivity_1.length; _i++) {
            var item = DataSourceActivity_1[_i];
            var obj = new P_G_Budget;
            //obj.BudjetID = item.BudjetID;
            //obj.PeriodID = item.PeriodID;
            obj.YearID = Number(SharedSession.CurrentEnvironment.CurrentYear);
            obj.PeriodCode = item.PeriodCode;
            obj.BranchCode = Number(txtAreaCode.value);
            obj.SiteEngineerId = Number(txtSiteEngineerId.value);
            obj.ProjectPhaseItemActivId = item.ProjectPhaseItemActivId;
            obj.BudgetQty = item.BudgetQty;
            obj.ActualQty = item.ActualQty;
            _Budget.push(obj);
        }
    }
    function Update() {
        //    Assign();
        //    Ajax.CallAsync({
        //        url: Url.Action("Update", ControllerName),
        //        data: { JsonData: JSON.stringify(_Budget) },
        //        success: (d) => {
        //            let result = d.result as ResponseResult;
        //            if (result.ResponseState == true) {
        ClientSharedWork.SwitchModes(ScreenModes.Query);
        WorningMessage("تم التعديل بنجاح  ", "Data Updated Successfuly. ");
        //MessageBox.Show(msg, "Update", () => {
        //            });
        //        }
        //    }
        //})
    }
    function LoadDetails() {
        //debugger
        if (IsNullOrEmpty(txtAreaCode.value) || IsNullOrEmpty(txtMonth.value) || IsNullOrEmpty(txtEngCode.value)) {
            WorningMessage("الرجاء اختيار بيانات", "Please select data");
            return;
        }
        debugger;
        $.ajax({
            type: 'GET',
            url: sys.apiUrl("P_G_Budget", "GetEngBudgetEngineer"),
            data: { Siteengineerid: txtSiteEngineerId.value, BranchCode: txtAreaCode.value, LoginYear: SharedSession.CurrentEnvironment.CurrentYear, Month: txtMonth.value },
            dataType: 'json',
            cache: false,
            headers: { 'Accept': 'application/json; charset=utf-8', 'Content-Type': 'application/json' },
            success: function (d) {
                debugger;
                var result = d;
                if (result.IsSuccess) {
                    if (result.Response != null) {
                        DataSourcePhase = result.Response;
                        GridPhase.DataSource = DataSourcePhase;
                        GridPhase.Bind();
                    }
                }
            }
        });
        LoadEngProjectActivity();
    }
    function LoadEngProjectActivity() {
        $.ajax({
            type: 'GET',
            url: sys.apiUrl("P_G_Budget", "GetEngBudgetEngineerActiv"),
            data: { Siteengineerid: txtSiteEngineerId.value, BranchCode: txtAreaCode.value, LoginYear: SharedSession.CurrentEnvironment.CurrentYear, Month: txtMonth.value },
            dataType: 'json',
            cache: false,
            headers: { 'Accept': 'application/json; charset=utf-8', 'Content-Type': 'application/json' },
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    if (result.Response != null) {
                        DataSourceActivity = result.Response;
                        GridActivity.DataSource = DataSourceActivity;
                        GridActivity.Bind();
                    }
                }
            }
        });
        //Ajax.Callsync({
        //    url: Url.Action("GetEngBudgetEngineerActiv", ControllerName),
        //    data: { Siteengineerid: txtSiteEngineerId.value, BranchCode: txtAreaCode.value, LoginYear: SharedSession.CurrentEnvironment.CurrentYear, Month: txtMonth.value },
        //    success: (d) => {
        //        debugger
        //        DataSourceActivity = d.result as Array<PProc_Eng_BudgetEngineerActiv_Result>;
        //        GridActivity.DataSource = DataSourceActivity;
        //        GridActivity.Bind();
        //    }
        //})
    }
    function btnArea_onclick() {
        sys.FindKey(Modules.Prepare, "btnArea", "COMP_CODE = " + _CompCode, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getArea", "SalesEngineer"),
                data: { id: id },
                success: function (d) {
                    var Area = d.result;
                    txtAreaCode.value = Area.BRA_CODE.toString();
                    txtAreaName.value = _ScreenLanguage == "ar" ? Area.BRA_DESC : Area.BRA_DESCL;
                }
            });
        });
    }
    function btnEng_onclick() {
        var Condition = " CompCode = " + _CompCode + " and BraCode = " + _BranchCode;
        sys.FindKey(Modules.Prepare, "btnEng", Condition, function () {
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetSiteEngineer", "Evaluation"),
                data: { id: _Id },
                success: function (d) {
                    var result = d.result;
                    txtSiteEngineerId.value = result.SiteEngineerId.toString();
                    txtEngCode.value = result.EngCode;
                    txtEngName.value = _ScreenLanguage == "ar" ? result.DescA : result.DescE;
                }
            });
        });
    }
    function FillInputText(_TextID, _Data) {
        $("#" + _TextID).text(_Data);
        $("#" + _TextID).val(_Data);
    }
    function Print() {
        var RP = new ReportParameters();
        RP.braCode = txtAreaCode.value;
        RP.yearID = Number(SharedSession.CurrentEnvironment.CurrentYear);
        RP.MonthCode = Number(txtMonth.value);
        RP.EngID = Number(txtSiteEngineerId.value);
        Ajax.CallAsync({
            url: Url.Action("rep_Eng_Budget", "GeneralReports"),
            data: RP,
            success: function (d) {
                debugger;
                var result = d.result;
                window.open(result, "_blank");
            }
        });
    }
})(Prepare || (Prepare = {}));
//# sourceMappingURL=Prepare.js.map