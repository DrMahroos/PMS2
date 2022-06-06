$(document).ready(function () {
    SlsItemReport.InitalizeComponent();
});
var SlsItemReport;
(function (SlsItemReport) {
    var sys = new SystemTools();
    var Model = new P_D_SalesEgineer();
    var ajaxCall = new AjaxCaller();
    var Master = new P_D_SalesItems();
    SlsItemReport.dataSource = new Array();
    var txtItemCodeRP;
    var txtItemIDRP;
    var btnItemCodeRP;
    var txtItemNameRP;
    var txtItemID;
    var txtItemCodeRP2;
    var txtItemIDRP2;
    var btnItemCodeRP2;
    var txtItemNameRP2;
    var txtItemcIDRP;
    var txtItemcCodeRP;
    var btnItemCatRP;
    var txtItemName1RP;
    var txtScopeIDRP;
    var txtScopeNameRP;
    var txtScopeCodeRP;
    var btnScopeIDRP;
    //Initalize The Current Popup
    function InitalizeComponent() {
        //SharedSession.CurrentEnvironment.ScreenLanguage = SharedSession.CurrentEnvironment.ScreenLanguage;
        GeneralReports.OnClear = Clear;
        GeneralReports.OnPrint = Print;
        InitalizeControls();
        InitalizeEvents();
    }
    SlsItemReport.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        txtItemCodeRP = DocumentActions.GetElementById("txtItemCodeRP");
        txtItemIDRP = DocumentActions.GetElementById("txtItemIDRP");
        btnItemCodeRP = DocumentActions.GetElementById("btnItemCodeRP");
        txtItemNameRP = DocumentActions.GetElementById("txtItemNameRP");
        txtItemCodeRP2 = DocumentActions.GetElementById("txtItemCodeRP2");
        txtItemIDRP2 = DocumentActions.GetElementById("txtItemIDRP2");
        btnItemCodeRP2 = DocumentActions.GetElementById("btnItemCodeRP2");
        txtItemNameRP2 = DocumentActions.GetElementById("txtItemNameRP2");
        txtItemcCodeRP = DocumentActions.GetElementById("txtItemcCodeRP");
        btnItemCatRP = DocumentActions.GetElementById("btnItemCatRP");
        txtItemName1RP = DocumentActions.GetElementById("txtItemName1RP");
        // txtBraCodeRP.value = "";
        txtItemID = DocumentActions.GetElementById("txtItemID");
        txtScopeIDRP = DocumentActions.GetElementById("txtScopeIDRP");
        txtScopeNameRP = DocumentActions.GetElementById("txtScopeNameRP");
        txtScopeCodeRP = DocumentActions.GetElementById("txtScopeCodeRP");
        btnScopeIDRP = DocumentActions.GetElementById("btnScopeIDRP");
    }
    function InitalizeEvents() {
        debugger;
        btnItemCodeRP.onclick = btnItemCode_ClickedRP;
        btnItemCodeRP2.onclick = btnItemCode_ClickedRP2;
        btnScopeIDRP.onclick = btnScopeID_Clicked;
    }
    //Print Current Report
    function Print() {
        var RP = new ReportParameters();
        RP.CompCode = SharedSession.CurrentEnvironment.CompCode;
        RP.braCode = SharedSession.CurrentEnvironment.BranchCode;
        if ($("#RDItemList").prop("checked")) {
            RP.FromItemNo = (txtItemCodeRP.value);
            RP.ToItemNo = (txtItemCodeRP2.value);
            RP.ScopeID = Number(txtScopeIDRP.value);
            if ($("#ActiveRP").prop("checked")) {
                RP.Active = 1;
            }
            else if ($("#NoActiveRP").prop("checked")) {
                RP.Active = 0;
            }
            else if ($("#AllRP").prop("checked")) {
                RP.Active = null;
            }
            ;
            if ($("#DetailRP").prop("checked")) {
                RP.Detail = 1;
            }
            else if ($("#NoDetailRP").prop("checked")) {
                RP.Detail = 0;
            }
            else if ($("#AllDetailRP").prop("checked")) {
                RP.Detail = null;
            }
            ;
            Ajax.CallAsync({
                url: Url.Action("rptSlsItemList", "GeneralReports"),
                data: RP,
                success: function (d) {
                    var result = d.result;
                    window.open(result, "_blank");
                }
            });
        }
        if ($("#RDItemCard").prop("checked")) {
            RP.ItemId = Number(txtItemID.value);
            Ajax.CallAsync({
                url: Url.Action("rptSlsItemCard", "GeneralReports"),
                data: RP,
                success: function (d) {
                    var result = d.result;
                    window.open(result, "_blank");
                }
            });
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
        sys.FindKey(Modules.SalesItemLibrary, "btnItemCodeRP", "CompCode = " + ClientSharedWork.Session.CompCode, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetByID", "SalesItemLibrary"),
                data: { id: id },
                success: function (d) {
                    var result = d.result;
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
        sys.FindKey(Modules.SalesItemLibrary, "btnItemCodeRP2", "CompCode = " + ClientSharedWork.Session.CompCode, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetByID", "SalesItemLibrary"),
                data: { id: id },
                success: function (d) {
                    Master = d.result;
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
        sys.FindKey(Modules.SalesItemLibrary, "btnScopeIDRP", "CompCode = " + ClientSharedWork.Session.CompCode, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("ScopeList", "SalesItemLibrary"),
                data: { id: id },
                success: function (d) {
                    var scope = d.result;
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
})(SlsItemReport || (SlsItemReport = {}));
//# sourceMappingURL=SlsItemReport.js.map