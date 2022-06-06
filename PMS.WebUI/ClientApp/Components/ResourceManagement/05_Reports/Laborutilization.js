$(document).ready(function () {
    Laborutilization.InitalizeComponent();
});
var Laborutilization;
(function (Laborutilization) {
    var sys = new SystemTools();
    var ControllerName = "Laborutilization";
    var FromDate;
    var ToDate;
    var txtLaborClassID;
    var txtLaborClassRP;
    var btnLaborClassRP;
    var txtLaborClass1RP;
    var txtLaborCategoryID;
    var txtLaborCategoryRP;
    var btnLaborCategoryRP;
    var txtLaborCategory1RP;
    var _ScreenLanguage;
    function InitalizeComponent() {
        GeneralReports.OnClear = Clear;
        GeneralReports.OnPrint = Print;
        _ScreenLanguage = ClientSharedWork.Session.ScreenLanguage;
        InitalizeControls();
        InitalizeEvents();
    }
    Laborutilization.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        FromDate = DocumentActions.GetElementById("FromDate");
        ToDate = DocumentActions.GetElementById("ToDate");
        txtLaborClassID = DocumentActions.GetElementById("txtLaborClassID");
        txtLaborClassRP = DocumentActions.GetElementById("txtLaborClassRP");
        btnLaborClassRP = DocumentActions.GetElementById("btnLaborClassRP");
        txtLaborClass1RP = DocumentActions.GetElementById("txtLaborClass1RP");
        txtLaborCategoryID = DocumentActions.GetElementById("txtLaborCategoryID");
        txtLaborCategoryRP = DocumentActions.GetElementById("txtLaborCategoryRP");
        btnLaborCategoryRP = DocumentActions.GetElementById("btnLaborCategoryRP");
        txtLaborCategory1RP = DocumentActions.GetElementById("txtLaborCategory1RP");
    }
    function Clear() {
        debugger;
        FromDate.value = DateFormat(new Date().toString());
        ToDate.value = DateFormat(new Date().toString());
        txtLaborClassID.value = "";
        txtLaborClassRP.value = "";
        txtLaborClass1RP.value = "";
        txtLaborCategoryID.value = "";
        txtLaborCategoryRP.value = "";
        txtLaborCategory1RP.value = "";
    }
    function Print() {
        debugger;
        //let RP: ReportParameters = new ReportParameters();
        //RP.CompCode = SharedSession.CurrentEnvironment.CompCode;
        //if (Number(txtsubcontrRP.value) == 0) {
        //    MessageBox.Show("You Must Select", "Info");
        //    return;
        //}
        ////RP.braCode = 'فرع 1';                                                        
        //RP.SubID = Number(txtsubcontrID.value);
        //RP.ContrNo = Number(txtContactRPID.value);
        //RP.Sono = Number();
        //RP.ProjectID = Number(txtprojectID.value);
        //RP.Phaseid = Number(txtphaseRPID.value);
        //RP.FromDate = DateFormat(FromDate.value);
        //RP.ToDate = DateFormat(ToDate.value);
        //if (<boolean>$("#RDByShowContracts").prop("checked")) {
        //    RP.TypeReport = 1;
        //    Ajax.CallAsync({
        //        url: Url.Action("rptSlsActivityContract", "GeneralReports"),
        //        data: RP,
        //        success: (d) => {
        //            debugger
        //            let result = d.result as string;
        //            window.open(result, "_blank");
        //        }
        //    })
        //}
        //if (<boolean>$("#RDByProductionEntry").prop("checked")) {
        //    RP.TypeReport = 2;
        //    Ajax.CallAsync({
        //        url: Url.Action("rptSlsActivityContract", "GeneralReports"),
        //        data: RP,
        //        success: (d) => {
        //            debugger
        //            let result = d.result as string;
        //            window.open(result, "_blank");
        //        }
        //    })
        //}
        //if (<boolean>$("#RDByServiceOrder").prop("checked")) {
        //    RP.TypeReport = 3;
        //    Ajax.CallAsync({
        //        url: Url.Action("rptSlsActivityContract", "GeneralReports"),
        //        data: RP,
        //        success: (d) => {
        //            debugger
        //            let result = d.result as string;
        //            window.open(result, "_blank");
        //        }
        //    })
        //}
    }
    function InitalizeEvents() {
        debugger;
        //$("#RDByShowContracts").prop("checked", "checked");
        btnLaborClassRP.onclick = btnLaborClassRP_Click;
        btnLaborCategoryRP.onclick = btnLaborCategoryRP_Click;
    }
    function btnLaborClassRP_Click() {
        sys.FindKey(Modules.LaborAssign, "btnSearchClass", "", function () {
            debugger;
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetLaborClass", ControllerName),
                data: { id: _Id },
                success: function (d) {
                    var result = d.result;
                    txtLaborClassID.value = result.LaborClassId.toString();
                    txtLaborClassRP.value = result.ClassCode.toString();
                    if (_ScreenLanguage == "ar") {
                        debugger;
                        txtLaborClass1RP.value = result.DescA;
                    }
                    else {
                        debugger;
                        txtLaborClass1RP.value = result.DescE;
                    }
                }
            });
        });
    }
    function btnLaborCategoryRP_Click() {
        sys.FindKey(Modules.LaborMonitoring, "butCategCode", "", function () {
            debugger;
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetLaborCategory", ControllerName),
                data: { id: _Id },
                success: function (d) {
                    var result = d.result;
                    txtLaborCategoryID.value = result.LaborCategoryId.toString();
                    txtLaborCategoryRP.value = result.CategCode.toString();
                    if (_ScreenLanguage == "ar") {
                        txtLaborCategory1RP.value = result.DescA.toString();
                    }
                    else {
                        txtLaborCategory1RP.value = result.DescE.toString();
                    }
                }
            });
        });
    }
})(Laborutilization || (Laborutilization = {}));
//# sourceMappingURL=Laborutilization.js.map