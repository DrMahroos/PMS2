
$(document).ready(() => {
    EquipmentReport.InitalizeComponent();
});
namespace EquipmentReport {
    var sys: SystemTools = new SystemTools();
    var Model: P_D_SalesEgineer = new P_D_SalesEgineer();
    var ajaxCall: AjaxCaller = new AjaxCaller();
    var Area: G_BRANCH = new G_BRANCH();

     var Class: P_D_EquipmentClass = new P_D_EquipmentClass();

    var txtEquipClassIdRp: HTMLInputElement;
    var txtEquipClassNameRp: HTMLInputElement = null;
    var btnEquipClassIdRp: HTMLButtonElement;
    var txtBraCodeRp: HTMLInputElement = null;
    var txtAreaNameRp: HTMLInputElement;
    var btnAreaRp: HTMLButtonElement;
    //Just put the elements IDs  
    var EquipId: number;

    //Initalize The Current Popup
    export function InitalizeComponent() {
        
        //SharedSession.CurrentEnvironment.ScreenLanguage = SharedSession.CurrentEnvironment.ScreenLanguage;
        GeneralReports.OnClear = Clear;
        GeneralReports.OnPrint = Print;
        InitalizeControls();
        InitalizeEvents();

    }
    function InitalizeControls() {
        txtEquipClassIdRp = DocumentActions.GetElementById<HTMLInputElement>("txtEquipClassIdRp");
        txtEquipClassNameRp = DocumentActions.GetElementById<HTMLInputElement>("txtEquipClassNameRp");
        btnEquipClassIdRp = DocumentActions.GetElementById<HTMLButtonElement>("btnEquipClassIdRp");
        txtBraCodeRp = DocumentActions.GetElementById<HTMLInputElement>("txtBraCodeRp");
        txtAreaNameRp = DocumentActions.GetElementById<HTMLInputElement>("txtAreaNameRp");
        btnAreaRp = DocumentActions.GetElementById<HTMLButtonElement>("btnAreaRp");
        txtBraCodeRp.value = "";
    }
    function InitalizeEvents() {
        debugger

        btnEquipClassIdRp.onclick = btnCategoryCode_Click;

        btnAreaRp.onclick = btnBraCode_Click;
    }

    //Print Current Report
    function Print() {

        let rp: ReportParameters = new ReportParameters();
        
        rp.CompCode = SharedSession.CurrentEnvironment.CompCode;
        rp.braCode = SharedSession.CurrentEnvironment.BranchCode;

        rp.CatID = EquipId;
        rp.bra = Number(txtBraCodeRp.value);
        if (<boolean>$("#ActiveRp").prop("checked")) { rp.Active = 1; }
        else if (<boolean>$("#NoActiveRp").prop("checked")) { rp.Active = 0; }
        else if (<boolean>$("#AllRp").prop("checked")) { rp.Active = null; };

        Ajax.CallAsync({
            url: Url.Action("rptEquipment", "GeneralReports"),
            data: rp,
            success: (d) => {
                let result = d.result as string;
                window.open(result, "_blank");
            }
        })
    }
    function Clear() {
        txtAreaNameRp.value = "";

        txtEquipClassIdRp.value = "";

        txtEquipClassNameRp.value = "";
        txtBraCodeRp.value = "";
        $("#AllRp").prop("checked", "checked");
    }

    function btnBraCode_Click() {
        sys.FindKey(Modules.SalesEngineer, "btnAreaRp", "COMP_CODE = " + ClientSharedWork.Session.CompCode, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getArea", "SalesEngineer"),
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

        sys.FindKey(Modules.EquipmentDefinition, "btnEquipClassIdRp", "CompCode = " + ClientSharedWork.Session.CompCode, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetEquipmentClassByuseId", "EquipmentDefinition"),
                data: { id: id },
                success: (d) => {
                    
                    Class = d.result as P_D_EquipmentClass;
                    EquipId = Class.EquipClassId;
                    txtEquipClassIdRp.value = Class[0].ClassCode;
                    if (ClientSharedWork.Session.ScreenLanguage == "ar")
                        txtEquipClassNameRp.value = Class[0].DescA;
                    else
                        txtEquipClassNameRp.value = Class[0].DescE;
                }
            });
        });
    }
}