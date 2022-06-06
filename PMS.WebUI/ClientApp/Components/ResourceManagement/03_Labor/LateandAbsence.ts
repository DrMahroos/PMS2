$(document).ready(() => {
    LateandAbsence.InitalizeComponent();
});

namespace LateandAbsence {
    var txtAbsenceID: HTMLInputElement;
    var txtTrNo: HTMLInputElement;
    var butTrNo: HTMLButtonElement;
    var butTrNo: HTMLButtonElement;
    var txtTrDate: HTMLInputElement;
    var txtSiteEngineerId: HTMLInputElement;
    var txtEng_Code: HTMLInputElement;
    var btnSearchAbsence: HTMLButtonElement;
    var btnSearchSchadule: HTMLButtonElement;
    var txtEng_Desc: HTMLInputElement;
    var txtProjectID: HTMLInputElement;
    var txtPrj_ProjectCode: HTMLInputElement;
    var txtPrj_DescE: HTMLInputElement;
    var txtPhase_ProjectPhaseCode: HTMLInputElement;
    var txtPhase_DescE: HTMLInputElement;
    var txtStartDateTime: HTMLInputElement;
    var txtEndDateTime: HTMLInputElement;
    var txtRemarks: HTMLInputElement;
    var txtWorkDescr: HTMLInputElement;
    var ChkStatus: HTMLInputElement;

    const ControllerName: string = "LateandAbsence";
    const GridInputClassName = "form-control gridIput";
    var Master: PQ_GetResLabourAbsence = new PQ_GetResLabourAbsence();
    //var Model: PQ_GetResLabourAbsence = new PQ_GetResLabourAbsence();
    class M_D_LabourAbsenceDetails {
        public P_TR_ResAbsence: P_TR_ResAbsence;
        public P_TR_ResAbsenceLabour: Array<P_TR_ResAbsenceLabour>;
    }
    var tbl_DataSource: Array<PQ_GetResLabourAbsenceDetail> = new Array<PQ_GetResLabourAbsenceDetail>();
    var MasterDetails: M_D_LabourAbsenceDetails = new M_D_LabourAbsenceDetails();
    var DetailsAbsence: PQ_GetResLabourAbsenceDetail = new PQ_GetResLabourAbsenceDetail();
    var dataSource: Array<PQ_GetResLabourAbsenceDetail> = new Array<PQ_GetResLabourAbsenceDetail>();
    var GridParent: JsGrid = new JsGrid();
    var sys: SystemTools = new SystemTools();

    var _ScreenLang;
    var _CompCode;
    var _BranchCode;
    var ScheduleId: number;
    var schd_ProjectID: number;
    var schd_ProjectPhaseId: number;
    var AbsenceLabourID: number;
    var txtLatehourcostgrid: number;
    var txtAbsHourcostgrid: number;
    export function InitalizeComponent() {
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
        ControlsButtons.SaveAction(
            () => {
                if (ClientSharedWork.CurrentMode == ScreenModes.Add)
                    Insert();
                else if (ClientSharedWork.CurrentMode == ScreenModes.Edit)
                    Update();
            }
        );

        ControlsButtons.PrintAction(() => { PrintLateandAbsence(); });
        $("#ImageEditorButton").on("click", () => {
            sys.ImgPopup(_CompCode, _BranchCode, Modules.LateandAbsence, Master.AbsenceID.toString());
        });
    }
    function InitalizeControls() {

        txtAbsenceID = DocumentActions.GetElementById<HTMLInputElement>("txtAbsenceID");
        txtTrNo = DocumentActions.GetElementById<HTMLInputElement>("txtTrNo");
        butTrNo = DocumentActions.GetElementById<HTMLButtonElement>("butTrNo");

        txtTrDate = DocumentActions.GetElementById<HTMLInputElement>("txtTrDate");

        //Site Engineer
        txtSiteEngineerId = DocumentActions.GetElementById<HTMLInputElement>("txtSiteEngineerId");
        txtEng_Code = DocumentActions.GetElementById<HTMLInputElement>("txtEng_Code");
        btnSearchAbsence = DocumentActions.GetElementById<HTMLButtonElement>("btnSearchAbsence");
        btnSearchSchadule = DocumentActions.GetElementById<HTMLButtonElement>("btnSearchSchadule");
        txtEng_Desc = DocumentActions.GetElementById<HTMLInputElement>("txtEng_Desc");

        //Project
        txtProjectID = DocumentActions.GetElementById<HTMLInputElement>("txtProjectID");
        txtPrj_ProjectCode = DocumentActions.GetElementById<HTMLInputElement>("txtPrj_ProjectCode");
        //butProj_Code = DocumentActions.GetElementById<HTMLButtonElement>("butProj_Code");
        txtPrj_DescE = DocumentActions.GetElementById<HTMLInputElement>("txtPrj_DescE");
        txtPhase_ProjectPhaseCode = DocumentActions.GetElementById<HTMLInputElement>("txtPhase_ProjectPhaseCode");
        txtPhase_DescE = DocumentActions.GetElementById<HTMLInputElement>("txtPhase_DescE");
        txtWorkDescr = DocumentActions.GetElementById<HTMLInputElement>("txtWorkDescr");


        txtStartDateTime = DocumentActions.GetElementById<HTMLInputElement>("txtStartDateTime");
        txtEndDateTime = DocumentActions.GetElementById<HTMLInputElement>("txtEndDateTime");
        txtRemarks = DocumentActions.GetElementById<HTMLInputElement>("txtRemarks");

        ChkStatus = DocumentActions.GetElementById<HTMLInputElement>("ChkStatus");
        //ChkUnauthorize = DocumentActions.GetElementById<HTMLInputElement>("ChkUnauthorize");
    }
    function InitalizeEvents() {
        //butTrNo.onclick = butTrNo_Click;
        btnSearchAbsence.onclick = btnSearchAbsence_Click;
        btnSearchSchadule.onclick = btnSearchSchdule_Click;
        //butProj_Code.onclick = butProj_Code_Click;
        txtTrNo.onchange = SearchAbsence_Changed;
        txtWorkDescr.onchange = SearchSchdule_Changed;
        ChkStatus.onchange = Opentr; 
    }
    function InitalizeGrid() {
        let res: any = GetResourceList("ResM_Materiallabor");
        GridParent.ElementName = "GridParent";
        GridParent.Inserting = SharedSession.CurrentPrivileges.AddNew;
        GridParent.OnRefreshed = () => {
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
                headerTemplate: (): HTMLElement => {
                    let btnFindLabor: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btnFindLabor = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btnFindLabor.className = "btn btn-primary btn-block addable editable";
                    btnFindLabor.innerText = _ScreenLang == "ar" ? " العمال" : "Load Labor";
                    btnFindLabor.id = "btnFindLabor";
                    btnFindLabor.type = "button";
                    btnFindLabor.onclick = (e) => {
                        btnFindLabor_onclick();
                    };
                    return HeaderTemplateNew(res.ResM_Materiallabor_labor, btnFindLabor);
                }

            },
            {
                title: res.ResM_Materiallabor_Laborname, visible: _ScreenLang == "ar",
                name: "Labor_DescA", width: "35.5%", css: JsGridHeaderCenter,
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "Labor_DescA", " ");
                    txt.id = "h_Labor_DescA"
                    txt.disabled = false;
                    return HeaderTemplateNew(res.ResM_Materiallabor_Laborname, txt);
                }
            }
            ,
            {
                title: res.ResM_Materiallabor_Laborname, visible: _ScreenLang == "en",
                name: "Labor_DescE", width: "20.5%", css: JsGridHeaderCenter,
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "Labor_DescE", " ");
                    txt.id = "h_Labor_DescE"
                    txt.disabled = false;
                    return HeaderTemplateNew(res.ResM_Materiallabor_Laborname, txt);
                }
            }
            ,
            {
                title: res.ResM_Materiallabor_Absence,
                name: "AbsenceType_Code", width: "10.5%", css: JsGridHeaderCenter,
                headerTemplate: (): HTMLElement => {
                    let btnFindAbsenceType: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btnFindAbsenceType = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btnFindAbsenceType.className = "btn btn-primary btn-block addable editable";
                    btnFindAbsenceType.innerText = _ScreenLang == "ar" ? " انواع الوقت" : "Load Types";
                    btnFindAbsenceType.id = "btnFindAbsenceType";
                    btnFindAbsenceType.type = "button";
                    btnFindAbsenceType.onclick = (e) => {
                        btnFindAbsenceType_onclick();
                    };
                    return HeaderTemplateNew(res.ResM_Materiallabor_Absence, btnFindAbsenceType);
                }
            }
            ,
            {
                title: res.ResM_Materiallabor_Absencedec, visible: _ScreenLang == "ar",
                name: "AbsenceType_DescA", width: "15.5%", css: JsGridHeaderCenter,
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "AbsenceType_DescA", " ");
                    txt.id = "h_AbsenceType_DescA"
                    txt.disabled = true;
                    return HeaderTemplateNew(res.ResM_Materiallabor_Absencedec, txt);
                }
            }
            ,
            {
                title: res.ResM_Materiallabor_Absencedec, visible: _ScreenLang == "en",
                name: "AbsenceType_DescE", width: "25.5%", css: JsGridHeaderCenter,
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "AbsenceType_DescE", " ");
                    txt.id = "h_AbsenceType_DescE"
                    txt.disabled = true;
                    return HeaderTemplateNew(res.ResM_Materiallabor_Absencedec, txt);
                }
            }
            ,
            {
                title: res.ResM_Materiallabor_date,
                name: "StartDate", width: "13%", css: JsGridHeaderCenter,
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("Date", GridInputClassName, " ", " ", "StartDate", " ");
                    txt.id = "h_StartDate"
                    txt.disabled = false;
                    return HeaderTemplateNew(res.ResM_Materiallabor_date, txt);
                }
            }
            ,
            {
                title: res.ResM_Materiallabor_IsAbsence, visible: false, css: JsGridHeaderCenter, name: "IsAbsence", width: "7.5%",
                headerTemplate: (): HTMLElement => {
                    let SelectList = CreateListYesOrNo();
                    SelectList.id = "H_DropAbsence";
                    return HeaderTemplateNew(res.ResM_Materiallabor_IsAbsence, SelectList);
                },
                itemTemplate: (index: string, item: PQ_GetResLabourAbsenceDetail): HTMLElement => {
                    let lbl = DocumentActions.CreateElement<HTMLLabelElement>("label");
                    lbl.innerText = item.IsAbsence == true ? "Yes" : "No";
                    return lbl;
                }
            }
            ,
            {
                title: res.ResM_Materiallabor_absdays,
                name: "AbsenceDays", width: "8.5%", css: JsGridHeaderCenter,
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "AbsenceDays", " ");
                    txt.id = "h_AbsenceDays"
                    txt.disabled = false;
                    return HeaderTemplateNew(res.ResM_Materiallabor_absdays, txt);
                }
            }
            ,
            {
                title: res.ResM_Materiallabor_latehour,
                name: "LateHours", width: "7.5%", css: JsGridHeaderCenter,
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "LateHours", " ");
                    txt.id = "h_LateHours"
                    txt.disabled = false;
                    return HeaderTemplateNew(res.ResM_Materiallabor_latehour, txt);
                }
            }
            ,
            {
                title: res.ResM_Materiallabor_overtimedesc, visible: _ScreenLang == "ar",
                name: "LateHourCost", width: "12.5%", css: JsGridHeaderCenter,
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "LateHourCost", " ");
                    txt.id = "h_LateHourscost"
                    txt.disabled = true;
                    txt.hidden = true;

                    return HeaderTemplateNew(res.ResM_Materiallabor_overtimedesc, txt);
                }
            }
            ,
            {
                title: res.ResM_Materiallabor_overtimedesc, visible: _ScreenLang == "ar",
                name: "AbsDayCost", width: "12.5%", css: JsGridHeaderCenter,
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "AbsDayCost", " ");
                    txt.id = "h_AbsDayCost"
                    txt.disabled = true;
                    txt.hidden = true;

                    return HeaderTemplateNew(res.ResM_Materiallabor_overtimedesc, txt);
                }
            }
            ,
            {
                title: res.ResM_Materiallabor_remarks,
                name: "Remarks", width: "24.5%", css: JsGridHeaderCenter,
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "Remarks", " ");
                    txt.id = "h_Remarks"
                    txt.disabled = false;
                    return HeaderTemplateNew(res.ResM_Materiallabor_remarks, txt);
                }
            }
            ,
            {
                title: "#", name: "btnAddItem", width: "50px",
                headerTemplate: (): HTMLElement => {
                    let btn: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btn.className = TransparentButton + " addable editable";
                    btn.type = "button";
                    btn.style.fontSize = "25px";
                    btn.style.color = "forestgreen";
                    btn.innerHTML = "<span class='glyphicon glyphicon-plus'></span>";
                    btn.id = "btnAddItemInGrid";
                    btn.onclick = (e) => {
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }

                        AddItemInAbsenceGrid();
                    };
                    return btn;
                },
                // HANDLE DELETE Row in Grid
                itemTemplate: (s: string, item: PQ_GetResLabourAbsenceDetail): HTMLButtonElement => {
                    let btn: HTMLInputElement = DocumentActions.CreateElement<HTMLInputElement>("button");
                    btn.innerHTML = "<i class='glyphicon glyphicon-remove'></i>";
                    btn.type = "button";
                    btn.className = TransparentButton + " addable editable";
                    btn.style.fontSize = "24px";
                    btn.style.color = "red";

                    btn.name = dataSource.indexOf(item).toString();
                    btn.onclick = (e) => {
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }
                        let index_id = (e.currentTarget as HTMLButtonElement).id;
                        let index = Number((e.currentTarget as HTMLButtonElement).name);
                        dataSource.splice(index, 1);
                        GridParent.DataSource = dataSource;
                        GridParent.Bind();
                    };
                    return btn;
                }
            }
            ,
            // edit to Grid 
            {
                css: JsGridHeaderCenter,
                width: "50px",
                itemTemplate: (s: string, item: PQ_GetResLabourAbsenceDetail): HTMLButtonElement => {
                    let btn: HTMLInputElement = DocumentActions.CreateElement<HTMLInputElement>("button");
                    btn.innerHTML = "<i class='glyphicon glyphicon-pencil'></i>";
                    btn.type = "button";
                    btn.className = TransparentButton + " addable editable";
                    btn.style.fontSize = "20px";
                    btn.style.color = "forestgreen";
                    btn.name = dataSource.indexOf(item).toString();
                    btn.onclick = (e) => {
                        let index = Number((e.currentTarget as HTMLButtonElement).name);
                        dataSource.splice(index, 1);
                        GridParent.DataSource = dataSource;
                        GridParent.Bind();

                        AbsenceLabourID = item.AbsenceLabourID;
                        debugger;
                        txtLatehourcostgrid = item.LateHourCost ;
                        txtAbsHourcostgrid = item.AbsDayCost;

                        $("#btnFindLabor").text(item.Labor_Code);
                        $('#h_LaborID').val(item.LaborID.toString());
                        if (_ScreenLang == "ar") {
                            $("#h_Labor_DescA").val(item.Labor_DescA);
                        }
                        else {
                            $("#h_Labor_DescE").val(item.Labor_DescE);
                        }
                        $("#btnFindAbsenceType").text(item.AbsenceType_Code);
                        $('#h_AbsenceTypeID').val(item.LaborAbsenceTypeID.toString());
                        if (_ScreenLang == "ar") {
                            $("#h_AbsenceType_DescA").val(item.AbsenceType_DescA);
                        }
                        else {
                            $("#h_AbsenceType_DescE").val(item.AbsenceType_DescE);
                        }
                        //////H_DropAbsence////////////////////

                        if (item.IsAbsence == false) {
                            $("#H_DropAbsence").val("0");
                        }
                        else {
                            $("#H_DropAbsence").val("1");
                        }
                        $("#h_StartDate").val(item.StartDate);
                        if (item.AbsenceDays == null) {
                            $("#h_AbsenceDays").val(0);
                        }
                        else {
                            $("#h_AbsenceDays").val(item.AbsenceDays.toString());
                        }
                        if (item.LateHours == null) {
                            $("#h_LateHours").val(0);
                        }
                        else {
                            $("#h_LateHours").val(item.LateHours.toString());
                        }

                        $("#h_Remarks").val(item.Remarks.toString());
                    };
                    return btn;
                }
            }
        ];
        GridParent.DataSource = dataSource;
        GridParent.Bind();
    }
    function Add() {
        txtWorkDescr.value = "";
        ChkStatus.checked = false;
        ClearGrid(GridParent, new Array<Number>());
        dataSource = new Array<PQ_GetResLabourAbsenceDetail>();
        ChkStatus.disabled = !SharedSession.CurrentPrivileges.CUSTOM1;
    }

    function Undo() {

    }

    function PrintLateandAbsence() {


        Ajax.CallAsync({
            url: Url.Action("PrintLateandAbsence", "PrintTransaction"),
            data: { TrID: Number(Master.AbsenceID) },
            success: (d) => {
                let url = d.result as string;
                window.open(url, "_blank");
            }
        });

    }

    function Edit() {
        ChkStatus.disabled = !SharedSession.CurrentPrivileges.CUSTOM1;
    }
    function Insert() {
        debugger;
        Master = new PQ_GetResLabourAbsence();
        Assign();
        if (CheckDate(_CompCode, _BranchCode, Master.TrDate) == false) {
            WorningMessage("غير مسموح بهذا التاريخ", "This date is not allowed");
            return;
        }
        // check for details
        let _Condition = " CompCode = " + _CompCode + " and BraCode = " + _BranchCode;
        Master.CompCode = Number(_CompCode);
        Master.BraCode = Number(_BranchCode);
        Master.ScheduleId = ScheduleId;
        MasterDetails.P_TR_ResAbsence.ProjectID = schd_ProjectID;
        MasterDetails.P_TR_ResAbsence.ScheduleId = ScheduleId;
        debugger;
        //txtLatehourcostgrid = $('#h_LateHourscost').val();
        //txtAbsHourcostgrid = $('#h_AbsHourcostcost').val();
        Ajax.CallAsync({
            url: Url.Action("Insert", ControllerName),
            data: {
                JsonData: JSON.stringify(MasterDetails)
            },
            success: (d) => {
                let result = d.result as ResponseResult;
                if (result.ResponseState == true) {
                    ClientSharedWork.SwitchModes(ScreenModes.Query);
                    let msg: string = ReturnMsg("تم الحفظ بنجاح  ", "Data Saved Successfuly. ");
                    MessageBox.Show(msg, "Insert", () => {

                        let Absence = result.ResponseData as PQ_GetResLabourAbsence;
                        let Absence_Index = GetIndexByUseId(result.ResponseData, "PQ_GetResLabourAbsence", "AbsenceID", _Condition);
                        NavigateToSearchResultKey(Number(Absence_Index), Navigate);
                    });
                }
                else
                    MessageBox.Show(result.ResponseMessage, "Insert");
            }
        });
    }
    function Assign() {
        debugger;
        Master = DocumentActions.AssignToModel<PQ_GetResLabourAbsence>(Master);
        MasterDetails.P_TR_ResAbsence = Master as P_TR_ResAbsence;
        MasterDetails.P_TR_ResAbsence.AbsenceID = Master.AbsenceID;
        ChkStatus.checked ? Master.Status = 1 : Master.Status = 0;
        // assign Details

        MasterDetails.P_TR_ResAbsenceLabour = dataSource as Array<P_TR_ResAbsenceLabour>;
        for (var itm of dataSource) {
            debugger;
            itm.AbsenceID = Master.AbsenceID;
            //itm.LateHours = Number(txtLatehourcostgrid);
            //itm.AbsDayCost = Number(txtLatehourcostgrid);
            tbl_DataSource.push(itm);
        }
    }
    function Update() {

        AssignUpdate();

        Master.CompCode = Number(_CompCode);
        if (CheckDate(_CompCode, _BranchCode, Master.TrDate) == false) {
            WorningMessage("غير مسموح بهذا التاريخ", "This date is not allowed");
            return;
        }
        let _Condition = " CompCode = " + _CompCode + " and BraCode = " + _BranchCode;
        Ajax.CallAsync({
            url: Url.Action("Update", ControllerName),
            data: { JsonData: JSON.stringify(MasterDetails) },
            success: (d) => {
                let result = d.result as ResponseResult;
                if (result.ResponseState == true) {
                    ClientSharedWork.SwitchModes(ScreenModes.Query);
                    let msg: string = ReturnMsg("تم التعديل بنجاح  ", "Data Updated Successfuly. ");
                    MessageBox.Show(msg, "Insert", () => {
                        Display();
                        let _Index = GetIndexByUseId(result.ResponseData, "PQ_GetResLabourAbsence", "AbsenceID", _Condition);
                        NavigateToSearchResultKey(Number(_Index), Navigate);
                    });
                }
                else {
                    MessageBox.Show(result.ResponseMessage, "Insert");
                }
            }
        })
    }
    function AssignUpdate() {
        Master = DocumentActions.AssignToModel<PQ_GetResLabourAbsence>(Master);
        MasterDetails.P_TR_ResAbsence = Master as P_TR_ResAbsence;
        MasterDetails.P_TR_ResAbsence.AbsenceID = Master.AbsenceID;
        // check authorize 
        ChkStatus.checked ? Master.Status = 1 : Master.Status = 0;
        // assign Details

        MasterDetails.P_TR_ResAbsenceLabour = dataSource as Array<P_TR_ResAbsenceLabour>;
        for (var itm of dataSource) {
            itm.AbsenceID = Master.AbsenceID;
            //itm.LateHourCost = Number(txtLatehourcostgrid);

            tbl_DataSource.push(itm);
        }
    }
    function butTrNo_Click() {
        let _Condition = " CompCode = " + _CompCode + " and BraCode = " + _BranchCode;
        sys.FindKey(Modules.LateandAbsence, "butTrNo", _Condition, () => {
            let _Id: number = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetResLabourAbsenceByID", ControllerName),
                data: { id: _Id },
                success: (d) => {
                    Master = d.result as PQ_GetResLabourAbsence;
                    txtTrNo.value = Master.TrNo.toString();
                    let _Index: number = Number(Master.AbsenceID);
                    let ind = GetIndexByUseId(Number(Master.AbsenceID), "PQ_GetResLabourAbsence", "AbsenceID", _Condition)
                    NavigateToSearchResultKey(Number(ind), Navigate);
                }
            });
        })
    }
    function Navigate() {

        Ajax.CallAsync({
            url: Url.Action("GetByIndex", ControllerName),
            success: (d) => {

                Master = d.result as PQ_GetResLabourAbsence;
                Display();
            }
        })
    }
    function Display() {
        debugger;
        DocumentActions.RenderFromModel(Master);
        if (Master.Status == 1) {
            ControlsButtons.EditButton.disabled = true;
        }
        else {
            ControlsButtons.EditButton.disabled = false;
        }
        if (Master.Status == 1 && SharedSession.CurrentPrivileges.CUSTOM2) {

            ChkStatus.disabled = false;

        } else
            ChkStatus.disabled = true;

        GetLabourAbsenceDetailsList(Master.AbsenceID);
        txtTrDate.value = DateFormat(Master.TrDate);
        txtStartDateTime.value = DateFormat(Master.FromDate);
        txtEndDateTime.value = DateFormat(Master.ToDate);
        ScheduleId = Master.ScheduleId;
    }
    function GetLabourAbsenceDetailsList(AbsenceID: number) {
        Ajax.CallAsync({
            url: Url.Action("GetLabourAbsenceDetailsList", ControllerName),
            data: { id: AbsenceID },
            success: (d) => {
                dataSource = d.result as Array<PQ_GetResLabourAbsenceDetail>;
                for (var i = 0; i < dataSource.length; i++) {
                    dataSource[i].StartDate = DateFormat(dataSource[i].StartDate);
                }
                GridParent.DataSource = dataSource;
                GridParent.Bind();
            }
        });
    }
    function btnSearchAbsence_Click() {
        let _Condition = " CompCode = " + _CompCode + " and BraCode = " + _BranchCode;
        sys.FindKey(Modules.LateandAbsence, "btnSearchAbsence", _Condition, () => {
            let id: number = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetLabourAbsenceByID", ControllerName),
                data: { id: id },
                success: (d) => {

                    Master = d.result as PQ_GetResLabourAbsence;
                    txtTrNo.value = Master.TrNo.toString();
                    let _Index: number = Number(Master.AbsenceID);
                    let ind = GetIndexByUseId(Number(Master.AbsenceID), "PQ_GetResLabourAbsence", "AbsenceID", _Condition);
                    NavigateToSearchResultKey(Number(ind), Navigate);
                }
            });
        })
    }
    function SearchAbsence_Changed() {
        let _Condition = " CompCode = " + _CompCode + " and BraCode = " + _BranchCode;
        var trno = Number(txtTrNo.value);

            Ajax.CallAsync({
                url: Url.Action("getAbsenceViewByNo", "FindByNo"),
                data: { trno: trno },
                success: (d) => {
                    if (IsNullOrEmpty(d.result)) {
                        WorningMessage("الرمز خطأ، أعد المحاولة .... ", "Wrong Code , .. Retry .. ")
                        window.open(Url.Action(ControllerName + "Index", ControllerName), "_self");

                    }
                    Master = d.result as PQ_GetResLabourAbsence;
                    txtTrNo.value = Master.TrNo.toString();
                    let _Index: number = Number(Master.AbsenceID);
                    let ind = GetIndexByUseId(Number(Master.AbsenceID), "PQ_GetResLabourAbsence", "AbsenceID", _Condition);
                    NavigateToSearchResultKey(Number(ind), Navigate);
                }
            });
        
    }
    function btnFindAbsenceType_onclick() {

        sys.FindKey(Modules.LateandAbsence, "btnFindAbsenceType", "", () => {
            let _Id: number = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetAbsenceTypeByID", ControllerName),
                data: { id: _Id },
                success: (d) => {
                    let result = d.result as P_D_LaborAbsenceType;

                    $('#btnFindAbsenceType').text(result.AbsCode);
                    $('#h_AbsenceTypeID').val(result.LaborAbsenceTypeID);
                    if (_ScreenLang == "ar") {
                        $("#h_AbsenceType_DescA").val(result.DescA.toString());
                    }
                    else {
                        $("#h_AbsenceType_DescE").val(result.DescE.toString());
                    }
                }
            });
        })

    }
    function btnFindLabor_onclick() {
        if (isNaN(ScheduleId)) {
            WorningMessage("يجب اختيار سكادول اولا", "You Should choose Schadule First");
            return;
        }
        sys.FindKey(Modules.LateandAbsence, "btnFindLabor", " ScheduleId = " + ScheduleId, () => {
            let _Id: number = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetLaborAbsenceByID", ControllerName),
                data: { id: _Id },
                success: (d) => {

                    let result = d.result as PQ_GetEngWorkSchduleLabor;
                    txtLatehourcostgrid = result.HourCost;
                    txtAbsHourcostgrid = (result.HourCost * 8);

                    $('#btnFindLabor').text(result.Lab_LabCode);
                    $('#h_LaborID').val(result.LaborID);
                    if (_ScreenLang == "ar") {
                        $("#h_Labor_DescA").val(result.Lab_DescA.toString());
                    }
                    else {
                        $("#h_Labor_DescE").val(result.Lab_DescE.toString());
                    }
                }
            });
        })
    }
    function AddItemInAbsenceGrid() {
        debugger;
        DetailsAbsence = new PQ_GetResLabourAbsenceDetail();
        DetailsAbsence.AbsenceLabourID = AbsenceLabourID;
        DetailsAbsence.Labor_Code = $('#btnFindLabor').text();
        DetailsAbsence.LaborID = Number($('#h_LaborID').val());
        DetailsAbsence.Labor_DescA = $('#h_Labor_DescA').val();
        DetailsAbsence.Labor_DescE = $('#h_Labor_DescE').val();
        DetailsAbsence.AbsenceType_Code = $('#btnFindAbsenceType').text();
        DetailsAbsence.LaborAbsenceTypeID = Number($('#h_AbsenceTypeID').val());
        DetailsAbsence.AbsenceType_DescA = $('#h_AbsenceType_DescA').val();
        DetailsAbsence.AbsenceType_DescE = $('#h_AbsenceType_DescE').val();
        DetailsAbsence.LateHourCost = Number(txtLatehourcostgrid);
        DetailsAbsence.AbsDayCost = Number(txtAbsHourcostgrid);

        //DetailsAbsence.
        let ST_Date = $('#h_StartDate').val();

        let headerToDate: string = DateFormat(txtEndDateTime.value);

        let headerFromDate = DateFormat(txtStartDateTime.value);

        //if (ST_Date > headerToDate || ST_Date < headerFromDate) {
        //    SharedSession.CurrentEnvironment.ScreenLanguage = ClientSharedWork.Session.Language;
        //    WorningMessage("التاريخ يجب ان يكون بين من والى كما فوق  ", "StartDate must be between FromDate to ToDate as in header");
        //    return;
        //}
        DetailsAbsence.StartDate = $('#h_StartDate').val();
        var isAbsence: string = $('#H_DropAbsence').val();
        if (isAbsence == "0") {
            DetailsAbsence.IsAbsence = false

        }
        else {
            DetailsAbsence.IsAbsence = true;
        }
        if ($('#h_AbsenceDays').val() == " ") {
            DetailsAbsence.AbsenceDays = 0;
        }
        else {
            DetailsAbsence.AbsenceDays = $('#h_AbsenceDays').val();
        }
        if ($('#h_LateHours').val() == " ") {
            DetailsAbsence.LateHours = 0;
        }
        else {
            DetailsAbsence.LateHours = $('#h_LateHours').val();
        }

        DetailsAbsence.Remarks = $('#h_Remarks').val();
        dataSource.unshift(DetailsAbsence);
        GridParent.DataSource = dataSource;
        GridParent.Bind();
    }
    function CreateListYesOrNo(): HTMLSelectElement {
        var offDay = [
            {
                Name_Ar: "لا",
                Name_En: "No",
                Id: 0
            },
            {
                Name_Ar: "نعم",
                Name_En: "Yes",
                Id: 1
            },
        ];
        let element = document.createElement("Select") as HTMLSelectElement;
        element.className = "form-control input-sm";
        switch (ClientSharedWork.Session.Language) {
            case "ar":
                for (var item of offDay) {
                    element.options.add(new Option(item.Name_Ar, item.Id.toString()));
                }
                break;
            case "en":
                for (var item of offDay) {
                    element.options.add(new Option(item.Name_En, item.Id.toString()));
                }
                break;
        }
        return element;
    }
    function btnSearchSchdule_Click() {

        sys.FindKey(Modules.LateandAbsence, "btnSearchSchadule", "CompCode = " + _CompCode + " and BraCode = " + _BranchCode, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getEngSchedule", ControllerName),
                data: { id: id },
                success: (d) => {

                    let schadule = d.result as PQ_GetEngWorkSchdule;
                    ScheduleId = schadule.ScheduleId;
                    txtWorkDescr.value = schadule.TrNo.toString();
                    txtPrj_ProjectCode.value = schadule.Prj_ProjectCode;
                    txtPrj_DescE.value = schadule.Prj_DescE;
                    txtPhase_ProjectPhaseCode.value = schadule.Phase_ProjectPhaseCode;
                    txtPhase_DescE.value = schadule.Phase_DescE;
                    txtStartDateTime.value = DateFormat(schadule.StartDateTime);
                    txtEndDateTime.value = DateFormat(schadule.EndDateTime);
                    schd_ProjectID = schadule.ProjectID;
                    schd_ProjectPhaseId = schadule.ProjectPhaseId;
                    dataSource = new Array<PQ_GetResLabourAbsenceDetail>()
                    ClearGrid(GridParent, dataSource);
                }
            });
        });
    }
    function Opentr() {
        if (ClientSharedWork.CurrentMode == ScreenModes.Query && Master.Status == 1 && ChkStatus.checked == false ) 
        Update();
    }
    function SearchSchdule_Changed() {

        var trno = Number(txtWorkDescr.value);

            Ajax.CallAsync({
                url: Url.Action("getEngScheduleViewByNo", "FindByNo"),
                data: { trno: trno },
                success: (d) => {
                    if (IsNullOrEmpty(d.result)) {
                        let schadule = d.result as PQ_GetEngWorkSchdule;
                        ScheduleId = 0;
                        txtWorkDescr.value = "";
                        txtPrj_ProjectCode.value = "";
                        txtPrj_DescE.value = "";
                        txtPhase_ProjectPhaseCode.value = "";
                        txtPhase_DescE.value = "";
                        txtStartDateTime.value = "";
                        txtEndDateTime.value = "";
                        schd_ProjectID = 0;
                        schd_ProjectPhaseId = 0;
                        dataSource = new Array<PQ_GetResLabourAbsenceDetail>()
                        ClearGrid(GridParent, dataSource);
                        WorningMessage("الرمز خطأ، أعد المحاولة .... ", "Wrong Code , .. Retry .. ")
                        return;

                    }
                    let schadule = d.result as PQ_GetEngWorkSchdule;
                    ScheduleId = schadule.ScheduleId;
                    txtWorkDescr.value = schadule.TrNo.toString();
                    txtPrj_ProjectCode.value = schadule.Prj_ProjectCode;
                    txtPrj_DescE.value = schadule.Prj_DescE;
                    txtPhase_ProjectPhaseCode.value = schadule.Phase_ProjectPhaseCode;
                    txtPhase_DescE.value = schadule.Phase_DescE;
                    txtStartDateTime.value = DateFormat(schadule.StartDateTime);
                    txtEndDateTime.value = DateFormat(schadule.EndDateTime);
                    schd_ProjectID = schadule.ProjectID;
                    schd_ProjectPhaseId = schadule.ProjectPhaseId;
                    dataSource = new Array<PQ_GetResLabourAbsenceDetail>()
                    ClearGrid(GridParent, dataSource);
                }
            });
        
    }
}