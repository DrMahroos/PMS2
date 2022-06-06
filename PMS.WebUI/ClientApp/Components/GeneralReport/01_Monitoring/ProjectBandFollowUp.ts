$(document).ready(() => {
    ProjectBandFollowUp.InitalizeComponent();
});
namespace ProjectBandFollowUp {

    var sys: SystemTools = new SystemTools();
    const ControllerName: string = "ProjectBandFollowUp";
    //----------ID-------------
    var FromDate: HTMLInputElement;
    var ToDate: HTMLInputElement;
    var txtProject: HTMLInputElement;
    var txtProjectCod: HTMLInputElement;
    var txtProjectDes: HTMLInputElement;
    var btnProject: HTMLButtonElement;
   

    var _CompCode: string;
    var _BranchCode: string;
    
    var _ScreenLanguage: string;
  


    var _BranchCode: string;
    var Condition: string;

   

    export function InitalizeComponent() {
        
        _ScreenLanguage = ClientSharedWork.Session.ScreenLanguage;
        _CompCode = SharedSession.CurrentEnvironment.CompCode;
        _BranchCode = SharedSession.CurrentEnvironment.BranchCode;

        Condition = " CompCode = " + _CompCode + " and BraCode = " + _BranchCode;

        _CompCode = SharedSession.CurrentEnvironment.CompCode;
        _BranchCode = SharedSession.CurrentEnvironment.BranchCode;
        InitalizeControls();
        InitalizeEvents();
        

        GeneralReports.OnClear = Clear;
        GeneralReports.OnPrint = print;
       // GeneralReports.OnPrint = print;

        //ControlsButtons.PrintAction(() => { print });

        
        FromDate.value = DateFormat(new Date().toString());
        ToDate.value = DateFormat(new Date().toString());
       // ControlsButtons.PrintAction(() => { print(); });
        
    }
    function InitalizeControls() {

        //---------- textID---------
        FromDate = DocumentActions.GetElementById<HTMLInputElement>("FromDate");
        ToDate = DocumentActions.GetElementById<HTMLInputElement>("ToDate");
        txtProject = DocumentActions.GetElementById<HTMLInputElement>("txtProject");
        txtProjectCod = DocumentActions.GetElementById<HTMLInputElement>("txtProjectCod");
        txtProjectDes = DocumentActions.GetElementById<HTMLInputElement>("txtProjectDes");
        btnProject = DocumentActions.GetElementById<HTMLButtonElement>("btnProject");
        
        //--------------
    }
    function Clear() {
        


        txtProject.value = "";
        txtProjectCod.value = "";
        txtProjectDes.value = "";
      
        
    }




    function InitalizeEvents() {

        

        btnProject.onclick = btnProject_onclick;
        txtProjectCod.onchange = txtSearchProject_Clicked;


    }

    
    function  btnProject_onclick() {
        
        sys.FindKey(Modules.RepProjectBandFollow, "btnProject", Condition, () => {
            
            let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetProjCodeByID", "ProjectBandFollowUp"),
                data: { id: _Id },
                success: (d) => {
                    
                    let result = d.result as P_TR_EngProject;
                    txtProject.value = result.ProjectID.toString();
                    txtProjectCod.value = result.ProjectCode.toString();

                    if (_ScreenLanguage == "ar") {
                        txtProjectDes.value = result.DescA;
                    }
                    else {
                        txtProjectDes.value = result.DescL;
                    }

                }
            });
        })
    }
    function txtSearchProject_Clicked() {
        debugger;

        let code = txtProjectCod.value;
        Ajax.CallAsync({
            url: Url.Action("getProjectsCode", ControllerName),
            data: { code, comp: SharedSession.CurrentEnvironment.CompCode, bra: SharedSession.CurrentEnvironment.BranchCode },
            success: (d) => {
                debugger;
                let result = d.result as P_TR_EngProject;
                if (result != null) {
                   
                    txtProject.value = result.ProjectID.toString();
                    if (_ScreenLanguage == "ar") {
                        txtProjectDes.value = result.DescA;
                    }
                    else {
                        txtProjectDes.value = result.DescL;
                    }

                }
                else {
                    WorningMessage(" ????? ??? ????? ", " The code does not exist ");
                }
            }
        });

    }



    function print() {
        debugger
        let RP: ReportParameters = new ReportParameters();

        RP.CompCode = SharedSession.CurrentEnvironment.CompCode;
        RP.ProjectID = Number(txtProject.value);
        RP.FromDate = DateFormat(FromDate.value);
        RP.ToDate = DateFormat(ToDate.value);
        debugger
                Ajax.CallAsync({
                    url: Url.Action("rptProjectBandFollow", "GeneralReports"),
                data: RP,
                success: (d) => {
                    debugger
                    let result = d.result as string;
                    window.open(result, "_blank");
                }
            })
        }

       







 }


















