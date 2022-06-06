$(document).ready(() => {
    LaborReport.InitalizeComponent();
});
namespace LaborReport {
    var sys: SystemTools = new SystemTools();
    var ajaxCall: AjaxCaller = new AjaxCaller();
    var Area: G_BRANCH = new G_BRANCH();
    export var CatCode: P_D_LaborCategory = new P_D_LaborCategory();
    var txtLaborCategoryIdRp: HTMLInputElement = null;
    var txtLaborClassNameRp: HTMLInputElement = null;
    var btnCategoryCodeRp: HTMLButtonElement;
    var txtLaborCategoryNameRp: HTMLInputElement = null;
    var txtLaborClassIdRp: HTMLInputElement = null;
    var btnClassCodeRp: HTMLButtonElement;
    var txtBraCodeRp: HTMLInputElement = null;
    var txtBraCodeRp: HTMLInputElement = null;
    var txtAreaNameRp: HTMLInputElement = null;
    var btnAreaRp: HTMLButtonElement;
    var Master: P_D_Labor = new P_D_Labor();
    var laborCat: P_D_LaborCategory = new P_D_LaborCategory();
    var laborClass: P_D_LaborClass = new P_D_LaborClass();
    //Just put the elements IDs  
    var LaborCatId: number;
    var LaborclassId: number;
    //Initalize The Current Popup
    export function InitalizeComponent() {
        
        //SharedSession.CurrentEnvironment.ScreenLanguage = SharedSession.CurrentEnvironment.ScreenLanguage;
        GeneralReports.OnClear = Clear;
        GeneralReports.OnPrint = Print;
        InitalizeControls();
        InitalizeEvents();

    }
    function InitalizeControls() {
        txtLaborCategoryIdRp = DocumentActions.GetElementById<HTMLInputElement>("txtLaborCategoryIdRp");
        txtLaborClassNameRp = DocumentActions.GetElementById<HTMLInputElement>("txtLaborClassNameRp");
        btnCategoryCodeRp = DocumentActions.GetElementById<HTMLButtonElement>("btnCategoryCodeRp");
        txtLaborCategoryNameRp = DocumentActions.GetElementById<HTMLInputElement>("txtLaborCategoryNameRp");
        txtLaborClassIdRp = DocumentActions.GetElementById<HTMLInputElement>("txtLaborClassIdRp");
        btnClassCodeRp = DocumentActions.GetElementById<HTMLButtonElement>("btnClassCodeRp");
        txtBraCodeRp = DocumentActions.GetElementById<HTMLInputElement>("txtBraCodeRp");
        txtAreaNameRp = DocumentActions.GetElementById<HTMLInputElement>("txtAreaNameRp");
        btnAreaRp = DocumentActions.GetElementById<HTMLButtonElement>("btnAreaRp");
        txtLaborCategoryNameRp.value = "";
    }
    function InitalizeEvents() {
        debugger

        btnCategoryCodeRp.onclick = btnCategoryCode_Click;

        btnClassCodeRp.onclick = btnClassCode_Click;
        btnAreaRp.onclick = btnBraCode_Click;
    }

    //Print Current Report
    function Print() {

        let rp: ReportParameters = new ReportParameters();
        
        rp.CompCode = SharedSession.CurrentEnvironment.CompCode;
        rp.braCode = SharedSession.CurrentEnvironment.BranchCode;

        rp.CatID = LaborCatId;
        rp.bra = Number(txtBraCodeRp.value);
        rp.ClassID = LaborclassId;
        if (<boolean>$("#ActiveRp").prop("checked")) { rp.Active = 1; }
        else if (<boolean>$("#NoActiveRp").prop("checked")) { rp.Active = 0; }
        else if (<boolean>$("#AllRp").prop("checked")) { rp.Active = null; };

        Ajax.CallAsync({
            url: Url.Action("rptLabor", "GeneralReports"),
            data: rp,
            success: (d) => {
                let result = d.result as string;
                window.open(result, "_blank");
            }
        })
    }
    function Clear() {
        txtLaborClassIdRp.value = "";

        txtLaborCategoryIdRp.value = "";

        txtLaborClassNameRp.value = "";
        txtLaborCategoryNameRp.value = "";
        $("#AllRp").prop("checked", "checked");
    }

    function btnBraCode_Click() {
        sys.FindKey(Modules.laborArea, "btnAreaRp", "COMP_CODE = " + ClientSharedWork.Session.CompCode, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getArea", "LaborDefinition"),
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
        sys.FindKey(Modules.laborCategory, "btnCategoryCodeRp", "CompCode = " + ClientSharedWork.Session.CompCode, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getLaborCategory", "LaborDefinition"),
                data: { id: id },
                success: (d) => {
                    laborCat = d.result as P_D_LaborCategory;
                    LaborCatId = laborCat.LaborCategoryId;
                    txtLaborCategoryIdRp.value = laborCat.CategCode.toString();
                    if (ClientSharedWork.Session.ScreenLanguage == "ar")
                        txtLaborCategoryNameRp.value = laborCat.DescA.toString();
                    else
                        txtLaborCategoryNameRp.value = laborCat.DescE.toString();
                }
            });
        });
    }

    function btnClassCode_Click() {
        sys.FindKey(Modules.laborClass, "btnClassCodeRp", "CompCode = " + ClientSharedWork.Session.CompCode, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getLaborClass", "LaborDefinition"),
                data: { id: id },
                success: (d) => {
                    laborClass = d.result as P_D_LaborClass;
                    LaborclassId = laborClass.LaborClassId;
                    txtLaborClassIdRp.value = laborClass.ClassCode.toString();
                 
                    if (ClientSharedWork.Session.ScreenLanguage == "ar")
                        txtLaborClassNameRp.value = laborClass.DescA.toString();
                    else
                        txtLaborClassNameRp.value = laborClass.DescE.toString();
                }
            });
        });
    }

}