$(document).ready(() => {

    LaborEvaluation.InitalizeComponent();
});

namespace LaborEvaluation {

    var sys: SystemTools = new SystemTools();
    const ControllerName: string = "LaborEvaluation";

    var categ: P_D_ScopeCategory = new P_D_ScopeCategory();
    var Model: P_D_Location = new P_D_Location();

    var FromDate: HTMLInputElement;
    var ToDate: HTMLInputElement;
    //---
    var txtFromLabor: HTMLInputElement;
    var txtToLabor: HTMLInputElement;
    //--
    var txtFromProject: HTMLInputElement;
    var txtToProject: HTMLInputElement;
    //--
    var txtLaborClass: HTMLInputElement;
    var txtLaborClassCod: HTMLInputElement;
    var txtLaborClassDesc: HTMLInputElement;
    var btntxtLaborClassID: HTMLButtonElement;
   //----
    var txtLaborcat: HTMLInputElement;
    var txtLaborcatCod: HTMLInputElement;
    var txtLaborcatDesc: HTMLInputElement;
    var btntxtLaborcatID: HTMLButtonElement;
   //----
    var txtProjectEng: HTMLInputElement;
    var txtProjectEngCod: HTMLInputElement;
    var txtProjectEngDes: HTMLInputElement;
    var btnProjectEng: HTMLButtonElement;

    //---
    var RedByLabor : HTMLInputElement;
    var RedByProject: HTMLInputElement;
    var RedSum: HTMLInputElement;
    var _CompCode: string;
    var _BranchCode: string;
    var btnPrint: HTMLInputElement;
    var _ScreenLanguage: string;

    _CompCode = SharedSession.CurrentEnvironment.CompCode;
    _BranchCode = SharedSession.CurrentEnvironment.BranchCode;

    export function InitalizeComponent() {
        debugger
        GeneralReports.OnClear = Clear;
        GeneralReports.OnPrint = Print;
        _ScreenLanguage = ClientSharedWork.Session.ScreenLanguage;

        InitalizeControls();

        FromDate.value = DateFormat(new Date().toString());
        ToDate.value = DateFormat(new Date().toString());

        txtFromLabor.value = "";
        txtToLabor.value = "";
        txtFromProject.value = "1";
        txtToProject.value = "999999";
        txtLaborcat.value = "";
        txtLaborcatCod.value = "";
        txtLaborcatDesc.value = "";
        txtLaborClass.value = "";
        txtLaborClassCod.value = "";
        txtLaborClassDesc.value = "";
        RedByLabor.checked = true; 
        InitalizeEvents();

        


    }
    function InitalizeControls() {
        
        debugger;
        FromDate = DocumentActions.GetElementById<HTMLInputElement>("FromDate");
        ToDate = DocumentActions.GetElementById<HTMLInputElement>("ToDate");
        txtFromLabor = DocumentActions.GetElementById<HTMLInputElement>("txtFromLabor");
        txtToLabor = DocumentActions.GetElementById<HTMLInputElement>("txtToLabor");
        txtFromProject = DocumentActions.GetElementById<HTMLInputElement>("txtFromProject");
        txtToProject = DocumentActions.GetElementById<HTMLInputElement>("txtToProject");
        txtLaborClass = DocumentActions.GetElementById<HTMLInputElement>("txtLaborClass");
        txtLaborClassCod = DocumentActions.GetElementById<HTMLInputElement>("txtLaborClassCod");
        txtLaborClassDesc = DocumentActions.GetElementById<HTMLInputElement>("txtLaborClassDesc");
        btntxtLaborClassID = DocumentActions.GetElementById<HTMLButtonElement>("btntxtLaborClassID");
        txtLaborcat = DocumentActions.GetElementById<HTMLInputElement>("txtLaborcat");
        txtLaborcatCod = DocumentActions.GetElementById<HTMLInputElement>("txtLaborcatCod");
        txtLaborcatDesc = DocumentActions.GetElementById<HTMLInputElement>("txtLaborcatDesc");
        btntxtLaborcatID = DocumentActions.GetElementById<HTMLButtonElement>("btntxtLaborcatID");
        txtProjectEng = DocumentActions.GetElementById<HTMLInputElement>("txtProjectEng");
        txtProjectEngCod = DocumentActions.GetElementById<HTMLInputElement>("txtProjectEngCod");
        txtProjectEngDes = DocumentActions.GetElementById<HTMLInputElement>("txtProjectEngDes");
        btnProjectEng = DocumentActions.GetElementById<HTMLButtonElement>("btnProjectEng");
      
        RedByLabor = DocumentActions.GetElementById<HTMLInputElement>("RedByLabor");
        RedByProject = DocumentActions.GetElementById<HTMLInputElement>("RedByProject");
        RedSum = DocumentActions.GetElementById<HTMLInputElement>("RedSum");       
        //--------------
    }
    function Clear() {
        
       
        FromDate.value = DateFormat(new Date().toString());
        ToDate.value = DateFormat(new Date().toString());

        txtFromLabor.value = "";
        txtToLabor.value = "";
        txtFromProject.value = "1";
        txtToProject.value = "999999";
        txtLaborcat.value = "";
        txtLaborcatCod.value = "";
        txtLaborcatDesc.value = "";
        txtLaborClass.value = "";
        txtLaborClassCod.value = "";
        txtLaborClassDesc.value = "";
        RedByLabor.checked = true; 
       
    }

    function InitalizeEvents() {
        debugger
        btnProjectEng.onclick = btnProjectEng_onclick;
        btntxtLaborClassID.onclick = btntxtLaborClassID_onclick;
        btntxtLaborcatID.onclick = btntxtLaborcatID_onclick;
    }

    function btnProjectEng_onclick() {
        


        sys.FindKey(Modules.RepLaborEvaluation, "btnProjectEng", "compCode = " + _CompCode + " and BraCode = " +  _BranchCode, () => {
            
            let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getEngineerByID", ControllerName),
                data: { id: _Id },
                success: (d) => {
                    
                    let result = d.result as P_D_SiteEngineer;
                    if (result != null) {

                        
                        txtProjectEng.value = result.SiteEngineerId.toString();
                        txtProjectEngCod.value = result.EngCode;
                        txtProjectEngDes.value = _ScreenLanguage == "ar" ? result.DescA : result.DescE;
                    }
                }
            });
        })
    }

    function btntxtLaborClassID_onclick() {
        
        sys.FindKey(Modules.RepLaborEvaluation, "btntxtLaborClassID", "", () => {
            
            let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            debugger
            Ajax.CallAsync({
                url: Url.Action("getLaborClassbyid", ControllerName),
                data: { id: _Id },
                success: (d) => {
                    

                    let _result = d.result as P_D_LaborClass;
                    txtLaborClass.value = _result.LaborClassId.toString();
                    txtLaborClassCod.value = _result.ClassCode.toString();
                    txtLaborClassDesc.value = _ScreenLanguage == "en" ? _result.DescE : _result.DescA;;

                }
            });
        })
    }
    function btntxtLaborcatID_onclick() {

        sys.FindKey(Modules.RepLaborEvaluation, "btntxtLaborcatID", "", () => {

            let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            debugger
            Ajax.CallAsync({
                url: Url.Action("getLaborcatbyid", ControllerName),
                data: { id: _Id },
                success: (d) => {


                    let _result = d.result as P_D_LaborCategory;
                    txtLaborcat.value = _result.LaborCategoryId.toString();
                    txtLaborcatCod.value = _result.CategCode.toString();
                    txtLaborcatDesc.value = _ScreenLanguage == "en" ? _result.DescE : _result.DescA;;

                }
            });
        })
    }
   


    function Print() {
        debugger


        let RP: ReportParameters = new ReportParameters();

        RP.CompCode = SharedSession.CurrentEnvironment.CompCode;
        RP.braCode = SharedSession.CurrentEnvironment.BranchCode;

        RP.FromProjCode = txtFromProject.value;
        RP.ToProjCode = txtToProject.value;
        RP.FromLabCode = txtFromLabor.value;
        RP.ToLabCode = txtToLabor.value;
        RP.FromDate = FromDate.value;
        RP.ToDate = ToDate.value;
         
        RP.LabClassID = Number(txtLaborClass.value);
        RP.LabCatID = Number(txtLaborcat.value);
        RP.EngID = Number(txtProjectEng.value);
        
        if (RedByLabor.checked == true)
            RP.TypeReport = 1; 
        else if (RedByProject.checked == true)
            RP.TypeReport = 2; 
        else if (RedSum.checked == true)
            RP.TypeReport = 3; 
               
            Ajax.CallAsync({

                url: Url.Action("Rep_repLaborEvaluation", "GeneralReports"),
                data: RP,
                success: (d) => {
                    debugger
                    let result = d.result as string;
                    window.open(result, "_blank");
                }
            })
       
        
    }


}
