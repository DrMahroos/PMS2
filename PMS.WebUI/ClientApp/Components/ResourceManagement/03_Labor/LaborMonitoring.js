$(document).ready(function () {
    LaborMonitoring.InitalizeComponent();
});
var LaborMonitoring;
(function (LaborMonitoring) {
    var LaborDataSource = new Array();
    var LaborClassDataSource = new Array();
    var ControllerName = "LaborMonitoring";
    //Project
    var txtProjectID;
    var txtProj_Code;
    var butProj_Code;
    var txtProj_Desc;
    //Class
    var txtLaborClassId;
    var txtLClass_CalssCode;
    var butLClass_CalssCode;
    var txtLClass_Desc;
    //Phase
    var txtProjectPhaseId;
    var txtProjectPhaseCode;
    var butProjectPhaseCode;
    var txtPhase_Desc;
    //Category
    var txtLaborCategoryId;
    var txtCategCode;
    var butCategCode;
    var txtCat_Desc;
    //workSced
    var txtScheduleId;
    var txtSchedule_Code;
    var butSchedule_Code;
    var txtSchedule_Desc;
    //Site Engineer
    var txtSiteEngineerId;
    var txtSiteEngineer_Code;
    var butSiteEngineer_Code;
    var txtSiteEngineer_Desc;
    var butLoad;
    var showall;
    var showcurrent;
    var ShowLeft;
    var showdelayed;
    var GridLabor = new JsGrid();
    var GridLaborClass = new JsGrid();
    var sys = new SystemTools();
    var ProjectId;
    var _compCode;
    var _braCode;
    var _screenLang;
    function InitalizeComponent() {
        SharedSession.CurrentPrivileges = GetPrivileges();
        SharedSession.CurrentEnvironment = GetSystemEnvironment();
        _compCode = SharedSession.CurrentEnvironment.CompCode;
        _braCode = SharedSession.CurrentEnvironment.BranchCode;
        _screenLang = SharedSession.CurrentEnvironment.ScreenLanguage;
        ControlsButtons.AddButton.disabled = true;
        ControlsButtons.EditButton.disabled = true;
        ControlsButtons.DeleteButton.disabled = true;
        ControlsButtons.PrintButton.disabled = false;
        ClientSharedWork.OnNavigate = Navigate;
        InitalizeControls();
        InitalizeEvents();
        InitalizeGrid();
        showall.checked = true;
    }
    LaborMonitoring.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        txtProjectID = DocumentActions.GetElementById("txtProjectID");
        txtProj_Code = DocumentActions.GetElementById("txtProj_Code");
        butProj_Code = DocumentActions.GetElementById("butProj_Code");
        txtProj_Desc = DocumentActions.GetElementById("txtProj_Desc");
        txtLaborClassId = DocumentActions.GetElementById("txtLaborClassId");
        txtLClass_CalssCode = DocumentActions.GetElementById("txtLClass_CalssCode");
        butLClass_CalssCode = DocumentActions.GetElementById("butLClass_CalssCode");
        txtLClass_Desc = DocumentActions.GetElementById("txtLClass_Desc");
        txtProjectPhaseId = DocumentActions.GetElementById("txtProjectPhaseId");
        txtProjectPhaseCode = DocumentActions.GetElementById("txtProjectPhaseCode");
        butProjectPhaseCode = DocumentActions.GetElementById("butProjectPhaseCode");
        txtPhase_Desc = DocumentActions.GetElementById("txtPhase_Desc");
        txtLaborCategoryId = DocumentActions.GetElementById("txtLaborCategoryId");
        txtCategCode = DocumentActions.GetElementById("txtCategCode");
        butCategCode = DocumentActions.GetElementById("butCategCode");
        txtCat_Desc = DocumentActions.GetElementById("txtCat_Desc");
        txtScheduleId = DocumentActions.GetElementById("txtScheduleId");
        txtSchedule_Code = DocumentActions.GetElementById("txtSchedule_Code");
        butSchedule_Code = DocumentActions.GetElementById("butSchedule_Code");
        txtSchedule_Desc = DocumentActions.GetElementById("txtSchedule_Desc");
        txtSiteEngineerId = DocumentActions.GetElementById("txtSiteEngineerId");
        txtSiteEngineer_Code = DocumentActions.GetElementById("txtSiteEngineer_Code");
        butSiteEngineer_Code = DocumentActions.GetElementById("butSiteEngineer_Code");
        txtSiteEngineer_Desc = DocumentActions.GetElementById("txtSiteEngineer_Desc");
        showall = DocumentActions.GetElementById("showall");
        showcurrent = DocumentActions.GetElementById("showcurrent");
        ShowLeft = DocumentActions.GetElementById("ShowLeft");
        showdelayed = DocumentActions.GetElementById("showdelayed");
        butLoad = DocumentActions.GetElementById("butLoad");
        //AllSubContract = Ajax.Call<Array<PQ_GetEngSubContract>>({ url: Url.Action("GetAllSubContractMaster", ControllerName) });
    }
    function InitalizeEvents() {
        butProj_Code.onclick = butProj_Code_Click;
        butLClass_CalssCode.onclick = butLClass_CalssCode_Click;
        butProjectPhaseCode.onclick = butProjectPhaseCode_Click;
        butCategCode.onclick = butCategCode_Click;
        butSchedule_Code.onclick = butSchedule_Code_Click;
        butSiteEngineer_Code.onclick = butSiteEngineer_Code_Click;
        butLoad.onclick = butLoad_Click;
        showall.onchange = Filter;
        showcurrent.onchange = Filter;
        ShowLeft.onchange = Filter;
        showdelayed.onchange = Filter;
        txtProj_Code.onchange = Proj_Code_Changed;
        txtProjectPhaseCode.onchange = ProjectPhaseCode_Changed;
        txtSchedule_Code.onchange = Schedule_Code_Changed;
        txtSiteEngineer_Code.onchange = SiteEngineer_Code_Changed;
        //txtLClass_CalssCode.onchange = LClass_CalssCode_Changed;
        txtCategCode.onchange = CategCode_Changed;
    }
    function butProj_Code_Click() {
        sys.FindKey(Modules.LaborMonitoring, "butProj_Code", "CompCode = " + _compCode + " and BraCode = " + _braCode + " and Status = 1", function () {
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetProjectByID", ControllerName),
                data: { id: _Id },
                success: function (d) {
                    var result = d.result;
                    ProjectId = result.ProjectID;
                    txtProjectID.value = result.ProjectID.toString();
                    txtProj_Code.value = result.ProjectCode;
                    if (ClientSharedWork.Session.ScreenLanguage == "ar") {
                        txtProj_Desc.value = result.DescA;
                    }
                    else {
                        txtProj_Desc.value = result.DescL;
                    }
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
                debugger;
                if (IsNullOrEmpty(d.result)) {
                    ProjectId = 0;
                    txtProjectID.value = "";
                    txtProj_Code.value = "";
                    txtProj_Desc.value = "";
                    WorningMessage("الرمز خطأ، أعد المحاولة .... ", "Wrong Code , .. Retry .. ");
                    return;
                }
                var result = d.result;
                ProjectId = result[0].ProjectID;
                txtProjectID.value = result[0].ProjectID.toString();
                txtProj_Code.value = result[0].ProjectCode;
                if (ClientSharedWork.Session.ScreenLanguage == "ar") {
                    txtProj_Desc.value = result[0].DescA;
                }
                else {
                    txtProj_Desc.value = result[0].DescL;
                }
            }
        });
    }
    function Navigate() {
    }
    function butLClass_CalssCode_Click() {
        sys.FindKey(Modules.LaborMonitoring, "butLClass_CalssCode", "", function () {
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetLaborClassByID", ControllerName),
                data: { id: _Id },
                success: function (d) {
                    var result = d.result;
                    txtLaborClassId.value = result.LaborClassId.toString();
                    txtLClass_CalssCode.value = result.ClassCode;
                    if (ClientSharedWork.Session.ScreenLanguage == "ar") {
                        txtLClass_Desc.value = result.DescA;
                    }
                    else {
                        txtLClass_Desc.value = result.DescE;
                    }
                }
            });
        });
    }
    function LClass_CalssCode_Changed() {
        //Ajax.CallAsync({
        //    url: Url.Action("GetLaborClassByID", ControllerName),
        //    data: { id: _Id },
        //    success: (d) => {
        //        let result = d.result as P_D_LaborClass;
        //        txtLaborClassId.value = result.LaborClassId.toString();
        //        txtLClass_CalssCode.value = result.ClassCode;
        //        if (ClientSharedWork.Session.ScreenLanguage == "ar") {
        //            txtLClass_Desc.value = result.DescA;
        //        }
        //        else {
        //            txtLClass_Desc.value = result.DescE;
        //        }
        //    }
        //});
    }
    function butProjectPhaseCode_Click() {
        if (txtProjectID.value == "" || txtProjectID.value == " ") {
            WorningMessage("يجب ادخال رقم المشروع", "Project must be Selected");
        }
        else
            sys.FindKey(Modules.LaborMonitoring, "butProjectPhaseCode", "  ProjectID = " + txtProjectID.value, function () {
                var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
                Ajax.CallAsync({
                    url: Url.Action("GetProjectPhaseByID", ControllerName),
                    data: { id: _Id },
                    success: function (d) {
                        var result = d.result;
                        txtProjectPhaseId.value = result.ProjectPhaseId.toString();
                        txtProjectPhaseCode.value = result.ProjectPhaseCode;
                        if (ClientSharedWork.Session.ScreenLanguage == "ar") {
                            txtPhase_Desc.value = result.DescA;
                        }
                        else {
                            txtPhase_Desc.value = result.DescL;
                        }
                    }
                });
            });
    }
    function ProjectPhaseCode_Changed() {
        if (txtProjectID.value == "" || txtProjectID.value == " ") {
            WorningMessage("يجب ادخال رقم المشروع", "Project must be Selected");
        }
        else {
            debugger;
            var PhaseNo = (txtProjectPhaseCode.value);
            Ajax.CallAsync({
                url: Url.Action("getProjectPhasetableByno", "FindByNo"),
                data: { ProjectId: ProjectId, PhaseNo: PhaseNo },
                success: function (d) {
                    if (IsNullOrEmpty(d.result)) {
                        txtProjectPhaseId.value = "";
                        txtProjectPhaseCode.value = "";
                        txtPhase_Desc.value = "";
                        WorningMessage("الرمز خطأ، أعد المحاولة .... ", "Wrong Code , .. Retry .. ");
                        return;
                    }
                    var result = d.result;
                    txtProjectPhaseId.value = result[0].ProjectPhaseId.toString();
                    txtProjectPhaseCode.value = result[0].ProjectPhaseCode;
                    if (ClientSharedWork.Session.ScreenLanguage == "ar") {
                        txtPhase_Desc.value = result[0].DescA;
                    }
                    else {
                        txtPhase_Desc.value = result[0].DescL;
                    }
                }
            });
        }
    }
    function butCategCode_Click() {
        sys.FindKey(Modules.LaborMonitoring, "butCategCode", "CompCode = " + ClientSharedWork.Session.CompCode, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getLaborCategoryByID", ControllerName),
                data: { id: id },
                success: function (d) {
                    var laborCat = d.result;
                    txtLaborCategoryId.value = laborCat.LaborCategoryId.toString();
                    txtCategCode.value = laborCat.CategCode.toString();
                    if (ClientSharedWork.Session.ScreenLanguage == "ar") {
                        txtCat_Desc.value = laborCat.DescA;
                    }
                    else {
                        txtCat_Desc.value = laborCat.DescE;
                    }
                }
            });
        });
    }
    function CategCode_Changed() {
        //Ajax.CallAsync({
        //    url: Url.Action("getLaborCategoryByID", ControllerName),
        //    data: { id: id },
        //    success: (d) => {
        //        let laborCat = d.result as P_D_LaborCategory;
        //        txtLaborCategoryId.value = laborCat.LaborCategoryId.toString();
        //        txtCategCode.value = laborCat.CategCode.toString();
        //        if (ClientSharedWork.Session.ScreenLanguage == "ar") {
        //            txtCat_Desc.value = laborCat.DescA;
        //        }
        //        else {
        //            txtCat_Desc.value = laborCat.DescE;
        //        }
        //    }
        //});
    }
    function butSchedule_Code_Click() {
        var cond;
        cond = "CompCode = " + _compCode + " and BraCode = " + _braCode;
        if (Number(txtProjectPhaseId.value) > 0)
            cond = cond + " and ProjectPhaseId = " + txtProjectPhaseId.value;
        sys.FindKey(Modules.LaborMonitoring, "butSchedule_Code", cond, function () {
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetEngScheduleByID", ControllerName),
                data: { id: _Id },
                success: function (d) {
                    var workSchedule = d.result;
                    txtScheduleId.value = workSchedule.ScheduleId.toString();
                    txtSchedule_Code.value = workSchedule.TrNo.toString();
                    if (ClientSharedWork.Session.ScreenLanguage == "ar") {
                        txtSchedule_Desc.value = workSchedule.WorkDescr;
                    }
                    else {
                        txtSchedule_Desc.value = workSchedule.WorkDescr;
                    }
                }
            });
        });
    }
    function Schedule_Code_Changed() {
        //var cond: string;
        //cond = "CompCode = " + _compCode + " and BraCode = " + _braCode
        //if (Number(txtProjectPhaseId) > 0)
        //    cond = cond + " and ProjectPhaseId = " + txtProjectPhaseId
        var trno = Number(txtSchedule_Code.value);
        Ajax.CallAsync({
            url: Url.Action("getEngScheduleTableByNo", "FindByNo"),
            data: { trno: trno },
            success: function (d) {
                if (IsNullOrEmpty(d.result)) {
                    txtScheduleId.value = "";
                    txtSchedule_Code.value = "";
                    txtSchedule_Desc.value = "";
                    WorningMessage("الرمز خطأ، أعد المحاولة .... ", "Wrong Code , .. Retry .. ");
                    return;
                }
                var workSchedule = d.result;
                txtScheduleId.value = workSchedule.ScheduleId.toString();
                txtSchedule_Code.value = workSchedule.TrNo.toString();
                if (ClientSharedWork.Session.ScreenLanguage == "ar") {
                    txtSchedule_Desc.value = workSchedule.WorkDescr;
                }
                else {
                    txtSchedule_Desc.value = workSchedule.WorkDescr;
                }
            }
        });
    }
    function butSiteEngineer_Code_Click() {
        sys.FindKey(Modules.LaborMonitoring, "butSiteEngineer_Code", " CompCode = " + _compCode + " and BraCode = " + _braCode + " and IsActive = 1", function () {
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetSiteEngineerByID", ControllerName),
                data: { id: _Id },
                success: function (d) {
                    var SiteEng = d.result;
                    txtSiteEngineerId.value = SiteEng.SiteEngineerId.toString();
                    txtSiteEngineer_Code.value = SiteEng.EngCode.toString();
                    if (ClientSharedWork.Session.ScreenLanguage == "ar") {
                        txtSiteEngineer_Desc.value = SiteEng.DescA;
                    }
                    else {
                        txtSiteEngineer_Desc.value = SiteEng.DescE;
                    }
                }
            });
        });
    }
    function SiteEngineer_Code_Changed() {
        var code = txtSiteEngineer_Code.value;
        Ajax.CallAsync({
            url: Url.Action("getSiteEngineerByCode", "FindByNo"),
            data: { code: code },
            success: function (d) {
                if (IsNullOrEmpty(d.result)) {
                    txtSiteEngineerId.value = "";
                    txtSiteEngineer_Code.value = "";
                    txtSiteEngineer_Desc.value = "";
                    WorningMessage("الرمز خطأ، أعد المحاولة .... ", "Wrong Code , .. Retry .. ");
                    return;
                }
                var SiteEng = d.result;
                txtSiteEngineerId.value = SiteEng[0].SiteEngineerId.toString();
                txtSiteEngineer_Code.value = SiteEng[0].EngCode.toString();
                if (ClientSharedWork.Session.ScreenLanguage == "ar") {
                    txtSiteEngineer_Desc.value = SiteEng[0].DescA;
                }
                else {
                    txtSiteEngineer_Desc.value = SiteEng[0].DescE;
                }
            }
        });
    }
    function butLoad_Click() {
        if (IsNullOrEmpty(txtProj_Code.value) && IsNullOrEmpty(txtProj_Desc.value)) {
            WorningMessage("يجب اختيار مشروع على الاقل", "Project at least must be selected ");
            return;
        }
        // make 0:Current , 1 : left  , 2 for all
        var stat;
        if (showcurrent.checked) {
            stat = "0";
        }
        else if (ShowLeft.checked) {
            stat = "1";
        }
        else if (showall.checked) {
            stat = "2";
        }
        else {
            stat = "2";
        }
        GetEngMonitorScheduleLabour(Number(txtLaborClassId.value), Number(txtSiteEngineerId.value), Number(txtProjectID.value), Number(txtProjectPhaseId.value), Number(txtScheduleId.value), Number(txtLaborCategoryId.value), Number(stat));
        GetEngMonitorScheduleLabourClass(Number(txtLaborClassId.value), Number(txtSiteEngineerId.value), Number(txtProjectID.value), Number(txtProjectPhaseId.value), Number(txtScheduleId.value));
    }
    function GetEngMonitorScheduleLabour(Clas, eng, Proj, phase, sch, cat, stat) {
        Ajax.CallAsync({
            url: Url.Action("GetEngMonitorScheduleLabour", ControllerName),
            data: { ClasId: Clas, engId: eng, ProjId: Proj, phaseId: phase, schId: sch, catId: cat, status: stat },
            success: function (d) {
                debugger;
                LaborDataSource = d.result;
                for (var i = 0; i < LaborDataSource.length; i++) {
                    LaborDataSource[i].AssigneDate = DateFormat(LaborDataSource[i].AssigneDate);
                    LaborDataSource[i].ExpLeaveDate = DateFormat(LaborDataSource[i].ExpLeaveDate);
                    LaborDataSource[i].LeaveDate = LaborDataSource[i].LeaveDate != null ? DateFormat(LaborDataSource[i].LeaveDate) : LaborDataSource[i].LeaveDate = null;
                }
                GridLabor.DataSource = LaborDataSource;
                GridLabor.Bind();
            }
        });
    }
    function GetEngMonitorScheduleLabourClass(Clas, eng, Proj, phase, sch) {
        Ajax.CallAsync({
            url: Url.Action("GetEngMonitorScheduleLabourClass", ControllerName),
            data: { ClasId: Clas, engId: eng, ProjId: Proj, phaseId: phase, schId: sch },
            success: function (d) {
                LaborClassDataSource = d.result;
                GridLaborClass.DataSource = LaborClassDataSource;
                GridLaborClass.Bind();
            }
        });
    }
    function InitalizeGrid() {
        var res = GetResourceList("ResM_Materiallabor");
        GridLabor.ElementName = "GridParent";
        //GridLabor.Inserting = SharedSession.CurrentPrivileges.AddNew;
        GridLabor.Editing = SharedSession.CurrentPrivileges.EDIT;
        GridLabor.ConfirmDeleteing = SharedSession.CurrentPrivileges.Remove;
        //GridLabor.InsertionMode = JsGridInsertionMode.Binding;
        GridLabor.Columns = [
            { title: res.ResM_Materiallabor_laborcode, name: "LaborCode", type: "text", width: "5.5%" },
            { title: res.ResM_Materiallabor_Labname, name: "DescA", visible: ClientSharedWork.Session.ScreenLanguage == "ar", type: "text", width: "20.5%" },
            { title: res.ResM_Materiallabor_Labname, name: "DescE", visible: ClientSharedWork.Session.ScreenLanguage == "en", type: "text", width: "20.5%" },
            { title: res.ResM_Materiallabor_name, name: "LClass_DescA", visible: ClientSharedWork.Session.ScreenLanguage == "ar", type: "text", width: "15.5%" },
            { title: res.ResM_Materiallabor_name, name: "LClass_DescE", visible: ClientSharedWork.Session.ScreenLanguage == "en", type: "text", width: "15.5%" },
            { title: res.ResM_Materiallabor_class, name: "LClass_CalssCode", type: "text", width: "5.5%" },
            { title: res.ResM_Materiallabor_category, name: "Cat_CatCode", type: "text", width: "7.5%" },
            { title: res.ResM_Materiallabor_phaseno, name: "ProjectPhaseCode", type: "text", width: "7.5%" },
            { title: res.ResM_Materiallabor_schedno, name: "SchNo", type: "text", width: "7.5%" },
            { title: res.ResM_Materiallabor_assigndate, name: "AssigneDate", type: "Date", width: "7.5%" },
            { title: res.ResM_Materiallabor_planeleavedate, name: "ExpLeaveDate", type: "Date", width: "9.5%" },
            { title: res.ResM_Materiallabor_leavedate, name: "LeaveDate", type: "Date", width: "7.5%" },
            { title: res.ResM_Materiallabor_status, name: "Stat_desc", type: "text", width: "7.5%" }
            //,{ type: "control", width: "3%" }
        ];
        GridLabor.DataSource = LaborDataSource;
        GridLabor.Bind();
        GridLaborClass.ElementName = "GridChild";
        //GridLaborClass.Inserting = SharedSession.CurrentPrivileges.AddNew;
        GridLaborClass.Editing = SharedSession.CurrentPrivileges.EDIT;
        GridLaborClass.ConfirmDeleteing = SharedSession.CurrentPrivileges.Remove;
        //GridLaborClass.InsertionMode = JsGridInsertionMode.Binding;
        GridLaborClass.Columns = [
            { title: res.ResM_Materiallabor_labclass, name: "LClass_CalssCode", type: "text", width: "7.5%" },
            { title: res.ResM_Materiallabor_classname, name: "LClass_DescA", visible: ClientSharedWork.Session.ScreenLanguage == "ar", type: "text", width: "7.5%" },
            { title: res.ResM_Materiallabor_classname, name: "LClass_DescE", visible: ClientSharedWork.Session.ScreenLanguage == "en", type: "text", width: "7.5%" },
            { title: res.ResM_Materiallabor_requiredlabors, name: "required", type: "text", width: "7.5%" },
            { title: res.ResM_Materiallabor_assigned, name: "assigned", type: "text", width: "7.5%" },
            { title: res.ResM_Materiallabor_remain, name: "Remain", type: "text", width: "7.5%" }
            //,{ type: "control", width: "3%" }
        ];
        GridLaborClass.DataSource = LaborClassDataSource;
        GridLaborClass.Bind();
    }
    function Filter() {
        var value = true;
        var newLabors = new Array();
        switch (value) {
            case (showall.checked == true):
                GridLabor.DataSource = LaborDataSource;
                GridLabor.Bind();
                break;
            case (showcurrent.checked == true):
                newLabors = LaborDataSource.filter(function (x) { return x.Status == 0; });
                GridLabor.DataSource = newLabors;
                GridLabor.Bind();
                break;
            case (showdelayed.checked == true):
                var todayDate_1 = DateFormat(new Date().toString());
                newLabors = LaborDataSource.filter(function (x) { return x.Status == 0 && x.ExpLeaveDate < todayDate_1; });
                GridLabor.DataSource = newLabors;
                GridLabor.Bind();
                break;
            case (ShowLeft.checked == true):
                newLabors = LaborDataSource.filter(function (x) { return x.Status == 1; });
                GridLabor.DataSource = newLabors;
                GridLabor.Bind();
                break;
            default:
        }
    }
    // هنا ناقص الفيلتر
})(LaborMonitoring || (LaborMonitoring = {}));
//# sourceMappingURL=LaborMonitoring.js.map