
namespace AppMenu {
    var btnNat: HTMLLIElement;
    var btnInvoice: HTMLLIElement;
    var btnClose: HTMLLIElement;

    var sys: SystemTools = new SystemTools();
    export function InitalizeComponent() {

        btnNat = document.getElementById("DefNationlity") as HTMLLIElement;
        btnInvoice = document.getElementById("TRSLSINVOICERETAIL") as HTMLLIElement;
        btnClose = document.getElementById("LICLOSE") as HTMLLIElement;


        btnNat.addEventListener("click", btnNat_Click, false);
        btnInvoice.addEventListener("click", btnInvoice_Click, false);
        btnClose.addEventListener("click", btnClose_click, false);

        //$("#infSystemName").text(ClientSharedWork.Session.SystemName);
        //$("#infSubSystemName").text(ClientSharedWork.Session.SubSystemName);
        //$("#infCompanyName").text(ClientSharedWork.Session.CompCode);
        //$("#infBranchName").text(ClientSharedWork.Session.BranchCode);
        //$("#infFasicalYear").text(ClientSharedWork.Session.CurrentYear);
        //$("#infUserName").text(ClientSharedWork.Session.UserCode);
        //App.SwitchAppLanguage();

    }


    function btnNat_Click() {

        let atr = btnNat.title;
        //ClientSharedWork.LoadPageContent(atr, Modules.DefNationlity);
    }
    function btnSLS_Click() {
        //let component = new SalesMan_Module.SalesManComponent;
        //SharedMethods.OpenComponent(SalesMan_Module.SalesManComponent, "Sales", component.Load);
    }

    function btnCCustomer_Click() {
        //SharedMethods.OpenComponent(I_CashCustomerModule.I_CashCustomerComponent, "Cash customer", null);
    }

    function btnInvoice_Click() {
        let atr = btnInvoice.title;
        // ClientSharedWork.LoadPageContent(atr, Modules.TRSLSINVOICERETAIL);

    }

    function btnClose_click() {
        let msg = confirm("Are you sure ?");
        if (msg == false)
            return;

        let url: string = $("#ClientToolsUrl").val();
        let controllerName = url.replace("DEFXX", "LogOut");
        $.ajax({
            url: controllerName,
            success: (response) => {
                window.open(response.result, "_self");
            }
        });
    }
}