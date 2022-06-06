$(document).ready(() => {
    SiteEngReport.InitalizeComponent();
});
namespace SiteEngReport {
    var sys: SystemTools = new SystemTools();
    var ajaxCall: AjaxCaller = new AjaxCaller();
    var Area: G_BRANCH = new G_BRANCH();
    export var CatCode: P_D_SiteEngCategory = new P_D_SiteEngCategory();
    var txtSiteEngCategoryIdRp: HTMLInputElement=null;
    var txtDescECatRp: HTMLInputElement = null;
    var butSiteEngCategoryIdRp: HTMLButtonElement;
    var txtBraCodeRp: HTMLInputElement = null;
    var txtAreaNameRp: HTMLInputElement=null;
    var btnAreaRp: HTMLButtonElement;
    //Just put the elements IDs  
    var SiteEngCode: number;

    //Initalize The Current Popup
    export function InitalizeComponent() {
        
        //SharedSession.CurrentEnvironment.ScreenLanguage = SharedSession.CurrentEnvironment.ScreenLanguage;
        GeneralReports.OnClear = Clear;
        GeneralReports.OnPrint = Print;
        InitalizeControls();
        InitalizeEvents();

    }
    function InitalizeControls() {
        txtSiteEngCategoryIdRp = DocumentActions.GetElementById<HTMLInputElement>("txtSiteEngCategoryIdRp");
        txtDescECatRp = DocumentActions.GetElementById<HTMLInputElement>("txtDescECatRp");
        butSiteEngCategoryIdRp = DocumentActions.GetElementById<HTMLButtonElement>("butSiteEngCategoryIdRp");
        txtBraCodeRp = DocumentActions.GetElementById<HTMLInputElement>("txtBraCodeRp");
        txtAreaNameRp = DocumentActions.GetElementById<HTMLInputElement>("txtAreaNameRp");
        btnAreaRp = DocumentActions.GetElementById<HTMLButtonElement>("btnAreaRp");
        txtBraCodeRp.value = "";
    }
    function InitalizeEvents() {
        debugger

        butSiteEngCategoryIdRp.onclick = btnCategoryCode_Click;

        btnAreaRp.onclick = btnBraCode_Click;
    }

    //Print Current Report
    function Print() {

        let rp: ReportParameters = new ReportParameters();
        
        rp.CompCode = SharedSession.CurrentEnvironment.CompCode;
        rp.braCode = SharedSession.CurrentEnvironment.BranchCode;

        rp.CatID = SiteEngCode;
        rp.bra = Number(txtBraCodeRp.value);
        if (<boolean>$("#ActiveRp").prop("checked")) { rp.Active = 1; }
        else if (<boolean>$("#NoActiveRp").prop("checked")) { rp.Active = 0; }
        else if (<boolean>$("#AllRp").prop("checked")) { rp.Active = null; };

        Ajax.CallAsync({
            url: Url.Action("rptSiteEng", "GeneralReports"),
            data: rp,
            success: (d) => {
                let result = d.result as string;
                window.open(result, "_blank");
            }
        })
    }
    function Clear() {
        txtAreaNameRp.value = "";

        txtSiteEngCategoryIdRp.value = "";

        txtDescECatRp.value = "";
        txtBraCodeRp.value = "";
        $("#AllRp").prop("checked", "checked");
    }

    function btnBraCode_Click() {
        sys.FindKey(Modules.SiteEngineer, "btnAreaRp", "COMP_CODE = " + ClientSharedWork.Session.CompCode, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getArea", "SiteEngineer"),
                data: { id: id },
                success: (d) => {
                    Area = d.result as G_BRANCH;
                    txtBraCodeRp.value = Area.BRA_CODE.toString();
                    if (ClientSharedWork.Session.ScreenLanguage == "ar")
                        txtAreaNameRp.value = Area.BRA_DESCL.toString();
                    else
                        txtAreaNameRp.value = Area.BRA_DESC.toString();
                }
            });
        });
    }
    function btnCategoryCode_Click() {
        
        sys.FindKey(Modules.SiteEngineer, "butSiteEngCategoryIdRp", "CompCode = " + ClientSharedWork.Session.CompCode, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getCategoryCode", "SiteEngineer"),
                data: { id: id },
                success: (d) => {
                    
                    let CatCode = d.result as P_D_SiteEngCategory;
                    SiteEngCode = CatCode.SiteEngCategoryId;
                    txtSiteEngCategoryIdRp.value = CatCode.CategCode.toString();
                    if (ClientSharedWork.Session.ScreenLanguage == "ar")
                        txtDescECatRp.value = CatCode.DescA.toString();
                    else
                        txtDescECatRp.value = CatCode.DescE.toString();
                }
            });
        });
    }
}