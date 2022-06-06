var SharedPMS = /** @class */ (function () {
    function SharedPMS() {
    }
    SharedPMS.GetProjectNo = function (Id) {
        return "";
    };
    SharedPMS.GetPhaseNo = function (dateForm) {
        return "";
    };
    return SharedPMS;
}());
function GetLocationById(id) {
    var _Result = new P_D_Location();
    _Result = Ajax.Call({ url: Url.Action("GetLoctionById", "OfferDefinition"), data: { id: id } });
    return _Result;
}
function GetCustomersById(id) {
    var _Result = new P_D_SalesCustomer();
    _Result = Ajax.Call({ url: Url.Action("GetByID", "Customers"), data: { id: id } });
    return _Result;
}
function GetSalesEgineerById(id) {
    var _Result = new P_D_SalesEgineer();
    _Result = Ajax.Call({ url: Url.Action("GetByID", "SalesEngineer"), data: { id: id } });
    return _Result;
}
function OpenReportsPopup(moduleCode) {
    var opt = {
        url: Url.Action(moduleCode, "GeneralReports"),
        success: function (d) {
            var result = d;
            $("#ReportPopupBody").html(result);
            $("#ReportsPopupDialog").modal("show");
            $('#ReportsPopupDialog').modal({
                refresh: true
            });
            var val = $("#rpTitle").text();
            $("#TitleSpanRep").html(val);
        }
    };
    Ajax.CallAsync(opt);
}
function GetCostCenterById(Code) {
    var _Result = new G_COST_CENTER();
    _Result = Ajax.Call({ url: Url.Action("GetCostCenterByID", "ProjectSpecification"), data: { Code: Code } });
    return _Result;
}
//# sourceMappingURL=SharedPMS.js.map