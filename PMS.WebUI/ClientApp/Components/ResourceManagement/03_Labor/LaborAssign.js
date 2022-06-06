$(document).ready(function () {
    LaborAssign.InitalizeComponent();
});
var LaborAssign;
(function (LaborAssign) {
    var ControllerName = "LaborAssign";
    var Master = new PQ_GetResRequestLabours();
    var GridInputClassName = "form-control gridIput";
    var columnWidth = "100px";
    var NumberColumnWidth = "50px";
    var MasterDetails = new M_D_LaborAssign();
    var LabourDatasource = new Array();
    var DetailsAssignHeaderLabors = new PQ_GetResLabourAssign();
    var Tbl_DetailLabors = new Array();
    var ClassDatasource = new Array();
    var FreeLaborDatasource = new Array();
    var newFreeLaborDataSource = new Array();
    var GridLabours = new JsGrid();
    var GridClass = new JsGrid();
    var GridFree = new JsGrid();
    var sys = new SystemTools();
    var txtTrNo;
    var txtRequestLabourId;
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
    var txtSearchDataSource;
    var btnSearchRequested;
    var btnSearchCode;
    var btnSearchClass;
    var btnLoad;
    var _compCode;
    var _braCode;
    var _screenLang;
    var laborClassId;
    var laborCategoryId;
    var LaborID;
    var ScheduleId;
    var ScheduleLaborId;
    var _HourCost;
    var currentDate;
    var PlaneDate;
    var SearchFlag;
    SearchFlag = 0;
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
        ControlsButtons.PrintAction(function () { PrintLaborAssign(); });
        $("#ImageEditorButton").on("click", function () {
            sys.ImgPopup(_compCode, _braCode, Modules.LaborRequest, Master.RequestLabourId.toString());
        });
    }
    LaborAssign.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        txtRequestLabourId = DocumentActions.GetElementById("txtRequestLabourId");
        txtScheduleId = DocumentActions.GetElementById("txtScheduleId");
        txtPrj_ProjectCode = DocumentActions.GetElementById("txtPrj_ProjectCode");
        txtPrj_DescE = DocumentActions.GetElementById("txtPrj_DescE");
        txtPhase_ProjectPhaseCode = DocumentActions.GetElementById("txtPhase_ProjectPhaseCode");
        txtPhase_DescE = DocumentActions.GetElementById("txtPhase_DescE");
        txtStartDateTime = DocumentActions.GetElementById("txtStartDateTime");
        txtEndDateTime = DocumentActions.GetElementById("txtStartDateTime");
        txtStartTime = DocumentActions.GetElementById("txtStartTime");
        txtEndTime = DocumentActions.GetElementById("txtEndTime");
        txtSearchStartDateTime = DocumentActions.GetElementById("txtSearchStartDateTime");
        txtSearchEndDateTime = DocumentActions.GetElementById("txtSearchEndDateTime");
        txtSearchClass = DocumentActions.GetElementById("txtSearchClass");
        txtSearchCode = DocumentActions.GetElementById("txtSearchCode");
        txtSearchDataSource = DocumentActions.GetElementById("txtSearchDataSource");
        btnSearchRequested = DocumentActions.GetElementById("btnSearchRequested");
        btnSearchCode = DocumentActions.GetElementById("btnSearchCode");
        btnSearchClass = DocumentActions.GetElementById("btnSearchClass");
        btnLoad = DocumentActions.GetElementById("btnLoad");
        txtTrNo = DocumentActions.GetElementById("txtTrNo");
    }
    function InitalizeEvents() {
        btnSearchRequested.onclick = btnSearchRequest_Click;
        btnSearchClass.onclick = btnSearchClass_Click;
        btnSearchCode.onclick = btnSearchCode_Click;
        btnLoad.onclick = btnLoad_Click;
        txtSearchDataSource.onkeyup = txtSearchDataSource_Change;
        txtTrNo.onchange = SearchRequest_Changed;
    }
    function PrintLaborAssign() {
        Ajax.CallAsync({
            url: Url.Action("PrintLaborAssign", "PrintTransaction"),
            data: { TrID: Number(Master.RequestLabourId) },
            success: function (d) {
                var url = d.result;
                window.open(url, "_blank");
            }
        });
    }
    function txtSearchDataSource_Change() {
        SearchFlag = 0;
        if (txtSearchDataSource.value != "") {
            SearchFlag = 1;
            var search_1 = txtSearchDataSource.value.toLowerCase();
            newFreeLaborDataSource = FreeLaborDatasource.filter(function (x) { return x.DescA.toLowerCase().search(search_1) >= 0 || x.DescE.toLowerCase().search(search_1) >= 0 || x.LaborCode.toLowerCase().search(search_1) >= 0; });
            GridFree.DataSource = newFreeLaborDataSource;
            GridFree.Bind();
        }
        else {
            GridFree.DataSource = FreeLaborDatasource;
            GridFree.Bind();
        }
    }
    function InitalizeGrid() {
        var res = GetResourceList("ResM_Materiallabor");
        GridLabours.ElementName = "GridLabours";
        GridLabours.Inserting = SharedSession.CurrentPrivileges.AddNew;
        GridLabours.Editing = SharedSession.CurrentPrivileges.EDIT;
        GridLabours.ConfirmDeleteing = SharedSession.CurrentPrivileges.Remove;
        GridLabours.InsertionMode = JsGridInsertionMode.Binding;
        GridLabours.Columns = [
            {
                title: res.ResM_Materiallabor_laborcode, name: "LaborCode", width: "9.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "LaborCode", " ");
                    txt.id = "h_LaborCode";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.ResM_Materiallabor_laborcode, txt);
                }
            },
            {
                title: res.ResM_Materiallabor_name, visible: _screenLang == "ar", name: "DescA", width: "20.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "DescA", " ");
                    txt.id = "h_DescA";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.ResM_Materiallabor_name, txt);
                }
            },
            {
                title: res.ResM_Materiallabor_name, visible: _screenLang == "en", name: "DescE", width: "20.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "DescE", " ");
                    txt.id = "h_DescE";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.ResM_Materiallabor_name, txt);
                }
            },
            {
                title: res.ResM_Materiallabor_class, name: "LabourClass_ClassCode", width: "9.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "LabourClass_ClassCode", " ");
                    txt.id = "h_LabourClass_ClassCode";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.ResM_Materiallabor_class, txt);
                }
            },
            {
                title: res.ResM_Materiallabor_assigndate, name: "AssigneDate", width: "14.3%",
                headerTemplate: function () {
                    var txt = CreateElement("datetime-local", GridInputClassName, " ", " ", "AssigneDate", " ");
                    txt.id = "h_AssigneDate";
                    txt.disabled = false;
                    txt.onchange = function (e) {
                        //if ($('#h_AssigneDate').val() < $("#txtStartDateTime").val()) {
                        //    $('#h_AssigneDate').val($("#txtStartDateTime").val());
                        //}
                    };
                    return HeaderTemplateNew(res.ResM_Materiallabor_assigndate, txt);
                }
            },
            {
                title: res.ResM_Materiallabor_planeleavedate, name: "ExpLeaveDate", width: "14.3%",
                headerTemplate: function () {
                    var txt = CreateElement("datetime-local", GridInputClassName, " ", " ", "ExpLeaveDate", " ");
                    txt.id = "h_ExpLeaveDate";
                    txt.disabled = false;
                    txt.onchange = function (e) {
                        //if ($('#h_ExpLeaveDate').val() > $("#txtEndDateTime").val()) {
                        //    $('#h_ExpLeaveDate').val($("#txtEndDateTime").val());
                        //}
                    };
                    return HeaderTemplateNew(res.ResM_Materiallabor_planeleavedate, txt);
                }
            },
            {
                title: res.ResM_Materiallabor_actualleavedate, name: "LeaveDate", width: "14.3%",
                headerTemplate: function () {
                    var txt = CreateElement("datetime-local", GridInputClassName, " ", " ", "LeaveDate", " ");
                    txt.id = "h_LeaveDate";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.ResM_Materiallabor_actualleavedate, txt);
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
                    btn.name = LabourDatasource.indexOf(item).toString();
                    btn.onclick = function (e) {
                        //remove
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }
                        var index = Number(e.currentTarget.name);
                        var labId = LabourDatasource[index].LaborID;
                        UpdateLaborProject_Phase(labId, null, null);
                        LabourDatasource.splice(index, 1);
                        BindDataGridLabors();
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
                    btn.type = "button";
                    btn.style.color = "forestgreen";
                    btn.name = LabourDatasource.indexOf(item).toString();
                    btn.onclick = function (e) {
                        //EDIT
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }
                        if (item.Status == 1) {
                            return;
                        }
                        currentDate = DateTimeFormat(item.AssigneDate);
                        PlaneDate = DateTimeFormat(item.ExpLeaveDate);
                        LaborID = item.LaborID;
                        ScheduleId = item.ScheduleId;
                        ScheduleLaborId = item.ScheduleLaborId;
                        _HourCost = item.HourCost;
                        var index = Number(e.currentTarget.name);
                        LabourDatasource.splice(index, 1);
                        BindDataGridLabors();
                        FillInputText("h_LaborCode", item.LaborCode);
                        FillInputText("h_DescA", item.DescA);
                        FillInputText("h_DescE", item.DescE);
                        $('#h_AssigneDate').val(DateTimeFormat(item.AssigneDate));
                        FillInputText("h_ExpLeaveDate", DateTimeFormat(item.ExpLeaveDate));
                        FillInputText("h_LabourClass_ClassCode", item.LabourClass_ClassCode);
                        FillInputText("h_LeaveDate", DateTimeFormat(item.LeaveDate));
                        $("#h_Status").val(item.Status.toString());
                    };
                    return btn;
                }
            }
        ];
        GridLabours.DataSource = LabourDatasource;
        GridLabours.Bind();
        GridClass.ElementName = "GridClass";
        GridClass.Inserting = false; //SharedSession.CurrentPrivileges.AddNew;       
        GridClass.Editing = false; // SharedSession.CurrentPrivileges.EDIT;
        GridClass.ConfirmDeleteing = false; // SharedSession.CurrentPrivileges.Remove;
        GridClass.InsertionMode = JsGridInsertionMode.Binding;
        GridClass.Columns = [
            { title: res.ResM_Materiallabor_labclass, name: "LClass_CalssCode", type: "text", width: "9.5%" },
            { title: res.ResM_Materiallabor_classname, name: "LClass_DescA", visible: _screenLang == "ar", type: "text", width: "9.5%" },
            { title: res.ResM_Materiallabor_classname, name: "LClass_DescE", visible: _screenLang == "en", type: "text", width: "9.5%" },
            { title: res.ResM_Materiallabor_requiredhrs, name: "LCass_HourCost", type: "text", width: "7.5%" },
            { title: res.ResM_Materiallabor_requiredlabors, name: "RequiredNo", type: "text", width: "7.5%" },
            { title: res.ResM_Materiallabor_assigned, name: "AssignedLab", type: "text", width: "7.5%" },
            { title: res.ResM_Materiallabor_remain, name: "RemainLab", type: "text", width: "7.5%" }
            //{ type: "control", width: "3%" }
        ];
        GridClass.DataSource = ClassDatasource;
        GridClass.Bind();
        GridFree.ElementName = "GridChildChild";
        GridFree.Inserting = false; //SharedSession.CurrentPrivileges.AddNew;
        GridFree.Editing = false; // SharedSession.CurrentPrivileges.EDIT;
        GridFree.ConfirmDeleteing = false; //  SharedSession.CurrentPrivileges.Remove;
        GridFree.OnRowDoubleClicked = FreeLaborsRowDoubleClicked;
        GridFree.InsertionMode = JsGridInsertionMode.Binding;
        GridFree.Columns = [
            { title: res.ResM_Materiallabor_classcode, name: "ClassCode", type: "label", width: "5%" },
            { title: res.ResM_Materiallabor_categorycode, name: "CategCode", type: "label", width: "7.5%" },
            { title: res.ResM_Materiallabor_laborcode, name: "LaborCode", type: "label", width: "7.5%" },
            { title: res.ResM_Materiallabor_Laborname, name: "DescA", type: "label", visible: _screenLang == "ar", width: "12%" },
            { title: res.ResM_Materiallabor_Laborname, name: "DescE", type: "label", visible: _screenLang == "en", width: "12%" },
            { title: res.ResM_Materiallabor_planeleavedate, name: "FreeDate", type: "label", width: "10%" },
            { title: "Busydate", name: "BusyDate", type: "label", width: "10%" },
        ];
        GridFree.DataSource = FreeLaborDatasource;
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
        DocumentActions.RenderFromModel(Master);
        txtSearchStartDateTime.value = DateTimeFormat(Master.StartDateTime);
        txtSearchEndDateTime.value = DateTimeFormat(Master.EndDateTime);
        txtStartTime.value = TimeFormat(Master.StartDateTime);
        txtEndTime.value = TimeFormat(Master.EndDateTime);
        GetLaborList(Number(Master.ScheduleId));
        GetClassesList(Number(Master.ScheduleId));
        newFreeLaborDataSource.splice(0);
        FreeLaborDatasource.splice(0);
        GridFree.DataSource = FreeLaborDatasource;
        GridFree.Bind();
    }
    function Add() {
    }
    function Edit() {
    }
    function Insert() {
    }
    function Update() {
        Assign();
        Master.CompCode = Number(_compCode);
        var session = GetSessionRecord();
        MasterDetails.sessionRecord = session;
        AjaxApi.CallsyncApi({
            type: "Post",
            url: sys.apiUrl("P_Tr_ResRequestLabour", "UpdateMasterDetail"),
            data: JSON.stringify(MasterDetails),
            headers: {
                'Accept': 'application/json; charset=utf-8',
                'Content-Type': 'application/json'
            },
            success: function (d) {
                var result = d;
                if (result.IsSuccess == true) {
                    ClientSharedWork.SwitchModes(ScreenModes.Query);
                    WorningMessage("تم التعديل بنجاح  ", "Data Updated Successfuly. ");
                    var _Index = GetIndexByUseId(result.Response, "PQ_GetResRequestLabours", "RequestLabourId", " CompCode = " + _compCode + " and BraCode = " + _braCode);
                    NavigateToSearchResultKey(Number(_Index), Navigate);
                }
            }
        });
        //Ajax.Callsync({
        //    url: Url.Action("Update", ControllerName),
        //    data: { JsonData: JSON.stringify(MasterDetails) },
        //    success: (d) => {
        //        let result = d.result as ResponseResult;
        //        if (result.ResponseState == true) {
        //            ClientSharedWork.SwitchModes(ScreenModes.Query);
        //            let msg: string = ReturnMsg("تم التعديل بنجاح  ", "Data Updated Successfuly. ");
        //            MessageBox.Show(msg, "Update", () => {
        //                Display();
        //                let _Index = GetIndexByUseId(result.ResponseData, "PQ_GetResRequestLabours", "RequestLabourId", " CompCode = " + _compCode + " and BraCode = " + _braCode);
        //                NavigateToSearchResultKey(Number(_Index), Navigate);
        //            });
        //        }
        //    }
        //})
    }
    function btnSearchRequest_Click() {
        sys.FindKey(Modules.LaborAssign, "btnSearchRequested", "CompCode = " + _compCode + " and BraCode = " + _braCode, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.Callsync({
                url: Url.Action("GetLaborRequest", ControllerName),
                data: { id: id },
                success: function (d) {
                    Master = d.result;
                    var Index = GetIndexByUseId(Number(Master.RequestLabourId), "PQ_GetResRequestLabours", "RequestLabourId", " CompCode = " + _compCode + " and BraCode = " + _braCode);
                    NavigateToSearchResultKey(Number(Index), Navigate);
                }
            });
        });
    }
    function SearchRequest_Changed() {
        var trno = Number(txtTrNo.value);
        Ajax.Callsync({
            url: Url.Action("getRequestLabourViewByNo", "FindByNo"),
            data: { trno: trno },
            success: function (d) {
                if (IsNullOrEmpty(d.result)) {
                    WorningMessage("الرمز خطأ، أعد المحاولة .... ", "Wrong Code , .. Retry .. ");
                    window.open(Url.Action(ControllerName + "Index", ControllerName), "_self");
                }
                Master = d.result;
                var Index = GetIndexByUseId(Master.RequestLabourId, "PQ_GetResRequestLabours", "RequestLabourId", " CompCode = " + _compCode + " and BraCode = " + _braCode);
                NavigateToSearchResultKey(Number(Index), Navigate);
            }
        });
    }
    function btnSearchClass_Click() {
        sys.FindKey(Modules.LaborAssign, "btnSearchClass", "CompCode = " + _compCode, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetLaborClass", ControllerName),
                data: { id: id },
                success: function (d) {
                    var laborClass = d.result;
                    laborClassId = laborClass.LaborClassId;
                    txtSearchClass.value = laborClass.ClassCode.toString();
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
                    laborCategoryId = laborategory.LaborCategoryId;
                    txtSearchCode.value = laborategory.CategCode.toString();
                }
            });
        });
    }
    function GetLaborList(id) {
        LabourDatasource.splice(0);
        Tbl_DetailLabors.splice(0);
        //LabourDatasource = new Array<PQ_GetResLabourAssign>();
        //Tbl_DetailLabors =new Array<P_TR_EngScheduleLabor>();
        Ajax.CallAsync({
            url: Url.Action("GetLaborList", ControllerName),
            data: { id: id },
            success: function (d) {
                LabourDatasource = d.result;
                GridLabours.DataSource = LabourDatasource;
                for (var _i = 0, LabourDatasource_1 = LabourDatasource; _i < LabourDatasource_1.length; _i++) {
                    var itm = LabourDatasource_1[_i];
                    itm.AssigneDate = itm.AssigneDate != null ? DateTimeFormatWithoutT(itm.AssigneDate) : itm.AssigneDate = null;
                    itm.ExpLeaveDate = itm.ExpLeaveDate != null ? DateTimeFormatWithoutT(itm.ExpLeaveDate) : itm.ExpLeaveDate = null;
                    itm.LeaveDate = itm.LeaveDate != null ? DateTimeFormatWithoutT(itm.LeaveDate) : itm.LeaveDate = null;
                }
                GridLabours.Bind();
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
    function btnLoad_Click() {
        Ajax.CallAsync({
            url: Url.Action("PProc_ResGetFreeLabor", ControllerName),
            data: {
                bra: _compCode, FromDate: txtSearchStartDateTime.value,
                ToDate: txtSearchEndDateTime.value, Classid: laborClassId, Catid: laborCategoryId
            },
            success: function (d) {
                FreeLaborDatasource = d.result;
                for (var _i = 0, FreeLaborDatasource_1 = FreeLaborDatasource; _i < FreeLaborDatasource_1.length; _i++) {
                    var itm = FreeLaborDatasource_1[_i];
                    itm.FreeDate = DateTimeFormatWithoutT(itm.FreeDate);
                    itm.BusyDate = DateTimeFormatWithoutT(itm.BusyDate);
                }
                GridFree.DataSource = FreeLaborDatasource;
                GridFree.Bind();
            }
        });
    }
    function FreeLaborsRowDoubleClicked() {
        //
        var labors = new PQ_GetResLabourAssign();
        var currenLabor = GridFree.SelectedItem;
        var index = GridFree.SelectedIndex;
        labors.LabourClass_ClassCode = currenLabor.ClassCode;
        labors.LabourClass_DescA = currenLabor.class_descA;
        labors.LabourClass_DescE = currenLabor.Class_DescE;
        labors.DescA = currenLabor.DescA;
        labors.DescE = currenLabor.DescE;
        labors.HourCost = currenLabor.HourCost;
        labors.Status = 0; //currenLabor.IsActive == true ? 0 : 1;
        labors.LaborID = currenLabor.LaborID;
        labors.LaborCode = currenLabor.LaborCode;
        labors.ScheduleId = Master.ScheduleId;
        labors.LeaveDate = null;
        labors.AssigneDate = currenLabor.FreeDate;
        labors.ExpLeaveDate = currenLabor.BusyDate;
        labors.ScheduleLaborId = 0;
        index = FreeLaborDatasource.indexOf(currenLabor);
        //
        //labors.AssigneDate = DateTimeFormatWithoutT($("#txtSearchStartDateTime").val());
        //labors.ExpLeaveDate = DateTimeFormatWithoutT($("#txtSearchEndDateTime").val());
        //
        LabourDatasource.push(labors);
        GridLabours.DataSource = LabourDatasource;
        GridLabours.Bind();
        //if ( SearchFlag == 0 )
        FreeLaborDatasource.splice(index, 1);
        //else 
        //    newFreeLaborDataSource.splice(index, 1);
        GridFree.DataSource = FreeLaborDatasource;
        GridFree.Bind();
        SearchFlag = 0;
        // Update P_D_Labor
        var projectid = Master.ProjectID;
        var ProjectPhaseId = Master.ProjectPhaseId;
        UpdateLaborProject_Phase(currenLabor.LaborID, projectid, ProjectPhaseId);
    }
    function BindDataGridLabors() {
        GridLabours.DataSource = LabourDatasource;
        GridLabours.Bind();
    }
    function FillInputText(_TextID, _Data) {
        $("#" + _TextID).text(_Data);
        $("#" + _TextID).val(_Data);
    }
    function AddItemInActivityGrid() {
        DetailsAssignHeaderLabors = new PQ_GetResLabourAssign();
        DetailsAssignHeaderLabors.LaborID = LaborID;
        DetailsAssignHeaderLabors.ScheduleId = ScheduleId;
        DetailsAssignHeaderLabors.ScheduleLaborId = ScheduleLaborId;
        DetailsAssignHeaderLabors.LaborCode = $("#h_LaborCode").val();
        DetailsAssignHeaderLabors.LaborCode = $("#h_LaborCode").val();
        DetailsAssignHeaderLabors.DescA = $("#h_DescA").val();
        DetailsAssignHeaderLabors.DescE = $("#h_DescE").val();
        DetailsAssignHeaderLabors.LabourClass_ClassCode = $("#h_LabourClass_ClassCode").val();
        DetailsAssignHeaderLabors.HourCost = _HourCost;
        DetailsAssignHeaderLabors.Status = Number($("#h_Status").val());
        if (DetailsAssignHeaderLabors.Status == 0) {
            DetailsAssignHeaderLabors.AssigneDate = DateTimeFormatWithoutT($("#h_AssigneDate").val());
            DetailsAssignHeaderLabors.ExpLeaveDate = DateTimeFormatWithoutT($("#h_ExpLeaveDate").val());
            DetailsAssignHeaderLabors.LeaveDate = null;
        }
        else {
            DetailsAssignHeaderLabors.AssigneDate = DateTimeFormatWithoutT($("#h_AssigneDate").val());
            DetailsAssignHeaderLabors.ExpLeaveDate = DateTimeFormatWithoutT($("#h_ExpLeaveDate").val());
            if ($("#h_LeaveDate").val() == "") {
                DetailsAssignHeaderLabors.LeaveDate = null;
            }
            else {
                DetailsAssignHeaderLabors.LeaveDate = DateTimeFormatWithoutT($("#h_LeaveDate").val());
            }
        }
        //|| DateTimeFormatWithoutT($("#h_LeaveDate").val()) == "Invalid Date"
        if (DetailsAssignHeaderLabors.Status == 1 && (DetailsAssignHeaderLabors.LeaveDate == null || DetailsAssignHeaderLabors.LeaveDate == "")) {
            WorningMessage("الرجاء اضافة تاريخ المغادره في حالة ان الحاله غادر", "Please enter leave date in case status leave");
            return;
        }
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
            UpdateLaborProject_Phase(DetailsAssignHeaderLabors.LaborID, null, null);
        }
        LabourDatasource.push(DetailsAssignHeaderLabors);
        GridLabours.DataSource = LabourDatasource;
        GridLabours.Bind();
    }
    function changeStatusAndLeaveDate(currLabor, index) {
        LabourDatasource.splice(index, 1);
        GridLabours.Bind();
        currLabor.Status = 1;
        currLabor.LeaveDate = DateFormat(new Date().toString());
        LabourDatasource.push(currLabor);
        GridLabours.DataSource = LabourDatasource;
        GridLabours.Bind();
    }
    function UpdateLaborProject_Phase(laborId, projectId, phaseId) {
        Ajax.Callsync({
            url: Url.Action("UpdateLabourProjectPhase", ControllerName),
            data: { id: laborId, projectid: projectId, ProjectPhaseId: phaseId },
            success: function (d) {
            }
        });
    }
    function Assign() {
        //AssignMaster
        //Master = new P_TR_EngSchedule();
        DocumentActions.AssignToModel(Master);
        MasterDetails.P_Tr_ResRequestLabour = Master;
        MasterDetails.P_Tr_ResRequestLabour.RequestLabourId = Master.RequestLabourId;
        //AssignDetails
        MasterDetails.P_TR_EngScheduleLabor = LabourDatasource;
        for (var _i = 0, LabourDatasource_2 = LabourDatasource; _i < LabourDatasource_2.length; _i++) {
            var lab = LabourDatasource_2[_i];
            var NLab = new P_TR_EngScheduleLabor;
            lab.ScheduleId = Number(Master.ScheduleId);
            NLab.AssigneDate = lab.AssigneDate;
            NLab.ExpLeaveDate = lab.ExpLeaveDate;
            NLab.HourCost = lab.HourCost;
            NLab.LaborID = lab.LaborID;
            NLab.LeaveDate = lab.LeaveDate;
            NLab.ScheduleId = lab.ScheduleId;
            NLab.ScheduleLaborId = lab.ScheduleLaborId;
            NLab.Status = lab.Status;
            //lab.Status =
            Tbl_DetailLabors.push(NLab);
        }
        MasterDetails.P_TR_EngScheduleLabor = Tbl_DetailLabors;
    }
})(LaborAssign || (LaborAssign = {}));
//# sourceMappingURL=LaborAssign.js.map