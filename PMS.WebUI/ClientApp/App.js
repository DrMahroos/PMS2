var ScreenModes;
(function (ScreenModes) {
    ScreenModes[ScreenModes["Query"] = 0] = "Query";
    ScreenModes[ScreenModes["Add"] = 1] = "Add";
    ScreenModes[ScreenModes["Edit"] = 2] = "Edit";
    ScreenModes[ScreenModes["Start"] = 3] = "Start";
    ScreenModes[ScreenModes["DisableMenu"] = 4] = "DisableMenu";
})(ScreenModes || (ScreenModes = {}));
var JsGridHeaderCenter = "JsGridHeaderCenter";
var JsGridHeaderRight = "JsGridHeaderRight";
var JsGridHeaderLeft = "JsGridHeaderLeft";
var TransparentButton = "TransparentButton";
var RequiredClassName = " required";
var RequiredElements = new Array();
var exchangeElements = new Array();
var Modules = {
    Home: "Home",
    SalesEngCategory: "SalesEngCategory",
    SalesEngineer: "SalesEngineer",
    SiteEngCategory: "SiteEngCategory",
    SiteEngineer: "SiteEngineer",
    LaborDefinition: "LaborDefinition",
    UnProductionreasons: "UnProductionreasons",
    VendorDefinition: "VendorDefinition",
    CategoryDefinition: "CategoryDefinition",
    ItemDefinition: "ItemDefinition",
    EquipmentCategory: "EquipmentCategory",
    EquipmentDefinition: "EquipmentDefinition",
    ExpensesCategory: "ExpensesCategory",
    Expenses: "Expenses",
    UnitsOfMeasure: "UnitsOfMeasure",
    Nationality: "Nationality",
    ScopeDefinition: "ScopeDefinition",
    ActivityDefinition: "ActivityDefinition",
    WorkActivities: "WorkActivities",
    CalendarDefinition: "CalendarDefinition",
    LocationDefinition: "LocationDefinition",
    PeriodManagement: "PeriodManagement",
    LaborCategory: "LaborCategory",
    LaborClass: "LaborClass",
    LaborAbsenceReasons: "LaborAbsenceReasons",
    LaborOvertimetypes: "LaborOvertimetypes",
    UnProductioncategory: "UnProductioncategory",
    ScopeClassandCat: "ScopeClassandCat",
    SystemSetting: "SystemSetting",
    Labor: "Labor",
    laborCategory: "laborCategory",
    laborClass: "laborClass",
    Nationalty: "Nationalty",
    laborArea: "laborArea",
    Expences: "Expences",
    ScopeDef: "ScopeDef",
    prodCategory: "prodCategory",
    Uom: "Uom",
    Activity: "Activity",
    UsersSetting: "UsersSetting",
    //Sales
    HomeSales: "HomeSales",
    CustomerCategory: "CustomerCategory",
    Customers: "Customers",
    CustomerRespItems: "CustomerRespItems",
    CompanyRespItem: "CompanyRespItem",
    SalesItemLibrary: "SalesItemLibrary",
    SalesItemPlan: "SalesItemPlan",
    ActivityPrice: "ActivityPrice",
    IssueProduction: "IssueProduction",
    CustomerBilling: "CustomerBilling",
    SalesManBonus: "SalesManBonus",
    OfferDefinition: "OfferDefinition",
    OfferSpecification: "OfferSpecification",
    OfferCostEstimation: "OfferCostEstimation",
    OfferBillingSchedule: "OfferBillingSchedule",
    StartOfWork: "StartOfWork",
    ContractList: "ContractList",
    OfferList: "OfferList",
    BillingList: "BillingList",
    SalesmanActivity: "SalesmanActivity",
    ProductionVsBilling: "ProductionVsBilling",
    SalesPaymentTerms: "SalesPaymentTerms",
    itemSalesAc: "itemSalesAc",
    SlsOff: "SlsOff",
    itmSearch: "itmSearch",
    laborSrch: "laborSrch",
    EquSearch: "EquSearch",
    ProjItemsInventory: "ProjItemsInventory",
    CRMReport: "CRMReport",
    TaxInvoicelist: "TaxInvoicelist",
    CustomerDbCr: "CustomerDbCr",
    //Engineer
    HomeEngineer: "HomeEngineer",
    ProjectDefination: "ProjectDefination",
    SalesPayTerms: "SalesPayTerms",
    ProjectSpecification: "ProjectSpecification",
    ProjectMasterPlan: "ProjectMasterPlan",
    ProjectChange: "ProjectChange",
    WorkSchedule: "WorkSchedule",
    OpProductionEntry: "OpProductionEntry",
    OpProjectExpenses: "OpProjectExpenses",
    Prequalification: "Prequalification",
    Definition: "Definition",
    SubContContract: "SubContContract",
    ServiceOrder: "ServiceOrder",
    ProductionEntry: "ProductionEntry",
    SubContractorListing: "SubContractorListing",
    SubContrActivity: "SubContrActivity",
    Production: "Production",
    Evaluation: "Evaluation",
    SubCandidate: "SubCandidate",
    SubContractor: "SubContractor",
    ExpensesEntry: "ExpensesEntry",
    EngExpences: "EngExpences",
    EngProjectPhases: "EngProjectPhases",
    ProjectExpenses: "ProjectExpenses",
    SubContract: "SubContract",
    LaborScheduleUtz: "LaborScheduleUtz",
    ProjectExpensesRep: "ProjectExpensesRep",
    ProjectStatus: "ProjectStatus",
    ProjectProgress: "ProjectProgress",
    PeriodBudget: "PeriodBudget",
    Prepare: "Prepare",
    BudgetRequirements: "BudgetRequirements",
    MonthBudgetByEng: "MonthBudgetByEng",
    MonthBudgetForBranch: "MonthBudgetForBranch",
    MonthBudgetForComp: "MonthBudgetForComp",
    Projectvsprogress: "Prodvsprogress",
    Projectvaliation: "Projectvaliation",
    //Resource
    HomeResource: "HomeResource",
    LaborSchedule: "LaborSchedule",
    BillOfMaterial: "BillOfMaterial",
    MaterialMonitoring: "MaterialMonitoring",
    MaterialRequest: "MaterialRequest",
    MaterialIssuance: "MaterialIssuance",
    MaterialReturn: "MaterialReturn",
    MaterialList: "MaterialList",
    EquipmentMonitoring: "EquipmentMonitoring",
    EquipmentRequest: "EquipmentRequest",
    EquipmentAssign: "EquipmentAssign",
    LaborMonitoring: "LaborMonitoring",
    LaborRequest: "LaborRequest",
    LaborAssign: "LaborAssign",
    OverTimeSheet: "OverTimeSheet",
    LateandAbsence: "LateandAbsence",
    ProjectRequirements: "ProjectRequirements",
    MaterialUsage: "MaterialUsage",
    MaterialUsageSummary: "MaterialUsageSummary",
    MaterialUsageproject: "MaterialUsageproject",
    LaborMovement: "LaborMovement",
    LaborWork: "LaborWork",
    AttendanceSheet: "AttendanceSheet",
    Laborutilization: "Laborutilization",
    Equipmentmovement: "Equipmentmovement",
    Equipmentutilization: "Equipmentutilization",
    UnprodHour: "UnprodHour",
    //DSS
    DSS: "DSS",
    BranchComparison: "BranchComparison",
    SalesComparison: "SalesComparison",
    ProductionComparis: "ProductionComparis",
    IncomeComparison: "IncomeComparison",
    DirectCostComparis: "DirectCostComparis",
    EvaluationCompar: "EvaluationCompar",
    ByScopeCategory: "ByScopeCategory",
    EC_ByScope: "EC_ByScope",
    ByCustomerClass: "ByCustomerClass",
    ByBranch: "ByBranch",
    ByProject: "ByProject",
    ByItem: "ByItem",
    CompanyCollectiveW: "CompanyCollectiveW",
    C_ByScopeCategory: "C_ByScopeCategory",
    CC_ByScope: "CC_ByScope",
    ByActivity: "ByActivity",
    NormsVariationRep: "NormsVariationRep",
    SubContractorWork: "SubContractorWork",
    Prodvsprogress: "Prodvsprogress",
    //REP
    REP: "REP",
    RepProjectDist: "RepProjectDist",
    RepProjectPhaseDis: "RepProjectPhaseDis",
    RepProjectWorking: "RepProjectWorking",
    RepProjectFollowUp: "RepProjectFollowUp",
    RepProjectBandFollow: "RepProjectBandFollow",
    RepLaborEvaluation: "RepLaborEvaluation",
    RepSiteEngineerBonus: "RepSiteEngineerBonus",
    RepProjectEvaluation: "RepProjectEvaluation",
    RepProjectCost: "RepProjectCost",
    RepProjectCostVarian: "RepProjectCostVarian",
    RepMaterialCoverage: "RepMaterialCoverage",
    RepLaborCostVariance: "RepLaborCostVariance",
    RepEquipCostVariance: "RepEquipCostVariance",
    ProjectBillingSteaus: "ProjectBillingSteaus"
};
var Keys = {
    Enter: "Enter"
};
var SearchModulesNames = {};
//var Url = {
//    Action: (actionName: string, controllerName: string) => (
//        location.origin + "/" + controllerName + "/" + actionName
//    )
//};
var Url = {
    Action: function (actionName, controllerName) { return ($.ajax({
        url: $("#GetActionUrl").val(),
        async: false,
        data: { actionName: actionName, controllerName: controllerName }
    }).responseJSON).result; }
};
var Ajax = {
    Call: function (settings) {
        try {
            var json = $.ajax({
                url: settings.url,
                data: settings.data,
                cache: false,
                async: false
            }).responseJSON;
            var result = json.result;
            return result;
        }
        catch (e) {
            $(".waitMe").removeAttr("style").fadeOut(200);
            return null;
        }
    },
    CallAsync: function (settings) {
        run_waitMe();
        $.ajax({
            url: settings.url,
            data: settings.data,
            cache: false,
            success: function (d) {
                settings.success(d, "", null);
                $(".waitMe").removeAttr("style").fadeOut(200);
            },
            error: function () { $(".waitMe").removeAttr("style").fadeOut(200); }
        });
    },
    Callsync: function (settings) {
        run_waitMe();
        $.ajax({
            url: settings.url,
            data: settings.data,
            cache: false,
            async: false,
            success: function (d) {
                settings.success(d, "", null);
                $(".waitMe").removeAttr("style").fadeOut(200);
            },
            error: function () { $(".waitMe").removeAttr("style").fadeOut(200); }
        });
    }
};
var AjaxApi = {
    CallApi: function (settings) {
        try {
            var json = $.ajax({
                type: settings.type,
                url: settings.url,
                data: settings.data,
                cache: false,
                async: false
            }).responseJSON;
            var result = json.result;
            return result;
        }
        catch (e) {
            $(".waitMe").removeAttr("style").fadeOut(200);
            return null;
        }
    },
    CallAsyncApi: function (settings) {
        run_waitMe();
        $.ajax({
            type: settings.type,
            url: settings.url,
            data: settings.data,
            cache: false,
            headers: {
                'Accept': 'application/json; charset=utf-8',
                'Content-Type': 'application/json'
            },
            success: function (d) {
                settings.success(d, "", null);
                $(".waitMe").removeAttr("style").fadeOut(200);
            },
            error: function () { $(".waitMe").removeAttr("style").fadeOut(200); }
        });
    },
    CallsyncApi: function (settings) {
        run_waitMe();
        $.ajax({
            type: settings.type,
            url: settings.url,
            data: settings.data,
            headers: {
                'Accept': 'application/json; charset=utf-8',
                'Content-Type': 'application/json'
            },
            cache: false,
            async: false,
            success: function (d) {
                settings.success(d, "", null);
                $(".waitMe").removeAttr("style").fadeOut(2500);
            },
            error: function () { $(".waitMe").removeAttr("style").fadeOut(2500); }
        });
    }
};
var DocumentActions = {
    SetRequiredElements: function () {
        var elements = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            elements[_i] = arguments[_i];
        }
        RequiredElements = new Array();
        for (var _a = 0, elements_1 = elements; _a < elements_1.length; _a++) {
            var element = elements_1[_a];
            RequiredElements.push(element);
        }
    },
    SetExchangeElements: function (ArElement, EnElement) {
        exchangeElements = new Array();
        exchangeElements.push(ArElement);
        exchangeElements.push(EnElement);
    },
    ValidateRequired: function () {
        var bools = new Array();
        var elements = RequiredElements;
        for (var _i = 0, elements_2 = elements; _i < elements_2.length; _i++) {
            var element = elements_2[_i];
            switch (element.tagName.toUpperCase()) {
                case "INPUT":
                    if (element.type == "check") {
                        if (element.checked == false) {
                            bools.push(false);
                            element.style.borderColor = "red";
                        }
                        else {
                            bools.push(true);
                            element.style.borderColor = "";
                        }
                    }
                    else {
                        if (element.value == "") {
                            bools.push(false);
                            element.style.borderColor = "red";
                        }
                        else {
                            bools.push(true);
                            element.style.borderColor = "";
                        }
                    }
                    break;
                case "SELECT":
                    if (element.value == "") {
                        bools.push(false);
                        element.style.borderColor = "red";
                    }
                    else {
                        bools.push(true);
                        element.style.borderColor = "";
                    }
                    break;
                default:
            }
        }
        if (exchangeElements.length > 0) {
            if (exchangeElements[0].value == "" && exchangeElements[1].value == "") {
                bools.push(false);
                exchangeElements[0].style.borderColor = "orange";
                exchangeElements[1].style.borderColor = "orange";
            }
            else {
                bools.push(true);
                exchangeElements[0].style.borderColor = "";
                exchangeElements[1].style.borderColor = "";
            }
        }
        var count = bools.filter(function (f) { return f == false; }).length;
        if (count > 0)
            return false;
        else
            return true;
    },
    RenderFromModel: function (dataSource) {
        try {
            var properties = Object.getOwnPropertyNames(dataSource);
            for (var _i = 0, properties_1 = properties; _i < properties_1.length; _i++) {
                var property = properties_1[_i];
                var element = document.getElementsByName(property)[0];
                if (element == null)
                    continue;
                if (property == "CreatedAt" || property == "UpdatedAt") {
                    if (String(dataSource[property]).indexOf("Date") > -1) {
                        element.value = DateTimeFormat(dataSource[property]);
                    }
                    else {
                        element.value = dataSource[property];
                    }
                    continue;
                }
                if (property == "CreatedBy" || property == "UpdatedBy") {
                    var value = String(dataSource[property]).toString();
                    if (value != null)
                        element.value = value;
                    else
                        element.value = "";
                    continue;
                }
                if (dataSource[property] == null) {
                    try {
                        element.value = dataSource[property];
                    }
                    catch (e) {
                    }
                    finally {
                        continue;
                    }
                }
                if (element.type == "checkbox")
                    element.checked = (dataSource[property]);
                else if (element.type == "date") {
                    element.value = DateFormat(dataSource[property]);
                }
                else
                    element.value = dataSource[property];
            }
        }
        catch (e) {
        }
    },
    AssignToModel: function (model) {
        var properties = Object.getOwnPropertyNames(model);
        for (var _i = 0, properties_2 = properties; _i < properties_2.length; _i++) {
            var property = properties_2[_i];
            if (property == "UpdatedAt" || property == "CreatedAt" || property == "CreatedBy" || property == "UpdatedBy") {
                continue;
            }
            var element = document.getElementsByName(property)[0];
            if (element != null) {
                if (element.type == "checkbox")
                    model[property] = element.checked;
                else
                    model[property] = element.value;
            }
        }
        return model;
    },
    FillCombo: function (dataSource, combo, codeField, textField) {
        if (combo != null) {
            for (var i = combo.length; i >= 0; i--) {
                combo.remove(i);
            }
            for (var i = 0; i < dataSource.length; i++) {
                var code = dataSource[i][codeField];
                var name_1 = dataSource[i][textField];
                combo.add(new Option(name_1, code));
            }
        }
    },
    FillComboWithEmpty: function (dataSource, combo, codeField, textField) {
        for (var i = combo.length; i >= 0; i--) {
            combo.remove(i);
        }
        combo.add(new Option("", ""));
        for (var i = 0; i < dataSource.length; i++) {
            var code = dataSource[i][codeField];
            var name_2 = dataSource[i][textField];
            combo.add(new Option(name_2, code));
        }
    },
    GetElementById: function (id) {
        var element = document.getElementById(id);
        return element;
    },
    CreateElement: function (id) {
        var element = document.createElement(id);
        return element;
    },
    SwitchLanguage: function () {
        return;
    }
};
var DescByCode = {
    I_D_Category: function (code) {
        return ClientSharedWork.GetDescByCode("I_D_Category", code);
    },
    I_D_UnitGroup: function (code) {
        return ClientSharedWork.GetDescByCode("I_D_UnitGroup", code);
    }
};
var Language = {
    GetValueByKey: function (key) {
        var result = Ajax.Call({
            url: Url.Action("GetResourceByName", "ClientTools"),
            data: { key: key }
        });
        return result;
    }
};
//End Interface
var App;
(function (App) {
    var branchCodeSelected = "";
    var LanguageButton;
    function Startup() {
        SharedSession.CurrentEnvironment = GetSystemEnvironment();
        try {
            var SpanUserName = DocumentActions.GetElementById("SpanUserName");
            SpanUserName.innerText = SharedSession.CurrentEnvironment.UserCode;
            SpanUserName.style.display = "block";
            SpanUserName.onclick = GetBranchs;
        }
        catch (e) {
        }
        var btnEditUserBranchs;
        try {
            btnEditUserBranchs = DocumentActions.GetElementById("btnEditUserBranchs");
            btnEditUserBranchs.onclick = EnableBranchSelected;
        }
        catch (e) {
        }
        var btnChangeBranch;
        try {
            btnChangeBranch = DocumentActions.GetElementById("btnChangeBranch");
            btnChangeBranch.onclick = ChangeBranch;
        }
        catch (e) {
        }
        AssignLoginInformation();
        try {
            LanguageButton = DocumentActions.GetElementById("LanguageButton");
            LanguageButton.onclick = LanguageButton_Click;
        }
        catch (e) {
        }
        try {
            DocumentActions.GetElementById("btnChangePassword").onclick = function () {
                var oldPassword = DocumentActions.GetElementById("txtOldPassword").value;
                var newPassword = DocumentActions.GetElementById("txtNewPassword").value;
                ChangePassword(oldPassword, newPassword);
            };
        }
        catch (e) {
        }
        try {
            DocumentActions.GetElementById("spnFav").onclick = function () {
                var sys = new SystemTools();
                sys.SwitchUserFavorite();
            };
        }
        catch (e) {
        }
        AssignLoginInformation();
    }
    App.Startup = Startup;
    function AssignLoginInformation() {
        if (DocumentActions.GetElementById("infoSysName") != null)
            DocumentActions.GetElementById("infoSysName").innerText = SharedSession.CurrentEnvironment.SystemCode;
        if (DocumentActions.GetElementById("infoSubSysName") != null)
            DocumentActions.GetElementById("infoSubSysName").innerText = SharedSession.CurrentEnvironment.SubSystemCode;
        if (DocumentActions.GetElementById("infoCompanyName") != null) {
            if (SharedSession.CurrentEnvironment.ScreenLanguage == "ar")
                DocumentActions.GetElementById("infoCompanyName").innerText = SharedSession.CurrentEnvironment.CompanyNameAr;
            else
                DocumentActions.GetElementById("infoCompanyName").innerText = SharedSession.CurrentEnvironment.CompanyName;
        }
        if (DocumentActions.GetElementById("infoCurrentYear") != null)
            DocumentActions.GetElementById("infoCurrentYear").innerText = SharedSession.CurrentEnvironment.CurrentYear;
        if (DocumentActions.GetElementById("infoUserCode") != null)
            DocumentActions.GetElementById("infoUserCode").innerText = SharedSession.CurrentEnvironment.UserCode;
    }
    App.AssignLoginInformation = AssignLoginInformation;
    function LanguageButton_Click() {
        debugger;
        if (sessionStorage.getItem("temp_lang") == "ar") { // English Mode
            SharedSession.CurrentEnvironment.ScreenLanguage = "en";
            document.cookie = "PMS_systemProperties=" + JSON.stringify(SharedSession.CurrentEnvironment) + ";expires=Fri, 31 Dec 2030 23:59:59 GMT;path=/";
            sessionStorage.setItem("temp_lang", "en");
        }
        else { // Arabic Mode
            SharedSession.CurrentEnvironment.ScreenLanguage = "ar";
            document.cookie = "PMS_systemProperties=" + JSON.stringify(SharedSession.CurrentEnvironment) + ";expires=Fri, 31 Dec 2030 23:59:59 GMT;path=/";
            sessionStorage.setItem("temp_lang", "ar");
        }
        Ajax.CallAsync({
            url: Url.Action("SetScreenLang", "ClientTools"),
            data: { lang: SharedSession.CurrentEnvironment.ScreenLanguage },
            success: function (response) { }
        });
        $(".language").css("display", "none");
        $("." + SharedSession.CurrentEnvironment.ScreenLanguage).css("display", "");
    }
    function AppendStyleSheet(fileName) {
        var lnk = document.createElement('link');
        lnk.href = "../css/" + fileName + ".css";
        lnk.rel = 'stylesheet';
        lnk.type = 'text/css';
        var $head = $("head");
        var $headlinklast = $head.find("link[rel='stylesheet']:first");
        $headlinklast.after(lnk);
    }
    function RemoveStyleSheet(fileName) {
        var href = "../css/" + fileName + ".css";
        $("link[rel=stylesheet][href~='" + href + "']").remove();
    }
})(App || (App = {}));
//Start Global Functions
function IsNullOrEmpty(value) {
    if (value == null || value == "")
        return true;
    else
        return false;
}
function Sum(_Array, _Field) {
    var _Result = 0;
    for (var _i = 0, _Array_1 = _Array; _i < _Array_1.length; _i++) {
        var item = _Array_1[_i];
        _Result += item[_Field];
    }
    return _Result;
}
//Start Services Navigate And Index
function GetIndexByUseId(idValue, BaseTableName, idFieldName, condation) {
    var result = "";
    if (IsNullOrEmpty(idValue.toString()) || IsNullOrEmpty(BaseTableName) || IsNullOrEmpty(idFieldName)) {
        return result;
    }
    else {
        var result_1 = Ajax.Call({
            url: Url.Action("GetIndexByUseId", "ClientTools"),
            data: { idValue: idValue.toString(), BaseTableName: BaseTableName, idFieldName: idFieldName, condation: condation }
        });
        return result_1;
    }
}
//function GetIndexByUseIdTest(idValue: Number, BaseTableName: string, idFieldName: string, condation: string): string {
//    let result = "";
//    if (IsNullOrEmpty(idValue.toString()) || IsNullOrEmpty(BaseTableName) || IsNullOrEmpty(idFieldName)) {
//        return result;
//    } else {
//        let result = Ajax.Call<string>({
//            url: Url.Action("GetIndexByUseId", "ClientTools"),
//            data: { idValue: idValue.toString(), BaseTableName: BaseTableName, idFieldName: idFieldName, condation: condation }
//        });
//        return result;
//    }
//}
function GetIndexByUseCode(idValue, BaseTableName, idFieldName, condation) {
    var result = "";
    if (IsNullOrEmpty(idValue.toString()) || IsNullOrEmpty(BaseTableName) || IsNullOrEmpty(idFieldName)) {
        return result;
    }
    else {
        debugger;
        var result_2 = Ajax.Call({
            url: Url.Action("GetIndexByUseCode", "ClientTools"),
            data: { idValue: idValue.toString(), BaseTableName: BaseTableName, idFieldName: idFieldName, condation: condation }
        });
        return result_2;
    }
}
function NavigateToSearchResult(Navigate) {
    CloseSearchBox();
    var index = ClientSharedWork.SearchDataGrid.SelectedKey;
    ClientSharedWork.PageIndex = Number(index);
    Navigate();
    ClientSharedWork.Render();
}
function NavigateToSearchResultKey(IndexNo, Navigate) {
    CloseSearchBox();
    ClientSharedWork.PageIndex = IndexNo;
    Navigate();
    ClientSharedWork.Render();
}
//End Services Navigate And Index
//Start Services MessagBox
function ReturnMsg(msg_Ar, msg_En) {
    var _Result = "";
    switch (SharedSession.CurrentEnvironment.ScreenLanguage) {
        case "ar":
            _Result = msg_Ar;
            break;
        case "en":
            _Result = msg_En;
            break;
    }
    return _Result;
}
function WorningMessage(msg_Ar, msg_En, tit_ar, tit_en, OnOk) {
    if (tit_ar === void 0) { tit_ar = "تنبيه"; }
    if (tit_en === void 0) { tit_en = "worning"; }
    switch (SharedSession.CurrentEnvironment.ScreenLanguage) {
        case "ar":
            MessageBox.Show(msg_Ar, tit_ar, OnOk);
            break;
        case "en":
            MessageBox.Show(msg_En, tit_en, OnOk);
            break;
    }
}
function ConfirmMessage(msg_Ar, msg_En, tit_ar, tit_en, OnOk) {
    if (msg_Ar === void 0) { msg_Ar = "تمت عملية الحفظ  بنجاح"; }
    if (msg_En === void 0) { msg_En = "Data Saved Successfully"; }
    if (tit_ar === void 0) { tit_ar = "تأكيد"; }
    if (tit_en === void 0) { tit_en = "Confirm"; }
    switch (SharedSession.CurrentEnvironment.ScreenLanguage) {
        case "ar":
            MessageBox.Show(msg_Ar, tit_ar, OnOk);
            break;
        case "en":
            MessageBox.Show(msg_En, tit_en, OnOk);
            break;
    }
}
function WorningMessageDailog(msg_Ar, msg_En, tit_ar, tit_en, OnOk, OnCancel) {
    if (tit_ar === void 0) { tit_ar = "تنبيه"; }
    if (tit_en === void 0) { tit_en = "worning"; }
    switch (SharedSession.CurrentEnvironment.ScreenLanguage) {
        case "ar":
            MessageBox.Ask(msg_Ar, tit_ar, OnOk, OnCancel);
            break;
        case "en":
            MessageBox.Ask(msg_En, tit_en, OnOk, OnCancel);
            break;
    }
}
//End Services MessageBox
//
function GetCurrentDate() {
    var PControl = SharedSession.CurrentEnvironment.P_Control;
    var now = new Date;
    var utc = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds());
    //utc.setHours(utc.getHours() + PControl.UserTimeZoneUTCDiff);
    return utc;
}
function DateFormat(dateForm) {
    try {
        var date = new Date();
        var myDate = "";
        if (dateForm.indexOf("Date(") > -1) {
            myDate = dateForm.split('(')[1].split(')')[0];
            date = new Date(Number(myDate));
        }
        else {
            date = new Date(dateForm);
        }
        var yy = date.getFullYear();
        var mm = (date.getMonth() + 1);
        var dd = date.getDate();
        var year = yy;
        var month = (mm < 10) ? ("0" + mm.toString()) : mm.toString();
        var day = (dd < 10) ? ("0" + dd.toString()) : dd.toString();
        //The specified value "'2018-01-15'" does not conform to the required format, "yyyy-MM-dd".
        var startDate = year + "-" + month + "-" + day;
        var form_date = startDate;
        return form_date;
    }
    catch (e) {
        return DateFormat(new Date().toString());
    }
}
function DateTimeFormat(dateForm) {
    try {
        var date = new Date();
        var myDate = "";
        if (dateForm.indexOf("Date(") > -1) {
            myDate = dateForm.split('(')[1].split(')')[0];
            date = new Date(Number(myDate));
        }
        else {
            date = new Date(dateForm);
        }
        var yy = date.getFullYear();
        var mm = (date.getMonth() + 1);
        var dd = date.getDate();
        var hh = (date.getHours());
        var mn = (date.getMinutes());
        var ss = (date.getSeconds());
        var year = yy;
        var month = (mm < 10) ? ("0" + mm.toString()) : mm.toString();
        var day = (dd < 10) ? ("0" + dd.toString()) : dd.toString();
        var hour = (hh < 10) ? ("0" + hh.toString()) : hh.toString();
        var Minute = (mn < 10) ? ("0" + mn.toString()) : mn.toString();
        var Second = (ss < 10) ? ("0" + ss.toString()) : ss.toString();
        var startDate = year + "-" + month + "-" + day + "T" + hour + ":" + Minute; //+ ":" + Second;
        var form_date = startDate;
        return form_date;
    }
    catch (e) {
        return DateFormat(new Date().toString());
    }
}
function DateTimeFormatWithoutT(dateForm) {
    try {
        var date = new Date();
        var myDate = "";
        if (dateForm.indexOf("Date(") > -1) {
            myDate = dateForm.split('(')[1].split(')')[0];
            date = new Date(Number(myDate));
        }
        else {
            date = new Date(dateForm);
        }
        var yy = date.getFullYear();
        var mm = (date.getMonth() + 1);
        var dd = date.getDate();
        var hh = (date.getHours());
        var mn = (date.getMinutes());
        var ss = (date.getSeconds());
        var year = yy;
        var month = (mm < 10) ? ("0" + mm.toString()) : mm.toString();
        var day = (dd < 10) ? ("0" + dd.toString()) : dd.toString();
        var hour = (hh < 10) ? ("0" + hh.toString()) : hh.toString();
        var Minute = (mn < 10) ? ("0" + mn.toString()) : mn.toString();
        var Second = (ss < 10) ? ("0" + ss.toString()) : ss.toString();
        var startDate = year + "-" + month + "-" + day + " " + hour + ":" + Minute; //+ ":" + Second;
        var form_date = new Date(startDate);
        return form_date.toLocaleString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true });
    }
    catch (e) {
        return DateFormat(new Date().toString());
    }
}
function ConvertToDate(date) {
    try {
        var x = date.split(" ");
        var dt = x[0].split("/");
        var tm = x[1].split(":");
        var st = x[2];
        var day = dt[0];
        var month = dt[1];
        var year = dt[2];
        var hour = tm[0];
        //  if (st == "PM") {
        //    hour = (Number(tm[0]) + 12).toString();
        //    }
        var Minute = tm[1];
        var Second = tm[2];
        var startDate = year + "-" + month + "-" + day + "T" + hour + ":" + Minute + ":" + Second;
        //let form_date = new Date(year, month, day, hour, Minute, Second);
        var form_date = new Date(startDate);
        return form_date;
    }
    catch (e) {
        return (new Date());
    }
}
function TimeFormat(dateForm) {
    try {
        var date = new Date();
        var myDate = "";
        if (dateForm.indexOf("Date(") > -1) {
            myDate = dateForm.split('(')[1].split(')')[0];
            date = new Date(Number(myDate));
        }
        else {
            date = new Date(dateForm);
        }
        var hh = (date.getHours());
        var mn = (date.getMinutes());
        var ss = (date.getSeconds());
        var hour = (hh < 10) ? ("0" + hh.toString()) : hh.toString();
        var Minute = (mn < 10) ? ("0" + mn.toString()) : mn.toString();
        var Second = (ss < 10) ? ("0" + ss.toString()) : ss.toString();
        var startDate = hour + ":" + Minute + ":" + Second;
        var form_date = startDate;
        return form_date;
    }
    catch (e) {
        return;
    }
}
function ClearGrid(_Grid, arr) {
    if (_Grid === void 0) { _Grid = new JsGrid(); }
    arr = new Array();
    _Grid.DataSource = arr;
    _Grid.Bind();
}
function GetDescription(tableName, condition) {
    var opt = {
        url: Url.Action("GetDescription", "ClientTools"),
        data: { tableName: tableName.name, condition: condition }
    };
    var desc = Ajax.Call(opt);
    return desc;
}
//
function Numeric(value) {
    var result = 0;
    if (!isNaN(value)) {
        var strValue = value.toFixed(2);
        result = Number(strValue); // value;
    }
    return result;
}
function Fixed(value) {
    return Number(value.toFixed(2));
}
function ChangeBranch() {
    var ddlBrachs = DocumentActions.GetElementById("ddlBrachs");
    SharedSession.CurrentEnvironment.BranchCode = ddlBrachs.value;
    console.log(SharedSession.CurrentEnvironment.BranchCode);
}
function EnableBranchSelected() {
    var ddlBrachs = DocumentActions.GetElementById("ddlBrachs");
    ddlBrachs.removeAttribute("disabled");
}
function GetBranchs() {
    var ddlBrachs = DocumentActions.GetElementById("ddlBrachs");
    $.ajax({
        url: Url.Action("GetBranchsByUserCode", "ClientTools"),
        data: { userCode: SharedSession.CurrentEnvironment.UserCode },
        success: function (response) {
            var result = response.result;
            DocumentActions.FillCombo(result, ddlBrachs, "BRA_CODE", "BRA_DESCL");
        }
    });
}
function InitalizeLayout() {
    ControlsButtons.ModuleEffects();
}
function GetParameterByName(name) {
    var url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
    if (!results)
        return null;
    if (!results[2])
        return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
function ChangePassword(OldPassword, NewPassword) {
    $.ajax({
        url: Url.Action("ChangePassword", "ClientTools"),
        data: { OldPassword: OldPassword, NewPassword: NewPassword },
        success: function (response) {
            var result = response.result;
            if (result == true) {
                alert("Password changed");
            }
            else {
                alert("Changing password failed");
            }
        }
    });
}
function CloseSearchBox() {
    $("#SearchBox").modal("hide"); //.css("display", "none");
}
function run_waitMe() {
    //$('body').waitMe({
    //    effect: "win8",
    //    text: 'Please wait...',
    //    bg: 'rgba(255,255,255,0.7)',
    //    color: '#000',
    //    sizeW: '',
    //    sizeH: ''
    //});
}
function HeaderTemplate(headerTitle, element) {
    var tbl = DocumentActions.CreateElement("table");
    tbl.style.width = "100%";
    var headerTr = DocumentActions.CreateElement("tr");
    headerTr.innerHTML = "<td style='text-align:center;'>" + Language.GetValueByKey(headerTitle) + "</td>";
    var cellTr = DocumentActions.CreateElement("tr");
    var cell = DocumentActions.CreateElement("td");
    cell.style.textAlign = "center";
    //let element = elementFunc(rowItem);
    cell.appendChild(element);
    cellTr.appendChild(cell);
    tbl.appendChild(headerTr);
    tbl.appendChild(cellTr);
    return tbl;
}
function HeaderTemplateNew(headerTitle, element) {
    var tbl = DocumentActions.CreateElement("table");
    tbl.style.width = "100%";
    var headerTr = DocumentActions.CreateElement("tr");
    headerTr.innerHTML = "<td style='text-align:center;'>" + headerTitle + "</td>";
    var cellTr = DocumentActions.CreateElement("tr");
    var cell = DocumentActions.CreateElement("td");
    cell.style.textAlign = "center";
    //let element = elementFunc(rowItem);
    cell.appendChild(element);
    cellTr.appendChild(cell);
    tbl.appendChild(headerTr);
    tbl.appendChild(cellTr);
    return tbl;
}
function CreateElement(typeElement, className, defaultValue, minValue, id, step) {
    typeElement = typeElement.toLocaleLowerCase();
    var element = DocumentActions.CreateElement("input");
    element.className = className;
    element.id = "h_" + id;
    element.type = typeElement;
    element.value = defaultValue;
    element.min = minValue;
    element.step = step;
    return element;
}
function InitaizeDropdownList(arr, Name_Ar, Name_En, Key, id, IsSelectNull) {
    var element = document.getElementById(id);
    for (var i = element.options.length - 1; i >= 0; i--) {
        element.remove(i);
    }
    if (IsSelectNull == true)
        element.options.add(new Option(" ", "null"));
    switch (SharedSession.CurrentEnvironment.Language) {
        case "ar":
            for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
                var item = arr_1[_i];
                element.options.add(new Option(item[Name_Ar], item[Key]));
            }
            break;
        case "en":
            for (var _a = 0, arr_2 = arr; _a < arr_2.length; _a++) {
                var item = arr_2[_a];
                element.options.add(new Option(item[Name_En], item[Key]));
            }
            break;
    }
}
function CreateDropdownList(arr, Name_Ar, Name_En, Key, IsSelectNull) {
    if (IsSelectNull === void 0) { IsSelectNull = false; }
    var element = document.createElement("select");
    element.className = "form-control input-sm";
    if (IsSelectNull == true)
        element.options.add(new Option(" ", "null"));
    switch (SharedSession.CurrentEnvironment.Language) {
        case "ar":
            for (var _i = 0, arr_3 = arr; _i < arr_3.length; _i++) {
                var item = arr_3[_i];
                element.options.add(new Option(item[Name_Ar], item[Key]));
            }
            break;
        case "en":
            for (var _a = 0, arr_4 = arr; _a < arr_4.length; _a++) {
                var item = arr_4[_a];
                element.options.add(new Option(item[Name_En], item[Key]));
            }
            break;
    }
    return element;
}
///DropdownListFilter
function CreateDropdownListFilter(arr, Name_Ar, Name_En, Key, ElementId) {
    var HtmlInput = "<input id='txt" + ElementId + "' list='" + ElementId + "' name= '" + ElementId + "s' style='width: 100%;'> ";
    var HtmldatalistStart = " <datalist id='" + ElementId + "'> ";
    var HtmlOption = "";
    for (var _i = 0, arr_5 = arr; _i < arr_5.length; _i++) {
        var item = arr_5[_i];
        var ElementOption = "";
        ElementOption = " <option value='" + item[Key] + "' >" + item[Name_Ar] + " </option> ";
        HtmlOption += ElementOption;
    }
    var HtmldatalistEnd = " </datalist>";
    var HtmlString = HtmlInput + HtmldatalistStart + HtmlOption + HtmldatalistEnd;
    return HtmlString;
}
function ReturnDropdownListFilter(headerTitle, element) {
    var tbl = DocumentActions.CreateElement("table");
    tbl.style.width = "100%";
    var headerTr = DocumentActions.CreateElement("tr");
    headerTr.innerHTML = "<td style='text-align:center;'>" + Language.GetValueByKey(headerTitle) + "</td>";
    var cellTr = DocumentActions.CreateElement("tr");
    var cell = DocumentActions.CreateElement("td");
    cell.style.textAlign = "center";
    cell.innerHTML = element;
    cellTr.appendChild(cell);
    tbl.appendChild(headerTr);
    tbl.appendChild(cellTr);
    return tbl;
}
function InitaizeDropdownListFilter(arr, Name_Ar, Name_En, Key, ElementId) {
    var element = document.getElementById(ElementId);
    $('#' + ElementId).empty();
    for (var _i = 0, arr_6 = arr; _i < arr_6.length; _i++) {
        var item = arr_6[_i];
        var option = document.createElement("option");
        option.value = item[Key];
        option.text = SharedSession.CurrentEnvironment.ScreenLanguage == "ar" ? item[Name_Ar] : item[Name_En];
        element.appendChild(option);
    }
}
function CreateListYesOrNo() {
    var offDay = [
        {
            Name_Ar: "نعم",
            Name_En: "Yes",
            Id: true
        },
        {
            Name_Ar: "لا",
            Name_En: "No",
            Id: false
        },
    ];
    var element = document.createElement("select");
    element.className = "form-control input-sm";
    switch (ClientSharedWork.Session.Language) {
        case "ar":
            for (var _i = 0, offDay_1 = offDay; _i < offDay_1.length; _i++) {
                var item = offDay_1[_i];
                element.options.add(new Option(item.Name_Ar, item.Id.toString()));
            }
            break;
        case "en":
            for (var _a = 0, offDay_2 = offDay; _a < offDay_2.length; _a++) {
                var item = offDay_2[_a];
                element.options.add(new Option(item.Name_En, item.Id.toString()));
            }
            break;
    }
    return element;
}
////End DropdownListFilter
function SetSearchControlName(id) {
    $("#SearchControlName").val(id);
}
function AddDate(prd, Sdate, count) {
    var Tdate;
    Tdate = Sdate; //new Date();
    switch (prd) {
        case 1: //hours
            Tdate.setHours(Sdate.getHours() + count);
            //Tdate.setTime(Sdate.getTime() + (1000 * 60 * 60 * count));
            //Tdate = Dateadd(h, Sdate, Qty * PeriodCount);
            //Tdate = Dateadd(m, Tdate,-1);
            break;
        case 2: //Days
            Tdate.setDate(Sdate.getDate() + (count - 1));
            break;
        case 3: //week
            Tdate.setDate(Sdate.getDate() + ((7 * count) - 1));
            break;
        case 4: //month
            // Loop from cur month with Qty * Prd times 
            Tdate = Sdate;
            Tdate.setMonth(Tdate.getMonth() + count);
            Tdate.setDate(Tdate.getDate() + -1);
            break;
        case 5: //year
            // add 365 or 366 days 
            Tdate = Sdate;
            Tdate.setFullYear(Tdate.getFullYear() + count);
            Tdate.setDate(Tdate.getDate() + -1);
            break;
    }
    return Tdate;
}
function GetResourceByName(Sourcekey) {
    var result = "";
    Ajax.Callsync({
        url: Url.Action("GetResourceByName", "ClientTools"),
        data: { key: Sourcekey },
        success: function (d) {
            result = d.result;
        }
    });
    return result;
}
function GetResourceList(Sourcekey) {
    var result = Ajax.Call({
        url: Url.Action("GetResourceNames", "ClientTools"),
        data: { _prefix: Sourcekey },
        success: function (d) {
            result = JSON.parse(d.result);
        }
    });
    return result;
}
// Function To Check Date
function CheckDate(comCode, braCode, date) {
    var res = false;
    var newDate = date.replace(/[-]/g, "");
    if (isNaN(Number(newDate.toString()))) {
        WorningMessage("خطأ في التاريخ - لايمكن الحفظ ", "Error in Date , Can not Save");
        res = false;
    }
    else {
        res = Ajax.Call({ url: Url.Action("chechDate", "ClientTools"), data: { comCode: comCode, braCode: braCode, date: date } });
    }
    return res;
}
//End Global Functions
function GetURLForUI() {
    debugger;
    var result = "";
    result = Ajax.Call({ url: Url.Action("GetURLForUI", "ClientTools") });
    return result;
}
function GetSessionRecord() {
    debugger;
    var result;
    result = Ajax.Call({ url: Url.Action("GetSessionRecord", "Session") });
    return result;
}
var outUesr = 0;
function CheckTime() {
    var sys = new SystemTools();
    try {
        var CheckLogin = document.getElementById('btnLogin');
        if (CheckLogin != null) {
            return;
        }
        var CheckUesr = SharedSession.CurrentEnvironment.UserCode;
    }
    catch (e) {
        outUesr += 1;
        if (outUesr == 2) {
            localStorage.setItem("OutUesr", "1");
            window.open(Url.Action("LoginIndex", "Login"), "_self");
        }
        return;
    }
}
function Save_Succ_But() {
    $('#dir_11').removeClass('display_none');
    $('#btnPrintTransaction').removeClass('display_none');
    $('#btnUpdate').removeClass('display_none');
    $('#btnBack').addClass('display_none');
    $('#btnSave').addClass('display_none');
    $("#footer_2").animate({ "left": "-85%", });
    $("#dir").fadeIn(3000);
    $('#btnPrintslip').removeClass('display_none');
    $('#btnPrintTransaction').removeClass('display_none');
    $("#NewAdd_Falg").val('0');
    $('#btnUpdate_Def').removeClass('display_none');
    $('#btnBack_Def').addClass('display_none');
    $('#btnSave_Def').addClass('display_none');
    $('.button').removeClass('button--loading');
    $('#btnSave_Def').removeClass('button--loading');
    $('#save_Load').html('');
    $('#save_Load').append('<span class=" glyphicon glyphicon-floppy-saved">   حفظ  </span>');
    $('#save_Load_Def').html('');
    $('#save_Load_Def').append('<span class=" glyphicon glyphicon-floppy-saved">   حفظ  </span>');
    $('#btnSave_Def').removeAttr('disabled');
    $('#btnSave').removeAttr('disabled');
}
function Errorinput(input) {
    if (input.selector != null) {
        $('' + input.selector + '').addClass('text_Mandatory');
        $('' + input.selector + '').focus();
        setTimeout(function () { $('' + input.selector + '').removeClass('text_Mandatory'); }, 5000);
    }
    else {
        input.classList.add('text_Mandatory');
        input.focus();
        setTimeout(function () { input.classList.remove('text_Mandatory'); }, 5000);
    }
}
function loading(NameBtn) {
    $('#' + NameBtn + '').attr('disabled', 'disabled');
}
function Save_Succ_But() {
    $('#dir_11').removeClass('display_none');
    $('#btnPrintTransaction').removeClass('display_none');
    $('#btnUpdate').removeClass('display_none');
    $('#btnBack').addClass('display_none');
    $('#btnSave').addClass('display_none');
    $("#footer_2").animate({ "left": "-85%", });
    $("#dir").fadeIn(3000);
    $('#btnPrintslip').removeClass('display_none');
    $('#btnPrintTransaction').removeClass('display_none');
    $("#NewAdd_Falg").val('0');
    $('#btnUpdate_Def').removeClass('display_none');
    $('#btnBack_Def').addClass('display_none');
    $('#btnSave_Def').addClass('display_none');
    $('.button').removeClass('button--loading');
    $('#btnSave_Def').removeClass('button--loading');
    $('#save_Load').html('');
    $('#save_Load').append('<span class=" glyphicon glyphicon-floppy-saved">   حفظ  </span>');
    $('#save_Load_Def').html('');
    $('#save_Load_Def').append('<span class=" glyphicon glyphicon-floppy-saved">   حفظ  </span>');
    $('#btnSave_Def').removeAttr('disabled');
    $('#btnSave').removeAttr('disabled');
}
//# sourceMappingURL=App.js.map