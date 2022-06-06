$(document).ready(() => {
    LaborMonitoring.InitalizeComponent();
});

namespace LaborMonitoring {
    var LaborDataSource: Array<PQ_GetEngWorkSchduleLabor> = new Array<PQ_GetEngWorkSchduleLabor>();
    var LaborClassDataSource: Array<PQ_GetEngWorkSchduleLaborClass> = new Array<PQ_GetEngWorkSchduleLaborClass>();
    const ControllerName: string = "LaborMonitoring";
    //Project
    var txtProjectID: HTMLInputElement;
    var txtProj_Code: HTMLInputElement;
    var butProj_Code: HTMLButtonElement;
    var txtProj_Desc: HTMLInputElement;
    //Class
    var txtLaborClassId: HTMLInputElement;
    var txtLClass_CalssCode: HTMLInputElement;
    var butLClass_CalssCode: HTMLButtonElement;
    var txtLClass_Desc: HTMLInputElement;
    //Phase
    var txtProjectPhaseId: HTMLInputElement;
    var txtProjectPhaseCode: HTMLInputElement;
    var butProjectPhaseCode: HTMLButtonElement;
    var txtPhase_Desc: HTMLInputElement;
    //Category
    var txtLaborCategoryId: HTMLInputElement;
    var txtCategCode: HTMLInputElement;
    var butCategCode: HTMLButtonElement;
    var txtCat_Desc: HTMLInputElement;
    //workSced
    var txtScheduleId: HTMLInputElement;
    var txtSchedule_Code: HTMLInputElement;
    var butSchedule_Code: HTMLButtonElement;
    var txtSchedule_Desc: HTMLInputElement;
    //Site Engineer
    var txtSiteEngineerId: HTMLInputElement;
    var txtSiteEngineer_Code: HTMLInputElement;
    var butSiteEngineer_Code: HTMLButtonElement;
    var txtSiteEngineer_Desc: HTMLInputElement;

    var butLoad: HTMLButtonElement;
    var showall: HTMLInputElement;
    var showcurrent: HTMLInputElement;
    var ShowLeft: HTMLInputElement;
    var showdelayed: HTMLInputElement;

    var GridLabor: JsGrid = new JsGrid();
    var GridLaborClass: JsGrid = new JsGrid();
    var sys: SystemTools = new SystemTools();
    var ProjectId: number;
    var _compCode: string;
    var _braCode: string;
    var _screenLang: string;
    export function InitalizeComponent() {
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

    function InitalizeControls() {
        txtProjectID = DocumentActions.GetElementById<HTMLInputElement>("txtProjectID");
        txtProj_Code = DocumentActions.GetElementById<HTMLInputElement>("txtProj_Code");
        butProj_Code = DocumentActions.GetElementById<HTMLButtonElement>("butProj_Code");
        txtProj_Desc = DocumentActions.GetElementById<HTMLInputElement>("txtProj_Desc");

        txtLaborClassId = DocumentActions.GetElementById<HTMLInputElement>("txtLaborClassId");
        txtLClass_CalssCode = DocumentActions.GetElementById<HTMLInputElement>("txtLClass_CalssCode");
        butLClass_CalssCode = DocumentActions.GetElementById<HTMLButtonElement>("butLClass_CalssCode");
        txtLClass_Desc = DocumentActions.GetElementById<HTMLInputElement>("txtLClass_Desc");

        txtProjectPhaseId = DocumentActions.GetElementById<HTMLInputElement>("txtProjectPhaseId");
        txtProjectPhaseCode = DocumentActions.GetElementById<HTMLInputElement>("txtProjectPhaseCode");
        butProjectPhaseCode = DocumentActions.GetElementById<HTMLButtonElement>("butProjectPhaseCode");
        txtPhase_Desc = DocumentActions.GetElementById<HTMLInputElement>("txtPhase_Desc");

        txtLaborCategoryId = DocumentActions.GetElementById<HTMLInputElement>("txtLaborCategoryId");
        txtCategCode = DocumentActions.GetElementById<HTMLInputElement>("txtCategCode");
        butCategCode = DocumentActions.GetElementById<HTMLButtonElement>("butCategCode");
        txtCat_Desc = DocumentActions.GetElementById<HTMLInputElement>("txtCat_Desc");

        txtScheduleId = DocumentActions.GetElementById<HTMLInputElement>("txtScheduleId");
        txtSchedule_Code = DocumentActions.GetElementById<HTMLInputElement>("txtSchedule_Code");
        butSchedule_Code = DocumentActions.GetElementById<HTMLButtonElement>("butSchedule_Code");
        txtSchedule_Desc = DocumentActions.GetElementById<HTMLInputElement>("txtSchedule_Desc");

        txtSiteEngineerId = DocumentActions.GetElementById<HTMLInputElement>("txtSiteEngineerId");
        txtSiteEngineer_Code = DocumentActions.GetElementById<HTMLInputElement>("txtSiteEngineer_Code");
        butSiteEngineer_Code = DocumentActions.GetElementById<HTMLButtonElement>("butSiteEngineer_Code");
        txtSiteEngineer_Desc = DocumentActions.GetElementById<HTMLInputElement>("txtSiteEngineer_Desc");

        showall = DocumentActions.GetElementById<HTMLInputElement>("showall");
        showcurrent = DocumentActions.GetElementById<HTMLInputElement>("showcurrent");
        ShowLeft = DocumentActions.GetElementById<HTMLInputElement>("ShowLeft");
        showdelayed = DocumentActions.GetElementById<HTMLInputElement>("showdelayed");
        butLoad = DocumentActions.GetElementById<HTMLButtonElement>("butLoad");

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
        
        sys.FindKey(Modules.LaborMonitoring, "butProj_Code", "CompCode = " + _compCode + " and BraCode = " + _braCode + " and Status = 1", () => {
            let _Id: number = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetProjectByID", ControllerName),
                data: { id: _Id },
                success: (d) => {
                    
                    let result = d.result as P_TR_EngProject;
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
        })
    }
    function Proj_Code_Changed() {

        var Pno = Number(txtProj_Code.value);
            Ajax.CallAsync({
                url: Url.Action("getProjectTableByno", "FindByNo"),
                data: { Pno: Pno },
                success: (d) => {
                    debugger
                    if (IsNullOrEmpty(d.result)) {
                      
                        ProjectId = 0;
                        txtProjectID.value = "";
                        txtProj_Code.value = "";
                        txtProj_Desc.value = "";
                        WorningMessage("الرمز خطأ، أعد المحاولة .... ", "Wrong Code , .. Retry .. ")
                        return;

                    }
                    let result = d.result as P_TR_EngProject;
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
        
        sys.FindKey(Modules.LaborMonitoring, "butLClass_CalssCode", "", () => {
            let _Id: number = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetLaborClassByID", ControllerName),
                data: { id: _Id },
                success: (d) => {
                    
                    let result = d.result as P_D_LaborClass;
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
        })
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
            WorningMessage("يجب ادخال رقم المشروع", "Project must be Selected")
        }

        else
        sys.FindKey(Modules.LaborMonitoring, "butProjectPhaseCode", "  ProjectID = " + txtProjectID.value, () => {
            let _Id: number = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetProjectPhaseByID", ControllerName),
                data: { id: _Id },
                success: (d) => {
                    
                    let result = d.result as P_TR_EngProjectPhase;
                    txtProjectPhaseId.value = result.ProjectPhaseId.toString();
                    txtProjectPhaseCode.value = result.ProjectPhaseCode;
                    if (ClientSharedWork.Session.ScreenLanguage == "ar") {
                        txtPhase_Desc.value = result.DescA;
                    }
                    else {
                        txtPhase_Desc.value = result.DescL
                    }

                }
            });
        })
    }
    function ProjectPhaseCode_Changed() {
        if (txtProjectID.value == "" || txtProjectID.value == " ") {
            WorningMessage("يجب ادخال رقم المشروع", "Project must be Selected")
        }

        else {
            debugger
            var PhaseNo = (txtProjectPhaseCode.value);
            Ajax.CallAsync({
                url: Url.Action("getProjectPhasetableByno", "FindByNo"),
                data: { ProjectId: ProjectId, PhaseNo: PhaseNo },
                success: (d) => {

                    if (IsNullOrEmpty(d.result)) {
                        txtProjectPhaseId.value = "";
                        txtProjectPhaseCode.value = "";
                        txtPhase_Desc.value = "";
                        
                        WorningMessage("الرمز خطأ، أعد المحاولة .... ", "Wrong Code , .. Retry .. ")
                        return;

                    }
                    let result = d.result as P_TR_EngProjectPhase;
                    txtProjectPhaseId.value = result[0].ProjectPhaseId.toString();
                    txtProjectPhaseCode.value = result[0].ProjectPhaseCode;
                    if (ClientSharedWork.Session.ScreenLanguage == "ar") {
                        txtPhase_Desc.value = result[0].DescA;
                    }
                    else {
                        txtPhase_Desc.value = result[0].DescL
                    }

                }
            });

        }
    }

    function butCategCode_Click() {
        sys.FindKey(Modules.LaborMonitoring, "butCategCode", "CompCode = " + ClientSharedWork.Session.CompCode, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getLaborCategoryByID", ControllerName),
                data: { id: id },
                success: (d) => {
                    let laborCat = d.result as P_D_LaborCategory;
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
        var cond: string; 
        cond = "CompCode = " + _compCode + " and BraCode = " + _braCode  
        if (Number(txtProjectPhaseId.value) > 0)
            cond = cond + " and ProjectPhaseId = " +  txtProjectPhaseId.value
           
        sys.FindKey(Modules.LaborMonitoring, "butSchedule_Code", cond, () => {
            let _Id: number = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetEngScheduleByID", ControllerName),
                data: { id: _Id },
                success: (d) => {
                    
                    let workSchedule = d.result as P_TR_EngSchedule;
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
        })

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
                success: (d) => {

                    if (IsNullOrEmpty(d.result)) {
                        txtScheduleId.value = "";
                        txtSchedule_Code.value = "";
                        txtSchedule_Desc.value = "";
                        
                        WorningMessage("الرمز خطأ، أعد المحاولة .... ", "Wrong Code , .. Retry .. ")
                        return;

                    }
                    let workSchedule = d.result as P_TR_EngSchedule;
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
        
        sys.FindKey(Modules.LaborMonitoring, "butSiteEngineer_Code", " CompCode = " + _compCode + " and BraCode = " + _braCode + " and IsActive = 1", () => {
            let _Id: number = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetSiteEngineerByID", ControllerName),
                data: { id: _Id },
                success: (d) => {
                    
                    let SiteEng = d.result as P_D_SiteEngineer;
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
        })
    }
    function SiteEngineer_Code_Changed() {

        var code = txtSiteEngineer_Code.value;
        Ajax.CallAsync({
            url: Url.Action("getSiteEngineerByCode", "FindByNo"),
            data: { code: code },
            success: (d) => {
                if (IsNullOrEmpty(d.result)) {
                    txtSiteEngineerId.value = "";
                    txtSiteEngineer_Code.value = "";
                    txtSiteEngineer_Desc.value = "";
                    WorningMessage("الرمز خطأ، أعد المحاولة .... ", "Wrong Code , .. Retry .. ")
                    return;

                }
                let SiteEng = d.result as P_D_SiteEngineer;
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
        let stat: string;
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
            stat = "2"
        }
        
        GetEngMonitorScheduleLabour(Number(txtLaborClassId.value),
            Number(txtSiteEngineerId.value), Number(txtProjectID.value), Number(txtProjectPhaseId.value),
            Number(txtScheduleId.value), Number(txtLaborCategoryId.value), Number(stat));

        GetEngMonitorScheduleLabourClass(Number(txtLaborClassId.value),
            Number(txtSiteEngineerId.value), Number(txtProjectID.value), Number(txtProjectPhaseId.value),
            Number(txtScheduleId.value));
    }

    function GetEngMonitorScheduleLabour(Clas: Number, eng: Number, Proj: Number, phase: Number, sch: Number, cat: Number, stat: Number) {
        
        Ajax.CallAsync({
            url: Url.Action("GetEngMonitorScheduleLabour", ControllerName),
            data: { ClasId: Clas, engId: eng, ProjId: Proj, phaseId: phase, schId: sch, catId: cat, status: stat },
            success: (d) => {
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

    function GetEngMonitorScheduleLabourClass(Clas: Number, eng: Number, Proj: Number, phase: Number, sch: Number) {
        
        Ajax.CallAsync({
            url: Url.Action("GetEngMonitorScheduleLabourClass", ControllerName),
            data: { ClasId: Clas, engId: eng, ProjId: Proj, phaseId: phase, schId: sch },
            success: (d) => {
                
                LaborClassDataSource = d.result;
                GridLaborClass.DataSource = LaborClassDataSource;
                GridLaborClass.Bind();
            }
        });
    }

    function InitalizeGrid() {
        let res: any = GetResourceList("ResM_Materiallabor");
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
        
        let value: boolean = true;
        let newLabors: Array<PQ_GetEngWorkSchduleLabor> = new Array<PQ_GetEngWorkSchduleLabor>();
        switch (value) {
            case (showall.checked == true):
                GridLabor.DataSource = LaborDataSource;
                GridLabor.Bind();
                break;
            case (showcurrent.checked == true):
                
                newLabors = LaborDataSource.filter(x => x.Status == 0);
                GridLabor.DataSource = newLabors;
                GridLabor.Bind();
                break;
            case (showdelayed.checked == true):
                
                let todayDate = DateFormat(new Date().toString());
                newLabors = LaborDataSource.filter(x => x.Status == 0 && x.ExpLeaveDate < todayDate);
                GridLabor.DataSource = newLabors;
                GridLabor.Bind()
                break;
            case (ShowLeft.checked == true):
                
                newLabors = LaborDataSource.filter(x => x.Status == 1);
                GridLabor.DataSource = newLabors;
                GridLabor.Bind()
                break;
            default:
        }
    }
    // هنا ناقص الفيلتر
}