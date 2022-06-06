var AppMenu;
(function (AppMenu) {
    var btnNat;
    var btnInvoice;
    var btnClose;
    var sys = new SystemTools();
    function InitalizeComponent() {
        btnNat = document.getElementById("DefNationlity");
        btnInvoice = document.getElementById("TRSLSINVOICERETAIL");
        btnClose = document.getElementById("LICLOSE");
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
    AppMenu.InitalizeComponent = InitalizeComponent;
    function btnNat_Click() {
        var atr = btnNat.title;
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
        var atr = btnInvoice.title;
        // ClientSharedWork.LoadPageContent(atr, Modules.TRSLSINVOICERETAIL);
    }
    function btnClose_click() {
        var msg = confirm("Are you sure ?");
        if (msg == false)
            return;
        var url = $("#ClientToolsUrl").val();
        var controllerName = url.replace("DEFXX", "LogOut");
        $.ajax({
            url: controllerName,
            success: function (response) {
                window.open(response.result, "_self");
            }
        });
    }
})(AppMenu || (AppMenu = {}));
//# sourceMappingURL=AppMenu.js.map