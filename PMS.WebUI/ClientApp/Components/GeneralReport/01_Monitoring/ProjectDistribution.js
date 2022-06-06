$(document).ready(function () {
    ProjectDistributionts.InitalizeComponent();
});
var ProjectDistributionts;
(function (ProjectDistributionts) {
    var sys = new SystemTools();
    var ControllerName = "ProjectDistribution";
    var txtArea;
    var txtSel;
    var txtCustClass;
    var txtCust;
    var txtAreaDes;
    var txtSalDesc;
    var txtCustClassDes;
    var txtCustIDDes;
    var txtAreaCod;
    var txtSelCod;
    var txtCustClassCod;
    var txtCustCod;
    var btnArea;
    var btnSalesID;
    var btnCustClassID;
    var btnCustID;
    var RedSalEng;
    var RedArea;
    var RedNew;
    var Redworking;
    var RedHold;
    var RedSuspended;
    var Redfinish;
    var RedAll;
    var _CompCode;
    var _BranchCode;
    var btnPrint;
    var _ScreenLanguage;
    _CompCode = SharedSession.CurrentEnvironment.CompCode;
    _BranchCode = SharedSession.CurrentEnvironment.BranchCode;
    function InitalizeComponent() {
        GeneralReports.OnClear = Clear;
        GeneralReports.OnPrint = Print;
        _ScreenLanguage = ClientSharedWork.Session.ScreenLanguage;
        InitalizeControls();
        InitalizeEvents();
        //getbranchname();
    }
    ProjectDistributionts.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        //---------- textID---------
        txtArea = DocumentActions.GetElementById("txtArea");
        txtSel = DocumentActions.GetElementById("txtSel");
        txtCustClass = DocumentActions.GetElementById("txtCustClass");
        txtCust = DocumentActions.GetElementById("txtCustID");
        //---------- textDes---------
        txtAreaDes = DocumentActions.GetElementById("txtAreaDes");
        txtSalDesc = DocumentActions.GetElementById("txtSalDesc");
        txtCustClassDes = DocumentActions.GetElementById("txtCustClassDes");
        txtCustIDDes = DocumentActions.GetElementById("txtCustIDDes");
        //---------- textcood---------
        txtAreaCod = DocumentActions.GetElementById("txtAreaCod");
        txtSelCod = DocumentActions.GetElementById("txtSelCod");
        txtCustClassCod = DocumentActions.GetElementById("txtCustClassCod");
        txtCustCod = DocumentActions.GetElementById("txtCustCod");
        //---------- btn---------
        btnArea = DocumentActions.GetElementById("btnArea");
        btnSalesID = DocumentActions.GetElementById("btnSalesID");
        btnCustClassID = DocumentActions.GetElementById("btnCustClassID");
        btnCustID = DocumentActions.GetElementById("btnCustID");
        //---------- redeo---------
        RedSalEng = DocumentActions.GetElementById("RedSalEng");
        RedArea = DocumentActions.GetElementById("RedArea");
        RedNew = DocumentActions.GetElementById("RedNew");
        Redworking = DocumentActions.GetElementById("Redworking");
        RedHold = DocumentActions.GetElementById("RedHold");
        RedSuspended = DocumentActions.GetElementById("RedSuspended");
        Redfinish = DocumentActions.GetElementById("Redfinish");
        RedAll = DocumentActions.GetElementById("RedAll");
        //--------------
        RedAll.checked = true;
        RedSalEng.checked = true;
    }
    function Clear() {
        RedAll.checked = true;
        RedSalEng.checked = true;
        txtArea.value = "";
        txtSel.value = "";
        txtCustClass.value = "";
        txtCust.value = "";
        txtAreaDes.value = "";
        txtSalDesc.value = "";
        txtCustClassDes.value = "";
        txtCustIDDes.value = "";
        //$("#RedSalEng").prop("checked", "");
        //$("#RedArea").prop("checked", "");
    }
    function InitalizeEvents() {
        debugger;
        // btnArea.onclick = btnArea_onclick;
        btnSalesID.onclick = btnSalesID_onclick;
        btnCustClassID.onclick = btnCustClassID_onclick;
        btnCustID.onclick = btnCustID_onclick;
        btnPrint.onclick = Print;
    }
    function btnSalesID_onclick() {
        var Condition = " CompCode = " + _CompCode + " and BraCode = " + _BranchCode;
        sys.FindKey(Modules.RepProjectDist, "btnSalesID", Condition, function () {
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            debugger;
            Ajax.CallAsync({
                url: Url.Action("GetSalesCodeByID", "ProjectDistribution"),
                data: { id: _Id },
                success: function (d) {
                    var _result = d.result;
                    txtSel.value = _result.SalesEngineerId.toString();
                    txtSelCod.value = _result.EngCode.toString();
                    txtSalDesc.value = _ScreenLanguage == "en" ? _result.DescE : _result.DeacA;
                    ;
                }
            });
        });
    }
    function btnCustClassID_onclick() {
        var Condition = " CompCode = " + _CompCode + " and BraCode = " + _BranchCode;
        sys.FindKey(Modules.RepProjectDist, "btnCustClassID", "", function () {
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetCustomerClassById", ControllerName),
                data: { id: _Id },
                success: function (d) {
                    debugger;
                    var result = d.result;
                    txtCustClass.value = result.CustomerCategoryID.toString();
                    txtCustClassCod.value = result.CustomerCatCode.toString();
                    txtCustClassDes.value = _ScreenLanguage == "en" ? result.DescE : result.DescA;
                }
            });
        });
    }
    function btnCustID_onclick() {
        sys.FindKey(Modules.RepProjectDist, "btnCustID", "", function () {
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetCustomerById", "ProjectDistribution"),
                data: { id: _Id },
                success: function (d) {
                    var result = d.result;
                    txtCust.value = result.CustomerID.toString();
                    txtCustCod.value = result.CustomerCode.toString();
                    txtCustIDDes.value = SharedSession.CurrentEnvironment.ScreenLanguage == "ar" ? result.DescA : result.DescE;
                }
            });
        });
    }
    function Print() {
        debugger;
        var RP = new ReportParameters();
        // RP.CompCode = SharedSession.CurrentEnvironment.CompCode;
        RP.braCode = SharedSession.CurrentEnvironment.BranchCode;
        RP.EngID = Number(txtSel.value);
        RP.custClassID = Number(txtCustClass.value);
        RP.customerID = Number(txtCust.value);
        if ($("#RedNew").prop("checked") == true) {
            RP.Stat = 0;
        }
        else if ($("#Redworking").prop("checked") == true) {
            RP.Stat = 1;
        }
        else if ($("#RedHold").prop("checked") == true) {
            RP.Stat = 2;
        }
        else if ($("#RedSuspended").prop("checked") == true) {
            RP.Stat = 3;
        }
        else if ($("#Redfinish").prop("checked") == true) {
            RP.Stat = 4;
        }
        else if ($("#RedAll").prop("checked") == true) {
            RP.Stat = 6;
        }
        if ($("#RedArea").prop("checked") == true) {
            RP.TypeReport = 1;
            Ajax.CallAsync({
                url: Url.Action("rptProjectDistribution", "GeneralReports"),
                data: RP,
                success: function (d) {
                    debugger;
                    var result = d.result;
                    window.open(result, "_blank");
                }
            });
        }
        else {
            RP.TypeReport = 2;
            Ajax.CallAsync({
                url: Url.Action("rptProjectDistribution", "GeneralReports"),
                data: RP,
                success: function (d) {
                    debugger;
                    var result = d.result;
                    window.open(result, "_blank");
                }
            });
        }
    }
})(ProjectDistributionts || (ProjectDistributionts = {}));
//# sourceMappingURL=ProjectDistribution.js.map