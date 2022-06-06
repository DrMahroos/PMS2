$(document).ready(() => {
    PeriodBudget.InitalizeComponent();
});
namespace PeriodBudget {
    var Master: P_G_Period = new P_G_Period();

    var DataSource: Array<P_G_Period> = new Array<P_G_Period>();
    var Details: Array<P_G_Period> = new Array<P_G_Period>();
    var DetailsAssignHeader: P_G_Period = new P_G_Period();
    var Tbl_DetailBilling: Array<P_G_Period> = new Array<P_G_Period>();

    var MasterDetails: M_D_Period = new M_D_Period();
    var Grid: JsGrid = new JsGrid();
    var sys: SystemTools = new SystemTools();
    const ControllerName: string = "PeriodBudget";
    const GridInputClassName = "form-control gridIput";
    const NumberColumnWidth = "50px";
    //var btnAreacode: HTMLButtonElement;
    var txtBraname: HTMLInputElement;
    var txtYearID: HTMLInputElement;
    var txtAreacode: HTMLInputElement;
    var Periodid: number;

    var _compCode: number;
    var _braCode: number;
    var _yearid: number; 
    var _Lang: string;
    var Closed: boolean; 

    export function InitalizeComponent() {
        SharedSession.CurrentPrivileges = GetPrivileges();
        SharedSession.CurrentEnvironment = GetSystemEnvironment();

        
        _Lang = SharedSession.CurrentEnvironment.ScreenLanguage;

        ControlsButtons.AddButton.disabled = false;
        ControlsButtons.EditButton.disabled = false;
        ControlsButtons.DeleteButton.disabled = false;
        ControlsButtons.PrintButton.disabled = true;
        ClientSharedWork.OnNavigate = Navigate;
        ControlsButtons.EditAction(() => { });
        ControlsButtons.UndoAction(() => { });
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
        txtAreacode.value = SharedSession.CurrentEnvironment.BranchCode;;
        GetBranchName(Number(txtAreacode.value));
        LoadDetails(Number(txtYearID.value), Number(txtAreacode.value), Number(_compCode));
        //$("#ImageEditorButton").on("click", () => {
        //    sys.ImgPopup(_compCode, _braCode, Modules.Prepare, Master.PeriodID.toString());
        //});
    }
    function InitalizeGrid() {
        let res: any = GetResourceList("PManag_");
        Grid.ElementName = "Grid";
        Grid.Inserting = SharedSession.CurrentPrivileges.AddNew;
        Grid.OnRefreshed = () => {
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
        Grid.OnItemDeleting = () => { };
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
    function EditingBudget(e: JsGridUpdateEventArgs) {
        // تعديل فى الجريد

        if (ClientSharedWork.CurrentMode == ScreenModes.Query == true) {
            Grid.SwitchEditing();
            WorningMessage("يجب اختيار وضع التعديل لاتمام عملية التعديل", "Select Update mode to edit");
            return;
        }
    }
    

    function InitalizeControls() {
        //btnAreacode = DocumentActions.GetElementById<HTMLButtonElement>("btnAreacode");
        txtYearID = DocumentActions.GetElementById<HTMLInputElement>("txtYearID");
        txtBraname = DocumentActions.GetElementById<HTMLInputElement>("txtBraname");
        txtAreacode = DocumentActions.GetElementById<HTMLInputElement>("txtAreacode");
    }

    function InitalizeEvents() {
        //btnAreacode.onclick = btnAreacode_Click;
    }

    

    function btnClose_onclick(id: number) {

        //Master.Closed = true;
        Ajax.Callsync({
            url: Url.Action("MonthClose", ControllerName),
            data: { PeriodId: id },
            success: (d) => {
                var _Result = d.result as ResponseResult;
                if (_Result.ResponseState == true) {
                    
                    LoadDetails(Number(txtYearID.value), Number(_braCode) ,Number(_compCode));
                } else {
                    WorningMessage(_Result.ResponseMessage, _Result.ResponseMessage);
                }
            }
        })
    }

    function btnAreacode_Click() {
        //debugger;
        sys.FindKey(Modules.PeriodManagement, "btnAreacode", "COMP_CODE = " + _compCode + " and user_Code = '" + SharedSession.CurrentEnvironment.UserCode+ "' and [execute]=1", () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getArea", "PeriodManagement"),
                data: { id: id },
                success: (d) => {
                    let Area = d.result as G_BRANCH;
                    txtAreacode.value = Area.BRA_CODE.toString();
                    _Lang == "ar" ? txtBraname.value = Area.BRA_DESC : txtBraname.value = Area.BRA_DESCE;
                    _braCode = Area.BRA_CODE; 
                    LoadDetails(Number(txtYearID.value), Number(txtAreacode.value), Number(_compCode));
                }
            });
        });
    }

    function btnClc_onclick(id: number) {
        Ajax.CallAsync({
            url: Url.Action("MonthCalcProdCost", ControllerName),
            data: { PeriodId: id },
            success: (d) => {
                var _Result = d.result as ResponseResult;
                if (_Result.ResponseState == true) {
                    Grid.Refresh;
                    LoadDetails(Number(txtYearID.value), Number(_compCode), Number(_braCode));

                } else {
                    WorningMessage(_Result.ResponseMessage, _Result.ResponseMessage);
                }

            }

        })
    }

    function btnOpen_onclick(id: number) {

        let row: Array<P_G_Period> = Details.filter(x => x.PeriodID == id);
        row[0].Closed = false;
        Ajax.CallAsync({
            url: Url.Action("Open", ControllerName),
            data: row[0],
            success: (d) => {
                LoadDetails(Number(txtYearID.value), Number(_braCode), Number(_compCode));
            }
        });
    }

    function Navigate() {

        Ajax.CallAsync({
            url: Url.Action("GetByIndex", ControllerName),

            success: (d) => {

                Master = d.result as P_G_Period;
                Display();
            }
        })
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

    function LoadDetails(yearid: number, bracode: number, compcode: number) {
        // send br , comp , year 
        Ajax.Callsync({
            url: Url.Action("LoadDetails", ControllerName),
            data: { yearid: yearid, bracode: bracode, compcode: compcode },
            success: (d) => {
                
                Details = d.result as Array<P_G_Period>;
                for (var item of Details) {
                    item.FromDate = DateFormat(item.FromDate);
                    item.ToDate = DateFormat(item.ToDate);
                    if (item.Closed == true) {
                        item.Closed = true;
                    } else {
                        item.Closed =  false;
                    }
                }
                Grid.DataSource = Details;
                Grid.Bind();
            }
        })
    }

    function CalcTotal() {
        /* sum of 5 next col */

        for (var item of DataSource) {
            item.Total = Number((item.EquipmentCost + item.ExpensesCost + item.LabourCost + item.MaterialCost + item.SubContractorCost).toFixed(2));
        }
    }

    function Update(e: JsGridUpdateEventArgs) {

        //Assign();
        debugger;
        
        let itm = e.Item as P_G_Period;
        
        Ajax.Callsync({
            url: Url.Action("UpdateRecord", ControllerName),
            data: itm,
            success: (d) => {
                let result = d.result as ResponseResult;
                if (result.ResponseState == false) {
                    MessageBox.Show(result.ResponseMessage, "Update");
                }
            }
        });
        //LoadDetails(_yearid, _braCode, _compCode);
               
    }

    function Assign() {
        debugger;
        DocumentActions.AssignToModel<P_G_Period>(Master);
        MasterDetails.P_G_Period = Master as P_G_Period;
        MasterDetails.P_G_Period.PeriodID = Master.PeriodID;

        //AssignDetails
        MasterDetails.P_G_PeriodDetail = Details as Array<P_G_Period>;
        for (var per of Details) {
            //per.PeriodID = Master.PeriodID;
            per.CompCode = Number(_compCode);
            per.BraCode = Number(txtAreacode.value);
            per.YearID = Number(txtYearID.value);
            //per.DescA = per.DescA;
            per.DescE = per.DescE;
            Tbl_DetailBilling.push(per);
        }
    }

    function GetBranchName(id: number) {
        Ajax.CallAsync({
            url: Url.Action("getArea", ControllerName),
            data: { id: id },
            success: (d) => {

                let result: G_BRANCH = d.result as G_BRANCH;
                txtBraname.value = result.BRA_DESCE;
            }
        });
    }

    function FillInputText(_TextID: string, _Data: any) {
        $("#" + _TextID).text(_Data);
        $("#" + _TextID).val(_Data);
    }
}





