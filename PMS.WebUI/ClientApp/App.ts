
enum ScreenModes {
    Query, Add, Edit, Start, DisableMenu
}
const JsGridHeaderCenter: string = "JsGridHeaderCenter";
const JsGridHeaderRight: string = "JsGridHeaderRight";
const JsGridHeaderLeft: string = "JsGridHeaderLeft";
const TransparentButton: string = "TransparentButton";
var RequiredClassName = " required";
var RequiredElements: Array<HTMLElement> = new Array<HTMLElement>();
var exchangeElements: Array<HTMLInputElement> = new Array<HTMLInputElement>();

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
    BillingList:"BillingList",
    SalesmanActivity: "SalesmanActivity",
    ProductionVsBilling: "ProductionVsBilling",
    SalesPaymentTerms: "SalesPaymentTerms",
    itemSalesAc: "itemSalesAc",
    SlsOff: "SlsOff",
    itmSearch: "itmSearch",
    laborSrch: "laborSrch",
    EquSearch: "EquSearch",
    ProjItemsInventory:"ProjItemsInventory",
    CRMReport:"CRMReport",
    TaxInvoicelist:"TaxInvoicelist",
    CustomerDbCr:"CustomerDbCr",
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
var SearchModulesNames = {

};

//var Url = {
//    Action: (actionName: string, controllerName: string) => (
//        location.origin + "/" + controllerName + "/" + actionName
//    )
//};

var Url = {
    Action: (actionName: string, controllerName: string) => ($.ajax({
        url: $("#GetActionUrl").val(),
        async: false,
        data: { actionName: actionName, controllerName: controllerName }
    }).responseJSON).result as string
};

var Ajax = {
    Call: <T>(settings: JQueryAjaxSettings): T => {
        try {
            let json = $.ajax({
                url: settings.url,
                data: settings.data,
                cache: false,
                async: false
            }).responseJSON;
            let result = json.result as T;
            return result;
        } catch (e) {
            $(".waitMe").removeAttr("style").fadeOut(200);
            return null;
        }
    },
    CallAsync: <T>(settings: JQueryAjaxSettings) => {
        run_waitMe();
        $.ajax({
            url: settings.url,
            data: settings.data,
            cache: false,
            success: (d) => {
                settings.success(d, "", null);
                $(".waitMe").removeAttr("style").fadeOut(200);
            },
            error: () => { $(".waitMe").removeAttr("style").fadeOut(200); }
        })
    },
    Callsync: <T>(settings: JQueryAjaxSettings) => {
        run_waitMe();
        $.ajax({
            url: settings.url,
            data: settings.data,
            cache: false,
            async: false,
            success: (d) => {
                settings.success(d, "", null);
                $(".waitMe").removeAttr("style").fadeOut(200);
            },
            error: () => { $(".waitMe").removeAttr("style").fadeOut(200); }
        })
    }
};
var AjaxApi = {
    CallApi: <T>(settings: JQueryAjaxSettings): T => {
        try {
            let json = $.ajax({
                type: settings.type,
                url: settings.url,
                data: settings.data,
                cache: false,
                async: false
            }).responseJSON;
            let result = json.result as T;
            return result;
        } catch (e) {
            $(".waitMe").removeAttr("style").fadeOut(200);
            return null;
        }
    },
    CallAsyncApi: <T>(settings: JQueryAjaxSettings) => {
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
            success: (d) => {
                settings.success(d, "", null);
                $(".waitMe").removeAttr("style").fadeOut(200);
            },
            error: () => { $(".waitMe").removeAttr("style").fadeOut(200); }
        })
    },
    CallsyncApi: <T>(settings: JQueryAjaxSettings) => {
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
            success: (d) => {
                settings.success(d, "", null);
                $(".waitMe").removeAttr("style").fadeOut(2500);
            },
            error: () => { $(".waitMe").removeAttr("style").fadeOut(2500); }
        })
    }
};
var DocumentActions = {
    SetRequiredElements: (...elements: Array<HTMLElement>): void => {
        RequiredElements = new Array<HTMLElement>();
        for (var element of elements) {
            RequiredElements.push(element);
        }
    },
    SetExchangeElements: (ArElement: HTMLInputElement, EnElement: HTMLInputElement) => {
        exchangeElements = new Array<HTMLInputElement>();
        exchangeElements.push(ArElement);
        exchangeElements.push(EnElement);
    },
    ValidateRequired: (): boolean => {
        let bools: Array<boolean> = new Array<boolean>();
        let elements = RequiredElements;
        for (var element of elements) {
            switch (element.tagName.toUpperCase()) {
                case "INPUT":
                    if ((element as HTMLInputElement).type == "check") {
                        if ((element as HTMLInputElement).checked == false) {
                            bools.push(false);
                            element.style.borderColor = "red";
                        }
                        else {
                            bools.push(true);
                            element.style.borderColor = "";
                        }
                    }
                    else {
                        if ((element as HTMLInputElement).value == "") {
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
                    if ((element as HTMLSelectElement).value == "") {
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
        let count = bools.filter(f => f == false).length;
        if (count > 0)
            return false;
        else
            return true;
    },
    RenderFromModel: (dataSource: any): void => {
        try {
            let properties = Object.getOwnPropertyNames(dataSource);
            for (var property of properties) {
                let element = document.getElementsByName(property)[0] as HTMLInputElement;
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
                    let value = String(dataSource[property]).toString();
                    if (value != null)
                        element.value = value;
                    else
                        element.value = "";
                    continue;
                }
                if (dataSource[property] == null) {
                    try {
                        element.value = dataSource[property]
                    } catch (e) {

                    }
                    finally {
                        continue;
                    }

                }
                if (element.type == "checkbox")
                    element.checked = <boolean>(dataSource[property]);
                else if (element.type == "date") {
                    element.value = DateFormat(dataSource[property]);
                }
                else
                    element.value = dataSource[property];
            }
        } catch (e) {

        }
    },
    AssignToModel: <T>(model: T): T => {
        let properties = Object.getOwnPropertyNames(model);
        for (var property of properties) {
            if (property == "UpdatedAt" || property == "CreatedAt" || property == "CreatedBy" || property == "UpdatedBy") {
                continue;
            }
            let element = document.getElementsByName(property)[0] as HTMLInputElement;
            if (element != null) {
                if (element.type == "checkbox")
                    model[property] = element.checked;
                else
                    model[property] = element.value;
            }
        }
        return model;
    },
    FillCombo: (dataSource: Array<any>, combo: HTMLSelectElement, codeField: any, textField: any) => {
        if (combo != null) {
            for (let i: number = combo.length; i >= 0; i--) {
                combo.remove(i);
            }
            for (let i: number = 0; i < dataSource.length; i++) {
                let code = dataSource[i][codeField];
                let name = dataSource[i][textField];
                combo.add(new Option(name, code));
            }
        }

    },
    FillComboWithEmpty: (dataSource: Array<any>, combo: HTMLSelectElement, codeField: any, textField: any) => {
        for (let i: number = combo.length; i >= 0; i--) {
            combo.remove(i);
        }
        combo.add(new Option("", ""));
        for (let i: number = 0; i < dataSource.length; i++) {
            let code = dataSource[i][codeField];
            let name = dataSource[i][textField];
            combo.add(new Option(name, code));
        }
    },
    GetElementById: <T extends HTMLElement>(id: string): T => {
        let element: T = document.getElementById(id) as T;
        return element;
    },
    CreateElement: <T extends HTMLElement>(id: string) => {
        let element: T = document.createElement(id) as T;
        return element;
    },
    SwitchLanguage: () => {
        return;
    }
};
var DescByCode = {
    I_D_Category: (code: string): string => {
        return ClientSharedWork.GetDescByCode("I_D_Category", code);
    },
    I_D_UnitGroup: (code: string): string => {
        return ClientSharedWork.GetDescByCode("I_D_UnitGroup", code);
    }
};
var Language = {
    GetValueByKey: (key: string): string => {
        let result = Ajax.Call<string>({
            url: Url.Action("GetResourceByName", "ClientTools"),
            data: { key: key }
        });
        return result;
    }
};

//Start Interface
interface JQuery {
    igGrid: any;
    igGridPaging: any;
    jsGrid: any;
    modal: any;
    waitMe: any;
    igGridFiltering: any;
    DataTable?: any;
    dataTable?: any;
}
interface JQueryStatic {
    event: any;
}
interface IIgGridColumn {
    key?: string;
    dataType?: string;
    headerText?: string;
    width?: string;
    template?: string;
    hidden?: boolean;
    filterable?: boolean;
}
interface datatableColumn {
    key?: string;
    dataType?: any;
    headerText?: string;
    width?: string;
    hidden?: boolean;
    data?: any;
    visible?: boolean;
    name?: string;
    title?: string;
}
interface IJsGridColumn {
    name?: string;
    nameDesc?: string;
    type?: string;
    title?: string;
    width?: string;
    validate?: string;
    id?: string;

    items?: any;
    valueField?: string;
    textField?: string;

    itemTemplate?: any;
    editTemplate?: any;
    insertTemplate?: any;
    headerTemplate?: any;

    css?: string;
    visible?: boolean;
    deleteButton?: boolean;
    cellRenderer?: any;
}
//End Interface

namespace App {
    let branchCodeSelected: string = "";
    var LanguageButton: HTMLAnchorElement;

    export function Startup() {
        SharedSession.CurrentEnvironment = GetSystemEnvironment();
        try {
            let SpanUserName: HTMLSpanElement = DocumentActions.GetElementById<HTMLSpanElement>("SpanUserName");
            SpanUserName.innerText = SharedSession.CurrentEnvironment.UserCode;
            SpanUserName.style.display = "block";
            SpanUserName.onclick = GetBranchs;
        } catch (e) {

        }

        var btnEditUserBranchs: HTMLButtonElement;
        try {
            btnEditUserBranchs = DocumentActions.GetElementById<HTMLButtonElement>("btnEditUserBranchs");
            btnEditUserBranchs.onclick = EnableBranchSelected;
        } catch (e) {

        }

        var btnChangeBranch: HTMLButtonElement;
        try {
            btnChangeBranch = DocumentActions.GetElementById<HTMLButtonElement>("btnChangeBranch");
            btnChangeBranch.onclick = ChangeBranch;
        } catch (e) {

        }

        AssignLoginInformation();
        try {
            LanguageButton = DocumentActions.GetElementById<HTMLAnchorElement>("LanguageButton");
            LanguageButton.onclick = LanguageButton_Click;
        } catch (e) {

        }

        try {
            DocumentActions.GetElementById<HTMLInputElement>("btnChangePassword").onclick = () => {
                let oldPassword: string = DocumentActions.GetElementById<HTMLInputElement>("txtOldPassword").value;
                let newPassword: string = DocumentActions.GetElementById<HTMLInputElement>("txtNewPassword").value;
                ChangePassword(oldPassword, newPassword);
            };
        } catch (e) {

        }
        try {
            DocumentActions.GetElementById<HTMLSpanElement>("spnFav").onclick = () => {
                let sys: SystemTools = new SystemTools();
                sys.SwitchUserFavorite();
            };
        } catch (e) {

        }
        AssignLoginInformation();
    }
    export function AssignLoginInformation() {

        if (DocumentActions.GetElementById<HTMLSpanElement>("infoSysName") != null)
            DocumentActions.GetElementById<HTMLSpanElement>("infoSysName").innerText = SharedSession.CurrentEnvironment.SystemCode;

        if (DocumentActions.GetElementById<HTMLSpanElement>("infoSubSysName") != null)
            DocumentActions.GetElementById<HTMLSpanElement>("infoSubSysName").innerText = SharedSession.CurrentEnvironment.SubSystemCode;

        if (DocumentActions.GetElementById<HTMLSpanElement>("infoCompanyName") != null) {
            if (SharedSession.CurrentEnvironment.ScreenLanguage == "ar")
                DocumentActions.GetElementById<HTMLSpanElement>("infoCompanyName").innerText = SharedSession.CurrentEnvironment.CompanyNameAr;
            else
                DocumentActions.GetElementById<HTMLSpanElement>("infoCompanyName").innerText = SharedSession.CurrentEnvironment.CompanyName;
        }

        if (DocumentActions.GetElementById<HTMLSpanElement>("infoCurrentYear") != null)
            DocumentActions.GetElementById<HTMLSpanElement>("infoCurrentYear").innerText = SharedSession.CurrentEnvironment.CurrentYear;

        if (DocumentActions.GetElementById<HTMLSpanElement>("infoUserCode") != null)
            DocumentActions.GetElementById<HTMLSpanElement>("infoUserCode").innerText = SharedSession.CurrentEnvironment.UserCode;
    }
    function LanguageButton_Click() {
        debugger
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
            success: (response) => { }
        });

        $(".language").css("display", "none");
        $("." + SharedSession.CurrentEnvironment.ScreenLanguage).css("display", "");
    }
    function AppendStyleSheet(fileName: string) {
        var lnk = document.createElement('link');
        lnk.href = "../css/" + fileName + ".css";
        lnk.rel = 'stylesheet';
        lnk.type = 'text/css';
        var $head = $("head");
        var $headlinklast = $head.find("link[rel='stylesheet']:first");
        $headlinklast.after(lnk);
    }
    function RemoveStyleSheet(fileName: string) {
        let href = "../css/" + fileName + ".css";
        $("link[rel=stylesheet][href~='" + href + "']").remove();
    }
}

//Start Global Functions
function IsNullOrEmpty(value: string): boolean {
    if (value == null || value == "")
        return true;
    else
        return false;
}
function Sum(_Array: any, _Field: string): number {
    let _Result: number = 0;
    for (var item of _Array) {
        _Result += item[_Field];
    }
    return _Result;
}
//Start Services Navigate And Index
function GetIndexByUseId(idValue: Number, BaseTableName: string, idFieldName: string, condation?: string): string {
    let result = "";
    if (IsNullOrEmpty(idValue.toString()) || IsNullOrEmpty(BaseTableName) || IsNullOrEmpty(idFieldName)) {
        return result;
    } else {
        let result = Ajax.Call<string>({
            url: Url.Action("GetIndexByUseId", "ClientTools"),
            data: { idValue: idValue.toString(), BaseTableName: BaseTableName, idFieldName: idFieldName, condation: condation }
        });
        return result;
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
function GetIndexByUseCode(idValue: string, BaseTableName: string, idFieldName: string, condation?: string): string {
    let result = "";
    if (IsNullOrEmpty(idValue.toString()) || IsNullOrEmpty(BaseTableName) || IsNullOrEmpty(idFieldName)) {
        return result;
    } else {
        debugger;
        let result = Ajax.Call<string>({
            url: Url.Action("GetIndexByUseCode", "ClientTools"),
            data: { idValue: idValue.toString(), BaseTableName: BaseTableName, idFieldName: idFieldName, condation: condation }
        });
        return result;
    }
}

function NavigateToSearchResult(Navigate: () => void) {
    CloseSearchBox();
    let index = ClientSharedWork.SearchDataGrid.SelectedKey;
    ClientSharedWork.PageIndex = Number(index);
    Navigate();
    ClientSharedWork.Render();
}
function NavigateToSearchResultKey(IndexNo: number, Navigate: () => void) {
    CloseSearchBox();
    ClientSharedWork.PageIndex = IndexNo;
    Navigate();
    ClientSharedWork.Render();
}
//End Services Navigate And Index
//Start Services MessagBox
function ReturnMsg(msg_Ar: string, msg_En: string): string {
    let _Result = "";
    switch (SharedSession.CurrentEnvironment.ScreenLanguage) {
        case "ar":
            _Result = msg_Ar
            break;
        case "en":
            _Result = msg_En
            break;
    }
    return _Result;
}
function WorningMessage(msg_Ar: string, msg_En: string, tit_ar: string = "تنبيه", tit_en: string = "worning", OnOk?: () => void) {
    switch (SharedSession.CurrentEnvironment.ScreenLanguage) {
        case "ar":
            MessageBox.Show(msg_Ar, tit_ar, OnOk);
            break;
        case "en":
            MessageBox.Show(msg_En, tit_en, OnOk);
            break;
    }
}
function ConfirmMessage(msg_Ar: string = "تمت عملية الحفظ  بنجاح", msg_En: string = "Data Saved Successfully", tit_ar: string = "تأكيد", tit_en: string = "Confirm", OnOk?: () => void) {
    switch (SharedSession.CurrentEnvironment.ScreenLanguage) {
        case "ar":
            MessageBox.Show(msg_Ar, tit_ar, OnOk);
            break;
        case "en":
            MessageBox.Show(msg_En, tit_en, OnOk);
            break;
    }
}
function WorningMessageDailog(msg_Ar: string, msg_En: string, tit_ar: string = "تنبيه", tit_en: string = "worning", OnOk?: () => void, OnCancel?: () => void) {
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
function GetCurrentDate(): Date {
    let PControl = SharedSession.CurrentEnvironment.P_Control;
    var now = new Date;
    var utc = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds());
    //utc.setHours(utc.getHours() + PControl.UserTimeZoneUTCDiff);
    return utc;
}
function DateFormat(dateForm: string): string {
    try {
        var date: Date = new Date();
        let myDate: string = "";
        if (dateForm.indexOf("Date(") > -1) {
            myDate = dateForm.split('(')[1].split(')')[0];
            date = new Date(Number(myDate));
        }
        else {
            date = new Date(dateForm);
        }


        let yy = date.getFullYear();
        let mm = (date.getMonth() + 1);
        let dd = date.getDate();

        let year = yy;
        let month = (mm < 10) ? ("0" + mm.toString()) : mm.toString();
        let day = (dd < 10) ? ("0" + dd.toString()) : dd.toString();

        //The specified value "'2018-01-15'" does not conform to the required format, "yyyy-MM-dd".
        var startDate = year + "-" + month + "-" + day;
        let form_date = startDate;
        return form_date;
    } catch (e) {
        return DateFormat(new Date().toString());
    }
}
function DateTimeFormat(dateForm: string): string {
    try {

        var date: Date = new Date();
        let myDate: string = "";
        if (dateForm.indexOf("Date(") > -1) {
            myDate = dateForm.split('(')[1].split(')')[0];
            date = new Date(Number(myDate));
        }
        else {
            date = new Date(dateForm);
        }


        let yy = date.getFullYear();
        let mm = (date.getMonth() + 1);
        let dd = date.getDate();

        let hh = (date.getHours());
        let mn = (date.getMinutes());
        let ss = (date.getSeconds());

        let year = yy;
        let month = (mm < 10) ? ("0" + mm.toString()) : mm.toString();
        let day = (dd < 10) ? ("0" + dd.toString()) : dd.toString();
        let hour = (hh < 10) ? ("0" + hh.toString()) : hh.toString();
        let Minute = (mn < 10) ? ("0" + mn.toString()) : mn.toString();
        let Second = (ss < 10) ? ("0" + ss.toString()) : ss.toString();


        var startDate = year + "-" + month + "-" + day + "T" + hour + ":" + Minute; //+ ":" + Second;
        let form_date = startDate;
        return form_date;
    } catch (e) {
        return DateFormat(new Date().toString());
    }
}

function DateTimeFormatWithoutT(dateForm: string): string {
    try {

        var date: Date = new Date();
        let myDate: string = "";
        if (dateForm.indexOf("Date(") > -1) {
            myDate = dateForm.split('(')[1].split(')')[0];
            date = new Date(Number(myDate));
        }
        else {
            date = new Date(dateForm);
        }


        let yy = date.getFullYear();
        let mm = (date.getMonth() + 1);
        let dd = date.getDate();

        let hh = (date.getHours());
        let mn = (date.getMinutes());
        let ss = (date.getSeconds());

        let year = yy;
        let month = (mm < 10) ? ("0" + mm.toString()) : mm.toString();
        let day = (dd < 10) ? ("0" + dd.toString()) : dd.toString();
        let hour = (hh < 10) ? ("0" + hh.toString()) : hh.toString();
        let Minute = (mn < 10) ? ("0" + mn.toString()) : mn.toString();
        let Second = (ss < 10) ? ("0" + ss.toString()) : ss.toString();


        var startDate = year + "-" + month + "-" + day + " " + hour + ":" + Minute; //+ ":" + Second;
        let form_date = new Date(startDate);
        return form_date.toLocaleString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true });
    } catch (e) {
        return DateFormat(new Date().toString());
    }
}

function ConvertToDate(date: string): Date {
    try {

        let x = date.split(" ");
        let dt = x[0].split("/");
        let tm = x[1].split(":");
        let st = x[2];


        let day = dt[0];
        let month = dt[1];
        let year = dt[2];

        var hour = tm[0];

        //  if (st == "PM") {
        //    hour = (Number(tm[0]) + 12).toString();
        //    }

        let Minute = tm[1];
        let Second = tm[2];


        var startDate = year + "-" + month + "-" + day + "T" + hour + ":" + Minute + ":" + Second;
        //let form_date = new Date(year, month, day, hour, Minute, Second);
        let form_date = new Date(startDate);
        return form_date;
    } catch (e) {
        return (new Date());
    }
}

function TimeFormat(dateForm: string): string {
    try {
        var date: Date = new Date();
        let myDate: string = "";
        if (dateForm.indexOf("Date(") > -1) {
            myDate = dateForm.split('(')[1].split(')')[0];
            date = new Date(Number(myDate));
        }
        else {
            date = new Date(dateForm);
        }

        let hh = (date.getHours());
        let mn = (date.getMinutes());
        let ss = (date.getSeconds());

        let hour = (hh < 10) ? ("0" + hh.toString()) : hh.toString();
        let Minute = (mn < 10) ? ("0" + mn.toString()) : mn.toString();
        let Second = (ss < 10) ? ("0" + ss.toString()) : ss.toString();

        var startDate = hour + ":" + Minute + ":" + Second;
        let form_date = startDate;
        return form_date;

    } catch (e) {
        return;
    }
}

function ClearGrid<T>(_Grid: JsGrid = new JsGrid(), arr: Array<T>) {
    arr = new Array();
    _Grid.DataSource = arr;
    _Grid.Bind();
}
function GetDescription(tableName: any, condition: string): CodeDesciptionModel {
    let opt: JQueryAjaxSettings = {
        url: Url.Action("GetDescription", "ClientTools"),
        data: { tableName: tableName.name, condition: condition }
    };
    let desc = Ajax.Call<CodeDesciptionModel>(opt);
    return desc;
}
//
function Numeric(value: number): number {
    let result: number = 0;
    if (!isNaN(value)) {
        let strValue = value.toFixed(2);
        result = Number(strValue);// value;
    }
    return result;
}
function Fixed(value: number): number {
    return Number(value.toFixed(2));
}
function ChangeBranch() {
    let ddlBrachs: HTMLSelectElement = DocumentActions.GetElementById<HTMLSelectElement>("ddlBrachs");
    SharedSession.CurrentEnvironment.BranchCode = ddlBrachs.value;

    console.log(SharedSession.CurrentEnvironment.BranchCode);
}
function EnableBranchSelected() {
    let ddlBrachs: HTMLSelectElement = DocumentActions.GetElementById<HTMLSelectElement>("ddlBrachs");
    ddlBrachs.removeAttribute("disabled");
}
function GetBranchs() {

    let ddlBrachs: HTMLSelectElement = DocumentActions.GetElementById<HTMLSelectElement>("ddlBrachs");
    $.ajax({
        url: Url.Action("GetBranchsByUserCode", "ClientTools"),
        data: { userCode: SharedSession.CurrentEnvironment.UserCode },
        success: (response) => {
            let result = response.result as Array<GQ_GetUserBranch>;
            DocumentActions.FillCombo(result, ddlBrachs, "BRA_CODE", "BRA_DESCL");
        }
    });
}
function InitalizeLayout() {
    ControlsButtons.ModuleEffects();
}
function GetParameterByName(name) {
    let url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
function ChangePassword(OldPassword: string, NewPassword: string) {
    $.ajax({
        url: Url.Action("ChangePassword", "ClientTools"),
        data: { OldPassword: OldPassword, NewPassword: NewPassword },
        success: (response) => {
            let result = response.result as boolean;
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
    $("#SearchBox").modal("hide");//.css("display", "none");
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
function HeaderTemplate(headerTitle: string, element: HTMLElement): HTMLTableElement {
    let tbl = DocumentActions.CreateElement<HTMLTableElement>("table");
    tbl.style.width = "100%";
    let headerTr = DocumentActions.CreateElement<HTMLTableRowElement>("tr");
    headerTr.innerHTML = "<td style='text-align:center;'>" + Language.GetValueByKey(headerTitle) + "</td>";

    let cellTr = DocumentActions.CreateElement<HTMLTableRowElement>("tr");
    let cell = DocumentActions.CreateElement<HTMLTableCellElement>("td");
    cell.style.textAlign = "center";
    //let element = elementFunc(rowItem);
    cell.appendChild(element);
    cellTr.appendChild(cell);

    tbl.appendChild(headerTr);
    tbl.appendChild(cellTr);

    return tbl;
}
function HeaderTemplateNew(headerTitle: string, element: HTMLElement): HTMLTableElement {
    let tbl = DocumentActions.CreateElement<HTMLTableElement>("table");
    tbl.style.width = "100%";
    let headerTr = DocumentActions.CreateElement<HTMLTableRowElement>("tr");
    headerTr.innerHTML = "<td style='text-align:center;'>" + headerTitle + "</td>";

    let cellTr = DocumentActions.CreateElement<HTMLTableRowElement>("tr");
    let cell = DocumentActions.CreateElement<HTMLTableCellElement>("td");
    cell.style.textAlign = "center";
    //let element = elementFunc(rowItem);
    cell.appendChild(element);
    cellTr.appendChild(cell);

    tbl.appendChild(headerTr);
    tbl.appendChild(cellTr);

    return tbl;
}
function CreateElement(typeElement: string, className: string, defaultValue: string, minValue: string, id: string, step: string): HTMLInputElement {
    typeElement = typeElement.toLocaleLowerCase();
    let element = DocumentActions.CreateElement<HTMLInputElement>("input");
    element.className = className;
    element.id = "h_" + id;
    element.type = typeElement;
    element.value = defaultValue;
    element.min = minValue;
    element.step = step;
    return element;
}

function InitaizeDropdownList<T>(arr: Array<T>, Name_Ar: string, Name_En: string, Key: string, id: string, IsSelectNull: Boolean) {
    let element = document.getElementById(id) as HTMLSelectElement;
    for (var i = element.options.length - 1; i >= 0; i--) {
        element.remove(i);
    }
    if (IsSelectNull == true)
        element.options.add(new Option(" ", "null"));
    switch (SharedSession.CurrentEnvironment.Language) {
        case "ar":
            for (var item of arr) {
                element.options.add(new Option(item[Name_Ar], item[Key]));
            }
            break;
        case "en":
            for (var item of arr) {
                element.options.add(new Option(item[Name_En], item[Key]));
            }
            break;
    }
}
function CreateDropdownList<T>(arr: Array<T>, Name_Ar: string, Name_En: string, Key: string, IsSelectNull: Boolean = false): HTMLSelectElement {
    let element = document.createElement("select") as HTMLSelectElement;
    element.className = "form-control input-sm";
    if (IsSelectNull == true)
        element.options.add(new Option(" ", "null"));
    switch (SharedSession.CurrentEnvironment.Language) {
        case "ar":
            for (var item of arr) {
                element.options.add(new Option(item[Name_Ar], item[Key]));
            }
            break;
        case "en":
            for (var item of arr) {
                element.options.add(new Option(item[Name_En], item[Key]));
            }
            break;
    }
    return element;
}

///DropdownListFilter
function CreateDropdownListFilter(arr: any, Name_Ar: string, Name_En: string, Key: string, ElementId: string): string {

    let HtmlInput: string = "<input id='txt" + ElementId + "' list='" + ElementId + "' name= '" + ElementId + "s' style='width: 100%;'> ";
    let HtmldatalistStart: string = " <datalist id='" + ElementId + "'> ";
    let HtmlOption: string = "";
    for (var item of arr) {
        let ElementOption: string = "";
        ElementOption = " <option value='" + item[Key] + "' >" + item[Name_Ar] + " </option> ";
        HtmlOption += ElementOption
    }
    let HtmldatalistEnd: string = " </datalist>";

    let HtmlString: string = HtmlInput + HtmldatalistStart + HtmlOption + HtmldatalistEnd;
    return HtmlString;
}
function ReturnDropdownListFilter(headerTitle: string, element: string): HTMLTableElement {

    let tbl = DocumentActions.CreateElement<HTMLTableElement>("table");
    tbl.style.width = "100%";
    let headerTr = DocumentActions.CreateElement<HTMLTableRowElement>("tr");
    headerTr.innerHTML = "<td style='text-align:center;'>" + Language.GetValueByKey(headerTitle) + "</td>";

    let cellTr = DocumentActions.CreateElement<HTMLTableRowElement>("tr");
    let cell = DocumentActions.CreateElement<HTMLTableCellElement>("td");
    cell.style.textAlign = "center";

    cell.innerHTML = element;

    cellTr.appendChild(cell);

    tbl.appendChild(headerTr);
    tbl.appendChild(cellTr);

    return tbl;
}
function InitaizeDropdownListFilter(arr: any, Name_Ar: string, Name_En: string, Key: string, ElementId: string) {
    let element = document.getElementById(ElementId) as HTMLSelectElement;
    $('#' + ElementId).empty();
    for (var item of arr) {
        let option = document.createElement("option");
        option.value = item[Key];
        option.text = SharedSession.CurrentEnvironment.ScreenLanguage == "ar" ? item[Name_Ar] : item[Name_En];
        element.appendChild(option);
    }
}
function CreateListYesOrNo(): HTMLSelectElement {
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
    let element = document.createElement("select") as HTMLSelectElement;
    element.className = "form-control input-sm";
    switch (ClientSharedWork.Session.Language) {
        case "ar":
            for (var item of offDay) {
                element.options.add(new Option(item.Name_Ar, item.Id.toString()));
            }
            break;
        case "en":
            for (var item of offDay) {
                element.options.add(new Option(item.Name_En, item.Id.toString()));
            }
            break;
    }
    return element;
}
////End DropdownListFilter

function SetSearchControlName(id: string) {
    $("#SearchControlName").val(id);
}
function AddDate(prd: Number, Sdate: Date, count: number): Date {

    let Tdate: Date;
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
            Tdate.setDate(Tdate.getDate() + - 1);
            break;
        case 5: //year
            // add 365 or 366 days 
            Tdate = Sdate;
            Tdate.setFullYear(Tdate.getFullYear() + count);
            Tdate.setDate(Tdate.getDate() + - 1);
            break;
    }
    return Tdate;
}
function GetResourceByName(Sourcekey: string): string {
    var result: string = "";
    Ajax.Callsync({
        url: Url.Action("GetResourceByName", "ClientTools"),
        data: { key: Sourcekey },
        success: (d) => {
            result = d.result as string;
        }
    });
    return result;
}
function GetResourceList(Sourcekey: string): any {
    var result = Ajax.Call<any>({
        url: Url.Action("GetResourceNames", "ClientTools"),
        data: { _prefix: Sourcekey },
        success: (d) => {
            result = JSON.parse(d.result) as any;
        }
    });
    return result;
}

// Function To Check Date
function CheckDate(comCode: number, braCode: number, date: string): boolean {
    let res: boolean = false;
    var newDate = date.replace(/[-]/g, "");

    if (isNaN(Number(newDate.toString()))) {
        WorningMessage("خطأ في التاريخ - لايمكن الحفظ ", "Error in Date , Can not Save");
        res = false;
    } else {
        res = Ajax.Call<boolean>({ url: Url.Action("chechDate", "ClientTools"), data: { comCode: comCode, braCode: braCode, date: date } });
    }
    return res;
}
//End Global Functions

function GetURLForUI(): string {
    debugger;
    let result: string = "";
    result = Ajax.Call<string>({ url: Url.Action("GetURLForUI", "ClientTools") });
    return result;
}

function GetSessionRecord() {
    debugger;
    let result: SessionRecord;
    result = Ajax.Call<SessionRecord>({ url: Url.Action("GetSessionRecord", "Session") });
    return result;
}

var outUesr = 0;
function CheckTime() {

    var sys: SystemTools = new SystemTools();
    try {

        var CheckLogin = document.getElementById('btnLogin');
        if (CheckLogin != null) {
            return
        }

        var CheckUesr = SharedSession.CurrentEnvironment.UserCode;

    } catch (e) {
        outUesr += 1;
        if (outUesr == 2) {
            localStorage.setItem("OutUesr", "1");
            window.open(Url.Action("LoginIndex", "Login"), "_self");
        }

        return
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
function Errorinput(input: any) {

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

function loading(NameBtn: string) {
    $('#' + NameBtn + '').attr('disabled', 'disabled');
}

