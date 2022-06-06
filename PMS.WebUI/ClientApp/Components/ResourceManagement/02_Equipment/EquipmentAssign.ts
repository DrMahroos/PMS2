$(document).ready(() => {
    EquipmentAssign.InitalizeComponent();
});

namespace EquipmentAssign {
    const ControllerName: string = "EquipmentAssign";
    var Master: PQ_GetResRequestEquipment = new PQ_GetResRequestEquipment();
    const GridInputClassName = "form-control gridIput";
    var columnWidth: string = "100px";
    const NumberColumnWidth = "50px";
    var MasterDetails: M_D_EquipAssign = new M_D_EquipAssign();

    var EquipDatasource: Array<PQ_GetResEquipAssign> = new Array<PQ_GetResEquipAssign>();
    var DetailsAssignHeaderEquip: PQ_GetResEquipAssign = new PQ_GetResEquipAssign();
    var Tbl_DetailEquip: Array<P_TR_EngScheduleEquip> = new Array<P_TR_EngScheduleEquip>();

    var ClassDatasource: Array<PQ_GetEngWorkSchduleEquipClass> = new Array<PQ_GetEngWorkSchduleEquipClass>();
    var FreeEquipDatasource: Array<PProc_ResGetFreeEquip_Result> = new Array<PProc_ResGetFreeEquip_Result>();

    var GridEquip: JsGrid = new JsGrid();
    var GridClass: JsGrid = new JsGrid();
    var GridFree: JsGrid = new JsGrid();
    var sys: SystemTools = new SystemTools();

    var txtRequestEquipmentId: HTMLInputElement;
    var txtScheduleId: HTMLInputElement;
    var txtPrj_ProjectCode: HTMLInputElement;
    var txtPrj_DescE: HTMLInputElement;
    var txtPhase_ProjectPhaseCode: HTMLInputElement;
    var txtPhase_DescE: HTMLInputElement;
    var txtStartDateTime: HTMLInputElement;
    var txtEndDateTime: HTMLInputElement;
    var txtStartTime: HTMLInputElement;
    var txtEndTime: HTMLInputElement;
    var txtSearchStartDateTime: HTMLInputElement;
    var txtSearchEndDateTime: HTMLInputElement;
    var txtSearchClass: HTMLInputElement;
    var txtSearchCode: HTMLInputElement;
    var btnSearchRequest: HTMLButtonElement;
    var btnSearchCode: HTMLButtonElement;
    var btnSearchClass: HTMLButtonElement;
    var btnLoad: HTMLButtonElement;

    var txtTrNo: HTMLInputElement;
    var txtWorkDescr: HTMLInputElement;

    var _compCode: string;
    var _braCode: string;
    var _screenLang: string;

    var EquipClassId: number;
    var EquipCategoryId: number;
    var EquimentID: number;
    var ScheduleId: number;
    var ScheduleEquipId: number;
    var currentDate: string;
    var PlaneDate: string;
    var _Status = [
        {
            Name_Ar: "داخل المشروع ",
            Name_En: "Assign",
            Id: 0
        },
        {
            Name_Ar: "غادر",
            Name_En: "Leave",
            Id: 1
        }
    ];

    export function InitalizeComponent() {
        SharedSession.CurrentPrivileges = GetPrivileges();
        SharedSession.CurrentEnvironment = GetSystemEnvironment();
        _compCode = SharedSession.CurrentEnvironment.CompCode;
        _braCode = SharedSession.CurrentEnvironment.BranchCode;
        _screenLang = SharedSession.CurrentEnvironment.ScreenLanguage;

        ControlsButtons.AddButton.disabled = true;
        ControlsButtons.EditButton.disabled = false;
        ControlsButtons.DeleteButton.disabled = true;
        ControlsButtons.PrintButton.disabled = false;

        InitalizeControls();
        InitalizeEvents();
        InitalizeGrid();

        NavigatorComponent.InitalizeComponent();
        ClientSharedWork.OnNavigate = Navigate;
        ControlsButtons.AddAction(Add);
        ControlsButtons.EditAction(Edit);
        ControlsButtons.SaveAction(() => {
            if (ClientSharedWork.CurrentMode == ScreenModes.Add)
                Insert();
            else if (ClientSharedWork.CurrentMode == ScreenModes.Edit)
                Update();
        });
        ControlsButtons.PrintAction(() => { PrintEquipmentAssign(); });
        $("#ImageEditorButton").on("click", () => {
            sys.ImgPopup(_compCode, _braCode, Modules.EquipmentRequest, Master.RequestEquipmentId.toString());
        });
    }

    function InitalizeControls() {
        txtRequestEquipmentId = DocumentActions.GetElementById<HTMLInputElement>("txtRequestEquipmentId");
        txtScheduleId = DocumentActions.GetElementById<HTMLInputElement>("txtScheduleId");
        txtPrj_ProjectCode = DocumentActions.GetElementById<HTMLInputElement>("txtPrj_ProjectCode");
        txtPrj_DescE = DocumentActions.GetElementById<HTMLInputElement>("txtPrj_DescE");
        txtPhase_ProjectPhaseCode = DocumentActions.GetElementById<HTMLInputElement>("txtPhase_ProjectPhaseCode");
        txtPhase_DescE = DocumentActions.GetElementById<HTMLInputElement>("txtPhase_DescE");
        txtStartDateTime = DocumentActions.GetElementById<HTMLInputElement>("txtStartDateTime");
        txtEndDateTime = DocumentActions.GetElementById<HTMLInputElement>("txtEndDateTime");
        txtStartTime = DocumentActions.GetElementById<HTMLInputElement>("txtStartTime");
        txtEndTime = DocumentActions.GetElementById<HTMLInputElement>("txtEndTime");
        txtSearchStartDateTime = DocumentActions.GetElementById<HTMLInputElement>("txtSearchStartDateTime");
        txtSearchEndDateTime = DocumentActions.GetElementById<HTMLInputElement>("txtSearchEndDateTime");
        txtSearchClass = DocumentActions.GetElementById<HTMLInputElement>("txtSearchClass");
        txtSearchCode = DocumentActions.GetElementById<HTMLInputElement>("txtSearchCode");
        btnSearchRequest = DocumentActions.GetElementById<HTMLButtonElement>("btnSearchRequest");
        btnSearchCode = DocumentActions.GetElementById<HTMLButtonElement>("btnSearchCode");
        btnSearchClass = DocumentActions.GetElementById<HTMLButtonElement>("btnSearchClass");
        btnLoad = DocumentActions.GetElementById<HTMLButtonElement>("btnLoad");
        txtTrNo = DocumentActions.GetElementById<HTMLInputElement>("txtTrNo");
        txtWorkDescr = DocumentActions.GetElementById<HTMLInputElement>("txtWorkDescr");
    }

    function InitalizeEvents() {
        btnSearchRequest.onclick = btnSearchRequest_Clicked;
        btnSearchClass.onclick = btnSearchClass_Click;
        btnSearchCode.onclick = btnSearchCode_Click;
        btnLoad.onclick = btnLoad_Click;
    }

    function InitalizeGrid() {
        let res: any = GetResourceList("ResM_Materiallabor");
        GridEquip.ElementName = "GridEquip";
        GridEquip.Inserting = SharedSession.CurrentPrivileges.AddNew;
        GridEquip.Editing = SharedSession.CurrentPrivileges.EDIT;
        GridEquip.ConfirmDeleteing = SharedSession.CurrentPrivileges.Remove;
        GridEquip.InsertionMode = JsGridInsertionMode.Binding;
        GridEquip.Columns = [
            {
                title: res.ResM_Materiallabor_Equipcode, name: "Equipcode", width: "9.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "Equipcode", " ");
                    txt.id = "h_Equipcode";
                    txt.disabled = true;
                    return HeaderTemplate("ResM_Materiallabor_Equipcode", txt);
                }
            },
            {
                title: res.ResM_Materiallabor_name, visible: ClientSharedWork.Session.ScreenLanguage == "ar", name: "DescA", width: "19.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "DescA", " ");
                    txt.id = "h_DescA";
                    txt.disabled = true;
                    return HeaderTemplate("ResM_Materiallabor_name", txt);
                }
            },
            {
                title: res.ResM_Materiallabor_name, visible: ClientSharedWork.Session.ScreenLanguage == "en", name: "DescE", width: "19.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "DescE", " ");
                    txt.id = "h_DescE";
                    txt.disabled = true;
                    return HeaderTemplate("ResM_Materiallabor_name", txt);
                }
            },
            {
                title: res.ResM_Materiallabor_class, name: "ClassCode", width: "9.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "ClassCode", " ");
                    txt.id = "h_ClassCode";
                    txt.disabled = true;
                    return HeaderTemplate("ResM_Materiallabor_class", txt);
                }
            },
            {
                title: res.ResM_Materiallabor_assigndate, name: "AssigneDate", width: "11.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("datetime-local", GridInputClassName, " ", " ", "AssigneDate", " ");
                    txt.id = "h_AssigneDate";
                    txt.disabled = false;
                    txt.onchange = (e) => {

                        //if ($('#h_AssigneDate').val() < currentDate) {
                        //    $('#h_AssigneDate').val(currentDate);
                        //}
                    }
                    return HeaderTemplate("ResM_Materiallabor_assigndate", txt);
                }
            },
            {
                title: res.ResM_Materiallabor_planeleavedate, name: "ExpLeaveDate", width: "11.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("datetime-local", GridInputClassName, " ", " ", "ExpLeaveDate", " ");
                    txt.id = "h_ExpLeaveDate";
                    txt.disabled = false;
                    txt.onchange = (e) => {
                        //if ($('#h_ExpLeaveDate').val() > PlaneDate) {
                        //    $('#h_ExpLeaveDate').val(PlaneDate);
                        //}
                    }
                    return HeaderTemplate("ResM_Materiallabor_planeleavedate", txt);
                }
            },
            {
                title: res.ResM_Materiallabor_leavedate, name: "LeaveDate", width: "11.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("datetime-local", GridInputClassName, " ", " ", "LeaveDate", " ");
                    txt.id = "h_LeaveDate";
                    txt.disabled = true;
                    return HeaderTemplate("ResM_Materiallabor_leavedate", txt);
                }
            },
            {
                title: res.ResM_Materiallabor_status, name: "Status", width: "9.5%",
                headerTemplate: (): HTMLElement => {
                    //let txt = CreateElement("label", GridInputClassName, " ", " ", "Status", " ");
                    let txt = CreateDropdownList(_Status, "Name_Ar", "Name_En", "Id", false);
                    txt.id = "h_Status";
                    txt.onchange = function (e) {
                        //ChangeDropDownStatus
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }

                        let _Status = $("#h_Status").val();
                        if (_Status == 0) {
                            $("#h_AssigneDate").removeAttr("disabled");
                            $("#h_ExpLeaveDate").removeAttr("disabled");
                            $("#h_LeaveDate").attr("disabled", "disabled");
                        } else if (_Status == 1) {
                            $("#h_AssigneDate").attr("disabled", "disabled");
                            $("#h_ExpLeaveDate").attr("disabled", "disabled");
                            $("#h_LeaveDate").removeAttr("disabled");
                            debugger
                            $("#h_LeaveDate").val(DateTimeFormat(Master.EndDateTime));
                        }
                    }
                    return HeaderTemplateNew(res.ResM_Materiallabor_status, txt);
                },
                itemTemplate: (s: string, item: PQ_GetResEquipAssign): HTMLSelectElement => {
                    let txt = CreateDropdownList(_Status, "Name_Ar", "Name_En", "Id", false);
                    txt.disabled = true;
                    txt.id = "lblStatus"
                    txt.name = "Status";
                    debugger;
                    txt.value = item.Status.toString();
                    return txt;
                }
            },
            {
                title: "#", name: "btnAddItem", visible: true, width: NumberColumnWidth,
                headerTemplate: (): HTMLElement => {
                    let btn: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btn.className = TransparentButton;
                    btn.type = "button";
                    btn.style.fontSize = "25px";
                    btn.style.color = "forestgreen";
                    btn.innerHTML = "<span class='glyphicon glyphicon-plus'></span>";
                    btn.id = "btnAddItemActivityGrid";
                    btn.onclick = (e) => {
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }

                        AddItemInActivityGrid();
                    };
                    return btn;
                },
                itemTemplate: (s: string, item: PQ_GetResEquipAssign): HTMLButtonElement => {
                    let btn: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btn.innerHTML = "<i class='glyphicon glyphicon-remove'></i>";
                    btn.className = TransparentButton;
                    btn.type = "button";
                    btn.style.fontSize = "24px";
                    btn.style.color = "red";
                    btn.name = EquipDatasource.indexOf(item).toString();
                    btn.onclick = (e) => {
                        //remove
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }
                        debugger
                        let index = Number((e.currentTarget as HTMLButtonElement).name);
                        let EquipId = EquipDatasource[index].EquimentID;
                        UpdateEquipProjectPhase(EquipId, null, null);
                        EquipDatasource.splice(index, 1);
                        BindDataGridEquip();
                    };
                    return btn;
                }
            }
            ,
            {
                css: JsGridHeaderCenter,
                width: NumberColumnWidth,
                itemTemplate: (s: string, item: PQ_GetResEquipAssign): HTMLButtonElement => {
                    let btn: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btn.innerHTML = "<i class='glyphicon glyphicon-pencil'></i>";
                    btn.className = TransparentButton;
                    btn.style.fontSize = "20px";
                    btn.type = "button";
                    btn.style.color = "forestgreen";
                    btn.name = EquipDatasource.indexOf(item).toString();
                    btn.onclick = (e) => {
                        //EDIT
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }
                        debugger;
                        if (item.Status == 1) {
                            return;
                        }
                        currentDate = DateTimeFormat(item.AssigneDate);
                        PlaneDate = DateTimeFormat(item.ExpLeaveDate);
                        EquimentID = item.EquimentID;
                        ScheduleId = item.ScheduleId;
                        ScheduleEquipId = item.ScheduleId;

                        let index = Number((e.currentTarget as HTMLButtonElement).name);
                        EquipDatasource.splice(index, 1);
                        BindDataGridEquip();
                        FillInputText("h_Equipcode", item.Equipcode);
                        FillInputText("h_DescA", item.DescA);
                        FillInputText("h_DescE", item.DescE);
                        $('#h_AssigneDate').val(DateTimeFormat(item.AssigneDate));
                        FillInputText("h_ExpLeaveDate", DateTimeFormat(item.ExpLeaveDate));
                        FillInputText("h_ClassCode", item.ClassCode);
                        FillInputText("h_LeaveDate", DateTimeFormat(item.LeaveDate));
                        $("#h_Status").val(item.Status.toString())
                    };
                    return btn;
                }
            }
        ];
        GridEquip.DataSource = EquipDatasource;
        GridEquip.Bind();

        GridClass.ElementName = "GridClass";
        GridClass.Inserting = SharedSession.CurrentPrivileges.AddNew;
        GridClass.Editing = SharedSession.CurrentPrivileges.EDIT;
        GridClass.ConfirmDeleteing = SharedSession.CurrentPrivileges.Remove;
        GridClass.InsertionMode = JsGridInsertionMode.Binding;
        GridClass.Columns = [
            { title: res.ResM_Materiallabor_Equipclass, name: "Class_ClassCode", type: "text", width: "7.5%" },
            { title: res.ResM_Materiallabor_classname, name: "Class_DescA", visible: ClientSharedWork.Session.ScreenLanguage == "ar", type: "text", width: "7.5%" },
            { title: res.ResM_Materiallabor_classname, name: "Class_DescE", visible: ClientSharedWork.Session.ScreenLanguage == "en", type: "text", width: "7.5%" },
            { title: res.ResM_Materiallabor_requiredhrs, name: "HourCost", type: "text", width: "7.5%" },
            { title: res.ResM_Materiallabor_requiredequip, name: "RequiredNo", type: "text", width: "7.5%" },
            { title: res.ResM_Materiallabor_assigned, name: "AssignedEq", type: "text", width: "7.5%" },
            { title: res.ResM_Materiallabor_remain, name: "RemainEq", type: "text", width: "7.5%" },
            { type: "control", width: "3%" }
        ];
        GridClass.DataSource = ClassDatasource;
        GridClass.Bind();

        GridFree.ElementName = "GridFree";
        GridFree.Inserting = SharedSession.CurrentPrivileges.AddNew;
        GridFree.Editing = SharedSession.CurrentPrivileges.EDIT;
        GridFree.ConfirmDeleteing = SharedSession.CurrentPrivileges.Remove;
        GridFree.OnRowDoubleClicked = FreeEquipRowDoubleClicked;
        GridFree.InsertionMode = JsGridInsertionMode.Binding;
        GridFree.Columns = [
            { title: res.ResM_Materiallabor_classcode, name: "ClassCode", type: "label", width: "7.5%" },
            //{ title: res.ResM_Materiallabor_categorycode, name: "CategCode", type: "label", width: "7.5%" },Not Found In Data Source
            { title: res.ResM_Materiallabor_Equipcode, name: "EquipCode", type: "label", width: "7.5%" },
            { title: res.ResM_Materiallabor_Equipname, name: "DescA", visible: _screenLang == "ar", type: "label", width: "7.5%" },
            { title: res.ResM_Materiallabor_Equipname, name: "DescE", visible: _screenLang == "en", type: "label", width: "7.5%" },
            { title: res.ResM_Materiallabor_planeleavedate, name: "FreeDate", type: "label", width: "7.5%" }
        ];
        GridFree.DataSource = FreeEquipDatasource;
        GridFree.Bind();
    }

    function Navigate() {
        Ajax.CallAsync({
            url: Url.Action("GetByIndex", ControllerName),
            success: (d) => {
                Master = d.result as PQ_GetResRequestEquipment;
                Display();
            }
        })
    }

    function Display() {
        debugger;
        DocumentActions.RenderFromModel(Master);
        txtSearchStartDateTime.value = DateTimeFormat(Master.StartDateTime);
        txtSearchEndDateTime.value = DateTimeFormat(Master.EndDateTime);

        //txtSearchStartDateTime.value = DateTimeFormat(txtStartDateTime.value);
        //txtSearchEndDateTime.value = DateTimeFormat(txtEndDateTime.value);
        GetSchdualeNum(Master.ScheduleId);
        try {
            txtStartTime.value = TimeFormat(Master.StartDateTime);
            txtEndTime.value = TimeFormat(Master.EndDateTime);
        } catch (e) {

        }
        GetEquipList(Number(Master.ScheduleId));
        GetClassesList(Number(Master.ScheduleId));
    }

    function GetSchdualeNum(schudleId: number) {
        debugger;
        let res: PQ_GetEngWorkSchdule = Ajax.Call<PQ_GetEngWorkSchdule>({ url: Url.Action("GetSchdualeNum", ControllerName), data: { schduleId: schudleId } });
        txtWorkDescr.value = res.TrNo.toString();

    }
    function Add() {

    }

    function Edit() {

    }

    function Assign() {

        //AssignMaster
        DocumentActions.AssignToModel<PQ_GetResRequestEquipment>(Master);
        MasterDetails.P_TR_ResRequestEquipment = Master as PQ_GetResRequestEquipment;
        MasterDetails.P_TR_ResRequestEquipment.RequestEquipmentId = Master.RequestEquipmentId;

        //AssignDetails
        MasterDetails.P_TR_EngScheduleEquip = EquipDatasource as Array<PQ_GetResEquipAssign>;
        for (var equip of EquipDatasource) {
            equip.ScheduleId = Master.ScheduleId;
            //equip.Status =
            Tbl_DetailEquip.push(equip);
        }
    }

    function Insert() {

    }

    function Update() {
        Assign();
        Master.CompCode = Number(_compCode);

        Ajax.CallAsync({
            url: Url.Action("Update", ControllerName),
            data: { JsonData: JSON.stringify(MasterDetails) },
            success: (d) => {

                let result = d.result as ResponseResult;
                if (result.ResponseState == true) {
                    ClientSharedWork.SwitchModes(ScreenModes.Query);
                    let msg: string = ReturnMsg("تم التعديل بنجاح  ", "Data Updated Successfuly. ");
                    MessageBox.Show(msg, "Update", () => {
                        let _Index = GetIndexByUseId(result.ResponseData, "PQ_GetResRequestEquipment", "RequestEquipmentId", " CompCode = " + _compCode + " and BraCode = " + _braCode);
                        NavigateToSearchResultKey(Number(_Index), Navigate);
                    });
                }
            }
        })
    }

    function PrintEquipmentAssign() {
        Ajax.CallAsync({
            url: Url.Action("PrintEquipmentAssign", "PrintTransaction"),
            data: { TrID: Number(Master.RequestEquipmentId) },
            success: (d) => {
                let url = d.result as string;
                window.open(url, "_blank");
            }
        });

    }

    function btnSearchRequest_Clicked() {
        sys.FindKey(Modules.EquipmentAssign, "btnSearchRequest", "CompCode = " + _compCode + " and BraCode = " + _braCode, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetEquipmentRequest", ControllerName),
                data: { id: id },
                success: (d) => {
                    Master = d.result as PQ_GetResRequestEquipment;
                    let Index = GetIndexByUseId(Master.RequestEquipmentId, "PQ_GetResRequestEquipment", "RequestEquipmentId", " CompCode = " + _compCode + " and BraCode = " + _braCode);
                    NavigateToSearchResultKey(Number(Index), Navigate);
                }
            });
        });
    }

    function btnSearchClass_Click() {
        sys.FindKey(Modules.EquipmentAssign, "btnSearchClass", "CompCode = " + _compCode, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetEquipClass", ControllerName),
                data: { id: id },
                success: (d) => {
                    let EquipClass: P_D_EquipmentClass = d.result as P_D_EquipmentClass;
                    EquipClassId = EquipClass.EquipClassId;
                    txtSearchClass.value = EquipClass.ClassCode;
                }
            });
        });
    }

    function btnSearchCode_Click() {
        sys.FindKey(Modules.LaborAssign, "btnSearchCode", "CompCode = " + _compCode, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetLaborCategory", ControllerName),
                data: { id: id },
                success: (d) => {
                    let laborategory: P_D_LaborCategory = d.result as P_D_LaborCategory;
                    EquipCategoryId = laborategory.LaborCategoryId;
                    txtSearchCode.value = laborategory.CategCode;
                }
            });
        });
    }

    function btnLoad_Click() {
        Ajax.CallAsync({
            url: Url.Action("PProc_ResGetFreeEquip", ControllerName),
            data: {
                bra: _compCode, FromDate: txtSearchStartDateTime.value,
                ToDate: txtSearchEndDateTime.value, Classid: EquipClassId, Catid: EquipCategoryId
            },
            success: (d) => {

                FreeEquipDatasource = d.result as Array<PProc_ResGetFreeEquip_Result>;
                for (var itm of FreeEquipDatasource) {
                    itm.FreeDate = DateTimeFormatWithoutT(itm.FreeDate);
                }
                GridFree.DataSource = FreeEquipDatasource;
                GridFree.Bind();
            }
        })
    }

    function GetEquipList(id: number) {
        Ajax.CallAsync({
            url: Url.Action("GetEquipList", ControllerName),
            data: { id: id },
            success: (d) => {
                EquipDatasource = d.result as Array<PQ_GetResEquipAssign>;
                GridEquip.DataSource = EquipDatasource;
                for (var itm of EquipDatasource) {
                    itm.AssigneDate = DateFormat(itm.AssigneDate);
                    itm.ExpLeaveDate = DateFormat(itm.ExpLeaveDate);
                    if (itm.LeaveDate != null) {
                        itm.LeaveDate = DateFormat(itm.LeaveDate);
                    }
                    //itm.LeaveDate != null ? DateFormat(itm.LeaveDate) : null;
                }
                GridEquip.Bind();
            }
        });
    }

    function GetClassesList(id: number) {
        Ajax.CallAsync({
            url: Url.Action("GetClassesList", ControllerName),
            data: { id: id },
            success: (d) => {

                ClassDatasource = d.result as Array<PQ_GetEngWorkSchduleEquipClass>;
                GridClass.DataSource = ClassDatasource;
                GridClass.Bind();
            }
        });
    }

    function FreeEquipRowDoubleClicked() {
        debugger;
        let Equip: PQ_GetResEquipAssign = new PQ_GetResEquipAssign();
        let currenEquip: PProc_ResGetFreeEquip_Result = GridFree.SelectedItem as PProc_ResGetFreeEquip_Result;
        let index = GridFree.SelectedIndex;
        Equip.ClassCode = currenEquip.ClassCode;
        Equip.Class_DescA = currenEquip.class_descA;
        Equip.Class_DescE = currenEquip.Class_DescE;
        Equip.DescA = currenEquip.DescA;
        Equip.DescE = currenEquip.DescE;
        Equip.Status = 0;//currenEquip.IsActive == true ? 1 : 0;
        Equip.EquimentID = currenEquip.EquimentID;
        Equip.Equipcode = currenEquip.EquipCode;
        Equip.ScheduleId = Master.ScheduleId;
        Equip.LeaveDate = null;
        Equip.HourCost = currenEquip.HourCost;

        //Equip.AssigneDate = currenEquip.FreeDate;
        //Equip.ExpLeaveDate = DateFormat(Master.EndDateTime);
        Equip.AssigneDate = DateTimeFormatWithoutT($("#txtSearchStartDateTime").val());
        Equip.ExpLeaveDate = DateTimeFormatWithoutT($("#txtSearchEndDateTime").val());

        EquipDatasource.push(Equip);
        GridEquip.DataSource = EquipDatasource;
        GridEquip.Bind();
        FreeEquipDatasource.splice(index, 1);
        GridFree.DataSource = FreeEquipDatasource;
        GridFree.Bind();
        // Update P_D_Labor
        let projectid: number = Master.ProjectID;
        let ProjectPhaseId: number = Master.ProjectPhaseId;
        UpdateEquipProjectPhase(currenEquip.EquimentID, projectid, ProjectPhaseId);
    }

    function BindDataGridEquip() {
        GridEquip.DataSource = EquipDatasource;
        GridEquip.Bind();
    }

    function FillInputText(_TextID: string, _Data: string) {
        $("#" + _TextID).text(_Data);
        $("#" + _TextID).val(_Data);
    }

    function AddItemInActivityGrid() {

        DetailsAssignHeaderEquip = new PQ_GetResEquipAssign();
        DetailsAssignHeaderEquip.EquimentID = EquimentID;
        DetailsAssignHeaderEquip.ScheduleId = ScheduleId;
        DetailsAssignHeaderEquip.ScheduleEquipId = ScheduleEquipId;
        DetailsAssignHeaderEquip.Equipcode = $("#h_Equipcode").val();
        DetailsAssignHeaderEquip.DescA = $("#h_DescA").val();
        DetailsAssignHeaderEquip.DescE = $("#h_DescE").val();
        DetailsAssignHeaderEquip.ClassCode = $("#h_ClassCode").val();
        DetailsAssignHeaderEquip.Status = Number($("#h_Status").val());

        if (DetailsAssignHeaderEquip.Status == 0) {
            DetailsAssignHeaderEquip.AssigneDate = DateTimeFormatWithoutT($("#h_AssigneDate").val());
            DetailsAssignHeaderEquip.ExpLeaveDate = DateTimeFormatWithoutT($("#h_ExpLeaveDate").val());
            DetailsAssignHeaderEquip.LeaveDate = null;
        } else {
            DetailsAssignHeaderEquip.AssigneDate = DateTimeFormatWithoutT($("#h_AssigneDate").val());
            DetailsAssignHeaderEquip.ExpLeaveDate = DateTimeFormatWithoutT($("#h_ExpLeaveDate").val());

            if ($("#h_LeaveDate").val() == "") {
                DetailsAssignHeaderEquip.LeaveDate = null;
            } else {
                DetailsAssignHeaderEquip.LeaveDate = DateTimeFormatWithoutT($("#h_LeaveDate").val());
            }
        }
        //|| DateTimeFormatWithoutT($("#h_LeaveDate").val()) == "Invalid Date"
        debugger
        if (DetailsAssignHeaderEquip.Status == 1 && (DetailsAssignHeaderEquip.LeaveDate == null || DetailsAssignHeaderEquip.LeaveDate == "")) {
            WorningMessage("الرجاء اضافة تاريخ المغادره في حالة ان الحاله غادر", "Please enter leave date in case status leave");
            return;
        }

        debugger
        let _AssigneDate = DateFormat($("#h_AssigneDate").val());
        let _ExpLeaveDate = DateFormat($("#h_ExpLeaveDate").val());
        let _AssigneDateTime = TimeFormat($("#h_AssigneDate").val());
        let _ExpLeaveDateTime = TimeFormat($("#h_ExpLeaveDate").val());

        if (_AssigneDate < DateFormat(Master.StartDateTime) || (_AssigneDate == DateFormat(Master.StartDateTime) && _AssigneDateTime < TimeFormat(Master.StartDateTime))) {
            WorningMessage(" يجب ان يكون التاريخ بين الفتره من تاريخ الي تاريخ", "must be date between from date to date");
            return;
        }

        if (_ExpLeaveDate > DateFormat(Master.EndDateTime) || (_ExpLeaveDate == DateFormat(Master.EndDateTime) && _ExpLeaveDateTime > TimeFormat(Master.EndDateTime))) {
            WorningMessage(" يجب ان يكون التاريخ بين الفتره من تاريخ الي تاريخ", "must be date between from date to date");
            return;
        }

        if (Number($("#h_Status").val()) == 1) {
            UpdateEquipProjectPhase(DetailsAssignHeaderEquip.EquimentID, null, null);
        }

        EquipDatasource.push(DetailsAssignHeaderEquip);
        GridEquip.DataSource = EquipDatasource;
        GridEquip.Bind();
    }

    function changeStatusAndLeaveDate(currEquip: PQ_GetResEquipAssign, index: number) {
        EquipDatasource.splice(index, 1);
        GridEquip.Bind();
        currEquip.Status = 1;
        currEquip.LeaveDate = DateFormat(new Date().toString());
        EquipDatasource.push(currEquip);
        GridEquip.DataSource = EquipDatasource;
        GridEquip.Bind();
    }

    function UpdateEquipProjectPhase(EquipId: number, projectId: number, phaseId: number) {
        Ajax.CallAsync({
            url: Url.Action("UpdateEquipProjectPhase", ControllerName),
            data: { id: EquipId, projectid: projectId, ProjectPhaseId: phaseId },
            success: (d) => {

            }
        })
    }

}