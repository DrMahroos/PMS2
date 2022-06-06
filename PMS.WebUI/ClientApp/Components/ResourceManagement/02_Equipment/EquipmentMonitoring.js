$(document).ready(function () {
    EquipmentMonitoring.InitalizeComponent();
});
var EquipmentMonitoring;
(function (EquipmentMonitoring) {
    var DataSource = new Array();
    var DataSourceEquipClasses = new Array();
    var GridParent = new JsGrid();
    var GridChild = new JsGrid();
    var sys = new SystemTools();
    var ControllerName = "EquipmentMonitoring";
    var txtprojectCode;
    var txtprojectName;
    var txtphaseCode;
    var txtphaseName;
    var txtschaduleCode;
    var txtschduleDesc;
    var txtengCode;
    var txtengName;
    var txtclassCode;
    var txtclassDesc;
    var txtcatCode;
    var txtcatDesc;
    var ShowAll;
    var ShowCurrent;
    var Showdelayed;
    var ShowLeft;
    var btnSearchProject;
    var btnSearchPhase;
    var btnSearchSchdule;
    var btnSearchEng;
    var btnSearchClass;
    var btnSearchCat;
    var btnLoad;
    var _compCode;
    var _braCode;
    var _screenLang;
    var ProjectId;
    var ProjectPhaseId;
    var scheduleId;
    var siteEngineerId;
    var equipClassId;
    var CategoryId;
    function InitalizeComponent() {
        SharedSession.CurrentPrivileges = GetPrivileges();
        SharedSession.CurrentEnvironment = GetSystemEnvironment();
        _compCode = SharedSession.CurrentEnvironment.CompCode;
        _braCode = SharedSession.CurrentEnvironment.BranchCode;
        _screenLang = SharedSession.CurrentEnvironment.ScreenLanguage;
        //ControlsButtons.AddButton.disabled = true;
        //ControlsButtons.EditButton.disabled = true;
        //ControlsButtons.DeleteButton.disabled = true;
        //ControlsButtons.PrintButton.disabled = true;
        ClientSharedWork.OnNavigate = Navigate;
        InitalizeControls();
        InitalizeEvents();
        InitalizeGrid();
        ShowAll.checked = true;
    }
    EquipmentMonitoring.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        txtprojectCode = DocumentActions.GetElementById("txtprojectCode");
        txtprojectName = DocumentActions.GetElementById("txtprojectName");
        txtphaseCode = DocumentActions.GetElementById("txtphaseCode");
        txtphaseName = DocumentActions.GetElementById("txtphaseName");
        txtschaduleCode = DocumentActions.GetElementById("txtschaduleCode");
        txtschduleDesc = DocumentActions.GetElementById("txtschduleDesc");
        txtengCode = DocumentActions.GetElementById("txtengCode");
        txtengName = DocumentActions.GetElementById("txtengName");
        txtclassCode = DocumentActions.GetElementById("txtclassCode");
        txtclassDesc = DocumentActions.GetElementById("txtclassDesc");
        txtcatCode = DocumentActions.GetElementById("txtcatCode");
        txtcatDesc = DocumentActions.GetElementById("txtcatDesc");
        ShowAll = DocumentActions.GetElementById("ShowAll");
        ShowCurrent = DocumentActions.GetElementById("ShowCurrent");
        Showdelayed = DocumentActions.GetElementById("Showdelayed");
        ShowLeft = DocumentActions.GetElementById("ShowLeft");
        btnSearchProject = DocumentActions.GetElementById("btnSearchProject");
        btnSearchPhase = DocumentActions.GetElementById("btnSearchPhase");
        btnSearchSchdule = DocumentActions.GetElementById("btnSearchSchdule");
        btnSearchEng = DocumentActions.GetElementById("btnSearchEng");
        btnSearchClass = DocumentActions.GetElementById("btnSearchClass");
        btnSearchCat = DocumentActions.GetElementById("btnSearchCat");
        btnLoad = DocumentActions.GetElementById("btnLoad");
    }
    function InitalizeEvents() {
        btnSearchProject.onclick = btnSearchProject_Cliked;
        btnSearchPhase.onclick = btnSearchPhase_Cliked;
        btnSearchSchdule.onclick = btnSearchSchdule_Cliked;
        btnSearchEng.onclick = btnSearchEng_Cliked;
        btnSearchClass.onclick = btnSearchClass_Cliked;
        btnLoad.onclick = btnLoad_Cliked;
        btnSearchCat.onclick = btnSearchCat_Click;
        ShowAll.onchange = Filter;
        ShowCurrent.onchange = Filter;
        Showdelayed.onchange = Filter;
        ShowLeft.onchange = Filter;
    }
    function InitalizeGrid() {
        var res = GetResourceList("ResM_Materiallabor");
        GridParent.ElementName = "GridParent";
        //GridParent.Inserting = SharedSession.CurrentPrivileges.AddNew;
        GridParent.Editing = SharedSession.CurrentPrivileges.EDIT;
        GridParent.ConfirmDeleteing = SharedSession.CurrentPrivileges.Remove;
        //GridParent.InsertionMode = JsGridInsertionMode.Binding;
        GridParent.Columns = [
            { title: res.ResM_Materiallabor_Equipcode, name: "equipcode", type: "text", width: "7.5%" },
            { title: res.ResM_Materiallabor_name, name: "eclass_desca", visible: ClientSharedWork.Session.ScreenLanguage == "ar", type: "text", width: "15.5%" },
            { title: res.ResM_Materiallabor_name, name: "eclass_desce", visible: ClientSharedWork.Session.ScreenLanguage == "en", type: "text", width: "15.5%" },
            { title: res.ResM_Materiallabor_class, name: "eclass_calsscode", type: "text", width: "7.5%" },
            { title: res.ResM_Materiallabor_phaseno, name: "projectphasecode", type: "text", width: "7.5%" },
            { title: res.ResM_Materiallabor_schedno, name: "schno", type: "text", width: "7.5%" },
            { title: res.ResM_Materiallabor_assigndate, name: "assignedate", type: "text", width: "7.5%" },
            { title: res.ResM_Materiallabor_planeleavedate, name: "expleavedate", type: "text", width: "7.5%" },
            { title: res.ResM_Materiallabor_leavedate, name: "leavedate", type: "text", width: "7.5%" },
            { title: res.ResM_Materiallabor_status, name: "stat_desc", type: "text", width: "7.5%" }
            //{ type: "control", width: "3%" }
        ];
        GridParent.DataSource = DataSource;
        GridParent.Bind();
    }
    function Navigate() {
    }
    function btnSearchProject_Cliked() {
        sys.FindKey(Modules.EquipmentMonitoring, "btnSearchProject", "CompCode = " + _compCode + " and BraCode = " + _braCode + " and Status = 1", function () {
            debugger;
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetProjectByID", ControllerName),
                data: { id: _Id },
                success: function (d) {
                    var result = d.result;
                    ProjectId = result.ProjectID;
                    txtprojectCode.value = result.ProjectCode;
                    txtprojectName.value = _screenLang == "ar" ? result.DescA : result.DescL;
                }
            });
        });
    }
    function btnSearchPhase_Cliked() {
        if (txtprojectCode.value == "" || txtprojectCode.value == " ") {
            WorningMessage("يجب ادخال رقم المشروع", "Project must be Selected");
        }
        else
            sys.FindKey(Modules.EquipmentMonitoring, "btnSearchPhase", " Status = 1 and ProjectID = " + ProjectId, function () {
                var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
                Ajax.CallAsync({
                    url: Url.Action("GetProjectPhaseByID", ControllerName),
                    data: { id: _Id },
                    success: function (d) {
                        var result = d.result;
                        ProjectPhaseId = result.ProjectPhaseId;
                        txtphaseCode.value = result.ProjectPhaseCode;
                        if (ClientSharedWork.Session.ScreenLanguage == "ar") {
                            txtphaseName.value = result.DescA;
                        }
                        else {
                            txtphaseName.value = result.DescL;
                        }
                    }
                });
            });
    }
    function btnSearchSchdule_Cliked() {
        sys.FindKey(Modules.EquipmentMonitoring, "btnSearchSchdule", "", function () {
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetEngScheduleByID", ControllerName),
                data: { id: _Id },
                success: function (d) {
                    var workSchedule = d.result;
                    scheduleId = workSchedule.ScheduleId;
                    txtschaduleCode.value = workSchedule.TrNo.toString();
                    if (ClientSharedWork.Session.ScreenLanguage == "ar") {
                        txtschduleDesc.value = workSchedule.WorkDescr;
                    }
                    else {
                        txtschduleDesc.value = workSchedule.WorkDescr;
                    }
                }
            });
        });
    }
    function btnSearchEng_Cliked() {
        sys.FindKey(Modules.EquipmentMonitoring, "btnSearchEng", " CompCode = " + _compCode + " and BraCode = " + _braCode + " and IsActive = 1", function () {
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetSiteEngineerByID", ControllerName),
                data: { id: _Id },
                success: function (d) {
                    var SiteEng = d.result;
                    siteEngineerId = SiteEng.SiteEngineerId;
                    txtengCode.value = SiteEng.EngCode;
                    if (ClientSharedWork.Session.ScreenLanguage == "ar") {
                        txtengName.value = SiteEng.DescA;
                    }
                    else {
                        txtengName.value = SiteEng.DescE;
                    }
                }
            });
        });
    }
    function btnSearchClass_Cliked() {
        sys.FindKey(Modules.EquipmentMonitoring, "btnSearchClass", "CompCode = " + _compCode, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetEquipmentClass", ControllerName),
                data: { id: id },
                success: function (d) {
                    var equip = d.result;
                    equipClassId = equip.EquipClassId;
                    txtclassCode.value = equip.ClassCode;
                    if (ClientSharedWork.Session.ScreenLanguage == "ar") {
                        txtclassDesc.value = equip.DescA;
                    }
                    else {
                        txtclassDesc.value = equip.DescE;
                    }
                }
            });
        });
    }
    function btnSearchCat_Click() {
        sys.FindKey(Modules.EquipmentMonitoring, "btnSearchCat", "CompCode = " + ClientSharedWork.Session.CompCode, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getLaborCategoryByID", ControllerName),
                data: { id: id },
                success: function (d) {
                    var laborCat = d.result;
                    CategoryId = laborCat.LaborCategoryId;
                    txtcatCode.value = laborCat.CategCode.toString();
                    txtcatDesc.value = _screenLang == "ar" ? laborCat.DescA : laborCat.DescE;
                }
            });
        });
    }
    function btnLoad_Cliked() {
        debugger;
        if (IsNullOrEmpty(txtprojectCode.value) && IsNullOrEmpty(txtprojectName.value)) {
            WorningMessage("يجب اختيار مشروع على الاقل", "Project at least must be selected ");
            return;
        }
        // make 0:Current , 1 : left  , 2 for all
        var stat;
        if (ShowCurrent.checked) {
            stat = "0";
        }
        else if (ShowLeft.checked) {
            stat = "1";
        }
        else if (ShowAll.checked) {
            stat = "2";
        }
        else {
            stat = "2";
        }
        GetEngMonitorScheduleEquip(equipClassId, siteEngineerId, ProjectId, ProjectPhaseId, scheduleId, Number(stat));
        //GetEngMonitorScheduleEquipClass(equipClassId, siteEngineerId, ProjectId, ProjectPhaseId, scheduleId);
    }
    function GetEngMonitorScheduleEquip(Clas, eng, Proj, phase, sch, stat) {
        Ajax.CallAsync({
            url: Url.Action("GetEngMonitorScheduleEquip", ControllerName),
            data: { ClasId: Clas, engId: eng, ProjId: Proj, phaseId: phase, schId: sch, status: stat },
            success: function (d) {
                DataSource = d.result;
                for (var i = 0; i < DataSource.length; i++) {
                    DataSource[i].assignedate = DateFormat(DataSource[i].assignedate);
                    DataSource[i].expleavedate = DateFormat(DataSource[i].expleavedate);
                    DataSource[i].leavedate = DataSource[i].leavedate != null ? DateFormat(DataSource[i].leavedate) : DataSource[i].leavedate = null;
                }
                debugger;
                GridParent.DataSource = DataSource;
                GridParent.Bind();
            }
        });
    }
    function GetEngMonitorScheduleEquipClass(Clas, eng, Proj, phase, sch) {
        Ajax.CallAsync({
            url: Url.Action("GetEngMonitorScheduleEquipClass", ControllerName),
            data: { ClasId: Clas, engId: eng, ProjId: Proj, phaseId: phase, schId: sch },
            success: function (d) {
                DataSourceEquipClasses = d.result;
                GridChild.DataSource = DataSourceEquipClasses;
                GridChild.Bind();
            }
        });
    }
    function Filter() {
        var value = true;
        var newEquipment = new Array();
        switch (value) {
            case (ShowAll.checked == true):
                GridParent.DataSource = DataSource;
                GridParent.Bind();
                break;
            case (ShowCurrent.checked == true):
                newEquipment = DataSource.filter(function (x) { return x.status == 0; });
                GridParent.DataSource = newEquipment;
                GridParent.Bind();
                break;
            case (Showdelayed.checked == true):
                var todayDate_1 = DateFormat(new Date().toString());
                newEquipment = DataSource.filter(function (x) { return x.status == 0 && x.expleavedate < todayDate_1; });
                GridParent.DataSource = newEquipment;
                GridParent.Bind();
                break;
            case (ShowLeft.checked == true):
                newEquipment = DataSource.filter(function (x) { return x.status == 1; });
                GridParent.DataSource = newEquipment;
                GridParent.Bind();
                break;
            default:
        }
    }
})(EquipmentMonitoring || (EquipmentMonitoring = {}));
//# sourceMappingURL=EquipmentMonitoring.js.map