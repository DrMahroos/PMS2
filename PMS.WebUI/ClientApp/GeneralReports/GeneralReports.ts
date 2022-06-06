$(document).ready(() => {
    GeneralReports.InitalizeComponent();
})
namespace GeneralReports {

    export var OnPrint: () => void;
    export var OnClear: () => void;
    export var OnLangChange: () => void;

    export function Print() {
        if (OnPrint != null)
            OnPrint();
    }

    export function Clear() {
        if (OnClear != null)
            OnClear();
    }
    export function LangChange() {

        LanguageButton_Click();


    }

    function RemoveStyleSheet(fileName: string) {
        let href = "/css/" + fileName + ".css";
        $("link[rel=stylesheet][href~='" + href + "']").remove();
    }

    function AppendStyleSheet(fileName: string) {
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

  

    var btnScreenHelp: HTMLButtonElement = null;
    export function InitalizeComponent() {
        btnScreenHelp = document.getElementById("btnScreenHelpRep") as HTMLInputElement;
       // btnScreenHelp.onclick = ScreenHelp;
    }

    function ScreenHelp() {
        let ModuleCode = SharedSession.CurrentEnvironment.ModuleCode;

        Ajax.CallAsync(
            {
                url: Url.Action("GetHelp", "Help"),
                data: { ModuleCode: ModuleCode },
                success: (d) => {
                    let res = d.result as G_ModuleHelp;
                    if (res != null) {
                        if (SharedSession.CurrentEnvironment.ScreenLanguage == "ar") {
                            $("#modalHelpRep").html(`<div style="direction:rtl" >` + res.HelpBody_Ar + `</div>`);
                        }
                        else {
                            $("#modalHelpRep").html(`<div style="direction:ltr" >` + res.HelpBody_En + `</div>`);
                        }
                    }
                }
            }
        );



    }
}