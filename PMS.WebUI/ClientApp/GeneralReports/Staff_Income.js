var Staff_Income;
(function (Staff_Income) {
    var sys = new SystemTools();
    //Just put the elements IDs
    var Elements;
    (function (Elements) {
        Elements.txtFromDate = null;
        Elements.txtToDate = null;
        Elements.cmbDepartment = null;
    })(Elements || (Elements = {}));
    //Initalize The Current Popup
    function InitalizeComponent() {
        ClientSharedWork.Session.ScreenLanguage = ClientSharedWork.Session.Language;
        GeneralReports.OnClear = Clear;
        GeneralReports.OnPrint = Print;
        GeneralReports.localizeReport();
        InitalizeElements();
        FillDepartments();
        SwitchLanguage();
        var val = $("#rpTitle").text();
        $("#TitleSpan").html(val);
    }
    Staff_Income.InitalizeComponent = InitalizeComponent;
    function SwitchLanguage() {
        DocumentActions.SwitchLanguage();
    }
    //Fixed: Initalize The Elements
    function InitalizeElements() {
        var arr = Object.getOwnPropertyNames(Elements);
        for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
            var elem = arr_1[_i];
            Elements[elem] = document.getElementById(elem);
        }
        Elements.txtFromDate.value = DateFormat(new Date().toString());
        Elements.txtToDate.value = DateFormat(new Date().toString());
    }
    //Specific Functions
    function FillDepartments() {
        var opt = {
            url: Url.Action("LoadData", "Department"),
            success: function (d) {
                var result = d.result;
                DocumentActions.FillComboWithEmpty(result, Elements.cmbDepartment, "DepartmentID", "DescL");
            }
        };
        Ajax.CallAsync(opt);
    }
    //Clear Controls
    function Clear() {
        Elements.txtFromDate.value = DateFormat(new Date().toString());
        Elements.txtToDate.value = DateFormat(new Date().toString());
        Elements.cmbDepartment.selectedIndex = 0;
    }
    //Print Current Report
    function Print() {
        debugger;
        var rp = new ReportParameters();
        rp.CompCode = ClientSharedWork.Session.CompCode;
        rp.braCode = ClientSharedWork.Session.BranchCode;
        rp.FromDate = DateFormat(Elements.txtFromDate.value);
        rp.ToDate = DateFormat(Elements.txtToDate.value);
        //rp.UserCode = Elements.txtUSER_CODE.value;
        rp.DepartmentID = Number(Elements.cmbDepartment.value);
        Ajax.CallAsync({
            url: Url.Action("rptStaff_Income", "GeneralReports"),
            data: rp,
            success: function (d) {
                var result = d.result;
                window.open(result, "_blank");
            }
        });
    }
})(Staff_Income || (Staff_Income = {}));
//# sourceMappingURL=Staff_Income.js.map