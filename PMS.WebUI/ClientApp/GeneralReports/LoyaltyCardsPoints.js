var LoyaltyCardsPoints;
(function (LoyaltyCardsPoints) {
    var sys = new SystemTools();
    var Elements;
    (function (Elements) {
        Elements.txtFromDate = null;
        Elements.txtToDate = null;
    })(Elements || (Elements = {}));
    //Initalize The Current Popup
    function InitalizeComponent() {
        ClientSharedWork.Session.ScreenLanguage = ClientSharedWork.Session.Language;
        GeneralReports.OnClear = Clear;
        GeneralReports.OnPrint = Print;
        InitalizeElements();
        GeneralReports.localizeReport();
        // GeneralReports.OnchangeLang = LanguageButton_Click;
        SwitchLanguage();
        var val = $("#rpTitle").text();
        $("#TitleSpan").html(val);
    }
    LoyaltyCardsPoints.InitalizeComponent = InitalizeComponent;
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
        Elements.txtFromDate.onchange = DateOnChange;
        Elements.txtToDate.onchange = DateOnChange;
    }
    //Specific Functions
    function DateOnChange() {
        debugger;
        if (ClientSharedWork.CurrentUserModule.CUSTOM1 == true) {
            return;
        }
        else {
            if (ClientSharedWork.Session.ScreenLanguage == "ar") {
                Elements.txtFromDate.value = DateFormat(new Date().toString());
                Elements.txtToDate.value = DateFormat(new Date().toString());
                MessageBox.Show("ليس لديك صلاحية لتعديل التاريخ", "خطأ");
            }
            else {
                MessageBox.Show("No permission for changing date", "Error");
            }
        }
    }
    //Clear Controls
    function Clear() {
        Elements.txtFromDate.value = DateFormat(new Date().toString());
        Elements.txtToDate.value = DateFormat(new Date().toString());
    }
    //Print Current Report
    function Print() {
        debugger;
        var rp = new ReportParameters();
        rp.CompCode = ClientSharedWork.Session.CompCode;
        rp.braCode = ClientSharedWork.Session.BranchCode;
        rp.FromDate = DateFormat(Elements.txtFromDate.value);
        rp.ToDate = DateFormat(Elements.txtToDate.value);
        Ajax.CallAsync({
            url: Url.Action("rptCenterLoyalty", "GeneralReports"),
            data: rp,
            success: function (d) {
                var result = d.result;
                window.open(result, "_blank");
            }
        });
    }
})(LoyaltyCardsPoints || (LoyaltyCardsPoints = {}));
//# sourceMappingURL=LoyaltyCardsPoints.js.map