$(document).ready(() => {
    EquipmentMonitoring.InitalizeComponent();
});

namespace EquipmentMonitoring {
    var DataSource: Array<PProc_EngMonitorScheduleEquip_Result> = new Array<PProc_EngMonitorScheduleEquip_Result>();
    var DataSourceEquipClasses: Array<PQ_GetEngWorkSchduleEquipClass> = new Array<PQ_GetEngWorkSchduleEquipClass>();
    var GridParent: JsGrid = new JsGrid();
    var GridChild: JsGrid = new JsGrid();
    var sys: SystemTools = new SystemTools();
    const ControllerName: string = "EquipmentMonitoring";
    var txtprojectCode: HTMLInputElement;
    var txtprojectName: HTMLInputElement;
    var txtphaseCode: HTMLInputElement;
    var txtphaseName: HTMLInputElement;
    var txtschaduleCode: HTMLInputElement;
    var txtschduleDesc: HTMLInputElement;
    var txtengCode: HTMLInputElement;
    var txtengName: HTMLInputElement;
    var txtclassCode: HTMLInputElement;
    var txtclassDesc: HTMLInputElement;
    var txtcatCode: HTMLInputElement;
    var txtcatDesc: HTMLInputElement;
    var ShowAll: HTMLInputElement;
    var ShowCurrent: HTMLInputElement;
    var Showdelayed: HTMLInputElement;
    var ShowLeft: HTMLInputElement;
    var btnSearchProject: HTMLButtonElement;
    var btnSearchPhase: HTMLButtonElement;
    var btnSearchSchdule: HTMLButtonElement;
    var btnSearchEng: HTMLButtonElement;
    var btnSearchClass: HTMLButtonElement;
    var btnSearchCat: HTMLButtonElement;
    var btnLoad: HTMLButtonElement;

    var _compCode: string;
    var _braCode: string;
    var _screenLang: string;

    var ProjectId: number;
    var ProjectPhaseId: number;
    var scheduleId: number;
    var siteEngineerId: number;
    var equipClassId: number;
    var CategoryId: number;
    export function InitalizeComponent() {
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

    function InitalizeControls() {
        txtprojectCode = DocumentActions.GetElementById<HTMLInputElement>("txtprojectCode");
        txtprojectName = DocumentActions.GetElementById<HTMLInputElement>("txtprojectName");
        txtphaseCode = DocumentActions.GetElementById<HTMLInputElement>("txtphaseCode");
        txtphaseName = DocumentActions.GetElementById<HTMLInputElement>("txtphaseName");
        txtschaduleCode = DocumentActions.GetElementById<HTMLInputElement>("txtschaduleCode");
        txtschduleDesc = DocumentActions.GetElementById<HTMLInputElement>("txtschduleDesc");
        txtengCode = DocumentActions.GetElementById<HTMLInputElement>("txtengCode");
        txtengName = DocumentActions.GetElementById<HTMLInputElement>("txtengName");
        txtclassCode = DocumentActions.GetElementById<HTMLInputElement>("txtclassCode");
        txtclassDesc = DocumentActions.GetElementById<HTMLInputElement>("txtclassDesc");
        txtcatCode = DocumentActions.GetElementById<HTMLInputElement>("txtcatCode");
        txtcatDesc = DocumentActions.GetElementById<HTMLInputElement>("txtcatDesc");
        ShowAll = DocumentActions.GetElementById<HTMLInputElement>("ShowAll");
        ShowCurrent = DocumentActions.GetElementById<HTMLInputElement>("ShowCurrent");
        Showdelayed = DocumentActions.GetElementById<HTMLInputElement>("Showdelayed");
        ShowLeft = DocumentActions.GetElementById<HTMLInputElement>("ShowLeft");
        btnSearchProject = DocumentActions.GetElementById<HTMLButtonElement>("btnSearchProject");
        btnSearchPhase = DocumentActions.GetElementById<HTMLButtonElement>("btnSearchPhase");
        btnSearchSchdule = DocumentActions.GetElementById<HTMLButtonElement>("btnSearchSchdule");
        btnSearchEng = DocumentActions.GetElementById<HTMLButtonElement>("btnSearchEng");
        btnSearchClass = DocumentActions.GetElementById<HTMLButtonElement>("btnSearchClass");
        btnSearchCat = DocumentActions.GetElementById<HTMLButtonElement>("btnSearchCat");
        btnLoad = DocumentActions.GetElementById<HTMLButtonElement>("btnLoad");
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
        let res: any = GetResourceList("ResM_Materiallabor");
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
        sys.FindKey(Modules.EquipmentMonitoring, "btnSearchProject", "CompCode = " + _compCode + " and BraCode = " + _braCode + " and Status = 1", () => {
            debugger
            let _Id: number = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetProjectByID", ControllerName),
                data: { id: _Id },
                success: (d) => {
                    let result = d.result as P_TR_EngProject;
                    ProjectId = result.ProjectID;
                    txtprojectCode.value = result.ProjectCode;
                    txtprojectName.value = _screenLang == "ar" ? result.DescA : result.DescL;
                }
            });
        })
    }

    function btnSearchPhase_Cliked() {
        if (txtprojectCode.value == "" || txtprojectCode.value== " ") {
            WorningMessage("يجب ادخال رقم المشروع", "Project must be Selected")
        }
        else
        sys.FindKey(Modules.EquipmentMonitoring, "btnSearchPhase", " Status = 1 and ProjectID = " + ProjectId, () => {
            let _Id: number = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetProjectPhaseByID", ControllerName),
                data: { id: _Id },
                success: (d) => {
                    
                    let result = d.result as P_TR_EngProjectPhase;
                    ProjectPhaseId = result.ProjectPhaseId;
                    txtphaseCode.value = result.ProjectPhaseCode;
                    if (ClientSharedWork.Session.ScreenLanguage == "ar") {
                        txtphaseName.value = result.DescA;
                    }
                    else {
                        txtphaseName.value = result.DescL
                    }
                }
            });
        })
    }

    function btnSearchSchdule_Cliked() {
        
        sys.FindKey(Modules.EquipmentMonitoring, "btnSearchSchdule", "", () => {
            let _Id: number = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetEngScheduleByID", ControllerName),
                data: { id: _Id },
                success: (d) => {
                    
                    let workSchedule = d.result as P_TR_EngSchedule;
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
        })
    }

    function btnSearchEng_Cliked() {
        
        sys.FindKey(Modules.EquipmentMonitoring, "btnSearchEng", " CompCode = " + _compCode + " and BraCode = " + _braCode + " and IsActive = 1", () => {
            let _Id: number = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetSiteEngineerByID", ControllerName),
                data: { id: _Id },
                success: (d) => {
                    
                    let SiteEng = d.result as P_D_SiteEngineer;
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
        })
    }


    function btnSearchClass_Cliked() {
        sys.FindKey(Modules.EquipmentMonitoring, "btnSearchClass", "CompCode = " + _compCode, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetEquipmentClass", ControllerName),
                data: { id: id },
                success: (d) => {
                    
                    let equip = d.result as P_D_EquipmentClass;
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
        sys.FindKey(Modules.EquipmentMonitoring, "btnSearchCat", "CompCode = " + ClientSharedWork.Session.CompCode, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getLaborCategoryByID", ControllerName),
                data: { id: id },
                success: (d) => {
                    let laborCat = d.result as P_D_LaborCategory;
                    CategoryId = laborCat.LaborCategoryId;
                    txtcatCode.value = laborCat.CategCode.toString();
                    txtcatDesc.value = _screenLang == "ar" ? laborCat.DescA : laborCat.DescE;
                }
            });
        });
    }

    function btnLoad_Cliked() {
        debugger
        if (IsNullOrEmpty(txtprojectCode.value) && IsNullOrEmpty(txtprojectName.value)) {
            WorningMessage("يجب اختيار مشروع على الاقل", "Project at least must be selected ");
            return;
        }
        // make 0:Current , 1 : left  , 2 for all
        let stat: string;
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
            stat = "2"
        }
        
        GetEngMonitorScheduleEquip(equipClassId, siteEngineerId, ProjectId, ProjectPhaseId, scheduleId, Number(stat));
        //GetEngMonitorScheduleEquipClass(equipClassId, siteEngineerId, ProjectId, ProjectPhaseId, scheduleId);
    }

    function GetEngMonitorScheduleEquip(Clas: number, eng: number, Proj: number, phase: number, sch: number, stat: number) {
        
        Ajax.CallAsync({
            url: Url.Action("GetEngMonitorScheduleEquip", ControllerName),
            data: { ClasId: Clas, engId: eng, ProjId: Proj, phaseId: phase, schId: sch, status: stat },
            success: (d) => {
                
                DataSource = d.result as Array<PProc_EngMonitorScheduleEquip_Result>;

                for (var i = 0; i < DataSource.length; i++) {
                    DataSource[i].assignedate = DateFormat(DataSource[i].assignedate);
                    DataSource[i].expleavedate = DateFormat(DataSource[i].expleavedate);
                    DataSource[i].leavedate = DataSource[i].leavedate != null ? DateFormat(DataSource[i].leavedate) : DataSource[i].leavedate = null;
                }
                debugger
                GridParent.DataSource = DataSource;
                GridParent.Bind();
            }
        });

    }

    function GetEngMonitorScheduleEquipClass(Clas: number, eng: number, Proj: number, phase: number, sch: number) {
        

        Ajax.CallAsync({
            url: Url.Action("GetEngMonitorScheduleEquipClass", ControllerName),
            data: { ClasId: Clas, engId: eng, ProjId: Proj, phaseId: phase, schId: sch },
            success: (d) => {
                
                DataSourceEquipClasses = d.result;
                GridChild.DataSource = DataSourceEquipClasses;
                GridChild.Bind();
            }
        });
    }

    function Filter() {
        
        let value: boolean = true;
        let newEquipment: Array<PProc_EngMonitorScheduleEquip_Result> = new Array<PProc_EngMonitorScheduleEquip_Result>();
        switch (value) {
            case (ShowAll.checked == true):
                GridParent.DataSource = DataSource;
                GridParent.Bind();
                break;
            case (ShowCurrent.checked == true):
                
                newEquipment = DataSource.filter(x => x.status == 0);
                GridParent.DataSource = newEquipment;
                GridParent.Bind();
                break;
            case (Showdelayed.checked == true):
                
                let todayDate = DateFormat(new Date().toString());
                newEquipment = DataSource.filter(x => x.status == 0 && x.expleavedate < todayDate);
                GridParent.DataSource = newEquipment;
                GridParent.Bind()
                break;
            case (ShowLeft.checked == true):
                
                newEquipment = DataSource.filter(x => x.status == 1);
                GridParent.DataSource = newEquipment;
                GridParent.Bind()
                break;
            default:
        }
    }
}