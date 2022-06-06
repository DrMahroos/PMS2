$(document).ready(function () {
    LaborEvaluation.InitalizeComponent();
});
var LaborEvaluation;
(function (LaborEvaluation) {
    var sys = new SystemTools();
    var ControllerName = "LaborEvaluation";
    var categ = new P_D_ScopeCategory();
    var Model = new P_D_Location();
    var FromDate;
    var ToDate;
    //---
    var txtFromLabor;
    var txtToLabor;
    //--
    var txtFromProject;
    var txtToProject;
    //--
    var txtLaborClass;
    var txtLaborClassCod;
    var txtLaborClassDesc;
    var btntxtLaborClassID;
    //----
    var txtLaborcat;
    var txtLaborcatCod;
    var txtLaborcatDesc;
    var btntxtLaborcatID;
    //----
    var txtProjectEng;
    var txtProjectEngCod;
    var txtProjectEngDes;
    var btnProjectEng;
    //---
    var RedByLabor;
    var RedByProject;
    var RedSum;
    var _CompCode;
    var _BranchCode;
    var btnPrint;
    var _ScreenLanguage;
    _CompCode = SharedSession.CurrentEnvironment.CompCode;
    _BranchCode = SharedSession.CurrentEnvironment.BranchCode;
    function InitalizeComponent() {
        debugger;
        GeneralReports.OnClear = Clear;
        GeneralReports.OnPrint = Print;
        _ScreenLanguage = ClientSharedWork.Session.ScreenLanguage;
        InitalizeControls();
        FromDate.value = DateFormat(new Date().toString());
        ToDate.value = DateFormat(new Date().toString());
        txtFromLabor.value = "";
        txtToLabor.value = "";
        txtFromProject.value = "1";
        txtToProject.value = "999999";
        txtLaborcat.value = "";
        txtLaborcatCod.value = "";
        txtLaborcatDesc.value = "";
        txtLaborClass.value = "";
        txtLaborClassCod.value = "";
        txtLaborClassDesc.value = "";
        RedByLabor.checked = true;
        InitalizeEvents();
    }
    LaborEvaluation.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        debugger;
        FromDate = DocumentActions.GetElementById("FromDate");
        ToDate = DocumentActions.GetElementById("ToDate");
        txtFromLabor = DocumentActions.GetElementById("txtFromLabor");
        txtToLabor = DocumentActions.GetElementById("txtToLabor");
        txtFromProject = DocumentActions.GetElementById("txtFromProject");
        txtToProject = DocumentActions.GetElementById("txtToProject");
        txtLaborClass = DocumentActions.GetElementById("txtLaborClass");
        txtLaborClassCod = DocumentActions.GetElementById("txtLaborClassCod");
        txtLaborClassDesc = DocumentActions.GetElementById("txtLaborClassDesc");
        btntxtLaborClassID = DocumentActions.GetElementById("btntxtLaborClassID");
        txtLaborcat = DocumentActions.GetElementById("txtLaborcat");
        txtLaborcatCod = DocumentActions.GetElementById("txtLaborcatCod");
        txtLaborcatDesc = DocumentActions.GetElementById("txtLaborcatDesc");
        btntxtLaborcatID = DocumentActions.GetElementById("btntxtLaborcatID");
        txtProjectEng = DocumentActions.GetElementById("txtProjectEng");
        txtProjectEngCod = DocumentActions.GetElementById("txtProjectEngCod");
        txtProjectEngDes = DocumentActions.GetElementById("txtProjectEngDes");
        btnProjectEng = DocumentActions.GetElementById("btnProjectEng");
        RedByLabor = DocumentActions.GetElementById("RedByLabor");
        RedByProject = DocumentActions.GetElementById("RedByProject");
        RedSum = DocumentActions.GetElementById("RedSum");
        //--------------
    }
    function Clear() {
        FromDate.value = DateFormat(new Date().toString());
        ToDate.value = DateFormat(new Date().toString());
        txtFromLabor.value = "";
        txtToLabor.value = "";
        txtFromProject.value = "1";
        txtToProject.value = "999999";
        txtLaborcat.value = "";
        txtLaborcatCod.value = "";
        txtLaborcatDesc.value = "";
        txtLaborClass.value = "";
        txtLaborClassCod.value = "";
        txtLaborClassDesc.value = "";
        RedByLabor.checked = true;
    }
    function InitalizeEvents() {
        debugger;
        btnProjectEng.onclick = btnProjectEng_onclick;
        btntxtLaborClassID.onclick = btntxtLaborClassID_onclick;
        btntxtLaborcatID.onclick = btntxtLaborcatID_onclick;
    }
    function btnProjectEng_onclick() {
        sys.FindKey(Modules.RepLaborEvaluation, "btnProjectEng", "compCode = " + _CompCode + " and BraCode = " + _BranchCode, function () {
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getEngineerByID", ControllerName),
                data: { id: _Id },
                success: function (d) {
                    var result = d.result;
                    if (result != null) {
                        txtProjectEng.value = result.SiteEngineerId.toString();
                        txtProjectEngCod.value = result.EngCode;
                        txtProjectEngDes.value = _ScreenLanguage == "ar" ? result.DescA : result.DescE;
                    }
                }
            });
        });
    }
    function btntxtLaborClassID_onclick() {
        sys.FindKey(Modules.RepLaborEvaluation, "btntxtLaborClassID", "", function () {
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            debugger;
            Ajax.CallAsync({
                url: Url.Action("getLaborClassbyid", ControllerName),
                data: { id: _Id },
                success: function (d) {
                    var _result = d.result;
                    txtLaborClass.value = _result.LaborClassId.toString();
                    txtLaborClassCod.value = _result.ClassCode.toString();
                    txtLaborClassDesc.value = _ScreenLanguage == "en" ? _result.DescE : _result.DescA;
                    ;
                }
            });
        });
    }
    function btntxtLaborcatID_onclick() {
        sys.FindKey(Modules.RepLaborEvaluation, "btntxtLaborcatID", "", function () {
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            debugger;
            Ajax.CallAsync({
                url: Url.Action("getLaborcatbyid", ControllerName),
                data: { id: _Id },
                success: function (d) {
                    var _result = d.result;
                    txtLaborcat.value = _result.LaborCategoryId.toString();
                    txtLaborcatCod.value = _result.CategCode.toString();
                    txtLaborcatDesc.value = _ScreenLanguage == "en" ? _result.DescE : _result.DescA;
                    ;
                }
            });
        });
    }
    function Print() {
        debugger;
        var RP = new ReportParameters();
        RP.CompCode = SharedSession.CurrentEnvironment.CompCode;
        RP.braCode = SharedSession.CurrentEnvironment.BranchCode;
        RP.FromProjCode = txtFromProject.value;
        RP.ToProjCode = txtToProject.value;
        RP.FromLabCode = txtFromLabor.value;
        RP.ToLabCode = txtToLabor.value;
        RP.FromDate = FromDate.value;
        RP.ToDate = ToDate.value;
        RP.LabClassID = Number(txtLaborClass.value);
        RP.LabCatID = Number(txtLaborcat.value);
        RP.EngID = Number(txtProjectEng.value);
        if (RedByLabor.checked == true)
            RP.TypeReport = 1;
        else if (RedByProject.checked == true)
            RP.TypeReport = 2;
        else if (RedSum.checked == true)
            RP.TypeReport = 3;
        Ajax.CallAsync({
            url: Url.Action("Rep_repLaborEvaluation", "GeneralReports"),
            data: RP,
            success: function (d) {
                debugger;
                var result = d.result;
                window.open(result, "_blank");
            }
        });
    }
})(LaborEvaluation || (LaborEvaluation = {}));
//# sourceMappingURL=LaborEvaluation.js.map