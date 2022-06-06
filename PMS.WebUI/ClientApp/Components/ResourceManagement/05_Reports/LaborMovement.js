$(document).ready(function () {
    LaborMovement.InitalizeComponent();
});
var LaborMovement;
(function (LaborMovement) {
    var sys = new SystemTools();
    var ControllerName = "LaborMovement";
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
    var txtFromLaborID;
    var txtFromLaborRP;
    var btnFromLaborRP;
    var txtFromLabor1RP;
    var txtToLaborID;
    var txtToLaborRP;
    var btnToLaborRP;
    var txtToLabor1RP;
    var _ScreenLanguage;
    function InitalizeComponent() {
        GeneralReports.OnClear = Clear;
        GeneralReports.OnPrint = Print;
        _ScreenLanguage = ClientSharedWork.Session.ScreenLanguage;
        InitalizeControls();
        InitalizeEvents();
    }
    LaborMovement.InitalizeComponent = InitalizeComponent;
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
        //txtFromLaborID = DocumentActions.GetElementById<HTMLInputElement>("txtFromLaborID");
        txtFromLaborRP = DocumentActions.GetElementById("txtFromLaborRP");
        //btnFromLaborRP = DocumentActions.GetElementById<HTMLButtonElement>("btnFromLaborRP");
        //txtFromLabor1RP = DocumentActions.GetElementById<HTMLInputElement>("txtFromLabor1RP");
        //txtToLaborID = DocumentActions.GetElementById<HTMLInputElement>("txtToLaborID");
        txtToLaborRP = DocumentActions.GetElementById("txtToLaborRP");
        //btnToLaborRP = DocumentActions.GetElementById<HTMLButtonElement>("btnToLaborRP");
        //txtToLabor1RP = DocumentActions.GetElementById<HTMLInputElement>("txtToLabor1RP");
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
        //txtFromLaborID.value = "";
        txtFromLaborRP.value = "";
        //txtFromLabor1RP.value = "";
        //txtToLaborID.value = "";
        txtToLaborRP.value = "";
        //txtToLabor1RP.value = "";
    }
    function Print() {
        debugger;
        var RP = new ReportParameters();
        if (DateFormat(FromDate.value) == "NaN-NaN-NaN" || DateFormat(ToDate.value) == "NaN-NaN-NaN") {
            MessageBox.Show(" you must select Date", "Info");
            return;
        }
        else if (DateFormat(FromDate.value) > DateFormat(ToDate.value)) {
            MessageBox.Show(" From date  is largethan To Date", "Info");
            return;
        }
        else {
            debugger;
            RP.CompCode = SharedSession.CurrentEnvironment.CompCode;
            RP.braCode = SharedSession.CurrentEnvironment.BranchCode;
            RP.FromDate = DateFormat(FromDate.value);
            RP.ToDate = DateFormat(ToDate.value);
            RP.LabClassID = Number(txtLaborClassID.value);
            RP.LabCatID = Number(txtLaborCategoryID.value);
            RP.FromLabCode = (txtFromLaborRP.value).toString();
            RP.ToLabCode = (txtToLaborRP.value).toString();
            debugger;
            if ($("#ByLabor").prop("checked")) {
                RP.TypeReport = 1;
                Ajax.CallAsync({
                    url: Url.Action("rptRes_LaborMovement_print", "GeneralReports"),
                    data: RP,
                    success: function (d) {
                        debugger;
                        var result = d.result;
                        window.open(result, "_blank");
                    }
                });
            }
            if ($("#FreeLAbor").prop("checked")) {
                RP.TypeReport = 2;
                Ajax.CallAsync({
                    url: Url.Action("rptRes_LaborMovement_print", "GeneralReports"),
                    data: RP,
                    success: function (d) {
                        debugger;
                        var result = d.result;
                        window.open(result, "_blank");
                    }
                });
            }
            //if ($("#ByLabor").prop("checked", "checked")) {
            //    RP.TypeReport = 1;
            //    Ajax.CallAsync({
            //        url: Url.Action("rptRes_LaborMovement_print", "GeneralReports"),
            //        data: RP,
            //        success: (d) => {
            //            debugger
            //            let result = d.result as string;
            //            window.open(result, "_blank");
            //        }
            //    })
            //}
            //else if ($("#FreeLAbor").prop("checked", "checked")) {
            //    RP.TypeReport = 2;
            //    debugger;
            //    Ajax.CallAsync({
            //        url: Url.Action("rptRes_LaborMovement_print", "GeneralReports"),
            //        data: RP,
            //        success: (d) => {
            //            debugger
            //            let result = d.result as string;
            //            window.open(result, "_blank");
            //        }
            //    })
            //}
        }
    }
    function InitalizeEvents() {
        debugger;
        //$("#RDByShowContracts").prop("checked", "checked");
        FromDate.value = DateFormat(new Date().toString());
        ToDate.value = DateFormat(new Date().toString());
        btnLaborClassRP.onclick = btnLaborClassRP_Click;
        btnLaborCategoryRP.onclick = btnLaborCategoryRP_Click;
        btnFromLaborRP.onclick = btnFromLaborRP_Click;
        btnToLaborRP.onclick = btnToLaborRP_Click;
    }
    function btnLaborClassRP_Click() {
        debugger;
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
        debugger;
        sys.FindKey(Modules.LaborMonitoring, "butCategCode", "", function () {
            debugger;
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetSrchLaborCategory", ControllerName),
                data: { id: _Id },
                success: function (d) {
                    var result = d.result;
                    txtLaborCategoryID.value = result.LaborCategoryId.toString();
                    txtLaborCategoryRP.value = result.CategCode.toString();
                    if (_ScreenLanguage == "ar") {
                        txtLaborCategory1RP.value = result.DescA;
                    }
                    else {
                        txtLaborCategory1RP.value = result.DescE;
                    }
                }
            });
        });
    }
    function btnFromLaborRP_Click() {
        debugger;
        sys.FindKey(Modules.LaborRequest, "butShowFree", "", function () {
            debugger;
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetSrchFromLabor", ControllerName),
                data: { id: _Id },
                success: function (d) {
                    var result = d.result;
                    txtFromLaborID.value = result.LaborID.toString();
                    txtFromLaborRP.value = result.LaborCode;
                    if (_ScreenLanguage == "ar") {
                        txtFromLabor1RP.value = result.DescA;
                    }
                    else {
                        txtFromLabor1RP.value = result.DescE;
                    }
                }
            });
        });
    }
    function btnToLaborRP_Click() {
        debugger;
        sys.FindKey(Modules.LaborRequest, "butShowFree", "", function () {
            debugger;
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetSearchToLabor", ControllerName),
                data: { id: _Id },
                success: function (d) {
                    debugger;
                    var result = d.result;
                    txtToLaborID.value = result.LaborID.toString();
                    txtToLaborRP.value = result.LaborCode.toString();
                    if (_ScreenLanguage == "ar") {
                        txtToLabor1RP.value = result.DescA;
                    }
                    else {
                        txtToLabor1RP.value = result.DescE;
                    }
                }
            });
        });
    }
})(LaborMovement || (LaborMovement = {}));
//# sourceMappingURL=LaborMovement.js.map