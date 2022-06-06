$(document).ready(function () {
    OverTimeSheet.InitalizeComponent();
});
var OverTimeSheet;
(function (OverTimeSheet) {
    var txtOverTimeID;
    var txtTrNo;
    var butTrNo;
    var txtTrDate;
    var txtSiteEngineerId;
    var txtEng_Code;
    var btnSearchLaborOT;
    var txtEng_Desc;
    var txtFromDate;
    var txtToDate;
    var txtProjectID;
    var txtPrj_ProjectCode;
    var butProj_Code;
    var btnSearchSchdule;
    var txtPrj_DescE;
    var txtRemarks;
    var ChkStatus;
    var txtWorkDescr;
    var txtPhase_ProjectPhaseCode;
    var txtPhase_DescE;
    var txtOTHourcostgrid;
    //var txtEndDateTime: HTMLInputElement;
    //var OTHourCost: number;
    var ControllerName = "OverTimeSheet";
    var GridInputClassName = "form-control gridIput";
    var Master = new PQ_GetResLabourOverTime();
    //var Model: PQ_GetResLabourOverTime = new PQ_GetResLabourOverTime();
    var M_D_ResOverTime = /** @class */ (function () {
        function M_D_ResOverTime() {
        }
        return M_D_ResOverTime;
    }());
    var MasterDetails = new M_D_ResOverTime();
    var UpdMasterDetails = new M_D_ResOverTime();
    var DetailsOverTime = new PQ_GetResLabourOverTimeDetail();
    var dataSource = new Array();
    var tbl_DataSource = new Array();
    var GridParent = new JsGrid();
    var sys = new SystemTools();
    var _ScreenLang;
    var _CompCode;
    var _BranchCode;
    var schd_ProjectID;
    var schd_ProjectPhaseId;
    var ScheduleId;
    var OverTimeLabourID;
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
        InitalizeGrid();
        NavigatorComponent.InitalizeComponent();
        ClientSharedWork.OnNavigate = Navigate;
        ControlsButtons.AddAction(Add);
        ControlsButtons.EditAction(Edit);
        ControlsButtons.UndoAction(Undo);
        ControlsButtons.SaveAction(function () {
            if (ClientSharedWork.CurrentMode == ScreenModes.Add)
                Insert();
            else if (ClientSharedWork.CurrentMode == ScreenModes.Edit)
                Update();
        });
        ControlsButtons.PrintAction(function () { PrintOverTime(); });
        $("#ImageEditorButton").on("click", function () {
            sys.ImgPopup(_CompCode, _BranchCode, Modules.OverTimeSheet, Master.OverTimeID.toString());
        });
    }
    OverTimeSheet.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        txtOverTimeID = DocumentActions.GetElementById("txtOverTimeID");
        txtTrNo = DocumentActions.GetElementById("txtTrNo");
        butTrNo = DocumentActions.GetElementById("butTrNo");
        txtTrDate = DocumentActions.GetElementById("txtTrDate");
        txtPhase_ProjectPhaseCode = DocumentActions.GetElementById("txtPhase_ProjectPhaseCode");
        //Site Engineer
        txtSiteEngineerId = DocumentActions.GetElementById("txtSiteEngineerId");
        txtEng_Code = DocumentActions.GetElementById("txtEng_Code");
        btnSearchLaborOT = DocumentActions.GetElementById("btnSearchLaborOT");
        btnSearchSchdule = DocumentActions.GetElementById("btnSearchSchdule");
        txtEng_Desc = DocumentActions.GetElementById("txtEng_Desc");
        //Project
        txtProjectID = DocumentActions.GetElementById("txtProjectID");
        txtPrj_ProjectCode = DocumentActions.GetElementById("txtPrj_ProjectCode");
        butProj_Code = DocumentActions.GetElementById("butProj_Code");
        txtPrj_DescE = DocumentActions.GetElementById("txtPrj_DescE");
        txtPhase_DescE = DocumentActions.GetElementById("txtPhase_DescE");
        txtFromDate = DocumentActions.GetElementById("txtFromDate");
        txtToDate = DocumentActions.GetElementById("txtToDate");
        txtRemarks = DocumentActions.GetElementById("txtRemarks");
        ChkStatus = DocumentActions.GetElementById("ChkStatus");
        txtWorkDescr = DocumentActions.GetElementById("txtWorkDescr");
    }
    function InitalizeEvents() {
        //butTrNo.onclick = butTrNo_Click;
        btnSearchLaborOT.onclick = btnSearchLaborOT_Click;
        btnSearchSchdule.onclick = btnSearchSchdule_Click;
        //butProj_Code.onclick = butProj_Code_Click;
        txtTrNo.onchange = SearchLaborOT_Changed;
        txtWorkDescr.onchange = SearchSchdule_Changed;
        ChkStatus.onchange = Opentr;
    }
    function Undo() {
    }
    function InitalizeGrid() {
        var res = GetResourceList("ResM_Materiallabor");
        GridParent.ElementName = "GridParent";
        GridParent.Inserting = SharedSession.CurrentPrivileges.AddNew;
        GridParent.OnRefreshed = function () {
            if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                $(".editable").attr("disabled", "disabled");
                $(".addable").attr("disabled", "disabled");
            }
            else {
                $(".editable").removeAttr("disabled");
                $(".addable").removeAttr("disabled");
            }
        };
        GridParent.Editing = SharedSession.CurrentPrivileges.EDIT;
        GridParent.ConfirmDeleteing = SharedSession.CurrentPrivileges.Remove;
        GridParent.InsertionMode = JsGridInsertionMode.Binding;
        GridParent.Columns = [
            {
                title: res.ResM_Materiallabor_labor,
                name: "Labor_Code", width: "10.5%", css: JsGridHeaderCenter,
                headerTemplate: function () {
                    var btnFindLabor = DocumentActions.CreateElement("button");
                    btnFindLabor = DocumentActions.CreateElement("button");
                    btnFindLabor.className = "btn btn-primary btn-block addable editable";
                    btnFindLabor.innerText = _ScreenLang == "ar" ? " العمال" : "Load Labor";
                    btnFindLabor.id = "btnFindLabor";
                    btnFindLabor.type = "button";
                    btnFindLabor.onclick = function (e) {
                        btnFindLabor_onclick();
                    };
                    return HeaderTemplateNew(res.ResM_Materiallabor_labor, btnFindLabor);
                }
            },
            {
                title: res.ResM_Materiallabor_Laborname, visible: _ScreenLang == "ar",
                name: "Labor_DescA", width: "25.5%", css: JsGridHeaderCenter,
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "Labor_DescA", " ");
                    txt.id = "h_Labor_DescA";
                    txt.disabled = false;
                    return HeaderTemplateNew(res.ResM_Materiallabor_Laborname, txt);
                }
            },
            {
                title: res.ResM_Materiallabor_Laborname, visible: _ScreenLang == "en",
                name: "Labor_DescE", width: "20.5%", css: JsGridHeaderCenter,
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "Labor_DescE", " ");
                    txt.id = "h_Labor_DescE";
                    txt.disabled = false;
                    return HeaderTemplateNew(res.ResM_Materiallabor_Laborname, txt);
                }
            },
            {
                title: res.ResM_Materiallabor_overtime,
                name: "OTType_Code", width: "10.5%", css: JsGridHeaderCenter,
                headerTemplate: function () {
                    var btnFindOverTimeType = DocumentActions.CreateElement("button");
                    btnFindOverTimeType = DocumentActions.CreateElement("button");
                    btnFindOverTimeType.className = "btn btn-primary btn-block addable editable";
                    btnFindOverTimeType.innerText = _ScreenLang == "ar" ? " انواع الوقت" : "Load Types";
                    btnFindOverTimeType.id = "btnFindOverTimeType";
                    btnFindOverTimeType.type = "button";
                    btnFindOverTimeType.onclick = function (e) {
                        btnFindOverTimeType_onclick();
                    };
                    return HeaderTemplateNew(res.ResM_Materiallabor_overtime, btnFindOverTimeType);
                }
            },
            {
                title: res.ResM_Materiallabor_overtimedesc, visible: _ScreenLang == "ar",
                name: "OTType_DescA", width: "12.5%", css: JsGridHeaderCenter,
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "OTType_DescA", " ");
                    txt.id = "h_OTType_DescA";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.ResM_Materiallabor_overtimedesc, txt);
                }
            },
            {
                title: res.ResM_Materiallabor_overtimedesc, visible: _ScreenLang == "ar",
                name: "OTHourcost", width: "12.5%", css: JsGridHeaderCenter,
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "OTHourcost", " ");
                    txt.id = "h_OTHourcost";
                    txt.disabled = true;
                    txt.hidden = true;
                    return HeaderTemplateNew(res.ResM_Materiallabor_overtimedesc, txt);
                }
            },
            {
                title: res.ResM_Materiallabor_overtimedesc, visible: _ScreenLang == "en",
                name: "OTType_DescE", width: "20.5%", css: JsGridHeaderCenter,
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "OTType_DescE", " ");
                    txt.id = "h_OTType_DescE";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.ResM_Materiallabor_overtimedesc, txt);
                }
            },
            {
                title: res.ResM_Materiallabor_startdate,
                name: "StartDate", width: "11.5%", css: JsGridHeaderCenter,
                headerTemplate: function () {
                    var txt = CreateElement("date", GridInputClassName, " ", " ", "StartDate", " ");
                    txt.id = "h_StartDate";
                    txt.disabled = false;
                    return HeaderTemplateNew(res.ResM_Materiallabor_startdate, txt);
                }
            },
            {
                title: res.ResM_Materiallabor_hours,
                name: "OverTimeHours", width: "8.5%", css: JsGridHeaderCenter,
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "OverTimeHours", " ");
                    txt.id = "h_OverTimeHours";
                    txt.disabled = false;
                    return HeaderTemplateNew(res.ResM_Materiallabor_hours, txt);
                }
            },
            {
                title: res.ResM_Materiallabor_remarks,
                name: "Remarks", width: "20.5%", css: JsGridHeaderCenter,
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "Remarks", " ");
                    txt.id = "h_Remarks";
                    txt.disabled = false;
                    return HeaderTemplateNew(res.ResM_Materiallabor_remarks, txt);
                }
            },
            {
                title: "#", name: "btnAddItem", width: "50px",
                headerTemplate: function () {
                    var btn = DocumentActions.CreateElement("button");
                    btn.className = TransparentButton + " addable editable";
                    btn.type = "button";
                    btn.style.fontSize = "25px";
                    btn.style.color = "forestgreen";
                    btn.innerHTML = "<span class='glyphicon glyphicon-plus'></span>";
                    btn.id = "btnAddItemInGrid";
                    btn.onclick = function (e) {
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }
                        AddItemInOverTimeGrid();
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
                        dataSource.splice(index, 1);
                        GridParent.DataSource = dataSource;
                        GridParent.Bind();
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
                        GridParent.DataSource = dataSource;
                        GridParent.Bind();
                        //ReIndexingGrid();
                        OverTimeLabourID = item.OverTimeLabourID;
                        txtOTHourcostgrid = item.OTHourCost;
                        $("#btnFindLabor").text(item.Labor_Code);
                        $('#h_LaborID').val(item.LaborID.toString());
                        if (_ScreenLang == "ar") {
                            $("#h_Labor_DescA").val(item.Labor_DescA.toString());
                        }
                        else {
                            $("#h_Labor_DescE").val(item.Labor_DescE.toString());
                        }
                        $("#btnFindOverTimeType").text(item.OTType_Code);
                        $('#h_OverTimeTypeID').val(item.LaborOverTimeTypeID.toString());
                        if (_ScreenLang == "ar") {
                            $("#h_OTType_DescA").val(item.OTType_DescA.toString());
                        }
                        else {
                            $("#h_OTType_DescE").val(item.OTType_DescE.toString());
                        }
                        $("#h_OverTimeRate").val(item.OverTimeRate.toString());
                        $("#h_StartDate").val(item.StartDate);
                        $("#h_OverTimeHours").val(item.OverTimeHours.toString());
                        $("#h_Remarks").val(item.Remarks.toString());
                    };
                    return btn;
                }
            }
        ];
        GridParent.DataSource = dataSource;
        GridParent.Bind();
    }
    function PrintOverTime() {
        Ajax.CallAsync({
            url: Url.Action("PrintOverTime", "PrintTransaction"),
            data: { TrID: Number(Master.OverTimeID) },
            success: function (d) {
                var url = d.result;
                window.open(url, "_blank");
            }
        });
    }
    function Add() {
        txtWorkDescr.value = "";
        ChkStatus.checked = false;
        ClearGrid(GridParent, new Array());
        dataSource = new Array();
        ChkStatus.disabled = !SharedSession.CurrentPrivileges.CUSTOM1;
    }
    function Edit() {
        ChkStatus.disabled = !SharedSession.CurrentPrivileges.CUSTOM1;
    }
    function Insert() {
        debugger;
        Master = new PQ_GetResLabourOverTime();
        Assign();
        if (CheckDate(_CompCode, _BranchCode, DateFormat(txtTrDate.value)) == false) {
            WorningMessage("غير مسموح بهذا التاريخ", "This Date is not allowed");
            return;
        }
        // check for details
        MasterDetails.P_TR_ResOverTime.ProjectID = schd_ProjectID;
        MasterDetails.P_TR_ResOverTime.SiteEngineerId = null;
        MasterDetails.P_TR_ResOverTime.TrNo = null;
        //MasterDetails.P_TR_ResOverTime.ScheduleId = ScheduleId;
        //Master.ScheduleId = ScheduleId;
        MasterDetails.P_TR_ResOverTime.ScheduleId = ScheduleId;
        MasterDetails.P_TR_ResOverTime.TrDate = DateTimeFormatWithoutT(txtTrDate.value);
        MasterDetails.P_TR_ResOverTime.CreatedAt = DateFormat(new Date().toString());
        MasterDetails.P_TR_ResOverTime.CreatedBy = ClientSharedWork.Session.UserCode;
        MasterDetails.P_TR_ResOverTime.UpdatedBy = ClientSharedWork.Session.UserCode;
        //txtOTHourcostgrid = $('#h_OTHourcost').val();
        //MasterDetails.P_TR_ResOverTime.FromDate = null;
        //MasterDetails.P_TR_ResOverTime.ToDate = null;
        Master.CompCode = Number(_CompCode);
        Master.BraCode = Number(_BranchCode);
        var _Condition = " CompCode = " + _CompCode + " and BraCode = " + _BranchCode;
        MasterDetails.P_TR_ResOverTime.OverTimeID = 0;
        Ajax.Callsync({
            url: Url.Action("Insert", ControllerName),
            data: { JsonData: JSON.stringify(MasterDetails) },
            success: function (d) {
                debugger;
                var result = d.result;
                if (result.ResponseState == true) {
                    SharedSession.CurrentEnvironment.ScreenLanguage = ClientSharedWork.Session.Language;
                    ClientSharedWork.SwitchModes(ScreenModes.Query);
                    var msg = ReturnMsg("تم الحفظ بنجاح  ", "Data Saved Successfuly. ");
                    MessageBox.Show(msg, "Insert", function () {
                        var OverTime = result.ResponseData;
                        var OverTime_Index = GetIndexByUseId(result.ResponseData, "PQ_GetResLabourOverTime", "OverTimeID", _Condition);
                        NavigateToSearchResultKey(Number(OverTime_Index), Navigate);
                    });
                }
                else
                    MessageBox.Show(result.ResponseMessage, "Insert");
            }
        });
    }
    function Update() {
        debugger;
        AssignUpdate();
        UpdMasterDetails.P_TR_ResOverTime.CompCode = Number(_CompCode);
        if (CheckDate(_CompCode, _BranchCode, DateFormat(txtTrDate.value)) == false) {
            WorningMessage("غير مسموح بهذا التاريخ", "This Date is not allowed");
            return;
        }
        var _Condition = " CompCode = " + _CompCode + " and BraCode = " + _BranchCode;
        Ajax.CallAsync({
            url: Url.Action("Update", ControllerName),
            data: { JsonData: JSON.stringify(UpdMasterDetails) },
            success: function (d) {
                debugger;
                var result = d.result;
                if (result.ResponseState == true) {
                    SharedSession.CurrentEnvironment.ScreenLanguage = ClientSharedWork.Session.Language;
                    ClientSharedWork.SwitchModes(ScreenModes.Query);
                    var msg = ReturnMsg("تم التعديل بنجاح  ", "Data Updated Successfuly. ");
                    MessageBox.Show(msg, "Insert", function () {
                        Display();
                        var _Index = GetIndexByUseId(result.ResponseData, "PQ_GetResLabourOverTime", "OverTimeID", _Condition);
                        NavigateToSearchResultKey(Number(_Index), Navigate);
                    });
                }
                else {
                    MessageBox.Show(result.ResponseMessage, "Insert");
                }
            }
        });
    }
    function Assign() {
        debugger;
        DocumentActions.AssignToModel(Master);
        MasterDetails.P_TR_ResOverTime = Master;
        MasterDetails.P_TR_ResOverTime.OverTimeID = Number(Master.OverTimeID);
        if (ChkStatus.checked == true) {
            Master.Status = 1;
        }
        else {
            Master.Status = 0;
        }
        // Assign Details
        debugger;
        MasterDetails.P_TR_ResOverTimeLabour = dataSource;
        for (var _i = 0, dataSource_1 = dataSource; _i < dataSource_1.length; _i++) {
            var itm = dataSource_1[_i];
            itm.OverTimeID = Number(MasterDetails.P_TR_ResOverTime.OverTimeID);
            //itm.OTHourCost = Number(txtOTHourcostgrid);
            tbl_DataSource.push(itm);
        }
    }
    function AssignUpdate() {
        debugger;
        Master = DocumentActions.AssignToModel(Master);
        ChkStatus.checked ? Master.Status = 1 : Master.Status = 0;
        var NewMaster = new P_TR_ResOverTime();
        NewMaster.BraCode = Master.BraCode;
        NewMaster.CompCode = Master.CompCode;
        NewMaster.CreatedAt = Master.CreatedAt;
        NewMaster.CreatedAt = Master.CreatedAt;
        NewMaster.FromDate = Master.FromDate;
        NewMaster.OverTimeID = Master.OverTimeID;
        NewMaster.ProjectID = Master.ProjectID;
        NewMaster.Remarks = Master.Remarks;
        NewMaster.ScheduleId = Master.ScheduleId;
        NewMaster.SiteEngineerId = Master.SiteEngineerId;
        NewMaster.Status = Master.Status;
        NewMaster.ToDate = Master.ToDate;
        NewMaster.TrDate = Master.TrDate;
        NewMaster.TrNo = Master.TrNo;
        NewMaster.UpdatedAt = Master.UpdatedAt;
        NewMaster.UpdatedBy = Master.UpdatedBy;
        UpdMasterDetails.P_TR_ResOverTime = NewMaster;
        // assign Details
        UpdMasterDetails.P_TR_ResOverTimeLabour = dataSource;
        for (var _i = 0, dataSource_2 = dataSource; _i < dataSource_2.length; _i++) {
            var itm = dataSource_2[_i];
            itm.OverTimeID = Master.OverTimeID;
            itm.OTHourCost = Number(txtOTHourcostgrid);
            tbl_DataSource.push(itm);
        }
    }
    function butTrNo_Click() {
        var _Condition = " CompCode = " + _CompCode + " and BraCode = " + _BranchCode;
        sys.FindKey(Modules.OverTimeSheet, "butTrNo", _Condition, function () {
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetResLabourOverTimeByID", ControllerName),
                data: { id: _Id },
                success: function (d) {
                    Master = d.result;
                    txtTrNo.value = Master.TrNo.toString();
                    var _Index = Number(Master.OverTimeID);
                    var ind = GetIndexByUseId(Number(Master.OverTimeID), "PQ_GetResLabourOverTime", "OverTimeID", _Condition);
                    NavigateToSearchResultKey(Number(ind), Navigate);
                }
            });
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
        debugger;
        DocumentActions.RenderFromModel(Master);
        if (Master.Status == 1)
            ControlsButtons.EditButton.disabled = true;
        else
            ControlsButtons.EditButton.disabled = !SharedSession.CurrentPrivileges.EDIT;
        if (Master.Status == 1 && SharedSession.CurrentPrivileges.CUSTOM2) {
            ChkStatus.disabled = false;
        }
        else
            ChkStatus.disabled = true;
        GetLabourOverTimeDetailsList(Master.OverTimeID);
        txtTrDate.value = DateFormat(Master.TrDate);
        txtFromDate.value = DateFormat(Master.FromDate);
        txtToDate.value = DateFormat(Master.ToDate);
        ScheduleId = Master.ScheduleId;
    }
    function GetLabourOverTimeDetailsList(OverTimeID) {
        Ajax.CallAsync({
            url: Url.Action("GetLabourOverTimeDetailsList", ControllerName),
            data: { id: OverTimeID },
            success: function (d) {
                dataSource = d.result;
                for (var i = 0; i < dataSource.length; i++) {
                    dataSource[i].StartDate = DateFormat(dataSource[i].StartDate);
                }
                GridParent.DataSource = dataSource;
                GridParent.Bind();
            }
        });
    }
    function Opentr() {
        if (ClientSharedWork.CurrentMode == ScreenModes.Query && Master.Status == 1 && ChkStatus.checked == false)
            Update();
    }
    function btnSearchLaborOT_Click() {
        var _Condition = " CompCode = " + _CompCode + " and BraCode = " + _BranchCode;
        sys.FindKey(Modules.OverTimeSheet, "btnSearchLaborOT", _Condition, function () {
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetLabourOverTime", ControllerName),
                data: { id: _Id },
                success: function (d) {
                    MasterDetails = d.result;
                    Master = d.result;
                    var _Index = GetIndexByUseId(Number(Master.OverTimeID), "PQ_GetResLabourOverTime", "OverTimeID", "CompCode = " + _CompCode + " and BraCode = " + _BranchCode);
                    NavigateToSearchResultKey(Number(_Index), Navigate);
                }
            });
        });
    }
    function SearchLaborOT_Changed() {
        var trno = Number(txtTrNo.value);
        Ajax.CallAsync({
            url: Url.Action("getOverTimeViewByNo", "FindByNo"),
            data: { trno: trno },
            success: function (d) {
                if (IsNullOrEmpty(d.result)) {
                    WorningMessage("الرمز خطأ، أعد المحاولة .... ", "Wrong Code , .. Retry .. ");
                    window.open(Url.Action(ControllerName + "Index", ControllerName), "_self");
                }
                MasterDetails = d.result;
                Master = d.result;
                var _Index = GetIndexByUseId(Number(Master.OverTimeID), "PQ_GetResLabourOverTime", "OverTimeID", "CompCode = " + _CompCode + " and BraCode = " + _BranchCode);
                NavigateToSearchResultKey(Number(_Index), Navigate);
            }
        });
    }
    function btnSearchSchdule_Click() {
        sys.FindKey(Modules.OverTimeSheet, "btnSearchSchdule", "CompCode = " + _CompCode + " and BraCode = " + _BranchCode, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getEngSchedule", ControllerName),
                data: { id: id },
                success: function (d) {
                    debugger;
                    var schadule = d.result;
                    ScheduleId = schadule.ScheduleId;
                    txtWorkDescr.value = schadule.TrNo.toString();
                    txtPrj_ProjectCode.value = schadule.Prj_ProjectCode;
                    txtPrj_DescE.value = schadule.Prj_DescE;
                    txtPhase_ProjectPhaseCode.value = schadule.Phase_ProjectPhaseCode;
                    txtPhase_DescE.value = schadule.Phase_DescE;
                    txtFromDate.value = DateFormat(schadule.StartDateTime);
                    txtToDate.value = DateFormat(schadule.EndDateTime);
                    schd_ProjectID = schadule.ProjectID;
                    //schd_siteengid = schadule.id
                    schd_ProjectPhaseId = schadule.ProjectPhaseId;
                    dataSource = new Array();
                    ClearGrid(GridParent, dataSource);
                }
            });
        });
    }
    function SearchSchdule_Changed() {
        var trno = Number(txtWorkDescr.value);
        Ajax.CallAsync({
            url: Url.Action("getEngScheduleViewByNo", "FindByNo"),
            data: { trno: trno },
            success: function (d) {
                debugger;
                if (IsNullOrEmpty(d.result)) {
                    var schadule_1 = d.result;
                    ScheduleId = 0;
                    txtWorkDescr.value = "";
                    txtPrj_ProjectCode.value = "";
                    txtPrj_DescE.value = "";
                    txtPhase_ProjectPhaseCode.value = "";
                    txtPhase_DescE.value = "";
                    txtFromDate.value = "";
                    txtToDate.value = "";
                    schd_ProjectID = 0;
                    //schd_siteengid = schadule.id
                    schd_ProjectPhaseId = 0;
                    dataSource = new Array();
                    ClearGrid(GridParent, dataSource);
                    WorningMessage("الرمز خطأ، أعد المحاولة .... ", "Wrong Code , .. Retry .. ");
                    return;
                }
                var schadule = d.result;
                ScheduleId = schadule.ScheduleId;
                txtWorkDescr.value = schadule.TrNo.toString();
                txtPrj_ProjectCode.value = schadule.Prj_ProjectCode;
                txtPrj_DescE.value = schadule.Prj_DescE;
                txtPhase_ProjectPhaseCode.value = schadule.Phase_ProjectPhaseCode;
                txtPhase_DescE.value = schadule.Phase_DescE;
                txtFromDate.value = DateFormat(schadule.StartDateTime);
                txtToDate.value = DateFormat(schadule.EndDateTime);
                schd_ProjectID = schadule.ProjectID;
                //schd_siteengid = schadule.id
                schd_ProjectPhaseId = schadule.ProjectPhaseId;
                dataSource = new Array();
                ClearGrid(GridParent, dataSource);
            }
        });
    }
    function butProj_Code_Click() {
        var _Condition = " CompCode = " + _CompCode + " and BraCode = " + _BranchCode;
        sys.FindKey(Modules.OverTimeSheet, "butProj_Code", _Condition, function () {
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetProjectByID", ControllerName),
                data: { id: _Id },
                success: function (d) {
                    Master = d.result;
                    var Index = GetIndexByUseId(Number(Master.OverTimeID), "PQ_GetResLabourOverTime", "OverTimeID", "CompCode = " + _CompCode + " and BraCode = " + _BranchCode);
                    NavigateToSearchResultKey(Number(Index), Navigate);
                }
            });
        });
    }
    function AddItemInOverTimeGrid() {
        DetailsOverTime = new PQ_GetResLabourOverTimeDetail();
        DetailsOverTime.OTHourCost = txtOTHourcostgrid;
        DetailsOverTime.OverTimeLabourID = OverTimeLabourID;
        DetailsOverTime.Labor_Code = $('#btnFindLabor').text();
        DetailsOverTime.LaborID = Number($('#h_LaborID').val());
        DetailsOverTime.Labor_DescA = $('#h_Labor_DescA').val();
        DetailsOverTime.Labor_DescE = $('#h_Labor_DescE').val();
        DetailsOverTime.OTType_Code = $('#btnFindOverTimeType').text();
        DetailsOverTime.LaborOverTimeTypeID = Number($('#h_OverTimeTypeID').val());
        DetailsOverTime.OverTimeRate = $('#h_OverTimeRate').val();
        DetailsOverTime.OTType_DescA = $('#h_OTType_DescA').val();
        DetailsOverTime.OTType_DescE = $('#h_OTType_DescE').val();
        var ST_Date = $('#h_StartDate').val();
        //let SDate = new Date(DateTimeFormat(Model.ToDate));
        //let Hs_SDate = (SDate.getHours() < 10 ? '0' + SDate.getHours() : SDate.getHours());
        //let Ms_SDate = (SDate.getMonth() < 10 ? '0' + SDate.getMonth() : SDate.getMonth());
        var headerToDate = DateFormat(Master.ToDate);
        //let F_Date = new Date(DateTimeFormat(Model.FromDate));
        //let HF_Date = (F_Date.getHours() < 10 ? '0' + F_Date.getHours() : F_Date.getHours());
        //let MF_Date = (F_Date.getMonth() < 10 ? '0' + F_Date.getMonth() : F_Date.getMonth());
        var headerFromDate = DateFormat(Master.FromDate); // HF_Date + ':' + MF_Date;
        //if (ST_Date > headerToDate || ST_Date < headerFromDate) {
        //    //SharedSession.CurrentEnvironment.ScreenLanguage = ClientSharedWork.Session.Language;
        //    WorningMessage("التاريخ يجب ان يكون بين من والى كما فوق  ", "StartDate must be between FromDate to ToDate as in header");
        //    return;
        //}
        DetailsOverTime.StartDate = $('#h_StartDate').val();
        DetailsOverTime.OverTimeHours = $('#h_OverTimeHours').val();
        DetailsOverTime.Remarks = $('#h_Remarks').val();
        // check if item found in Grid 
        //for (var i = 0; i < DataSource.length; i++) {
        //    if (DataSource[i].ScopeId == DetailsAssignHeaderCabdidateScope.ScopeId) {
        //        WorningMessage("موجود برجاء اختيار اخر  ", "Scope Found before Please Select another Scope ");
        //        return;
        //    }
        //}
        dataSource.unshift(DetailsOverTime);
        GridParent.DataSource = dataSource;
        GridParent.Bind();
    }
    function btnFindLabor_onclick() {
        if (isNaN(ScheduleId)) {
            WorningMessage("يجب اختيار سكادول اولا", "You Should choose Schadule First");
            return;
        }
        sys.FindKey(Modules.OverTimeSheet, "btnFindLabor", " ScheduleId = " + ScheduleId, function () {
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetLaborByID", ControllerName),
                data: { id: _Id },
                success: function (d) {
                    var result = d.result;
                    //overtimehourcost = result.Lab_HourCost
                    debugger;
                    txtOTHourcostgrid = result.Lab_HourCost;
                    $('#btnFindLabor').text(result.Lab_LabCode);
                    $('#h_LaborID').val(result.LaborID);
                    if (_ScreenLang == "ar") {
                        $("#h_Labor_DescA").val(result.Lab_DescA.toString());
                    }
                    else {
                        $("#h_Labor_DescE").val(result.Lab_DescE.toString());
                    }
                    //$('#h_OverTimeHours').val(result.);
                }
            });
        });
    }
    function btnFindOverTimeType_onclick() {
        sys.FindKey(Modules.OverTimeSheet, "btnFindOverTimeType", "", function () {
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetOverTimeTypeByID", ControllerName),
                data: { id: _Id },
                success: function (d) {
                    var result = d.result;
                    $('#btnFindOverTimeType').text(result.OverTimeCode);
                    $('#h_OverTimeTypeID').val(result.LaborOverTimeTypeID);
                    if (_ScreenLang == "ar") {
                        $("#h_OTType_DescA").val(result.DescA.toString());
                    }
                    else {
                        $("#h_OTType_DescE").val(result.DescE.toString());
                    }
                    $('#h_OverTimeRate').val(result.Rate);
                }
            });
        });
    }
})(OverTimeSheet || (OverTimeSheet = {}));
//# sourceMappingURL=OverTimeSheet.js.map