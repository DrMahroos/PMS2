$(document).ready(() => {
    NormsVariationReport.InitalizeComponent();
 });

namespace NormsVariationReport {
    var sys: SystemTools = new SystemTools();
    const ControllerName: string = "NormsVariationRep";
    var Model: P_G_Region = new P_G_Region();

        var txtRegionID:HTMLInputElement;
        var txtRegionDes:HTMLInputElement;
        var txtRegionCode:HTMLInputElement;
        var btnRegionID:HTMLButtonElement;
        var FromDate:HTMLInputElement;
        var ToDate: HTMLInputElement;
        var txtBranch: HTMLInputElement;
        var txtBranchCod: HTMLInputElement;
        var txtBranchDes: HTMLInputElement;
        var btnBranch: HTMLButtonElement;
      
        var txtActivityID :HTMLInputElement;   
        var txtActivityCod:HTMLInputElement;
        var txtActivityDes:HTMLInputElement;
        var btnActivityID: HTMLInputElement;
    
        var RedAllProject: HTMLInputElement;
        var RedNonRepair: HTMLInputElement;
        var RedRepair: HTMLInputElement;

        var RedByBranch: HTMLInputElement;
        var RedByScope: HTMLInputElement;

        var _CompCode: string;
        var _BranchCode: string;
        var btnPrint: HTMLInputElement;
        var _ScreenLanguage: string;

        _CompCode = SharedSession.CurrentEnvironment.CompCode;
        _BranchCode = SharedSession.CurrentEnvironment.BranchCode;



    export function InitalizeComponent() {

        GeneralReports.OnClear = Clear;

        _ScreenLanguage = ClientSharedWork.Session.ScreenLanguage;


        InitalizeControls();
        FromDate.value = DateFormat(new Date().toString());
        ToDate.value = DateFormat(new Date().toString());
        InitalizeEvents();

    };

    function InitalizeControls() {


        txtRegionID = DocumentActions.GetElementById<HTMLInputElement>("txtRegionID");
        txtRegionDes = DocumentActions.GetElementById<HTMLInputElement>("txtRegionDes");
        txtRegionCode = DocumentActions.GetElementById<HTMLInputElement>("txtRegionCode");
        btnRegionID = DocumentActions.GetElementById<HTMLButtonElement>("btnRegionID");


        txtBranch = DocumentActions.GetElementById<HTMLInputElement>("txtBranch");
        txtBranchCod = DocumentActions.GetElementById<HTMLInputElement>("txtBranchCod");
        txtBranchDes = DocumentActions.GetElementById<HTMLInputElement>("txtBranchDes");
        btnBranch = DocumentActions.GetElementById<HTMLButtonElement>("btnBranch");


        FromDate = DocumentActions.GetElementById<HTMLInputElement>("FromDate");
        ToDate = DocumentActions.GetElementById<HTMLInputElement>("ToDate");

        txtActivityID = DocumentActions.GetElementById<HTMLInputElement>("txtActivityID");
        txtActivityCod=DocumentActions.GetElementById<HTMLInputElement>("txtActivityCod");
        txtActivityDes=DocumentActions.GetElementById<HTMLInputElement>("txtActivityDes");
        btnActivityID =DocumentActions.GetElementById<HTMLInputElement>("btnActivityID");


        RedAllProject = DocumentActions.GetElementById<HTMLInputElement>("RedAllProject");
        RedNonRepair = DocumentActions.GetElementById<HTMLInputElement>("RedNonRepair");
        RedRepair = DocumentActions.GetElementById<HTMLInputElement>("RedRepair");
        RedByBranch = DocumentActions.GetElementById<HTMLInputElement>("RedByBranch");
        RedByScope = DocumentActions.GetElementById<HTMLInputElement>("RedByScope");


    }

    function Clear() {


            txtRegionDes.value="";         
            txtRegionCode.value="";
            btnRegionID.value="";                         
            txtBranch.value="";
            txtBranchCod.value="";
            txtBranchDes.value="";                             
            txtActivityID.value="";
            txtActivityCod.value="";
            txtActivityDes.value="";
            
    }


    function InitalizeEvents() {
        btnRegionID.onclick = btnRegionID_onclick;
        btnBranch.onclick = btnBranch_onclick;
        btnActivityID.onclick=btnActivityID_onclick
    }
    function btnRegionID_onclick() {
        debugger
        sys.FindKey(Modules.NormsVariationRep, "btnRegionID", "COMP_CODE = " + _CompCode, () => {
            let _id = ClientSharedWork.SearchDataGrid.SelectedKey;
            
            Ajax.CallAsync({
                url: Url.Action("getRegionByid", ControllerName),
                data: { id: _id },

                success: (d) => {
                    
                    Model = d.result as P_G_Region;
                    if (Model != null) {
                        txtRegionID.value = Model.REGION_CODE.toString();
                        txtRegionDes.value = _ScreenLanguage == "en" ? Model.DESCE : Model.DESCA;
                    }

                }
            });
        });
    }
 
    function btnBranch_onclick() {
        


        sys.FindKey(Modules.ByCustomerClass, "btnBranch", "", () => {
            
            let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetBranchByID", ControllerName),
                data: { id: _Id },
                success: (d) => {
                    
                    let result = d.result as G_BRANCH;
                    txtBranchCod.value = result.BRA_CODE.toString();
                    txtBranchDes.value = _ScreenLanguage == "ar" ? result.BRA_DESC : result.BRA_DESCE; 2

                }
            });
        })
    }

    function btnActivityID_onclick() {
        
        sys.FindKey(Modules.NormsVariationRep, "btnActivityID", "", () => {
            
            let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getActvitybyid", ControllerName),
                data: { id: _Id },
                success: (d) => {
                    let result = d.result as P_D_Activity;
                    txtActivityID.value = result.ActivityID.toString();
                    txtActivityCod.value = result.ActivityCode;
                    txtActivityDes.value = _ScreenLanguage == "ar" ? result.DescA : result.DescE;2

                }
            });

        })
    }       





}