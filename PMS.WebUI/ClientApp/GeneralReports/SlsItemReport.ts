$(document).ready(() => {
    SlsItemReport.InitalizeComponent();
});
namespace SlsItemReport {
    var sys: SystemTools = new SystemTools();
    var Model: P_D_SalesEgineer = new P_D_SalesEgineer();
    var ajaxCall: AjaxCaller = new AjaxCaller();
    var Master: P_D_SalesItems = new P_D_SalesItems();
    export var dataSource: Array<P_D_SalesEgineer> = new Array<P_D_SalesEgineer>();
    var txtItemCodeRP: HTMLInputElement;
    var txtItemIDRP  : HTMLInputElement;
    var btnItemCodeRP: HTMLButtonElement;
    var txtItemNameRP: HTMLInputElement;
    var txtItemID: HTMLInputElement;
    var txtItemCodeRP2: HTMLInputElement;
    var txtItemIDRP2  : HTMLInputElement;
    var btnItemCodeRP2: HTMLButtonElement;
    var txtItemNameRP2: HTMLInputElement;
    var txtItemcIDRP: HTMLInputElement;
     var txtItemcCodeRP: HTMLInputElement;
    var  btnItemCatRP   : HTMLButtonElement;
    var txtItemName1RP: HTMLInputElement;
    var txtScopeIDRP  : HTMLInputElement;
    var txtScopeNameRP: HTMLInputElement;
    var txtScopeCodeRP: HTMLInputElement;
    var btnScopeIDRP: HTMLButtonElement;
    //Initalize The Current Popup
    export function InitalizeComponent() {
        
        //SharedSession.CurrentEnvironment.ScreenLanguage = SharedSession.CurrentEnvironment.ScreenLanguage;
        GeneralReports.OnClear = Clear;
        GeneralReports.OnPrint = Print;
        InitalizeControls();
        InitalizeEvents();
        
    }
    function InitalizeControls() {

        txtItemCodeRP = DocumentActions.GetElementById<HTMLInputElement>("txtItemCodeRP");
        txtItemIDRP   = DocumentActions.GetElementById<HTMLInputElement>("txtItemIDRP");
        btnItemCodeRP = DocumentActions.GetElementById<HTMLButtonElement>("btnItemCodeRP");
        txtItemNameRP = DocumentActions.GetElementById<HTMLInputElement>("txtItemNameRP");

        txtItemCodeRP2 = DocumentActions.GetElementById<HTMLInputElement>("txtItemCodeRP2");
        txtItemIDRP2 = DocumentActions.GetElementById<HTMLInputElement>("txtItemIDRP2");
        btnItemCodeRP2 = DocumentActions.GetElementById<HTMLButtonElement>("btnItemCodeRP2");
        txtItemNameRP2 = DocumentActions.GetElementById<HTMLInputElement>("txtItemNameRP2");
     
        txtItemcCodeRP = DocumentActions.GetElementById<HTMLInputElement>("txtItemcCodeRP");
        btnItemCatRP = DocumentActions.GetElementById<HTMLButtonElement>("btnItemCatRP");
        txtItemName1RP = DocumentActions.GetElementById<HTMLInputElement>("txtItemName1RP");
       // txtBraCodeRP.value = "";
        txtItemID = DocumentActions.GetElementById<HTMLInputElement>("txtItemID");
        txtScopeIDRP = DocumentActions.GetElementById<HTMLInputElement>("txtScopeIDRP");
        txtScopeNameRP = DocumentActions.GetElementById<HTMLInputElement>("txtScopeNameRP");
        txtScopeCodeRP = DocumentActions.GetElementById<HTMLInputElement>("txtScopeCodeRP");
        btnScopeIDRP = DocumentActions.GetElementById<HTMLButtonElement>("btnScopeIDRP");
    }
    function InitalizeEvents() {
        debugger
        btnItemCodeRP.onclick = btnItemCode_ClickedRP;
        btnItemCodeRP2.onclick = btnItemCode_ClickedRP2;
        btnScopeIDRP.onclick = btnScopeID_Clicked;
    }
   
    //Print Current Report
    function Print() {
       
        let RP: ReportParameters = new ReportParameters();
        
        RP.CompCode = SharedSession.CurrentEnvironment.CompCode;
        RP.braCode = SharedSession.CurrentEnvironment.BranchCode;

        if (<boolean>$("#RDItemList").prop("checked")) {
            RP.FromItemNo = (txtItemCodeRP.value);
            RP.ToItemNo = (txtItemCodeRP2.value);
            RP.ScopeID = Number(txtScopeIDRP.value);
            if (<boolean>$("#ActiveRP").prop("checked")) { RP.Active = 1; }
            else if (<boolean>$("#NoActiveRP").prop("checked")) { RP.Active = 0; }
            else if (<boolean>$("#AllRP").prop("checked")) { RP.Active = null; };

            if (<boolean>$("#DetailRP").prop("checked")) { RP.Detail = 1; }
            else if (<boolean>$("#NoDetailRP").prop("checked")) { RP.Detail = 0; }
            else if (<boolean>$("#AllDetailRP").prop("checked")) { RP.Detail = null; };

            Ajax.CallAsync({
                url: Url.Action("rptSlsItemList", "GeneralReports"),
                data: RP,
                success: (d) => {
                    let result = d.result as string;
                    window.open(result, "_blank");
                }
            })
        }
        if (<boolean>$("#RDItemCard").prop("checked")) {
            
            RP.ItemId = Number(txtItemID.value);
            Ajax.CallAsync({
                url: Url.Action("rptSlsItemCard", "GeneralReports"),
                data: RP,
                success: (d) => {
                    let result = d.result as string;
                    window.open(result, "_blank");
                }
            })
        }
        
         
    }
    function Clear() {
        
        txtItemCodeRP.value = "";
        txtItemNameRP.value = "";
        txtItemCodeRP2.value = "";
        txtItemNameRP2.value = "";
        txtScopeCodeRP.value = "";
        txtScopeNameRP.value = "";
        $("#AllRP").prop("checked", "checked");
        $("#AllDetailRP").prop("checked", "checked");
       }
   
   
    function btnItemCode_ClickedRP() {
       
       sys.FindKey(Modules.SalesItemLibrary, "btnItemCodeRP", "CompCode = " + ClientSharedWork.Session.CompCode, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetByID", "SalesItemLibrary"),
                data: { id: id },
                success: (d) => {
                    
                       let result = d.result as P_D_SalesItems;
                  
                    //txtItemIDRP.value = Master.ItemID.toString();
                       if (ClientSharedWork.Session.ScreenLanguage == "ar") {
                           txtItemNameRP.value = result.DescA.toString();
                        txtItemCodeRP.value = result.ItemCode.toString();
                    }                         
                                              
                    else {                       
                        txtItemNameRP.value = result.DescE.toString();
                        txtItemCodeRP.value = result.ItemCode;
                    }
                       
                }
            });
        });
    }
   function btnItemCode_ClickedRP2() {
       sys.FindKey(Modules.SalesItemLibrary, "btnItemCodeRP2", "CompCode = " + ClientSharedWork.Session.CompCode, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetByID", "SalesItemLibrary"),
                data: { id: id },
                success: (d) => {
                   Master = d.result as P_D_SalesItems;
                
                  //  txtItemIDRP2.value = Master.ItemID.toString();
                    if (ClientSharedWork.Session.ScreenLanguage == "ar") {
                        txtItemCodeRP2.value = Master.ItemCode.toString();
                        txtItemNameRP2.value = Master.DescA.toString();
                    }
                    
                    else {
                        txtItemCodeRP2.value = Master.ItemCode.toString();
                        txtItemNameRP2.value = Master.DescE.toString();
                    }
                       
                }
            });
        });
   }
 
   function btnScopeID_Clicked() {
      
       sys.FindKey(Modules.SalesItemLibrary, "btnScopeIDRP", "CompCode = " + ClientSharedWork.Session.CompCode, () => {
           let id = ClientSharedWork.SearchDataGrid.SelectedKey;
           Ajax.CallAsync({
               url: Url.Action("ScopeList", "SalesItemLibrary"),
               data: { id: id },
               success: (d) => {
                   let scope = d.result as P_D_Scope;
                   if (scope.ScopeCode == null) {
                       txtScopeNameRP.value = "";
                       txtScopeIDRP.value = "";
                   }
                   txtScopeIDRP.value = scope.ScopeID.toString();
                   txtScopeCodeRP.value = scope.ScopeCode.toString();
                   if (ClientSharedWork.Session.ScreenLanguage == "ar")
                       txtScopeNameRP.value = scope.DescA.toString();
                   else
                       txtScopeNameRP.value = scope.DescE.toString();
               }
           });
       });
   }


}