$(document).ready(function () {
    GeneralReports.InitalizeComponent();
});
var GeneralReports;
(function (GeneralReports) {
    function Print() {
        if (GeneralReports.OnPrint != null)
            GeneralReports.OnPrint();
    }
    GeneralReports.Print = Print;
    function Clear() {
        if (GeneralReports.OnClear != null)
            GeneralReports.OnClear();
    }
    GeneralReports.Clear = Clear;
    function LangChange() {
        LanguageButton_Click();
    }
    GeneralReports.LangChange = LangChange;
    function RemoveStyleSheet(fileName) {
        var href = "/css/" + fileName + ".css";
        $("link[rel=stylesheet][href~='" + href + "']").remove();
    }
    function AppendStyleSheet(fileName) {
        var lnk = document.createElement('link');
        lnk.href = "/css/" + fileName + ".css";
        lnk.rel = 'stylesheet';
        lnk.type = 'text/css';
        document.getElementsByTagName("body")[0].appendChild(lnk);
    }
    function LanguageButton_Click() {
        if (SharedSession.CurrentEnvironment.ScreenLanguage == "ar") { // English Mode
            SharedSession.CurrentEnvironment.ScreenLanguage = "en";
            AppendStyleSheet("bootstrap.min");
            RemoveStyleSheet("bootstrap-arabic.min");
        }
        else { // Arabic Mode
            SharedSession.CurrentEnvironment.ScreenLanguage = "ar";
            RemoveStyleSheet("bootstrap.min");
            AppendStyleSheet("bootstrap-arabic.min");
        }
        var val = $("#rpTitle").text();
        $("#TitleSpan").html(val);
    }
    var btnScreenHelp = null;
    function InitalizeComponent() {
        btnScreenHelp = document.getElementById("btnScreenHelpRep");
        // btnScreenHelp.onclick = ScreenHelp;
    }
    GeneralReports.InitalizeComponent = InitalizeComponent;
    function ScreenHelp() {
        var ModuleCode = SharedSession.CurrentEnvironment.ModuleCode;
        Ajax.CallAsync({
            url: Url.Action("GetHelp", "Help"),
            data: { ModuleCode: ModuleCode },
            success: function (d) {
                var res = d.result;
                if (res != null) {
                    if (SharedSession.CurrentEnvironment.ScreenLanguage == "ar") {
                        $("#modalHelpRep").html("<div style=\"direction:rtl\" >" + res.HelpBody_Ar + "</div>");
                    }
                    else {
                        $("#modalHelpRep").html("<div style=\"direction:ltr\" >" + res.HelpBody_En + "</div>");
                    }
                }
            }
        });
    }
})(GeneralReports || (GeneralReports = {}));
//# sourceMappingURL=GeneralReports.js.map