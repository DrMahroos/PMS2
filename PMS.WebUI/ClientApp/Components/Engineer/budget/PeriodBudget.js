$(document).ready(function () {
    PeriodBudget.InitalizeComponent();
});
var PeriodBudget;
(function (PeriodBudget) {
    var Master = new P_G_Period();
    var DataSource = new Array();
    var Details = new Array();
    var DetailsAssignHeader = new P_G_Period();
    var Tbl_DetailBilling = new Array();
    var MasterDetails = new M_D_Period();
    var Grid = new JsGrid();
    var sys = new SystemTools();
    var ControllerName = "PeriodBudget";
    var GridInputClassName = "form-control gridIput";
    var NumberColumnWidth = "50px";
    //var btnAreacode: HTMLButtonElement;
    var txtBraname;
    var txtYearID;
    var txtAreacode;
    var Periodid;
    var _compCode;
    var _braCode;
    var _yearid;
    var _Lang;
    var Closed;
    function InitalizeComponent() {
        SharedSession.CurrentPrivileges = GetPrivileges();
        SharedSession.CurrentEnvironment = GetSystemEnvironment();
        _Lang = SharedSession.CurrentEnvironment.ScreenLanguage;
        ControlsButtons.AddButton.disabled = false;
        ControlsButtons.EditButton.disabled = false;
        ControlsButtons.DeleteButton.disabled = false;
        ControlsButtons.PrintButton.disabled = true;
        ClientSharedWork.OnNavigate = Navigate;
        ControlsButtons.EditAction(function () { });
        ControlsButtons.UndoAction(function () { });
        //ControlsButtons.SaveAction(
        //    () => {
        //    //    if (ClientSharedWork.CurrentMode == ScreenModes.Edit)
        //    //        Update();
        //    //}
        //);
        InitalizeGrid();
        InitalizeControls();
        InitalizeEvents();
        _compCode = Number(SharedSession.CurrentEnvironment.CompCode);
        _braCode = Number(SharedSession.CurrentEnvironment.BranchCode);
        _yearid = Number(ClientSharedWork.Session.CurrentYear);
        txtYearID.value = ClientSharedWork.Session.CurrentYear;
        txtAreacode.value = SharedSession.CurrentEnvironment.BranchCode;
        ;
        GetBranchName(Number(txtAreacode.value));
        LoadDetails(Number(txtYearID.value), Number(txtAreacode.value), Number(_compCode));
        //$("#ImageEditorButton").on("click", () => {
        //    sys.ImgPopup(_compCode, _braCode, Modules.Prepare, Master.PeriodID.toString());
        //});
    }
    PeriodBudget.InitalizeComponent = InitalizeComponent;
    function InitalizeGrid() {
        var res = GetResourceList("PManag_");
        Grid.ElementName = "Grid";
        Grid.Inserting = SharedSession.CurrentPrivileges.AddNew;
        Grid.OnRefreshed = function () {
            if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                $(".editable").attr("disabled", "disabled");
                $(".addable").attr("disabled", "disabled");
            }
            else {
                $(".editable").removeAttr("disabled");
                $(".addable").removeAttr("disabled");
            }
        };
        Grid.Editing = SharedSession.CurrentPrivileges.EDIT;
        Grid.ConfirmDeleteing = SharedSession.CurrentPrivileges.Remove;
        Grid.InsertionMode = JsGridInsertionMode.Binding;
        Grid.Inserting = false;
        //Grid.OnItemEditing = EditingBudget;
        Grid.OnItemDeleting = function () { };
        Grid.OnItemUpdating = Update;
        Grid.Columns = [
            { title: res.PManag_PeriodCode, name: "PeriodCode", type: "label", width: "7.5%" },
            { title: res.PManag_DescE, name: "DescE", type: "label", width: "7.5%" },
            { title: res.PManag_FromDate, name: "FromDate", type: "label", width: "7.5%" },
            { title: res.PManag_ToDate, name: "ToDate", type: "label", width: "7.5%" },
            { title: res.PManag_ProdBudget, name: "ProdBudget", type: "number", width: "10%" },
            { type: "control", deleteButton: false, width: "7%" }
        ];
        Grid.DataSource = Details;
        Grid.Bind();
    }
    function EditingBudget(e) {
        // تعديل فى الجريد
        if (ClientSharedWork.CurrentMode == ScreenModes.Query == true) {
            Grid.SwitchEditing();
            WorningMessage("يجب اختيار وضع التعديل لاتمام عملية التعديل", "Select Update mode to edit");
            return;
        }
    }
    function InitalizeControls() {
        //btnAreacode = DocumentActions.GetElementById<HTMLButtonElement>("btnAreacode");
        txtYearID = DocumentActions.GetElementById("txtYearID");
        txtBraname = DocumentActions.GetElementById("txtBraname");
        txtAreacode = DocumentActions.GetElementById("txtAreacode");
    }
    function InitalizeEvents() {
        //btnAreacode.onclick = btnAreacode_Click;
    }
    function btnClose_onclick(id) {
        //Master.Closed = true;
        Ajax.Callsync({
            url: Url.Action("MonthClose", ControllerName),
            data: { PeriodId: id },
            success: function (d) {
                var _Result = d.result;
                if (_Result.ResponseState == true) {
                    LoadDetails(Number(txtYearID.value), Number(_braCode), Number(_compCode));
                }
                else {
                    WorningMessage(_Result.ResponseMessage, _Result.ResponseMessage);
                }
            }
        });
    }
    function btnAreacode_Click() {
        //debugger;
        sys.FindKey(Modules.PeriodManagement, "btnAreacode", "COMP_CODE = " + _compCode + " and user_Code = '" + SharedSession.CurrentEnvironment.UserCode + "' and [execute]=1", function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getArea", "PeriodManagement"),
                data: { id: id },
                success: function (d) {
                    var Area = d.result;
                    txtAreacode.value = Area.BRA_CODE.toString();
                    _Lang == "ar" ? txtBraname.value = Area.BRA_DESC : txtBraname.value = Area.BRA_DESCE;
                    _braCode = Area.BRA_CODE;
                    LoadDetails(Number(txtYearID.value), Number(txtAreacode.value), Number(_compCode));
                }
            });
        });
    }
    function btnClc_onclick(id) {
        Ajax.CallAsync({
            url: Url.Action("MonthCalcProdCost", ControllerName),
            data: { PeriodId: id },
            success: function (d) {
                var _Result = d.result;
                if (_Result.ResponseState == true) {
                    Grid.Refresh;
                    LoadDetails(Number(txtYearID.value), Number(_compCode), Number(_braCode));
                }
                else {
                    WorningMessage(_Result.ResponseMessage, _Result.ResponseMessage);
                }
            }
        });
    }
    function btnOpen_onclick(id) {
        var row = Details.filter(function (x) { return x.PeriodID == id; });
        row[0].Closed = false;
        Ajax.CallAsync({
            url: Url.Action("Open", ControllerName),
            data: row[0],
            success: function (d) {
                LoadDetails(Number(txtYearID.value), Number(_braCode), Number(_compCode));
            }
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
        txtYearID.value = ClientSharedWork.Session.CurrentYear;
        txtAreacode.value = _braCode.toString();
        GetBranchName(Number(txtAreacode.value));
        //DocumentActions.RenderFromModel(Master);
        LoadDetails(Number(txtYearID.value), (_braCode), (_compCode));
        ClientSharedWork.CurrentMode = ScreenModes.Query;
        //if (Master.Closed == true) {
        //    ControlsButtons.EditButton.disabled = true;
        //} else {
        //    ControlsButtons.EditButton.disabled = false;
        //}
    }
    function LoadDetails(yearid, bracode, compcode) {
        // send br , comp , year 
        Ajax.Callsync({
            url: Url.Action("LoadDetails", ControllerName),
            data: { yearid: yearid, bracode: bracode, compcode: compcode },
            success: function (d) {
                Details = d.result;
                for (var _i = 0, Details_1 = Details; _i < Details_1.length; _i++) {
                    var item = Details_1[_i];
                    item.FromDate = DateFormat(item.FromDate);
                    item.ToDate = DateFormat(item.ToDate);
                    if (item.Closed == true) {
                        item.Closed = true;
                    }
                    else {
                        item.Closed = false;
                    }
                }
                Grid.DataSource = Details;
                Grid.Bind();
            }
        });
    }
    function CalcTotal() {
        /* sum of 5 next col */
        for (var _i = 0, DataSource_1 = DataSource; _i < DataSource_1.length; _i++) {
            var item = DataSource_1[_i];
            item.Total = Number((item.EquipmentCost + item.ExpensesCost + item.LabourCost + item.MaterialCost + item.SubContractorCost).toFixed(2));
        }
    }
    function Update(e) {
        //Assign();
        debugger;
        var itm = e.Item;
        Ajax.Callsync({
            url: Url.Action("UpdateRecord", ControllerName),
            data: itm,
            success: function (d) {
                var result = d.result;
                if (result.ResponseState == false) {
                    MessageBox.Show(result.ResponseMessage, "Update");
                }
            }
        });
        //LoadDetails(_yearid, _braCode, _compCode);
    }
    function Assign() {
        debugger;
        DocumentActions.AssignToModel(Master);
        MasterDetails.P_G_Period = Master;
        MasterDetails.P_G_Period.PeriodID = Master.PeriodID;
        //AssignDetails
        MasterDetails.P_G_PeriodDetail = Details;
        for (var _i = 0, Details_2 = Details; _i < Details_2.length; _i++) {
            var per = Details_2[_i];
            //per.PeriodID = Master.PeriodID;
            per.CompCode = Number(_compCode);
            per.BraCode = Number(txtAreacode.value);
            per.YearID = Number(txtYearID.value);
            //per.DescA = per.DescA;
            per.DescE = per.DescE;
            Tbl_DetailBilling.push(per);
        }
    }
    function GetBranchName(id) {
        Ajax.CallAsync({
            url: Url.Action("getArea", ControllerName),
            data: { id: id },
            success: function (d) {
                var result = d.result;
                txtBraname.value = result.BRA_DESCE;
            }
        });
    }
    function FillInputText(_TextID, _Data) {
        $("#" + _TextID).text(_Data);
        $("#" + _TextID).val(_Data);
    }
})(PeriodBudget || (PeriodBudget = {}));
//# sourceMappingURL=PeriodBudget.js.map