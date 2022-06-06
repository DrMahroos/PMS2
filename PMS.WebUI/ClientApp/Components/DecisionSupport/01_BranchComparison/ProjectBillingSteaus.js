$(document).ready(function () {
    ProjectBillingSteaus.InitalizeComponent();
});
var ProjectBillingSteaus;
(function (ProjectBillingSteaus) {
    var sys = new SystemTools();
    var ControllerName = "CC_ByScope";
    var categ = new P_D_ScopeCategory();
    var Model = new P_G_Region();
    //-------
    var FromDate;
    var ToDate;
    //-------
    //-------
    var txtRegionID;
    var txtRegionCode;
    var txtRegionDes;
    var btnRegionID;
    var txtBranch;
    var txtBranchCod;
    var txtBranchDes;
    var btnBranch;
    var btnPrintEXEL;
    var TypeReport = 0;
    var _CompCode;
    var _BranchCode;
    var _ScreenLanguage;
    var REGION_CODE;
    //-------
    _CompCode = SharedSession.CurrentEnvironment.CompCode;
    _BranchCode = SharedSession.CurrentEnvironment.BranchCode;
    function InitalizeComponent() {
        GeneralReports.OnClear = Clear;
        GeneralReports.OnPrint = ChekPrint;
        _ScreenLanguage = ClientSharedWork.Session.ScreenLanguage;
        InitalizeControls();
        FromDate.value = DateFormat(new Date().toString());
        ToDate.value = DateFormat(new Date().toString());
        InitalizeEvents();
        //getbranchname();
    }
    ProjectBillingSteaus.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        //---------- textID---------
        txtRegionID = DocumentActions.GetElementById("txtRegionID");
        txtRegionDes = DocumentActions.GetElementById("txtRegionDes");
        txtRegionCode = DocumentActions.GetElementById("txtRegionCode");
        btnRegionID = DocumentActions.GetElementById("btnRegionID");
        btnPrintEXEL = DocumentActions.GetElementById("btnPrintEXEL");
        txtBranch = DocumentActions.GetElementById("txtBranch");
        txtBranchCod = DocumentActions.GetElementById("txtBranchCod");
        txtBranchDes = DocumentActions.GetElementById("txtBranchDes");
        btnBranch = DocumentActions.GetElementById("btnBranch");
        FromDate = DocumentActions.GetElementById("FromDate");
        ToDate = DocumentActions.GetElementById("ToDate");
        //---------- redeo---------
        //--------------
    }
    function Clear() {
        txtRegionID.value = "";
        txtRegionDes.value = "";
        txtRegionCode.value = "";
    }
    function InitalizeEvents() {
        btnRegionID.onclick = btnRegionID_onclick;
        btnBranch.onclick = btnBranch_onclick;
        btnPrintEXEL.onclick = btnPrintEXEL_onclick;
    }
    function btnBranch_onclick() {
        sys.FindKey(Modules.ProjectBillingSteaus, "btnBranch", "REGION_CODE =" + REGION_CODE + " ", function () {
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetBranchByID", ControllerName),
                data: { id: _Id },
                success: function (d) {
                    var result = d.result;
                    txtBranchCod.value = result.BRA_CODE.toString();
                    txtBranchDes.value = _ScreenLanguage == "ar" ? result.BRA_DESC : result.BRA_DESCE;
                    2;
                }
            });
        });
    }
    function btnRegionID_onclick() {
        sys.FindKey(Modules.ProjectBillingSteaus, "btnRegionID", "COMP_CODE = " + _CompCode, function () {
            var _id = ClientSharedWork.SearchDataGrid.SelectedKey;
            REGION_CODE = _id;
            Ajax.CallAsync({
                url: Url.Action("getRegionByid", ControllerName),
                data: { id: _id },
                success: function (d) {
                    Model = d.result;
                    if (Model != null) {
                        txtRegionID.value = Model.REGION_CODE.toString();
                        txtRegionDes.value = _ScreenLanguage == "en" ? Model.DESCE : Model.DESCA;
                    }
                }
            });
        });
    }
    function ChekPrint() {
        TypeReport = 1;
        Print();
    }
    function btnPrintEXEL_onclick() {
        TypeReport = 3;
        Print();
    }
    function Print() {
        var RP = new ReportParameters();
        RP.CompCode = SharedSession.CurrentEnvironment.CompCode;
        RP.braCode = SharedSession.CurrentEnvironment.BranchCode;
        RP.FromDate = FromDate.value;
        RP.ToDate = ToDate.value;
        RP.REGION_CODE = Number(txtRegionID.value);
        RP.braCode = txtBranchCod.value;
        RP.TypeReport = TypeReport;
        Ajax.CallAsync({
            url: Url.Action("Rep_DSS_BillingStatus", "GeneralReports"),
            data: RP,
            success: function (d) {
                var result = d.result;
                window.open(result, "_blank");
            }
        });
    }
})(ProjectBillingSteaus || (ProjectBillingSteaus = {}));
//# sourceMappingURL=ProjectBillingSteaus.js.map