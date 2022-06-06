$(document).ready(() => {

    ProjectFollowUp.InitalizeComponent();
});
namespace ProjectFollowUp {

    var sys: SystemTools = new SystemTools();
    const ControllerName: string = "ProjectFollowUp";


    var FromDate: HTMLInputElement;
    var ToDate: HTMLInputElement;
    
    var txtFromProject: HTMLInputElement;
    var txtToProject: HTMLInputElement;

    var txtSel: HTMLInputElement;
    var txtCustClass: HTMLInputElement;
    var txtCust: HTMLInputElement;



   
    var txtSalDesc: HTMLInputElement;
    var txtCustClassDes: HTMLInputElement;
    var txtCustIDDes: HTMLInputElement;


  
    var txtSelCod: HTMLInputElement;
    var txtCustClassCod: HTMLInputElement;
    var txtCustCod: HTMLInputElement;



   
    var btnSalesID: HTMLButtonElement;
    var btnCustClassID: HTMLButtonElement;
    var btnCustID: HTMLButtonElement;

   

    var RedSalesEng : HTMLInputElement;
    var RedCustomer : HTMLInputElement;


    var RedNew: HTMLInputElement;
    var Redworking: HTMLInputElement;
    var RedHold: HTMLInputElement;
    var RedSuspended: HTMLInputElement;
    var Redfinish: HTMLInputElement;
    var RedAll: HTMLInputElement;

    var _CompCode: string;
    var _BranchCode: string;

    var _ScreenLanguage: string;

    _CompCode = SharedSession.CurrentEnvironment.CompCode;
    _BranchCode = SharedSession.CurrentEnvironment.BranchCode;

    export function InitalizeComponent() {
        GeneralReports.OnClear = Clear;
        _ScreenLanguage = ClientSharedWork.Session.ScreenLanguage;
        
        InitalizeControls();
        

        InitalizeEvents();

       

        //getbranchname();
    }
    function InitalizeControls() {

        //---------- textID---------

        FromDate = DocumentActions.GetElementById<HTMLInputElement>("FromDate");
        ToDate = DocumentActions.GetElementById<HTMLInputElement>("ToDate");
        txtFromProject = DocumentActions.GetElementById<HTMLInputElement>("txtFromProject");
        txtToProject = DocumentActions.GetElementById<HTMLInputElement>("txtToProject");
        txtSel = DocumentActions.GetElementById<HTMLInputElement>("txtSel");
        txtCustClass = DocumentActions.GetElementById<HTMLInputElement>("txtCustClass");
        txtCust = DocumentActions.GetElementById<HTMLInputElement>("txtCustID");

        //---------- textDes---------

       
        txtSalDesc = DocumentActions.GetElementById<HTMLInputElement>("txtSalDesc");
        txtCustClassDes = DocumentActions.GetElementById<HTMLInputElement>("txtCustClassDes");
        txtCustIDDes = DocumentActions.GetElementById<HTMLInputElement>("txtCustIDDes");

        //---------- textcood---------

       
        txtSelCod = DocumentActions.GetElementById<HTMLInputElement>("txtSelCod");
        txtCustClassCod = DocumentActions.GetElementById<HTMLInputElement>("txtCustClassCod");
        txtCustCod = DocumentActions.GetElementById<HTMLInputElement>("txtCustCod");

        
        //---------- btn---------

        
        btnSalesID = DocumentActions.GetElementById<HTMLButtonElement>("btnSalesID");
        btnCustClassID = DocumentActions.GetElementById<HTMLButtonElement>("btnCustClassID");
        btnCustID = DocumentActions.GetElementById<HTMLButtonElement>("btnCustID");

        //---------- redeo---------

        RedSalesEng = DocumentActions.GetElementById<HTMLInputElement>("RedSalesEng");
        RedCustomer = DocumentActions.GetElementById<HTMLInputElement>("RedCustomer");

        RedNew = DocumentActions.GetElementById<HTMLInputElement>("RedNew");
        Redworking = DocumentActions.GetElementById<HTMLInputElement>("Redworking");
        RedHold = DocumentActions.GetElementById<HTMLInputElement>("RedHold");
        RedSuspended = DocumentActions.GetElementById<HTMLInputElement>("RedSuspended");
        Redfinish = DocumentActions.GetElementById<HTMLInputElement>("Redfinish");
        RedAll = DocumentActions.GetElementById<HTMLInputElement>("RedAll");


        //--------------

        RedAll.checked = true; 
        RedSalesEng.checked = true; 
       
        FromDate.value = DateFormat(new Date().toString());
        ToDate.value = DateFormat(new Date().toString());
        txtFromProject.value = "1";
        txtToProject.value = "999999"; 



    }
    function Clear() {
        RedAll.checked = true;
        RedSalesEng.checked = true;
      
        FromDate.value = DateFormat(new Date().toString());
        ToDate.value = DateFormat(new Date().toString());
        txtFromProject.value = "1";
        txtToProject.value = "999999"; 


       
        txtSel.value = "";
        txtCustClass.value = "";
        txtCust.value = "";
        txtSalDesc.value = "";
        txtCustClassDes.value = "";
        txtCustIDDes.value = "";
        txtFromProject.value = "";
        txtToProject.value = "";

        

    }


    function InitalizeEvents() {
        debugger
        
        btnSalesID.onclick = btnSalesID_onclick;
        btnCustClassID.onclick = btnCustClassID_onclick;
        btnCustID.onclick = btnCustID_onclick;
        GeneralReports.Print = Print;
    }


    function btnSalesID_onclick() {
        let Condition: string = " CompCode = " + _CompCode + " and BraCode = " + _BranchCode;
        sys.FindKey(Modules.RepProjectFollowUp, "btnSalesID", Condition, () => {
            
            let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            debugger
            Ajax.CallAsync({
                url: Url.Action("GetSalesCodeByID", "ProjectFollowUp"),
                data: { id: _Id },
                success: (d) => {
                    

                    let _result = d.result as P_D_SalesEgineer;
                    txtSel.value = _result.SalesEngineerId.toString();
                    txtSelCod.value = _result.EngCode.toString();
                    txtSalDesc.value = _ScreenLanguage == "en" ? _result.DescE : _result.DeacA;;

                }
            });
        })
    }

    function btnCustClassID_onclick() {
        
        let Condition: string = " CompCode = " + _CompCode + " and BraCode = " + _BranchCode;

        sys.FindKey(Modules.RepProjectFollowUp, "btnCustClassID", "", () => {
            
            let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetCustomerClassById", ControllerName),
                data: { id: _Id },
                success: (d) => {
                    debugger
                    let result = d.result as P_D_SalesCustomerCategory;
                    txtCustClass.value = result.CustomerCategoryID.toString();
                    txtCustClassCod.value = result.CustomerCatCode.toString();
                    txtCustClassDes.value = _ScreenLanguage == "en" ? result.DescE : result.DescA;




                }
            });
        })

    }


    function btnCustID_onclick() {
        let Condition: string = " CompCode = " + _CompCode + " and BraCode = " + _BranchCode;
        sys.FindKey(Modules.RepProjectFollowUp, "btnCustID", Condition, () => {
            
            let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetCustomerById", ControllerName),
                data: { id: _Id },
                success: (d) => {
                    let result = d.result as P_D_SalesCustomer;
                    txtCust.value = result.CustomerID.toString();
                    txtCustCod.value = result.CustomerCode.toString();
                    txtCustIDDes.value = SharedSession.CurrentEnvironment.ScreenLanguage == "ar" ? result.DescA : result.DescE;


                }
            });
        })
    }


    function Print() {
        debugger
        let RP: ReportParameters = new ReportParameters();

        // RP.CompCode = SharedSession.CurrentEnvironment.CompCode;
        RP.braCode = SharedSession.CurrentEnvironment.BranchCode;
        RP.EngID = Number(txtSel.value);
        RP.custClassID = Number(txtCustClass.value);
        RP.customerID = Number(txtCust.value);
        RP.FromProjCode = txtFromProject.value;
        RP.ToProjCode = txtToProject.value;
        RP.FromDate = FromDate.value;
        RP.ToDate = ToDate.value;
        if ($("#RedNew").prop("checked") == true) {
            RP.Stat = 0;
        }
        else if ($("#Redworking").prop("checked") == true) {
            RP.Stat = 1;
        }
        else if ($("#RedHold").prop("checked") == true) {
            RP.Stat = 2;
        }
        else if ($("#RedSuspended").prop("checked") == true) {
            RP.Stat = 3;
        }
        else if ($("#Redfinish").prop("checked") == true) {
            RP.Stat = 5;
        }
        else if ($("#RedAll").prop("checked") == true) {
            RP.Stat = 6;
        }

        if ($("#RedSalesEng").prop("checked") == true) {
            RP.TypeReport = 1;

            Ajax.CallAsync({

                url: Url.Action("rptProjectFollowUp", "GeneralReports"),
                data: RP,
                success: (d) => {
                    debugger
                    let result = d.result as string;
                    window.open(result, "_blank");
                }
            })
        }
        else {
            RP.TypeReport = 2;
            Ajax.CallAsync({

                url: Url.Action("rptProjectFollowUp", "GeneralReports"),
                data: RP,
                success: (d) => {
                    debugger
                    let result = d.result as string;
                    window.open(result, "_blank");
                }
            });
        }
    }
}
















