$(document).ready(function () {
    StartOfWork.InitalizeComponent();
});
var StartOfWork;
(function (StartOfWork) {
    var ControllerName = "StartOfWork";
    var sys = new SystemTools();
    var Master = new PQ_GetSalesOffer();
    var txtTrNo;
    var txtTrSerial;
    var txtTrDate;
    var txtSendDate;
    var txtDescL;
    var txtcus_CustomerCode;
    var txtCus_DescE;
    var txtContractCode;
    var txtContractPeriod;
    var txtContractDate;
    var txtContractPrice;
    var RdNewProject;
    var RdExistProject;
    var redOldProject;
    var txtProjectBranch;
    var txtProjectBranchName;
    var txtProjectCode;
    var txtPhaseCode;
    var txtWorkStartId;
    var btnSearchOffer;
    var btnSearchArea;
    var btnSearchProject;
    var btnAuthorize;
    var phases = new Array();
    var projectId;
    var _ScreenLang;
    var _CompCode;
    var _BraCode;
    function InitalizeComponent() {
        SharedSession.CurrentPrivileges = GetPrivileges();
        SharedSession.CurrentEnvironment = GetSystemEnvironment();
        _ScreenLang = SharedSession.CurrentEnvironment.ScreenLanguage;
        _CompCode = SharedSession.CurrentEnvironment.CompCode;
        _BraCode = SharedSession.CurrentEnvironment.BranchCode;
        InitalizeControls();
        SharedSession.CurrentEnvironment.ScreenLanguage = SharedSession.CurrentEnvironment.Language;
        NavigatorComponent.InitalizeComponent();
        ClientSharedWork.OnNavigate = Navigate;
        ControlsButtons.AddAction(function () { });
        ControlsButtons.AddButton.disabled = true;
        ControlsButtons.EditAction(Edit);
        ControlsButtons.SaveAction(function () {
            if (ClientSharedWork.CurrentMode == ScreenModes.Add) {
                //Insert();
            }
            else if (ClientSharedWork.CurrentMode == ScreenModes.Edit)
                Update();
        });
        ControlsButtons.PrintAction(PrintStartOfWork);
        //ControlsButtons.PrintAction(() => { PrintStartOfWork });
        ControlsButtons.DeleteAction(function () { });
        ControlsButtons.UndoAction(Undo);
        InitalizeEvents();
        $("#ImageEditorButton").on("click", function () {
            sys.ImgPopup(_CompCode, _BraCode, Modules.OfferDefinition, Master.OfferID.toString());
        });
    }
    StartOfWork.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        txtTrNo = DocumentActions.GetElementById("txtTrNo");
        txtTrSerial = DocumentActions.GetElementById("txtTrSerial");
        txtTrDate = DocumentActions.GetElementById("txtTrDate");
        txtSendDate = DocumentActions.GetElementById("txtSendDate");
        txtDescL = DocumentActions.GetElementById("txtDescL");
        txtcus_CustomerCode = DocumentActions.GetElementById("txtcus_CustomerCode");
        txtCus_DescE = DocumentActions.GetElementById("txtCus_DescE");
        txtContractCode = DocumentActions.GetElementById("txtContractCode");
        txtContractPeriod = DocumentActions.GetElementById("txtContractPeriod");
        txtContractDate = DocumentActions.GetElementById("txtContractDate");
        txtContractPrice = DocumentActions.GetElementById("txtContractPrice");
        RdNewProject = DocumentActions.GetElementById("RdNewProject");
        redOldProject = DocumentActions.GetElementById("redOldProject");
        RdExistProject = DocumentActions.GetElementById("RdExistProject");
        txtProjectBranch = DocumentActions.GetElementById("txtProjectBranch");
        txtProjectBranchName = DocumentActions.GetElementById("txtProjectBranchName");
        txtProjectCode = DocumentActions.GetElementById("txtProjectCode");
        txtPhaseCode = DocumentActions.GetElementById("txtPhaseCode");
        txtWorkStartId = DocumentActions.GetElementById("txtWorkStartId");
        btnSearchOffer = DocumentActions.GetElementById("btnSearchOffer");
        btnSearchArea = DocumentActions.GetElementById("btnSearchArea");
        btnSearchProject = DocumentActions.GetElementById("btnSearchProject");
        btnAuthorize = DocumentActions.GetElementById("btnAuthorize");
    }
    function InitalizeEvents() {
        debugger;
        RdNewProject.onchange = ChangeRdStatus;
        RdExistProject.onchange = ChangeRdStatus;
        btnSearchOffer.onclick = btnSearchOffer_Clicked;
        btnSearchArea.onclick = btnSearchArea_Clicked;
        btnSearchProject.onclick = btnSearchProject_Clicked;
        btnAuthorize.onclick = btnAuthorize_Clicked;
        redOldProject.onclick = ChangeRdStatus;
        txtProjectCode.onchange = txtSearchProject_Clicked;
    }
    function Update() {
        debugger;
        Assign();
        Master.ProjectID = projectId;
        Master.ProjectCode = txtProjectCode.value;
        Master.CompCode = Number(_CompCode);
        if (RdNewProject.checked == true || redOldProject.checked == true) {
            Master.IsNewProject = true;
        }
        else {
            Master.IsNewProject = false;
        }
        Ajax.Callsync({
            url: Url.Action("UpdateStartWork", ControllerName),
            data: Master,
            success: function (d) {
                var result = d.result;
                if (result.ResponseState == true) {
                    ClientSharedWork.SwitchModes(ScreenModes.Query);
                    WorningMessage("تم التعديل بنجاح  ", "Data Updated Successfuly. ");
                    var _Index = GetIndexByUseId(result.ResponseData.OfferID, "PQ_GetSalesOffer", "OfferID", " CompCode = " + _CompCode + " and BraCode = " + _BraCode);
                    NavigateToSearchResultKey(Number(_Index), Navigate);
                }
            }
        });
    }
    function Undo() {
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
    function Add() {
    }
    function Edit() {
        RdNewProject.disabled = true;
        redOldProject.checked = true;
        if (SharedSession.CurrentPrivileges.CUSTOM1 == true) {
            $("#btnAuthorize").removeAttr("disabled");
        }
        else {
            $("#btnAuthorize").attr("disabled", "disabled");
        }
    }
    function Display() {
        debugger;
        DocumentActions.RenderFromModel(Master);
        projectId = Master.ProjectID;
        txtContractDate.value = DateFormat(Master.ContractDate);
        txtTrDate.value = DateFormat(Master.TrDate);
        txtSendDate.value = DateFormat(Master.SendDate);
        if (Master.ProjectBranch == 0 || Master.ProjectBranch == null) {
            getBranchName(Master.BraCode);
            txtProjectBranch.value = Master.BraCode.toString();
        }
        else {
            getBranchName(Master.ProjectBranch);
        }
        btnAuthorize.disabled = true;
        txtProjectCode.disabled = true;
        getProjectValue();
        if (Master.Status == 6 && SharedSession.CurrentPrivileges.EDIT == true) {
            ControlsButtons.EditButton.disabled = false;
            //txtProjectCode.disabled = false;
        }
        else {
            ControlsButtons.EditButton.disabled = true;
        }
    }
    function Assign() {
        Master = DocumentActions.AssignToModel(Master);
    }
    function getBranchName(id) {
        debugger;
        Ajax.CallAsync({
            url: Url.Action("getBranchName", ControllerName),
            data: { id: id },
            success: function (d) {
                var area = d.result;
                txtProjectBranchName.value = area.BRA_DESCE;
            }
        });
    }
    function ChangeRdStatus() {
        debugger;
        if (ClientSharedWork.CurrentMode == ScreenModes.Edit) {
            if (RdExistProject.checked == true) {
                $('#btnSearchProject').removeAttr('disabled');
                $('#txtPhaseCode').removeAttr('disabled');
                $('#txtProjectCode').attr('disabled', 'disabled');
            }
            else if (RdNewProject.checked == true) {
                $('#btnSearchProject').attr('disabled', 'disabled');
                $('#txtPhaseCode').attr('disabled', 'disabled');
                $('#txtProjectCode').attr('disabled', 'disabled');
                txtProjectCode.value = "";
                txtPhaseCode.value = "";
            }
            else if (redOldProject.checked == true) {
                $('#btnSearchProject').attr('disabled', 'disabled');
                $('#txtPhaseCode').attr('disabled', 'disabled');
                $('#txtProjectCode').removeAttr('disabled');
                // txtProjectCode.disabled = false;
                txtProjectCode.value = "";
                txtPhaseCode.value = "";
            }
        }
    }
    function btnSearchOffer_Clicked() {
        sys.FindKey(Modules.StartOfWork, "btnSearchOffer", "CompCode = " + _CompCode + " and BraCode = " + _BraCode, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetByID", ControllerName),
                data: { _OfferID: id },
                success: function (d) {
                    Master = d.result;
                    var Index = GetIndexByUseId(Number(Master.OfferID), "PQ_GetSalesOffer", "OfferID", " CompCode = " + _CompCode + " and BraCode = " + _BraCode);
                    NavigateToSearchResultKey(Number(Index), Navigate);
                }
            });
        });
    }
    function btnSearchArea_Clicked() {
        txtProjectCode.value = "";
        sys.FindKey(Modules.StartOfWork, "btnSearchArea", "COMP_CODE = " + _CompCode, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getArea", ControllerName),
                data: { id: id },
                success: function (d) {
                    var Area = d.result;
                    txtProjectBranch.value = Area.BRA_CODE.toString();
                    txtProjectBranchName.value = Area.BRA_DESCE.toString();
                }
            });
        });
    }
    function btnSearchProject_Clicked() {
        txtProjectBranch.value;
        sys.FindKey(Modules.StartOfWork, "btnSearchProject", "CompCode = " + _CompCode + " and BraCode = " + Number(txtProjectBranch.value), function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getProjects", ControllerName),
                data: { id: id },
                success: function (d) {
                    var result = d.result;
                    txtProjectCode.value = result.ProjectCode;
                    projectId = result.ProjectID;
                }
            });
        });
    }
    function txtSearchProject_Clicked() {
        debugger;
        txtProjectBranch.value;
        var code = txtProjectCode.value;
        Ajax.CallAsync({
            url: Url.Action("getProjectsCode", ControllerName),
            data: { code: code, comp: SharedSession.CurrentEnvironment.CompCode, bra: SharedSession.CurrentEnvironment.BranchCode },
            success: function (d) {
                debugger;
                var result = d.result;
                if (redOldProject.checked == true) {
                    if (result != null) {
                        WorningMessage('يوجد مشروع بهذا الرقم ', 'Project is already exist ');
                        txtProjectCode.value = "";
                    }
                }
                else if (RdExistProject.checked == true) {
                    if (result != null) {
                        // txtProjectCode.value = result.ProjectCode;
                        projectId = result.ProjectID;
                    }
                    else {
                        WorningMessage(" لايوجد مشروع بهذا الرقم  ", " The code does not exist ");
                    }
                }
            }
        });
    }
    function getProjectValue() {
        if (Master.IsNewProject == true) {
            redOldProject.checked = true;
            //$('#txtProjectCode').val("");
            //$('#txtPhaseCode').val("");
        }
        else {
            RdExistProject.checked = true;
            //$('#txtProjectCode').val(Master.ProjectCode);
            //$('#txtPhaseCode').val(Master.PhaseCode);
        }
    }
    function checkPhaseCode() {
        debugger;
        phases = Ajax.Call({ url: Url.Action("getProjectphases", ControllerName), data: { projId: projectId } });
        debugger;
        //let phaseCode = phases.filter(x => x.ProjectID == projectId);
        if (phases.length > 0) {
            for (var i = 0; i < phases.length; i++) {
                if (txtPhaseCode.value == phases[i].ProjectPhaseCode) {
                    return false;
                }
            }
        }
        return true;
    }
    function btnAuthorize_Clicked() {
        debugger;
        Assign();
        if (Master.cus_IsTemporary == true) {
            WorningMessage("لا يمكن اتمام هذة العملية لان العميل مازل مؤقت", "Operation Cannot  Process Because This Customer Is Temporary");
            return false;
        }
        if ( /*txtContractCode.value == "" ||*/txtContractDate.value == "" || txtContractPeriod.value == "") {
            WorningMessage("يجب ادخال كافة بيانات العقد", "Please Insert All The Contract Information !");
            return false;
        }
        //else if (txtProjectCode.value == "") {
        //    WorningMessage("يجب اختيار مشروع", "Please Select any Project To Authorize");
        //    return false;
        //}
        else if (txtProjectBranch.value == "" || txtProjectBranchName.value == "") {
            WorningMessage("يجب اختيار الفرع", "Please Select The Branch");
            return;
        }
        if (RdExistProject.checked == true) {
            if (txtProjectCode.value == "") {
                WorningMessage("يجب اختيار المشروع", "Please Select The Project");
                return;
            }
            if (txtPhaseCode.value == "") {
                txtPhaseCode.value = "0";
            }
            else if (checkPhaseCode() == false) {
                WorningMessage("لا يمكن تكرار المرحلة لنفس المشروع", "Phase Cannot Duplicated For The Same Project");
                return;
            }
        }
        if (redOldProject.checked == true) {
            if (txtProjectCode.value == "") {
                WorningMessage("يجب اختيار المشروع", "Please Select The Project");
                return;
            }
            txtPhaseCode.value = "0";
            projectId = null;
        }
        ProcessAuthorize(Master.OfferID);
    }
    function ProcessAuthorize(offId) {
        debugger;
        btnAuthorize.disabled = true;
        Master.Status = 8;
        Update();
        //debugger;
        //Ajax.CallAsync({
        //    url: Url.Action("ProcessAuthorize", ControllerName),
        //    data: { _Id: offId },
        //    success: (d) => {
        //        //
        //        //Update();
        //    }
        //})
        //Display();
    }
    function PrintStartOfWork() {
        if (Master == null)
            return;
        Ajax.CallAsync({
            url: Url.Action("Printstartofwork", "PrintTransaction"),
            data: { TrID: Master.OfferID },
            success: function (d) {
                var url = d.result;
                window.open(url, "_blank");
            }
        });
    }
})(StartOfWork || (StartOfWork = {}));
//# sourceMappingURL=StartOfWork.js.map