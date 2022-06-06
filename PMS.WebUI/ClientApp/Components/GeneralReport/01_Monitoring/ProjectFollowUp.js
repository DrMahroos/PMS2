$(document).ready(function () {
    ProjectFollowUp.InitalizeComponent();
});
var ProjectFollowUp;
(function (ProjectFollowUp) {
    var sys = new SystemTools();
    var ControllerName = "ProjectFollowUp";
    var FromDate;
    var ToDate;
    var txtFromProject;
    var txtToProject;
    var txtSel;
    var txtCustClass;
    var txtCust;
    var txtSalDesc;
    var txtCustClassDes;
    var txtCustIDDes;
    var txtSelCod;
    var txtCustClassCod;
    var txtCustCod;
    var btnSalesID;
    var btnCustClassID;
    var btnCustID;
    var RedSalesEng;
    var RedCustomer;
    var RedNew;
    var Redworking;
    var RedHold;
    var RedSuspended;
    var Redfinish;
    var RedAll;
    var _CompCode;
    var _BranchCode;
    var _ScreenLanguage;
    _CompCode = SharedSession.CurrentEnvironment.CompCode;
    _BranchCode = SharedSession.CurrentEnvironment.BranchCode;
    function InitalizeComponent() {
        GeneralReports.OnClear = Clear;
        _ScreenLanguage = ClientSharedWork.Session.ScreenLanguage;
        InitalizeControls();
        InitalizeEvents();
        //getbranchname();
    }
    ProjectFollowUp.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        //---------- textID---------
        FromDate = DocumentActions.GetElementById("FromDate");
        ToDate = DocumentActions.GetElementById("ToDate");
        txtFromProject = DocumentActions.GetElementById("txtFromProject");
        txtToProject = DocumentActions.GetElementById("txtToProject");
        txtSel = DocumentActions.GetElementById("txtSel");
        txtCustClass = DocumentActions.GetElementById("txtCustClass");
        txtCust = DocumentActions.GetElementById("txtCustID");
        //---------- textDes---------
        txtSalDesc = DocumentActions.GetElementById("txtSalDesc");
        txtCustClassDes = DocumentActions.GetElementById("txtCustClassDes");
        txtCustIDDes = DocumentActions.GetElementById("txtCustIDDes");
        //---------- textcood---------
        txtSelCod = DocumentActions.GetElementById("txtSelCod");
        txtCustClassCod = DocumentActions.GetElementById("txtCustClassCod");
        txtCustCod = DocumentActions.GetElementById("txtCustCod");
        //---------- btn---------
        btnSalesID = DocumentActions.GetElementById("btnSalesID");
        btnCustClassID = DocumentActions.GetElementById("btnCustClassID");
        btnCustID = DocumentActions.GetElementById("btnCustID");
        //---------- redeo---------
        RedSalesEng = DocumentActions.GetElementById("RedSalesEng");
        RedCustomer = DocumentActions.GetElementById("RedCustomer");
        RedNew = DocumentActions.GetElementById("RedNew");
        Redworking = DocumentActions.GetElementById("Redworking");
        RedHold = DocumentActions.GetElementById("RedHold");
        RedSuspended = DocumentActions.GetElementById("RedSuspended");
        Redfinish = DocumentActions.GetElementById("Redfinish");
        RedAll = DocumentActions.GetElementById("RedAll");
        //--------------
        RedAll.checked = true;
        RedSalesEng.checked = true;
        FromDate.value = DateFormat(new Date().toString());
        ToDate.value = DateFormat(new Date().toString());
        txtFromProject.value = "1";
        txtToProject.value = "999999";
    }
    function Clear() {
        RedAll.checked = true;
        RedSalesEng.checked = true;
        FromDate.value = DateFormat(new Date().toString());
        ToDate.value = DateFormat(new Date().toString());
        txtFromProject.value = "1";
        txtToProject.value = "999999";
        txtSel.value = "";
        txtCustClass.value = "";
        txtCust.value = "";
        txtSalDesc.value = "";
        txtCustClassDes.value = "";
        txtCustIDDes.value = "";
        txtFromProject.value = "";
        txtToProject.value = "";
    }
    function InitalizeEvents() {
        debugger;
        btnSalesID.onclick = btnSalesID_onclick;
        btnCustClassID.onclick = btnCustClassID_onclick;
        btnCustID.onclick = btnCustID_onclick;
        GeneralReports.Print = Print;
    }
    function btnSalesID_onclick() {
        var Condition = " CompCode = " + _CompCode + " and BraCode = " + _BranchCode;
        sys.FindKey(Modules.RepProjectFollowUp, "btnSalesID", Condition, function () {
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            debugger;
            Ajax.CallAsync({
                url: Url.Action("GetSalesCodeByID", "ProjectFollowUp"),
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
        sys.FindKey(Modules.RepProjectFollowUp, "btnCustClassID", "", function () {
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
        var Condition = " CompCode = " + _CompCode + " and BraCode = " + _BranchCode;
        sys.FindKey(Modules.RepProjectFollowUp, "btnCustID", Condition, function () {
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetCustomerById", ControllerName),
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
        RP.FromProjCode = txtFromProject.value;
        RP.ToProjCode = txtToProject.value;
        RP.FromDate = FromDate.value;
        RP.ToDate = ToDate.value;
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
            RP.Stat = 5;
        }
        else if ($("#RedAll").prop("checked") == true) {
            RP.Stat = 6;
        }
        if ($("#RedSalesEng").prop("checked") == true) {
            RP.TypeReport = 1;
            Ajax.CallAsync({
                url: Url.Action("rptProjectFollowUp", "GeneralReports"),
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
                url: Url.Action("rptProjectFollowUp", "GeneralReports"),
                data: RP,
                success: function (d) {
                    debugger;
                    var result = d.result;
                    window.open(result, "_blank");
                }
            });
        }
    }
})(ProjectFollowUp || (ProjectFollowUp = {}));
//# sourceMappingURL=ProjectFollowUp.js.map