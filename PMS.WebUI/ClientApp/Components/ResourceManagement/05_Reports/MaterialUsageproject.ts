$(document).ready(() => {
    MaterialUsageproject.InitalizeComponent();
});
namespace MaterialUsageproject {

    var sys: SystemTools = new SystemTools();
    const ControllerName: string = "MaterialUsageproject";


    var FromDate: HTMLInputElement;
    var ToDate: HTMLInputElement;

    var txtProjectID: HTMLInputElement;
    var txtProjectRP: HTMLInputElement;
    var btnProjectRP: HTMLButtonElement;
    var txtProject1RP: HTMLInputElement;


    var txtitemcodeID: HTMLInputElement;
    var txtitemcodeRP: HTMLInputElement;
    var btnitemcodeRP: HTMLButtonElement;
    var txtitemcode1RP: HTMLInputElement;



    var txtMaterialCatID: HTMLInputElement;
    var txtMaterialCatRP: HTMLInputElement;
    var btnMaterialCatRP: HTMLButtonElement;
    var txtMaterialCat1RP: HTMLInputElement;



    var _ScreenLanguage: string;


    export function InitalizeComponent() {
        GeneralReports.OnClear = Clear;
        GeneralReports.OnPrint = Print;
        _ScreenLanguage = ClientSharedWork.Session.ScreenLanguage;
        InitalizeControls();
        InitalizeEvents();

    }
    function InitalizeControls() {


        FromDate = DocumentActions.GetElementById<HTMLInputElement>("FromDate");
        ToDate = DocumentActions.GetElementById<HTMLInputElement>("ToDate");

        txtProjectID = DocumentActions.GetElementById<HTMLInputElement>("txtProjectID");
        txtProjectRP = DocumentActions.GetElementById<HTMLInputElement>("txtProjectRP");
        btnProjectRP = DocumentActions.GetElementById<HTMLButtonElement>("btnProjectRP");
        txtProject1RP = DocumentActions.GetElementById<HTMLInputElement>("txtProject1RP");


        txtitemcodeID = DocumentActions.GetElementById<HTMLInputElement>("txtitemcodeID");
        txtitemcodeRP = DocumentActions.GetElementById<HTMLInputElement>("txtitemcodeRP");
        btnitemcodeRP = DocumentActions.GetElementById<HTMLButtonElement>("btnitemcodeRP");
        txtitemcode1RP = DocumentActions.GetElementById<HTMLInputElement>("txtitemcode1RP");


        txtMaterialCatID = DocumentActions.GetElementById<HTMLInputElement>("txtMaterialCatID");
        txtMaterialCatRP = DocumentActions.GetElementById<HTMLInputElement>("txtMaterialCatRP");
        btnMaterialCatRP = DocumentActions.GetElementById<HTMLButtonElement>("btnMaterialCatRP");
        txtMaterialCat1RP = DocumentActions.GetElementById<HTMLInputElement>("txtMaterialCat1RP");



    }
    function Clear() {
        


        FromDate.value = DateFormat(new Date().toString());
        ToDate.value = DateFormat(new Date().toString());

        txtProjectID.value = "";
        txtProjectRP.value = "";
        txtProject1RP.value = "";

        txtitemcodeID.value = "";
        txtitemcodeRP.value = "";
        txtitemcode1RP.value = "";

        txtMaterialCatID.value = "";
        txtMaterialCatRP.value = "";
        txtMaterialCat1RP.value = "";


    }
    function Print() {
        //debugger


        let RP: ReportParameters = new ReportParameters();


        RP.CompCode = SharedSession.CurrentEnvironment.CompCode;
        RP.FromDate = DateFormat(FromDate.value);
        RP.ToDate = DateFormat(ToDate.value);
        RP.ItemId = Number(txtitemcodeID.value);
        RP.itemCatID = Number(txtMaterialCatID.value);
        RP.ProjectID = Number(txtProjectID.value);



        
         if (DateFormat(FromDate.value) == "NaN-NaN-NaN" || DateFormat(ToDate.value) == "NaN-NaN-NaN") {
            MessageBox.Show(" you must select Date", "Info");
            return;
        }
         else if (DateFormat(FromDate.value) > DateFormat(ToDate.value)) {
             MessageBox.Show(" From date  is largethan To Date", "Info");
             return;
         }
        else if ((txtProjectID.value) == "") {
            MessageBox.Show("there is empty input you must select Project", "Info");

        }
       
        else {



            if (<boolean>$("#RID_summary").prop("checked")) {
                RP.TypeReport = 1;


                Ajax.CallAsync({
                    url: Url.Action("rptRes_MaterialUsageproject", "GeneralReports"),
                    data: RP,
                    success: (d) => {
                        //debugger
                        let result = d.result as string;
                        window.open(result, "_blank");
                    }
                })


            }

            if (<boolean>$("#RID_Detail").prop("checked")) {
                RP.TypeReport = 2;

                Ajax.CallAsync({
                    url: Url.Action("rptRes_MaterialUsageproject", "GeneralReports"),
                    data: RP,
                    success: (d) => {
                        //debugger
                        let result = d.result as string;
                        window.open(result, "_blank");
                    }
                })
            }


        }

    }

    function InitalizeEvents() {
        debugger
        FromDate.value = DateFormat(new Date().toString());
        ToDate.value = DateFormat(new Date().toString());
        $("#RID_summary").prop("checked", "checked");
        btnProjectRP.onclick = btnProjectRP_Click;
        btnitemcodeRP.onclick = btnitemcodeRP_Click;
        btnMaterialCatRP.onclick = btnMaterialCatRP_Click;



    }

    function btnProjectRP_Click() {
        //
        sys.FindKey(Modules.LaborMonitoring, "butProj_Code", "", () => {
            //
            let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetSrchProject", ControllerName),
                data: { id: _Id },
                success: (d) => {

                    let result = d.result as P_TR_EngProject;
                    txtProjectID.value = result.ProjectID.toString();
                    txtProjectRP.value = result.ProjectCode.toString();

                    if (_ScreenLanguage == "ar") {
                        txtProject1RP.value = result.DescA;
                    }
                    else {
                        txtProject1RP.value = result.DescL;
                    }

                }
            });
        })
    }

    function btnitemcodeRP_Click() {
        
        sys.FindKey(Modules.MaterialUsageproject, "btnitemcodeRP", "", () => {
            
            let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetItemCodeSearch", ControllerName),
                data: { id: _Id },
                success: (d) => {
                    let result = d.result as IQ_SrchItem;
                    txtitemcodeID.value = result.ItemID.toString();
                    txtitemcodeRP.value = result.ItemCode.toString();

                    if (_ScreenLanguage == "ar") {
                        txtitemcode1RP.value = result.DescA.toString();
                    }
                    else {
                        txtitemcode1RP.value = result.DescL.toString();
                    }

                }
            });
        })
    }

    function btnMaterialCatRP_Click() {
        
        sys.FindKey(Modules.MaterialList, "butCatCode", "", () => {
            
            let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetSrchMatCode", ControllerName),
                data: { id: _Id },
                success: (d) => {
                    let result = d.result as I_D_Category;
                    txtMaterialCatID.value = result.CatID.toString();
                    txtMaterialCatRP.value = result.CatCode.toString();

                    if (_ScreenLanguage == "ar") {
                        txtMaterialCat1RP.value = result.DescA;
                    }
                    else {
                        txtMaterialCat1RP.value = result.DescL;
                    }

                }
            });
        })
    }


}