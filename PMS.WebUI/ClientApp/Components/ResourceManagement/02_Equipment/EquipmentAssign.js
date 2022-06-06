$(document).ready(function () {
    EquipmentAssign.InitalizeComponent();
});
var EquipmentAssign;
(function (EquipmentAssign) {
    var ControllerName = "EquipmentAssign";
    var Master = new PQ_GetResRequestEquipment();
    var GridInputClassName = "form-control gridIput";
    var columnWidth = "100px";
    var NumberColumnWidth = "50px";
    var MasterDetails = new M_D_EquipAssign();
    var EquipDatasource = new Array();
    var DetailsAssignHeaderEquip = new PQ_GetResEquipAssign();
    var Tbl_DetailEquip = new Array();
    var ClassDatasource = new Array();
    var FreeEquipDatasource = new Array();
    var GridEquip = new JsGrid();
    var GridClass = new JsGrid();
    var GridFree = new JsGrid();
    var sys = new SystemTools();
    var txtRequestEquipmentId;
    var txtScheduleId;
    var txtPrj_ProjectCode;
    var txtPrj_DescE;
    var txtPhase_ProjectPhaseCode;
    var txtPhase_DescE;
    var txtStartDateTime;
    var txtEndDateTime;
    var txtStartTime;
    var txtEndTime;
    var txtSearchStartDateTime;
    var txtSearchEndDateTime;
    var txtSearchClass;
    var txtSearchCode;
    var btnSearchRequest;
    var btnSearchCode;
    var btnSearchClass;
    var btnLoad;
    var txtTrNo;
    var txtWorkDescr;
    var _compCode;
    var _braCode;
    var _screenLang;
    var EquipClassId;
    var EquipCategoryId;
    var EquimentID;
    var ScheduleId;
    var ScheduleEquipId;
    var currentDate;
    var PlaneDate;
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
    function InitalizeComponent() {
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
        ControlsButtons.SaveAction(function () {
            if (ClientSharedWork.CurrentMode == ScreenModes.Add)
                Insert();
            else if (ClientSharedWork.CurrentMode == ScreenModes.Edit)
                Update();
        });
        ControlsButtons.PrintAction(function () { PrintEquipmentAssign(); });
        $("#ImageEditorButton").on("click", function () {
            sys.ImgPopup(_compCode, _braCode, Modules.EquipmentRequest, Master.RequestEquipmentId.toString());
        });
    }
    EquipmentAssign.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        txtRequestEquipmentId = DocumentActions.GetElementById("txtRequestEquipmentId");
        txtScheduleId = DocumentActions.GetElementById("txtScheduleId");
        txtPrj_ProjectCode = DocumentActions.GetElementById("txtPrj_ProjectCode");
        txtPrj_DescE = DocumentActions.GetElementById("txtPrj_DescE");
        txtPhase_ProjectPhaseCode = DocumentActions.GetElementById("txtPhase_ProjectPhaseCode");
        txtPhase_DescE = DocumentActions.GetElementById("txtPhase_DescE");
        txtStartDateTime = DocumentActions.GetElementById("txtStartDateTime");
        txtEndDateTime = DocumentActions.GetElementById("txtEndDateTime");
        txtStartTime = DocumentActions.GetElementById("txtStartTime");
        txtEndTime = DocumentActions.GetElementById("txtEndTime");
        txtSearchStartDateTime = DocumentActions.GetElementById("txtSearchStartDateTime");
        txtSearchEndDateTime = DocumentActions.GetElementById("txtSearchEndDateTime");
        txtSearchClass = DocumentActions.GetElementById("txtSearchClass");
        txtSearchCode = DocumentActions.GetElementById("txtSearchCode");
        btnSearchRequest = DocumentActions.GetElementById("btnSearchRequest");
        btnSearchCode = DocumentActions.GetElementById("btnSearchCode");
        btnSearchClass = DocumentActions.GetElementById("btnSearchClass");
        btnLoad = DocumentActions.GetElementById("btnLoad");
        txtTrNo = DocumentActions.GetElementById("txtTrNo");
        txtWorkDescr = DocumentActions.GetElementById("txtWorkDescr");
    }
    function InitalizeEvents() {
        btnSearchRequest.onclick = btnSearchRequest_Clicked;
        btnSearchClass.onclick = btnSearchClass_Click;
        btnSearchCode.onclick = btnSearchCode_Click;
        btnLoad.onclick = btnLoad_Click;
    }
    function InitalizeGrid() {
        var res = GetResourceList("ResM_Materiallabor");
        GridEquip.ElementName = "GridEquip";
        GridEquip.Inserting = SharedSession.CurrentPrivileges.AddNew;
        GridEquip.Editing = SharedSession.CurrentPrivileges.EDIT;
        GridEquip.ConfirmDeleteing = SharedSession.CurrentPrivileges.Remove;
        GridEquip.InsertionMode = JsGridInsertionMode.Binding;
        GridEquip.Columns = [
            {
                title: res.ResM_Materiallabor_Equipcode, name: "Equipcode", width: "9.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "Equipcode", " ");
                    txt.id = "h_Equipcode";
                    txt.disabled = true;
                    return HeaderTemplate("ResM_Materiallabor_Equipcode", txt);
                }
            },
            {
                title: res.ResM_Materiallabor_name, visible: ClientSharedWork.Session.ScreenLanguage == "ar", name: "DescA", width: "19.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "DescA", " ");
                    txt.id = "h_DescA";
                    txt.disabled = true;
                    return HeaderTemplate("ResM_Materiallabor_name", txt);
                }
            },
            {
                title: res.ResM_Materiallabor_name, visible: ClientSharedWork.Session.ScreenLanguage == "en", name: "DescE", width: "19.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "DescE", " ");
                    txt.id = "h_DescE";
                    txt.disabled = true;
                    return HeaderTemplate("ResM_Materiallabor_name", txt);
                }
            },
            {
                title: res.ResM_Materiallabor_class, name: "ClassCode", width: "9.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "ClassCode", " ");
                    txt.id = "h_ClassCode";
                    txt.disabled = true;
                    return HeaderTemplate("ResM_Materiallabor_class", txt);
                }
            },
            {
                title: res.ResM_Materiallabor_assigndate, name: "AssigneDate", width: "11.5%",
                headerTemplate: function () {
                    var txt = CreateElement("datetime-local", GridInputClassName, " ", " ", "AssigneDate", " ");
                    txt.id = "h_AssigneDate";
                    txt.disabled = false;
                    txt.onchange = function (e) {
                        //if ($('#h_AssigneDate').val() < currentDate) {
                        //    $('#h_AssigneDate').val(currentDate);
                        //}
                    };
                    return HeaderTemplate("ResM_Materiallabor_assigndate", txt);
                }
            },
            {
                title: res.ResM_Materiallabor_planeleavedate, name: "ExpLeaveDate", width: "11.5%",
                headerTemplate: function () {
                    var txt = CreateElement("datetime-local", GridInputClassName, " ", " ", "ExpLeaveDate", " ");
                    txt.id = "h_ExpLeaveDate";
                    txt.disabled = false;
                    txt.onchange = function (e) {
                        //if ($('#h_ExpLeaveDate').val() > PlaneDate) {
                        //    $('#h_ExpLeaveDate').val(PlaneDate);
                        //}
                    };
                    return HeaderTemplate("ResM_Materiallabor_planeleavedate", txt);
                }
            },
            {
                title: res.ResM_Materiallabor_leavedate, name: "LeaveDate", width: "11.5%",
                headerTemplate: function () {
                    var txt = CreateElement("datetime-local", GridInputClassName, " ", " ", "LeaveDate", " ");
                    txt.id = "h_LeaveDate";
                    txt.disabled = true;
                    return HeaderTemplate("ResM_Materiallabor_leavedate", txt);
                }
            },
            {
                title: res.ResM_Materiallabor_status, name: "Status", width: "9.5%",
                headerTemplate: function () {
                    //let txt = CreateElement("label", GridInputClassName, " ", " ", "Status", " ");
                    var txt = CreateDropdownList(_Status, "Name_Ar", "Name_En", "Id", false);
                    txt.id = "h_Status";
                    txt.onchange = function (e) {
                        //ChangeDropDownStatus
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }
                        var _Status = $("#h_Status").val();
                        if (_Status == 0) {
                            $("#h_AssigneDate").removeAttr("disabled");
                            $("#h_ExpLeaveDate").removeAttr("disabled");
                            $("#h_LeaveDate").attr("disabled", "disabled");
                        }
                        else if (_Status == 1) {
                            $("#h_AssigneDate").attr("disabled", "disabled");
                            $("#h_ExpLeaveDate").attr("disabled", "disabled");
                            $("#h_LeaveDate").removeAttr("disabled");
                            debugger;
                            $("#h_LeaveDate").val(DateTimeFormat(Master.EndDateTime));
                        }
                    };
                    return HeaderTemplateNew(res.ResM_Materiallabor_status, txt);
                },
                itemTemplate: function (s, item) {
                    var txt = CreateDropdownList(_Status, "Name_Ar", "Name_En", "Id", false);
                    txt.disabled = true;
                    txt.id = "lblStatus";
                    txt.name = "Status";
                    debugger;
                    txt.value = item.Status.toString();
                    return txt;
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
                    btn.id = "btnAddItemActivityGrid";
                    btn.onclick = function (e) {
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }
                        AddItemInActivityGrid();
                    };
                    return btn;
                },
                itemTemplate: function (s, item) {
                    var btn = DocumentActions.CreateElement("button");
                    btn.innerHTML = "<i class='glyphicon glyphicon-remove'></i>";
                    btn.className = TransparentButton;
                    btn.type = "button";
                    btn.style.fontSize = "24px";
                    btn.style.color = "red";
                    btn.name = EquipDatasource.indexOf(item).toString();
                    btn.onclick = function (e) {
                        //remove
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }
                        debugger;
                        var index = Number(e.currentTarget.name);
                        var EquipId = EquipDatasource[index].EquimentID;
                        UpdateEquipProjectPhase(EquipId, null, null);
                        EquipDatasource.splice(index, 1);
                        BindDataGridEquip();
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
                    btn.type = "button";
                    btn.style.color = "forestgreen";
                    btn.name = EquipDatasource.indexOf(item).toString();
                    btn.onclick = function (e) {
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
                        var index = Number(e.currentTarget.name);
                        EquipDatasource.splice(index, 1);
                        BindDataGridEquip();
                        FillInputText("h_Equipcode", item.Equipcode);
                        FillInputText("h_DescA", item.DescA);
                        FillInputText("h_DescE", item.DescE);
                        $('#h_AssigneDate').val(DateTimeFormat(item.AssigneDate));
                        FillInputText("h_ExpLeaveDate", DateTimeFormat(item.ExpLeaveDate));
                        FillInputText("h_ClassCode", item.ClassCode);
                        FillInputText("h_LeaveDate", DateTimeFormat(item.LeaveDate));
                        $("#h_Status").val(item.Status.toString());
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
            success: function (d) {
                Master = d.result;
                Display();
            }
        });
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
        }
        catch (e) {
        }
        GetEquipList(Number(Master.ScheduleId));
        GetClassesList(Number(Master.ScheduleId));
    }
    function GetSchdualeNum(schudleId) {
        debugger;
        var res = Ajax.Call({ url: Url.Action("GetSchdualeNum", ControllerName), data: { schduleId: schudleId } });
        txtWorkDescr.value = res.TrNo.toString();
    }
    function Add() {
    }
    function Edit() {
    }
    function Assign() {
        //AssignMaster
        DocumentActions.AssignToModel(Master);
        MasterDetails.P_TR_ResRequestEquipment = Master;
        MasterDetails.P_TR_ResRequestEquipment.RequestEquipmentId = Master.RequestEquipmentId;
        //AssignDetails
        MasterDetails.P_TR_EngScheduleEquip = EquipDatasource;
        for (var _i = 0, EquipDatasource_1 = EquipDatasource; _i < EquipDatasource_1.length; _i++) {
            var equip = EquipDatasource_1[_i];
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
            success: function (d) {
                var result = d.result;
                if (result.ResponseState == true) {
                    ClientSharedWork.SwitchModes(ScreenModes.Query);
                    var msg = ReturnMsg("تم التعديل بنجاح  ", "Data Updated Successfuly. ");
                    MessageBox.Show(msg, "Update", function () {
                        var _Index = GetIndexByUseId(result.ResponseData, "PQ_GetResRequestEquipment", "RequestEquipmentId", " CompCode = " + _compCode + " and BraCode = " + _braCode);
                        NavigateToSearchResultKey(Number(_Index), Navigate);
                    });
                }
            }
        });
    }
    function PrintEquipmentAssign() {
        Ajax.CallAsync({
            url: Url.Action("PrintEquipmentAssign", "PrintTransaction"),
            data: { TrID: Number(Master.RequestEquipmentId) },
            success: function (d) {
                var url = d.result;
                window.open(url, "_blank");
            }
        });
    }
    function btnSearchRequest_Clicked() {
        sys.FindKey(Modules.EquipmentAssign, "btnSearchRequest", "CompCode = " + _compCode + " and BraCode = " + _braCode, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetEquipmentRequest", ControllerName),
                data: { id: id },
                success: function (d) {
                    Master = d.result;
                    var Index = GetIndexByUseId(Master.RequestEquipmentId, "PQ_GetResRequestEquipment", "RequestEquipmentId", " CompCode = " + _compCode + " and BraCode = " + _braCode);
                    NavigateToSearchResultKey(Number(Index), Navigate);
                }
            });
        });
    }
    function btnSearchClass_Click() {
        sys.FindKey(Modules.EquipmentAssign, "btnSearchClass", "CompCode = " + _compCode, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetEquipClass", ControllerName),
                data: { id: id },
                success: function (d) {
                    var EquipClass = d.result;
                    EquipClassId = EquipClass.EquipClassId;
                    txtSearchClass.value = EquipClass.ClassCode;
                }
            });
        });
    }
    function btnSearchCode_Click() {
        sys.FindKey(Modules.LaborAssign, "btnSearchCode", "CompCode = " + _compCode, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetLaborCategory", ControllerName),
                data: { id: id },
                success: function (d) {
                    var laborategory = d.result;
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
            success: function (d) {
                FreeEquipDatasource = d.result;
                for (var _i = 0, FreeEquipDatasource_1 = FreeEquipDatasource; _i < FreeEquipDatasource_1.length; _i++) {
                    var itm = FreeEquipDatasource_1[_i];
                    itm.FreeDate = DateTimeFormatWithoutT(itm.FreeDate);
                }
                GridFree.DataSource = FreeEquipDatasource;
                GridFree.Bind();
            }
        });
    }
    function GetEquipList(id) {
        Ajax.CallAsync({
            url: Url.Action("GetEquipList", ControllerName),
            data: { id: id },
            success: function (d) {
                EquipDatasource = d.result;
                GridEquip.DataSource = EquipDatasource;
                for (var _i = 0, EquipDatasource_2 = EquipDatasource; _i < EquipDatasource_2.length; _i++) {
                    var itm = EquipDatasource_2[_i];
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
    function GetClassesList(id) {
        Ajax.CallAsync({
            url: Url.Action("GetClassesList", ControllerName),
            data: { id: id },
            success: function (d) {
                ClassDatasource = d.result;
                GridClass.DataSource = ClassDatasource;
                GridClass.Bind();
            }
        });
    }
    function FreeEquipRowDoubleClicked() {
        debugger;
        var Equip = new PQ_GetResEquipAssign();
        var currenEquip = GridFree.SelectedItem;
        var index = GridFree.SelectedIndex;
        Equip.ClassCode = currenEquip.ClassCode;
        Equip.Class_DescA = currenEquip.class_descA;
        Equip.Class_DescE = currenEquip.Class_DescE;
        Equip.DescA = currenEquip.DescA;
        Equip.DescE = currenEquip.DescE;
        Equip.Status = 0; //currenEquip.IsActive == true ? 1 : 0;
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
        var projectid = Master.ProjectID;
        var ProjectPhaseId = Master.ProjectPhaseId;
        UpdateEquipProjectPhase(currenEquip.EquimentID, projectid, ProjectPhaseId);
    }
    function BindDataGridEquip() {
        GridEquip.DataSource = EquipDatasource;
        GridEquip.Bind();
    }
    function FillInputText(_TextID, _Data) {
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
        }
        else {
            DetailsAssignHeaderEquip.AssigneDate = DateTimeFormatWithoutT($("#h_AssigneDate").val());
            DetailsAssignHeaderEquip.ExpLeaveDate = DateTimeFormatWithoutT($("#h_ExpLeaveDate").val());
            if ($("#h_LeaveDate").val() == "") {
                DetailsAssignHeaderEquip.LeaveDate = null;
            }
            else {
                DetailsAssignHeaderEquip.LeaveDate = DateTimeFormatWithoutT($("#h_LeaveDate").val());
            }
        }
        //|| DateTimeFormatWithoutT($("#h_LeaveDate").val()) == "Invalid Date"
        debugger;
        if (DetailsAssignHeaderEquip.Status == 1 && (DetailsAssignHeaderEquip.LeaveDate == null || DetailsAssignHeaderEquip.LeaveDate == "")) {
            WorningMessage("الرجاء اضافة تاريخ المغادره في حالة ان الحاله غادر", "Please enter leave date in case status leave");
            return;
        }
        debugger;
        var _AssigneDate = DateFormat($("#h_AssigneDate").val());
        var _ExpLeaveDate = DateFormat($("#h_ExpLeaveDate").val());
        var _AssigneDateTime = TimeFormat($("#h_AssigneDate").val());
        var _ExpLeaveDateTime = TimeFormat($("#h_ExpLeaveDate").val());
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
    function changeStatusAndLeaveDate(currEquip, index) {
        EquipDatasource.splice(index, 1);
        GridEquip.Bind();
        currEquip.Status = 1;
        currEquip.LeaveDate = DateFormat(new Date().toString());
        EquipDatasource.push(currEquip);
        GridEquip.DataSource = EquipDatasource;
        GridEquip.Bind();
    }
    function UpdateEquipProjectPhase(EquipId, projectId, phaseId) {
        Ajax.CallAsync({
            url: Url.Action("UpdateEquipProjectPhase", ControllerName),
            data: { id: EquipId, projectid: projectId, ProjectPhaseId: phaseId },
            success: function (d) {
            }
        });
    }
})(EquipmentAssign || (EquipmentAssign = {}));
//# sourceMappingURL=EquipmentAssign.js.map